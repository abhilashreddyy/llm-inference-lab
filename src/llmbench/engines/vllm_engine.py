"""vLLM backend — the AWS/CUDA engine.

vLLM serves an OpenAI-compatible HTTP API with PagedAttention + continuous
batching. We don't load the model in-process; we stream from the running server
(`vllm serve <model>`), which is exactly how it's deployed in production and lets
the concurrency sweep exercise continuous batching.

base_url defaults to localhost (run the harness ON the GPU box for clean numbers)
but can point at a remote EC2 public IP via engine_args.base_url in the config.
"""

from __future__ import annotations

import json
from collections.abc import Iterator

from .base import InferenceEngine


class VLLMEngine(InferenceEngine):
    def load(self) -> None:
        import httpx  # lazy: only needed on the AWS path

        self.base_url = self.kwargs.get("base_url", "http://localhost:8000/v1").rstrip("/")
        self.served_model = self.kwargs.get("served_model", self.model)
        self.client = httpx.Client(timeout=httpx.Timeout(300.0))
        # Fail fast with a clear message if the server isn't up.
        try:
            self.client.get(f"{self.base_url}/models").raise_for_status()
        except Exception as exc:
            raise RuntimeError(
                f"vLLM server not reachable at {self.base_url} ({exc}). "
                "Start it with: vllm serve <model> --port 8000"
            ) from exc

    def generate_stream(self, prompt: str, max_tokens: int) -> Iterator[str]:
        body = {
            "model": self.served_model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": 0.0,
            "stream": True,
            "stream_options": {"include_usage": True},
        }
        prompt_tokens = output_tokens = 0
        with self.client.stream("POST", f"{self.base_url}/chat/completions", json=body) as resp:
            resp.raise_for_status()
            for line in resp.iter_lines():
                if not line or not line.startswith("data:"):
                    continue
                data = line[len("data:"):].strip()
                if data == "[DONE]":
                    break
                chunk = json.loads(data)
                if chunk.get("usage"):
                    prompt_tokens = chunk["usage"].get("prompt_tokens", prompt_tokens)
                    output_tokens = chunk["usage"].get("completion_tokens", output_tokens)
                for ch in chunk.get("choices", []):
                    piece = (ch.get("delta") or {}).get("content")
                    if piece:
                        yield piece
        self.last_stats = {
            "prompt_tokens": int(prompt_tokens),
            "output_tokens": int(max(output_tokens, 1)),
        }

    def info(self) -> dict[str, str]:
        return {"device": "cuda (vLLM server)", "dtype": self.quant}
