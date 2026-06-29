variable "region" {
  description = "AWS region (must match where your G/VR vCPU quota was granted)."
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "GPU instance. g5.xlarge = 1x A10G 24GB, 4 vCPUs."
  type        = string
  default     = "g5.xlarge"
}

variable "use_spot" {
  description = "Use a spot instance (~60-70% cheaper, can be reclaimed)."
  type        = bool
  default     = true
}

variable "model" {
  description = "HF model id to serve with vLLM."
  type        = string
  default     = "Qwen/Qwen2.5-7B-Instruct"
}

variable "vllm_port" {
  description = "Port for the vLLM OpenAI-compatible server."
  type        = number
  default     = 8000
}

variable "max_model_len" {
  description = "Max sequence length (bounds KV-cache memory)."
  type        = number
  default     = 8192
}

variable "public_key_path" {
  description = "Path to an SSH public key to install for access."
  type        = string
  default     = "~/.ssh/id_ed25519.pub"
}

variable "allowed_cidr" {
  description = "CIDR allowed to reach SSH + the vLLM port. Set to YOUR_IP/32. Find it: curl ifconfig.me"
  type        = string
  default     = "0.0.0.0/0"
}

variable "expose_vllm_port" {
  description = "Open the vLLM port to allowed_cidr (needed only if you benchmark remotely from your Mac)."
  type        = bool
  default     = false
}

variable "root_volume_gb" {
  description = "Root EBS size. vLLM + a 7B model + cache need headroom."
  type        = number
  default     = 150
}

variable "hf_token" {
  description = "HuggingFace token (only needed for gated models like Llama). Public models (Qwen) need none."
  type        = string
  default     = ""
  sensitive   = true
}

variable "git_repo_url" {
  description = "Optional: git URL of this repo so the harness is cloned onto the box for on-instance benchmarking."
  type        = string
  default     = ""
}

variable "project" {
  description = "Name tag / resource prefix."
  type        = string
  default     = "llm-inference-lab"
}
