/* Renders the multi-study dashboard from window.BENCH_DATA (written by `llmbench report`). */

const DATA = window.BENCH_DATA || { runs: [] };
const RUNS = DATA.runs || [];
const fmt = (n, d = 0) => (n == null || Number.isNaN(n) ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
const memMb = (r) => r.aggregates.compute?.peak_accel_mem_mb ?? r.aggregates.compute?.peak_rss_mb ?? null;
const tps = (r) => r.aggregates.system_throughput_tps;
const byStudy = (s) => RUNS.filter((r) => (r.manifest.study || "latency") === s);

const PALETTE = ["#5b8cff", "#34d399", "#c4b5fd", "#f5a524", "#f472b6", "#22d3ee"];
const color = (i) => PALETTE[i % PALETTE.length];

if (window.Chart) {
  Chart.defaults.color = "#93a1b5";
  Chart.defaults.borderColor = "rgba(36,48,73,0.6)";
  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  Chart.defaults.maintainAspectRatio = false;
}

function show(id) { const e = document.getElementById(id); if (e) e.hidden = false; }
function metric(lbl, val, sub, good, key) {
  const ic = key && typeof infoCorner === "function" ? infoCorner(key) : "";
  return `<div class="metric">${ic}<div class="lbl">${lbl}</div><div class="val ${good ? "good" : ""}">${val}</div>${sub ? `<div class="sub">${sub}</div>` : ""}</div>`;
}
function bar(id, labels, values, colors, suffix = "") {
  const el = document.getElementById(id);
  if (!el) return;
  new Chart(el, {
    type: "bar",
    data: { labels, datasets: [{ data: values, backgroundColor: colors || labels.map((_, i) => color(i)), borderRadius: 6 }] },
    options: {
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${fmt(c.parsed.y, 2)}${suffix}` } } },
      scales: { x: { ticks: { autoSkip: false, font: { size: 11 } } }, y: { beginAtZero: true } },
    },
  });
}

/* ---------------- header ---------------- */
function renderEnv() {
  const hw = DATA.hardware || {}, v = DATA.versions || {};
  if (!document.getElementById("env-badges")) return;
  document.getElementById("env-badges").innerHTML = [
    hw.chip && `<span class="badge"><b>${hw.chip}</b></span>`,
    hw.memory_gb && `<span class="badge">${hw.memory_gb} GB unified</span>`,
    v.mlx && v.mlx !== "n/a" && `<span class="badge">MLX <b>${v.mlx}</b></span>`,
    `<span class="badge">${RUNS.length} runs · ${new Set(RUNS.map(r => r.manifest.study)).size} studies</span>`,
  ].filter(Boolean).join("");
}

function renderHeadline() {
  if (!document.getElementById("headline")) return;
  const q = byStudy("quantization");
  if (q.length >= 2) {
    const s = [...q].sort((a, b) => (b.manifest.params.bits || 0) - (a.manifest.params.bits || 0));
    const hi = s[0], lo = s[s.length - 1];
    const speed = tps(lo) / tps(hi);
    const mem = memMb(hi) && memMb(lo) ? (1 - memMb(lo) / memMb(hi)) * 100 : null;
    document.getElementById("headline").innerHTML = `
      <div class="big">${fmt(speed, 1)}×</div>
      <div class="lbl">faster, 4-bit vs ${hi.manifest.params.precision || "bf16"}</div>
      ${mem != null ? `<div class="sub">${fmt(mem, 0)}% less GPU memory · quality measured below</div>` : ""}`;
  }
}

function renderTOC() {
  if (!document.getElementById("toc")) return;
  const map = { quantization: "Quantization", speculative: "Speculative", kv_cache: "KV-cache", batching: "Batching" };
  const items = Object.keys(map).filter((s) => byStudy(s).length).map((s) => `<a href="#study-${s}">${map[s]}</a>`);
  items.push(`<a href="#study-continuous">Continuous batching →</a>`);
  document.getElementById("toc").innerHTML = items.join("");
}

/* ---------------- 1. quantization ---------------- */
function renderQuant() {
  const runs = byStudy("quantization");
  if (!runs.length) return;
  show("study-quantization");
  const s = [...runs].sort((a, b) => (b.manifest.params.bits || 0) - (a.manifest.params.bits || 0));
  const labels = s.map((r) => r.manifest.params.precision || r.manifest.label);
  const ppl = (r) => r.aggregates.quality?.perplexity ?? null;
  const hi = s[0], lo = s[s.length - 1];

  const speed = tps(lo) / tps(hi);
  const mem = memMb(hi) && memMb(lo) ? (1 - memMb(lo) / memMb(hi)) * 100 : null;
  const pplDelta = ppl(hi) && ppl(lo) ? (ppl(lo) / ppl(hi) - 1) * 100 : null;
  document.getElementById("quant-cards").innerHTML = [
    metric("Throughput gain", `${fmt(speed, 1)}×`, `4-bit vs ${labels[0]}`, true, "throughput"),
    mem != null ? metric("Memory saved", `${fmt(mem, 0)}%`, `${fmt(memMb(lo), 0)} vs ${fmt(memMb(hi), 0)} MB`, true, "gpu_memory") : "",
    pplDelta != null ? metric("Quality lost", `${pplDelta >= 0 ? "+" : ""}${fmt(pplDelta, 1)}%`, "perplexity, 4-bit vs " + labels[0], Math.abs(pplDelta) < 3, "perplexity") : "",
  ].filter(Boolean).join("");

  // Pareto: x = throughput, y = perplexity (bottom-right = best).
  new Chart(document.getElementById("quant-pareto"), {
    type: "scatter",
    data: { datasets: s.map((r, i) => ({ label: labels[i], data: [{ x: tps(r), y: ppl(r) }], backgroundColor: color(i), pointRadius: 7 })) },
    options: {
      plugins: { tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${fmt(c.parsed.x, 1)} tok/s, ppl ${fmt(c.parsed.y, 2)}` } } },
      scales: { x: { title: { display: true, text: "throughput tok/s →" } }, y: { title: { display: true, text: "perplexity (lower better)" } } },
    },
  });
  bar("quant-ppl", labels, s.map(ppl), labels.map((_, i) => color(i)));
  bar("quant-tps", labels, s.map(tps), labels.map((_, i) => color(i)), " tok/s");
  bar("quant-mem", labels, s.map(memMb), labels.map((_, i) => color(i)), " MB");

  const cols = [["Precision", (r, i) => labels[i]], ["Throughput", (r) => fmt(tps(r), 1) + " tok/s"],
    ["TPOT p50", (r) => fmt(r.aggregates.tpot_ms.p50, 2) + " ms"], ["E2E p50", (r) => fmt(r.aggregates.e2e_ms.p50, 0) + " ms"],
    ["GPU mem", (r) => fmt(memMb(r), 0) + " MB"], ["Perplexity", (r) => fmt(ppl(r), 3)]];
  document.getElementById("quant-table").innerHTML =
    `<thead><tr>${cols.map((c) => `<th>${c[0]}</th>`).join("")}</tr></thead><tbody>` +
    s.map((r, i) => `<tr>${cols.map((c) => `<td>${c[1](r, i)}</td>`).join("")}</tr>`).join("") + "</tbody>";

  const verdict = pplDelta != null && Math.abs(pplDelta) < 3
    ? `4-bit is the clear winner — <b>${fmt(speed, 1)}× the throughput and ${mem != null ? fmt(mem, 0) + "% less memory" : "far less memory"}</b> for only <b>${fmt(Math.abs(pplDelta), 1)}% higher perplexity</b>. The quality cost is negligible.`
    : `4-bit trades <b>${fmt(Math.abs(pplDelta || 0), 1)}% quality</b> for <b>${fmt(speed, 1)}× throughput</b> — judge against your quality bar.`;
  document.getElementById("quant-analysis").innerHTML = `<ul>
    <li>${verdict}</li>
    <li>Decode is <b>memory-bandwidth bound</b>: smaller weights move less data per token, so throughput rises and TPOT falls roughly with the precision ratio.</li>
    <li>Perplexity is measured on a fixed passage with the same tokenizer, so these numbers are directly comparable across precisions.</li>
  </ul>`;
}

/* ---------------- 2. speculative ---------------- */
function renderSpec() {
  const runs = byStudy("speculative");
  if (runs.length < 1) return;
  show("study-speculative");
  const base = runs.find((r) => !r.aggregates.draft_acceptance) || runs[0];
  const spec = runs.find((r) => r.aggregates.draft_acceptance != null) || runs[runs.length - 1];
  const labels = [base.manifest.label, spec.manifest.label];
  const tpot = (r) => r.aggregates.tpot_ms.p50;

  const speed = tps(spec) / tps(base);
  const accept = spec.aggregates.draft_acceptance;
  document.getElementById("spec-cards").innerHTML = [
    metric("Decode speedup", `${fmt(speed, 2)}×`, "speculative vs baseline", speed > 1, "speculative"),
    accept != null ? metric("Draft acceptance", `${fmt(accept * 100, 0)}%`, "of proposed tokens kept", true, "acceptance") : "",
    metric("Output", "identical", "greedy — same tokens, fewer target passes", false, "speculative"),
  ].filter(Boolean).join("");
  bar("spec-tpot", labels, [tpot(base), tpot(spec)], ["#8a93a6", "#34d399"], " ms");
  bar("spec-tps", labels, [tps(base), tps(spec)], ["#8a93a6", "#34d399"], " tok/s");

  const win = speed > 1.05;
  document.getElementById("spec-analysis").innerHTML = `<ul>
    <li>${win
      ? `Speculation gives a <b>${fmt(speed, 2)}× decode speedup</b> at ${fmt(accept * 100, 0)}% draft acceptance — each accepted draft token skips a full 7B forward pass.`
      : `Here speculation is roughly break-even (${fmt(speed, 2)}×): the draft+verify overhead offsets the saved passes at this acceptance rate. It wins most when the draft is cheap and frequently right.`}</li>
    <li>Acceptance depends on how well the 0.5B draft predicts the 7B's tokens; harder prompts lower it. Output is unchanged because the target verifies every token.</li>
  </ul>`;
}

/* ---------------- 3. kv-cache ---------------- */
function renderKV() {
  const runs = byStudy("kv_cache");
  if (!runs.length) return;
  show("study-kv_cache");
  const ord = (r) => (r.manifest.params.kv_bits === "full" ? 99 : Number(r.manifest.params.kv_bits));
  const s = [...runs].sort((a, b) => ord(b) - ord(a));
  const labels = s.map((r) => (r.manifest.params.kv_bits === "full" ? "KV full" : `KV ${r.manifest.params.kv_bits}-bit`));
  const full = s[0], low = s[s.length - 1];
  const mem = memMb(full) && memMb(low) ? (1 - memMb(low) / memMb(full)) * 100 : null;
  document.getElementById("kv-cards").innerHTML = [
    mem != null ? metric("Memory saved", `${fmt(mem, 0)}%`, `${fmt(memMb(low), 0)} vs ${fmt(memMb(full), 0)} MB`, true, "kv_quant") : "",
    metric("Context", `~${fmt(full.aggregates.total_input_tokens / Math.max(full.manifest.num_requests, 1), 0)} tok`, "prompt length stressed", false, "kv_cache"),
  ].filter(Boolean).join("");
  bar("kv-mem", labels, s.map(memMb), labels.map((_, i) => color(i)), " MB");
  bar("kv-tps", labels, s.map(tps), labels.map((_, i) => color(i)), " tok/s");
  document.getElementById("kv-analysis").innerHTML = `<ul>
    <li>${mem != null ? `Quantizing the KV cache to 4-bit cuts peak memory by <b>${fmt(mem, 0)}%</b> at long context` : "KV quantization reduces cache memory at long context"} — headroom you spend on longer context or more concurrent requests.</li>
    <li>The cache grows linearly with sequence length, so the saving compounds the longer the context gets.</li>
  </ul>`;
}

/* ---------------- 4. batching ---------------- */
function renderBatch() {
  const runs = byStudy("batching");
  if (!runs.length) return;
  show("study-batching");
  const s = [...runs].sort((a, b) => a.manifest.params.batch_size - b.manifest.params.batch_size);
  const labels = s.map((r) => r.manifest.params.batch_size);
  const agg = s.map((r) => r.aggregates.system_throughput_tps);
  const per = s.map((r) => r.aggregates.per_stream_tps);
  const mem = s.map((r) => r.aggregates.compute?.peak_accel_mem_mb);
  const speedup = agg[agg.length - 1] / agg[0];
  const memUp = mem[0] && mem[mem.length - 1] ? mem[mem.length - 1] / mem[0] : null;
  document.getElementById("batch-cards").innerHTML = [
    metric("Peak throughput", `${fmt(Math.max(...agg), 0)}`, `tok/s at batch ${labels[agg.indexOf(Math.max(...agg))]}`, true, "throughput"),
    metric("Throughput gain", `${fmt(speedup, 1)}×`, `batch ${labels[labels.length - 1]} vs 1`, true, "batching"),
    memUp ? metric("Memory growth", `${fmt(memUp, 1)}×`, `more GPU memory at batch ${labels[labels.length - 1]}`, false, "gpu_memory") : "",
  ].filter(Boolean).join("");
  const line = (id, data, label, ytext, col) => {
    const el = document.getElementById(id);
    if (!el || !data.some((x) => x != null)) return;
    new Chart(el, {
      type: "line",
      data: { labels, datasets: [{ label, data, borderColor: col || "#34d399", backgroundColor: col || "#34d399", tension: 0.25, pointRadius: 4, borderWidth: 2 }] },
      options: { plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: "batch size" } }, y: { beginAtZero: true, title: { display: true, text: ytext || "tok/s" } } } },
    });
  };
  line("batch-agg", agg, "aggregate tok/s", "tok/s");
  line("batch-stream", per, "per-stream tok/s", "tok/s");
  line("batch-mem", mem, "peak GPU mem MB", "MB", "#f5a524");
  document.getElementById("batch-analysis").innerHTML = `<ul>
    <li>Aggregate throughput scales <b>${fmt(speedup, 1)}×</b> from batch 1 to ${labels[labels.length - 1]} — at small batch the GPU is starved; batching fills it.</li>
    ${memUp ? `<li><b>Memory rises with batch size</b> (${fmt(memUp, 1)}× here): each extra sequence adds its own KV cache. This is the trade-off behind serving many users at once.</li>` : ""}
    <li>Per-stream throughput <i>declines</i> as batch grows: the classic latency-vs-throughput trade-off. The win is total tokens served, not single-request speed.</li>
    <li>This is <b>static</b> batching (all streams start together). vLLM's continuous batching does this dynamically per request — the GPU chapter below.</li>
  </ul>`;
}

/* ---------------- boot ---------------- */
function boot() {
  if (!RUNS.length) {
    document.querySelector(".wrap").insertAdjacentHTML("beforeend",
      `<div class="card empty">No runs yet. Run the studies, then <code>uv run llmbench report</code>.</div>`);
    return;
  }
  renderEnv();
  renderHeadline();
  renderTOC();
  renderQuant();
  renderSpec();
  renderKV();
  renderBatch();
  const m = RUNS[0].manifest;
  const fm = document.getElementById("footer-meta");
  if (fm) fm.textContent =
    `${DATA.generated_runs} runs · ${m.hardware.chip || ""} · MLX ${DATA.versions?.mlx || ""} · commit ${m.git_commit} · ${m.timestamp}`;
}
boot();
