"""Write dashboard/exp-data.js from results_exp/experiments.json (deep-dive page)."""

from __future__ import annotations

import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
DASH = HERE.parent / "dashboard"


def build() -> bool:
    src = HERE / "results_exp" / "experiments.json"
    payload = json.loads(src.read_text()) if src.exists() else {}
    DASH.mkdir(exist_ok=True)
    (DASH / "exp-data.js").write_text("window.EXP_DATA = " + json.dumps(payload, indent=2) + ";\n")
    return src.exists()


if __name__ == "__main__":
    ok = build()
    print("Wrote dashboard/exp-data.js" + ("" if ok else " (empty — experiments not run yet)"))
