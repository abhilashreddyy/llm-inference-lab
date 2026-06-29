/* Optimizations: sub-tab controller + Explorer + per-optimization cross-model renderers.
   Lazy-renders each sub-tab on first activation (so Chart.js sizes correctly). */
(function () {
  const BD = window.BENCH_DATA || { runs: [] };
  const E = window.EXP_DATA || {};
  if (window.Chart) { Chart.defaults.color = "#93a1b5"; Chart.defaults.borderColor = "rgba(36,48,73,0.6)"; Chart.defaults.maintainAspectRatio = false; }

  const fmt = (n, d = 0) => (n == null || Number.isNaN(n) ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const C = { blue: "#5b8cff", teal: "#34d399", amber: "#f5a524", gray: "#8a93a6", purple: "#c4b5fd", pink: "#f472b6" };
  // 12 distinct hues so cross-model line/scatter series stay distinguishable up to ~12-15 models
  const palette = ["#34d399", "#5b8cff", "#f5a524", "#c4b5fd", "#f472b6", "#38bdf8", "#a3e635", "#fb923c", "#22d3ee", "#e879f9", "#facc15", "#4ade80"];
  const scaleX = (id, n, per) => { const el = document.getElementById(id); if (el) el.style.minWidth = n > 6 ? (n * (per || 58)) + "px" : ""; };  // horiz-scroll when many models
  const metric = (l, v, s, good, key) => `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${l}</div><div class="val ${good ? "good" : ""}">${v}</div>${s ? `<div class="sub">${s}</div>` : ""}</div>`;
  const charts = {};
  function chart(id, cfg) { const el = document.getElementById(id); if (!el) return; if (charts[id]) charts[id].destroy(); charts[id] = new Chart(el, cfg); }
  function yTitle(suffix, pctMax) {
    if (pctMax) return "%";
    const s = (suffix || "").trim();
    if (s.includes("tok/s")) return "tokens / sec";
    if (s.includes("MB")) return "memory (MB)";
    if (s.includes("ms")) return "milliseconds";
    if (s.includes("×")) return "× vs baseline";
    if (s === "%") return "%";
    return s;
  }
  function bar(id, labels, data, colors, suffix, pctMax, ytitle) {
    chart(id, { type: "bar", data: { labels, datasets: [{ data, backgroundColor: colors, borderRadius: 6 }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${fmt(c.parsed.y, 2)}${suffix || ""}` } } },
        scales: { x: { ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 55 } }, y: { beginAtZero: true, max: pctMax ? 100 : undefined, title: { display: true, text: ytitle || yTitle(suffix, pctMax) } } } } });
    scaleX(id, labels.length);
  }


  /* ============ per-card model multi-select (compact popover) ============ */
  const MODEL_LIST = (function () {
    const s = [];
    const add = (m) => { if (m && !s.includes(m)) s.push(m); };
    (E.combos_models || []).forEach(add);
    (E.spec_by_model || []).forEach((m) => add(m.model));
    (E.batch_by_model || []).forEach((m) => add(m.model));
    (E.kv_cache_by_model || []).forEach((m) => add(m.model));
    return s;
  })();
  // each comparison card owns its own selection (modelPopover is shared from ui.js)
  const selModels = (typeof selectedFrom === "function") ? selectedFrom(MODEL_LIST) : new Set(MODEL_LIST);  // shared across tabs + sub-tabs
  const EMPTY = `<div class="empty">No models selected — pick at least one with “Models ▾”.</div>`;

  /* ============ EXPLORER (model-selectable; scatter + table) ============ */
  function renderExplorer() {
    const all = E.combos || [];
    if (!all.length) { document.getElementById("exp-baseline").innerHTML = `<div class="empty">No combination data yet — run the experiments.</div>`; return; }
    const baseList = (E.combos_models && E.combos_models.length)
      ? E.combos_models
      : [...new Set(all.map((c) => c.model).filter(Boolean))];
    const models = baseList;                                  // Explorer is single-model: its own dropdown lists every model
    const combosFor = (m) => all.filter((c) => (c.model || E.combos_target) === m);
    let cur = (typeof focusOrDefault === "function") ? focusOrDefault(models) : models[0];

    const sel = document.getElementById("exp-model-select");
    sel.innerHTML = models.map((m) => `<option ${m === cur ? "selected" : ""}>${m}</option>`).join("");
    if (typeof fitSelect === "function") fitSelect(sel);
    sel.onchange = (e) => { cur = e.target.value; if (typeof setFocusModel === "function") setFocusModel(cur); if (typeof fitSelect === "function") fitSelect(sel); draw(); };

    const STACK_COLORS = [C.gray, C.teal, C.blue, C.purple, C.amber, C.pink];

    function draw() {
      const combos = combosFor(cur);
      const baseline = combos.find((c) => c.precision === "bf16" && c.kv === "off" && !c.spec) || combos[0];
      const fully = combos.find((c) => c.spec && c.kv !== "off") || combos[combos.length - 1];
      const q4 = combos.find((c) => c.precision === "int4" && c.kv === "off" && !c.spec);
      const speedup = (c) => c.throughput_tps / baseline.throughput_tps;
      const memSave = (c) => (1 - c.peak_mem_mb / baseline.peak_mem_mb) * 100;
      // genuine best stacks (not "all techniques" — on small models speculative overhead isn't repaid)
      const best = combos.reduce((a, c) => (c.throughput_tps > a.throughput_tps ? c : a), combos[0]);
      const leanest = combos.reduce((a, c) => (c.peak_mem_mb < a.peak_mem_mb ? c : a), combos[0]);

      document.getElementById("exp-baseline").innerHTML =
        `<b>Baseline = zero optimizations</b> on <b>${cur}</b>: bf16 (full precision), no KV-quant, no speculation — <b>${fmt(baseline.throughput_tps, 0)} tok/s</b>, <b>${fmt(baseline.peak_mem_mb, 0)} MB</b>. Each stack adds optimizations on top; the KPIs show the <b>best measured stack</b> (stacking every technique isn't always fastest — speculative can cost more than it saves on small models).`;
      document.getElementById("exp-cards").innerHTML = [
        metric("Baseline (bf16)", `${fmt(baseline.throughput_tps, 0)} tok/s`, `${fmt(baseline.peak_mem_mb, 0)} MB · no optimizations`, false, "quantization"),
        metric("Fastest stack", `${fmt(speedup(best), 2)}×`, `${fmt(best.throughput_tps, 0)} tok/s · ${best.label}`, speedup(best) > 1, "throughput"),
        memSave(leanest) ? metric("Least memory", `${fmt(memSave(leanest), 0)}% less`, `${fmt(leanest.peak_mem_mb, 0)} MB · ${leanest.label}`, memSave(leanest) > 0, "gpu_memory") : "",
      ].filter(Boolean).join("");

      // ONE trade-off scatter: x = throughput, y = memory, one labelled point per stack
      chart("exp-scatter", { type: "scatter",
        data: { datasets: combos.map((c, i) => ({ label: c.label, data: [{ x: c.throughput_tps, y: c.peak_mem_mb }], backgroundColor: STACK_COLORS[i % STACK_COLORS.length], pointRadius: 8, pointHoverRadius: 10 })) },
        options: { plugins: { legend: { display: true, position: "bottom" }, tooltip: { callbacks: { label: (x) => ` ${x.dataset.label}: ${fmt(x.parsed.x, 0)} tok/s, ${fmt(x.parsed.y, 0)} MB` } } },
          scales: { x: { title: { display: true, text: "throughput (tok/s) → faster" }, beginAtZero: true }, y: { title: { display: true, text: "peak memory (MB) ↓ less" }, beginAtZero: true } } } });

      // tidy table: stack | throughput (+Δ) | memory (+Δ)
      const cols = [["Stack", (c) => c.label],
        ["Throughput", (c) => `${fmt(c.throughput_tps, 0)} tok/s`],
        ["vs baseline", (c) => (c === baseline ? "—" : `${speedup(c) >= 1 ? "" : ""}${fmt(speedup(c), 2)}×`)],
        ["Peak memory", (c) => `${fmt(c.peak_mem_mb, 0)} MB`],
        ["vs baseline", (c) => (c === baseline ? "—" : `${memSave(c) >= 0 ? "−" : "+"}${fmt(Math.abs(memSave(c)), 0)}%`)]];
      document.getElementById("exp-table").innerHTML =
        `<thead><tr>${cols.map((c) => `<th>${c[0]}</th>`).join("")}</tr></thead><tbody>` +
        combos.map((c) => `<tr>${cols.map((col) => `<td>${col[1](c)}</td>`).join("")}</tr>`).join("") + "</tbody>";

      // analysis
      const li = [];
      if (q4) li.push(`<b>Quantization (bf16→4-bit) is the big win:</b> ${fmt(speedup(q4), 2)}× faster, ${fmt(memSave(q4), 0)}% less memory — on its own.`);
      if (q4) {
        const kvc = combos.find((c) => c.precision === "int4" && c.kv !== "off" && !c.spec);
        const spc = combos.find((c) => c.precision === "int4" && c.kv === "off" && c.spec);
        if (kvc) li.push(`Adding <b>KV-quant</b>: ${fmt((kvc.throughput_tps / q4.throughput_tps - 1) * 100, 0)}% throughput vs 4-bit (memory ~unchanged at short context — see KV-cache tab).`);
        if (spc) li.push(`Adding <b>speculative</b>: ${fmt((spc.throughput_tps / q4.throughput_tps - 1) * 100, 0)}% vs 4-bit (overhead not repaid on this small target).`);
      }
      li.push(`<b>Combined vs baseline: ${fmt(speedup(fully), 2)}× throughput.</b> On ${cur} the gain is almost all from quantization; KV-quant &amp; speculative pay off on bigger models / long context. Switch the model above to compare.`);
      document.getElementById("exp-analysis").innerHTML = "<ul>" + li.map((x) => `<li>${x}</li>`).join("") + "</ul>";
      if (typeof fillInfo === "function") fillInfo();
    }
    draw();
  }

  /* ============ SPECULATIVE ============ */
  function renderSpeculative() {
    const XM = (E.spec_by_model || []).filter((m) => selModels.has(m.model));
    if (!XM.length) {
      ["spec-xm-speedup", "spec-xm-accept"].forEach((id) => charts[id] && charts[id].destroy());
      document.getElementById("spec-xm-cards").innerHTML = EMPTY;
      document.getElementById("spec-xm-table").innerHTML = "";
      document.getElementById("spec-xm-analysis").innerHTML = "";
      return;
    }
    const labels = XM.map((m) => m.model);
    const best = XM.reduce((a, b) => (a.speedup >= b.speedup ? a : b));
    const helped = XM.filter((m) => m.speedup > 1.03).length;
    document.getElementById("spec-xm-cards").innerHTML = [
      metric("Best speedup", `${fmt(best.speedup, 2)}×`, `${best.model} (draft ${best.draft})`, best.speedup > 1, "speculative"),
      metric("Models helped", `${helped}/${XM.length}`, "speedup > 1.03×", helped > 0, "speculative"),
    ].join("");
    chart("spec-xm-speedup", { type: "bar", data: { labels, datasets: [
      { label: "Without speculation", data: XM.map((m) => m.baseline_tps), backgroundColor: C.gray, borderRadius: 5 },
      { label: "With speculation", data: XM.map((m) => m.spec_tps), backgroundColor: C.teal, borderRadius: 5 }] },
      options: { plugins: { legend: { display: true } }, scales: { x: { ticks: { font: { size: 10 }, maxRotation: 55 } }, y: { beginAtZero: true, title: { display: true, text: "tok/s" } } } } });
    scaleX("spec-xm-speedup", XM.length, 80);
    bar("spec-xm-accept", labels, XM.map((m) => m.acceptance_rate * 100), XM.map(() => C.blue), "%", true);
    const cols = [["Model", (m) => `${m.model} <span class="pill">${m.params_b}B</span>`], ["Draft", (m) => m.draft || "—"],
      ["Baseline", (m) => fmt(m.baseline_tps, 0)], ["Spec", (m) => fmt(m.spec_tps, 0)], ["Speedup", (m) => fmt(m.speedup, 2) + "×"],
      ["Acceptance", (m) => fmt(m.acceptance_rate * 100, 0) + "%"], ["Stretch", (m) => fmt(m.tokens_per_target_pass, 2) + "×"]];
    document.getElementById("spec-xm-table").innerHTML = `<thead><tr>${cols.map((c) => `<th>${c[0]}</th>`).join("")}</tr></thead><tbody>` +
      XM.map((m) => `<tr>${cols.map((c) => `<td>${c[1](m)}</td>`).join("")}</tr>`).join("") + "</tbody>";
    document.getElementById("spec-xm-analysis").innerHTML = helped === 0
      ? `<ul><li><b>Speculation doesn't pay off on these small targets.</b> A 2–3B model is already cheap, so draft+verify overhead isn't repaid — all at/below 1×.</li>
         <li>It's a tool for <b>large, slow targets</b> (7B+) where one target pass is expensive and a tiny draft is nearly free. The honest "know when not to use it" result.</li></ul>`
      : `<ul><li><b>${helped}/${XM.length}</b> targets sped up; best ${best.model} at ${fmt(best.speedup, 2)}×. The win grows with the target-to-draft gap and acceptance.</li></ul>`;

    // per-model deep dive — list every model that has a deep-dive (its own draft)
    const dets = (E.spec_detail_by_model && E.spec_detail_by_model.length) ? E.spec_detail_by_model : (E.spec_detail ? [E.spec_detail] : []);
    const detCard = document.getElementById("spec-detail-card");
    if (!dets.length) { detCard.hidden = true; return; }
    detCard.hidden = false;
    document.getElementById("spec-story").innerHTML = `
      <p>A small draft proposes <b>k</b> tokens; the big model verifies them in one pass and keeps the correct prefix.</p>
      <ol><li><b>Draft</b> generates k tokens.</li><li><b>Verify</b> in one parallel pass.</li>
      <li><b>Accept</b> while <code>argmax(target)==draft</code> (greedy) or with <code>min(1, p_target/p_draft)</code> (sampling).</li>
      <li><b>Correct</b> one token at the first miss, free.</li><li><b>Repeat</b> — 1…k+1 tokens per expensive pass, identical output.</li></ol>`;

    const dSel = document.getElementById("spec-detail-select");
    if (dSel) {
      const dDefault = (typeof focusOrDefault === "function") ? focusOrDefault(dets.map((d) => d.target)) : (E.detail_target || dets[0].target);
      dSel.innerHTML = dets.map((d) => `<option ${d.target === dDefault ? "selected" : ""}>${d.target}</option>`).join("");
      if (typeof fitSelect === "function") fitSelect(dSel);
      dSel.onchange = (e) => { if (typeof setFocusModel === "function") setFocusModel(e.target.value); if (typeof fitSelect === "function") fitSelect(dSel); drawDetail(e.target.value); };
    }

    function drawDetail(model) {
      const det = dets.find((d) => d.target === model) || dets[0];
      document.getElementById("spec-detail-target").textContent = det.target || "";
      const ks = [...(det.k_sweep || [])].sort((a, b) => a.k - b.k);
      const base = det.baseline || {};
      const bestK = ks.reduce((a, b) => (a.throughput_tps >= b.throughput_tps ? a : b), ks[0] || {});
      document.getElementById("spec-k-cards").innerHTML = [
        metric("Best stretch", `${fmt(bestK.tokens_per_target_pass, 2)}×`, `tokens/target pass at k=${bestK.k}`, true, "acceptance"),
        metric("Acceptance", `${fmt(bestK.acceptance_rate * 100, 0)}%`, `proposed, k=${bestK.k}`, true, "acceptance"),
        base.throughput_tps ? metric("Speedup", `${fmt(bestK.throughput_tps / base.throughput_tps, 2)}×`, "vs no speculation", bestK.throughput_tps > base.throughput_tps, "throughput") : "",
      ].filter(Boolean).join("");
      if (ks.length) chart("spec-kacc", { type: "bar", data: { labels: ks.map((r) => "k=" + r.k),
        datasets: [{ label: "acceptance %", data: ks.map((r) => r.acceptance_rate * 100), backgroundColor: C.blue, borderRadius: 5, yAxisID: "y" },
          { label: "tokens/pass", type: "line", data: ks.map((r) => r.tokens_per_target_pass), borderColor: C.teal, backgroundColor: C.teal, yAxisID: "y1", tension: 0.25 }] },
        options: { scales: { y: { position: "left", beginAtZero: true, max: 100, title: { display: true, text: "acceptance %" } }, y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: "tokens / target pass" } } } } });
      bar("spec-ktps", ks.map((r) => "k=" + r.k), ks.map((r) => r.throughput_tps), ks.map(() => C.teal), " tok/s");
      // token source per expensive target pass: accepted draft tokens (free) + 1 corrected by the target
      const draftTok = Math.max(0, (bestK.tokens_per_target_pass || 1) - 1), targetTok = 1;
      chart("spec-donut", { type: "doughnut", data: { labels: ["From draft (free)", "From target"], datasets: [{ data: [draftTok, targetTok], backgroundColor: [C.teal, C.gray], borderWidth: 0 }] },
        options: { plugins: { legend: { position: "bottom" }, tooltip: { callbacks: { label: (x) => ` ${x.label}: ${fmt(x.parsed, 2)} tokens/pass` } } } } });
      const ps = det.prompt_sweep || [];
      bar("spec-prompt", ps.map((r) => r.prompt_type), ps.map((r) => r.acceptance_rate * 100), ps.map(() => C.amber), "%", true);
      if (ps.length) { const hi = [...ps].sort((a, b) => b.acceptance_rate - a.acceptance_rate)[0], lo = [...ps].sort((a, b) => a.acceptance_rate - b.acceptance_rate)[0];
        document.getElementById("spec-detail-analysis").innerHTML = `<ul><li><b>${hi.prompt_type}</b> text accepts most (${fmt(hi.acceptance_rate * 100, 0)}%) — predictable output is easy to guess.</li><li><b>${lo.prompt_type}</b> is hardest (${fmt(lo.acceptance_rate * 100, 0)}%). That's where speculation shines vs struggles.</li></ul>`; }
      if (typeof fillInfo === "function") fillInfo();
    }
    drawDetail((dSel && dSel.value) ? dSel.value : (E.detail_target || dets[0].target));
  }

  /* ============ KV-CACHE ============ */
  function renderKV() {
    // --- conceptual explanation + the isolated-cache demonstration ---
    document.getElementById("kv-explain").innerHTML =
      `<b>Two different things, often confused:</b><br>` +
      `• <b>KV caching</b> is <b>always on</b> — it's what makes generation fast (the model reuses past keys/values instead of recomputing them every token). You don't toggle it off.<br>` +
      `• <b>KV-cache quantization</b> (the toggle here) <b>compresses that cache to save memory</b>. It does <b>not</b> speed things up — it adds a little overhead, so it's slightly <i>slower</i>. It only saves meaningful memory when the cache is large, i.e. at <b>long context</b>.`;
    // --- per-model deep dive (cards 1 & 2), driven by the Model dropdown ---
    const detList = (E.kv_cache_detail_by_model && E.kv_cache_detail_by_model.length) ? E.kv_cache_detail_by_model : (E.kv_cache_detail ? [E.kv_cache_detail] : []);
    const precList = (E.kv_precision_by_model && E.kv_precision_by_model.length) ? E.kv_precision_by_model : (E.kv_precision ? [E.kv_precision] : []);
    const kvSel = document.getElementById("kv-detail-select");
    if (kvSel && detList.length) {
      const kvDefault = (typeof focusOrDefault === "function") ? focusOrDefault(detList.map((d) => d.model)) : (E.detail_target || detList[0].model);
      kvSel.innerHTML = detList.map((d) => `<option ${d.model === kvDefault ? "selected" : ""}>${d.model}</option>`).join("");
      if (typeof fitSelect === "function") fitSelect(kvSel);
      kvSel.onchange = (e) => { if (typeof setFocusModel === "function") setFocusModel(e.target.value); if (typeof fitSelect === "function") fitSelect(kvSel); drawKVDetail(e.target.value); };
    }

    function drawKVDetail(model) {
      const kd = detList.find((d) => d.model === model) || detList[0];
      const kp = precList.find((p) => p.model === model) || precList[0];
      const h1 = document.getElementById("kv-cache-detail-title"); if (h1 && kd) h1.textContent = `The KV cache itself: memory vs context — full vs 4-bit (${kd.model})`;
      const h2 = document.getElementById("kv-precision-title"); if (h2 && kp) h2.textContent = `Cache memory vs output fidelity, by KV precision (${kp.model})`;
      if (kd && kd.points && kd.points.length) {
        const p = kd.points, last = p[p.length - 1], sav4 = 100 - (last.q4_mb / last.full_mb) * 100;
        document.getElementById("kvc-cards").innerHTML = [
          metric(`KV cache @ ${last.ctx} (full)`, `${fmt(last.full_mb, 0)} MB`, `for ${kd.model} with ${fmt(kd.weights_mb, 0)} MB of weights`, false, "kv_cache"),
          metric(`Same cache, 4-bit`, `${fmt(last.q4_mb, 0)} MB`, `${fmt(sav4, 0)}% less memory`, true, "kv_quant"),
          metric("Cache grows with context", `~${fmt(last.full_mb / p[0].full_mb, 1)}×`, `${p[0].ctx} → ${last.ctx}`, false, "kv_cache"),
        ].join("");
        chart("kv-cache-detail", { type: "line",
          data: { labels: p.map((x) => x.ctx), datasets: [
            { label: "Full-precision KV cache", data: p.map((x) => x.full_mb), borderColor: C.gray, backgroundColor: C.gray, tension: 0.25, pointRadius: 4 },
            { label: "4-bit KV cache", data: p.map((x) => x.q4_mb), borderColor: C.teal, backgroundColor: C.teal, tension: 0.25, pointRadius: 4 }] },
          options: { plugins: { legend: { display: true } }, scales: { x: { title: { display: true, text: "context length" } }, y: { beginAtZero: true, title: { display: true, text: "KV cache memory (MB)" } } } } });
        const perTok = last.full_mb / last.tokens, W = kd.weights_mb;
        const ctxPts = [2000, 8000, 16000, 32000, 64000, 128000], measuredMax = last.tokens;
        chart("kv-scale", { type: "line",
          data: { labels: ctxPts.map((t) => (t / 1000) + "k"), datasets: [
            { label: "KV cache (1 request)", data: ctxPts.map((t) => Math.round(perTok * t)), borderColor: C.amber, backgroundColor: C.amber, tension: 0.2, pointRadius: 3 },
            { label: "KV cache × 10 concurrent", data: ctxPts.map((t) => Math.round(perTok * t * 10)), borderColor: C.pink, backgroundColor: C.pink, borderDash: [4, 3], tension: 0.2, pointRadius: 2 },
            { label: "Model weights (fixed, 4-bit)", data: ctxPts.map(() => Math.round(W)), borderColor: C.gray, backgroundColor: C.gray, borderDash: [6, 4], pointRadius: 0 }] },
          options: { plugins: { legend: { display: true }, tooltip: { callbacks: { label: (x) => ` ${x.dataset.label}: ${fmt(x.parsed.y, 0)} MB${ctxPts[x.dataIndex] > measuredMax ? " (projected)" : ""}` } } },
            scales: { x: { title: { display: true, text: "context length (tokens)" } }, y: { type: "logarithmic", title: { display: true, text: "memory (MB, log scale)" } } } } });
        const crossTok = Math.round(W / perTok);
        document.getElementById("kvc-analysis").innerHTML = `<ul>
          <li><b>KV caching (the cache itself) is always worth it</b> — but for <b>speed</b>, not memory. It stops the model recomputing attention over every past token each step (O(n²) → O(n)). It's always on; you never turn it off.</li>
          <li><b>The cache is NOT always small.</b> It grows ~${fmt(perTok * 1000, 0)} MB per 1k tokens. For ${kd.model} it passes the ${fmt(W, 0)} MB of (4-bit) weights at only ~<b>${fmt(crossTok / 1000, 1)}k tokens</b>, and at 128k it's ~${fmt(perTok * 128000 / 1024, 1)} GB — far bigger than the model. With <b>10 concurrent users</b> it's 10× that. In real serving the cache, not the weights, is the bottleneck.</li>
          <li><b>That's exactly why KV-cache quantization (and vLLM's PagedAttention) exist</b> — to tame cache memory at long context / high concurrency, cutting it ~${fmt(sav4, 0)}% (4-bit).</li>
          <li><b>Why a short prompt shows no effect:</b> at ${p[0].ctx} the cache is only ${fmt(p[0].full_mb, 0)} MB vs ${fmt(W / 1024, 1)} GB of weights — negligible, so quantizing it does nothing visible (and costs a little speed). Correct behavior for that regime.</li>
        </ul>`;
      }
      if (kp && kp.rows) {
        const r = kp.rows, labelOf = (x) => (x.kv === "full" ? "Full (16-bit)" : x.kv + "-bit");
        const q8 = r.find((x) => x.kv === 8), q4 = r.find((x) => x.kv === 4);
        const f8 = q8 ? q8.fidelity : 0, f4 = q4 ? q4.fidelity : 0;
        document.getElementById("kvp-cards").innerHTML = [
          metric("8-bit KV", f8 >= 0.999 ? "lossless" : `${fmt(f8 * 100, 0)}% match`, f8 >= 0.999 ? "half the cache, identical output → the safe choice" : "half the cache, near-identical output", f8 >= 0.95, "kv_quant"),
          metric("4-bit KV", `${fmt(f4 * 100, 0)}% match`, f4 < 0.5 ? "quarter the cache, but output broke here" : "quarter the cache", f4 >= 0.95, "kv_quant"),
          metric("Context", `${fmt(kp.context_tokens, 0)} tok`, "prompt used for this test", false, "kv_cache"),
        ].join("");
        chart("kv-precision", { type: "bar",
          data: { labels: r.map(labelOf), datasets: [
            { label: "Cache memory (% of full)", data: r.map((x) => x.mem_pct), backgroundColor: C.blue, borderRadius: 5 },
            { label: "Output fidelity (% match vs full)", data: r.map((x) => Math.round((x.fidelity || 0) * 100)), backgroundColor: C.teal, borderRadius: 5 }] },
          options: { plugins: { legend: { display: true }, tooltip: { callbacks: { label: (x) => ` ${x.dataset.label}: ${fmt(x.parsed.y, 0)}%` } } },
            scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: "% (of full)" } } } } });
        document.getElementById("kvp-analysis").innerHTML = `<ul>
          <li>${f8 >= 0.999 ? `<b>8-bit KV is lossless here:</b> half the cache memory and output <b>identical</b> to full precision (100% match).` : `<b>8-bit KV is the safe choice:</b> half the cache for <b>${fmt(f8 * 100, 0)}%</b> output match — very close to full precision.`} Use this whenever you quantize the cache.</li>
          <li>${f4 < 0.5 ? `<b>4-bit KV was too aggressive:</b> a quarter of the memory, but the generated text diverged almost immediately (~${fmt(f4 * 100, 0)}% match) — attention got too noisy. (Real systems keep recent/important tokens in higher precision.)` : `<b>4-bit KV held up:</b> a quarter of the memory at ${fmt(f4 * 100, 0)}% match.`}</li>
          <li><b>The lesson:</b> KV precision is a memory-vs-quality dial — lower bits = predictably less memory, but quality can fall off a cliff. For ${kp.model} the practical floor is <b>8-bit</b>.</li>
        </ul>`;
      }
    }
    if (detList.length) drawKVDetail((kvSel && kvSel.value) ? kvSel.value : (E.detail_target || detList[0].model));

    const KVM = (E.kv_cache_by_model || []).filter((m) => selModels.has(m.model));
    if (!KVM.length) { ["kv-xm", "kv-growth"].forEach((id) => charts[id] && charts[id].destroy()); document.getElementById("kv-analysis").innerHTML = EMPTY; return; }
    const mb = (m, ctx, prec) => m.bytes_per_token[prec] * ctx / (1024 * 1024);
    const bigCtx = 32000, labels = KVM.map((m) => m.model);
    chart("kv-xm", { type: "bar", data: { labels, datasets: [
      { label: "Full precision", data: KVM.map((m) => Math.round(mb(m, bigCtx, "full"))), backgroundColor: C.gray, borderRadius: 5 },
      { label: "8-bit", data: KVM.map((m) => Math.round(mb(m, bigCtx, "8bit"))), backgroundColor: C.blue, borderRadius: 5 },
      { label: "4-bit", data: KVM.map((m) => Math.round(mb(m, bigCtx, "4bit"))), backgroundColor: C.teal, borderRadius: 5 }] },
      options: { plugins: { legend: { display: true } }, scales: { x: { ticks: { font: { size: 10 }, maxRotation: 55 } }, y: { beginAtZero: true, title: { display: true, text: "KV cache @ 32k tokens (MB)" } } } } });
    scaleX("kv-xm", KVM.length, 80);
    const ctxs2 = [2000, 8000, 32000, 128000];
    chart("kv-growth", { type: "line", data: { labels: ctxs2.map((t) => t / 1000 + "k"), datasets: KVM.map((m, i) => ({ label: m.model, data: ctxs2.map((c) => Math.round(mb(m, c, "full"))), borderColor: palette[i % palette.length], backgroundColor: palette[i % palette.length], tension: 0.25, pointRadius: 3 })) },
      options: { plugins: { legend: { display: true } }, scales: { x: { title: { display: true, text: "context length" } }, y: { type: "logarithmic", title: { display: true, text: "full KV cache (MB, log)" } } } } });
    const big = KVM.reduce((a, b) => (a.bytes_per_token.full >= b.bytes_per_token.full ? a : b));
    document.getElementById("kv-analysis").innerHTML = `<ul>
      <li>These are <b>exact</b> KV-cache sizes derived from each model's config (layers × KV-heads × head-dim) — not noisy allocator readings.</li>
      <li><b>${big.model}</b> has the heaviest cache (~${fmt(big.bytes_per_token.full / 1024, 1)} KB/token; ${big.layers} layers, ${big.kv_heads} KV-heads). Architecture matters: more KV-heads/layers = bigger cache. 8-bit halves it, 4-bit quarters it.</li>
    </ul>`;
  }

  /* ============ BATCHING ============ */
  function renderBatching() {
    const B = (E.batch_by_model || []).filter((r) => selModels.has(r.model));
    if (!B.length) {
      ["b-agg", "b-stream", "b-mem"].forEach((id) => charts[id] && charts[id].destroy());
      document.getElementById("b-cards").innerHTML = EMPTY;
      document.getElementById("b-analysis").innerHTML = "";
      return;
    }
    const models = [...new Set(B.map((r) => r.model))], sizes = [...new Set(B.map((r) => r.batch_size))].sort((a, b) => a - b);
    const at = (m, bs, key) => { const r = B.find((x) => x.model === m && x.batch_size === bs); return r ? r[key] : null; };
    let bestAgg = { v: 0 }, bestScale = { v: 0 };
    models.forEach((m) => { const top = Math.max(...sizes.map((bs) => at(m, bs, "agg_tps") || 0)); const lo = at(m, sizes[0], "agg_tps") || 1, hi = at(m, sizes[sizes.length - 1], "agg_tps") || 0; if (top > bestAgg.v) bestAgg = { v: top, m }; if (hi / lo > bestScale.v) bestScale = { v: hi / lo, m }; });
    document.getElementById("b-cards").innerHTML = [
      metric("Peak throughput", `${fmt(bestAgg.v, 0)} tok/s`, `${bestAgg.m} at batch ${sizes[sizes.length - 1]}`, true, "batching"),
      metric("Best scaling", `${fmt(bestScale.v, 1)}×`, `${bestScale.m} · batch 1→${sizes[sizes.length - 1]}`, true, "batching"),
    ].join("");
    const lines = (id, key, ytext) => chart(id, { type: "line", data: { labels: sizes, datasets: models.map((m, i) => ({ label: m, data: sizes.map((bs) => at(m, bs, key)), borderColor: palette[i % palette.length], tension: 0.25, pointRadius: 3 })) }, options: { plugins: { legend: { display: true } }, scales: { x: { title: { display: true, text: "batch size" } }, y: { beginAtZero: true, title: { display: true, text: ytext } } } } });
    lines("b-agg", "agg_tps", "aggregate tokens / sec"); lines("b-stream", "per_stream_tps", "per-stream tokens / sec"); lines("b-mem", "peak_mem_mb", "peak memory (MB)");
    document.getElementById("b-analysis").innerHTML = `<ul><li><b>${bestScale.m}</b> scales best — ${fmt(bestScale.v, 1)}× aggregate throughput from batch 1→${sizes[sizes.length - 1]}.</li><li>Per-stream speed falls and memory rises with batch — the throughput-vs-latency-vs-memory trade-off. Static cousin of vLLM continuous batching.</li></ul>`;
  }

  /* ============ QUANTIZATION (from the 7B study in data.js) ============ */
  function renderQuant() {
    const Q = E.quant_by_model || [];
    if (!Q.length) return renderQuant7B();                       // fall back to the legacy single-model 7B study
    const models = [...new Set(Q.map((q) => q.model))];
    const sel = document.getElementById("quant-select");
    const PREC = { bf16: "bf16 (16-bit)", int8: "8-bit", int4: "4-bit" };
    if (sel) {
      const qDefault = (typeof focusOrDefault === "function") ? focusOrDefault(models) : (E.detail_target || models[0]);
      sel.innerHTML = models.map((m) => `<option ${m === qDefault ? "selected" : ""}>${m}</option>`).join("");
      if (typeof fitSelect === "function") fitSelect(sel);
      sel.onchange = (e) => { if (typeof setFocusModel === "function") setFocusModel(e.target.value); if (typeof fitSelect === "function") fitSelect(sel); drawQuant(e.target.value); };
    }
    function drawQuant(model) {
      const rows = Q.filter((q) => q.model === model).sort((a, b) => b.bits - a.bits);  // bf16 -> 4-bit
      const labels = rows.map((r) => PREC[r.precision] || r.precision);
      const tps = (r) => r.throughput_tps, mem = (r) => r.peak_mem_mb, ppl = (r) => r.perplexity;
      const hi = rows[0], lo = rows[rows.length - 1];            // hi = bf16, lo = fewest bits
      document.getElementById("quant-cards").innerHTML = [
        metric("Throughput gain", `${fmt(tps(lo) / tps(hi), 1)}×`, `${PREC[lo.precision]} vs ${PREC[hi.precision]}`, true, "throughput"),
        metric("Memory saved", `${fmt((1 - mem(lo) / mem(hi)) * 100, 0)}%`, `${PREC[lo.precision]} vs ${PREC[hi.precision]}`, true, "gpu_memory"),
        (ppl(hi) && ppl(lo)) ? metric("Quality cost", `+${fmt((ppl(lo) / ppl(hi) - 1) * 100, 1)}%`, `perplexity, ${PREC[lo.precision]} vs ${PREC[hi.precision]}`, Math.abs(ppl(lo) / ppl(hi) - 1) < 0.05, "perplexity") : "",
      ].filter(Boolean).join("");
      chart("quant-pareto", { type: "scatter", data: { datasets: rows.map((r, i) => ({ label: labels[i], data: [{ x: tps(r), y: ppl(r) }], backgroundColor: palette[i % palette.length], pointRadius: 8, pointHoverRadius: 10 })) },
        options: { plugins: { legend: { display: true, position: "bottom" } }, scales: { x: { title: { display: true, text: "throughput tok/s →" }, beginAtZero: true }, y: { title: { display: true, text: "perplexity (lower better)" } } } } });
      bar("quant-ppl", labels, rows.map(ppl), labels.map((_, i) => palette[i % palette.length]), "", false, "perplexity (lower better)");
      bar("quant-tps", labels, rows.map(tps), labels.map((_, i) => palette[i % palette.length]), " tok/s");
      bar("quant-mem", labels, rows.map(mem), labels.map((_, i) => palette[i % palette.length]), " MB");
      const has8 = rows.some((r) => r.precision === "int8");
      document.getElementById("quant-analysis").innerHTML = `<ul>
        <li><b>4-bit gives ${fmt(tps(lo) / tps(hi), 1)}× throughput and ${fmt((1 - mem(lo) / mem(hi)) * 100, 0)}% less memory</b> than bf16 on ${model}${(ppl(hi) && ppl(lo)) ? `, for ~${fmt((ppl(lo) / ppl(hi) - 1) * 100, 1)}% higher perplexity` : ""}.</li>
        ${has8 ? `<li>8-bit sits in between — near-lossless quality at about half the memory.</li>` : `<li>8-bit (between bf16 and 4-bit) is added when you run full mode.</li>`}
        <li>Switch the model above to compare. Perplexity = exp(mean per-token NLL) over a fixed passage.</li>
      </ul>`;
    }
    drawQuant((sel && sel.value) ? sel.value : (E.detail_target || models[0]));
  }

  function renderQuant7B() {                                     // legacy single-model 7B study from data.js
    const runs = (BD.runs || []).filter((r) => r.manifest.study === "quantization");
    if (!runs.length) { document.getElementById("panel-quantization").querySelector(".card").innerHTML = `<div class="empty">No quantization study found (run configs/quantization.yaml).</div>`; return; }
    const s = [...runs].sort((a, b) => (b.manifest.params.bits || 0) - (a.manifest.params.bits || 0));
    const labels = s.map((r) => r.manifest.params.precision || r.manifest.label);
    const tps = (r) => r.aggregates.system_throughput_tps, mem = (r) => r.aggregates.compute?.peak_accel_mem_mb, ppl = (r) => r.aggregates.quality?.perplexity;
    const hi = s[0], lo = s[s.length - 1];
    document.getElementById("quant-cards").innerHTML = [
      metric("Throughput gain", `${fmt(tps(lo) / tps(hi), 1)}×`, `4-bit vs ${labels[0]}`, true, "throughput"),
      mem(hi) && mem(lo) ? metric("Memory saved", `${fmt((1 - mem(lo) / mem(hi)) * 100, 0)}%`, "4-bit vs " + labels[0], true, "gpu_memory") : "",
      ppl(hi) && ppl(lo) ? metric("Quality lost", `+${fmt((ppl(lo) / ppl(hi) - 1) * 100, 1)}%`, "perplexity", Math.abs(ppl(lo) / ppl(hi) - 1) < 0.03, "perplexity") : "",
    ].filter(Boolean).join("");
    chart("quant-pareto", { type: "scatter", data: { datasets: s.map((r, i) => ({ label: labels[i], data: [{ x: tps(r), y: ppl(r) }], backgroundColor: palette[i % palette.length], pointRadius: 7 })) },
      options: { scales: { x: { title: { display: true, text: "throughput tok/s →" } }, y: { title: { display: true, text: "perplexity (lower better)" } } } } });
    bar("quant-ppl", labels, s.map(ppl), labels.map((_, i) => palette[i % palette.length]), "", false, "perplexity (lower better)");
    bar("quant-tps", labels, s.map(tps), labels.map((_, i) => palette[i % palette.length]), " tok/s");
    bar("quant-mem", labels, s.map(mem), labels.map((_, i) => palette[i % palette.length]), " MB");
    const cols = [["Precision", (r, i) => labels[i]], ["Throughput", (r) => fmt(tps(r), 1)], ["GPU mem", (r) => fmt(mem(r), 0) + " MB"], ["Perplexity", (r) => fmt(ppl(r), 3)]];
    document.getElementById("quant-analysis").innerHTML = `<ul><li>4-bit gives <b>${fmt(tps(lo) / tps(hi), 1)}×</b> throughput and big memory savings for a small perplexity cost; 8-bit is near-lossless. (Measured on Qwen2.5-7B.)</li></ul>`;
  }

  /* ============ tab controller ============ */
  const renderers = { explorer: renderExplorer, speculative: renderSpeculative, kvcache: renderKV, batching: renderBatching, quantization: renderQuant };
  const done = {};
  let curTab = "explorer";
  function activate(tab) {
    curTab = tab;
    document.querySelectorAll("#subtabs button").forEach((b) => b.classList.toggle("active", b.getAttribute("data-tab") === tab));
    document.querySelectorAll(".panel").forEach((p) => { p.hidden = p.id !== "panel-" + tab; });
    if (!done[tab]) { try { renderers[tab](); } catch (e) { console.error(tab, e); } done[tab] = true; if (typeof fillInfo === "function") fillInfo(); }
  }
  document.getElementById("subtabs").addEventListener("click", (e) => { const b = e.target.closest("button[data-tab]"); if (b) activate(b.getAttribute("data-tab")); });
  const popHandles = [];
  function onSharedModels() {                                 // one selection shared by all 3 comparison sub-tabs (+ other tabs via storage)
    if (typeof syncExcludedFrom === "function") syncExcludedFrom(MODEL_LIST, selModels);
    popHandles.forEach((p) => p && p.sync());
    done[curTab] = false; activate(curTab);
  }
  popHandles.push(modelPopover("spec-modelpop", MODEL_LIST, selModels, onSharedModels));
  popHandles.push(modelPopover("kv-modelpop", MODEL_LIST, selModels, onSharedModels));
  popHandles.push(modelPopover("batch-modelpop", MODEL_LIST, selModels, onSharedModels));
  activate("explorer");
  const fm = document.getElementById("footer-meta"); if (fm) fm.textContent = `Optimizations · mode ${E.mode || "?"}`;
})();
