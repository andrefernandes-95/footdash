resource "aws_ecs_cluster" "cluster" {
    name = "united-fc-cluster"
}

resource "aws_ecs_task_definition" "api_task" {
  family = "united-fc-api"
  requires_compatibilities = ["FARGATE"]
  network_mode = "awsvpc"
  cpu = "512"
  memory = "1024"

  container_definitions = jsondecode([{
    name = "api"
    image = "${aws_ecr_repository.api.repository_url}:latest"
    portMappings = [{ containerPort = 3000, protocol = "tcp" }]
    environment = [
        {
            name = "DATABASE_URL", value = "postgres://${var.db_user}:${var.db_password}@${var.db_host}:${var.db_port}/${var.db_name}"
        },
        {
            name = "REDIS_URL", value = "redis://${aws_elasticache_cluster.redis.cache_nodes[0].address}:6379"
        }
    ]
  }])
}

resource "aws_ecs_service" "api_service" {
    name = "api-service"
    cluster = aws_ecs_cluster.cluster.id
    task_definition = aws_ecs_task_definition.api_task.arn
    desired_count = 1
    launch_type = "FARGATE"
    network_configuration {
      subnets = [aws_subnet.public.id]
      security_groups = [aws_security_group.ecs_sg.id]
      assign_public_ip = true
    }
}
