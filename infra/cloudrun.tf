resource "google_cloud_run_service" "api" {
  name     = "footdash-api"
  location = var.project_region

  template {

    spec {
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
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service" "web" {
  name     = "footdash-web"
  location = var.project_region

  template {
    spec {
      containers {
        image = "${var.project_region}-docker.pkg.dev/${var.project_id}/footdash-web/web-client:latest"
        ports { container_port = 3000 }

        env {
          name  = "NEXT_PUBLIC_API_URL"
          value = "https://${google_cloud_run_service.api.status[0].url}"
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
