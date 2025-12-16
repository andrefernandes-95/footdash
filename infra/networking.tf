############################################
# VPC = Your private city in Google Cloud
############################################
# This creates an isolated private network where all your resources live.
# Nothing can enter or leave this "city" unless you explicitly allow it.
resource "google_compute_network" "main" {
  name = "footdash-vpc"

  # We disable automatic subnet creation so WE control
  # which neighborhoods (subnets) exist and what they are used for.
  auto_create_subnetworks = false
}

############################################
# Subnets = Neighborhoods inside the city
############################################

# PUBLIC SUBNET
# This neighborhood is for resources that need internet access
# (load balancers, gateways, entry points).
resource "google_compute_subnetwork" "public" {
  name = "public-subnet"

  # CIDR range = houses in this neighborhood
  ip_cidr_range = "10.0.1.0/24"

  region  = var.project_region
  network = google_compute_network.main.id
}

# PRIVATE SUBNET
# This neighborhood is for sensitive resources:
# databases, Redis, internal services.
# These should NEVER be directly reachable from the internet.
resource "google_compute_subnetwork" "private" {
  name          = "private-subnet"
  ip_cidr_range = "10.0.2.0/24"

  region  = var.project_region
  network = google_compute_network.main.id
}

############################################
# Cloud Router = Traffic manager for the city
############################################
# This router helps manage how traffic flows OUT of the VPC.
# It does NOT expose anything to the internet by itself.
resource "google_compute_router" "nat_router" {
  name    = "nat-router"
  network = google_compute_network.main.id
  region  = var.project_region
}

############################################
# NAT = One-way door to the internet
############################################
# NAT (Network address translation) allows PRIVATE resources to go OUT to the internet
# (for updates, Google APIs, external calls),
# but BLOCKS the internet from coming IN.
#
# Think of this as:
# "Private neighborhood residents can leave the city,
#  but strangers cannot walk in."
resource "google_compute_router_nat" "nat" {
  name   = "nat-config"
  router = google_compute_router.nat_router.name
  region = var.project_region

  # Google automatically assigns public IPs for outbound traffic
  nat_ip_allocate_option = "AUTO_ONLY"

  # Allow ALL subnets to use NAT for outbound internet access
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

############################################
# Reserved IP range for Google-managed services
############################################
# Cloud SQL and Redis do NOT live directly inside your subnet.
# They live in Google-owned networks.
#
# This reserves a private IP range INSIDE your VPC
# that Google is allowed to use when connecting those services.
#
# Think of this as reserving parking spaces in your city
# for Google service vehicles.
resource "google_compute_global_address" "private_service_range" {
  name = "private-service-range"

  # This range is ONLY used for private service connections
  purpose = "VPC_PEERING"

  address_type = "INTERNAL"

  # /16 = 65,536 private IPs reserved for Google services
  prefix_length = 16

  network = google_compute_network.main.id
}

############################################
# Private service networking connection
############################################
# This creates a PRIVATE tunnel between:
# - Your VPC (your city)
# - Google-managed services (Cloud SQL, Redis)
#
# NO internet traffic is involved.
# This is REQUIRED for:
# - Cloud SQL private IP
# - Memorystore (Redis)
resource "google_service_networking_connection" "private_vpc_connection" {
  network = google_compute_network.main.id

  # This is Google's service networking system
  service = "servicenetworking.googleapis.com"

  # Attach the reserved private IP range created above
  reserved_peering_ranges = [
    google_compute_global_address.private_service_range.name
  ]
}
