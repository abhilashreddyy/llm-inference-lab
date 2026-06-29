"""Local model harness for the quality lab.

Deliberately standalone — does NOT import the llmbench (AWS/vLLM) package. This is
the intermediate local-exploration step; the production path stays clean.
"""

from __future__ import annotations

import time

import mlx.core as mx
from mlx_lm import generate, load
from mlx_lm.sample_utils import make_sampler


def model_disk_mb(model_id: str) -> float | None:
    """On-disk size of the model in the HF cache (MB)."""
    try:
        from huggingface_hub import scan_cache_dir

        for repo in scan_cache_dir().repos:
            if repo.repo_id == model_id:
                return round(repo.size_on_disk / (1024 * 1024), 1)
    except Exception:
        return None
    return None


class LocalModel:
    """Loads an MLX model and exposes generation, perplexity, and system metrics."""

    def __init__(self, model_id: str, gen_kwargs: dict | None = None) -> None:
        self.model_id = model_id
        self.gen_kwargs = gen_kwargs or {}

    def load(self) -> dict:
        mx.clear_cache()
        mx.reset_peak_memory()
        t0 = time.perf_counter()
        self.model, self.tok = load(self.model_id)
        load_time = time.perf_counter() - t0
        return {
            "load_time_s": round(load_time, 2),
            "weights_peak_mem_mb": round(mx.get_peak_memory() / (1024 * 1024), 1),
            "disk_mb": model_disk_mb(self.model_id),
        }

    def _chat(self, user: str) -> str:
        if self.tok.chat_template is not None:
            return self.tok.apply_chat_template(
                [{"role": "user", "content": user}], add_generation_prompt=True, tokenize=False
            )
        return user

    def generate(self, user: str, max_tokens: int = 512, temp: float = 0.0) -> str:
        sampler = make_sampler(temp=temp)
        return generate(
            self.model, self.tok, self._chat(user),
            max_tokens=max_tokens, sampler=sampler, verbose=False, **self.gen_kwargs,
        )

    def speed(self, prompt: str = "Explain how attention works in transformers.",
              max_tokens: int = 128) -> dict:
        """Time-to-first-token, per-token latency, and decode throughput."""
        from mlx_lm import stream_generate

        text = self._chat(prompt)
        # warmup
        for _ in stream_generate(self.model, self.tok, text, max_tokens=8, **self.gen_kwargs):
            pass
        t0 = time.perf_counter()
        ttft = None
        gen = 0
        for resp in stream_generate(self.model, self.tok, text, max_tokens=max_tokens, **self.gen_kwargs):
            if ttft is None:
                ttft = time.perf_counter() - t0
            gen = getattr(resp, "generation_tokens", gen) or gen
        e2e = time.perf_counter() - t0
        decode_t = max(e2e - (ttft or 0), 1e-6)
        return {
            "ttft_ms": round((ttft or 0) * 1000, 1),
            "tpot_ms": round(decode_t / max(gen - 1, 1) * 1000, 2),
            "decode_tps": round((gen - 1) / decode_t, 1),
        }

    def perplexity(self, text: str, max_ctx: int = 1024) -> float:
        ids = mx.array(self.tok.encode(text)[:max_ctx])
        logits = self.model(ids[None])[:, :-1, :].astype(mx.float32)
        logp = logits - mx.logsumexp(logits, axis=-1, keepdims=True)
        targets = ids[None][:, 1:]
        nll = -mx.take_along_axis(logp, targets[..., None], axis=-1).squeeze(-1)
        return round(float(mx.exp(nll.mean())), 4)
