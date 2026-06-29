"""Pluggable inference-engine interface.

The runner only knows about this interface, so swapping transformers -> mlx ->
vllm is a config change. Each engine streams decoded text token-by-token (so we
can measure TTFT) and reports exact prompt/output token counts via `last_stats`.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from collections.abc import Iterator
from typing import Any


class InferenceEngine(ABC):
    def __init__(self, model: str, quant: str = "fp16", **kwargs: Any) -> None:
        self.model = model
        self.quant = quant
        self.kwargs = kwargs
        # Populated by generate_stream() after each call.
        self.last_stats: dict[str, int] = {"prompt_tokens": 0, "output_tokens": 0}

    @abstractmethod
    def load(self) -> None:
        """Load weights and warm the engine. Timed by the runner."""

    @abstractmethod
    def generate_stream(self, prompt: str, max_tokens: int) -> Iterator[str]:
        """Yield decoded text pieces as tokens are produced.

        Must set self.last_stats['prompt_tokens'] and ['output_tokens'] by the
        time the generator is exhausted.
        """

    @abstractmethod
    def info(self) -> dict[str, str]:
        """Return {device, dtype} for the manifest."""
