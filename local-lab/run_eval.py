"""Run the local quality lab: system metrics + speed + math + coding, per config.

Usage:
  uv sync --group local
  uv run python local-lab/run_eval.py            # full run
  uv run python local-lab/run_eval.py --quick    # tiny subset (smoke)
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from harness import LocalModel  # noqa: E402
from tasks import load_gsm8k, load_humaneval, run_gsm8k, run_humaneval  # noqa: E402

QUALITY_TEXT = (
    "The transformer architecture replaced recurrence with self-attention, letting "
    "every token attend to every other token in parallel. Inference is dominated by "
    "the autoregressive decode loop, which is bound by memory bandwidth, so quantization "
    "yields large speedups with usually small quality loss."
)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", type=Path, default=HERE / "configs.yaml")
    ap.add_argument("--out", type=Path, default=HERE / "results", help="results output dir")
    ap.add_argument("--quick", action="store_true", help="tiny subset for a smoke test")
    ap.add_argument("--force", action="store_true", help="re-run models even if a result already exists")
    args = ap.parse_args()

    cfg = yaml.safe_load(args.config.read_text())
    ev = cfg["eval"]
    gsm_n = 3 if args.quick else ev["gsm8k_n"]
    he_n = 3 if args.quick else ev["humaneval_n"]
    n_ex = ev.get("n_examples", 6)

    print(f"Loading datasets (gsm8k={gsm_n}, humaneval={he_n}) ...")
    gsm = load_gsm8k(gsm_n) if ev.get("run_math") else []
    hev = load_humaneval(he_n) if ev.get("run_coding") else []

    out_dir = args.out
    out_dir.mkdir(parents=True, exist_ok=True)

    for c in cfg["configs"]:
        label = c["label"]
        out_path = out_dir / f"{label.replace(' ', '_').replace('·', '').replace('/', '-')}.json"
        if out_path.exists() and not args.force:
            print(f"\n=== {label} — already done, skipping (use --force to redo) ===")
            continue
        print(f"\n=== {label} ({c['model']}) ===")
        try:
            m = LocalModel(c["model"], gen_kwargs=c.get("gen_kwargs"))
            sysm = m.load()
            print(f"  loaded: {sysm['load_time_s']}s · weights ~{sysm['weights_peak_mem_mb']}MB · disk {sysm['disk_mb']}MB")
            speed = m.speed()
            print(f"  speed: {speed['decode_tps']} tok/s · TTFT {speed['ttft_ms']}ms · TPOT {speed['tpot_ms']}ms")
            ppl = m.perplexity(QUALITY_TEXT)
            print(f"  perplexity: {ppl}")

            result = {"label": label, "model": c["model"], "family": c.get("family", "other"),
                      "kind": c.get("kind", "general"), "params_b": c.get("params_b"),
                      "system": sysm, "speed": speed, "perplexity": ppl, "tasks": {}}

            if hev:
                t0 = time.perf_counter()
                r = run_humaneval(m, hev, n_examples=n_ex)
                r["seconds"] = round(time.perf_counter() - t0, 1)
                result["tasks"]["humaneval"] = r
                print(f"  coding (HumanEval): {r['pass@1'] * 100:.1f}% pass@1 ({r['passed']}/{r['n']}) in {r['seconds']}s")
            if gsm:
                t0 = time.perf_counter()
                r = run_gsm8k(m, gsm, n_examples=n_ex)
                r["seconds"] = round(time.perf_counter() - t0, 1)
                result["tasks"]["gsm8k"] = r
                print(f"  math (GSM8K): {r['accuracy'] * 100:.1f}% ({r['correct']}/{r['n']}) in {r['seconds']}s")

            out_path.write_text(json.dumps(result, indent=2))
        except Exception as exc:
            print(f"  ✗ FAILED: {exc!r}  (skipping, continuing with next model)")

    print("\nDone. Build the report:  uv run python local-lab/report.py")


if __name__ == "__main__":
    main()
