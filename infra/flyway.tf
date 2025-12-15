resource "aws_ecs_task_definition" "flyway_task" {
  family = "flyway-task"
  requires_compatibilities = ["FARGATE"]
  network_mode = "awsvpc"
  cpu = "256"
  memory = "512"

  container_definitions = jsondecode([{
    name = "flyway"
    image = "flyway/flyway:9"
    command = [
        "-url=jdbc:postgresql://${var.db_host}:${var.db_port}/${var.db_name}",
        "-user=${var.db_user}",
        "-password=${var.db_password}",
        "-locations=filesystem:/migrations",
        "migrate"
    ]
    mountPoints = [{
        sourceVolume = "migrations",
        containerPath = "/migrations"
    }]
  }])

  volume {
    name = "migrations"
    host_path = var.migrations_path
  }
}