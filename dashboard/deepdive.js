/* Deep-dive page: speculative decoding story + combos + KV-context, from EXP_DATA. */
(function () {
  const D = window.EXP_DATA || {};
  if (window.Chart) { Chart.defaults.color = "#93a1b5"; Chart.defaults.borderColor = "rgba(36,48,73,0.6)"; Chart.defaults.maintainAspectRatio = false; }
  const has = D.spec_k_sweep && D.spec_k_sweep.length;
  if (!has) return; // keep the "pending" message

  document.getElementById("pending").remove();
  document.getElementById("dd-body").hidden = false;

  const fmt = (n, d = 0) => (n == null ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const metric = (lbl, val, sub, good, key) =>
    `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${lbl}</div><div class="val ${good ? "good" : ""}">${val}</div>${sub ? `<div class="sub">${sub}</div>` : ""}</div>`;
  const C = { blue: "#5b8cff", teal: "#34d399", amber: "#f5a524", gray: "#8a93a6", purple: "#c4b5fd" };

  function bar(id, labels, data, colors, suffix, pctMax) {
    const el = document.getElementById(id); if (!el) return;
    new Chart(el, { type: "bar",
      data: { labels, datasets: [{ data, backgroundColor: colors, borderRadius: 6 }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${fmt(c.parsed.y, 2)}${suffix || ""}` } } },
        scales: { x: { ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 25 } }, y: { beginAtZero: true, max: pctMax ? 100 : undefined } } } });
  }

  /* ---------- story ---------- */
  document.getElementById("spec-story").innerHTML = `
    <p>Normally a model writes one token at a time — each token needs a full, expensive forward pass through all ${"7"}-billion-or-so weights. Speculative decoding asks: what if a tiny, cheap model guessed the next few tokens, and the big model just <i>checked</i> them all at once?</p>
    <ol>
      <li><b>Draft.</b> A small model (here 0.5B or 1.5B) quickly generates the next <b>k</b> tokens on its own.</li>
      <li><b>Verify in parallel.</b> The big 3B model runs <b>one</b> forward pass over all k draft tokens at once (parallel is cheap) and gets its own probability for each position.</li>
      <li><b>Accept or reject.</b> It walks the draft left-to-right and keeps tokens while the draft agrees with it. Greedy rule: accept while <code>argmax(target) == draft token</code>. Sampling rule: accept token x with probability <code>min(1, p_target(x) / p_draft(x))</code> — the draft is "good enough" when the big model finds the token at least as likely as the draft did.</li>
      <li><b>Correct once.</b> At the first disagreement (or after all k), the big model contributes one token of its own — for free, from the same pass.</li>
      <li><b>Repeat.</b> So each expensive target pass yields between <b>1 and k+1</b> tokens instead of just 1. The output is <i>identical</i> to normal decoding — only faster.</li>
    </ol>
    <p>The catch: it only helps when the draft is both <b>cheap</b> (much smaller than the target) and <b>often right</b> (high acceptance). Below, we measure exactly that — the <b>acceptance rate</b>, the <b>stretch</b> (mean tokens accepted per target pass), the cost of different drafts, and where it wins.</p>`;

  /* ---------- k-sweep ---------- */
  const ks = [...D.spec_k_sweep].sort((a, b) => a.k - b.k);
  const base = D.baseline || {};
  const bestK = ks.reduce((a, b) => (a.throughput_tps >= b.throughput_tps ? a : b));
  document.getElementById("ksweep-cards").innerHTML = [
    metric("Best stretch", `${fmt(bestK.tokens_per_target_pass, 2)}×`, `tokens per target pass at k=${bestK.k}`, true, "acceptance"),
    metric("Acceptance", `${fmt(bestK.acceptance_rate * 100, 0)}%`, `of proposed draft tokens, k=${bestK.k}`, true, "acceptance"),
    base.throughput_tps ? metric("Speedup", `${fmt(bestK.throughput_tps / base.throughput_tps, 2)}×`, "vs no speculation", bestK.throughput_tps > base.throughput_tps, "throughput") : "",
  ].filter(Boolean).join("");
  // dual-axis: acceptance % and tokens/target pass
  new Chart(document.getElementById("dd-kacc"), {
    type: "bar",
    data: { labels: ks.map((r) => "k=" + r.k), datasets: [
      { label: "acceptance %", data: ks.map((r) => r.acceptance_rate * 100), backgroundColor: C.blue, borderRadius: 5, yAxisID: "y" },
      { label: "tokens/target pass", type: "line", data: ks.map((r) => r.tokens_per_target_pass), borderColor: C.teal, backgroundColor: C.teal, yAxisID: "y1", tension: 0.25 },
    ] },
    options: { plugins: { legend: { display: true } },
      scales: { y: { position: "left", beginAtZero: true, max: 100, title: { display: true, text: "acceptance %" } },
        y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: "tokens / target pass" } } } },
  });
  bar("dd-ktps", ks.map((r) => "k=" + r.k), ks.map((r) => r.throughput_tps), ks.map(() => C.teal), " tok/s");

  /* ---------- token-source donut ---------- */
  new Chart(document.getElementById("dd-donut"), {
    type: "doughnut",
    data: { labels: ["From draft (cheap)", "From target (verify/correct)"],
      datasets: [{ data: [bestK.accepted_draft, bestK.target_tokens], backgroundColor: [C.teal, C.gray], borderWidth: 0 }] },
    options: { plugins: { legend: { position: "bottom" }, tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed} tokens` } } } },
  });
  document.getElementById("donut-note").innerHTML =
    `<p>At k=${bestK.k}, <b>${fmt(bestK.draft_token_fraction * 100, 0)}%</b> of the output tokens were produced by the cheap 0.5B draft and only verified by the 3B model. The big model only had to "speak" ${fmt(bestK.target_tokens, 0)} times to produce ${fmt(bestK.output_tokens, 0)} tokens — that ratio is the speedup.</p>`;

  /* ---------- draft compare ---------- */
  const dc = D.spec_draft_compare || [];
  bar("dd-draftacc", dc.map((r) => r.draft + " draft"), dc.map((r) => r.acceptance_rate * 100), dc.map(() => C.blue), "%", true);
  bar("dd-drafttps", dc.map((r) => r.draft + " draft"), dc.map((r) => r.throughput_tps), dc.map(() => C.teal), " tok/s");
  if (dc.length === 2) {
    const [a, b] = dc;
    document.getElementById("draft-analysis").innerHTML = `<ul>
      <li>The <b>1.5B draft</b> accepts more (${fmt(b.acceptance_rate * 100, 0)}% vs ${fmt(a.acceptance_rate * 100, 0)}%) — it mimics the 3B better — but each draft token costs more.</li>
      <li>Net throughput winner here: <b>${(a.throughput_tps >= b.throughput_tps ? a : b).draft} draft</b> (${fmt(Math.max(a.throughput_tps, b.throughput_tps), 1)} tok/s). The best draft balances accuracy against its own cost.</li>
    </ul>`;
  }

  /* ---------- prompt type ---------- */
  const ps = D.spec_prompt_sweep || [];
  bar("dd-prompt", ps.map((r) => r.prompt_type), ps.map((r) => r.acceptance_rate * 100), ps.map(() => C.amber), "%", true);
  if (ps.length) {
    const top = [...ps].sort((a, b) => b.acceptance_rate - a.acceptance_rate)[0];
    const low = [...ps].sort((a, b) => a.acceptance_rate - b.acceptance_rate)[0];
    document.getElementById("prompt-analysis").innerHTML = `<ul>
      <li><b>${top.prompt_type}</b> prompts hit the highest acceptance (${fmt(top.acceptance_rate * 100, 0)}%) — predictable text is easy for the small draft.</li>
      <li><b>${low.prompt_type}</b> is hardest (${fmt(low.acceptance_rate * 100, 0)}%) — open-ended text diverges from the draft, so fewer guesses stick. <b>This is where speculative decoding shines or struggles.</b></li>
    </ul>`;
  }

  /* ---------- memory cost ---------- */
  const specMem = bestK.peak_mem_mb;
  bar("dd-mem", ["baseline (3B only)", "speculative (3B + 0.5B)"], [base.peak_mem_mb, specMem], [C.gray, C.amber], " MB");

  /* ---------- combos ---------- */
  const combos = D.combos || [];
  if (combos.length) {
    const b0 = combos[0];
    const bestC = combos.reduce((a, b) => (a.throughput_tps >= b.throughput_tps ? a : b));
    document.getElementById("combo-cards").innerHTML = [
      metric("Best throughput", `${fmt(bestC.throughput_tps, 0)} tok/s`, bestC.label, true, "throughput"),
      metric("vs base", `${fmt(bestC.throughput_tps / b0.throughput_tps, 2)}×`, "stacked vs 4-bit alone", true, "throughput"),
    ].join("");
    bar("dd-combotps", combos.map((r) => r.label), combos.map((r) => r.throughput_tps), combos.map(() => C.teal), " tok/s");
    bar("dd-combomem", combos.map((r) => r.label), combos.map((r) => r.peak_mem_mb), combos.map(() => C.amber), " MB");
    document.getElementById("combo-analysis").innerHTML = `<ul>
      <li>KV-cache quant mostly buys <b>memory</b>; speculative decoding mostly buys <b>speed</b> — they're complementary, so stacking them gets you both.</li>
      <li>Best combined result: <b>${bestC.label}</b> at ${fmt(bestC.throughput_tps, 0)} tok/s.</li>
    </ul>`;
  }

  /* ---------- kv-context ---------- */
  const kv = D.kv_context || [];
  if (kv.length) {
    const ctxs = [...new Set(kv.map((r) => r.ctx))];
    const levels = [["full", C.gray], [8, C.blue], [4, C.teal]];
    new Chart(document.getElementById("dd-kvctx"), {
      type: "bar",
      data: { labels: ctxs, datasets: levels.map(([lv, col]) => ({
        label: "KV " + (lv === "full" ? "full" : lv + "-bit"),
        data: ctxs.map((ctx) => { const r = kv.find((x) => x.ctx === ctx && x.kv === lv); return r ? r.peak_mem_mb : null; }),
        backgroundColor: col, borderRadius: 5 })) },
      options: { plugins: { legend: { display: true } }, scales: { x: { title: { display: true, text: "context length" } }, y: { beginAtZero: false, title: { display: true, text: "peak GPU memory (MB)" } } } },
    });
    // savings at longest context
    const longest = ctxs[ctxs.length - 1];
    const full = kv.find((x) => x.ctx === longest && x.kv === "full");
    const q4 = kv.find((x) => x.ctx === longest && x.kv === 4);
    if (full && q4) {
      const save = (1 - q4.peak_mem_mb / full.peak_mem_mb) * 100;
      document.getElementById("kv-analysis2").innerHTML = `<ul>
        <li>At <b>${longest}</b> context, 4-bit KV cache uses <b>${fmt(Math.abs(save), 0)}% ${save >= 0 ? "less" : "more"}</b> memory than full precision (${fmt(q4.peak_mem_mb, 0)} vs ${fmt(full.peak_mem_mb, 0)} MB).</li>
        <li>The gap widens with context — which is why KV quant matters most for long documents and many concurrent requests, not short chats.</li>
      </ul>`;
    }
  }

  const fm = document.getElementById("footer-meta");
  if (fm) fm.textContent = `Speculative deep-dive on ${D.target || "Qwen2.5-3B"} · drafts ${Object.values(D.drafts || {}).length || 2}`;
})();
