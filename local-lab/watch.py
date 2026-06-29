"""Live progress view for the model eval. Run in a terminal:
    uv run python local-lab/watch.py
Reads the result files as they're written — no dependency on the run's log."""

from __future__ import annotations

import glob
import json
import os
import time
from pathlib import Path

import yaml

HERE = Path(__file__).resolve().parent


def planned() -> list[str]:
    cfg = yaml.safe_load((HERE / "configs.yaml").read_text())
    return [c["label"] for c in cfg.get("configs", [])]


def snapshot() -> str:
    labels = planned()
    done = {}
    for f in glob.glob(str(HERE / "results" / "*.json")):
        try:
            d = json.loads(Path(f).read_text())
            done[d["label"]] = d
        except Exception:
            pass
    lines = [f"  Model eval progress — {len(done)}/{len(labels)} done", "  " + "-" * 52]
    for lbl in labels:
        if lbl in done:
            d = done[lbl]
            he = d["tasks"].get("humaneval", {}).get("pass@1")
            gs = d["tasks"].get("gsm8k", {}).get("accuracy")
            he = f"{he*100:4.1f}%" if he is not None else "  -  "
            gs = f"{gs*100:4.1f}%" if gs is not None else "  -  "
            lines.append(f"  [done] {lbl:<22} code {he}  math {gs}")
        else:
            mark = "running…" if lbl == next((x for x in labels if x not in done), None) else "queued"
            lines.append(f"  [    ] {lbl:<22} {mark}")
    return "\n".join(lines)


def main() -> None:
    total = len(planned())
    while True:
        os.system("clear")
        print(snapshot())
        n = len(glob.glob(str(HERE / "results" / "*.json")))
        if n >= total:
            print("\n  All models done. Build the report:  uv run python local-lab/build_dashboard.py")
            break
        print("\n  (updates every 5s · Ctrl-C to stop)")
        time.sleep(5)


if __name__ == "__main__":
    main()
