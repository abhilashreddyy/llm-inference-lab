window.EXP_DATA = {
  "meta": {
    "generated_at": "2026-06-29T04:48:36+00:00",
    "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
    "python": "3.13.13",
    "reps": 5,
    "max_tokens": 200,
    "warmup": true,
    "decoding": "greedy (temp=0)",
    "timing_prompt": "Explain how a transformer neural network works, step by step.",
    "chip": "Apple M5 Pro",
    "memory_gb": 24.0,
    "mlx": "0.31.2",
    "mlx_lm": "0.31.3"
  },
  "mode": "full",
  "models": [
    "Qwen2.5-3B",
    "Qwen2.5-1.5B",
    "Llama-3.2-3B",
    "Gemma-2-2B",
    "Phi-3.5-mini",
    "Qwen2.5-Coder-3B"
  ],
  "detail_target": "Qwen2.5-3B",
  "spec_by_model": [
    {
      "model": "Qwen2.5-3B",
      "params_b": 3,
      "draft": "Qwen 0.5B",
      "baseline_tps": 130.37,
      "spec_tps": 92.94,
      "spec_tps_std": 0.06,
      "speedup": 0.71,
      "acceptance_rate": 0.39,
      "acceptance_std": 0.0,
      "mean_accepted_per_round": 1.56,
      "tokens_per_target_pass": 2.56,
      "peak_mem_mb": 2067.2,
      "baseline_mem_mb": 2063.8
    },
    {
      "model": "Qwen2.5-1.5B",
      "params_b": 1.5,
      "draft": "Qwen 0.5B",
      "baseline_tps": 236.05,
      "spec_tps": 155.0,
      "spec_tps_std": 0.76,
      "speedup": 0.66,
      "acceptance_rate": 0.5,
      "acceptance_std": 0.0,
      "mean_accepted_per_round": 2.0,
      "tokens_per_target_pass": 3.0,
      "peak_mem_mb": 1213.9,
      "baseline_mem_mb": 1210.1
    },
    {
      "model": "Llama-3.2-3B",
      "params_b": 3,
      "draft": "Llama 1B",
      "baseline_tps": 132.51,
      "spec_tps": 109.99,
      "spec_tps_std": 0.07,
      "speedup": 0.83,
      "acceptance_rate": 0.6,
      "acceptance_std": 0.0,
      "mean_accepted_per_round": 2.4,
      "tokens_per_target_pass": 3.4,
      "peak_mem_mb": 2582.0,
      "baseline_mem_mb": 2573.2
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "params_b": 3,
      "draft": "Coder 1.5B",
      "baseline_tps": 130.69,
      "spec_tps": 80.11,
      "spec_tps_std": 0.66,
      "speedup": 0.61,
      "acceptance_rate": 0.53,
      "acceptance_std": 0.0,
      "mean_accepted_per_round": 2.12,
      "tokens_per_target_pass": 3.12,
      "peak_mem_mb": 2635.6,
      "baseline_mem_mb": 2628.0
    }
  ],
  "batch_by_model": [
    {
      "model": "Qwen2.5-3B",
      "batch_size": 1,
      "agg_tps": 118.15,
      "agg_std": 0.4,
      "per_stream_tps": 118.15,
      "peak_mem_mb": 1804.4
    },
    {
      "model": "Qwen2.5-3B",
      "batch_size": 2,
      "agg_tps": 202.06,
      "agg_std": 1.44,
      "per_stream_tps": 101.03,
      "peak_mem_mb": 1883.4
    },
    {
      "model": "Qwen2.5-3B",
      "batch_size": 4,
      "agg_tps": 265.5,
      "agg_std": 1.53,
      "per_stream_tps": 66.38,
      "peak_mem_mb": 2043.8
    },
    {
      "model": "Qwen2.5-3B",
      "batch_size": 8,
      "agg_tps": 296.11,
      "agg_std": 1.27,
      "per_stream_tps": 37.01,
      "peak_mem_mb": 2376.9
    },
    {
      "model": "Qwen2.5-3B",
      "batch_size": 16,
      "agg_tps": 485.43,
      "agg_std": 0.2,
      "per_stream_tps": 30.34,
      "peak_mem_mb": 2516.9
    },
    {
      "model": "Qwen2.5-3B",
      "batch_size": 32,
      "agg_tps": 959.62,
      "agg_std": 0.85,
      "per_stream_tps": 29.99,
      "peak_mem_mb": 2986.9
    },
    {
      "model": "Qwen2.5-1.5B",
      "batch_size": 1,
      "agg_tps": 209.87,
      "agg_std": 0.16,
      "per_stream_tps": 209.87,
      "peak_mem_mb": 954.5
    },
    {
      "model": "Qwen2.5-1.5B",
      "batch_size": 2,
      "agg_tps": 356.07,
      "agg_std": 0.23,
      "per_stream_tps": 178.04,
      "peak_mem_mb": 1030.9
    },
    {
      "model": "Qwen2.5-1.5B",
      "batch_size": 4,
      "agg_tps": 496.46,
      "agg_std": 0.62,
      "per_stream_tps": 124.12,
      "peak_mem_mb": 1147.4
    },
    {
      "model": "Qwen2.5-1.5B",
      "batch_size": 8,
      "agg_tps": 560.94,
      "agg_std": 0.59,
      "per_stream_tps": 70.12,
      "peak_mem_mb": 1449.3
    },
    {
      "model": "Qwen2.5-1.5B",
      "batch_size": 16,
      "agg_tps": 935.5,
      "agg_std": 1.14,
      "per_stream_tps": 58.47,
      "peak_mem_mb": 1760.4
    },
    {
      "model": "Qwen2.5-1.5B",
      "batch_size": 32,
      "agg_tps": 1820.85,
      "agg_std": 0.8,
      "per_stream_tps": 56.9,
      "peak_mem_mb": 2261.0
    },
    {
      "model": "Llama-3.2-3B",
      "batch_size": 1,
      "agg_tps": 122.99,
      "agg_std": 1.98,
      "per_stream_tps": 122.99,
      "peak_mem_mb": 1920.8
    },
    {
      "model": "Llama-3.2-3B",
      "batch_size": 2,
      "agg_tps": 217.46,
      "agg_std": 0.43,
      "per_stream_tps": 108.73,
      "peak_mem_mb": 2021.2
    },
    {
      "model": "Llama-3.2-3B",
      "batch_size": 4,
      "agg_tps": 280.42,
      "agg_std": 0.27,
      "per_stream_tps": 70.11,
      "peak_mem_mb": 2224.4
    },
    {
      "model": "Llama-3.2-3B",
      "batch_size": 8,
      "agg_tps": 301.76,
      "agg_std": 1.12,
      "per_stream_tps": 37.72,
      "peak_mem_mb": 2519.8
    },
    {
      "model": "Llama-3.2-3B",
      "batch_size": 16,
      "agg_tps": 401.25,
      "agg_std": 0.27,
      "per_stream_tps": 25.08,
      "peak_mem_mb": 2905.6
    },
    {
      "model": "Llama-3.2-3B",
      "batch_size": 32,
      "agg_tps": 775.62,
      "agg_std": 0.47,
      "per_stream_tps": 24.24,
      "peak_mem_mb": 3634.2
    },
    {
      "model": "Gemma-2-2B",
      "batch_size": 1,
      "agg_tps": 115.71,
      "agg_std": 0.39,
      "per_stream_tps": 115.71,
      "peak_mem_mb": 1505.0
    },
    {
      "model": "Gemma-2-2B",
      "batch_size": 2,
      "agg_tps": 199.9,
      "agg_std": 0.15,
      "per_stream_tps": 99.95,
      "peak_mem_mb": 1571.2
    },
    {
      "model": "Gemma-2-2B",
      "batch_size": 4,
      "agg_tps": 261.83,
      "agg_std": 0.07,
      "per_stream_tps": 65.46,
      "peak_mem_mb": 1711.8
    },
    {
      "model": "Gemma-2-2B",
      "batch_size": 8,
      "agg_tps": 295.06,
      "agg_std": 0.08,
      "per_stream_tps": 36.88,
      "peak_mem_mb": 1968.0
    },
    {
      "model": "Gemma-2-2B",
      "batch_size": 16,
      "agg_tps": 572.23,
      "agg_std": 0.32,
      "per_stream_tps": 35.76,
      "peak_mem_mb": 2450.2
    },
    {
      "model": "Gemma-2-2B",
      "batch_size": 32,
      "agg_tps": 1131.85,
      "agg_std": 0.55,
      "per_stream_tps": 35.37,
      "peak_mem_mb": 3078.1
    },
    {
      "model": "Phi-3.5-mini",
      "batch_size": 1,
      "agg_tps": 100.86,
      "agg_std": 0.49,
      "per_stream_tps": 100.86,
      "peak_mem_mb": 2203.2
    },
    {
      "model": "Phi-3.5-mini",
      "batch_size": 2,
      "agg_tps": 177.16,
      "agg_std": 0.17,
      "per_stream_tps": 88.58,
      "peak_mem_mb": 2337.0
    },
    {
      "model": "Phi-3.5-mini",
      "batch_size": 4,
      "agg_tps": 234.19,
      "agg_std": 0.19,
      "per_stream_tps": 58.55,
      "peak_mem_mb": 2589.3
    },
    {
      "model": "Phi-3.5-mini",
      "batch_size": 8,
      "agg_tps": 258.53,
      "agg_std": 0.08,
      "per_stream_tps": 32.32,
      "peak_mem_mb": 3041.2
    },
    {
      "model": "Phi-3.5-mini",
      "batch_size": 16,
      "agg_tps": 423.02,
      "agg_std": 0.22,
      "per_stream_tps": 26.44,
      "peak_mem_mb": 3932.5
    },
    {
      "model": "Phi-3.5-mini",
      "batch_size": 32,
      "agg_tps": 820.12,
      "agg_std": 1.14,
      "per_stream_tps": 25.63,
      "peak_mem_mb": 5384.0
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "batch_size": 1,
      "agg_tps": 119.89,
      "agg_std": 0.57,
      "per_stream_tps": 119.89,
      "peak_mem_mb": 1804.4
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "batch_size": 2,
      "agg_tps": 189.85,
      "agg_std": 3.44,
      "per_stream_tps": 94.93,
      "peak_mem_mb": 1883.4
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "batch_size": 4,
      "agg_tps": 239.27,
      "agg_std": 1.71,
      "per_stream_tps": 59.82,
      "peak_mem_mb": 2043.8
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "batch_size": 8,
      "agg_tps": 267.72,
      "agg_std": 6.37,
      "per_stream_tps": 33.47,
      "peak_mem_mb": 2376.9
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "batch_size": 16,
      "agg_tps": 471.69,
      "agg_std": 1.24,
      "per_stream_tps": 29.48,
      "peak_mem_mb": 2516.9
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "batch_size": 32,
      "agg_tps": 914.35,
      "agg_std": 10.04,
      "per_stream_tps": 28.57,
      "peak_mem_mb": 2986.9
    }
  ],
  "kv_cache_by_model": [
    {
      "model": "Qwen2.5-3B",
      "params_b": 3,
      "layers": 36,
      "kv_heads": 2,
      "head_dim": 128,
      "bytes_per_token": {
        "full": 36864,
        "8bit": 18432,
        "4bit": 9216
      }
    },
    {
      "model": "Qwen2.5-1.5B",
      "params_b": 1.5,
      "layers": 28,
      "kv_heads": 2,
      "head_dim": 128,
      "bytes_per_token": {
        "full": 28672,
        "8bit": 14336,
        "4bit": 7168
      }
    },
    {
      "model": "Llama-3.2-3B",
      "params_b": 3,
      "layers": 28,
      "kv_heads": 8,
      "head_dim": 128,
      "bytes_per_token": {
        "full": 114688,
        "8bit": 57344,
        "4bit": 28672
      }
    },
    {
      "model": "Gemma-2-2B",
      "params_b": 2,
      "layers": 26,
      "kv_heads": 4,
      "head_dim": 256,
      "bytes_per_token": {
        "full": 106496,
        "8bit": 53248,
        "4bit": 26624
      }
    },
    {
      "model": "Phi-3.5-mini",
      "params_b": 3.8,
      "layers": 32,
      "kv_heads": 32,
      "head_dim": 96,
      "bytes_per_token": {
        "full": 393216,
        "8bit": 196608,
        "4bit": 98304
      }
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "params_b": 3,
      "layers": 36,
      "kv_heads": 2,
      "head_dim": 128,
      "bytes_per_token": {
        "full": 36864,
        "8bit": 18432,
        "4bit": 9216
      }
    }
  ],
  "kv_cache_detail_by_model": [
    {
      "model": "Qwen2.5-3B",
      "weights_mb": 1656.0,
      "bytes_per_token": {
        "full": 36864,
        "8bit": 18432,
        "4bit": 9216
      },
      "points": [
        {
          "ctx": "2k",
          "tokens": 2000,
          "full_mb": 70.3,
          "q8_mb": 35.2,
          "q4_mb": 17.6
        },
        {
          "ctx": "4k",
          "tokens": 4000,
          "full_mb": 140.6,
          "q8_mb": 70.3,
          "q4_mb": 35.2
        },
        {
          "ctx": "8k",
          "tokens": 8000,
          "full_mb": 281.2,
          "q8_mb": 140.6,
          "q4_mb": 70.3
        },
        {
          "ctx": "16k",
          "tokens": 16000,
          "full_mb": 562.5,
          "q8_mb": 281.2,
          "q4_mb": 140.6
        },
        {
          "ctx": "32k",
          "tokens": 32000,
          "full_mb": 1125.0,
          "q8_mb": 562.5,
          "q4_mb": 281.2
        },
        {
          "ctx": "64k",
          "tokens": 64000,
          "full_mb": 2250.0,
          "q8_mb": 1125.0,
          "q4_mb": 562.5
        },
        {
          "ctx": "128k",
          "tokens": 128000,
          "full_mb": 4500.0,
          "q8_mb": 2250.0,
          "q4_mb": 1125.0
        }
      ]
    },
    {
      "model": "Qwen2.5-1.5B",
      "weights_mb": 831.0,
      "bytes_per_token": {
        "full": 28672,
        "8bit": 14336,
        "4bit": 7168
      },
      "points": [
        {
          "ctx": "2k",
          "tokens": 2000,
          "full_mb": 54.7,
          "q8_mb": 27.3,
          "q4_mb": 13.7
        },
        {
          "ctx": "4k",
          "tokens": 4000,
          "full_mb": 109.4,
          "q8_mb": 54.7,
          "q4_mb": 27.3
        },
        {
          "ctx": "8k",
          "tokens": 8000,
          "full_mb": 218.8,
          "q8_mb": 109.4,
          "q4_mb": 54.7
        },
        {
          "ctx": "16k",
          "tokens": 16000,
          "full_mb": 437.5,
          "q8_mb": 218.8,
          "q4_mb": 109.4
        },
        {
          "ctx": "32k",
          "tokens": 32000,
          "full_mb": 875.0,
          "q8_mb": 437.5,
          "q4_mb": 218.8
        },
        {
          "ctx": "64k",
          "tokens": 64000,
          "full_mb": 1750.0,
          "q8_mb": 875.0,
          "q4_mb": 437.5
        },
        {
          "ctx": "128k",
          "tokens": 128000,
          "full_mb": 3500.0,
          "q8_mb": 1750.0,
          "q4_mb": 875.0
        }
      ]
    },
    {
      "model": "Llama-3.2-3B",
      "weights_mb": 1724.0,
      "bytes_per_token": {
        "full": 114688,
        "8bit": 57344,
        "4bit": 28672
      },
      "points": [
        {
          "ctx": "2k",
          "tokens": 2000,
          "full_mb": 218.8,
          "q8_mb": 109.4,
          "q4_mb": 54.7
        },
        {
          "ctx": "4k",
          "tokens": 4000,
          "full_mb": 437.5,
          "q8_mb": 218.8,
          "q4_mb": 109.4
        },
        {
          "ctx": "8k",
          "tokens": 8000,
          "full_mb": 875.0,
          "q8_mb": 437.5,
          "q4_mb": 218.8
        },
        {
          "ctx": "16k",
          "tokens": 16000,
          "full_mb": 1750.0,
          "q8_mb": 875.0,
          "q4_mb": 437.5
        },
        {
          "ctx": "32k",
          "tokens": 32000,
          "full_mb": 3500.0,
          "q8_mb": 1750.0,
          "q4_mb": 875.0
        },
        {
          "ctx": "64k",
          "tokens": 64000,
          "full_mb": 7000.0,
          "q8_mb": 3500.0,
          "q4_mb": 1750.0
        },
        {
          "ctx": "128k",
          "tokens": 128000,
          "full_mb": 14000.0,
          "q8_mb": 7000.0,
          "q4_mb": 3500.0
        }
      ]
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "weights_mb": 1656.0,
      "bytes_per_token": {
        "full": 36864,
        "8bit": 18432,
        "4bit": 9216
      },
      "points": [
        {
          "ctx": "2k",
          "tokens": 2000,
          "full_mb": 70.3,
          "q8_mb": 35.2,
          "q4_mb": 17.6
        },
        {
          "ctx": "4k",
          "tokens": 4000,
          "full_mb": 140.6,
          "q8_mb": 70.3,
          "q4_mb": 35.2
        },
        {
          "ctx": "8k",
          "tokens": 8000,
          "full_mb": 281.2,
          "q8_mb": 140.6,
          "q4_mb": 70.3
        },
        {
          "ctx": "16k",
          "tokens": 16000,
          "full_mb": 562.5,
          "q8_mb": 281.2,
          "q4_mb": 140.6
        },
        {
          "ctx": "32k",
          "tokens": 32000,
          "full_mb": 1125.0,
          "q8_mb": 562.5,
          "q4_mb": 281.2
        },
        {
          "ctx": "64k",
          "tokens": 64000,
          "full_mb": 2250.0,
          "q8_mb": 1125.0,
          "q4_mb": 562.5
        },
        {
          "ctx": "128k",
          "tokens": 128000,
          "full_mb": 4500.0,
          "q8_mb": 2250.0,
          "q4_mb": 1125.0
        }
      ]
    }
  ],
  "kv_precision_by_model": [
    {
      "model": "Qwen2.5-3B",
      "context_tokens": 3309,
      "rows": [
        {
          "kv": "full",
          "bits": 16,
          "mem_pct": 100,
          "fidelity": 1.0
        },
        {
          "kv": 8,
          "bits": 8,
          "mem_pct": 50,
          "fidelity": 0.808
        },
        {
          "kv": 4,
          "bits": 4,
          "mem_pct": 25,
          "fidelity": 0.0
        }
      ]
    },
    {
      "model": "Qwen2.5-1.5B",
      "context_tokens": 3309,
      "rows": [
        {
          "kv": "full",
          "bits": 16,
          "mem_pct": 100,
          "fidelity": 1.0
        },
        {
          "kv": 8,
          "bits": 8,
          "mem_pct": 50,
          "fidelity": 0.108
        },
        {
          "kv": 4,
          "bits": 4,
          "mem_pct": 25,
          "fidelity": 0.0
        }
      ]
    },
    {
      "model": "Llama-3.2-3B",
      "context_tokens": 3310,
      "rows": [
        {
          "kv": "full",
          "bits": 16,
          "mem_pct": 100,
          "fidelity": 1.0
        },
        {
          "kv": 8,
          "bits": 8,
          "mem_pct": 50,
          "fidelity": 0.792
        },
        {
          "kv": 4,
          "bits": 4,
          "mem_pct": 25,
          "fidelity": 0.167
        }
      ]
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "context_tokens": 3309,
      "rows": [
        {
          "kv": "full",
          "bits": 16,
          "mem_pct": 100,
          "fidelity": 1.0
        },
        {
          "kv": 8,
          "bits": 8,
          "mem_pct": 50,
          "fidelity": 1.0
        },
        {
          "kv": 4,
          "bits": 4,
          "mem_pct": 25,
          "fidelity": 0.0
        }
      ]
    }
  ],
  "quant_by_model": [
    {
      "model": "Qwen2.5-3B",
      "precision": "bf16",
      "bits": 16,
      "throughput_tps": 43.96,
      "throughput_std": 0.39,
      "peak_mem_mb": 5931.2,
      "perplexity": 16.375
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int8",
      "bits": 8,
      "throughput_tps": 74.85,
      "throughput_std": 2.69,
      "peak_mem_mb": 3266.9,
      "perplexity": 16.812
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int4",
      "bits": 4,
      "throughput_tps": 130.27,
      "throughput_std": 1.69,
      "peak_mem_mb": 1795.6,
      "perplexity": 18.25
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "bf16",
      "bits": 16,
      "throughput_tps": 83.49,
      "throughput_std": 0.32,
      "peak_mem_mb": 2997.7,
      "perplexity": 24.625
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int8",
      "bits": 8,
      "throughput_tps": 142.09,
      "throughput_std": 0.25,
      "peak_mem_mb": 1677.6,
      "perplexity": 24.844
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int4",
      "bits": 4,
      "throughput_tps": 237.17,
      "throughput_std": 0.13,
      "peak_mem_mb": 941.6,
      "perplexity": 26.094
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "bf16",
      "bits": 16,
      "throughput_tps": 41.89,
      "throughput_std": 0.12,
      "peak_mem_mb": 6188.7,
      "perplexity": 18.0
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int8",
      "bits": 8,
      "throughput_tps": 75.8,
      "throughput_std": 0.21,
      "peak_mem_mb": 3415.8,
      "perplexity": 17.906
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int4",
      "bits": 4,
      "throughput_tps": 132.77,
      "throughput_std": 0.44,
      "peak_mem_mb": 1911.9,
      "perplexity": 21.172
    },
    {
      "model": "Gemma-2-2B",
      "precision": "bf16",
      "bits": 16,
      "throughput_tps": 49.6,
      "throughput_std": 0.11,
      "peak_mem_mb": 5035.1,
      "perplexity": 22.625
    },
    {
      "model": "Gemma-2-2B",
      "precision": "int8",
      "bits": 8,
      "throughput_tps": 83.26,
      "throughput_std": 0.14,
      "peak_mem_mb": 2736.4,
      "perplexity": 22.578
    },
    {
      "model": "Gemma-2-2B",
      "precision": "int4",
      "bits": 4,
      "throughput_tps": 137.07,
      "throughput_std": 2.33,
      "peak_mem_mb": 1489.9,
      "perplexity": 24.469
    },
    {
      "model": "Phi-3.5-mini",
      "precision": "bf16",
      "bits": 16,
      "throughput_tps": 36.54,
      "throughput_std": 0.09,
      "peak_mem_mb": 7393.6,
      "perplexity": 7.875
    },
    {
      "model": "Phi-3.5-mini",
      "precision": "int8",
      "bits": 8,
      "throughput_tps": 62.14,
      "throughput_std": 0.94,
      "peak_mem_mb": 4007.2,
      "perplexity": 7.82
    },
    {
      "model": "Phi-3.5-mini",
      "precision": "int4",
      "bits": 4,
      "throughput_tps": 96.92,
      "throughput_std": 3.23,
      "peak_mem_mb": 2194.8,
      "perplexity": 9.523
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "bf16",
      "bits": 16,
      "throughput_tps": 42.63,
      "throughput_std": 1.13,
      "peak_mem_mb": 5931.2,
      "perplexity": 18.875
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int8",
      "bits": 8,
      "throughput_tps": 74.54,
      "throughput_std": 1.41,
      "peak_mem_mb": 3266.9,
      "perplexity": 18.875
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int4",
      "bits": 4,
      "throughput_tps": 131.16,
      "throughput_std": 2.06,
      "peak_mem_mb": 1795.6,
      "perplexity": 18.906
    }
  ],
  "combos": [
    {
      "model": "Qwen2.5-3B",
      "precision": "bf16",
      "kv": "off",
      "spec": false,
      "label": "No optimization (bf16)",
      "throughput_tps": 43.77,
      "throughput_std": 0.03,
      "tpot_ms": 22.85,
      "peak_mem_mb": 7855.1
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int8",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 8-bit",
      "throughput_tps": 76.3,
      "throughput_std": 0.14,
      "tpot_ms": 13.11,
      "peak_mem_mb": 5190.8
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int4",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 4-bit",
      "throughput_tps": 129.94,
      "throughput_std": 0.12,
      "tpot_ms": 7.7,
      "peak_mem_mb": 2063.8
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int4",
      "kv": 4,
      "spec": false,
      "label": "+ KV-cache quant",
      "throughput_tps": 112.79,
      "throughput_std": 1.11,
      "tpot_ms": 8.87,
      "peak_mem_mb": 2063.8
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int4",
      "kv": "off",
      "spec": true,
      "label": "+ Speculative",
      "throughput_tps": 92.43,
      "throughput_std": 0.03,
      "tpot_ms": 10.82,
      "peak_mem_mb": 2067.2
    },
    {
      "model": "Qwen2.5-3B",
      "precision": "int4",
      "kv": 4,
      "spec": true,
      "label": "+ KV + Speculative (all)",
      "throughput_tps": 62.65,
      "throughput_std": 0.17,
      "tpot_ms": 15.96,
      "peak_mem_mb": 2065.8
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "bf16",
      "kv": "off",
      "spec": false,
      "label": "No optimization (bf16)",
      "throughput_tps": 83.23,
      "throughput_std": 0.24,
      "tpot_ms": 12.01,
      "peak_mem_mb": 4097.0
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int8",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 8-bit",
      "throughput_tps": 142.1,
      "throughput_std": 0.28,
      "tpot_ms": 7.04,
      "peak_mem_mb": 2776.9
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int4",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 4-bit",
      "throughput_tps": 237.97,
      "throughput_std": 0.25,
      "tpot_ms": 4.2,
      "peak_mem_mb": 1209.7
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int4",
      "kv": 4,
      "spec": false,
      "label": "+ KV-cache quant",
      "throughput_tps": 214.84,
      "throughput_std": 0.16,
      "tpot_ms": 4.65,
      "peak_mem_mb": 1209.7
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int4",
      "kv": "off",
      "spec": true,
      "label": "+ Speculative",
      "throughput_tps": 155.05,
      "throughput_std": 0.42,
      "tpot_ms": 6.45,
      "peak_mem_mb": 1213.9
    },
    {
      "model": "Qwen2.5-1.5B",
      "precision": "int4",
      "kv": 4,
      "spec": true,
      "label": "+ KV + Speculative (all)",
      "throughput_tps": 141.09,
      "throughput_std": 0.39,
      "tpot_ms": 7.09,
      "peak_mem_mb": 1211.4
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "bf16",
      "kv": "off",
      "spec": false,
      "label": "No optimization (bf16)",
      "throughput_tps": 41.85,
      "throughput_std": 0.07,
      "tpot_ms": 23.89,
      "peak_mem_mb": 8575.5
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int8",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 8-bit",
      "throughput_tps": 75.92,
      "throughput_std": 0.14,
      "tpot_ms": 13.17,
      "peak_mem_mb": 5802.6
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int4",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 4-bit",
      "throughput_tps": 132.42,
      "throughput_std": 0.26,
      "tpot_ms": 7.55,
      "peak_mem_mb": 2575.0
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int4",
      "kv": 4,
      "spec": false,
      "label": "+ KV-cache quant",
      "throughput_tps": 124.95,
      "throughput_std": 0.62,
      "tpot_ms": 8.0,
      "peak_mem_mb": 2575.0
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int4",
      "kv": "off",
      "spec": true,
      "label": "+ Speculative",
      "throughput_tps": 109.91,
      "throughput_std": 0.09,
      "tpot_ms": 9.1,
      "peak_mem_mb": 2581.6
    },
    {
      "model": "Llama-3.2-3B",
      "precision": "int4",
      "kv": 4,
      "spec": true,
      "label": "+ KV + Speculative (all)",
      "throughput_tps": 92.02,
      "throughput_std": 0.09,
      "tpot_ms": 10.87,
      "peak_mem_mb": 2577.5
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "bf16",
      "kv": "off",
      "spec": false,
      "label": "No optimization (bf16)",
      "throughput_tps": 42.93,
      "throughput_std": 0.35,
      "tpot_ms": 23.3,
      "peak_mem_mb": 8418.2
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int8",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 8-bit",
      "throughput_tps": 75.14,
      "throughput_std": 0.52,
      "tpot_ms": 13.31,
      "peak_mem_mb": 5753.9
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int4",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 4-bit",
      "throughput_tps": 125.31,
      "throughput_std": 2.92,
      "tpot_ms": 7.98,
      "peak_mem_mb": 2626.8
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int4",
      "kv": 4,
      "spec": false,
      "label": "+ KV-cache quant",
      "throughput_tps": 103.9,
      "throughput_std": 3.23,
      "tpot_ms": 9.63,
      "peak_mem_mb": 2626.8
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int4",
      "kv": "off",
      "spec": true,
      "label": "+ Speculative",
      "throughput_tps": 82.44,
      "throughput_std": 1.62,
      "tpot_ms": 12.13,
      "peak_mem_mb": 2634.4
    },
    {
      "model": "Qwen2.5-Coder-3B",
      "precision": "int4",
      "kv": 4,
      "spec": true,
      "label": "+ KV + Speculative (all)",
      "throughput_tps": 24.76,
      "throughput_std": 0.74,
      "tpot_ms": 40.43,
      "peak_mem_mb": 2630.0
    },
    {
      "model": "Gemma-2-2B",
      "precision": "bf16",
      "kv": "off",
      "spec": false,
      "label": "No optimization (bf16)",
      "throughput_tps": 49.41,
      "throughput_std": 0.23,
      "tpot_ms": 20.24,
      "peak_mem_mb": 6439.9
    },
    {
      "model": "Gemma-2-2B",
      "precision": "int8",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 8-bit",
      "throughput_tps": 82.86,
      "throughput_std": 0.49,
      "tpot_ms": 12.07,
      "peak_mem_mb": 4141.2
    },
    {
      "model": "Gemma-2-2B",
      "precision": "int4",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 4-bit",
      "throughput_tps": 137.68,
      "throughput_std": 1.11,
      "tpot_ms": 7.26,
      "peak_mem_mb": 1489.9
    },
    {
      "model": "Phi-3.5-mini",
      "precision": "bf16",
      "kv": "off",
      "spec": false,
      "label": "No optimization (bf16)",
      "throughput_tps": 35.74,
      "throughput_std": 0.13,
      "tpot_ms": 27.98,
      "peak_mem_mb": 9443.6
    },
    {
      "model": "Phi-3.5-mini",
      "precision": "int8",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 8-bit",
      "throughput_tps": 64.13,
      "throughput_std": 0.08,
      "tpot_ms": 15.59,
      "peak_mem_mb": 6057.3
    },
    {
      "model": "Phi-3.5-mini",
      "precision": "int4",
      "kv": "off",
      "spec": false,
      "label": "Quantized to 4-bit",
      "throughput_tps": 110.64,
      "throughput_std": 0.59,
      "tpot_ms": 9.04,
      "peak_mem_mb": 2194.8
    }
  ],
  "combos_models": [
    "Qwen2.5-3B",
    "Qwen2.5-1.5B",
    "Llama-3.2-3B",
    "Qwen2.5-Coder-3B",
    "Gemma-2-2B",
    "Phi-3.5-mini"
  ],
  "combos_target": "Qwen2.5-3B",
  "spec_detail": {
    "target": "Qwen2.5-3B",
    "baseline": {
      "throughput_tps": 127.17,
      "throughput_std": 2.86,
      "ttft_ms": 110.03,
      "ttft_std": 2.05,
      "tpot_ms": 7.87,
      "tpot_std": 0.18,
      "peak_mem_mb": 4113.9,
      "output_tokens": 200,
      "prompt_tokens": 42,
      "reps": 5
    },
    "k_sweep": [
      {
        "throughput_tps": 116.75,
        "throughput_std": 1.73,
        "ttft_ms": 133.67,
        "ttft_std": 5.58,
        "tpot_ms": 8.57,
        "tpot_std": 0.13,
        "peak_mem_mb": 4117.3,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5,
        "k": 2,
        "acceptance_rate": 0.55,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 1.1,
        "tokens_per_target_pass": 2.1
      },
      {
        "throughput_tps": 90.11,
        "throughput_std": 4.15,
        "ttft_ms": 139.61,
        "ttft_std": 3.38,
        "tpot_ms": 11.12,
        "tpot_std": 0.55,
        "peak_mem_mb": 4117.3,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5,
        "k": 4,
        "acceptance_rate": 0.39,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 1.56,
        "tokens_per_target_pass": 2.56
      },
      {
        "throughput_tps": 69.32,
        "throughput_std": 5.89,
        "ttft_ms": 166.62,
        "ttft_std": 12.58,
        "tpot_ms": 14.54,
        "tpot_std": 1.36,
        "peak_mem_mb": 4117.2,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5,
        "k": 6,
        "acceptance_rate": 0.29,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 1.74,
        "tokens_per_target_pass": 2.74
      },
      {
        "throughput_tps": 59.08,
        "throughput_std": 0.64,
        "ttft_ms": 169.91,
        "ttft_std": 3.27,
        "tpot_ms": 16.93,
        "tpot_std": 0.19,
        "peak_mem_mb": 4117.3,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5,
        "k": 8,
        "acceptance_rate": 0.22,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 1.76,
        "tokens_per_target_pass": 2.76
      }
    ],
    "prompt_sweep": [
      {
        "throughput_tps": 153.98,
        "throughput_std": 0.7,
        "ttft_ms": 145.26,
        "ttft_std": 4.52,
        "tpot_ms": 6.49,
        "tpot_std": 0.03,
        "peak_mem_mb": 4148.9,
        "output_tokens": 200,
        "prompt_tokens": 53,
        "reps": 5,
        "k": 4,
        "acceptance_rate": 0.89,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 3.56,
        "tokens_per_target_pass": 4.56,
        "prompt_type": "structured"
      },
      {
        "throughput_tps": 92.5,
        "throughput_std": 1.28,
        "ttft_ms": 139.46,
        "ttft_std": 2.16,
        "tpot_ms": 10.81,
        "tpot_std": 0.15,
        "peak_mem_mb": 4117.3,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5,
        "k": 4,
        "acceptance_rate": 0.39,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 1.56,
        "tokens_per_target_pass": 2.56,
        "prompt_type": "factual"
      },
      {
        "throughput_tps": 68.29,
        "throughput_std": 0.31,
        "ttft_ms": 138.87,
        "ttft_std": 1.73,
        "tpot_ms": 14.64,
        "tpot_std": 0.07,
        "peak_mem_mb": 4132.4,
        "output_tokens": 71,
        "prompt_tokens": 47,
        "reps": 5,
        "k": 4,
        "acceptance_rate": 0.23,
        "acceptance_std": 0.0,
        "mean_accepted_per_round": 0.92,
        "tokens_per_target_pass": 1.92,
        "prompt_type": "creative"
      }
    ]
  },
  "stage1_done": [
    "Qwen2.5-3B",
    "Qwen2.5-1.5B",
    "Llama-3.2-3B",
    "Gemma-2-2B",
    "Phi-3.5-mini",
    "Qwen2.5-Coder-3B"
  ],
  "kv_cache_detail": {
    "model": "Qwen2.5-3B",
    "weights_mb": 1656.0,
    "bytes_per_token": {
      "full": 36864,
      "8bit": 18432,
      "4bit": 9216
    },
    "points": [
      {
        "ctx": "2k",
        "tokens": 2000,
        "full_mb": 70.3,
        "q8_mb": 35.2,
        "q4_mb": 17.6
      },
      {
        "ctx": "4k",
        "tokens": 4000,
        "full_mb": 140.6,
        "q8_mb": 70.3,
        "q4_mb": 35.2
      },
      {
        "ctx": "8k",
        "tokens": 8000,
        "full_mb": 281.2,
        "q8_mb": 140.6,
        "q4_mb": 70.3
      },
      {
        "ctx": "16k",
        "tokens": 16000,
        "full_mb": 562.5,
        "q8_mb": 281.2,
        "q4_mb": 140.6
      },
      {
        "ctx": "32k",
        "tokens": 32000,
        "full_mb": 1125.0,
        "q8_mb": 562.5,
        "q4_mb": 281.2
      },
      {
        "ctx": "64k",
        "tokens": 64000,
        "full_mb": 2250.0,
        "q8_mb": 1125.0,
        "q4_mb": 562.5
      },
      {
        "ctx": "128k",
        "tokens": 128000,
        "full_mb": 4500.0,
        "q8_mb": 2250.0,
        "q4_mb": 1125.0
      }
    ]
  },
  "kv_precision": {
    "model": "Qwen2.5-3B",
    "context_tokens": 3309,
    "rows": [
      {
        "kv": "full",
        "bits": 16,
        "mem_pct": 100,
        "fidelity": 1.0
      },
      {
        "kv": 8,
        "bits": 8,
        "mem_pct": 50,
        "fidelity": 0.808
      },
      {
        "kv": 4,
        "bits": 4,
        "mem_pct": 25,
        "fidelity": 0.0
      }
    ]
  },
  "spec_detail_by_model": [
    {
      "target": "Qwen2.5-3B",
      "baseline": {
        "throughput_tps": 127.17,
        "throughput_std": 2.86,
        "ttft_ms": 110.03,
        "ttft_std": 2.05,
        "tpot_ms": 7.87,
        "tpot_std": 0.18,
        "peak_mem_mb": 4113.9,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5
      },
      "k_sweep": [
        {
          "throughput_tps": 116.75,
          "throughput_std": 1.73,
          "ttft_ms": 133.67,
          "ttft_std": 5.58,
          "tpot_ms": 8.57,
          "tpot_std": 0.13,
          "peak_mem_mb": 4117.3,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 2,
          "acceptance_rate": 0.55,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.1,
          "tokens_per_target_pass": 2.1
        },
        {
          "throughput_tps": 90.11,
          "throughput_std": 4.15,
          "ttft_ms": 139.61,
          "ttft_std": 3.38,
          "tpot_ms": 11.12,
          "tpot_std": 0.55,
          "peak_mem_mb": 4117.3,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.39,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.56,
          "tokens_per_target_pass": 2.56
        },
        {
          "throughput_tps": 69.32,
          "throughput_std": 5.89,
          "ttft_ms": 166.62,
          "ttft_std": 12.58,
          "tpot_ms": 14.54,
          "tpot_std": 1.36,
          "peak_mem_mb": 4117.2,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 6,
          "acceptance_rate": 0.29,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.74,
          "tokens_per_target_pass": 2.74
        },
        {
          "throughput_tps": 59.08,
          "throughput_std": 0.64,
          "ttft_ms": 169.91,
          "ttft_std": 3.27,
          "tpot_ms": 16.93,
          "tpot_std": 0.19,
          "peak_mem_mb": 4117.3,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 8,
          "acceptance_rate": 0.22,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.76,
          "tokens_per_target_pass": 2.76
        }
      ],
      "prompt_sweep": [
        {
          "throughput_tps": 153.98,
          "throughput_std": 0.7,
          "ttft_ms": 145.26,
          "ttft_std": 4.52,
          "tpot_ms": 6.49,
          "tpot_std": 0.03,
          "peak_mem_mb": 4148.9,
          "output_tokens": 200,
          "prompt_tokens": 53,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.89,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 3.56,
          "tokens_per_target_pass": 4.56,
          "prompt_type": "structured"
        },
        {
          "throughput_tps": 92.5,
          "throughput_std": 1.28,
          "ttft_ms": 139.46,
          "ttft_std": 2.16,
          "tpot_ms": 10.81,
          "tpot_std": 0.15,
          "peak_mem_mb": 4117.3,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.39,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.56,
          "tokens_per_target_pass": 2.56,
          "prompt_type": "factual"
        },
        {
          "throughput_tps": 68.29,
          "throughput_std": 0.31,
          "ttft_ms": 138.87,
          "ttft_std": 1.73,
          "tpot_ms": 14.64,
          "tpot_std": 0.07,
          "peak_mem_mb": 4132.4,
          "output_tokens": 71,
          "prompt_tokens": 47,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.23,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 0.92,
          "tokens_per_target_pass": 1.92,
          "prompt_type": "creative"
        }
      ]
    },
    {
      "target": "Qwen2.5-1.5B",
      "baseline": {
        "throughput_tps": 237.28,
        "throughput_std": 4.42,
        "ttft_ms": 80.11,
        "ttft_std": 1.55,
        "tpot_ms": 4.22,
        "tpot_std": 0.08,
        "peak_mem_mb": 3259.8,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5
      },
      "k_sweep": [
        {
          "throughput_tps": 177.08,
          "throughput_std": 2.17,
          "ttft_ms": 101.13,
          "ttft_std": 3.04,
          "tpot_ms": 5.65,
          "tpot_std": 0.07,
          "peak_mem_mb": 3263.6,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 2,
          "acceptance_rate": 0.62,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.24,
          "tokens_per_target_pass": 2.24
        },
        {
          "throughput_tps": 153.99,
          "throughput_std": 1.2,
          "ttft_ms": 110.03,
          "ttft_std": 2.66,
          "tpot_ms": 6.49,
          "tpot_std": 0.05,
          "peak_mem_mb": 3264.0,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.5,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.0,
          "tokens_per_target_pass": 3.0
        },
        {
          "throughput_tps": 105.86,
          "throughput_std": 0.56,
          "ttft_ms": 117.61,
          "ttft_std": 2.0,
          "tpot_ms": 9.45,
          "tpot_std": 0.05,
          "peak_mem_mb": 3262.5,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 6,
          "acceptance_rate": 0.3,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.8,
          "tokens_per_target_pass": 2.8
        },
        {
          "throughput_tps": 102.21,
          "throughput_std": 0.06,
          "ttft_ms": 131.64,
          "ttft_std": 2.12,
          "tpot_ms": 9.78,
          "tpot_std": 0.01,
          "peak_mem_mb": 3258.6,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 8,
          "acceptance_rate": 0.3,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.4,
          "tokens_per_target_pass": 3.4
        }
      ],
      "prompt_sweep": [
        {
          "throughput_tps": 138.05,
          "throughput_std": 0.16,
          "ttft_ms": 115.38,
          "ttft_std": 0.57,
          "tpot_ms": 7.24,
          "tpot_std": 0.01,
          "peak_mem_mb": 3283.8,
          "output_tokens": 67,
          "prompt_tokens": 53,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.42,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.68,
          "tokens_per_target_pass": 2.68,
          "prompt_type": "structured"
        },
        {
          "throughput_tps": 157.72,
          "throughput_std": 0.07,
          "ttft_ms": 115.7,
          "ttft_std": 2.38,
          "tpot_ms": 6.34,
          "tpot_std": 0.0,
          "peak_mem_mb": 3264.1,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.5,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.0,
          "tokens_per_target_pass": 3.0,
          "prompt_type": "factual"
        },
        {
          "throughput_tps": 113.37,
          "throughput_std": 1.86,
          "ttft_ms": 119.12,
          "ttft_std": 6.74,
          "tpot_ms": 8.82,
          "tpot_std": 0.14,
          "peak_mem_mb": 3277.3,
          "output_tokens": 62,
          "prompt_tokens": 47,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.3,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.2,
          "tokens_per_target_pass": 2.2,
          "prompt_type": "creative"
        }
      ]
    },
    {
      "target": "Llama-3.2-3B",
      "baseline": {
        "throughput_tps": 135.93,
        "throughput_std": 0.15,
        "ttft_ms": 101.67,
        "ttft_std": 9.23,
        "tpot_ms": 7.36,
        "tpot_std": 0.01,
        "peak_mem_mb": 4625.0,
        "output_tokens": 200,
        "prompt_tokens": 48,
        "reps": 5
      },
      "k_sweep": [
        {
          "throughput_tps": 131.87,
          "throughput_std": 0.04,
          "ttft_ms": 131.65,
          "ttft_std": 3.27,
          "tpot_ms": 7.58,
          "tpot_std": 0.0,
          "peak_mem_mb": 4631.9,
          "output_tokens": 200,
          "prompt_tokens": 48,
          "reps": 5,
          "k": 2,
          "acceptance_rate": 0.75,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.5,
          "tokens_per_target_pass": 2.5
        },
        {
          "throughput_tps": 111.95,
          "throughput_std": 0.02,
          "ttft_ms": 138.55,
          "ttft_std": 2.62,
          "tpot_ms": 8.93,
          "tpot_std": 0.0,
          "peak_mem_mb": 4631.7,
          "output_tokens": 200,
          "prompt_tokens": 48,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.6,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.4,
          "tokens_per_target_pass": 3.4
        },
        {
          "throughput_tps": 89.84,
          "throughput_std": 0.05,
          "ttft_ms": 154.7,
          "ttft_std": 3.02,
          "tpot_ms": 11.13,
          "tpot_std": 0.01,
          "peak_mem_mb": 4631.4,
          "output_tokens": 200,
          "prompt_tokens": 48,
          "reps": 5,
          "k": 6,
          "acceptance_rate": 0.46,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.76,
          "tokens_per_target_pass": 3.76
        },
        {
          "throughput_tps": 81.29,
          "throughput_std": 0.38,
          "ttft_ms": 170.98,
          "ttft_std": 1.69,
          "tpot_ms": 12.3,
          "tpot_std": 0.06,
          "peak_mem_mb": 4632.1,
          "output_tokens": 200,
          "prompt_tokens": 48,
          "reps": 5,
          "k": 8,
          "acceptance_rate": 0.43,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 3.44,
          "tokens_per_target_pass": 4.44
        }
      ],
      "prompt_sweep": [
        {
          "throughput_tps": 158.03,
          "throughput_std": 0.04,
          "ttft_ms": 146.05,
          "ttft_std": 3.93,
          "tpot_ms": 6.33,
          "tpot_std": 0.0,
          "peak_mem_mb": 4666.0,
          "output_tokens": 187,
          "prompt_tokens": 58,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.98,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 3.92,
          "tokens_per_target_pass": 4.92,
          "prompt_type": "structured"
        },
        {
          "throughput_tps": 111.99,
          "throughput_std": 0.03,
          "ttft_ms": 145.46,
          "ttft_std": 0.89,
          "tpot_ms": 8.93,
          "tpot_std": 0.0,
          "peak_mem_mb": 4631.7,
          "output_tokens": 200,
          "prompt_tokens": 48,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.6,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.4,
          "tokens_per_target_pass": 3.4,
          "prompt_type": "factual"
        },
        {
          "throughput_tps": 98.18,
          "throughput_std": 0.08,
          "ttft_ms": 144.6,
          "ttft_std": 2.68,
          "tpot_ms": 10.19,
          "tpot_std": 0.01,
          "peak_mem_mb": 4648.4,
          "output_tokens": 63,
          "prompt_tokens": 53,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.5,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.0,
          "tokens_per_target_pass": 3.0,
          "prompt_type": "creative"
        }
      ]
    },
    {
      "target": "Qwen2.5-Coder-3B",
      "baseline": {
        "throughput_tps": 127.88,
        "throughput_std": 3.03,
        "ttft_ms": 119.91,
        "ttft_std": 1.59,
        "tpot_ms": 7.82,
        "tpot_std": 0.19,
        "peak_mem_mb": 4676.9,
        "output_tokens": 200,
        "prompt_tokens": 42,
        "reps": 5
      },
      "k_sweep": [
        {
          "throughput_tps": 101.76,
          "throughput_std": 0.23,
          "ttft_ms": 151.93,
          "ttft_std": 1.67,
          "tpot_ms": 9.83,
          "tpot_std": 0.02,
          "peak_mem_mb": 4684.5,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 2,
          "acceptance_rate": 0.64,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.28,
          "tokens_per_target_pass": 2.28
        },
        {
          "throughput_tps": 85.24,
          "throughput_std": 0.05,
          "ttft_ms": 167.41,
          "ttft_std": 2.71,
          "tpot_ms": 11.73,
          "tpot_std": 0.01,
          "peak_mem_mb": 4684.5,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.53,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.12,
          "tokens_per_target_pass": 3.12
        },
        {
          "throughput_tps": 66.32,
          "throughput_std": 0.24,
          "ttft_ms": 177.0,
          "ttft_std": 4.39,
          "tpot_ms": 15.08,
          "tpot_std": 0.06,
          "peak_mem_mb": 4684.5,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 6,
          "acceptance_rate": 0.39,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.34,
          "tokens_per_target_pass": 3.34
        },
        {
          "throughput_tps": 57.45,
          "throughput_std": 0.03,
          "ttft_ms": 188.36,
          "ttft_std": 2.41,
          "tpot_ms": 17.41,
          "tpot_std": 0.01,
          "peak_mem_mb": 4684.2,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 8,
          "acceptance_rate": 0.32,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.56,
          "tokens_per_target_pass": 3.56
        }
      ],
      "prompt_sweep": [
        {
          "throughput_tps": 128.57,
          "throughput_std": 0.26,
          "ttft_ms": 160.88,
          "ttft_std": 1.19,
          "tpot_ms": 7.78,
          "tpot_std": 0.02,
          "peak_mem_mb": 4716.8,
          "output_tokens": 200,
          "prompt_tokens": 53,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 1.0,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 4.0,
          "tokens_per_target_pass": 5.0,
          "prompt_type": "structured"
        },
        {
          "throughput_tps": 83.74,
          "throughput_std": 0.51,
          "ttft_ms": 160.82,
          "ttft_std": 2.78,
          "tpot_ms": 11.94,
          "tpot_std": 0.07,
          "peak_mem_mb": 4684.5,
          "output_tokens": 200,
          "prompt_tokens": 42,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.53,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 2.12,
          "tokens_per_target_pass": 3.12,
          "prompt_type": "factual"
        },
        {
          "throughput_tps": 60.22,
          "throughput_std": 0.01,
          "ttft_ms": 158.59,
          "ttft_std": 0.29,
          "tpot_ms": 16.61,
          "tpot_std": 0.0,
          "peak_mem_mb": 4699.6,
          "output_tokens": 38,
          "prompt_tokens": 47,
          "reps": 5,
          "k": 4,
          "acceptance_rate": 0.31,
          "acceptance_std": 0.0,
          "mean_accepted_per_round": 1.24,
          "tokens_per_target_pass": 2.24,
          "prompt_type": "creative"
        }
      ]
    }
  ]
};
