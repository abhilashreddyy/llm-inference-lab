"""Engine registry. Add AWS engines (vllm, tgi) here — runner is unchanged."""

from __future__ import annotations

from typing import Any

from .base import InferenceEngine


def build_engine(engine: str, model: str, quant: str = "fp16", **kwargs: Any) -> InferenceEngine:
    engine = engine.lower()
    if engine == "transformers":
        from .transformers_engine import TransformersEngine

        return TransformersEngine(model, quant=quant, **kwargs)
    if engine == "mlx":
        from .mlx_engine import MLXEngine

        return MLXEngine(model, quant=quant, **kwargs)
    if engine == "vllm":
        from .vllm_engine import VLLMEngine

        return VLLMEngine(model, quant=quant, **kwargs)
    raise ValueError(f"Unknown engine: {engine!r}")


__all__ = ["InferenceEngine", "build_engine"]
