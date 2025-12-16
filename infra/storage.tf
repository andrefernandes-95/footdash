resource "google_storage_bucket" "web_bucket" {
  name                        = "footdash-web"
  location                    = var.project_region
  force_destroy               = true
  uniform_bucket_level_access = true
}

# Cloud CDN via Load Balancer
resource "google_compute_backend_bucket" "web_backend" {
  name        = "web-backend"
  bucket_name = google_storage_bucket.web_bucket.name
  enable_cdn  = true
}
