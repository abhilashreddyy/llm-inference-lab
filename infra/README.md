# Phase 1 — AWS GPU + vLLM

Provision a single GPU EC2 (g5.xlarge spot), serve a 7B model with vLLM, and run the
**continuous-batching concurrency sweep**. Same metrics schema and dashboard as local.

## Prerequisites

- **GPU quota granted** — `Running On-Demand G and VR instances` (and the Spot equivalent
  if `use_spot=true`) ≥ 4 vCPUs in your region. See the project root for how to check/request.
- AWS CLI configured (`aws configure`) and Terraform installed (`brew install terraform`).
- An SSH keypair: `ssh-keygen -t ed25519` (default path `~/.ssh/id_ed25519.pub`).

## Deploy

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars   # edit: allowed_cidr = "$(curl -s ifconfig.me)/32"
terraform init
terraform apply                                # ~2 min to create; cloud-init then runs ~3-6 min
terraform output next_steps
```

## Run the benchmark (on the box = cleanest numbers)

```bash
ssh ubuntu@$(terraform output -raw public_ip)
tail -f /var/log/llmbench-bootstrap.log        # wait for BOOTSTRAP_DONE
curl localhost:8000/v1/models                  # vLLM is up

cd /opt/llm-inference-lab                       # present if git_repo_url was set
uv run llmbench run --config configs/aws.yaml   # concurrency sweep 1 -> 64
uv run llmbench report
aws s3 sync results "s3://$LLMBENCH_S3_BUCKET/results"
```

Pull results back to your Mac and view:

```bash
aws s3 sync "s3://$(terraform output -raw s3_bucket)/results" ../../results
cd ../.. && uv run llmbench report && uv run llmbench serve
```

## Compare fp16 vs AWQ

vLLM serves one model per process. To add the quantized point:

```bash
sudo systemctl stop vllm
/opt/vllm/bin/vllm serve Qwen/Qwen2.5-7B-Instruct-AWQ --port 8000 --max-model-len 8192 &
# edit configs/aws.yaml: model -> ...-AWQ, quant -> awq, then re-run llmbench
```

Both result sets land in the dashboard side by side.

## Cost & teardown

g5.xlarge: on-demand ~$1.006/hr, spot typically ~$0.35–0.45/hr. **Spot still bills while
running** — destroy when done:

```bash
terraform destroy
```

## What Terraform creates

- `aws_instance` (g5.xlarge spot) from the Deep Learning Base AMI (NVIDIA driver + CUDA)
- Security group (SSH from your IP; vLLM port only if `expose_vllm_port=true`)
- S3 results bucket + IAM role/instance-profile (instance can write results)
- cloud-init: installs vLLM, runs it as a systemd service, optionally clones the harness
