resource "google_cloud_run_job" "flyway" {
  name     = "flyway-job"
  location = var.project_region
  template {   # Execution Template (Job Level)
    template { # Task Template (Container Level)
      containers {
        image = "flyway/flyway:9"
        args = [
          "-url=jdbc:postgresql://${google_sql_database_instance.postgres.private_ip}:${var.db_name}",
          "-user=${var.db_user}",
          "-password=${var.db_password}",
          "-locations=filesystem:/migrations",
          "migrate"
        ]
        volume_mounts {
          name       = "migrations"
          mount_path = "/migrations"
        }
      }
      volumes {
        name               = "migrations"
        cloud_sql_instance = google_sql_database_instance.postgres.name
      }
    }
  }
}
