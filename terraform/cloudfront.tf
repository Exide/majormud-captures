locals {
  s3_origin_id = "some-origin-value"
}

resource "aws_cloudfront_distribution" "site" {

  enabled = true

  default_cache_behavior {
    allowed_methods = ["GET"]
    cached_methods = ["GET"]
    target_origin_id = local.s3_origin_id
    viewer_protocol_policy = ""
    forwarded_values {
      query_string = false
      cookies {
        forward = ""
      }
    }
  }

  origin {
    domain_name = ""
    origin_id = ""
  }

  origin_group {
    origin_id = ""
    failover_criteria {
      status_codes = []
    }
    member {
      origin_id = ""
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = ""
    }
  }

  viewer_certificate {

  }
}