# S3 Bucket
resource "aws_s3_bucket" "web_bucket" {
    bucket = "united-fc-web"
    force_destroy = true
}

# Cloudfront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for united-fc-web"
}

# Bucket policy allowing CloudFront to read
resource "aws_s3_bucket_policy" "web_bucket_policy" {
    bucket = aws_s3_bucket.web_bucket.id
    policy = jsondecode({
        Version = "2012-10-17"
        Statement = [{
            Effect = "Allow"
            Principal = { AWS = aws_cloudfront_origin_access_identity.oai.iam_arn }
            Action = "s3:GetObject"
            Resource = "${aws_s3_bucket.web_bucket.arn}"
        }]
    })
}

# Cloudfront Distribution
resource "aws_cloudfront_distribution" "web_cdn" {
    enabled =  true
    default_root_object = "index.html"

    origin {
        domain_name = aws_s3_bucket.web_bucket.bucket_regional_domain_name
        origin_id = "s3-web"
        s3_origin_config {
          origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
        }
    }  

	default_cache_behavior {
		allowed_methods = ["GET", "HEAD", "OPTIONS"]
		cached_methods = ["GET", "HEAD"]
		target_origin_id = "s3-web"
		viewer_protocol_policy = "redirect-to-https"
		forwarded_values {
			query_string = false
			cookies {
				forward = "none"
			}
		}
	}

	viewer_certificate {
		cloudfront_default_certificate = true
	}

	custom_error_response {
	  error_code = 404
	  response_code = 200
	  response_page_path = "/index.html"
	}

	restrictions {
	  geo_restriction {
		restriction_type = "none"
	  }
	}
}
