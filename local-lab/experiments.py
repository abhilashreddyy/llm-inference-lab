"""Cross-model optimization experiments — the single, reproducible source of the
raw experiment data. One command regenerates all of results_exp/experiments.json.

Reliability features:
  - every timing is N repetitions -> mean + std (not a single noisy sample)
  - a `meta` block records hardware, library versions, timestamp, and settings
  - KV-cache memory is computed ANALYTICALLY from each model's config (exact),
    instead of read off MLX's allocator (which gave inconsistent numbers)
  - actual generated/prompt token counts are recorded per measurement

    uv run python local-lab/experiments.py --config local-lab/exp_configs/dev.yaml
"""

from __future__ import annotations

import argparse
import json
import platform
import statistics
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

import mlx.core as mx
import mlx.nn as nn
import yaml
from mlx_lm import load, stream_generate

HERE = Path(__file__).resolve().parent
OUT = HERE / "results_exp"

FACTUAL = "Explain how a transformer neural network works, step by step."
BASE_PARA = ("Explain how a transformer neural network works, including attention, "
             "feed-forward layers, residual connections, and positional encoding. ")
# fixed passage for perplexity (same text for every model -> comparable within a tokenizer family)
PPL_TEXT = (
    "A transformer processes a sequence by attending to every position at once. "
    "Each token is embedded into a vector, combined with a positional signal, and passed "
    "through stacked layers. In every layer, self-attention lets each token gather information "
    "from the others, weighting them by relevance, and a feed-forward network then transforms "
    "the result. Residual connections and normalization keep the signal stable as it flows "
    "through dozens of layers. During generation the model predicts one token at a time, "
    "appending each prediction to the context and repeating until the answer is complete."
)
PROMPTS = {
    "structured": "List the numbers 1 to 40, then the days of the week, then the months of the year.",
    "factual": FACTUAL,
    "creative": "Write an original short poem about the ocean at midnight, then a haiku about rain.",
}


# ---------------------------------------------------------------- provenance
def meta_block(reps: int, max_tokens: int) -> dict:
    info = {"generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "platform": platform.platform(), "python": platform.python_version(),
            "reps": reps, "max_tokens": max_tokens, "warmup": True, "decoding": "greedy (temp=0)",
            "timing_prompt": FACTUAL}
    try:
        info["chip"] = subprocess.run(["sysctl", "-n", "machdep.cpu.brand_string"], capture_output=True, text=True, timeout=3).stdout.strip()
        mem = subprocess.run(["sysctl", "-n", "hw.memsize"], capture_output=True, text=True, timeout=3).stdout.strip()
        if mem:
            info["memory_gb"] = round(int(mem) / (1024 ** 3), 1)
    except Exception:
        pass
    for mod in ("mlx", "mlx_lm"):
        try:
            info[mod] = __import__(mod if mod != "mlx" else "mlx.core", fromlist=["__version__"]).__version__
        except Exception:
            info[mod] = "n/a"
    return info


def _ms(xs):
    return {"mean": round(statistics.mean(xs), 2), "std": round(statistics.pstdev(xs), 2) if len(xs) > 1 else 0.0}


def _chat(tok, p):
    return tok.apply_chat_template([{"role": "user", "content": p}], add_generation_prompt=True, tokenize=False) if tok.chat_template else p


# ---------------------------------------------------------------- timing (N reps)
def measure(target, tok, prompt, draft=None, k=4, kv_bits=None, max_tokens=128, reps=3):
    """Warm up, then run `reps` generations. Returns mean primary metrics + std +
    per-rep samples + actual token counts. throughput_tps/tpot_ms/etc. are MEANS."""
    text = _chat(tok, prompt)
    gk = {}
    if draft is not None:
        gk["draft_model"] = draft; gk["num_draft_tokens"] = k
    if kv_bits:
        gk["kv_bits"] = kv_bits; gk["quantized_kv_start"] = 0
    for _ in stream_generate(target, tok, text, max_tokens=6, **gk):  # warmup
        pass
    tps_s, ttft_s, tpot_s, acc_rates = [], [], [], []
    peak = 0.0
    out_tokens = prompt_tokens = 0
    for _ in range(reps):
        mx.clear_cache(); mx.reset_peak_memory()
        t0 = time.perf_counter(); ttft = None; total = accepted = 0
        for r in stream_generate(target, tok, text, max_tokens=max_tokens, **gk):
            if ttft is None:
                ttft = time.perf_counter() - t0
            total += 1
            if getattr(r, "from_draft", False):
                accepted += 1
            prompt_tokens = getattr(r, "prompt_tokens", prompt_tokens) or prompt_tokens
        e2e = time.perf_counter() - t0
        peak = max(peak, mx.get_peak_memory() / (1024 * 1024))
        out_tokens = total
        decode = max(e2e - (ttft or 0), 1e-6)
        tps_s.append((total - 1) / decode); ttft_s.append((ttft or 0) * 1000); tpot_s.append(decode / max(total - 1, 1) * 1000)
        if draft is not None:
            tgt = total - accepted
            acc_rates.append((accepted / max(tgt, 1)) / k)
    tps, ttft_m, tpot_m = _ms(tps_s), _ms(ttft_s), _ms(tpot_s)
    o = {"throughput_tps": tps["mean"], "throughput_std": tps["std"],
         "ttft_ms": ttft_m["mean"], "ttft_std": ttft_m["std"],
         "tpot_ms": tpot_m["mean"], "tpot_std": tpot_m["std"],
         "peak_mem_mb": round(peak, 1), "output_tokens": out_tokens, "prompt_tokens": prompt_tokens, "reps": reps}
    if draft is not None:
        ar = _ms(acc_rates)
        mean_accept = ar["mean"] * k
        o.update({"k": k, "acceptance_rate": round(ar["mean"], 3), "acceptance_std": round(ar["std"], 3),
                  "mean_accepted_per_round": round(mean_accept, 2), "tokens_per_target_pass": round(mean_accept + 1, 2)})
    return o


def measure_batch(target, tok, prompt, bs, max_tokens=48, reps=3):
    from mlx_lm.models.cache import make_prompt_cache
    ids = mx.array(tok.encode(_chat(tok, prompt)))
    agg_s, per_s = [], []
    peak = 0.0
    for _ in range(reps):
        batch = mx.broadcast_to(ids[None], (bs, ids.shape[0]))
        cache = make_prompt_cache(target)
        mx.clear_cache(); mx.reset_peak_memory()
        logits = target(batch, cache=cache)[:, -1, :]; cur = logits.argmax(-1); mx.eval(cur)
        t0 = time.perf_counter()
        for _ in range(max_tokens):
            logits = target(cur[:, None], cache=cache)[:, -1, :]; cur = logits.argmax(-1)
        mx.eval(cur); dt = time.perf_counter() - t0
        peak = max(peak, mx.get_peak_memory() / (1024 * 1024))
        agg_s.append(bs * max_tokens / dt); per_s.append(max_tokens / dt)
    a, p = _ms(agg_s), _ms(per_s)
    return {"batch_size": bs, "agg_tps": a["mean"], "agg_std": a["std"], "per_stream_tps": p["mean"], "peak_mem_mb": round(peak, 1)}


# ---------------------------------------------------------------- analytical KV cache (exact)
def kv_cache_profile(model):
    a = getattr(model, "args", None) or getattr(model, "config", None)
    g = lambda *names: next((getattr(a, n) for n in names if a is not None and hasattr(a, n)), None)
    layers = g("num_hidden_layers", "n_layers")
    n_heads = g("num_attention_heads", "n_heads")
    kv_heads = g("num_key_value_heads", "n_kv_heads") or n_heads
    hidden = g("hidden_size", "d_model")
    head_dim = g("head_dim") or (hidden // n_heads if hidden and n_heads else None)
    if not (layers and kv_heads and head_dim):
        return None
    # full cache = K and V, fp16 (2 bytes); per token, all layers
    bpt_full = 2 * layers * kv_heads * head_dim * 2
    return {"layers": layers, "kv_heads": kv_heads, "head_dim": head_dim,
            "bytes_per_token": {"full": bpt_full, "8bit": bpt_full // 2, "4bit": bpt_full // 4}}


def fidelity(target, tok, prompt, kv_bits, ref_tokens):
    """Free-running greedy agreement vs a full-precision reference (output fidelity)."""
    gk = {"kv_bits": kv_bits, "quantized_kv_start": 0} if kv_bits else {}
    toks = [r.token for r in stream_generate(target, tok, _chat(tok, prompt), max_tokens=len(ref_tokens), **gk)]
    n = min(len(ref_tokens), len(toks))
    return round(sum(1 for a, b in zip(ref_tokens, toks) if a == b) / n, 3) if n else 0.0


def perplexity(model, tok, text=PPL_TEXT):
    """exp(mean token NLL) over a fixed passage — one forward pass, deterministic."""
    ids = mx.array(tok.encode(text))[None]
    logits = model(ids[:, :-1])
    nll = nn.losses.cross_entropy(logits, ids[:, 1:], reduction="mean")
    return round(float(mx.exp(nll)), 3)


def kv_detail_for(label, model, tok, weights_mb, km):
    """Per-model KV-cache study: analytical cache size vs context (exact) + measured fidelity."""
    bpt = kv_cache_profile(model)["bytes_per_token"]            # full / 8bit / 4bit, per token
    detail = {"model": label, "weights_mb": weights_mb, "bytes_per_token": bpt, "points": []}
    for ctx in km.get("contexts_tokens", [2000, 4000, 8000, 16000, 32000]):
        detail["points"].append({"ctx": (str(ctx // 1000) + "k"), "tokens": ctx,
                                 "full_mb": round(bpt["full"] * ctx / (1024 * 1024), 1),
                                 "q8_mb": round(bpt["8bit"] * ctx / (1024 * 1024), 1),
                                 "q4_mb": round(bpt["4bit"] * ctx / (1024 * 1024), 1)})
    long_text = "Summarize and continue in detail: " + BASE_PARA * km.get("fidelity_repeat", 100)
    ref = [r.token for r in stream_generate(model, tok, _chat(tok, long_text), max_tokens=120)]
    rows = [{"kv": "full", "bits": 16, "mem_pct": 100, "fidelity": 1.0}]
    for kv in (8, 4):
        rows.append({"kv": kv, "bits": kv, "mem_pct": round(100 * kv / 16), "fidelity": fidelity(model, tok, long_text, kv, ref)})
    precision = {"model": label, "context_tokens": len(tok.encode(long_text)), "rows": rows}
    return detail, precision


# ---------------------------------------------------------------- crash-safe checkpointing
def _save(out):
    """Atomically persist progress so a kill never loses completed work."""
    tmp = OUT / "experiments.json.tmp"
    tmp.write_text(json.dumps(out, indent=2))
    tmp.replace(OUT / "experiments.json")


def _skeleton(cfg, reps, mt):
    return {"meta": meta_block(reps, mt), "mode": cfg.get("mode", "full"),
            "models": [m["label"] for m in cfg["models"]], "detail_target": cfg.get("target_for_detail"),
            "spec_by_model": [], "batch_by_model": [], "kv_cache_by_model": [],
            "kv_cache_detail_by_model": [], "kv_precision_by_model": [], "quant_by_model": [],
            "combos": [], "combos_models": [], "combos_done": [], "combos_target": cfg.get("target_for_detail"),
            "spec_detail": None, "spec_detail_by_model": [], "stage1_done": []}


def _resume(cfg, reps, mt):
    """Reuse the on-disk checkpoint ONLY if it was produced by this exact config
    (same mode / reps / max_tokens / model list). Otherwise start fresh so we never
    mix runs with different parameters (e.g. the old dev pass)."""
    p = OUT / "experiments.json"
    if not p.exists():
        return None
    try:
        prev = json.loads(p.read_text())
    except Exception:
        return None
    m = prev.get("meta", {})
    same = (prev.get("mode") == cfg.get("mode", "full") and m.get("reps") == reps
            and m.get("max_tokens") == mt and prev.get("models") == [x["label"] for x in cfg["models"]])
    if not same:
        return None
    for k, v in _skeleton(cfg, reps, mt).items():     # backfill any keys missing from an older checkpoint
        prev.setdefault(k, v)
    return prev


def _purge(out, label, sections):
    for s in sections:
        out[s][:] = [r for r in out[s] if r.get("model") != label]


# ---------------------------------------------------------------- main run
STAGE1 = ["spec_by_model", "batch_by_model", "kv_cache_by_model", "kv_cache_detail_by_model", "kv_precision_by_model"]


def run(cfg) -> dict:
    OUT.mkdir(exist_ok=True)
    mt, reps = cfg.get("max_tokens", 128), cfg.get("reps", 3)
    out = _resume(cfg, reps, mt)
    if out is None:
        out = _skeleton(cfg, reps, mt)
    else:
        done = {b["model"] for b in out["batch_by_model"]}
        print(f"resuming from checkpoint — stage-1 done for: {', '.join(sorted(done)) or '(none)'}")

    # ---- per-model: speculative, batching, analytical KV-cache profile, KV fidelity ----
    stage1_done = set(out.get("stage1_done", []))               # explicit marker -> a failed sub-step can't loop forever
    for m in cfg["models"]:
        if m["label"] in stage1_done:
            print(f"\n=== {m['label']} === (cached, skipping)")
            continue
        _purge(out, m["label"], STAGE1)                          # drop any partial entries from a prior killed run
        if out.get("spec_detail", {}) and out["spec_detail"].get("target") == m["label"]:
            out["spec_detail"] = None
        print(f"\n=== {m['label']} ===")
        target, tok = load(m["model"])
        mx.clear_cache()
        weights_mb = round(mx.get_active_memory() / (1024 * 1024), 0)   # resident weights right after load
        try:
            prof = kv_cache_profile(target)
            if prof:
                out["kv_cache_by_model"].append({"model": m["label"], "params_b": m.get("params_b"), **prof})
                det, prec = kv_detail_for(m["label"], target, tok, weights_mb, cfg["kv"])
                out["kv_cache_detail_by_model"].append(det)
                out["kv_precision_by_model"].append(prec)
                print(f"  kv fidelity 8-bit/4-bit: {prec['rows'][1]['fidelity']} / {prec['rows'][2]['fidelity']}")
        except Exception as e:
            print(f"  kv-cache step failed for {m['label']}: {e}")
        if m.get("draft"):
            try:
                draft = load(m["draft"])[0]
                base = measure(target, tok, FACTUAL, max_tokens=mt, reps=reps)
                spec = measure(target, tok, FACTUAL, draft=draft, k=4, max_tokens=mt, reps=reps)
                out["spec_by_model"].append({"model": m["label"], "params_b": m.get("params_b"), "draft": m.get("draft_name", ""),
                    "baseline_tps": base["throughput_tps"], "spec_tps": spec["throughput_tps"], "spec_tps_std": spec["throughput_std"],
                    "speedup": round(spec["throughput_tps"] / base["throughput_tps"], 2),
                    "acceptance_rate": spec["acceptance_rate"], "acceptance_std": spec["acceptance_std"],
                    "mean_accepted_per_round": spec["mean_accepted_per_round"], "tokens_per_target_pass": spec["tokens_per_target_pass"],
                    "peak_mem_mb": spec["peak_mem_mb"], "baseline_mem_mb": base["peak_mem_mb"]})
                print(f"  spec {spec['throughput_tps']}±{spec['throughput_std']} vs {base['throughput_tps']} tok/s")
                del draft; mx.clear_cache()
            except Exception as e:
                print(f"  speculative step failed for {m['label']}: {e}")
        for bs in cfg["batch"]["sizes"]:
            try:
                out["batch_by_model"].append({"model": m["label"], **measure_batch(target, tok, FACTUAL, bs, cfg["batch"].get("max_tokens", 48), reps=reps)})
            except Exception as e:
                print(f"  batch size {bs} failed for {m['label']}: {e}")
        print("  batch + kv-profile done")
        del target, tok; mx.clear_cache()
        out["stage1_done"].append(m["label"])                   # mark done even if a sub-step was skipped
        _save(out)                                               # checkpoint after every model

    # ---- combination ladder (multi-model) ----
    cc = cfg["combos"]
    cdone = set(out.get("combos_done", []))                       # explicit "attempted" marker (some stacks legitimately fail)
    for cm in cc["models"]:
        has_draft = bool(cm.get("draft"))
        if cm["label"] in cdone:
            print(f"\n=== combos: {cm['label']} === (cached, skipping)")
            continue
        _purge(out, cm["label"], ["combos"])                     # drop partial stacks from a prior killed run
        out["combos_models"][:] = [x for x in out["combos_models"] if x != cm["label"]]
        print(f"\n=== combos: {cm['label']} ===")
        int4m, tok = load(cm["int4"]); draft = load(cm["draft"])[0] if has_draft else None
        out["combos_models"].append(cm["label"])
        for st in cc["stacks"]:
            prec = st["precision"]
            sp = bool(st.get("spec", False))
            if prec != "int4" and not cm.get(prec):              # precision not defined for this model -> skip stack
                print(f"   skip stack '{st.get('label')}' — no {prec} checkpoint for {cm['label']}")
                continue
            if sp and not has_draft:                              # speculative stack but no draft model -> skip
                print(f"   skip stack '{st.get('label')}' — no draft model for {cm['label']}")
                continue
            if prec == "int4":
                mdl = int4m
            else:
                try:
                    mdl = load(cm[prec])[0]
                except Exception as e:                            # missing/unreachable repo -> skip stack, keep going
                    print(f"   skip stack '{st.get('label')}' — load failed for {cm['label']} {prec}: {e}")
                    continue
            kv = None if st.get("kv") in (None, False, "off") else st["kv"]
            try:
                r = measure(mdl, tok, FACTUAL, draft=(draft if sp else None), k=4, kv_bits=kv, max_tokens=mt, reps=reps)
                out["combos"].append({"model": cm["label"], "precision": prec, "kv": "off" if kv is None else kv, "spec": sp,
                                      "label": st.get("label"), "throughput_tps": r["throughput_tps"], "throughput_std": r["throughput_std"],
                                      "tpot_ms": r["tpot_ms"], "peak_mem_mb": r["peak_mem_mb"]})
            except Exception as e:                                # e.g. mlx_lm gemma2 + quantized KV cache -> skip stack
                print(f"   skip stack '{st.get('label')}' — measure failed for {cm['label']}: {e}")
            if prec != "int4":
                del mdl; mx.clear_cache()
        del int4m, tok, draft; mx.clear_cache()
        out["combos_done"].append(cm["label"])                   # attempted -> never re-run (even if a stack legitimately failed)
        _save(out)                                               # checkpoint after every combos model
    out["combos_target"] = out["combos_models"][0] if out["combos_models"] else None

    # ---- quantization per model: bf16 / 8-bit / 4-bit -> speed, memory, perplexity ----
    for qm in cfg.get("quant", {}).get("models", []):
        want = [pk for pk, _ in (("bf16", 16), ("int8", 8), ("int4", 4)) if qm.get(pk)]
        have = {r["precision"] for r in out["quant_by_model"] if r.get("model") == qm["label"]}
        if want and have >= set(want):
            print(f"\n=== quant: {qm['label']} === (cached, skipping)")
            continue
        print(f"\n=== quant: {qm['label']} ===")
        for prec_key, bits in (("bf16", 16), ("int8", 8), ("int4", 4)):
            mid = qm.get(prec_key)
            if not mid or prec_key in have:                         # already measured in a prior run
                continue
            try:
                mdl, qtok = load(mid)
            except Exception as e:                                  # missing/uncached checkpoint -> skip, keep the rest
                print(f"   skip {prec_key} ({mid}): {e}")
                continue
            r = measure(mdl, qtok, FACTUAL, max_tokens=mt, reps=reps)
            ppl = perplexity(mdl, qtok)
            out["quant_by_model"].append({"model": qm["label"], "precision": prec_key, "bits": bits,
                                          "throughput_tps": r["throughput_tps"], "throughput_std": r["throughput_std"],
                                          "peak_mem_mb": r["peak_mem_mb"], "perplexity": ppl})
            print(f"   {prec_key}: {r['throughput_tps']} tok/s, {r['peak_mem_mb']} MB, ppl {ppl}")
            del mdl, qtok
            mx.clear_cache()
            _save(out)                                              # checkpoint after every precision

    # ---- speculative deep-dive (k-sweep + prompt-sweep) for EVERY model with a draft ----
    sd_done = {s["target"] for s in out.get("spec_detail_by_model", [])}
    for m in cfg["models"]:
        if not m.get("draft"):
            continue
        if m["label"] in sd_done:
            print(f"\n=== spec-detail: {m['label']} === (cached, skipping)")
            continue
        print(f"\n=== spec-detail: {m['label']} ===")
        try:
            tgt, tok = load(m["model"]); drf = load(m["draft"])[0]
            out["spec_detail_by_model"].append({"target": m["label"], **spec_detail_for(tgt, tok, drf, cfg, mt, reps)})
            del tgt, tok, drf; mx.clear_cache()
            _save(out)
        except Exception as e:
            print(f"  spec-detail failed for {m['label']}: {e}")

    # default single-model views (detail target) for backward-compatible dashboard fields
    dt = cfg.get("target_for_detail")
    pick = lambda xs: next((x for x in xs if x["model"] == dt), xs[0] if xs else None)
    out["kv_cache_detail"] = pick(out["kv_cache_detail_by_model"])
    out["kv_precision"] = pick(out["kv_precision_by_model"])
    sdbm = out["spec_detail_by_model"]                              # back-compat single (keyed by "target", not "model")
    out["spec_detail"] = next((s for s in sdbm if s["target"] == dt), sdbm[0] if sdbm else None)

    (OUT / "experiments.json").write_text(json.dumps(out, indent=2))
    print(f"\nWrote {OUT/'experiments.json'} — reps={reps}, {len(out['models'])} models")
    return out


def spec_detail_for(target, tok, draft, cfg, mt, reps):
    """Per-model deep-dive: k-sweep + prompt-sweep using the model's OWN draft
    (so it works for every family, not just the Qwen detail target)."""
    d = {"baseline": measure(target, tok, FACTUAL, max_tokens=mt, reps=reps), "k_sweep": [], "prompt_sweep": []}
    for k in cfg["spec"]["k_sweep"]:
        d["k_sweep"].append({**measure(target, tok, FACTUAL, draft=draft, k=k, max_tokens=mt, reps=reps), "k": k})
    for name, prompt in PROMPTS.items():
        d["prompt_sweep"].append({**measure(target, tok, prompt, draft=draft, k=4, max_tokens=mt, reps=reps), "prompt_type": name})
    return d


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", type=Path, default=HERE / "exp_configs" / "dev.yaml")
    args = ap.parse_args()
    run(yaml.safe_load(args.config.read_text()))
