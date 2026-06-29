#!/usr/bin/env bash
# Run all four local optimization studies, then build the dashboard.
# Usage: ./scripts/run_local_studies.sh
set -euo pipefail
cd "$(dirname "$0")/.."

for cfg in quantization speculative kv_cache batching; do
  echo "=== Study: $cfg ==="
  uv run llmbench run --config "configs/${cfg}.yaml"
done

uv run llmbench report
echo "Done. View with: uv run llmbench serve"
