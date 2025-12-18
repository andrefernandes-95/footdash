output "api_url" {
  value = google_cloud_run_v2_service.api.uri
}

output "db_private_ip" {
  value = local.db_private_ip
}
