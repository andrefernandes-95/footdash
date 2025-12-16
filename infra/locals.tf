locals {
  db_private_ip = one([
    for ip in google_sql_database_instance.postgres.ip_address :
    ip.ip_address if ip.type == "PRIVATE"
  ])
}
