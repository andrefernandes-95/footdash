resource "google_cloud_run_v2_job" "flyway" {
  provider = google-beta
  name     = "flyway-job"
  project  = var.project_id
  location = var.project_region

  template {   # Job execution template
    template { # Task template
      containers {
        image = "flyway/flyway:9"
        args = [
          "-url=jdbc:postgresql://${local.db_private_ip}:${var.db_port}/${var.db_name}",
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
        name = "migrations"
        cloud_sql_instance {
          instances = [google_sql_database_instance.postgres.name]
        }
      }
    }
  }
}
