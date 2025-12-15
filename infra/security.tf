resource "aws_security_group" "alb_sg" {
    name = "alb-sg"
    vpc_id = aws_vpc.main.id

    ingress = {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"] # public internet
    }

    egress = {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Security group for ECS tasks
resource "aws_security_group" "ecs_sg" {
    name = "ecs-sg"
    vpc_id = aws_vpc.main.id

    # Begin an ingress rule (incoming traffic)
    # Allow traffic on all ports (0-65535)
    # Allow traffic from any IPv4 address, this is open to the internet
    ingress =  {
        from_port = 3000 # Port your container listens on
        to_port = 3000
        protocol = "tcp" # Restrict traffic to TCP protocol
        security_groups = [aws_security_group.alb_sg.id]
    }

    egress = {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Security group for RDS
resource "aws_security_group" "rds_sg" {
    name = "rds-sg"
    vpc_id = aws_vpc.main.id

    ingress = {
        from_port = var.db_port
        to_port = var.db_port
        protocol = "tcp"
        security_groups = [aws_security_group.ecs_sg.id]
    }

    # Outbound (egress) rule for RDS
    # Security Groups in AWS are stateful:
    # - If inbound traffic is allowed, the corresponding return traffic is automatically allowed.
    # - No explicit reverse (egress) rule is needed for responses.
    #
    # However, AWS still requires that at least one egress rule exists.
    # Allowing all outbound traffic for RDS is safe and recommended because:
    # - RDS must send response traffic back to clients (e.g., ECS tasks)
    # - RDS communicates with AWS-managed services for backups, monitoring, patching, and failover
    # - DNS resolution requires outbound access (UDP/TCP 53)
    #
    # Overly restrictive egress rules on RDS can cause subtle and hard-to-debug production failures,
    # so permissive egress is preferred for AWS-managed database services.
    egress = {
        from_port = 0 # Allow all outbound ports
        to_port = 0
        protocol = "-1" # Allow all protocols
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# Security group for Redis
resource "aws_security_group" "redis_sg" {
    name = "redis-sg"
    vpc_id = aws_vpc.main.id

    ingress = {
        from_port = 6379
        to_port = 6379
        protocol = "tcp"
        security_groups = [aws_security_group.ecs_sg.id]
    }

    egress = {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}
