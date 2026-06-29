"""Render the local quality lab results as a markdown table + a small HTML page."""

from __future__ import annotations

import glob
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent


def load_results() -> list[dict]:
    rows = [json.loads(Path(f).read_text()) for f in sorted(glob.glob(str(HERE / "results" / "*.json")))]
    return rows


def _cells(r: dict) -> list[str]:
    s, sp = r["system"], r["speed"]
    g = r["tasks"].get("gsm8k", {})
    h = r["tasks"].get("humaneval", {})
    return [
        r["label"],
        f"{s.get('disk_mb', '—')}",
        f"{s.get('weights_peak_mem_mb', '—')}",
        f"{sp.get('decode_tps', '—')}",
        f"{sp.get('tpot_ms', '—')}",
        f"{r.get('perplexity', '—')}",
        f"{g.get('accuracy', 0) * 100:.1f}%" if g else "—",
        f"{h.get('pass@1', 0) * 100:.1f}%" if h else "—",
    ]


HEADERS = ["Model", "Disk MB", "Weights MB", "Decode tok/s", "TPOT ms",
           "Perplexity", "GSM8K (math)", "HumanEval (code) pass@1"]


def to_markdown(rows: list[dict]) -> str:
    lines = ["| " + " | ".join(HEADERS) + " |",
             "|" + "|".join(["---"] * len(HEADERS)) + "|"]
    for r in rows:
        lines.append("| " + " | ".join(_cells(r)) + " |")
    return "\n".join(lines)


def to_html(rows: list[dict]) -> str:
    body = "".join(
        "<tr>" + "".join(f"<td>{c}</td>" for c in _cells(r)) + "</tr>" for r in rows
    )
    head = "".join(f"<th>{h}</th>" for h in HEADERS)
    return f"""<!doctype html><meta charset=utf-8><title>Local LLM quality lab</title>
<style>body{{font-family:ui-sans-serif,system-ui;background:#0b0f17;color:#e6edf6;padding:32px}}
h1{{font-size:22px}}table{{border-collapse:collapse;width:100%;font-size:14px;margin-top:16px}}
th,td{{padding:10px 12px;border-bottom:1px solid #243049;text-align:right}}
th:first-child,td:first-child{{text-align:left}}thead th{{color:#93a1b5;font-size:12px;text-transform:uppercase}}
caption{{color:#93a1b5;font-size:13px;text-align:left;margin-bottom:8px}}</style>
<h1>Local LLM quality lab — coding & math on Apple Silicon</h1>
<table><caption>System metrics + speed + measured quality, per model/quant. Run locally with MLX.</caption>
<thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>"""


def main() -> None:
    rows = load_results()
    if not rows:
        print("No results. Run: uv run python local-lab/run_eval.py")
        return
    md = to_markdown(rows)
    (HERE / "report.md").write_text(md + "\n")
    (HERE / "report.html").write_text(to_html(rows))
    print(md)
    print(f"\nWrote {HERE/'report.md'} and {HERE/'report.html'}")


if __name__ == "__main__":
    main()
