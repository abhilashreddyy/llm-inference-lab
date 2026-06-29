"""MLX backend — Apple-native engine and the home of the local optimization studies.

Supports, all via config (engine_args):
  - quantization      : load a pre-quantized checkpoint (bf16 / 8-bit / 4-bit)
  - KV-cache quant    : kv_bits / kv_group_size / quantized_kv_start -> stream_generate
  - speculative decode : draft_model + num_draft_tokens -> stream_generate
  - static batching   : batched_throughput() — a manual lockstep decoder, because
                        mlx_lm.batch_generate divides-by-zero in 0.31.3
  - quality           : perplexity() — exact NLL over a fixed passage
"""

from __future__ import annotations

import time
from collections.abc import Iterator

import mlx.core as mx
from mlx_lm import load, stream_generate
from mlx_lm.models.cache import make_prompt_cache

from .base import InferenceEngine


class MLXEngine(InferenceEngine):
    def load(self) -> None:
        self.model_obj, self.tokenizer = load(self.model)

        # KV-cache quantization knobs (None => full-precision cache).
        self.gen_kwargs: dict = {}
        for key in ("kv_bits", "kv_group_size", "quantized_kv_start", "max_kv_size"):
            if self.kwargs.get(key) is not None:
                self.gen_kwargs[key] = self.kwargs[key]

        # Speculative decoding: load a small draft model if requested.
        self.draft_model = None
        draft_path = self.kwargs.get("draft_model")
        if draft_path:
            self.draft_model, _ = load(draft_path)
            self.gen_kwargs["draft_model"] = self.draft_model
            self.gen_kwargs["num_draft_tokens"] = self.kwargs.get("num_draft_tokens", 3)

        # Cumulative draft-acceptance counters (spec-decode runs at concurrency 1).
        self.draft_accepted = 0
        self.draft_total = 0

    def _build_prompt(self, prompt: str) -> str:
        messages = [{"role": "user", "content": prompt}]
        if self.tokenizer.chat_template is not None:
            return self.tokenizer.apply_chat_template(
                messages, add_generation_prompt=True, tokenize=False
            )
        return prompt

    def generate_stream(self, prompt: str, max_tokens: int) -> Iterator[str]:
        text = self._build_prompt(prompt)
        prompt_tokens = output_tokens = 0
        for resp in stream_generate(
            self.model_obj, self.tokenizer, text, max_tokens=max_tokens, **self.gen_kwargs
        ):
            prompt_tokens = getattr(resp, "prompt_tokens", prompt_tokens) or prompt_tokens
            output_tokens = getattr(resp, "generation_tokens", output_tokens) or output_tokens
            if self.draft_model is not None:
                self.draft_total += 1
                if getattr(resp, "from_draft", False):
                    self.draft_accepted += 1
            if resp.text:
                yield resp.text
        self.last_stats = {
            "prompt_tokens": int(prompt_tokens),
            "output_tokens": int(max(output_tokens, 1)),
        }

    def perplexity(self, text: str, max_ctx: int = 1024) -> float:
        """Exact perplexity = exp(mean token NLL) over a fixed passage.
        Comparable across quant levels of the same model (same tokenizer)."""
        ids = mx.array(self.tokenizer.encode(text)[:max_ctx])
        logits = self.model_obj(ids[None])[:, :-1, :].astype(mx.float32)
        logp = logits - mx.logsumexp(logits, axis=-1, keepdims=True)
        targets = ids[None][:, 1:]
        nll = -mx.take_along_axis(logp, targets[..., None], axis=-1).squeeze(-1)
        return round(float(mx.exp(nll.mean())), 4)

    def batched_throughput(self, prompt: str, batch_size: int, max_tokens: int) -> dict:
        """Static batching: lockstep greedy decode of `batch_size` identical
        sequences. Returns aggregate + per-stream throughput. Prefill excluded;
        warmup happens once before timing."""
        ids = mx.array(self.tokenizer.encode(self._build_prompt(prompt)))
        batch = mx.broadcast_to(ids[None], (batch_size, ids.shape[0]))
        cache = make_prompt_cache(self.model_obj)
        mx.clear_cache()
        mx.reset_peak_memory()
        logits = self.model_obj(batch, cache=cache)[:, -1, :]
        cur = logits.argmax(-1)
        mx.eval(cur)
        t0 = time.perf_counter()
        for _ in range(max_tokens):
            logits = self.model_obj(cur[:, None], cache=cache)[:, -1, :]
            cur = logits.argmax(-1)
        mx.eval(cur)
        dt = time.perf_counter() - t0
        total = batch_size * max_tokens
        return {
            "batch_size": batch_size,
            "wall_s": round(dt, 4),
            "aggregate_tps": round(total / dt, 2),
            "per_stream_tps": round((max_tokens / dt), 2),
            "output_tokens": total,
            "peak_mem_mb": round(mx.get_peak_memory() / (1024 * 1024), 1),
        }

    def acceptance_rate(self) -> float | None:
        if self.draft_total == 0:
            return None
        return round(self.draft_accepted / self.draft_total, 4)

    def info(self) -> dict[str, str]:
        return {"device": "mps (Metal/MLX)", "dtype": self.quant}
