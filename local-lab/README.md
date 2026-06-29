# local-lab — intermediate local exploration

**Separate from the AWS/vLLM core on purpose.** This directory is standalone: it does
not import the `llmbench` package, and its dependencies live in an optional group so they
never touch the production install. It's the "what can I learn on my Mac before I get GPU
access" step.

## What it measures, per model/quant

- **System metrics:** on-disk size, weights memory, model load time.
- **Speed:** decode throughput, TTFT, TPOT (MLX, Apple GPU).
- **Quality (measured, not vibes):**
  - **Coding** — HumanEval `pass@1`, by executing generated code against the benchmark's
    unit tests. Answers "which local model is closest to a usable coding assistant?"
  - **Math** — GSM8K exact-match accuracy.
  - **Perplexity** — on a fixed passage.

Includes the coding-specialized **Qwen2.5-Coder-7B** vs the general model, so you can see
whether a specialized model beats a bigger-precision general one for code.

## Run

```bash
uv sync --group local                                   # installs `datasets`
uv run python local-lab/run_eval.py --config local-lab/smoke.yaml --quick   # validate (0.5B)
uv run python local-lab/run_eval.py                     # full run (configs.yaml)
uv run python local-lab/report.py                       # -> report.md + report.html
```

## ⚠️ Safety

HumanEval scoring **executes model-generated Python** in a subprocess with a timeout
(standard for the benchmark). Only run it on a machine where you're comfortable doing so.

## Files

- `harness.py` — MLX model load, system metrics, generation, perplexity
- `tasks.py` — GSM8K + HumanEval loaders, scorers, code executor
- `run_eval.py` — orchestrator (per-config metrics + quality -> results/*.json)
- `report.py` — comparison table (markdown + HTML)
- `configs.yaml` — models to compare · `smoke.yaml` — tiny validation config
