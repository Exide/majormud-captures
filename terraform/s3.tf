resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket
  acl = "private"

  tags = {
    topic = "MajorMUD"
  }
}
