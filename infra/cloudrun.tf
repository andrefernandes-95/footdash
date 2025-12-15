locals {
  db_private_ip = one([
    for ip in google_sql_database_instance.postgres.ip_address :
    ip.ip_address if ip.type == "PRIVATE"
  ])
}

resource "google_cloud_run_service" "api" {
  name     = "footdash-api"
  location = var.project_region

  template {

    spec {
      containers {
        image = "gcr.io/${var.project_id}/footdash-api:latest"
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
