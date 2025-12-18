resource "google_sql_database_instance" "postgres" {
  name             = var.db_name
  database_version = "POSTGRES_15"
  region           = var.project_region

  settings {
    tier = "db-f1-micro"
    ip_configuration {
      private_network = google_compute_network.main.id
    }
    backup_configuration {
      enabled = true
    }
  }

  # Wait until private VPC connection is fully created
  depends_on = [google_service_networking_connection.private_vpc_connection]
}

resource "google_sql_database" "app_db" {
  name     = var.db_name
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "db_user" {
  name     = var.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}
