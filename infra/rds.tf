# RDS must be placed inside a subnet group (it cannot be attached directly to a subnet)
resource "aws_db_subnet_group" "rds_subnets" {
  name = "rds-subnets"
  subnet_ids = [aws_subnet.private.id] # Place the RDS in the private subnet, so the db is not reachable from the internet
}

resource "aws_db_instance" "postgres" {
  identifier = "united-fc-db"
  engine = "postgres"
  engine_version = "15"
  instance_class = "db.t3.medium"
  allocated_storage = 20
  db_name = "united-fc"
  username = "admin"
  password = "admin" # Move to Secrets Manager in prod
  db_subnet_group_name = aws_db_subnet_group.rds_subnets.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id] # controls who can connect to the db, currently only ECS tasks can connect
  skip_final_snapshot = true # Skips creating a final snapshot when the DB is deleted, acceptable for DEV / TESTING, dangerous in production as it results in data loss
  publicly_accessible = false # prevents the DB from getting a public IP and enforces private-only access inside the VPC
}
