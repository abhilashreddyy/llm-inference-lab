"""Aggregate per-request records into the metrics people actually quote."""

from __future__ import annotations

from typing import Any

from .schema import ComputeSample, RequestRecord


def percentile(values: list[float], p: float) -> float:
    """Linear-interpolated percentile (p in [0, 100]). Empty -> 0.0."""
    if not values:
        return 0.0
    s = sorted(values)
    if len(s) == 1:
        return s[0]
    k = (len(s) - 1) * (p / 100.0)
    lo = int(k)
    hi = min(lo + 1, len(s) - 1)
    frac = k - lo
    return s[lo] * (1 - frac) + s[hi] * frac


def _pcts(values: list[float], scale: float = 1.0) -> dict[str, float]:
    return {
        "p50": round(percentile(values, 50) * scale, 3),
        "p90": round(percentile(values, 90) * scale, 3),
        "p99": round(percentile(values, 99) * scale, 3),
        "mean": round((sum(values) / len(values)) * scale, 3) if values else 0.0,
    }


def aggregate(
    records: list[RequestRecord],
    wall_clock_s: float,
    compute: list[ComputeSample],
    price_per_hour: float | None,
) -> dict[str, Any]:
    """Compute the headline metrics from raw records + telemetry."""
    ok = [r for r in records if r.ok]
    n_ok = len(ok)
    n_fail = len(records) - n_ok

    total_out = sum(r.output_tokens for r in ok)
    total_in = sum(r.prompt_tokens for r in ok)

    # System throughput is the money metric: aggregate output tokens per wall second.
    sys_tps = total_out / wall_clock_s if wall_clock_s > 0 else 0.0
    req_per_s = n_ok / wall_clock_s if wall_clock_s > 0 else 0.0

    # Per-request decode speed (how fast a single stream emits tokens).
    decode_tps = [r.decode_tps for r in ok if r.decode_tps > 0]

    agg: dict[str, Any] = {
        "requests_ok": n_ok,
        "requests_failed": n_fail,
        "wall_clock_s": round(wall_clock_s, 3),
        "total_input_tokens": total_in,
        "total_output_tokens": total_out,
        "system_throughput_tps": round(sys_tps, 2),
        "requests_per_s": round(req_per_s, 3),
        "decode_tps_per_req": _pcts(decode_tps),
        "ttft_ms": _pcts([r.ttft_s for r in ok], scale=1000.0),
        "tpot_ms": _pcts([r.tpot_s for r in ok], scale=1000.0),
        "e2e_ms": _pcts([r.e2e_s for r in ok], scale=1000.0),
    }

    # Compute / memory usage from telemetry samples.
    if compute:
        rss = [c.rss_mb for c in compute]
        cpu = [c.cpu_pct for c in compute]
        accel = [c.accel_mem_mb for c in compute if c.accel_mem_mb is not None]
        gpu_util = [c.gpu_util_pct for c in compute if c.gpu_util_pct is not None]
        gpu_pow = [c.gpu_power_w for c in compute if c.gpu_power_w is not None]
        agg["compute"] = {
            "peak_rss_mb": round(max(rss), 1),
            "mean_cpu_pct": round(sum(cpu) / len(cpu), 1),
            "peak_cpu_pct": round(max(cpu), 1),
            "peak_accel_mem_mb": round(max(accel), 1) if accel else None,
            "mean_gpu_util_pct": round(sum(gpu_util) / len(gpu_util), 1) if gpu_util else None,
            "mean_gpu_power_w": round(sum(gpu_pow) / len(gpu_pow), 1) if gpu_pow else None,
            "samples": len(compute),
        }

    # Cost: $ per 1M output tokens, derived from instance price + throughput.
    if price_per_hour and sys_tps > 0:
        cost_per_token = (price_per_hour / 3600.0) / sys_tps
        agg["cost_per_1m_tokens_usd"] = round(cost_per_token * 1_000_000, 4)
    else:
        agg["cost_per_1m_tokens_usd"] = None

    return agg
