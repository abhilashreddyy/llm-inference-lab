output "instance_id" {
  value = aws_instance.gpu.id
}

output "public_ip" {
  value = aws_instance.gpu.public_ip
}

output "ssh_command" {
  description = "SSH into the box (DL AMI default user is ubuntu)."
  value       = "ssh ubuntu@${aws_instance.gpu.public_ip}"
}

output "vllm_endpoint" {
  description = "vLLM OpenAI base_url (reachable remotely only if expose_vllm_port=true)."
  value       = "http://${aws_instance.gpu.public_ip}:${var.vllm_port}/v1"
}

output "s3_bucket" {
  value = aws_s3_bucket.results.bucket
}

output "model" {
  value = var.model
}

output "next_steps" {
  value = <<-EOT
    1. Wait ~3-6 min for cloud-init (vLLM download + start). Watch:
         ssh ubuntu@${aws_instance.gpu.public_ip} 'tail -f /var/log/llmbench-bootstrap.log'
       Ready when you see BOOTSTRAP_DONE and: curl localhost:${var.vllm_port}/v1/models
    2. Benchmark ON the box (cleanest numbers):
         ssh ubuntu@${aws_instance.gpu.public_ip}
         cd /opt/llm-inference-lab            # if git_repo_url was set; else scp the repo up
         uv run llmbench run --config configs/aws.yaml
         uv run llmbench report
         aws s3 sync results s3://${aws_s3_bucket.results.bucket}/results
    3. Pull results down + view locally:
         aws s3 sync s3://${aws_s3_bucket.results.bucket}/results results
         uv run llmbench report && uv run llmbench serve
    4. DESTROY when done (spot still bills while running):
         terraform destroy
  EOT
}
