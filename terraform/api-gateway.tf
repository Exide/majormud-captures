resource "aws_api_gateway_rest_api" "majormud_captures" {
  name = "MajorMUD Captures"
  description = "Tool for recording and viewing MajorMUD captures."
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}
