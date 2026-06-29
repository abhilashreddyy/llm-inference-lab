"""Turn results/*.json into a single dashboard/data.js the static site reads.

We emit `window.BENCH_DATA = {...}` (a .js file, not .json) so the dashboard
opens straight from disk without a server/CORS — and still deploys as-is to
S3+CloudFront.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def _downsample(series: list[dict[str, Any]], max_points: int = 120) -> list[dict[str, Any]]:
    if len(series) <= max_points:
        return series
    step = len(series) / max_points
    return [series[int(i * step)] for i in range(max_points)]


def build_dashboard_data(results_dir: Path, dashboard_dir: Path) -> int:
    runs: list[dict[str, Any]] = []
    for path in sorted(results_dir.glob("*.json")):
        data = json.loads(path.read_text())
        runs.append(
            {
                "manifest": data["manifest"],
                "aggregates": data["aggregates"],
                # Keep compute series small for the chart; drop raw per-request.
                "compute": _downsample(data.get("compute", [])),
            }
        )

    # Group by study; JS renders one section per study and sorts within it.
    runs.sort(key=lambda r: (r["manifest"].get("study", "latency"), r["manifest"]["label"]))

    payload = {
        "generated_runs": len(runs),
        "hardware": runs[0]["manifest"]["hardware"] if runs else {},
        "versions": runs[0]["manifest"]["versions"] if runs else {},
        "runs": runs,
    }
    dashboard_dir.mkdir(parents=True, exist_ok=True)
    (dashboard_dir / "data.js").write_text(
        "window.BENCH_DATA = " + json.dumps(payload, indent=2) + ";\n"
    )
    return len(runs)
