output "api_url" {
  value = google_cloud_run_service.api.status[0].url
}

output "db_private_ip" {
  value = local.db_private_ip
}
