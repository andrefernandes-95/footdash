resource "google_storage_bucket" "web_bucket" {
  name                        = "footdash-web"
  location                    = var.project_region
  force_destroy               = true
  uniform_bucket_level_access = true
}

# Optional: Upload index.html
resource "google_storage_bucket_object" "index" {
  name         = "index.html"
  bucket       = google_storage_bucket.web_bucket.name
  source       = "path/to/index.html"
  content_type = "text/html"
}

# Cloud CDN via Load Balancer
resource "google_compute_backend_bucket" "web_backend" {
  name        = "web-backend"
  bucket_name = google_storage_bucket.web_bucket.name
  enable_cdn  = true
}
