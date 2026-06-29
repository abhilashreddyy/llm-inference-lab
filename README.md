# LLM Inference Lab

Deploy open-source LLMs, apply inference optimizations, and **quantify the gains** on a
reproducible, config-driven harness. Today it runs locally on Apple Silicon
(transformers + MLX); the same schema and runner scale to **AWS GPU + vLLM**, multi-GPU
tensor parallelism, and **EKS autoscaling** — those are additive configs, not rewrites.

```
configs/*.yaml ─▶ Engine (transformers · mlx · vllm) ─▶ Runner + LoadGen
              ─▶ Metrics schema (results/*.json) ─▶ report ─▶ dashboard/
```

## Live dashboard

**▶ [View the live dashboard](https://abhilashreddyy.github.io/llm-inference-lab/)** — compare 6 local models on speed, memory, and real task quality (coding + math), with an interactive breakdown of each inference optimization (quantization, KV-cache, batching, speculative decoding).

The dashboard (`dashboard/`) is a fully client-side static site — no server, no GPU. It renders **committed results** (`dashboard/*-data.js`), so anyone can browse it instantly. It auto-publishes to GitHub Pages on every push to `main` via [`.github/workflows/pages.yml`](.github/workflows/pages.yml). To regenerate the results yourself, see [Reproduce the dashboard](#reproduce-the-dashboard).

> After enabling Pages (Settings → Pages → Source: **GitHub Actions**), replace `abhilashreddyy` above with your handle.

## Reproduce the dashboard

The numbers are measured on a Mac (Apple Silicon + MLX). From the repo root:

```bash
uv sync                                                          # .venv + deps (torch, transformers, mlx)

# 1) Model comparison — speed, memory, coding (HumanEval-164), math (GSM8K-100)
uv run python local-lab/run_eval.py --config local-lab/configs.yaml
uv run python local-lab/build_dashboard.py                       # -> dashboard/models-data.js

# 2) Optimization experiments — quantization, KV-cache, batching, speculative decoding
uv run python local-lab/experiments.py --config local-lab/exp_configs/full_small.yaml
uv run python local-lab/build_exp_dashboard.py                   # -> dashboard/exp-data.js

# 3) Preview locally
python3 -m http.server 8000 --directory dashboard               # http://localhost:8000
```

Models download from Hugging Face on first run (4-bit MLX checkpoints, ~2–5 GB each); the experiment runs are **checkpointed and resumable**. GitHub Pages only serves the committed `*-data.js`, so visitors never run any of this.

## Why this design

The hard part of an inference-benchmark project isn't running a model — it's making the
numbers **comparable and reproducible** as you change engine, quantization, hardware, and
scale. So the *metrics schema* is fixed up front ([`schema.py`](src/llmbench/schema.py)) and
everything writes the same records. Swapping `transformers` → `mlx` → `vllm` is a one-line
config change; moving from a laptop to an 8-GPU node just adds rows to the same results table.

## What it measures

| Metric | Meaning |
|---|---|
| **System throughput** (tok/s) | aggregate output tokens ÷ wall-clock — the headline number |
| **TTFT** (ms, p50/p90/p99) | time to first streamed token |
| **TPOT** (ms, p50/p90/p99) | inter-token decode latency |
| **E2E latency** (ms, p50/p90/p99) | submit → last token |
| **Decode tok/s** | per-request decode speed |
| **Peak memory** | process RSS + accelerator memory during the run |
| **$/1M tokens** | derived from instance `price_per_hour` ÷ throughput (set on AWS) |
| **Compute timeline** | memory/CPU sampled every 250 ms ([`telemetry.py`](src/llmbench/telemetry.py)) |

## Setup (from scratch)

Requires [`uv`](https://docs.astral.sh/uv/) (`brew install uv`) and Python 3.13.

```bash
git clone <this repo> && cd llm-inference-lab
uv sync                       # creates .venv, installs torch / transformers / mlx
```

## Run

```bash
uv run llmbench run                      # runs configs/experiment.yaml
uv run llmbench run --only mlx           # filter runs by label substring
uv run llmbench report                   # aggregate results/*.json -> dashboard/data.js
uv run llmbench serve                    # view dashboard at http://localhost:8000
```

Each engine spec in [`configs/experiment.yaml`](configs/experiment.yaml) becomes one
benchmark. The default matrix tells the optimization story:

1. **Transformers FP16** — naive `model.generate()`, the baseline
2. **MLX BF16** — Apple-native Metal kernels
3. **MLX 4-bit** — quantized weights (the optimized result)

## Project layout

```
configs/            experiment matrices (YAML) — add a row = add a benchmark
src/llmbench/
  schema.py         the fixed data model (RequestRecord, RunManifest, RunResult)
  engines/          pluggable backends: base.py, transformers_engine.py, mlx_engine.py
  runner.py         load generation, timing, telemetry orchestration
  stats.py          percentiles + headline aggregates
  telemetry.py      background compute/memory sampler
  report.py         results/*.json -> dashboard/data.js
  cli.py            run | report | serve
results/            one JSON per run (raw records + telemetry + manifest)
dashboard/          static site (Chart.js) — deploys as-is to S3 + CloudFront
```

## Roadmap

- [x] **Phase 0** — local single-model harness, schema, dashboard (transformers vs MLX vs 4-bit)
- [x] **Phase 1 (scaffolded, awaiting GPU quota)** — `engine: vllm` ([vllm_engine.py](src/llmbench/engines/vllm_engine.py)),
  nvidia-smi telemetry, [`configs/aws.yaml`](configs/aws.yaml) concurrency sweep, and Terraform
  (g5.xlarge spot + S3 + IAM + cloud-init) in [`infra/`](infra/README.md). `terraform validate` passes.
- [ ] **Phase 2** — sweep matrix: engine × quant × batch × concurrency (continuous-batching wins)
- [ ] **Phase 3** — multi-GPU tensor parallelism for larger models
- [ ] **Phase 4** — EKS + Karpenter/KEDA load-based autoscaling

> vLLM is CUDA-only and intentionally errors on Mac — it's reserved for the AWS phase and
> runs unchanged via the same config schema on a GPU node.
