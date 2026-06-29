"""Stable data model for benchmark runs.

This schema is the spine of the whole project: every engine (transformers, mlx
today; vllm/tgi on AWS later) and every environment (local Mac, single-GPU EC2,
multi-GPU, EKS) writes the *same* records. Scaling up adds rows, never a rewrite.
"""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Any


@dataclass
class RequestRecord:
    """One inference request, the atomic unit of measurement."""

    request_id: int
    prompt_tokens: int
    output_tokens: int
    ttft_s: float          # time to first token
    e2e_s: float           # end-to-end latency (submit -> last token)
    tpot_s: float          # mean inter-token latency during decode
    decode_tps: float      # per-request decode throughput (output toks / decode time)
    start_ts: float
    end_ts: float
    ok: bool = True
    error: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class ComputeSample:
    """One telemetry sample taken while a run executes.

    On Mac we capture process RSS, CPU%, and MLX Metal memory. On AWS the same
    record gains gpu_util_pct / gpu_mem_mb / gpu_power_w from nvidia-smi/DCGM.
    """

    t: float               # seconds since run start
    rss_mb: float
    cpu_pct: float
    accel_mem_mb: float | None = None   # MLX active Metal memory (or CUDA mem on AWS)
    gpu_util_pct: float | None = None
    gpu_power_w: float | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class RunManifest:
    """Everything needed to reproduce and label a run."""

    run_id: str
    label: str
    engine: str
    model: str
    quant: str
    dtype: str
    device: str
    concurrency: int
    num_requests: int
    max_output_tokens: int
    load_time_s: float
    hardware: dict[str, Any]
    versions: dict[str, str]
    git_commit: str
    timestamp: str
    study: str = "latency"                 # quantization | speculative | kv_cache | batching | latency
    params: dict[str, Any] = field(default_factory=dict)  # study-specific knobs
    price_per_hour: float | None = None   # for $/1M-token cost math

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class RunResult:
    """A complete run: manifest + aggregates + raw records + telemetry."""

    manifest: RunManifest
    aggregates: dict[str, Any]
    requests: list[RequestRecord] = field(default_factory=list)
    compute: list[ComputeSample] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "manifest": self.manifest.to_dict(),
            "aggregates": self.aggregates,
            "requests": [r.to_dict() for r in self.requests],
            "compute": [c.to_dict() for c in self.compute],
        }
