resource "google_artifact_registry_repository" "api" {
  repository_id = "footdash-api"
  format        = "DOCKER"
  location      = var.project_region
}

resource "google_artifact_registry_repository" "web" {
  repository_id = "footdash-web"
  format        = "DOCKER"
  location      = var.project_region
}
