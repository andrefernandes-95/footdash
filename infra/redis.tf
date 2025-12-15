resource "aws_elasticache_subnet_group" "redis_subnets" {
  name = "redis-subnets"
  subnet_ids = [aws_subnet.private.id]
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id = "united-fc-redis"
  engine = "redis"
  node_type = "cache.t3.micro"
  num_cache_nodes = 1 # 1 means no replication, no automatic failover
  parameter_group_name = "default.redis7"
  subnet_group_name = aws_elasticache_subnet_group.redis_subnets.name
  security_group_ids = [aws_security_group.redis_sg.id]
}
