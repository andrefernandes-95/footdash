resource "google_cloud_run_v2_service" "api" {
  name     = "footdash-api"
  location = var.project_region

  template {
    containers {
      image = "${var.project_region}-docker.pkg.dev/${var.project_id}/footdash-api/api:latest"
      ports { container_port = 3000 }

      env {
        name  = "DB_HOST"
        value = local.db_private_ip
      }
      env {
        name  = "DB_PORT"
        value = var.db_port
      }
      env {
        name  = "DB_NAME"
        value = var.db_name
      }
      env {
        name  = "DB_USER"
        value = var.db_user
      }
      env {
        name  = "DB_PASS"
        value = var.db_password
      }
      env {
        name  = "DATABASE_URL"
        value = "postgresql://${var.db_user}:${var.db_password}@${local.db_private_ip}:${var.db_port}/${var.db_name}"
      }
      env {
        name  = "REDIS_URL"
        value = "redis://${google_redis_instance.redis.host}:${var.redis_port}"
      }
      env {
        name  = "REDIS_HOST"
        value = google_redis_instance.redis.host
      }
    }

    # ✅ VPC connector for Cloud Run V2
    vpc_access {
      connector = google_vpc_access_connector.cloudrun.id
      egress    = "ALL_TRAFFIC"
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}


resource "google_cloud_run_service" "web" {
  name     = "footdash-web"
  location = var.project_region

  depends_on = [
    google_cloud_run_v2_service.api,
    google_cloud_run_service_iam_member.api_public
  ]

  template {
    spec {
      containers {
        image = "${var.project_region}-docker.pkg.dev/${var.project_id}/footdash-web/web-client:latest"
        ports { container_port = 3000 }

        env {
          name  = "NEXT_PUBLIC_API_URL"
          value = "https://${google_cloud_run_v2_service.api.uri}"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "web_public" {
  project  = var.project_id
  location = var.project_region
  service  = google_cloud_run_service.web.name
  role     = "roles/run.invoker"
  member   = "allUsers" # <-- makes it public
}

resource "google_cloud_run_service_iam_member" "api_public" {
  project  = var.project_id
  location = var.project_region
  service  = google_cloud_run_v2_service.api.name
  role     = "roles/run.invoker"
  member   = "allUsers" # allow public access
}
