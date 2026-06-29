# Where everything is stored

Two layers: **raw results** (produced by the eval/experiment scripts) and **generated
dashboard data** (built from the raw results; this is what the website reads).

## 1. Generated dashboard data — what the site loads
`dashboard/` holds the static site. These `*.js` files are generated, not hand-written:

| File | Global | Built by | Holds |
|---|---|---|---|
| `dashboard/data.js` | `window.BENCH_DATA` | `llmbench report` (core) | The 7B optimization studies (Quantization sub-tab): quant/spec/kv/batch runs with per-request records + telemetry. |
| `dashboard/models-data.js` | `window.MODELS_DATA` | `local-lab/build_dashboard.py` | Model comparison (Models tab): per-model speed/memory/perplexity + HumanEval/GSM8K scores **and counts** + example transcripts. |
| `dashboard/exp-data.js` | `window.EXP_DATA` | `local-lab/build_exp_dashboard.py` | Cross-model optimization experiments (Optimizations tab): `spec_by_model`, `kv_by_model`, `batch_by_model`, `spec_detail`, `combos` (Explorer ladder), `kv_cache_detail`, `kv_precision`. |

## 2. Raw results — the source of truth
| Path | Produced by | Holds |
|---|---|---|
| `results/*.json` | `uv run llmbench run` (core) | One JSON per 7B study run (quant bf16/8/4, spec, kv, batch). Full manifest + per-request latencies + telemetry. |
| `local-lab/results/*.json` | `run_eval.py` (full) | One JSON per **fully-evaluated** model (Qwen2.5-7B, Llama-3.1-8B, Mistral-7B, Gemma-2-9B, Qwen2.5-Coder-7B): system metrics, speed, perplexity, tasks (HumanEval/GSM8K with examples). |
| `local-lab/results_dev/*.json` | `run_eval.py --config configs.dev.yaml` | Same shape, **dev** models (small, tiny test sets). Kept separate so dev never overwrites the full results. |
| `local-lab/results_exp/experiments.json` | `experiments.py` (one command, reproducible) | All optimization-experiment numbers. **Reliability:** a `meta` block (timestamp, chip, RAM, mlx/mlx_lm versions, reps, max_tokens, decoding, prompt); every timing is the **mean of N reps with std** (`throughput_std`, `acceptance_std`, …); KV-cache memory is **analytical/exact** from each model's config (`kv_cache_by_model`, `kv_cache_detail`), not noisy allocator reads; actual `output_tokens`/`prompt_tokens` recorded. **Every cross-cutting metric is measured per-model:** `kv_precision_by_model` (8-/4-bit output fidelity for each model), `kv_cache_detail_by_model` (cache-vs-context + weights for each model), `quant_by_model` (bf16/8-bit/4-bit throughput, peak memory **and perplexity** for each model). Sections: `spec_by_model`, `batch_by_model`, `kv_cache_by_model`, `quant_by_model`, `combos`(+`combos_models`), `spec_detail`, `kv_cache_detail_by_model`/`kv_precision_by_model` (plus `kv_cache_detail`/`kv_precision` = default-target view, backward compat). `quant` config: dev measures bf16+4-bit (cached, no downloads); full adds 8-bit. |
| `results/_archive_*`, `local-lab/results/_archive_*` | manual | Older runs, kept so nothing is lost. |

## 3. Configs (inputs)
| Path | Drives |
|---|---|
| `configs/*.yaml` | Core `llmbench` studies + AWS (`aws.yaml`). |
| `local-lab/configs.yaml` / `configs.dev.yaml` | Model comparison (full / dev). |
| `local-lab/exp_configs/full.yaml` / `dev.yaml` | Optimization experiments (full / dev). |

## How to regenerate the dashboard from raw results
```bash
# model comparison (full or dev)
uv run python local-lab/build_dashboard.py                                  # -> models-data.js (full)
uv run python local-lab/build_dashboard.py --results local-lab/results_dev --config local-lab/configs.dev.yaml
# experiments — regenerate the raw data (one reproducible command), then the dashboard file
uv run python local-lab/experiments.py --config local-lab/exp_configs/dev.yaml   # -> results_exp/experiments.json
uv run python local-lab/build_exp_dashboard.py                                    # -> exp-data.js
# core 7B studies
uv run llmbench report                                                      # -> data.js
```

## Not stored here
Model weights live in the shared HuggingFace cache (`~/.cache/huggingface/hub/`), not in
the repo. `.venv/` (uv environment) and `results/_archive_*` are gitignored.
