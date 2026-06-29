"""HuggingFace Transformers backend — the *naive baseline*.

Plain `model.generate()` on the MPS (Apple GPU) backend, no paged KV cache, no
continuous batching. This is the "before" we optimize against.
"""

from __future__ import annotations

from collections.abc import Iterator
from threading import Thread

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer

from .base import InferenceEngine

_DTYPES = {"fp16": torch.float16, "bf16": torch.bfloat16, "fp32": torch.float32}


def _pick_device() -> str:
    if torch.backends.mps.is_available():
        return "mps"
    if torch.cuda.is_available():
        return "cuda"
    return "cpu"


class TransformersEngine(InferenceEngine):
    def load(self) -> None:
        self.device = _pick_device()
        self.dtype = _DTYPES.get(self.quant, torch.float16)
        self.tok = AutoTokenizer.from_pretrained(self.model)
        self.model_obj = (
            AutoModelForCausalLM.from_pretrained(self.model, dtype=self.dtype)
            .to(self.device)
            .eval()
        )

    def _encode(self, prompt: str) -> dict[str, torch.Tensor]:
        messages = [{"role": "user", "content": prompt}]
        inputs = self.tok.apply_chat_template(
            messages, add_generation_prompt=True, return_tensors="pt", return_dict=True
        )
        return {k: v.to(self.device) for k, v in inputs.items()}

    def generate_stream(self, prompt: str, max_tokens: int) -> Iterator[str]:
        inputs = self._encode(prompt)
        prompt_tokens = int(inputs["input_ids"].shape[1])
        streamer = TextIteratorStreamer(
            self.tok, skip_prompt=True, skip_special_tokens=True
        )
        kwargs = dict(
            **inputs,
            max_new_tokens=max_tokens,
            do_sample=False,
            use_cache=True,
            pad_token_id=self.tok.eos_token_id,
            streamer=streamer,
        )
        thread = Thread(target=self.model_obj.generate, kwargs=kwargs)
        thread.start()

        pieces: list[str] = []
        for text in streamer:
            if text:
                pieces.append(text)
                yield text
        thread.join()

        full = "".join(pieces)
        output_tokens = len(self.tok(full, add_special_tokens=False).input_ids)
        self.last_stats = {
            "prompt_tokens": prompt_tokens,
            "output_tokens": max(output_tokens, 1),
        }

    def info(self) -> dict[str, str]:
        return {"device": getattr(self, "device", "?"), "dtype": str(getattr(self, "dtype", "?"))}
