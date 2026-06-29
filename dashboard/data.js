window.BENCH_DATA = {
  "generated_runs": 14,
  "hardware": {
    "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
    "machine": "arm64",
    "cpu": "arm",
    "python": "3.13.13",
    "chip": "Apple M5 Pro",
    "memory_gb": 24.0
  },
  "versions": {
    "torch": "2.12.1",
    "transformers": "5.12.1",
    "mlx_lm": "0.31.3",
    "mlx": "0.31.2"
  },
  "runs": [
    {
      "manifest": {
        "run_id": "batch-1-1782666388-1",
        "label": "batch size 1",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 1,
        "max_output_tokens": 128,
        "load_time_s": 0.54,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:06:28+00:00",
        "study": "batching",
        "params": {
          "batch_size": 1
        },
        "price_per_hour": null
      },
      "aggregates": {
        "system_throughput_tps": 62.9,
        "per_stream_tps": 62.9,
        "total_output_tokens": 128,
        "wall_clock_s": 2.0351,
        "compute": {
          "peak_accel_mem_mb": 4105.7,
          "peak_rss_mb": 4549.7,
          "samples": 9
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4470.9,
          "cpu_pct": 98.9,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4549.7,
          "cpu_pct": 44.0,
          "accel_mem_mb": 4105.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.509,
          "rss_mb": 4520.1,
          "cpu_pct": 20.3,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.763,
          "rss_mb": 4520.1,
          "cpu_pct": 19.9,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.017,
          "rss_mb": 4520.1,
          "cpu_pct": 19.6,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.272,
          "rss_mb": 4520.1,
          "cpu_pct": 19.9,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.526,
          "rss_mb": 4520.2,
          "cpu_pct": 20.5,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.781,
          "rss_mb": 4520.2,
          "cpu_pct": 19.5,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.035,
          "rss_mb": 4520.2,
          "cpu_pct": 20.2,
          "accel_mem_mb": 4105.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "batch-16-1782666411-16",
        "label": "batch size 16",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 16,
        "num_requests": 16,
        "max_output_tokens": 128,
        "load_time_s": 0.54,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:06:51+00:00",
        "study": "batching",
        "params": {
          "batch_size": 16
        },
        "price_per_hour": null
      },
      "aggregates": {
        "system_throughput_tps": 244.07,
        "per_stream_tps": 15.25,
        "total_output_tokens": 2048,
        "wall_clock_s": 8.3909,
        "compute": {
          "peak_accel_mem_mb": 4755.2,
          "peak_rss_mb": 4369.1,
          "samples": 35
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4368.1,
          "cpu_pct": 93.1,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4368.2,
          "cpu_pct": 8.3,
          "accel_mem_mb": 4755.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.517,
          "rss_mb": 4368.2,
          "cpu_pct": 26.0,
          "accel_mem_mb": 4312.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.772,
          "rss_mb": 4369.1,
          "cpu_pct": 17.5,
          "accel_mem_mb": 4366.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.026,
          "rss_mb": 4369.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4371.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.281,
          "rss_mb": 4369.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.536,
          "rss_mb": 4369.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.789,
          "rss_mb": 4369.1,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4374.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.044,
          "rss_mb": 4369.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.297,
          "rss_mb": 4369.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4374.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.552,
          "rss_mb": 4369.1,
          "cpu_pct": 6.4,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.807,
          "rss_mb": 4369.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.06,
          "rss_mb": 4369.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.315,
          "rss_mb": 4369.0,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.57,
          "rss_mb": 4369.0,
          "cpu_pct": 6.6,
          "accel_mem_mb": 4362.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.822,
          "rss_mb": 4369.0,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4366.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.077,
          "rss_mb": 4369.0,
          "cpu_pct": 6.4,
          "accel_mem_mb": 4367.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.332,
          "rss_mb": 4369.0,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4366.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.587,
          "rss_mb": 4369.0,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4367.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.842,
          "rss_mb": 4369.0,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4366.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.097,
          "rss_mb": 4369.0,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.352,
          "rss_mb": 4369.0,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.607,
          "rss_mb": 4369.0,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4371.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.862,
          "rss_mb": 4369.1,
          "cpu_pct": 7.7,
          "accel_mem_mb": 4374.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.117,
          "rss_mb": 4369.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.372,
          "rss_mb": 4369.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4369.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.628,
          "rss_mb": 4369.1,
          "cpu_pct": 6.4,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.883,
          "rss_mb": 4369.1,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4367.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.138,
          "rss_mb": 4369.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4366.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.393,
          "rss_mb": 4369.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4366.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.647,
          "rss_mb": 4369.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4366.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.902,
          "rss_mb": 4369.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4371.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.157,
          "rss_mb": 4369.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.409,
          "rss_mb": 4369.1,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.664,
          "rss_mb": 4369.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4373.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "batch-2-1782666391-2",
        "label": "batch size 2",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 2,
        "num_requests": 2,
        "max_output_tokens": 128,
        "load_time_s": 0.54,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:06:31+00:00",
        "study": "batching",
        "params": {
          "batch_size": 2
        },
        "price_per_hour": null
      },
      "aggregates": {
        "system_throughput_tps": 108.6,
        "per_stream_tps": 54.3,
        "total_output_tokens": 256,
        "wall_clock_s": 2.3572,
        "compute": {
          "peak_accel_mem_mb": 4122.1,
          "peak_rss_mb": 4521.1,
          "samples": 10
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4520.6,
          "cpu_pct": 96.4,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.254,
          "rss_mb": 4521.1,
          "cpu_pct": 42.0,
          "accel_mem_mb": 4122.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.508,
          "rss_mb": 4521.1,
          "cpu_pct": 19.2,
          "accel_mem_mb": 4121.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.764,
          "rss_mb": 4475.9,
          "cpu_pct": 17.5,
          "accel_mem_mb": 4122.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.019,
          "rss_mb": 4475.9,
          "cpu_pct": 16.6,
          "accel_mem_mb": 4122.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.274,
          "rss_mb": 4374.9,
          "cpu_pct": 17.2,
          "accel_mem_mb": 4122.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.529,
          "rss_mb": 4374.9,
          "cpu_pct": 17.1,
          "accel_mem_mb": 4122.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.784,
          "rss_mb": 4374.9,
          "cpu_pct": 16.8,
          "accel_mem_mb": 4122.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.039,
          "rss_mb": 4374.9,
          "cpu_pct": 16.7,
          "accel_mem_mb": 4122.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.294,
          "rss_mb": 4374.9,
          "cpu_pct": 17.6,
          "accel_mem_mb": 4122.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "batch-32-1782666420-32",
        "label": "batch size 32",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 32,
        "num_requests": 32,
        "max_output_tokens": 128,
        "load_time_s": 0.54,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:07:00+00:00",
        "study": "batching",
        "params": {
          "batch_size": 32
        },
        "price_per_hour": null
      },
      "aggregates": {
        "system_throughput_tps": 492.11,
        "per_stream_tps": 15.38,
        "total_output_tokens": 4096,
        "wall_clock_s": 8.3233,
        "compute": {
          "peak_accel_mem_mb": 5216.8,
          "peak_rss_mb": 4369.3,
          "samples": 37
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4369.1,
          "cpu_pct": 94.2,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4369.1,
          "cpu_pct": 9.0,
          "accel_mem_mb": 4967.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.51,
          "rss_mb": 4369.1,
          "cpu_pct": 2.7,
          "accel_mem_mb": 5111.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.765,
          "rss_mb": 4369.1,
          "cpu_pct": 7.4,
          "accel_mem_mb": 5216.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.016,
          "rss_mb": 4369.2,
          "cpu_pct": 39.1,
          "accel_mem_mb": 4626.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.271,
          "rss_mb": 4369.2,
          "cpu_pct": 7.2,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.524,
          "rss_mb": 4369.2,
          "cpu_pct": 7.0,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.779,
          "rss_mb": 4369.2,
          "cpu_pct": 7.6,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.035,
          "rss_mb": 4369.2,
          "cpu_pct": 7.0,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.286,
          "rss_mb": 4369.2,
          "cpu_pct": 7.1,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.542,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.797,
          "rss_mb": 4369.2,
          "cpu_pct": 6.8,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.052,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.307,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.558,
          "rss_mb": 4369.2,
          "cpu_pct": 7.1,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.813,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.066,
          "rss_mb": 4369.2,
          "cpu_pct": 6.8,
          "accel_mem_mb": 4626.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.321,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4629.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.576,
          "rss_mb": 4369.2,
          "cpu_pct": 7.0,
          "accel_mem_mb": 4629.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.831,
          "rss_mb": 4369.2,
          "cpu_pct": 6.8,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.086,
          "rss_mb": 4369.2,
          "cpu_pct": 7.0,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.341,
          "rss_mb": 4369.2,
          "cpu_pct": 7.1,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.596,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.851,
          "rss_mb": 4369.2,
          "cpu_pct": 6.8,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.106,
          "rss_mb": 4369.2,
          "cpu_pct": 6.8,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.358,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4624.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.613,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.868,
          "rss_mb": 4369.2,
          "cpu_pct": 6.7,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.123,
          "rss_mb": 4369.2,
          "cpu_pct": 6.7,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.378,
          "rss_mb": 4369.2,
          "cpu_pct": 7.2,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.633,
          "rss_mb": 4369.2,
          "cpu_pct": 7.0,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.888,
          "rss_mb": 4369.2,
          "cpu_pct": 6.7,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.141,
          "rss_mb": 4369.2,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4629.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.396,
          "rss_mb": 4369.2,
          "cpu_pct": 7.0,
          "accel_mem_mb": 4621.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.649,
          "rss_mb": 4369.2,
          "cpu_pct": 7.1,
          "accel_mem_mb": 4625.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.905,
          "rss_mb": 4369.2,
          "cpu_pct": 6.7,
          "accel_mem_mb": 4627.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.158,
          "rss_mb": 4369.3,
          "cpu_pct": 8.1,
          "accel_mem_mb": 4626.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "batch-4-1782666395-4",
        "label": "batch size 4",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 4,
        "num_requests": 4,
        "max_output_tokens": 128,
        "load_time_s": 0.54,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:06:35+00:00",
        "study": "batching",
        "params": {
          "batch_size": 4
        },
        "price_per_hour": null
      },
      "aggregates": {
        "system_throughput_tps": 135.59,
        "per_stream_tps": 33.9,
        "total_output_tokens": 512,
        "wall_clock_s": 3.7761,
        "compute": {
          "peak_accel_mem_mb": 4156.0,
          "peak_rss_mb": 4374.9,
          "samples": 16
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4374.9,
          "cpu_pct": 93.0,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4367.4,
          "cpu_pct": 41.6,
          "accel_mem_mb": 4155.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.51,
          "rss_mb": 4367.4,
          "cpu_pct": 11.5,
          "accel_mem_mb": 4155.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.764,
          "rss_mb": 4367.4,
          "cpu_pct": 11.3,
          "accel_mem_mb": 4155.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.02,
          "rss_mb": 4367.4,
          "cpu_pct": 11.3,
          "accel_mem_mb": 4154.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.273,
          "rss_mb": 4367.4,
          "cpu_pct": 11.2,
          "accel_mem_mb": 4155.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.528,
          "rss_mb": 4367.4,
          "cpu_pct": 11.2,
          "accel_mem_mb": 4155.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.783,
          "rss_mb": 4367.4,
          "cpu_pct": 11.0,
          "accel_mem_mb": 4155.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.038,
          "rss_mb": 4367.4,
          "cpu_pct": 11.6,
          "accel_mem_mb": 4155.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.293,
          "rss_mb": 4367.4,
          "cpu_pct": 11.2,
          "accel_mem_mb": 4154.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.548,
          "rss_mb": 4367.4,
          "cpu_pct": 11.4,
          "accel_mem_mb": 4154.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.803,
          "rss_mb": 4367.4,
          "cpu_pct": 11.1,
          "accel_mem_mb": 4154.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.056,
          "rss_mb": 4367.4,
          "cpu_pct": 11.1,
          "accel_mem_mb": 4154.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.306,
          "rss_mb": 4367.4,
          "cpu_pct": 11.2,
          "accel_mem_mb": 4155.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.557,
          "rss_mb": 4367.4,
          "cpu_pct": 11.3,
          "accel_mem_mb": 4155.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.812,
          "rss_mb": 4367.4,
          "cpu_pct": 11.4,
          "accel_mem_mb": 4156.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "batch-8-1782666402-8",
        "label": "batch size 8",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 8,
        "num_requests": 8,
        "max_output_tokens": 128,
        "load_time_s": 0.54,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:06:42+00:00",
        "study": "batching",
        "params": {
          "batch_size": 8
        },
        "price_per_hour": null
      },
      "aggregates": {
        "system_throughput_tps": 145.05,
        "per_stream_tps": 18.13,
        "total_output_tokens": 1024,
        "wall_clock_s": 7.0597,
        "compute": {
          "peak_accel_mem_mb": 4302.9,
          "peak_rss_mb": 4368.1,
          "samples": 29
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4367.5,
          "cpu_pct": 92.0,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4367.6,
          "cpu_pct": 11.3,
          "accel_mem_mb": 4302.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.508,
          "rss_mb": 4367.8,
          "cpu_pct": 37.2,
          "accel_mem_mb": 4216.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.763,
          "rss_mb": 4368.1,
          "cpu_pct": 6.6,
          "accel_mem_mb": 4216.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.018,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.273,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.529,
          "rss_mb": 4368.1,
          "cpu_pct": 6.9,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.784,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.039,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.291,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.547,
          "rss_mb": 4368.1,
          "cpu_pct": 6.4,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.8,
          "rss_mb": 4368.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.055,
          "rss_mb": 4368.1,
          "cpu_pct": 5.9,
          "accel_mem_mb": 4216.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.308,
          "rss_mb": 4368.1,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.563,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.818,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.073,
          "rss_mb": 4368.1,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.325,
          "rss_mb": 4368.1,
          "cpu_pct": 6.0,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.58,
          "rss_mb": 4368.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.833,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.088,
          "rss_mb": 4368.1,
          "cpu_pct": 6.1,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.343,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.598,
          "rss_mb": 4368.1,
          "cpu_pct": 6.4,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.854,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.109,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.364,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.616,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.872,
          "rss_mb": 4368.1,
          "cpu_pct": 6.3,
          "accel_mem_mb": 4218.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.127,
          "rss_mb": 4368.1,
          "cpu_pct": 6.2,
          "accel_mem_mb": 4217.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int4-1782666080",
        "label": "7B 4-bit \u00b7 KV 4-bit",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 6,
        "max_output_tokens": 256,
        "load_time_s": 0.43,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:01:20+00:00",
        "study": "kv_cache",
        "params": {
          "kv_bits": 4
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 6,
        "requests_failed": 0,
        "wall_clock_s": 25.656,
        "total_input_tokens": 1770,
        "total_output_tokens": 1536,
        "system_throughput_tps": 59.87,
        "requests_per_s": 0.234,
        "decode_tps_per_req": {
          "p50": 64.313,
          "p90": 64.536,
          "p99": 64.574,
          "mean": 64.079
        },
        "ttft_ms": {
          "p50": 295.935,
          "p90": 305.273,
          "p99": 308.23,
          "mean": 296.052
        },
        "tpot_ms": {
          "p50": 15.549,
          "p90": 15.777,
          "p99": 15.907,
          "mean": 15.607
        },
        "e2e_ms": {
          "p50": 4254.521,
          "p90": 4327.141,
          "p99": 4364.268,
          "mean": 4275.872
        },
        "compute": {
          "peak_rss_mb": 4566.0,
          "mean_cpu_pct": 30.3,
          "peak_cpu_pct": 98.8,
          "peak_accel_mem_mb": 4524.4,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 101
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4557.9,
          "cpu_pct": 98.8,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4565.3,
          "cpu_pct": 24.2,
          "accel_mem_mb": 4130.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.511,
          "rss_mb": 4565.5,
          "cpu_pct": 30.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.766,
          "rss_mb": 4565.5,
          "cpu_pct": 30.1,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.021,
          "rss_mb": 4565.5,
          "cpu_pct": 30.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.276,
          "rss_mb": 4565.5,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.531,
          "rss_mb": 4565.5,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.786,
          "rss_mb": 4565.5,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.042,
          "rss_mb": 4565.5,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4100.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.297,
          "rss_mb": 4565.5,
          "cpu_pct": 34.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.55,
          "rss_mb": 4565.5,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.805,
          "rss_mb": 4565.5,
          "cpu_pct": 32.1,
          "accel_mem_mb": 4100.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.06,
          "rss_mb": 4565.5,
          "cpu_pct": 30.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.311,
          "rss_mb": 4565.5,
          "cpu_pct": 31.9,
          "accel_mem_mb": 4100.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.566,
          "rss_mb": 4565.5,
          "cpu_pct": 30.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.821,
          "rss_mb": 4565.7,
          "cpu_pct": 34.5,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.075,
          "rss_mb": 4565.8,
          "cpu_pct": 41.6,
          "accel_mem_mb": 4104.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.326,
          "rss_mb": 4566.0,
          "cpu_pct": 65.0,
          "accel_mem_mb": 4260.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.581,
          "rss_mb": 4566.0,
          "cpu_pct": 11.2,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.836,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.091,
          "rss_mb": 4566.0,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.346,
          "rss_mb": 4566.0,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4100.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.598,
          "rss_mb": 4565.9,
          "cpu_pct": 30.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.849,
          "rss_mb": 4565.9,
          "cpu_pct": 31.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.104,
          "rss_mb": 4565.9,
          "cpu_pct": 31.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.359,
          "rss_mb": 4565.9,
          "cpu_pct": 30.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.61,
          "rss_mb": 4565.9,
          "cpu_pct": 32.4,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.865,
          "rss_mb": 4566.0,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.12,
          "rss_mb": 4566.0,
          "cpu_pct": 28.5,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.375,
          "rss_mb": 4566.0,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4100.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.63,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.885,
          "rss_mb": 4566.0,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.14,
          "rss_mb": 4566.0,
          "cpu_pct": 29.7,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.395,
          "rss_mb": 4566.0,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.666,
          "rss_mb": 4566.0,
          "cpu_pct": 40.2,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.921,
          "rss_mb": 4565.9,
          "cpu_pct": 13.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.176,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.431,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.686,
          "rss_mb": 4566.0,
          "cpu_pct": 28.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.937,
          "rss_mb": 4566.0,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4100.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.192,
          "rss_mb": 4566.0,
          "cpu_pct": 29.8,
          "accel_mem_mb": 4100.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.447,
          "rss_mb": 4566.0,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4100.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.702,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.957,
          "rss_mb": 4566.0,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.212,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.467,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.722,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.977,
          "rss_mb": 4566.0,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.232,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.487,
          "rss_mb": 4566.0,
          "cpu_pct": 29.7,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.742,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.998,
          "rss_mb": 4566.0,
          "cpu_pct": 38.5,
          "accel_mem_mb": 4524.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.253,
          "rss_mb": 4566.0,
          "cpu_pct": 16.1,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.508,
          "rss_mb": 4566.0,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.763,
          "rss_mb": 4566.0,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.018,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.273,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.528,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.783,
          "rss_mb": 4566.0,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.038,
          "rss_mb": 4566.0,
          "cpu_pct": 33.5,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.293,
          "rss_mb": 4566.0,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.548,
          "rss_mb": 4566.0,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.803,
          "rss_mb": 4566.0,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.059,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.314,
          "rss_mb": 4566.0,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4100.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.569,
          "rss_mb": 4566.0,
          "cpu_pct": 29.7,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.824,
          "rss_mb": 4566.0,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.079,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.334,
          "rss_mb": 4566.0,
          "cpu_pct": 28.2,
          "accel_mem_mb": 4392.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.589,
          "rss_mb": 4566.0,
          "cpu_pct": 25.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.844,
          "rss_mb": 4566.0,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4099.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.099,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.354,
          "rss_mb": 4566.0,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.609,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.864,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.12,
          "rss_mb": 4566.0,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4100.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.375,
          "rss_mb": 4566.0,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4100.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.63,
          "rss_mb": 4566.0,
          "cpu_pct": 28.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.885,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.14,
          "rss_mb": 4566.0,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.395,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.65,
          "rss_mb": 4566.0,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.905,
          "rss_mb": 4566.0,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4103.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.156,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4104.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.422,
          "rss_mb": 4566.0,
          "cpu_pct": 35.0,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.678,
          "rss_mb": 4565.9,
          "cpu_pct": 17.7,
          "accel_mem_mb": 4096.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.933,
          "rss_mb": 4566.0,
          "cpu_pct": 30.4,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.188,
          "rss_mb": 4566.0,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.443,
          "rss_mb": 4566.0,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.698,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.953,
          "rss_mb": 4566.0,
          "cpu_pct": 30.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.203,
          "rss_mb": 4566.0,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4099.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.458,
          "rss_mb": 4566.0,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4100.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.713,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.968,
          "rss_mb": 4566.0,
          "cpu_pct": 31.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.223,
          "rss_mb": 4566.0,
          "cpu_pct": 30.6,
          "accel_mem_mb": 4099.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.478,
          "rss_mb": 4566.0,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.733,
          "rss_mb": 4566.0,
          "cpu_pct": 29.7,
          "accel_mem_mb": 4100.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.985,
          "rss_mb": 4566.0,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4100.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.24,
          "rss_mb": 4566.0,
          "cpu_pct": 30.6,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.495,
          "rss_mb": 4566.0,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4104.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int4-1782666052",
        "label": "7B 4-bit \u00b7 KV 8-bit",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 6,
        "max_output_tokens": 256,
        "load_time_s": 0.44,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:00:52+00:00",
        "study": "kv_cache",
        "params": {
          "kv_bits": 8
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 6,
        "requests_failed": 0,
        "wall_clock_s": 25.685,
        "total_input_tokens": 1770,
        "total_output_tokens": 1536,
        "system_throughput_tps": 59.8,
        "requests_per_s": 0.234,
        "decode_tps_per_req": {
          "p50": 64.019,
          "p90": 64.62,
          "p99": 64.857,
          "mean": 63.875
        },
        "ttft_ms": {
          "p50": 287.244,
          "p90": 291.62,
          "p99": 293.888,
          "mean": 287.994
        },
        "tpot_ms": {
          "p50": 15.62,
          "p90": 15.877,
          "p99": 15.982,
          "mean": 15.658
        },
        "e2e_ms": {
          "p50": 4270.431,
          "p90": 4339.928,
          "p99": 4364.012,
          "mean": 4280.704
        },
        "compute": {
          "peak_rss_mb": 4566.3,
          "mean_cpu_pct": 30.5,
          "peak_cpu_pct": 99.5,
          "peak_accel_mem_mb": 4516.4,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 101
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4557.1,
          "cpu_pct": 99.5,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4565.5,
          "cpu_pct": 24.7,
          "accel_mem_mb": 4175.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.51,
          "rss_mb": 4565.6,
          "cpu_pct": 31.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.766,
          "rss_mb": 4565.6,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.022,
          "rss_mb": 4565.6,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.277,
          "rss_mb": 4565.7,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4107.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.532,
          "rss_mb": 4565.7,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.787,
          "rss_mb": 4565.7,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.042,
          "rss_mb": 4565.7,
          "cpu_pct": 30.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.293,
          "rss_mb": 4565.7,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.548,
          "rss_mb": 4565.7,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.803,
          "rss_mb": 4565.7,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.058,
          "rss_mb": 4565.7,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4107.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.313,
          "rss_mb": 4565.7,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.569,
          "rss_mb": 4565.7,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.819,
          "rss_mb": 4565.8,
          "cpu_pct": 30.8,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.074,
          "rss_mb": 4565.8,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4114.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.329,
          "rss_mb": 4565.9,
          "cpu_pct": 44.0,
          "accel_mem_mb": 4516.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.584,
          "rss_mb": 4566.0,
          "cpu_pct": 11.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.839,
          "rss_mb": 4566.0,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.094,
          "rss_mb": 4566.0,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.349,
          "rss_mb": 4566.0,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.604,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4106.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.86,
          "rss_mb": 4566.0,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.115,
          "rss_mb": 4566.0,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.37,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.625,
          "rss_mb": 4566.0,
          "cpu_pct": 30.5,
          "accel_mem_mb": 4106.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.88,
          "rss_mb": 4566.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.135,
          "rss_mb": 4566.0,
          "cpu_pct": 30.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.39,
          "rss_mb": 4566.0,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.645,
          "rss_mb": 4566.0,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4107.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.9,
          "rss_mb": 4566.0,
          "cpu_pct": 30.1,
          "accel_mem_mb": 4114.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.156,
          "rss_mb": 4566.0,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.411,
          "rss_mb": 4566.0,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.666,
          "rss_mb": 4566.0,
          "cpu_pct": 31.8,
          "accel_mem_mb": 4507.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.921,
          "rss_mb": 4566.0,
          "cpu_pct": 23.6,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.175,
          "rss_mb": 4566.1,
          "cpu_pct": 33.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.43,
          "rss_mb": 4566.1,
          "cpu_pct": 30.7,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.685,
          "rss_mb": 4566.1,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.941,
          "rss_mb": 4566.1,
          "cpu_pct": 34.1,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.196,
          "rss_mb": 4566.1,
          "cpu_pct": 30.0,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.451,
          "rss_mb": 4566.1,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.706,
          "rss_mb": 4566.1,
          "cpu_pct": 30.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.961,
          "rss_mb": 4566.1,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.217,
          "rss_mb": 4566.1,
          "cpu_pct": 30.1,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.472,
          "rss_mb": 4566.1,
          "cpu_pct": 30.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.727,
          "rss_mb": 4566.1,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.979,
          "rss_mb": 4566.1,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.234,
          "rss_mb": 4566.1,
          "cpu_pct": 30.7,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.489,
          "rss_mb": 4566.1,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.771,
          "rss_mb": 4566.2,
          "cpu_pct": 39.5,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.026,
          "rss_mb": 4566.2,
          "cpu_pct": 13.6,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.282,
          "rss_mb": 4566.2,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.537,
          "rss_mb": 4566.2,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.792,
          "rss_mb": 4566.2,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.044,
          "rss_mb": 4566.2,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.3,
          "rss_mb": 4566.2,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.555,
          "rss_mb": 4566.2,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.81,
          "rss_mb": 4566.2,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.065,
          "rss_mb": 4566.2,
          "cpu_pct": 30.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.32,
          "rss_mb": 4566.2,
          "cpu_pct": 31.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.575,
          "rss_mb": 4566.2,
          "cpu_pct": 35.2,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.83,
          "rss_mb": 4566.2,
          "cpu_pct": 39.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.084,
          "rss_mb": 4566.2,
          "cpu_pct": 35.5,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.339,
          "rss_mb": 4566.2,
          "cpu_pct": 33.3,
          "accel_mem_mb": 4107.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.594,
          "rss_mb": 4566.2,
          "cpu_pct": 36.4,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.849,
          "rss_mb": 4566.2,
          "cpu_pct": 31.5,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.117,
          "rss_mb": 4566.2,
          "cpu_pct": 38.8,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.369,
          "rss_mb": 4566.1,
          "cpu_pct": 20.3,
          "accel_mem_mb": 4106.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.624,
          "rss_mb": 4566.3,
          "cpu_pct": 38.3,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.879,
          "rss_mb": 4566.3,
          "cpu_pct": 32.1,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.134,
          "rss_mb": 4566.3,
          "cpu_pct": 32.8,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.39,
          "rss_mb": 4566.3,
          "cpu_pct": 32.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.645,
          "rss_mb": 4566.3,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.9,
          "rss_mb": 4566.3,
          "cpu_pct": 28.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.152,
          "rss_mb": 4566.3,
          "cpu_pct": 30.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.407,
          "rss_mb": 4566.3,
          "cpu_pct": 30.2,
          "accel_mem_mb": 4107.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.662,
          "rss_mb": 4566.3,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.917,
          "rss_mb": 4566.3,
          "cpu_pct": 28.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.172,
          "rss_mb": 4566.3,
          "cpu_pct": 30.5,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.427,
          "rss_mb": 4566.3,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.682,
          "rss_mb": 4566.3,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.938,
          "rss_mb": 4566.3,
          "cpu_pct": 29.8,
          "accel_mem_mb": 4114.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.193,
          "rss_mb": 4566.3,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4114.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.454,
          "rss_mb": 4566.3,
          "cpu_pct": 41.7,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.709,
          "rss_mb": 4566.3,
          "cpu_pct": 12.1,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.965,
          "rss_mb": 4566.3,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.22,
          "rss_mb": 4566.3,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.475,
          "rss_mb": 4566.3,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.73,
          "rss_mb": 4566.2,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.986,
          "rss_mb": 4566.2,
          "cpu_pct": 29.5,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.241,
          "rss_mb": 4566.2,
          "cpu_pct": 29.7,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.496,
          "rss_mb": 4566.2,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4107.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.747,
          "rss_mb": 4566.2,
          "cpu_pct": 28.9,
          "accel_mem_mb": 4107.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.002,
          "rss_mb": 4566.2,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.257,
          "rss_mb": 4566.2,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.513,
          "rss_mb": 4566.2,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.768,
          "rss_mb": 4566.2,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.023,
          "rss_mb": 4566.2,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4107.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.278,
          "rss_mb": 4566.2,
          "cpu_pct": 30.1,
          "accel_mem_mb": 4114.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.533,
          "rss_mb": 4566.2,
          "cpu_pct": 35.5,
          "accel_mem_mb": 4114.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int4-1782666024",
        "label": "7B 4-bit \u00b7 KV full precision",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 6,
        "max_output_tokens": 256,
        "load_time_s": 0.45,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T17:00:24+00:00",
        "study": "kv_cache",
        "params": {
          "kv_bits": "full"
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 6,
        "requests_failed": 0,
        "wall_clock_s": 25.512,
        "total_input_tokens": 1770,
        "total_output_tokens": 1536,
        "system_throughput_tps": 60.21,
        "requests_per_s": 0.235,
        "decode_tps_per_req": {
          "p50": 64.866,
          "p90": 65.91,
          "p99": 65.993,
          "mean": 64.507
        },
        "ttft_ms": {
          "p50": 295.271,
          "p90": 305.141,
          "p99": 308.294,
          "mean": 297.086
        },
        "tpot_ms": {
          "p50": 15.416,
          "p90": 15.938,
          "p99": 16.016,
          "mean": 15.509
        },
        "e2e_ms": {
          "p50": 4231.478,
          "p90": 4363.902,
          "p99": 4382.133,
          "mean": 4251.849
        },
        "compute": {
          "peak_rss_mb": 4565.4,
          "mean_cpu_pct": 24.0,
          "peak_cpu_pct": 98.8,
          "peak_accel_mem_mb": 4526.4,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 101
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4557.7,
          "cpu_pct": 98.8,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4565.0,
          "cpu_pct": 27.9,
          "accel_mem_mb": 4235.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.508,
          "rss_mb": 4565.2,
          "cpu_pct": 26.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.763,
          "rss_mb": 4565.2,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.017,
          "rss_mb": 4565.2,
          "cpu_pct": 23.3,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.272,
          "rss_mb": 4565.2,
          "cpu_pct": 23.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.525,
          "rss_mb": 4565.2,
          "cpu_pct": 23.4,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.775,
          "rss_mb": 4565.2,
          "cpu_pct": 23.5,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.031,
          "rss_mb": 4565.2,
          "cpu_pct": 23.5,
          "accel_mem_mb": 4119.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.284,
          "rss_mb": 4565.2,
          "cpu_pct": 23.1,
          "accel_mem_mb": 4119.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.539,
          "rss_mb": 4565.2,
          "cpu_pct": 23.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.79,
          "rss_mb": 4565.2,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.041,
          "rss_mb": 4565.2,
          "cpu_pct": 26.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.293,
          "rss_mb": 4565.2,
          "cpu_pct": 23.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.544,
          "rss_mb": 4565.2,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.799,
          "rss_mb": 4565.2,
          "cpu_pct": 23.4,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.055,
          "rss_mb": 4565.2,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.308,
          "rss_mb": 4565.2,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4134.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.562,
          "rss_mb": 4565.3,
          "cpu_pct": 28.1,
          "accel_mem_mb": 4384.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.816,
          "rss_mb": 4565.2,
          "cpu_pct": 20.3,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.07,
          "rss_mb": 4565.2,
          "cpu_pct": 23.1,
          "accel_mem_mb": 4119.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.325,
          "rss_mb": 4565.2,
          "cpu_pct": 22.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.58,
          "rss_mb": 4565.2,
          "cpu_pct": 23.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.833,
          "rss_mb": 4565.2,
          "cpu_pct": 23.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.087,
          "rss_mb": 4565.2,
          "cpu_pct": 25.7,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.342,
          "rss_mb": 4565.3,
          "cpu_pct": 27.5,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.597,
          "rss_mb": 4565.3,
          "cpu_pct": 23.8,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.852,
          "rss_mb": 4565.3,
          "cpu_pct": 22.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.107,
          "rss_mb": 4565.3,
          "cpu_pct": 22.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.361,
          "rss_mb": 4565.3,
          "cpu_pct": 23.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.616,
          "rss_mb": 4565.3,
          "cpu_pct": 22.6,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.871,
          "rss_mb": 4565.3,
          "cpu_pct": 23.9,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.124,
          "rss_mb": 4565.3,
          "cpu_pct": 25.1,
          "accel_mem_mb": 4134.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.38,
          "rss_mb": 4565.3,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.632,
          "rss_mb": 4565.3,
          "cpu_pct": 36.6,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.884,
          "rss_mb": 4565.3,
          "cpu_pct": 48.3,
          "accel_mem_mb": 4526.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.139,
          "rss_mb": 4565.4,
          "cpu_pct": 16.7,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.394,
          "rss_mb": 4565.4,
          "cpu_pct": 25.4,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.649,
          "rss_mb": 4565.4,
          "cpu_pct": 22.6,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.899,
          "rss_mb": 4565.4,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.155,
          "rss_mb": 4565.4,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.41,
          "rss_mb": 4565.4,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.665,
          "rss_mb": 4565.4,
          "cpu_pct": 21.3,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.92,
          "rss_mb": 4565.4,
          "cpu_pct": 21.2,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.175,
          "rss_mb": 4565.4,
          "cpu_pct": 24.3,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.43,
          "rss_mb": 4565.4,
          "cpu_pct": 23.6,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.685,
          "rss_mb": 4565.4,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.94,
          "rss_mb": 4565.4,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.195,
          "rss_mb": 4565.4,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.451,
          "rss_mb": 4565.4,
          "cpu_pct": 22.6,
          "accel_mem_mb": 4133.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.706,
          "rss_mb": 4565.4,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4134.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.961,
          "rss_mb": 4565.4,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.216,
          "rss_mb": 4565.4,
          "cpu_pct": 27.8,
          "accel_mem_mb": 4272.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.471,
          "rss_mb": 4565.4,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.723,
          "rss_mb": 4565.4,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.978,
          "rss_mb": 4565.4,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.233,
          "rss_mb": 4565.4,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.489,
          "rss_mb": 4565.4,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.742,
          "rss_mb": 4565.4,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.997,
          "rss_mb": 4565.4,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.252,
          "rss_mb": 4565.4,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.507,
          "rss_mb": 4565.4,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.762,
          "rss_mb": 4565.4,
          "cpu_pct": 21.4,
          "accel_mem_mb": 4119.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.017,
          "rss_mb": 4565.4,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.268,
          "rss_mb": 4565.4,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.523,
          "rss_mb": 4565.4,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.778,
          "rss_mb": 4565.4,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4134.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.033,
          "rss_mb": 4565.4,
          "cpu_pct": 21.2,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.288,
          "rss_mb": 4565.4,
          "cpu_pct": 34.1,
          "accel_mem_mb": 4526.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.543,
          "rss_mb": 4565.4,
          "cpu_pct": 13.8,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.798,
          "rss_mb": 4565.4,
          "cpu_pct": 21.4,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.053,
          "rss_mb": 4565.4,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.303,
          "rss_mb": 4565.4,
          "cpu_pct": 21.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.558,
          "rss_mb": 4565.4,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.814,
          "rss_mb": 4565.4,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.066,
          "rss_mb": 4565.4,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.321,
          "rss_mb": 4565.4,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.576,
          "rss_mb": 4565.4,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.827,
          "rss_mb": 4565.4,
          "cpu_pct": 21.2,
          "accel_mem_mb": 4119.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.082,
          "rss_mb": 4565.4,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.337,
          "rss_mb": 4565.4,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.592,
          "rss_mb": 4565.4,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.847,
          "rss_mb": 4565.4,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.102,
          "rss_mb": 4565.4,
          "cpu_pct": 25.8,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.358,
          "rss_mb": 4561.4,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.614,
          "rss_mb": 4565.4,
          "cpu_pct": 23.7,
          "accel_mem_mb": 4197.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.869,
          "rss_mb": 4565.3,
          "cpu_pct": 23.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.124,
          "rss_mb": 4565.3,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4119.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.379,
          "rss_mb": 4565.3,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4119.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.634,
          "rss_mb": 4565.3,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.889,
          "rss_mb": 4565.3,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4120.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.144,
          "rss_mb": 4565.3,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.399,
          "rss_mb": 4565.3,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.654,
          "rss_mb": 4565.3,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.909,
          "rss_mb": 4565.3,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.164,
          "rss_mb": 4565.3,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4120.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.42,
          "rss_mb": 4565.3,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4119.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.675,
          "rss_mb": 4565.3,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4120.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.93,
          "rss_mb": 4565.3,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4137.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.181,
          "rss_mb": 4565.3,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4134.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.436,
          "rss_mb": 4565.3,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4134.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int4-1782665929",
        "label": "Qwen2.5-7B \u00b7 4-bit",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 12,
        "max_output_tokens": 128,
        "load_time_s": 181.95,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T16:58:49+00:00",
        "study": "quantization",
        "params": {
          "precision": "int4",
          "bits": 4
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 12,
        "requests_failed": 0,
        "wall_clock_s": 25.156,
        "total_input_tokens": 525,
        "total_output_tokens": 1536,
        "system_throughput_tps": 61.06,
        "requests_per_s": 0.477,
        "decode_tps_per_req": {
          "p50": 66.16,
          "p90": 66.791,
          "p99": 66.814,
          "mean": 65.68
        },
        "ttft_ms": {
          "p50": 159.961,
          "p90": 167.515,
          "p99": 169.835,
          "mean": 161.681
        },
        "tpot_ms": {
          "p50": 15.115,
          "p90": 15.843,
          "p99": 15.979,
          "mean": 15.233
        },
        "e2e_ms": {
          "p50": 2080.144,
          "p90": 2181.784,
          "p99": 2190.223,
          "mean": 2096.229
        },
        "compute": {
          "peak_rss_mb": 6126.9,
          "mean_cpu_pct": 24.4,
          "peak_cpu_pct": 99.2,
          "peak_accel_mem_mb": 4233.4,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 99
        },
        "cost_per_1m_tokens_usd": null,
        "quality": {
          "perplexity": 11.7497
        }
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 6120.2,
          "cpu_pct": 99.2,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 6126.8,
          "cpu_pct": 34.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.51,
          "rss_mb": 6126.8,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.766,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.021,
          "rss_mb": 6126.8,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.276,
          "rss_mb": 6126.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.531,
          "rss_mb": 6126.8,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.786,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.038,
          "rss_mb": 6126.8,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.293,
          "rss_mb": 6126.8,
          "cpu_pct": 37.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.544,
          "rss_mb": 6126.8,
          "cpu_pct": 24.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.799,
          "rss_mb": 6126.8,
          "cpu_pct": 23.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.052,
          "rss_mb": 6126.8,
          "cpu_pct": 23.6,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.307,
          "rss_mb": 6126.8,
          "cpu_pct": 29.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.561,
          "rss_mb": 6126.8,
          "cpu_pct": 24.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.816,
          "rss_mb": 6126.8,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.068,
          "rss_mb": 6126.8,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.323,
          "rss_mb": 6126.8,
          "cpu_pct": 32.3,
          "accel_mem_mb": 4108.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.579,
          "rss_mb": 6126.8,
          "cpu_pct": 24.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.834,
          "rss_mb": 6126.8,
          "cpu_pct": 21.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.089,
          "rss_mb": 6126.8,
          "cpu_pct": 23.8,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.344,
          "rss_mb": 6126.8,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.599,
          "rss_mb": 6126.8,
          "cpu_pct": 20.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.854,
          "rss_mb": 6126.8,
          "cpu_pct": 20.2,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.106,
          "rss_mb": 6126.8,
          "cpu_pct": 20.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.361,
          "rss_mb": 6126.8,
          "cpu_pct": 21.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.616,
          "rss_mb": 6126.9,
          "cpu_pct": 36.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.871,
          "rss_mb": 6126.9,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.125,
          "rss_mb": 6126.9,
          "cpu_pct": 20.1,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.379,
          "rss_mb": 6126.9,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.632,
          "rss_mb": 6126.9,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.887,
          "rss_mb": 6126.9,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.142,
          "rss_mb": 6126.9,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.397,
          "rss_mb": 6126.9,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.652,
          "rss_mb": 6126.9,
          "cpu_pct": 35.9,
          "accel_mem_mb": 4233.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.907,
          "rss_mb": 6126.8,
          "cpu_pct": 19.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.163,
          "rss_mb": 6126.8,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.418,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.673,
          "rss_mb": 6126.8,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.928,
          "rss_mb": 6126.8,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.183,
          "rss_mb": 6126.8,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.438,
          "rss_mb": 6126.8,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.693,
          "rss_mb": 6126.8,
          "cpu_pct": 37.8,
          "accel_mem_mb": 4205.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.948,
          "rss_mb": 6126.8,
          "cpu_pct": 17.7,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.204,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.459,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.714,
          "rss_mb": 6126.8,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.969,
          "rss_mb": 6126.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.224,
          "rss_mb": 6126.8,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.479,
          "rss_mb": 6126.8,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.744,
          "rss_mb": 6126.8,
          "cpu_pct": 34.8,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.999,
          "rss_mb": 6126.8,
          "cpu_pct": 20.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.254,
          "rss_mb": 6126.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.509,
          "rss_mb": 6126.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.764,
          "rss_mb": 6126.8,
          "cpu_pct": 21.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.019,
          "rss_mb": 6126.8,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.275,
          "rss_mb": 6126.8,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.53,
          "rss_mb": 6126.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.805,
          "rss_mb": 6126.8,
          "cpu_pct": 33.9,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.06,
          "rss_mb": 6126.8,
          "cpu_pct": 20.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.315,
          "rss_mb": 6126.8,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.57,
          "rss_mb": 6126.8,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.826,
          "rss_mb": 6126.8,
          "cpu_pct": 21.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.081,
          "rss_mb": 6126.8,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.336,
          "rss_mb": 6126.8,
          "cpu_pct": 21.2,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.591,
          "rss_mb": 6126.8,
          "cpu_pct": 21.4,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.847,
          "rss_mb": 6123.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.102,
          "rss_mb": 6126.7,
          "cpu_pct": 34.1,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.357,
          "rss_mb": 6126.7,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.612,
          "rss_mb": 6126.8,
          "cpu_pct": 26.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.867,
          "rss_mb": 6126.8,
          "cpu_pct": 21.3,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.122,
          "rss_mb": 6126.8,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.377,
          "rss_mb": 6126.8,
          "cpu_pct": 21.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.632,
          "rss_mb": 6126.8,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.882,
          "rss_mb": 6126.8,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.137,
          "rss_mb": 6126.8,
          "cpu_pct": 32.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.392,
          "rss_mb": 6126.8,
          "cpu_pct": 21.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.645,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.9,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.155,
          "rss_mb": 6126.8,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.41,
          "rss_mb": 6126.8,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.665,
          "rss_mb": 6126.8,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.92,
          "rss_mb": 6126.8,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.176,
          "rss_mb": 5420.9,
          "cpu_pct": 36.0,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.431,
          "rss_mb": 5420.9,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.686,
          "rss_mb": 5420.9,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.941,
          "rss_mb": 5420.9,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.196,
          "rss_mb": 5420.9,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.451,
          "rss_mb": 5420.9,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.706,
          "rss_mb": 5420.9,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.961,
          "rss_mb": 5420.9,
          "cpu_pct": 22.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.216,
          "rss_mb": 5420.9,
          "cpu_pct": 33.1,
          "accel_mem_mb": 4141.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.471,
          "rss_mb": 5420.9,
          "cpu_pct": 22.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.726,
          "rss_mb": 5420.9,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.981,
          "rss_mb": 5420.9,
          "cpu_pct": 22.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.236,
          "rss_mb": 5420.9,
          "cpu_pct": 22.9,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.491,
          "rss_mb": 5420.9,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.746,
          "rss_mb": 5420.9,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.001,
          "rss_mb": 5420.9,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int8-1782665719",
        "label": "Qwen2.5-7B \u00b7 8-bit",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-8bit",
        "quant": "int8",
        "dtype": "int8",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 12,
        "max_output_tokens": 128,
        "load_time_s": 280.67,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T16:55:19+00:00",
        "study": "quantization",
        "params": {
          "precision": "int8",
          "bits": 8
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 12,
        "requests_failed": 0,
        "wall_clock_s": 44.269,
        "total_input_tokens": 525,
        "total_output_tokens": 1536,
        "system_throughput_tps": 34.7,
        "requests_per_s": 0.271,
        "decode_tps_per_req": {
          "p50": 36.345,
          "p90": 36.586,
          "p99": 36.684,
          "mean": 36.276
        },
        "ttft_ms": {
          "p50": 187.447,
          "p90": 189.207,
          "p99": 189.74,
          "mean": 187.475
        },
        "tpot_ms": {
          "p50": 27.514,
          "p90": 27.747,
          "p99": 28.522,
          "mean": 27.571
        },
        "e2e_ms": {
          "p50": 3682.33,
          "p90": 3709.593,
          "p99": 3808.692,
          "mean": 3688.952
        },
        "compute": {
          "peak_rss_mb": 1499.4,
          "mean_cpu_pct": 17.6,
          "peak_cpu_pct": 33.2,
          "peak_accel_mem_mb": 7820.1,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 174
        },
        "cost_per_1m_tokens_usd": null,
        "quality": {
          "perplexity": 11.1142
        }
      },
      "compute": [
        {
          "t": 0.003,
          "rss_mb": 1490.8,
          "cpu_pct": 29.7,
          "accel_mem_mb": 7720.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.259,
          "rss_mb": 1496.8,
          "cpu_pct": 31.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.512,
          "rss_mb": 1496.8,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.02,
          "rss_mb": 1496.8,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.273,
          "rss_mb": 1496.8,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.783,
          "rss_mb": 1496.8,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.038,
          "rss_mb": 1496.8,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.548,
          "rss_mb": 1496.8,
          "cpu_pct": 15.9,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.803,
          "rss_mb": 1496.8,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.314,
          "rss_mb": 1496.8,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.569,
          "rss_mb": 1496.8,
          "cpu_pct": 15.9,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.819,
          "rss_mb": 1496.8,
          "cpu_pct": 30.4,
          "accel_mem_mb": 7736.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.328,
          "rss_mb": 1496.8,
          "cpu_pct": 15.9,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.583,
          "rss_mb": 1496.8,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.09,
          "rss_mb": 1496.7,
          "cpu_pct": 15.8,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.341,
          "rss_mb": 1496.7,
          "cpu_pct": 15.7,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.85,
          "rss_mb": 1497.0,
          "cpu_pct": 20.5,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.103,
          "rss_mb": 1497.0,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.613,
          "rss_mb": 1497.0,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.868,
          "rss_mb": 1497.0,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.386,
          "rss_mb": 1493.5,
          "cpu_pct": 23.7,
          "accel_mem_mb": 7720.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.641,
          "rss_mb": 1497.0,
          "cpu_pct": 22.6,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.896,
          "rss_mb": 1497.0,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.406,
          "rss_mb": 1497.0,
          "cpu_pct": 15.9,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.661,
          "rss_mb": 1497.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.172,
          "rss_mb": 1497.0,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.427,
          "rss_mb": 1497.0,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.933,
          "rss_mb": 1497.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.188,
          "rss_mb": 1497.0,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.696,
          "rss_mb": 1497.0,
          "cpu_pct": 16.5,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.951,
          "rss_mb": 1497.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.206,
          "rss_mb": 1497.0,
          "cpu_pct": 30.3,
          "accel_mem_mb": 7736.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.717,
          "rss_mb": 1497.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.969,
          "rss_mb": 1497.0,
          "cpu_pct": 16.8,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.48,
          "rss_mb": 1497.0,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.73,
          "rss_mb": 1497.0,
          "cpu_pct": 16.8,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.24,
          "rss_mb": 1497.0,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.496,
          "rss_mb": 1497.0,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.006,
          "rss_mb": 1497.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.261,
          "rss_mb": 1497.0,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.771,
          "rss_mb": 1497.0,
          "cpu_pct": 33.2,
          "accel_mem_mb": 7817.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.026,
          "rss_mb": 1497.0,
          "cpu_pct": 14.8,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.281,
          "rss_mb": 1497.0,
          "cpu_pct": 15.5,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.792,
          "rss_mb": 1497.0,
          "cpu_pct": 19.6,
          "accel_mem_mb": 7736.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.047,
          "rss_mb": 1497.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.557,
          "rss_mb": 1497.0,
          "cpu_pct": 15.7,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.812,
          "rss_mb": 1497.0,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.322,
          "rss_mb": 1497.2,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.577,
          "rss_mb": 1497.2,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.087,
          "rss_mb": 1497.2,
          "cpu_pct": 15.6,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.342,
          "rss_mb": 1497.2,
          "cpu_pct": 15.7,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.597,
          "rss_mb": 1497.2,
          "cpu_pct": 31.0,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.108,
          "rss_mb": 1497.4,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.363,
          "rss_mb": 1497.4,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.872,
          "rss_mb": 1498.2,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.126,
          "rss_mb": 1498.2,
          "cpu_pct": 16.5,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.636,
          "rss_mb": 1498.2,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.891,
          "rss_mb": 1498.2,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.397,
          "rss_mb": 1498.2,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.652,
          "rss_mb": 1498.2,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.163,
          "rss_mb": 1498.2,
          "cpu_pct": 31.7,
          "accel_mem_mb": 7799.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.418,
          "rss_mb": 1498.2,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.673,
          "rss_mb": 1498.2,
          "cpu_pct": 17.0,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.179,
          "rss_mb": 1498.2,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.434,
          "rss_mb": 1498.2,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.939,
          "rss_mb": 1498.2,
          "cpu_pct": 17.9,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.19,
          "rss_mb": 1498.2,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.7,
          "rss_mb": 1498.3,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.956,
          "rss_mb": 1498.3,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.466,
          "rss_mb": 1498.3,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.728,
          "rss_mb": 1498.3,
          "cpu_pct": 15.6,
          "accel_mem_mb": 7734.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.983,
          "rss_mb": 1498.3,
          "cpu_pct": 32.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.49,
          "rss_mb": 1498.3,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.745,
          "rss_mb": 1498.3,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.255,
          "rss_mb": 1498.3,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.51,
          "rss_mb": 1498.3,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.02,
          "rss_mb": 1498.3,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.275,
          "rss_mb": 1498.3,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.782,
          "rss_mb": 1498.3,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.037,
          "rss_mb": 1498.3,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.547,
          "rss_mb": 1498.8,
          "cpu_pct": 30.4,
          "accel_mem_mb": 7783.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.802,
          "rss_mb": 1498.9,
          "cpu_pct": 17.1,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 30.057,
          "rss_mb": 1498.9,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 30.567,
          "rss_mb": 1499.0,
          "cpu_pct": 16.5,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 30.822,
          "rss_mb": 1499.0,
          "cpu_pct": 16.7,
          "accel_mem_mb": 7736.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 31.333,
          "rss_mb": 1499.0,
          "cpu_pct": 16.8,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 31.588,
          "rss_mb": 1499.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 32.098,
          "rss_mb": 1499.0,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 32.353,
          "rss_mb": 1499.0,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 32.858,
          "rss_mb": 1499.0,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 33.13,
          "rss_mb": 1499.0,
          "cpu_pct": 30.4,
          "accel_mem_mb": 7720.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 33.385,
          "rss_mb": 1499.0,
          "cpu_pct": 16.8,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 33.895,
          "rss_mb": 1499.0,
          "cpu_pct": 16.5,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 34.15,
          "rss_mb": 1499.0,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 34.661,
          "rss_mb": 1499.0,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 34.916,
          "rss_mb": 1499.0,
          "cpu_pct": 16.6,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 35.426,
          "rss_mb": 1499.2,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 35.681,
          "rss_mb": 1499.2,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 36.191,
          "rss_mb": 1499.2,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 36.446,
          "rss_mb": 1499.2,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 36.956,
          "rss_mb": 1499.2,
          "cpu_pct": 30.8,
          "accel_mem_mb": 7736.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 37.211,
          "rss_mb": 1499.2,
          "cpu_pct": 16.7,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 37.466,
          "rss_mb": 1499.2,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 37.977,
          "rss_mb": 1499.2,
          "cpu_pct": 15.9,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 38.232,
          "rss_mb": 1499.2,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 38.742,
          "rss_mb": 1499.2,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 38.997,
          "rss_mb": 1499.2,
          "cpu_pct": 16.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 39.507,
          "rss_mb": 1499.2,
          "cpu_pct": 15.8,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 39.762,
          "rss_mb": 1499.2,
          "cpu_pct": 16.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 40.272,
          "rss_mb": 1499.2,
          "cpu_pct": 16.0,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 40.527,
          "rss_mb": 1499.2,
          "cpu_pct": 32.4,
          "accel_mem_mb": 7820.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 40.782,
          "rss_mb": 1499.3,
          "cpu_pct": 14.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 41.283,
          "rss_mb": 1499.4,
          "cpu_pct": 19.4,
          "accel_mem_mb": 7736.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 41.536,
          "rss_mb": 1499.4,
          "cpu_pct": 21.2,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 42.046,
          "rss_mb": 1499.4,
          "cpu_pct": 16.4,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 42.301,
          "rss_mb": 1499.4,
          "cpu_pct": 16.1,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 42.813,
          "rss_mb": 1499.4,
          "cpu_pct": 18.3,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 43.068,
          "rss_mb": 1499.4,
          "cpu_pct": 17.4,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 43.578,
          "rss_mb": 1499.4,
          "cpu_pct": 17.9,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 43.833,
          "rss_mb": 1499.4,
          "cpu_pct": 18.0,
          "accel_mem_mb": 7736.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-bf16-1782665390",
        "label": "Qwen2.5-7B \u00b7 bf16",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-bf16",
        "quant": "bf16",
        "dtype": "bf16",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 12,
        "max_output_tokens": 128,
        "load_time_s": 494.23,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T16:49:50+00:00",
        "study": "quantization",
        "params": {
          "precision": "bf16",
          "bits": 16
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 12,
        "requests_failed": 0,
        "wall_clock_s": 84.265,
        "total_input_tokens": 525,
        "total_output_tokens": 1536,
        "system_throughput_tps": 18.23,
        "requests_per_s": 0.142,
        "decode_tps_per_req": {
          "p50": 18.785,
          "p90": 18.858,
          "p99": 18.887,
          "mean": 18.751
        },
        "ttft_ms": {
          "p50": 246.476,
          "p90": 265.213,
          "p99": 267.009,
          "mean": 248.751
        },
        "tpot_ms": {
          "p50": 53.234,
          "p90": 53.864,
          "p99": 53.961,
          "mean": 53.332
        },
        "e2e_ms": {
          "p50": 7008.697,
          "p90": 7083.994,
          "p99": 7117.409,
          "mean": 7021.974
        },
        "compute": {
          "peak_rss_mb": 660.0,
          "mean_cpu_pct": 19.0,
          "peak_cpu_pct": 42.5,
          "peak_accel_mem_mb": 14569.0,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 332
        },
        "cost_per_1m_tokens_usd": null,
        "quality": {
          "perplexity": 11.1262
        }
      },
      "compute": [
        {
          "t": 0.013,
          "rss_mb": 652.0,
          "cpu_pct": 36.0,
          "accel_mem_mb": 14525.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.517,
          "rss_mb": 659.7,
          "cpu_pct": 16.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.279,
          "rss_mb": 659.7,
          "cpu_pct": 17.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.044,
          "rss_mb": 659.7,
          "cpu_pct": 18.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.805,
          "rss_mb": 659.7,
          "cpu_pct": 20.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.313,
          "rss_mb": 659.7,
          "cpu_pct": 17.1,
          "accel_mem_mb": 14540.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.077,
          "rss_mb": 659.7,
          "cpu_pct": 17.0,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.842,
          "rss_mb": 659.8,
          "cpu_pct": 17.9,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.607,
          "rss_mb": 659.8,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.108,
          "rss_mb": 659.8,
          "cpu_pct": 18.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.872,
          "rss_mb": 659.8,
          "cpu_pct": 16.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.633,
          "rss_mb": 660.0,
          "cpu_pct": 18.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.392,
          "rss_mb": 660.0,
          "cpu_pct": 20.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.901,
          "rss_mb": 660.0,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.661,
          "rss_mb": 660.0,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.422,
          "rss_mb": 660.0,
          "cpu_pct": 17.7,
          "accel_mem_mb": 14540.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.179,
          "rss_mb": 658.9,
          "cpu_pct": 23.6,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.936,
          "rss_mb": 642.1,
          "cpu_pct": 17.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.445,
          "rss_mb": 642.1,
          "cpu_pct": 17.5,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.206,
          "rss_mb": 642.1,
          "cpu_pct": 16.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.964,
          "rss_mb": 642.1,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.726,
          "rss_mb": 642.1,
          "cpu_pct": 17.5,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.236,
          "rss_mb": 642.1,
          "cpu_pct": 16.9,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.001,
          "rss_mb": 642.1,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.763,
          "rss_mb": 642.1,
          "cpu_pct": 16.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.527,
          "rss_mb": 642.2,
          "cpu_pct": 20.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.033,
          "rss_mb": 642.2,
          "cpu_pct": 18.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.793,
          "rss_mb": 642.2,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.557,
          "rss_mb": 642.2,
          "cpu_pct": 18.0,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.322,
          "rss_mb": 642.6,
          "cpu_pct": 18.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.085,
          "rss_mb": 642.7,
          "cpu_pct": 34.0,
          "accel_mem_mb": 14566.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.592,
          "rss_mb": 642.7,
          "cpu_pct": 16.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.354,
          "rss_mb": 642.7,
          "cpu_pct": 16.7,
          "accel_mem_mb": 14541.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.114,
          "rss_mb": 642.7,
          "cpu_pct": 17.5,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.874,
          "rss_mb": 635.7,
          "cpu_pct": 27.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.383,
          "rss_mb": 631.8,
          "cpu_pct": 20.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.145,
          "rss_mb": 631.8,
          "cpu_pct": 17.0,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.906,
          "rss_mb": 631.9,
          "cpu_pct": 18.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.667,
          "rss_mb": 632.0,
          "cpu_pct": 18.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.177,
          "rss_mb": 632.0,
          "cpu_pct": 17.9,
          "accel_mem_mb": 14540.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.937,
          "rss_mb": 632.0,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.7,
          "rss_mb": 634.8,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.463,
          "rss_mb": 634.8,
          "cpu_pct": 17.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.968,
          "rss_mb": 634.8,
          "cpu_pct": 17.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 30.733,
          "rss_mb": 634.8,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 31.495,
          "rss_mb": 634.8,
          "cpu_pct": 18.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 32.26,
          "rss_mb": 634.8,
          "cpu_pct": 17.7,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 33.018,
          "rss_mb": 634.9,
          "cpu_pct": 18.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 33.525,
          "rss_mb": 634.9,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 34.289,
          "rss_mb": 635.3,
          "cpu_pct": 19.0,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 35.048,
          "rss_mb": 635.4,
          "cpu_pct": 19.0,
          "accel_mem_mb": 14525.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 35.808,
          "rss_mb": 635.5,
          "cpu_pct": 17.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 36.312,
          "rss_mb": 635.6,
          "cpu_pct": 18.1,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 37.066,
          "rss_mb": 635.7,
          "cpu_pct": 18.3,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 37.825,
          "rss_mb": 635.7,
          "cpu_pct": 17.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 38.588,
          "rss_mb": 635.7,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 39.092,
          "rss_mb": 635.7,
          "cpu_pct": 17.6,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 39.854,
          "rss_mb": 635.7,
          "cpu_pct": 18.2,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 40.617,
          "rss_mb": 635.7,
          "cpu_pct": 19.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 41.376,
          "rss_mb": 635.7,
          "cpu_pct": 16.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 42.158,
          "rss_mb": 636.3,
          "cpu_pct": 31.1,
          "accel_mem_mb": 14525.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 42.664,
          "rss_mb": 636.2,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 43.425,
          "rss_mb": 636.2,
          "cpu_pct": 17.5,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 44.183,
          "rss_mb": 636.2,
          "cpu_pct": 17.9,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 44.945,
          "rss_mb": 595.5,
          "cpu_pct": 18.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 45.45,
          "rss_mb": 595.5,
          "cpu_pct": 17.6,
          "accel_mem_mb": 14540.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 46.209,
          "rss_mb": 595.5,
          "cpu_pct": 18.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 46.965,
          "rss_mb": 595.5,
          "cpu_pct": 16.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 47.73,
          "rss_mb": 595.5,
          "cpu_pct": 17.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 48.241,
          "rss_mb": 595.5,
          "cpu_pct": 17.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 49.0,
          "rss_mb": 595.5,
          "cpu_pct": 16.5,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 49.763,
          "rss_mb": 595.6,
          "cpu_pct": 17.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 50.523,
          "rss_mb": 595.6,
          "cpu_pct": 19.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 51.029,
          "rss_mb": 595.5,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 51.794,
          "rss_mb": 595.5,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 52.557,
          "rss_mb": 595.5,
          "cpu_pct": 17.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 53.322,
          "rss_mb": 595.0,
          "cpu_pct": 20.1,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 54.084,
          "rss_mb": 595.0,
          "cpu_pct": 21.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 54.592,
          "rss_mb": 595.0,
          "cpu_pct": 17.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 55.356,
          "rss_mb": 595.0,
          "cpu_pct": 17.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 56.121,
          "rss_mb": 595.0,
          "cpu_pct": 16.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 56.88,
          "rss_mb": 595.0,
          "cpu_pct": 18.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 57.388,
          "rss_mb": 595.0,
          "cpu_pct": 22.0,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 58.152,
          "rss_mb": 595.0,
          "cpu_pct": 17.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 58.913,
          "rss_mb": 595.0,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 59.677,
          "rss_mb": 595.0,
          "cpu_pct": 17.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 60.187,
          "rss_mb": 595.0,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 60.947,
          "rss_mb": 595.0,
          "cpu_pct": 18.8,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 61.705,
          "rss_mb": 595.0,
          "cpu_pct": 17.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 62.462,
          "rss_mb": 595.0,
          "cpu_pct": 18.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 63.225,
          "rss_mb": 598.6,
          "cpu_pct": 42.5,
          "accel_mem_mb": 14563.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 63.733,
          "rss_mb": 598.6,
          "cpu_pct": 20.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 64.497,
          "rss_mb": 598.6,
          "cpu_pct": 17.9,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 65.258,
          "rss_mb": 598.6,
          "cpu_pct": 17.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 66.024,
          "rss_mb": 598.6,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 66.527,
          "rss_mb": 598.6,
          "cpu_pct": 19.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 67.292,
          "rss_mb": 598.6,
          "cpu_pct": 17.3,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 68.055,
          "rss_mb": 598.6,
          "cpu_pct": 17.9,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 68.819,
          "rss_mb": 598.6,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 69.325,
          "rss_mb": 593.1,
          "cpu_pct": 22.7,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 70.089,
          "rss_mb": 593.0,
          "cpu_pct": 18.7,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 70.85,
          "rss_mb": 595.0,
          "cpu_pct": 16.6,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 71.608,
          "rss_mb": 595.0,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 72.117,
          "rss_mb": 595.0,
          "cpu_pct": 18.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 72.879,
          "rss_mb": 595.0,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 73.642,
          "rss_mb": 595.2,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 74.4,
          "rss_mb": 595.0,
          "cpu_pct": 22.9,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 75.159,
          "rss_mb": 595.0,
          "cpu_pct": 19.6,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 75.667,
          "rss_mb": 595.0,
          "cpu_pct": 19.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 76.429,
          "rss_mb": 595.0,
          "cpu_pct": 20.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 77.216,
          "rss_mb": 595.1,
          "cpu_pct": 38.4,
          "accel_mem_mb": 14525.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 77.975,
          "rss_mb": 595.1,
          "cpu_pct": 19.7,
          "accel_mem_mb": 14540.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 78.485,
          "rss_mb": 595.1,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 79.247,
          "rss_mb": 595.1,
          "cpu_pct": 19.3,
          "accel_mem_mb": 14541.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 80.008,
          "rss_mb": 595.1,
          "cpu_pct": 18.5,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 80.77,
          "rss_mb": 595.1,
          "cpu_pct": 18.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 81.279,
          "rss_mb": 595.1,
          "cpu_pct": 17.4,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 82.035,
          "rss_mb": 594.6,
          "cpu_pct": 17.8,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 82.794,
          "rss_mb": 593.5,
          "cpu_pct": 17.2,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 83.558,
          "rss_mb": 593.5,
          "cpu_pct": 21.1,
          "accel_mem_mb": 14540.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int4-1782665995",
        "label": "7B 4-bit + 0.5B draft \u00b7 4 tokens",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 12,
        "max_output_tokens": 160,
        "load_time_s": 0.73,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T16:59:55+00:00",
        "study": "speculative",
        "params": {
          "draft": "Qwen2.5-0.5B-4bit",
          "num_draft_tokens": 4
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 12,
        "requests_failed": 0,
        "wall_clock_s": 30.208,
        "total_input_tokens": 525,
        "total_output_tokens": 1860,
        "system_throughput_tps": 61.57,
        "requests_per_s": 0.397,
        "decode_tps_per_req": {
          "p50": 63.075,
          "p90": 88.072,
          "p99": 90.151,
          "mean": 68.043
        },
        "ttft_ms": {
          "p50": 207.457,
          "p90": 212.511,
          "p99": 219.805,
          "mean": 206.81
        },
        "tpot_ms": {
          "p50": 15.859,
          "p90": 17.345,
          "p99": 17.453,
          "mean": 15.073
        },
        "e2e_ms": {
          "p50": 2633.938,
          "p90": 2779.782,
          "p99": 2856.931,
          "mean": 2517.303
        },
        "compute": {
          "peak_rss_mb": 4887.3,
          "mean_cpu_pct": 30.7,
          "peak_cpu_pct": 99.2,
          "peak_accel_mem_mb": 4500.8,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 119
        },
        "cost_per_1m_tokens_usd": null,
        "draft_acceptance": 0.6786
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4884.4,
          "cpu_pct": 99.2,
          "accel_mem_mb": 4357.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4885.3,
          "cpu_pct": 41.3,
          "accel_mem_mb": 4389.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.51,
          "rss_mb": 4885.6,
          "cpu_pct": 26.0,
          "accel_mem_mb": 4384.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.766,
          "rss_mb": 4885.6,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4389.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.018,
          "rss_mb": 4885.6,
          "cpu_pct": 25.6,
          "accel_mem_mb": 4384.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.269,
          "rss_mb": 4885.7,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4387.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.525,
          "rss_mb": 4885.7,
          "cpu_pct": 26.3,
          "accel_mem_mb": 4385.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.78,
          "rss_mb": 4885.7,
          "cpu_pct": 30.2,
          "accel_mem_mb": 4390.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.035,
          "rss_mb": 4885.7,
          "cpu_pct": 25.8,
          "accel_mem_mb": 4384.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.288,
          "rss_mb": 4885.7,
          "cpu_pct": 29.1,
          "accel_mem_mb": 4386.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.543,
          "rss_mb": 4885.7,
          "cpu_pct": 25.7,
          "accel_mem_mb": 4387.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.809,
          "rss_mb": 4886.1,
          "cpu_pct": 39.5,
          "accel_mem_mb": 4357.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.064,
          "rss_mb": 4886.5,
          "cpu_pct": 26.8,
          "accel_mem_mb": 4379.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.319,
          "rss_mb": 4886.6,
          "cpu_pct": 28.0,
          "accel_mem_mb": 4389.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.575,
          "rss_mb": 4886.7,
          "cpu_pct": 25.1,
          "accel_mem_mb": 4375.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.83,
          "rss_mb": 4886.7,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4390.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.085,
          "rss_mb": 4886.8,
          "cpu_pct": 10.4,
          "accel_mem_mb": 4390.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.34,
          "rss_mb": 4886.8,
          "cpu_pct": 26.1,
          "accel_mem_mb": 4391.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.595,
          "rss_mb": 4886.8,
          "cpu_pct": 25.5,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.85,
          "rss_mb": 4886.8,
          "cpu_pct": 29.3,
          "accel_mem_mb": 4390.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.105,
          "rss_mb": 4886.9,
          "cpu_pct": 38.9,
          "accel_mem_mb": 4390.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.36,
          "rss_mb": 4886.9,
          "cpu_pct": 26.8,
          "accel_mem_mb": 4376.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.615,
          "rss_mb": 4886.9,
          "cpu_pct": 27.5,
          "accel_mem_mb": 4387.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.87,
          "rss_mb": 4886.9,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4389.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.126,
          "rss_mb": 4886.9,
          "cpu_pct": 25.4,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.381,
          "rss_mb": 4886.9,
          "cpu_pct": 29.2,
          "accel_mem_mb": 4392.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.633,
          "rss_mb": 4886.9,
          "cpu_pct": 26.3,
          "accel_mem_mb": 4376.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.888,
          "rss_mb": 4886.9,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4388.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.143,
          "rss_mb": 4886.9,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4390.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.398,
          "rss_mb": 4886.9,
          "cpu_pct": 25.3,
          "accel_mem_mb": 4383.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.652,
          "rss_mb": 4886.8,
          "cpu_pct": 39.4,
          "accel_mem_mb": 4380.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.907,
          "rss_mb": 4886.8,
          "cpu_pct": 29.8,
          "accel_mem_mb": 4389.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.162,
          "rss_mb": 4886.8,
          "cpu_pct": 25.0,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.417,
          "rss_mb": 4886.8,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4390.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.673,
          "rss_mb": 4886.8,
          "cpu_pct": 28.8,
          "accel_mem_mb": 4377.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.928,
          "rss_mb": 4886.8,
          "cpu_pct": 26.8,
          "accel_mem_mb": 4387.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.183,
          "rss_mb": 4886.8,
          "cpu_pct": 30.2,
          "accel_mem_mb": 4390.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.438,
          "rss_mb": 4886.8,
          "cpu_pct": 25.8,
          "accel_mem_mb": 4382.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.693,
          "rss_mb": 4886.8,
          "cpu_pct": 30.2,
          "accel_mem_mb": 4390.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.948,
          "rss_mb": 4886.8,
          "cpu_pct": 25.3,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.203,
          "rss_mb": 4886.9,
          "cpu_pct": 41.6,
          "accel_mem_mb": 4389.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.458,
          "rss_mb": 4886.9,
          "cpu_pct": 26.5,
          "accel_mem_mb": 4379.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.714,
          "rss_mb": 4887.0,
          "cpu_pct": 31.8,
          "accel_mem_mb": 4390.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.969,
          "rss_mb": 4887.0,
          "cpu_pct": 29.9,
          "accel_mem_mb": 4376.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.223,
          "rss_mb": 4887.0,
          "cpu_pct": 27.8,
          "accel_mem_mb": 4389.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.475,
          "rss_mb": 4887.0,
          "cpu_pct": 26.9,
          "accel_mem_mb": 4378.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.73,
          "rss_mb": 4887.0,
          "cpu_pct": 28.3,
          "accel_mem_mb": 4390.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.985,
          "rss_mb": 4887.0,
          "cpu_pct": 27.7,
          "accel_mem_mb": 4379.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.24,
          "rss_mb": 4887.0,
          "cpu_pct": 26.7,
          "accel_mem_mb": 4391.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.495,
          "rss_mb": 4887.0,
          "cpu_pct": 28.3,
          "accel_mem_mb": 4375.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.75,
          "rss_mb": 4887.0,
          "cpu_pct": 36.0,
          "accel_mem_mb": 4378.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.002,
          "rss_mb": 4887.0,
          "cpu_pct": 44.7,
          "accel_mem_mb": 4389.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.257,
          "rss_mb": 4887.0,
          "cpu_pct": 25.8,
          "accel_mem_mb": 4380.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.512,
          "rss_mb": 4887.0,
          "cpu_pct": 29.0,
          "accel_mem_mb": 4389.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.768,
          "rss_mb": 4887.0,
          "cpu_pct": 25.7,
          "accel_mem_mb": 4384.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.023,
          "rss_mb": 4887.0,
          "cpu_pct": 28.6,
          "accel_mem_mb": 4383.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.278,
          "rss_mb": 4887.1,
          "cpu_pct": 25.7,
          "accel_mem_mb": 4392.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.533,
          "rss_mb": 4887.1,
          "cpu_pct": 25.1,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.793,
          "rss_mb": 4887.2,
          "cpu_pct": 47.2,
          "accel_mem_mb": 4357.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.048,
          "rss_mb": 4887.2,
          "cpu_pct": 27.3,
          "accel_mem_mb": 4378.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.303,
          "rss_mb": 4887.2,
          "cpu_pct": 27.8,
          "accel_mem_mb": 4387.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.558,
          "rss_mb": 4887.2,
          "cpu_pct": 28.0,
          "accel_mem_mb": 4378.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.813,
          "rss_mb": 4887.2,
          "cpu_pct": 31.0,
          "accel_mem_mb": 4389.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.066,
          "rss_mb": 4887.2,
          "cpu_pct": 37.1,
          "accel_mem_mb": 4390.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.318,
          "rss_mb": 4887.2,
          "cpu_pct": 31.4,
          "accel_mem_mb": 4384.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.57,
          "rss_mb": 4887.2,
          "cpu_pct": 34.3,
          "accel_mem_mb": 4376.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.825,
          "rss_mb": 4887.2,
          "cpu_pct": 32.1,
          "accel_mem_mb": 4392.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.078,
          "rss_mb": 4887.2,
          "cpu_pct": 30.5,
          "accel_mem_mb": 4382.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.333,
          "rss_mb": 4887.2,
          "cpu_pct": 35.7,
          "accel_mem_mb": 4388.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.588,
          "rss_mb": 4887.2,
          "cpu_pct": 39.8,
          "accel_mem_mb": 4376.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.844,
          "rss_mb": 4887.2,
          "cpu_pct": 30.7,
          "accel_mem_mb": 4390.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.099,
          "rss_mb": 4887.3,
          "cpu_pct": 27.7,
          "accel_mem_mb": 4384.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.352,
          "rss_mb": 4887.3,
          "cpu_pct": 30.0,
          "accel_mem_mb": 4385.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.607,
          "rss_mb": 4887.3,
          "cpu_pct": 27.5,
          "accel_mem_mb": 4388.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.862,
          "rss_mb": 4887.3,
          "cpu_pct": 31.8,
          "accel_mem_mb": 4379.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.118,
          "rss_mb": 4887.3,
          "cpu_pct": 29.7,
          "accel_mem_mb": 4391.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.373,
          "rss_mb": 4887.3,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4383.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.627,
          "rss_mb": 4887.3,
          "cpu_pct": 31.1,
          "accel_mem_mb": 4390.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.882,
          "rss_mb": 4887.3,
          "cpu_pct": 26.6,
          "accel_mem_mb": 4388.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.135,
          "rss_mb": 4887.2,
          "cpu_pct": 40.7,
          "accel_mem_mb": 4470.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.389,
          "rss_mb": 4887.3,
          "cpu_pct": 29.6,
          "accel_mem_mb": 4390.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.644,
          "rss_mb": 4887.3,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.899,
          "rss_mb": 4887.3,
          "cpu_pct": 37.0,
          "accel_mem_mb": 4389.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.154,
          "rss_mb": 4887.3,
          "cpu_pct": 30.8,
          "accel_mem_mb": 4389.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.409,
          "rss_mb": 4887.3,
          "cpu_pct": 31.3,
          "accel_mem_mb": 4380.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.664,
          "rss_mb": 4887.3,
          "cpu_pct": 34.4,
          "accel_mem_mb": 4375.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.919,
          "rss_mb": 4887.3,
          "cpu_pct": 34.9,
          "accel_mem_mb": 4390.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.174,
          "rss_mb": 4887.3,
          "cpu_pct": 27.6,
          "accel_mem_mb": 4383.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.427,
          "rss_mb": 4887.3,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4375.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.681,
          "rss_mb": 4887.3,
          "cpu_pct": 31.7,
          "accel_mem_mb": 4389.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.942,
          "rss_mb": 4887.3,
          "cpu_pct": 42.8,
          "accel_mem_mb": 4357.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.197,
          "rss_mb": 4887.3,
          "cpu_pct": 26.0,
          "accel_mem_mb": 4375.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.452,
          "rss_mb": 4887.3,
          "cpu_pct": 31.5,
          "accel_mem_mb": 4389.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.707,
          "rss_mb": 4887.3,
          "cpu_pct": 27.7,
          "accel_mem_mb": 4387.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.962,
          "rss_mb": 4887.3,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4379.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.218,
          "rss_mb": 4887.3,
          "cpu_pct": 30.0,
          "accel_mem_mb": 4390.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.473,
          "rss_mb": 4887.3,
          "cpu_pct": 27.2,
          "accel_mem_mb": 4390.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.728,
          "rss_mb": 4887.3,
          "cpu_pct": 27.5,
          "accel_mem_mb": 4388.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.983,
          "rss_mb": 4887.2,
          "cpu_pct": 45.8,
          "accel_mem_mb": 4500.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.236,
          "rss_mb": 4887.3,
          "cpu_pct": 24.3,
          "accel_mem_mb": 4384.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.487,
          "rss_mb": 4887.3,
          "cpu_pct": 28.7,
          "accel_mem_mb": 4378.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.737,
          "rss_mb": 4887.3,
          "cpu_pct": 30.1,
          "accel_mem_mb": 4389.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.989,
          "rss_mb": 4887.3,
          "cpu_pct": 28.0,
          "accel_mem_mb": 4384.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.244,
          "rss_mb": 4887.3,
          "cpu_pct": 30.6,
          "accel_mem_mb": 4384.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.499,
          "rss_mb": 4887.3,
          "cpu_pct": 28.2,
          "accel_mem_mb": 4391.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.752,
          "rss_mb": 4887.3,
          "cpu_pct": 27.6,
          "accel_mem_mb": 4383.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.004,
          "rss_mb": 4887.3,
          "cpu_pct": 30.5,
          "accel_mem_mb": 4378.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.259,
          "rss_mb": 4887.3,
          "cpu_pct": 28.4,
          "accel_mem_mb": 4391.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.51,
          "rss_mb": 4887.3,
          "cpu_pct": 28.1,
          "accel_mem_mb": 4383.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.763,
          "rss_mb": 4887.3,
          "cpu_pct": 42.8,
          "accel_mem_mb": 4386.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.018,
          "rss_mb": 4887.3,
          "cpu_pct": 33.0,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.27,
          "rss_mb": 4887.3,
          "cpu_pct": 36.5,
          "accel_mem_mb": 4378.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.526,
          "rss_mb": 4887.3,
          "cpu_pct": 31.5,
          "accel_mem_mb": 4389.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.777,
          "rss_mb": 4887.3,
          "cpu_pct": 27.7,
          "accel_mem_mb": 4387.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.031,
          "rss_mb": 4887.3,
          "cpu_pct": 27.6,
          "accel_mem_mb": 4375.5,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.285,
          "rss_mb": 4887.3,
          "cpu_pct": 31.2,
          "accel_mem_mb": 4390.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.54,
          "rss_mb": 4887.3,
          "cpu_pct": 27.8,
          "accel_mem_mb": 4388.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.795,
          "rss_mb": 4887.3,
          "cpu_pct": 27.4,
          "accel_mem_mb": 4379.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 30.05,
          "rss_mb": 4887.3,
          "cpu_pct": 30.9,
          "accel_mem_mb": 4389.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    },
    {
      "manifest": {
        "run_id": "mlx-int4-1782665962",
        "label": "7B 4-bit \u00b7 no speculation (baseline)",
        "engine": "mlx",
        "model": "mlx-community/Qwen2.5-7B-Instruct-4bit",
        "quant": "int4",
        "dtype": "int4",
        "device": "mps (Metal/MLX)",
        "concurrency": 1,
        "num_requests": 12,
        "max_output_tokens": 160,
        "load_time_s": 0.44,
        "hardware": {
          "platform": "macOS-26.5.1-arm64-arm-64bit-Mach-O",
          "machine": "arm64",
          "cpu": "arm",
          "python": "3.13.13",
          "chip": "Apple M5 Pro",
          "memory_gb": 24.0
        },
        "versions": {
          "torch": "2.12.1",
          "transformers": "5.12.1",
          "mlx_lm": "0.31.3",
          "mlx": "0.31.2"
        },
        "git_commit": "n/a",
        "timestamp": "2026-06-28T16:59:22+00:00",
        "study": "speculative",
        "params": {
          "draft": "none"
        },
        "price_per_hour": null
      },
      "aggregates": {
        "requests_ok": 12,
        "requests_failed": 0,
        "wall_clock_s": 29.788,
        "total_input_tokens": 525,
        "total_output_tokens": 1854,
        "system_throughput_tps": 62.24,
        "requests_per_s": 0.403,
        "decode_tps_per_req": {
          "p50": 65.995,
          "p90": 66.734,
          "p99": 66.74,
          "mean": 66.122
        },
        "ttft_ms": {
          "p50": 160.73,
          "p90": 161.986,
          "p99": 165.401,
          "mean": 160.705
        },
        "tpot_ms": {
          "p50": 15.153,
          "p90": 15.236,
          "p99": 15.319,
          "mean": 15.124
        },
        "e2e_ms": {
          "p50": 2559.682,
          "p90": 2580.819,
          "p99": 2581.584,
          "mean": 2482.243
        },
        "compute": {
          "peak_rss_mb": 4566.3,
          "mean_cpu_pct": 24.2,
          "peak_cpu_pct": 99.0,
          "peak_accel_mem_mb": 4236.2,
          "mean_gpu_util_pct": null,
          "mean_gpu_power_w": null,
          "samples": 117
        },
        "cost_per_1m_tokens_usd": null
      },
      "compute": [
        {
          "t": 0.0,
          "rss_mb": 4558.0,
          "cpu_pct": 99.0,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.255,
          "rss_mb": 4565.5,
          "cpu_pct": 33.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.511,
          "rss_mb": 4565.5,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 0.766,
          "rss_mb": 4565.5,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.021,
          "rss_mb": 4565.5,
          "cpu_pct": 22.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.276,
          "rss_mb": 4565.5,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.531,
          "rss_mb": 4565.5,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 1.786,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.041,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.296,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.551,
          "rss_mb": 4565.5,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 2.806,
          "rss_mb": 4565.5,
          "cpu_pct": 34.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.062,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.317,
          "rss_mb": 4565.5,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.572,
          "rss_mb": 4565.5,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 3.822,
          "rss_mb": 4565.5,
          "cpu_pct": 22.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.077,
          "rss_mb": 4565.5,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.332,
          "rss_mb": 4565.5,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.587,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 4.842,
          "rss_mb": 4565.5,
          "cpu_pct": 22.6,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.097,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.353,
          "rss_mb": 4565.5,
          "cpu_pct": 34.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.608,
          "rss_mb": 4565.5,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 5.863,
          "rss_mb": 4565.5,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.118,
          "rss_mb": 4565.5,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.373,
          "rss_mb": 4565.5,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.628,
          "rss_mb": 4565.5,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 6.883,
          "rss_mb": 4565.5,
          "cpu_pct": 22.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.138,
          "rss_mb": 4565.5,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.393,
          "rss_mb": 4565.5,
          "cpu_pct": 38.5,
          "accel_mem_mb": 4233.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.648,
          "rss_mb": 4565.6,
          "cpu_pct": 20.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 7.903,
          "rss_mb": 4565.6,
          "cpu_pct": 22.6,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.159,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.414,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.669,
          "rss_mb": 4565.6,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 8.924,
          "rss_mb": 4565.6,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.175,
          "rss_mb": 4565.6,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.431,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.686,
          "rss_mb": 4565.6,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 9.961,
          "rss_mb": 4565.6,
          "cpu_pct": 34.6,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.216,
          "rss_mb": 4565.6,
          "cpu_pct": 20.1,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.471,
          "rss_mb": 4565.6,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.726,
          "rss_mb": 4565.6,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 10.981,
          "rss_mb": 4565.6,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.236,
          "rss_mb": 4565.6,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.492,
          "rss_mb": 4565.6,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 11.747,
          "rss_mb": 4565.6,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.002,
          "rss_mb": 4565.6,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.257,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.532,
          "rss_mb": 4565.6,
          "cpu_pct": 34.4,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 12.787,
          "rss_mb": 4565.6,
          "cpu_pct": 19.8,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.042,
          "rss_mb": 4565.6,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.297,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.552,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 13.807,
          "rss_mb": 4565.6,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.062,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.317,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.572,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 14.827,
          "rss_mb": 4565.6,
          "cpu_pct": 22.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.087,
          "rss_mb": 4565.6,
          "cpu_pct": 36.6,
          "accel_mem_mb": 4088.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.342,
          "rss_mb": 4565.6,
          "cpu_pct": 19.1,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.597,
          "rss_mb": 4565.6,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 15.85,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.106,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.361,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.614,
          "rss_mb": 4565.6,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 16.869,
          "rss_mb": 4565.6,
          "cpu_pct": 22.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.124,
          "rss_mb": 4565.6,
          "cpu_pct": 22.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.379,
          "rss_mb": 4565.6,
          "cpu_pct": 33.0,
          "accel_mem_mb": 4141.4,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.634,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 17.889,
          "rss_mb": 4565.6,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.144,
          "rss_mb": 4565.6,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.399,
          "rss_mb": 4565.6,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.654,
          "rss_mb": 4565.6,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 18.909,
          "rss_mb": 4565.6,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.164,
          "rss_mb": 4565.6,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.42,
          "rss_mb": 4565.6,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.673,
          "rss_mb": 4565.6,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 19.928,
          "rss_mb": 4565.6,
          "cpu_pct": 35.3,
          "accel_mem_mb": 4199.7,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.184,
          "rss_mb": 4565.6,
          "cpu_pct": 20.2,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.439,
          "rss_mb": 4565.6,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.694,
          "rss_mb": 4565.6,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 20.949,
          "rss_mb": 4565.6,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.204,
          "rss_mb": 4565.6,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.459,
          "rss_mb": 4565.6,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.714,
          "rss_mb": 4565.6,
          "cpu_pct": 21.6,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 21.969,
          "rss_mb": 4565.6,
          "cpu_pct": 23.4,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.224,
          "rss_mb": 4565.6,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.479,
          "rss_mb": 4566.2,
          "cpu_pct": 37.3,
          "accel_mem_mb": 4236.2,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.735,
          "rss_mb": 4566.2,
          "cpu_pct": 18.8,
          "accel_mem_mb": 4105.8,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 22.99,
          "rss_mb": 4566.2,
          "cpu_pct": 22.0,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.245,
          "rss_mb": 4566.2,
          "cpu_pct": 21.9,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.5,
          "rss_mb": 4566.2,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 23.755,
          "rss_mb": 4566.2,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.01,
          "rss_mb": 4566.2,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.264,
          "rss_mb": 4566.2,
          "cpu_pct": 22.8,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.519,
          "rss_mb": 4566.2,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 24.774,
          "rss_mb": 4566.2,
          "cpu_pct": 22.2,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.03,
          "rss_mb": 4566.2,
          "cpu_pct": 36.4,
          "accel_mem_mb": 4231.6,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.285,
          "rss_mb": 4566.2,
          "cpu_pct": 23.5,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.54,
          "rss_mb": 4566.2,
          "cpu_pct": 26.8,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 25.795,
          "rss_mb": 4566.2,
          "cpu_pct": 23.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.05,
          "rss_mb": 4566.2,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.301,
          "rss_mb": 4566.2,
          "cpu_pct": 24.5,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.556,
          "rss_mb": 4566.2,
          "cpu_pct": 24.6,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 26.812,
          "rss_mb": 4566.2,
          "cpu_pct": 22.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.063,
          "rss_mb": 4566.2,
          "cpu_pct": 22.3,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.318,
          "rss_mb": 4566.2,
          "cpu_pct": 33.7,
          "accel_mem_mb": 4165.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.573,
          "rss_mb": 4566.3,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 27.828,
          "rss_mb": 4566.3,
          "cpu_pct": 22.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.083,
          "rss_mb": 4566.3,
          "cpu_pct": 24.4,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.338,
          "rss_mb": 4566.3,
          "cpu_pct": 25.8,
          "accel_mem_mb": 4106.3,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.593,
          "rss_mb": 4566.3,
          "cpu_pct": 24.0,
          "accel_mem_mb": 4106.0,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 28.848,
          "rss_mb": 4566.3,
          "cpu_pct": 23.1,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.104,
          "rss_mb": 4566.3,
          "cpu_pct": 23.8,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.359,
          "rss_mb": 4566.3,
          "cpu_pct": 21.8,
          "accel_mem_mb": 4105.9,
          "gpu_util_pct": null,
          "gpu_power_w": null
        },
        {
          "t": 29.613,
          "rss_mb": 4566.3,
          "cpu_pct": 21.7,
          "accel_mem_mb": 4106.1,
          "gpu_util_pct": null,
          "gpu_power_w": null
        }
      ]
    }
  ]
};
