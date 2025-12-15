
# Public HTTP/HTTPS access (ALB equivalent)
resource "google_compute_firewall" "web_fw" {
  name    = "web-fw"
  network = google_compute_network.main.id

  direction = "INGRESS"

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# ECS tasks equivalent (app servers)
resource "google_compute_firewall" "ecs_fw" {
  name    = "ecs-fw"
  network = google_compute_network.main.id

  direction   = "INGRESS"
  target_tags = ["ecs"]
  source_tags = ["alb"]

  allow {
    protocol = "tcp"
    ports    = ["3000"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# Cloud SQL (Postgres)
resource "google_compute_firewall" "db_fw" {
  name    = "db-fw"
  network = google_compute_network.main.id

  direction   = "INGRESS"
  target_tags = ["db"]
  source_tags = ["ecs"]
  allow {
    protocol = "tcp"
    ports    = ["5432"]
  }
}

# Redis access from ECS
resource "google_compute_firewall" "redis-fw" {
  name    = "redis-fw"
  network = google_compute_network.main.id

  direction   = "INGRESS"
  target_tags = ["redis"]
  source_tags = ["ecs"]
  allow {
    protocol = "tcp"
    ports    = [var.redis_port]
  }
}
