resource "google_vpc_access_connector" "cloudrun" {
  name          = "cloudrun-connector"
  region        = var.project_region
  network       = google_compute_network.main.name
  ip_cidr_range = "10.8.0.0/28"
}

resource "google_cloud_run_v2_job" "hello" {
  name     = "hello-job"
  location = var.project_region

  template {
    template {
      service_account = google_service_account.cloud_run_sql.email
      timeout         = "300s"

      vpc_access {
        connector = google_vpc_access_connector.cloudrun.id
        egress    = "ALL_TRAFFIC"
      }

      containers {
        image = "${var.project_region}-docker.pkg.dev/${var.project_id}/footdash-api/hello:latest"

        env {
          name  = "DB_URL"
          value = "postgresql://${google_sql_database_instance.postgres.private_ip_address}:${var.db_port}/${var.db_name}"
        }

        env {
          name  = "DB_USER"
          value = var.db_user
        }

        env {
          name  = "DB_PASSWORD"
          value = var.db_password
        }
      }
    }
  }
}
