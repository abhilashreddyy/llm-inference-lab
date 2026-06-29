/* Shared glossary. Each term has:
     short    -> one-line hover tooltip (plain text)
     overview -> plain-English explanation (non-technical, may include light HTML)
     deeper   -> full technical detail incl. methodology (HTML)
   Powers the click-to-open info popovers (Overview / Deeper tabs) and the Glossary page. */

const MODELS_EVALED =
  "Qwen2.5-7B, Llama-3.1-8B, Mistral-7B, Gemma-2-9B (general-purpose) and " +
  "Qwen2.5-Coder-7B, Qwen2.5-Coder-1.5B (coding-specialized) — all run as 4-bit via MLX on an Apple M5 Pro.";

const HW = "Apple M5 Pro, 24 GB unified memory, MLX (Metal) backend.";

window.GLOSSARY = {
  throughput: {
    term: "Throughput (tokens/sec)",
    short: "How many word-pieces the model produces per second.",
    overview: "How fast the model writes. A token is roughly ¾ of a word, so 60 tokens/sec is about 45 words per second. Higher means answers appear faster.",
    deeper:
      "<b>What it measures:</b> output tokens generated per wall-clock second — the headline speed metric.<br><br>" +
      "<b>How we measure it here:</b> we stream a fixed prompt and time generation, excluding a warm-up call. Per-request decode throughput = (output_tokens − 1) ÷ (end − first-token time). 'System throughput' (used in the optimization studies) = total output tokens ÷ total wall time across all requests.<br><br>" +
      "<b>Why it varies:</b> decode is bound by memory bandwidth, so smaller weights (quantization) and bigger batches raise it.<br><br>" +
      "<b>Hardware:</b> " + HW,
  },
  ttft: {
    term: "TTFT — time to first token",
    short: "How long until the first word appears.",
    overview: "The wait between hitting send and seeing the answer start. Low TTFT feels snappy.",
    deeper:
      "<b>What it measures:</b> Time To First Token — delay from submitting the prompt to the first streamed token.<br><br>" +
      "<b>How we measure it here:</b> timestamp at request start, timestamp at the first token yielded by the streaming generator; the difference is TTFT. Reported as median (p50) and tail (p90/p99).<br><br>" +
      "<b>What drives it:</b> the prefill phase — encoding your whole prompt in one forward pass. Grows with prompt length; compute-bound (unlike decode).",
  },
  tpot: {
    term: "TPOT — time per output token",
    short: "The delay between each word after the first.",
    overview: "How smoothly the answer streams out, word by word. Lower means the text flows instead of stuttering.",
    deeper:
      "<b>What it measures:</b> Time Per Output Token (inter-token latency) during the decode loop.<br><br>" +
      "<b>How we measure it here:</b> (end-to-end time − TTFT) ÷ (output_tokens − 1), per request, reported as p50/p90/p99.<br><br>" +
      "<b>Why it matters:</b> each decode step reads the whole model + KV cache from memory to emit one token, so TPOT is memory-bandwidth-bound — which is exactly why quantization and KV compression improve it.",
  },
  latency: {
    term: "Latency",
    short: "Total time to get the full answer.",
    overview: "Start-to-finish time for a complete response. We report typical (p50) and worst-case (p90/p99).",
    deeper:
      "<b>Definition:</b> end-to-end time = TTFT + (output_tokens − 1) × TPOT.<br><br>" +
      "<b>How we report it:</b> percentiles (p50/p90/p99) rather than averages, because tail latency is what users and SLAs actually feel. Measured per request with a monotonic timer.",
  },
  quantization: {
    term: "Quantization",
    short: "Storing the model's numbers with fewer bits to make it smaller & faster.",
    overview: "Shrinking the model by storing its internal numbers more coarsely — like saving a photo as a smaller JPEG. It gets faster and lighter, usually with barely noticeable quality loss.",
    deeper:
      "<b>What it is:</b> reducing the numeric precision of weights from 16-bit to 8- or 4-bit, cutting memory footprint and bandwidth-per-token.<br><br>" +
      "<b>How we studied it:</b> the same Qwen2.5-7B at bf16 / 8-bit / 4-bit, measuring throughput, GPU memory, and perplexity for each. Result: 4-bit ≈ 3.3× the throughput and ~70% less memory than bf16, for ~6% higher perplexity; 8-bit is near-lossless at ~½ the memory.<br><br>" +
      "<b>Schemes:</b> production stacks use AWQ/GPTQ (group-wise scales) to preserve accuracy; here MLX's built-in 4/8-bit quantization is used.",
  },
  bf16: {
    term: "bf16 (16-bit)",
    short: "Full precision — original quality, biggest & slowest.",
    overview: "The model in its original, uncompressed form. Best quality, but most memory and slowest. The baseline everything else is compared to.",
    deeper:
      "<b>What it is:</b> bfloat16 — 16-bit floating point, the native precision most open models ship in (~2 bytes/parameter, so a 7B model ≈ 14 GB).<br><br>" +
      "<b>Role here:</b> the reference point for the quantization study. Measured 18 tok/s and ~14.6 GB for Qwen2.5-7B on this Mac — the 'before' that 8-bit and 4-bit are compared against.",
  },
  int8: {
    term: "8-bit",
    short: "Half the size of 16-bit, almost no quality loss.",
    overview: "Light compression: about half the memory and roughly twice the speed of the original, with quality you usually can't tell apart.",
    deeper:
      "<b>What it is:</b> 8-bit quantization (~1 byte/param).<br><br>" +
      "<b>Measured here:</b> Qwen2.5-7B at 8-bit ran ~35 tok/s using ~7.8 GB, with perplexity essentially identical to bf16 (11.11 vs 11.13). The 'free lunch' point when you have memory to spare.",
  },
  int4: {
    term: "4-bit",
    short: "Quarter the size — much faster & smaller, slight quality cost.",
    overview: "Heavy compression: about a quarter of the memory and the fastest option, for a small, usually acceptable dip in quality. The sweet spot for big models on small hardware.",
    deeper:
      "<b>What it is:</b> 4-bit quantization (~0.5 byte/param + scales). A 7B model drops to ~4 GB — fits an 8 GB GPU.<br><br>" +
      "<b>Measured here:</b> Qwen2.5-7B at 4-bit ran ~61 tok/s using ~4.2 GB — 3.3× the throughput and 71% less memory than bf16 — for ~6% higher perplexity (11.75 vs 11.13). Best perf-per-GB; the default for all the model-comparison runs.",
  },
  perplexity: {
    term: "Perplexity",
    short: "How 'surprised' the model is by real text. Lower = better.",
    overview: "A quick health-check of language quality: how well the model predicts a fixed piece of text. Lower is better. A proxy — real tasks (coding/math) matter more.",
    deeper:
      "<b>Metric:</b> exp(mean per-token negative-log-likelihood) over a fixed passage. Lower = the model finds the text less surprising.<br><br>" +
      "<b>How we measure it:</b> one forward pass over a fixed ~150-word passage; we take the model's log-probabilities for each actual next token, average the negative log-likelihood, and exponentiate. Deterministic, no generation.<br><br>" +
      "<b>Caveats:</b> only comparable within the same tokenizer and passage; weakly correlated with task performance — which is why we also run HumanEval and GSM8K.",
  },
  gpu_memory: {
    term: "GPU memory (VRAM)",
    short: "Space the model needs on the GPU — the hard limit on what fits.",
    overview: "How much room the model takes on the graphics card. Usually the wall you hit first: an 8 GB GPU can't fit a 14 GB model unless you compress it.",
    deeper:
      "<b>What it is:</b> accelerator memory (VRAM on NVIDIA; unified memory on Apple) used by weights + KV cache + activations.<br><br>" +
      "<b>How we measure it here:</b> via MLX's peak-memory counter — reset before a run, read after. For batching we report peak memory per batch size; it rises because each sequence adds its own KV cache.<br><br>" +
      "<b>Why it's central:</b> it's the binding constraint on model size and batch size. Quantization shrinks the weights term; KV-cache quantization shrinks the cache term.",
  },
  kv_cache: {
    term: "KV cache",
    short: "The model's short-term memory of the text so far.",
    overview: "As the model writes, it remembers everything said so far so it doesn't redo work. That memory grows with conversation length and can use a lot of space.",
    deeper:
      "<b>What it is:</b> cached key/value tensors for every past token, per layer and attention head, so attention isn't recomputed each step.<br><br>" +
      "<b>Size:</b> ≈ 2 × layers × kv_heads × head_dim × sequence_length × bytes — linear in context length, so it dominates memory in long contexts.<br><br>" +
      "<b>Studied here:</b> at ~2k-token context on Qwen2.5-7B-4bit the cache is small next to the 4 GB of weights, so quantizing it barely moved memory — the honest finding that KV compression only pays off at much longer context.",
  },
  kv_quant: {
    term: "KV-cache quantization",
    short: "Compress the cache to save memory (not a speedup; long-context only).",
    overview: "Storing the model's running memory (the KV cache) more compactly. It's a MEMORY optimization, not a speed one — it actually adds a little overhead, so it's slightly slower. It only saves meaningful memory at long context (where the cache is big); at short context it does almost nothing. Don't confuse it with KV caching itself, which is always on and is a huge speedup.",
    deeper:
      "<b>What it is:</b> storing cached keys/values in 8- or 4-bit instead of full precision (MLX <code>kv_bits</code>).<br><br>" +
      "<b>How we studied it:</b> Qwen2.5-7B-4bit at long context with KV cache full / 8-bit / 4-bit, measuring peak memory and throughput.<br><br>" +
      "<b>Result:</b> negligible at the ~2k context tested (weights dominate); the benefit scales with context length, so it matters for long-document / many-user serving.",
  },
  speculative: {
    term: "Speculative decoding",
    short: "A tiny model guesses ahead; the big model checks the guesses in bulk.",
    overview: "A speed trick: a small fast model guesses the next few words, and the big model checks them all at once. When guesses are right you get several words for the price of one — same answer, less waiting. It doesn't always pay off.",
    deeper:
      "<b>What it is:</b> a small draft model proposes k tokens; the target verifies them in one batched pass and accepts the longest correct prefix. Output is identical to the target's greedy decode.<br><br>" +
      "<b>How we studied it:</b> Qwen2.5-7B-4bit (target) + Qwen2.5-0.5B-4bit (draft, k=4) vs the 7B alone, measuring TPOT and throughput.<br><br>" +
      "<b>Result:</b> roughly break-even here (~68% draft acceptance) — when target decode is already cheap at 4-bit, draft+verify overhead can cancel the savings. An honest 'doesn't always help' result.",
    learn: [
      { title: "Speculative decoding explained (video)", url: "https://www.youtube.com/watch?v=VkWlLSTdHs8" },
    ],
  },
  draft_model: {
    term: "Draft model",
    short: "The small, fast model that proposes tokens in speculative decoding.",
    overview: "The little helper model that quickly guesses what comes next, for the big model to approve or reject.",
    deeper:
      "<b>Role:</b> in speculative decoding, a smaller model (ideally same tokenizer/family) that cheaply proposes candidate tokens.<br><br>" +
      "<b>Here:</b> Qwen2.5-0.5B-4bit drafting for the Qwen2.5-7B-4bit target. The better it mimics the target, the higher the acceptance rate and the bigger the speedup.",
  },
  acceptance: {
    term: "Draft acceptance rate",
    short: "How often the big model agrees with the small model's guesses.",
    overview: "The share of the helper model's guesses the big model keeps. Higher means the trick is working well and you're saving more time.",
    deeper:
      "<b>Metric:</b> fraction of draft-proposed tokens accepted by the target during speculative decoding.<br><br>" +
      "<b>How we measure it:</b> we count, per token, whether it came from the accepted draft (MLX flags this) vs the target's own correction, and divide. Measured ~68% for the 0.5B→7B pair on general prompts. It directly bounds the achievable speedup.",
  },
  batching: {
    term: "Static batching",
    short: "Answering several prompts at once to use the GPU more fully.",
    overview: "Handling many requests together instead of one at a time, so the GPU isn't half-idle. Total output goes up a lot, though each individual answer gets slightly slower.",
    deeper:
      "<b>What it is:</b> decoding N sequences in lockstep through the model, amortizing each weight read across all sequences.<br><br>" +
      "<b>How we studied it:</b> Qwen2.5-7B-4bit at batch sizes 1→32, measuring aggregate throughput, per-stream throughput, and peak GPU memory.<br><br>" +
      "<b>Result:</b> ~63 → ~492 tok/s aggregate (≈7.8×) as batch grows, while per-stream speed falls and memory rises — the latency-vs-throughput trade-off. The static cousin of vLLM's continuous batching.",
  },
  continuous_batching: {
    term: "Continuous batching",
    short: "Server trick: add/remove requests mid-flight to keep the GPU busy.",
    overview: "A smarter version of batching used by real servers: it slots new requests in and retires finished ones on the fly, so the GPU never waits. The single biggest speed win for serving many users — but it needs an NVIDIA GPU.",
    deeper:
      "<b>What it is:</b> iteration-level scheduling (vLLM/TGI) — requests join and leave the running batch every decode step, instead of waiting for a fixed batch. With paged KV cache, it keeps the GPU saturated under bursty load.<br><br>" +
      "<b>Why it's not here:</b> it's a CUDA-based server feature; Apple Silicon/MLX can't run it. This project has a <code>vllm</code> engine + Terraform to run this exact study on an AWS/own GPU — the next chapter.",
  },
  batch_size: {
    term: "Batch size",
    short: "How many prompts are processed together at once.",
    overview: "The number of requests handled at the same time. Bigger batches serve more people per second but use more memory and slow each individual answer slightly.",
    deeper:
      "<b>What it is:</b> number of sequences decoded concurrently.<br><br>" +
      "<b>Trade-off measured here:</b> from batch 1→32 on Qwen2.5-7B-4bit, aggregate throughput rose ~7.8× while per-stream throughput fell and KV-cache memory grew roughly linearly — so batch size is bounded by VRAM.",
  },
  "pass@1": {
    term: "pass@1 (coding score)",
    short: "Did the model's first code attempt pass all the tests?",
    overview: "For coding: the percentage of problems the model solves correctly on its very first try, checked by actually running the code against tests. Higher = better coder.",
    deeper:
      "<b>What it measures:</b> real code-generation ability — does the model's single attempt actually work?<br><br>" +
      "<b>Dataset:</b> HumanEval (OpenAI) — the full 164 Python problems. Each gives a function signature + docstring and hidden unit tests.<br><br>" +
      "<b>Metric:</b> pass@1 — share of problems whose single greedy generation passes <i>all</i> hidden tests (no retries).<br><br>" +
      "<b>How we measure it:</b> we prompt the model to complete the function, extract the code block, run it against the problem's test suite in a sandboxed subprocess with a timeout, and count it correct only if every assertion passes.<br><br>" +
      "<b>Models evaluated:</b> " + MODELS_EVALED + "<br><br>" +
      "<b>Example:</b> prompt <code>def has_close_elements(numbers, threshold): ...</code> → model writes the body → we run the hidden tests → ✓ if all pass. Real per-model transcripts are on the <b>Examples</b> page.",
  },
  humaneval: {
    term: "HumanEval (coding benchmark)",
    short: "A 164-problem Python coding benchmark, graded by running the code.",
    overview: "A well-known coding test: 164 Python problems where the model writes a function and we run real tests on it. Measures actual coding ability, not guesswork.",
    deeper:
      "<b>Dataset:</b> OpenAI HumanEval — 164 hand-written Python function-completion problems, each with a signature, docstring, and hidden unit tests. We run the full set.<br><br>" +
      "<b>Metric:</b> pass@1 (see the pass@1 entry) — executed, not pattern-matched.<br><br>" +
      "<b>How we measure it:</b> instruct the model to complete the function → extract the ```python block → execute against the tests in an isolated subprocess (timeout) → pass only if it runs cleanly.<br><br>" +
      "<b>Models evaluated:</b> " + MODELS_EVALED + " Greedy decoding for reproducibility.<br><br>" +
      "<b>See it:</b> the Examples page shows each model's actual code for the same problem, tagged ✓/✗.",
  },
  gsm8k: {
    term: "GSM8K (math benchmark)",
    short: "Grade-school math word problems — tests step-by-step reasoning.",
    overview: "A set of grade-school math word problems. The model must reason through the steps and give the right number. Tests careful, multi-step thinking.",
    deeper:
      "<b>What it measures:</b> multi-step arithmetic reasoning (chain-of-thought), not memorized facts.<br><br>" +
      "<b>Dataset:</b> GSM8K (OpenAI) — grade-school math word problems. We evaluate on a 100-problem sample of the 1,319-problem test split.<br><br>" +
      "<b>Metric:</b> exact-match accuracy — % of problems where the model's final number equals the gold answer.<br><br>" +
      "<b>How we measure it:</b> zero-shot — the model is asked to reason briefly and end with 'The answer is X.' We parse the last number from its output and compare to the gold answer (the value after '####' in the dataset). Greedy decoding.<br><br>" +
      "<b>Models evaluated:</b> " + MODELS_EVALED + "<br><br>" +
      "<b>Example:</b> Q: \"Natalia sold clips to 48 friends in April and half as many in May. How many altogether?\" → model: \"48 + 24 = 72. The answer is 72.\" → gold 72 → ✓. Real transcripts on the <b>Examples</b> page.",
  },
  ci: {
    term: "95% confidence interval (CI)",
    short: "The range the true score is likely in — because it's measured on a limited number of problems.",
    overview: "A score like 73% (73 of 100) is an estimate from a limited test set, not the exact truth. The 95% CI (e.g. 64–81%) is the range the real score is very likely to be in. Narrower = more certain (more problems tested); wider = less certain. Rule of thumb: if two models' ranges overlap a lot, the gap between them isn't reliable yet.",
    deeper:
      "<b>What it is:</b> a Wilson 95% confidence interval on a pass-rate — the standard, robust way to put error bars on \"x out of n correct.\"<br><br>" +
      "<b>Why it's here:</b> HumanEval is 164 problems and GSM8K is a 100-problem sample, so each percentage carries real uncertainty. The CI makes that uncertainty explicit instead of pretending 73% is exact.<br><br>" +
      "<b>How to read it:</b> 73% (64–81%) means \"best estimate 73%, but plausibly anywhere from 64% to 81%.\" Two models are only meaningfully different if their intervals barely overlap. Same as the whiskers on the quality chart.",
  },
  quality: {
    term: "Quality — coding & math",
    short: "How well each model does on real coding and math tasks (higher = better).",
    overview: "Two real-task scores per model, shown side by side: coding (write a function that passes hidden tests) and math (solve grade-school word problems). Both run on the same models so the comparison is fair. The whiskers are 95% confidence intervals.",
    deeper:
      "<b>Coding — HumanEval pass@1:</b> the model completes Python functions; each generation is run against the problem's hidden unit tests in a sandboxed subprocess and counts as correct only if <i>every</i> test passes (no retries). Full set = 164 problems. Greedy decoding.<br><br>" +
      "<b>Math — GSM8K exact-match:</b> grade-school math word problems testing multi-step reasoning. The model is asked to reason briefly and end with 'The answer is X.'; we parse the final number and compare to the gold answer (after '####'). Zero-shot, greedy. Full set sample = 100+ problems.<br><br>" +
      "<b>Why the wide whiskers:</b> they're 95% Wilson confidence intervals. At the small dev N they're huge (5/5 ≈ 57–100%), so dev scores are illustrative only — run full mode for numbers you can trust.<br><br>" +
      "<b>Models evaluated:</b> " + MODELS_EVALED + "<br><br>" +
      "<b>See it:</b> the Examples page shows each model's actual coding and math answers, tagged ✓/✗.",
  },
  vllm: {
    term: "vLLM",
    short: "A fast GPU inference server (PagedAttention + continuous batching).",
    overview: "The popular open-source engine that powers many production AI APIs. Its tricks make GPUs serve far more users at once. It only runs on NVIDIA GPUs, not Apple's.",
    deeper:
      "<b>What it is:</b> a CUDA-based serving engine exposing an OpenAI-compatible API.<br><br>" +
      "<b>Key tech:</b> PagedAttention (a paged, non-contiguous KV cache that slashes memory fragmentation) and continuous batching — together the basis of high-throughput open-model serving.<br><br>" +
      "<b>In this project:</b> there's a <code>vllm</code> engine (HTTP client) and Terraform to run it on a GPU; it's the AWS/own-GPU chapter, since it can't run on this Mac.",
  },
  mlx: {
    term: "MLX",
    short: "Apple's framework for running models fast on Mac GPUs.",
    overview: "Apple's toolkit for running AI models on the Mac's own GPU. It's how this project runs everything locally without a cloud GPU.",
    deeper:
      "<b>What it is:</b> Apple's array framework with lazy evaluation and unified-memory Metal kernels, plus <code>mlx-lm</code> for LLMs (quantization, KV-cache quant, speculative decoding).<br><br>" +
      "<b>Role here:</b> the engine behind every local number on this site (" + HW + "). The local stand-in for vLLM — but with no continuous batching.",
  },
};

/* "What to look for" — plain-English meaning of each metric: what high/low means and the
   takeaway. Kept generic (no chart-type assumptions) since the same icon sits on cards, tables
   and charts. Shown in the side panel under the Overview. */
const LOOK = {
  throughput: "Tokens produced per second. <b>Higher is better</b> — it means faster replies.",
  tpot: "The delay between each word as the answer streams. <b>Lower is better</b> — smoother, less stuttery output.",
  ttft: "How long until the first word appears. <b>Lower is better</b> — feels snappier. Longer prompts make it bigger.",
  gpu_memory: "How much memory the model needs. <b>Lower is better</b> — more fits on your hardware. Quantizing shrinks it a lot.",
  quantization: "Storing the model in fewer bits (bf16 → 8-bit → 4-bit). <b>Fewer bits = faster and smaller</b>, for a small quality cost. 4-bit is usually the sweet spot; 8-bit is near-lossless.",
  perplexity: "How well the model predicts text — a quality proxy. <b>Lower is better.</b> A small rise after quantizing means quality barely dropped.",
  speculative: "A small draft model guesses ahead to speed things up. <b>Above 1× = it helped; around 1× or below = it didn't</b> (the overhead isn't worth it on small, already-fast models).",
  acceptance: "How often the draft's guesses are kept. <b>Higher is better</b> — more kept guesses means more speedup. Low means the draft is wrong too often to help.",
  kv_cache: "The model's running memory of the text so far. <b>It grows with length</b>, so long chats use more memory — eventually more than the model itself.",
  kv_quant: "Compressing that memory to save space. <b>8-bit usually keeps the output identical; 4-bit saves more but can break it.</b> Higher fidelity = safer.",
  batching: "Serving several requests at once. <b>Total output goes up, but each single reply gets a little slower and memory grows</b> — a throughput-vs-latency trade-off.",
  quality: "Score on real coding and math tasks. <b>Higher is better.</b> Each score has a margin of error (the 95% confidence interval); if two models' ranges overlap, the gap between them isn't reliable yet — especially with few test problems.",
  humaneval: "Coding skill — % of problems solved on the first try, graded by actually running the code. <b>Higher is better.</b>",
  gsm8k: "Grade-school math word problems answered correctly. <b>Higher is better</b> — it tests step-by-step reasoning.",
  ci: "The margin of error on a score (e.g. 73% → 64–81%). <b>Narrower = more reliable.</b> If two models' ranges overlap, treat them as tied — the gap isn't trustworthy yet.",
};
Object.entries(LOOK).forEach(([k, v]) => { if (window.GLOSSARY[k]) window.GLOSSARY[k].look = v; });
