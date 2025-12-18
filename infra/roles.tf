# Create the service account
resource "google_service_account" "ci_cd" {
  account_id   = "ci-cd-sa"
  display_name = "CI/CD Service Account"
  project      = var.project_id
}

# Grant artifact registry admin role
resource "google_project_iam_member" "artifact_registry_admin" {
  project = var.project_id
  role    = "roles/artifactregistry.admin"
  member  = "serviceAccount:${google_service_account.ci_cd.email}"
}

# Grant storage admin role
resource "google_project_iam_member" "storage_admin" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.ci_cd.email}"
}

resource "google_service_account" "cloud_run_sql" {
  account_id   = "cloud-run-sql"
  display_name = "Cloud Run SQL Access"
  project      = var.project_id
}

resource "google_project_iam_member" "cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.cloud_run_sql.email}"
}
