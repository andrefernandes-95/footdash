variable "db_host" {
    description = "Postgres RDS hostname"
    type = string
}

variable "db_name" {
    description = "Database Name"
    type = string
    default = "united_fc"
}

variable "db_user" {
    description = "Database username"
    type = string
    default = "admin"
}

variable "db_password" {
    description = "Database password"
    type = string
    sensitive = true
}

variable "migrations_path" {
    description = "Path to Flyway migrations folder"
    type = "string"
    default = "./db/migrations"
}

variable "db_port" {
    description = "Postgres database port"
    type = "number"
    default = 5432
}