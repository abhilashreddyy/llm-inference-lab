#!/usr/bin/env bash
# DEV MODE: fast end-to-end run on a few small models + tiny tests, to see the
# whole dashboard "feel" before committing to a full run. ~5-12 min.
#   ./scripts/dev.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== DEV: model comparison (3 small models, tiny tests) =="
uv run python local-lab/run_eval.py --config local-lab/configs.dev.yaml --out local-lab/results_dev
uv run python local-lab/build_dashboard.py --results local-lab/results_dev --config local-lab/configs.dev.yaml

echo "== DEV: cross-model optimization experiments =="
uv run python local-lab/experiments.py --config local-lab/exp_configs/dev.yaml
uv run python local-lab/build_exp_dashboard.py

echo "== DEV done. View: uv run llmbench serve (or python -m http.server in dashboard/) =="
