"""Turn local-lab/results/*.json into dashboard/models-data.js for the Models +
Examples pages. Examples are regrouped by question so models sit side-by-side."""

from __future__ import annotations

import argparse
import glob
import json
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
DASH = HERE.parent / "dashboard"

# Models showcased across the WHOLE dashboard (Models, Scorecard, Examples, Summary).
# Standardized on the small (<=3.8B) set so every tab — including Optimizations, which
# is bounded by what fits in memory — shows the exact same models. Keep in sync with
# local-lab/exp_configs/full_small.yaml. Set to [] to show every evaluated model.
SHOWCASE = ["Qwen2.5-3B", "Qwen2.5-1.5B", "Llama-3.2-3B", "Gemma-2-2B", "Phi-3.5-mini", "Qwen2.5-Coder-3B"]


def _hardware() -> dict:
    info = {}
    try:
        info["chip"] = subprocess.run(["sysctl", "-n", "machdep.cpu.brand_string"],
                                      capture_output=True, text=True, timeout=3).stdout.strip()
        mem = subprocess.run(["sysctl", "-n", "hw.memsize"], capture_output=True, text=True, timeout=3).stdout.strip()
        if mem:
            info["memory_gb"] = round(int(mem) / (1024 ** 3), 1)
    except Exception:
        pass
    return info


def _planned_labels(config_path: Path) -> list[str]:
    try:
        import yaml

        cfg = yaml.safe_load(config_path.read_text())
        return [c["label"] for c in cfg.get("configs", [])]
    except Exception:
        return []


def build(results_dir: Path | None = None, config_path: Path | None = None) -> int:
    results_dir = results_dir or (HERE / "results")
    config_path = config_path or (HERE / "configs.yaml")
    results = [json.loads(Path(f).read_text()) for f in sorted(glob.glob(str(results_dir / "*.json")))]
    if SHOWCASE:                                                 # restrict the whole dashboard to the standard set
        keep = set(SHOWCASE)
        results = [r for r in results if r["label"] in keep]
        results.sort(key=lambda r: SHOWCASE.index(r["label"]))   # display in SHOWCASE order
    models, tests = [], {}
    examples = {"humaneval": {}, "gsm8k": {}}

    for r in results:
        he = r["tasks"].get("humaneval", {})
        gs = r["tasks"].get("gsm8k", {})
        if he.get("n"):
            tests["humaneval_n"] = he["n"]
        if gs.get("n"):
            tests["gsm8k_n"] = gs["n"]
        models.append({
            "label": r["label"], "family": r.get("family"), "kind": r.get("kind"),
            "params_b": r.get("params_b"),
            "disk_mb": r["system"].get("disk_mb"), "weights_mb": r["system"].get("weights_peak_mem_mb"),
            "load_s": r["system"].get("load_time_s"),
            "decode_tps": r["speed"].get("decode_tps"), "ttft_ms": r["speed"].get("ttft_ms"),
            "tpot_ms": r["speed"].get("tpot_ms"), "perplexity": r.get("perplexity"),
            "humaneval": he.get("pass@1"), "humaneval_passed": he.get("passed"), "humaneval_n": he.get("n"),
            "gsm8k": gs.get("accuracy"), "gsm8k_correct": gs.get("correct"), "gsm8k_n": gs.get("n"),
        })
        # regroup examples by question index so each question lists every model's answer
        for task in ("humaneval", "gsm8k"):
            for ex in r["tasks"].get(task, {}).get("examples", []):
                slot = examples[task].setdefault(ex["idx"], {
                    "idx": ex["idx"], "question": ex["question"],
                    "gold": ex.get("gold"), "entry_point": ex.get("entry_point"), "answers": {},
                })
                slot["answers"][r["label"]] = {
                    "answer": ex["answer"], "correct": ex["correct"], "predicted": ex.get("predicted"),
                }

    planned = _planned_labels(config_path)
    if SHOWCASE:                                                 # pending should reflect only the showcased set
        planned = [lbl for lbl in planned if lbl in set(SHOWCASE)]
    done = {m["label"] for m in models}
    pending = [lbl for lbl in planned if lbl not in done]
    payload = {
        "generated": len(models),
        "total_planned": len(planned) or len(models),
        "pending": pending,
        "hardware": _hardware(),
        "tests": tests,
        "models": models,
        "examples": {t: list(examples[t].values()) for t in examples},
    }
    DASH.mkdir(exist_ok=True)
    (DASH / "models-data.js").write_text("window.MODELS_DATA = " + json.dumps(payload, indent=2) + ";\n")
    return len(models)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--results", type=Path, default=None, help="results dir (default: local-lab/results)")
    ap.add_argument("--config", type=Path, default=None, help="config for planned-model list (default: configs.yaml)")
    args = ap.parse_args()
    n = build(args.results, args.config)
    print(f"Wrote dashboard/models-data.js from {n} model(s).")
