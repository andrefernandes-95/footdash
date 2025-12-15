provider "aws" {
  region  = "eu-north-1"
  profile = "personal"
}

# VPC (Virtual Private Cloud)
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16" # Assigns the IP Address range to the VPC, this gives 65,536 IP Addresses
  tags       = { Name = "united-fc-vpc" }
}

# Create a public subnet inside the VPC for publicly accessible resources
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id # Associate this subnet with the main VPC
  cidr_block              = "10.0.1.0/24"   # Gives this subnet a range of 256 IP Addresses
  map_public_ip_on_launch = true            # Automatically assigns a public IP to any EC2 instances launched in this subnet
  availability_zone       = "eu-north-1"    # Places the subnet in a specific AWS Availability Zone
  tags                    = { Name = "public-subnet" }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-north-1"
  tags              = { Name = "private-subnet" }
}

# Create an Internet Gateway, which allows the VPC to communicate with the Internet
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "vpc-igw" }
}

# Create a route table for the public subnet
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id # Associate the route table to the main vpc
  route {                  # add a route so all outbound traffic (0.0.0.0/0) goes through the Internet Gateway
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "public-route-table" }
}

# Associate the public subnet with the public route table
resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}
