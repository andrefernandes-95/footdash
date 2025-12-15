resource "google_redis_instance" "redis" {
  name               = "footdash-redis"
  tier               = "BASIC"
  memory_size_gb     = 1
  region             = var.project_region
  authorized_network = google_compute_network.main.id
}
