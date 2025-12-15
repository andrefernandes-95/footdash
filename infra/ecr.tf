# Docker Repositories

resource "aws_ecr_repository" "api" {
  name = "united-fc-api"
}

resource "aws_ecr_repository" "web" {
  name = "united-fc-web"
}