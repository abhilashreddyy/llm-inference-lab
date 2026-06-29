data "aws_caller_identity" "current" {}

# AWS Deep Learning Base AMI: NVIDIA driver + CUDA preinstalled (no frameworks),
# so cloud-init just pip-installs vLLM. Avoids the driver-install rabbit hole.
data "aws_ami" "dlami" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["Deep Learning Base OSS Nvidia Driver GPU AMI (Ubuntu 22.04)*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_key_pair" "this" {
  key_name   = "${var.project}-key"
  public_key = file(pathexpand(var.public_key_path))
}

resource "aws_security_group" "this" {
  name        = "${var.project}-sg"
  description = "SSH + optional vLLM port"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_cidr]
  }

  dynamic "ingress" {
    for_each = var.expose_vllm_port ? [1] : []
    content {
      description = "vLLM API"
      from_port   = var.vllm_port
      to_port     = var.vllm_port
      protocol    = "tcp"
      cidr_blocks = [var.allowed_cidr]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-sg" }
}

# Results bucket — the harness syncs results/*.json here from the instance.
resource "aws_s3_bucket" "results" {
  bucket        = "${var.project}-results-${data.aws_caller_identity.current.account_id}-${var.region}"
  force_destroy = true
  tags          = { Name = "${var.project}-results" }
}

resource "aws_iam_role" "ec2" {
  name = "${var.project}-ec2-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "s3" {
  name = "${var.project}-s3-write"
  role = aws_iam_role.ec2.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:PutObject", "s3:GetObject", "s3:ListBucket"]
      Resource = [aws_s3_bucket.results.arn, "${aws_s3_bucket.results.arn}/*"]
    }]
  })
}

resource "aws_iam_instance_profile" "this" {
  name = "${var.project}-profile"
  role = aws_iam_role.ec2.name
}

resource "aws_instance" "gpu" {
  ami                    = data.aws_ami.dlami.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.this.key_name
  vpc_security_group_ids = [aws_security_group.this.id]
  iam_instance_profile   = aws_iam_instance_profile.this.name

  root_block_device {
    volume_size = var.root_volume_gb
    volume_type = "gp3"
  }

  dynamic "instance_market_options" {
    for_each = var.use_spot ? [1] : []
    content {
      market_type = "spot"
      spot_options {
        instance_interruption_behavior = "terminate"
        spot_instance_type             = "one-time"
      }
    }
  }

  user_data = templatefile("${path.module}/user_data.sh.tftpl", {
    model         = var.model
    vllm_port     = var.vllm_port
    max_model_len = var.max_model_len
    hf_token      = var.hf_token
    git_repo_url  = var.git_repo_url
    s3_bucket     = aws_s3_bucket.results.bucket
    region        = var.region
  })

  tags = { Name = "${var.project}-gpu" }
}
