"""llmbench CLI:  uv run llmbench run|report|serve"""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

import typer
import yaml
from rich.console import Console

from .report import build_dashboard_data
from .runner import run_batch_spec, run_spec

app = typer.Typer(add_completion=False, help="Local-first LLM inference benchmark harness.")
console = Console()

ROOT = Path(__file__).resolve().parents[2]
RESULTS = ROOT / "results"
DASHBOARD = ROOT / "dashboard"


@app.command()
def run(
    config: Path = typer.Option(ROOT / "configs" / "experiment.yaml", help="Experiment YAML."),
    only: str = typer.Option(None, help="Substring filter on run labels."),
):
    """Run every engine spec in the config and write results/*.json."""
    cfg = yaml.safe_load(config.read_text())
    workload, cost, specs = cfg["workload"], cfg.get("cost", {}), cfg["runs"]
    if only:
        specs = [s for s in specs if only.lower() in s["label"].lower()]
    console.rule(f"[bold]Benchmark · {len(specs)} run(s) · {workload.get('num_requests', 'batch')} req each")
    # Each spec runs in its own subprocess so memory is measured in isolation
    # (a fresh interpreter loads exactly one model, then fully reclaims it).
    for spec in specs:
        payload = {"spec": spec, "workload": workload, "cost": cost}
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as fh:
            json.dump(payload, fh)
            tmp = fh.name
        rc = subprocess.run([sys.executable, "-m", "llmbench.cli", "run-one", tmp]).returncode
        Path(tmp).unlink(missing_ok=True)
        if rc != 0:
            console.print(f"  [red]✗ {spec['label']} exited with code {rc}[/]")
    console.print("\nNext: [bold]uv run llmbench report[/] to refresh the dashboard.")


@app.command("run-one")
def run_one(payload: Path):
    """Internal: run a single engine spec from a JSON payload (one per process)."""
    d = json.loads(payload.read_text())
    spec = d["spec"]
    try:
        if spec.get("mode") == "batch":
            run_batch_spec(spec, d["workload"], d["cost"], RESULTS, console=console)
        else:
            run_spec(spec, d["workload"], d["cost"], RESULTS, console=console)
    except Exception as exc:
        console.print(f"  [red]✗ {spec['label']} failed:[/] {exc!r}")
        raise typer.Exit(1)


@app.command()
def report():
    """Aggregate results/*.json into dashboard/data.js."""
    n = build_dashboard_data(RESULTS, DASHBOARD)
    console.print(f"[green]✓[/] wrote dashboard/data.js from {n} run(s).")
    console.print("View: [bold]uv run llmbench serve[/]")


@app.command()
def serve(port: int = 8000):
    """Serve the dashboard locally."""
    import http.server
    import os
    import socketserver

    os.chdir(DASHBOARD)
    with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
        console.print(f"Dashboard: [bold]http://localhost:{port}[/]  (Ctrl-C to stop)")
        httpd.serve_forever()


if __name__ == "__main__":
    app()
