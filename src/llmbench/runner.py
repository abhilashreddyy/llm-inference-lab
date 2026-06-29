"""Run a benchmark config: for each engine spec, drive load and record metrics."""

from __future__ import annotations

import json
import platform
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path
from queue import Queue
from typing import Any

from .engines import build_engine
from .schema import RequestRecord, RunManifest, RunResult
from .stats import aggregate
from .telemetry import TelemetrySampler

# Fixed passage for perplexity (quality). Same text across all quant levels so
# the numbers are directly comparable. ~200 tokens of varied prose.
QUALITY_TEXT = (
    "The transformer architecture revolutionized natural language processing by "
    "replacing recurrence with self-attention, letting every token attend to every "
    "other token in parallel. This parallelism made training on large corpora "
    "practical and unlocked models with hundreds of billions of parameters. "
    "Inference, however, is dominated by the autoregressive decode loop, where tokens "
    "are produced one at a time and each step must read the entire key-value cache "
    "from memory. As a result, decoding is bound by memory bandwidth rather than raw "
    "compute, which is why quantization and KV-cache compression yield such large "
    "speedups. Quantization reduces the precision of the weights, shrinking both the "
    "memory footprint and the bandwidth required per step, usually with only a small "
    "loss in output quality that a well-chosen scheme keeps negligible."
)


def _git_commit() -> str:
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            cwd=Path(__file__).resolve().parent,
            capture_output=True,
            text=True,
            timeout=5,
        )
        return out.stdout.strip() or "n/a"
    except Exception:
        return "n/a"


def _hardware() -> dict[str, Any]:
    info: dict[str, Any] = {
        "platform": platform.platform(),
        "machine": platform.machine(),
        "cpu": platform.processor() or platform.machine(),
        "python": platform.python_version(),
    }
    try:  # macOS chip name + memory
        info["chip"] = subprocess.run(
            ["sysctl", "-n", "machdep.cpu.brand_string"],
            capture_output=True, text=True, timeout=3,
        ).stdout.strip()
        mem = subprocess.run(
            ["sysctl", "-n", "hw.memsize"], capture_output=True, text=True, timeout=3
        ).stdout.strip()
        if mem:
            info["memory_gb"] = round(int(mem) / (1024 ** 3), 1)
    except Exception:
        pass
    return info


def _versions() -> dict[str, str]:
    out: dict[str, str] = {}
    for mod in ("torch", "transformers", "mlx_lm"):
        try:
            out[mod] = __import__(mod).__version__
        except Exception:
            out[mod] = "n/a"
    try:
        import mlx.core as _mx

        out["mlx"] = _mx.__version__
    except Exception:
        out["mlx"] = "n/a"
    return out


def _run_one_request(engine, req_id: int, prompt: str, max_tokens: int) -> RequestRecord:
    start = time.perf_counter()
    start_ts = time.time()
    ttft = None
    try:
        for _piece in engine.generate_stream(prompt, max_tokens):
            if ttft is None:
                ttft = time.perf_counter() - start
        end = time.perf_counter()
        stats = engine.last_stats
        out_tok = stats["output_tokens"]
        e2e = end - start
        ttft = ttft if ttft is not None else e2e
        decode_time = max(e2e - ttft, 1e-6)
        tpot = decode_time / max(out_tok - 1, 1)
        decode_tps = (out_tok - 1) / decode_time if out_tok > 1 else 0.0
        return RequestRecord(
            request_id=req_id,
            prompt_tokens=stats["prompt_tokens"],
            output_tokens=out_tok,
            ttft_s=ttft,
            e2e_s=e2e,
            tpot_s=tpot,
            decode_tps=decode_tps,
            start_ts=start_ts,
            end_ts=time.time(),
            ok=True,
        )
    except Exception as exc:  # keep the run alive; record the failure
        return RequestRecord(
            request_id=req_id, prompt_tokens=0, output_tokens=0, ttft_s=0.0,
            e2e_s=time.perf_counter() - start, tpot_s=0.0, decode_tps=0.0,
            start_ts=start_ts, end_ts=time.time(), ok=False, error=repr(exc),
        )


def run_spec(spec: dict[str, Any], workload: dict[str, Any], cost: dict[str, Any],
             results_dir: Path, console=None) -> RunResult:
    label = spec["label"]
    if console:
        console.print(f"[bold cyan]▶ {label}[/]  ({spec['engine']} · {spec['model']})")

    engine = build_engine(
        spec["engine"], spec["model"], quant=spec.get("quant", "fp16"),
        **spec.get("engine_args", {}),
    )

    t0 = time.perf_counter()
    engine.load()
    load_time = time.perf_counter() - t0

    prompts: list[str] = workload["prompts"]
    # Lengthen prompts to stress the KV cache (kv-cache study uses long context).
    repeat = int(workload.get("prompt_repeat", 1))
    if repeat > 1:
        prompts = [(p + " ") * repeat for p in prompts]
    n = int(workload["num_requests"])
    # A run may override workload concurrency — that's the concurrency sweep.
    concurrency = int(spec.get("concurrency", workload.get("concurrency", 1)))
    max_tokens = int(workload["max_output_tokens"])

    # Warmup (excluded from metrics): triggers kernel compile / cache alloc.
    for _ in engine.generate_stream(prompts[0], min(16, max_tokens)):
        pass

    # Optional quality measurement (perplexity) on a fixed passage.
    quality = None
    if spec.get("measure_quality") and hasattr(engine, "perplexity"):
        try:
            quality = engine.perplexity(QUALITY_TEXT)
        except Exception as exc:
            if console:
                console.print(f"  [yellow]quality skipped:[/] {exc!r}")

    queue: Queue[tuple[int, str]] = Queue()
    for i in range(n):
        queue.put((i, prompts[i % len(prompts)]))

    records: list[RequestRecord] = []

    def worker() -> list[RequestRecord]:
        local: list[RequestRecord] = []
        while True:
            try:
                req_id, prompt = queue.get_nowait()
            except Exception:
                break
            local.append(_run_one_request(engine, req_id, prompt, max_tokens))
        return local

    with TelemetrySampler() as sampler:
        wall_start = time.perf_counter()
        with ThreadPoolExecutor(max_workers=concurrency) as pool:
            for fut in [pool.submit(worker) for _ in range(concurrency)]:
                records.extend(fut.result())
        wall = time.perf_counter() - wall_start

    records.sort(key=lambda r: r.request_id)
    agg = aggregate(records, wall, sampler.samples, cost.get("price_per_hour"))

    # Study-specific extras.
    if quality is not None:
        agg["quality"] = {"perplexity": quality}
    if hasattr(engine, "acceptance_rate"):
        ar = engine.acceptance_rate()
        if ar is not None:
            agg["draft_acceptance"] = ar

    info = engine.info()
    run_id = f"{spec['engine']}-{spec.get('quant', 'fp16')}-{int(time.time())}"
    manifest = RunManifest(
        run_id=run_id, label=label, engine=spec["engine"], model=spec["model"],
        quant=spec.get("quant", "fp16"), dtype=info["dtype"], device=info["device"],
        concurrency=concurrency, num_requests=n, max_output_tokens=max_tokens,
        load_time_s=round(load_time, 2), hardware=_hardware(), versions=_versions(),
        git_commit=_git_commit(),
        timestamp=datetime.now(timezone.utc).isoformat(timespec="seconds"),
        study=spec.get("study", "latency"), params=spec.get("params", {}),
        price_per_hour=cost.get("price_per_hour"),
    )
    result = RunResult(manifest=manifest, aggregates=agg, requests=records, compute=sampler.samples)

    results_dir.mkdir(parents=True, exist_ok=True)
    out_path = results_dir / f"{run_id}.json"
    out_path.write_text(json.dumps(result.to_dict(), indent=2))

    if console:
        c = agg
        extra = ""
        if "quality" in c:
            extra += f" · ppl {c['quality']['perplexity']}"
        if "draft_acceptance" in c:
            extra += f" · accept {c['draft_acceptance'] * 100:.0f}%"
        console.print(
            f"  [green]✓[/] thrpt [bold]{c['system_throughput_tps']}[/] tok/s · "
            f"TTFT p50 {c['ttft_ms']['p50']}ms · TPOT p50 {c['tpot_ms']['p50']}ms · "
            f"peak mem {c.get('compute', {}).get('peak_accel_mem_mb', '?')}MB{extra} · "
            f"load {load_time:.1f}s -> {out_path.name}"
        )
    return result


def run_batch_spec(spec, workload, cost, results_dir: Path, console=None) -> list[RunResult]:
    """Static-batching study: sweep batch sizes, one RunResult per size."""
    label = spec["label"]
    if console:
        console.print(f"[bold cyan]▶ {label}[/]  ({spec['engine']} · {spec['model']})")
    engine = build_engine(
        spec["engine"], spec["model"], quant=spec.get("quant", "fp16"),
        **spec.get("engine_args", {}),
    )
    if not hasattr(engine, "batched_throughput"):
        raise RuntimeError(f"engine '{spec['engine']}' has no batched_throughput (use mlx).")

    t0 = time.perf_counter()
    engine.load()
    load_time = time.perf_counter() - t0

    prompt = workload["prompts"][0]
    max_tokens = int(workload["max_output_tokens"])
    batch_sizes = spec.get("batch_sizes", [1, 4, 8, 16])

    engine.batched_throughput(prompt, 1, min(8, max_tokens))  # warmup

    results: list[RunResult] = []
    for bs in batch_sizes:
        with TelemetrySampler() as sampler:
            r = engine.batched_throughput(prompt, bs, max_tokens)
        compute = {"peak_accel_mem_mb": r.get("peak_mem_mb")}
        if sampler.samples:
            compute["peak_rss_mb"] = round(max(c.rss_mb for c in sampler.samples), 1)
            compute["samples"] = len(sampler.samples)
        agg = {
            "system_throughput_tps": r["aggregate_tps"],
            "per_stream_tps": r["per_stream_tps"],
            "total_output_tokens": r["output_tokens"],
            "wall_clock_s": r["wall_s"],
            "compute": compute,
            "cost_per_1m_tokens_usd": None,
        }
        info = engine.info()
        run_id = f"batch-{bs}-{int(time.time())}-{bs}"
        manifest = RunManifest(
            run_id=run_id, label=f"batch size {bs}", engine=spec["engine"], model=spec["model"],
            quant=spec.get("quant", "fp16"), dtype=info["dtype"], device=info["device"],
            concurrency=bs, num_requests=bs, max_output_tokens=max_tokens,
            load_time_s=round(load_time, 2), hardware=_hardware(), versions=_versions(),
            git_commit=_git_commit(),
            timestamp=datetime.now(timezone.utc).isoformat(timespec="seconds"),
            study="batching", params={"batch_size": bs},
            price_per_hour=cost.get("price_per_hour"),
        )
        result = RunResult(manifest=manifest, aggregates=agg, requests=[], compute=sampler.samples)
        results_dir.mkdir(parents=True, exist_ok=True)
        (results_dir / f"{run_id}.json").write_text(json.dumps(result.to_dict(), indent=2))
        results.append(result)
        if console:
            console.print(f"  [green]✓[/] batch {bs:>2}: {r['aggregate_tps']} tok/s aggregate "
                          f"({r['per_stream_tps']} per stream)")
    return results
