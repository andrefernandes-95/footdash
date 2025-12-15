resource "google_sql_database_instance" "postgres" {
  name             = var.db_name
  database_version = "POSTGRES_15"
  region           = var.project_region
  settings {
    tier = "db-custom2-3840"
    ip_configuration {
      private_network = google_compute_network.main.id
    }
    backup_configuration {
      enabled = true
    }
  }
}

resource "google_sql_database" "app_db" {
  name     = "footdash"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "db_user" {
  name     = var.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}
