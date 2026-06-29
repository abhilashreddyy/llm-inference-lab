"""Background compute/memory sampler.

Local (Mac): process RSS + CPU% via psutil, MLX active Metal memory via mlx.
AWS later: subclass / extend to read nvidia-smi or DCGM for gpu_util/mem/power.
Same ComputeSample schema either way.
"""

from __future__ import annotations

import os
import threading
import time

import psutil

from .schema import ComputeSample

def _mlx_mem_mb() -> float | None:
    """MLX active Metal memory (only nonzero when an MLX model is loaded)."""
    try:
        import mlx.core as mx
    except Exception:
        return None
    for fn in ("get_active_memory", "get_peak_memory"):
        getter = getattr(mx, fn, None)
        if getter is None and hasattr(mx, "metal"):
            getter = getattr(mx.metal, fn, None)
        if getter is not None:
            try:
                return getter() / (1024 * 1024)
            except Exception:
                return None
    return None


def _torch_accel_mem_mb() -> float | None:
    """Torch MPS (Apple GPU) or CUDA memory currently allocated, in MB."""
    try:
        import torch
    except Exception:
        return None
    try:
        if torch.backends.mps.is_available():
            return torch.mps.current_allocated_memory() / (1024 * 1024)
        if torch.cuda.is_available():
            return torch.cuda.memory_allocated() / (1024 * 1024)
    except Exception:
        return None
    return None


def _accel_mem_mb() -> float | None:
    """Accelerator memory from whichever framework is active (engine-agnostic)."""
    vals = [v for v in (_mlx_mem_mb(), _torch_accel_mem_mb()) if v]
    return max(vals) if vals else None


import shutil
import subprocess

_HAS_NVIDIA_SMI = shutil.which("nvidia-smi") is not None


def _nvidia_smi() -> dict[str, float] | None:
    """System-wide GPU stats from nvidia-smi (works when the model runs in a
    *separate* process, e.g. a vLLM server — torch.cuda in our process is empty).
    Returns util %, memory used (MB), power (W). None off-GPU boxes."""
    if not _HAS_NVIDIA_SMI:
        return None
    try:
        out = subprocess.run(
            ["nvidia-smi",
             "--query-gpu=utilization.gpu,memory.used,power.draw",
             "--format=csv,noheader,nounits"],
            capture_output=True, text=True, timeout=2,
        ).stdout.strip()
        # Sum across all GPUs (multi-GPU ready); util is averaged.
        utils, mems, powers = [], [], []
        for line in out.splitlines():
            u, m, p = (x.strip() for x in line.split(","))
            utils.append(float(u)); mems.append(float(m))
            powers.append(float(p) if p not in ("", "[N/A]") else 0.0)
        if not utils:
            return None
        return {
            "util": sum(utils) / len(utils),
            "mem_mb": sum(mems),
            "power_w": sum(powers),
        }
    except Exception:
        return None


class TelemetrySampler:
    """Samples compute usage on a background thread until stopped."""

    def __init__(self, interval_s: float = 0.25) -> None:
        self.interval_s = interval_s
        self._proc = psutil.Process(os.getpid())
        self._samples: list[ComputeSample] = []
        self._stop = threading.Event()
        self._thread: threading.Thread | None = None
        self._t0 = 0.0

    def _run(self) -> None:
        self._proc.cpu_percent(None)  # prime; first call returns 0.0
        while not self._stop.is_set():
            gpu = _nvidia_smi()
            # On a GPU box the model's memory lives in the server process, so prefer
            # nvidia-smi's system-wide memory.used; else fall back to in-process probe.
            accel = gpu["mem_mb"] if gpu else _accel_mem_mb()
            self._samples.append(
                ComputeSample(
                    t=round(time.perf_counter() - self._t0, 3),
                    rss_mb=round(self._proc.memory_info().rss / (1024 * 1024), 1),
                    cpu_pct=round(self._proc.cpu_percent(None), 1),
                    accel_mem_mb=round(accel, 1) if accel else None,
                    gpu_util_pct=round(gpu["util"], 1) if gpu else None,
                    gpu_power_w=round(gpu["power_w"], 1) if gpu else None,
                )
            )
            self._stop.wait(self.interval_s)

    def __enter__(self) -> "TelemetrySampler":
        self._t0 = time.perf_counter()
        self._stop.clear()
        self._thread = threading.Thread(target=self._run, daemon=True)
        self._thread.start()
        return self

    def __exit__(self, *exc: object) -> None:
        self._stop.set()
        if self._thread is not None:
            self._thread.join(timeout=2.0)

    @property
    def samples(self) -> list[ComputeSample]:
        return self._samples
