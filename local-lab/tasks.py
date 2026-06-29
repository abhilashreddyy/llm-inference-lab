"""Quality tasks: math reasoning (GSM8K) and coding (HumanEval pass@1).

Coding is the headline: "how close is a local quantized model to a usable coding
assistant?" — measured the standard way, by executing generated code against the
benchmark's own unit tests.
"""

from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from pathlib import Path


# ----------------------------- GSM8K (math) -----------------------------------
def load_gsm8k(n: int):
    from datasets import load_dataset

    ds = load_dataset("openai/gsm8k", "main", split=f"test[:{n}]")
    return list(ds)


_NUM = re.compile(r"-?\d[\d,]*\.?\d*")


def _last_number(text: str) -> str | None:
    nums = _NUM.findall(text.replace(",", ""))
    return nums[-1].rstrip(".") if nums else None


def gsm8k_gold(item: dict) -> str:
    return item["answer"].split("####")[-1].strip().replace(",", "")


def run_gsm8k(model, items: list, max_tokens: int = 512, n_examples: int = 6) -> dict:
    correct = 0
    examples = []
    for i, it in enumerate(items):
        prompt = (
            "Solve the math problem. Show brief reasoning, then end with a line "
            "'The answer is <number>.'\n\nProblem: " + it["question"]
        )
        out = model.generate(prompt, max_tokens=max_tokens)
        pred = _last_number(out)
        gold = _last_number(gsm8k_gold(it))
        ok = pred is not None and gold is not None and abs(float(pred) - float(gold)) < 1e-6
        correct += int(ok)
        if i < n_examples:
            examples.append({"idx": i, "question": it["question"], "answer": out.strip()[:1200],
                             "predicted": pred, "gold": gold, "correct": ok})
    return {"task": "gsm8k", "n": len(items), "correct": correct,
            "accuracy": round(correct / len(items), 4) if items else 0.0, "examples": examples}


# --------------------------- HumanEval (coding) -------------------------------
def load_humaneval(n: int):
    from datasets import load_dataset

    ds = load_dataset("openai/openai_humaneval", split=f"test[:{n}]")
    return list(ds)


def _extract_code(text: str) -> str:
    """Pull a python code block out of an instruct model's reply."""
    m = re.search(r"```(?:python)?\s*(.*?)```", text, re.DOTALL)
    return (m.group(1) if m else text).strip()


def _exec_humaneval(solution: str, test: str, entry_point: str, timeout: int = 15) -> bool:
    program = f"{solution}\n\n{test}\n\ncheck({entry_point})\n"
    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as fh:
        fh.write(program)
        path = fh.name
    try:
        r = subprocess.run([sys.executable, path], capture_output=True, timeout=timeout)
        return r.returncode == 0
    except Exception:
        return False
    finally:
        Path(path).unlink(missing_ok=True)


def run_humaneval(model, items: list, max_tokens: int = 640, n_examples: int = 6) -> dict:
    """pass@1 with greedy decoding. WARNING: executes model-generated code in a
    subprocess (standard for HumanEval). Run only on code you're willing to execute."""
    passed = 0
    examples = []
    for i, it in enumerate(items):
        prompt = (
            "Complete the following Python function. Reply with the complete function "
            "in a single ```python code block, including the signature and any imports.\n\n"
            f"```python\n{it['prompt']}```"
        )
        out = model.generate(prompt, max_tokens=max_tokens)
        solution = _extract_code(out)
        if it["entry_point"] not in solution:  # model didn't define the function
            solution = it["prompt"] + solution
        ok = _exec_humaneval(solution, it["test"], it["entry_point"])
        passed += int(ok)
        if i < n_examples:
            examples.append({"idx": i, "question": it["prompt"], "answer": solution[:1200],
                             "entry_point": it["entry_point"], "correct": ok})
    return {"task": "humaneval", "n": len(items), "passed": passed,
            "pass@1": round(passed / len(items), 4) if items else 0.0, "examples": examples}
