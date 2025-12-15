provider "google" {
  region  = var.project_region
  project = var.project_id
}

# VPC (Virtual Private Cloud)
resource "google_compute_network" "main" {
  name                    = "footdash-vpc"
  auto_create_subnetworks = false #Disable automatic subnet creation
}

# Create a public subnet inside the VPC for publicly accessible resources
resource "google_compute_subnetwork" "public" {
  name          = "public-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.project_region
  network       = google_compute_network.main.id
}

resource "google_compute_subnetwork" "private" {
  name          = "private-subnet"
  ip_cidr_range = "10.0.2.0/24"
  region        = var.project_region
  network       = google_compute_network.main.id
}

# Create a default internet gateway route for the public subnet
resource "google_compute_router" "nat_router" {
  name    = "nat-router"
  network = google_compute_network.main.id
  region  = var.project_region
}

resource "google_compute_router_nat" "nat" {
  name                               = "nat-config"
  router                             = google_compute_router.nat_router.name
  region                             = var.project_region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = ["ALL_SUBNETWORKS_ALL_IP_RANGES"]
}
