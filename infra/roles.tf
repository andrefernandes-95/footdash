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
