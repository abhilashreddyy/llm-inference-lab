/* Models page: interactive comparison with size-class filter + per-model selection. */
(function () {
  const D = window.MODELS_DATA || { models: [] };
  const ALL = D.models || [];

  // Optimization data (from the experiments) — lets this tab vary the optimization axis too.
  const COMBOS = (window.EXP_DATA || {}).combos || [];
  const OPT_MODELS = [...new Set(COMBOS.map((c) => c.model))];
  const OPT_STACKS = [];
  COMBOS.forEach((c) => { if (!OPT_STACKS.find((s) => s.label === c.label)) OPT_STACKS.push({ label: c.label, precision: c.precision, kv: c.kv, spec: c.spec }); });
  const comboOf = (model, stack) => COMBOS.find((c) => c.model === model && c.label === stack.label);
  let optStackIdx = OPT_STACKS.length > 1 ? 1 : 0;           // default to the first real optimization (stack 0 = the bf16 baseline we compare against)
  const optSelected = (typeof selectedFrom === "function") ? selectedFrom(OPT_MODELS) : new Set(OPT_MODELS);  // shared across tabs
  const optCharts = {};                                       // its charts, separate from the comparison charts
  if (window.Chart) { Chart.defaults.color = "#93a1b5"; Chart.defaults.borderColor = "rgba(36,48,73,0.6)"; Chart.defaults.maintainAspectRatio = false; }

  const PENDING = D.pending || [];
  const TOTAL = D.total_planned || ALL.length;
  const progressHtml = () => PENDING.length
    ? `<div class="progress-banner"><span class="dot"></span>Evaluating models — <b>${ALL.length}</b> of <b>${TOTAL}</b> done · still running: ${PENDING.join(", ")} <span class="muted">— refresh to update</span></div>`
    : `<div class="progress-banner done"><span class="dot"></span>All <b>${TOTAL}</b> models evaluated.</div>`;

  if (!ALL.length) { // no models yet — show progress in place of the pending box
    const p = document.getElementById("pending");
    if (p) p.innerHTML = progressHtml();
    return;
  }

  const fmt = (n, d = 0) => (n == null ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const pct = (x) => (x == null ? "—" : (x * 100).toFixed(1) + "%");

  // Wilson 95% confidence interval for a proportion x/n -> [lowPct, highPct]
  function wilson(x, n) {
    if (!n) return null;
    const z = 1.96, p = x / n, z2 = z * z;
    const c = (p + z2 / (2 * n)) / (1 + z2 / n);
    const h = (z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n))) / (1 + z2 / n);
    return [Math.max(0, c - h) * 100, Math.min(1, c + h) * 100];
  }
  const ciStr = (x, n) => { const ci = wilson(x, n); return ci ? `${ci[0].toFixed(0)}–${ci[1].toFixed(0)}%` : "—"; };
  // largest test N present, to decide if we warn about small samples
  const maxN = Math.max(0, ...ALL.flatMap((m) => [m.humaneval_n || 0, m.gsm8k_n || 0]));

  // Chart.js plugin: draw 95% CI whiskers on grouped bars (dataset.ci = [[lo,hi],...]).
  const ciPlugin = {
    id: "ci",
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((ds, di) => {
        if (!ds.ci) return;
        chart.getDatasetMeta(di).data.forEach((bar, i) => {
          const ci = ds.ci[i]; if (!ci) return;
          const x = bar.x, yLo = chart.scales.y.getPixelForValue(ci[0]), yHi = chart.scales.y.getPixelForValue(ci[1]);
          ctx.save(); ctx.strokeStyle = "rgba(230,237,246,0.85)"; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(x, yLo); ctx.lineTo(x, yHi);
          ctx.moveTo(x - 4, yLo); ctx.lineTo(x + 4, yLo); ctx.moveTo(x - 4, yHi); ctx.lineTo(x + 4, yHi);
          ctx.stroke(); ctx.restore();
        });
      });
    },
  };
  const kindColor = () => "#5b8cff";                        // one standard bar color for all models

  // 4-bit end-to-end throughput from the optimization run (same source as the Optimizations tab)
  const expTput4 = (label) => {
    const E = window.EXP_DATA || {};
    const c = (E.combos || []).find((x) => x.model === label && String(x.precision) === "int4" && String(x.kv) === "off" && !x.spec);
    if (c) return c.throughput_tps;
    const q = (E.quant_by_model || []).find((x) => x.model === label && x.precision === "int4");
    return q ? q.throughput_tps : null;
  };

  const selected = (typeof selectedFrom === "function") ? selectedFrom(ALL.map((m) => m.label)) : new Set(ALL.map((m) => m.label));  // shared across tabs
  let charts = [];

  document.getElementById("pending")?.remove();
  // one comparison card: a persistent controls header (Models ▾) + a body render() fills.
  document.getElementById("models-body").innerHTML = `
    <section class="card">
      <div class="models-controls">
        <div class="modelpop" id="models-pop"></div>
      </div>
      <div id="models-results"></div>
    </section>
    <div id="opt-card-host"></div>`;

  const popCtl = (typeof modelPopover === "function")
    ? modelPopover("models-pop", ALL.map((m) => m.label), selected, () => { syncExcludedFrom(ALL.map((m) => m.label), selected); render(); }, { label: "Models" })
    : null;

  const metric = (lbl, val, sub, good, key) =>
    `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${lbl}</div><div class="val ${good ? "good" : ""}">${val}</div>${sub ? `<div class="sub">${sub}</div>` : ""}</div>`;

  function yTitle(suffix, pctMode) {
    if (pctMode) return "%";
    const s = (suffix || "").trim();
    if (s.includes("tok/s")) return "tokens / sec";
    if (s.includes("MB")) return "memory (MB)";
    if (s.includes("ms")) return "milliseconds";
    return s;
  }
  function bar(id, M, valFn, suffix, pctMode) {
    const el = document.getElementById(id);
    if (!el) return;
    const c = new Chart(el, {
      type: "bar",
      data: { labels: M.map((m) => m.label), datasets: [{ data: M.map((m) => { const v = valFn(m); return pctMode && v != null ? v * 100 : v; }), backgroundColor: M.map(kindColor), borderRadius: 6 }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (x) => ` ${fmt(x.parsed.y, 1)}${suffix}` } } },
        scales: { x: { ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 55 } }, y: { beginAtZero: true, max: pctMode ? 100 : undefined, title: { display: true, text: yTitle(suffix, pctMode) } } } },
    });
    charts.push(c);
    el.style.minWidth = M.length > 6 ? (M.length * 58) + "px" : "";   // scroll horizontally when many models
  }

  function render() {
    charts.forEach((c) => c.destroy()); charts = [];
    const M = ALL.filter((m) => selected.has(m.label)).sort((a, b) => (b.params_b || 0) - (a.params_b || 0));
    const results = document.getElementById("models-results");
    if (!M.length) { results.innerHTML = `<div class="empty" style="padding:24px 0">Select at least one model to compare.</div>`; return; }

    // Canonical speed = end-to-end throughput at 4-bit, sourced from the SAME optimization
    // run the Optimizations tab uses, so the number matches everywhere (no decode-vs-throughput drift).
    M.forEach((m) => { const t = expTput4(m.label); m._spd = (t != null ? t : m.decode_tps); });

    const best = (k) => M.filter((m) => m[k] != null).reduce((a, b) => (a[k] >= b[k] ? a : b), { [k]: -1 });
    const min = (k) => M.filter((m) => m[k] != null).reduce((a, b) => (a[k] <= b[k] ? a : b), { [k]: 1e9 });
    const bc = best("humaneval"), bm = best("gsm8k"), bf = best("_spd"), sm = min("weights_mb");
    const cards = [
      bc.humaneval >= 0 ? metric("Best coder", pct(bc.humaneval), `${bc.label} · HumanEval`, true, "pass@1") : "",
      bm.gsm8k >= 0 ? metric("Best at math", pct(bm.gsm8k), `${bm.label} · GSM8K`, true, "gsm8k") : "",
      bf._spd >= 0 ? metric("Fastest", `${fmt(bf._spd, 0)} tok/s`, bf.label, true, "throughput") : "",
      sm.weights_mb < 1e9 ? metric("Smallest", `${fmt(sm.weights_mb / 1024, 1)} GB`, sm.label, true, "gpu_memory") : "",
    ].filter(Boolean).join("");

    results.innerHTML = `
        <div class="metric-row">${cards}</div>
        <div data-info-corner="quality"><h3>Quality by model — coding vs math (% correct, with 95% CI)</h3><canvas id="m-quality"></canvas></div>
        <div class="grid-2">
          <div data-info-corner="throughput"><h3>Speed — throughput at 4-bit (tok/s)</h3><canvas id="m-speed"></canvas></div>
          <div data-info-corner="gpu_memory"><h3>Memory — weights (MB)</h3><canvas id="m-mem"></canvas></div>
        </div>
        <h3 style="margin-top:22px">Full comparison — all metrics</h3>
        <div class="table-scroll"><table id="m-table"></table></div>`;

    // grouped: coding vs math per model, with legend + 95% CI whiskers + counts in tooltip
    charts.push(new Chart(document.getElementById("m-quality"), { type: "bar",
      data: { labels: M.map((m) => m.label), datasets: [
        { label: "Coding (HumanEval pass@1)", data: M.map((m) => (m.humaneval != null ? m.humaneval * 100 : null)), backgroundColor: "#5b8cff", borderRadius: 5,
          ci: M.map((m) => wilson(m.humaneval_passed, m.humaneval_n)), cnt: M.map((m) => (m.humaneval_n ? `${m.humaneval_passed}/${m.humaneval_n}` : "")) },
        { label: "Math (GSM8K)", data: M.map((m) => (m.gsm8k != null ? m.gsm8k * 100 : null)), backgroundColor: "#34d399", borderRadius: 5,
          ci: M.map((m) => wilson(m.gsm8k_correct, m.gsm8k_n)), cnt: M.map((m) => (m.gsm8k_n ? `${m.gsm8k_correct}/${m.gsm8k_n}` : "")) }] },
      options: { plugins: { legend: { display: true }, tooltip: { callbacks: { label: (x) => {
        const ds = x.dataset, ci = ds.ci && ds.ci[x.dataIndex];
        return ` ${ds.label}: ${fmt(x.parsed.y, 1)}% (${ds.cnt[x.dataIndex]})${ci ? ` · 95% CI ${ci[0].toFixed(0)}–${ci[1].toFixed(0)}%` : ""}`;
      } } } }, scales: { x: { ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 55 } }, y: { beginAtZero: true, max: 100, title: { display: true, text: "% correct" } } } },
      plugins: [ciPlugin] }));
    document.getElementById("m-quality").style.minWidth = M.length > 6 ? (M.length * 88) + "px" : "";  // 2 bars/model -> wider
    bar("m-speed", M, (m) => m._spd, " tok/s", false);
    bar("m-mem", M, (m) => m.weights_mb, " MB", false);

    const cols = [
      ["Model", (m) => `${m.label} <span class="pill ${m.kind}">${m.kind}</span>`],
      ["Params", (m) => (m.params_b ? m.params_b + "B" : "—")],
      ["Disk", (m) => (m.disk_mb ? fmt(m.disk_mb / 1024, 1) + " GB" : "—")],
      ["Weights mem", (m) => (m.weights_mb ? fmt(m.weights_mb, 0) + " MB" : "—"), "min", (m) => m.weights_mb],
      ["Throughput tok/s", (m) => fmt(m._spd, 0), "max", (m) => m._spd],
      ["TPOT ms", (m) => fmt(m.tpot_ms, 1), "min", (m) => m.tpot_ms],
      ["HumanEval", (m) => (m.humaneval_n ? `${pct(m.humaneval)} <span class="muted">(${m.humaneval_passed}/${m.humaneval_n})</span>` : pct(m.humaneval)), "max", (m) => m.humaneval],
      ["Coding 95% CI", (m) => `<span class="muted">${ciStr(m.humaneval_passed, m.humaneval_n)}</span>`],
      ["GSM8K", (m) => (m.gsm8k_n ? `${pct(m.gsm8k)} <span class="muted">(${m.gsm8k_correct}/${m.gsm8k_n})</span>` : pct(m.gsm8k)), "max", (m) => m.gsm8k],
      ["Math 95% CI", (m) => `<span class="muted">${ciStr(m.gsm8k_correct, m.gsm8k_n)}</span>`],
    ];
    // glossary key per header -> clickable "i" that explains the column (esp. the jargon ones)
    const HEAD_INFO = { "Weights mem": "gpu_memory", "Throughput tok/s": "throughput", "TPOT ms": "tpot",
      "HumanEval": "humaneval", "Coding 95% CI": "ci", "GSM8K": "gsm8k", "Math 95% CI": "ci" };
    const headIcon = (h) => (HEAD_INFO[h] && typeof info === "function" ? " " + info(HEAD_INFO[h]) : "");
    const bv = {};
    cols.forEach((c, i) => { if (!c[2]) return; const v = M.map(c[3]).filter((x) => x != null); if (v.length) bv[i] = c[2] === "max" ? Math.max(...v) : Math.min(...v); });
    document.getElementById("m-table").innerHTML =
      `<thead><tr>${cols.map((c) => `<th>${c[0]}${headIcon(c[0])}</th>`).join("")}</tr></thead><tbody>` +
      M.map((m) => `<tr>${cols.map((c, i) => `<td class="${c[2] && c[3](m) != null && c[3](m) === bv[i] ? "best" : ""}">${c[1](m)}</td>`).join("")}</tr>`).join("") + "</tbody>";

    if (typeof fillInfo === "function") fillInfo();
  }

  /* Optimization-axis card — its OWN model selection (optSelected), independent of the
     top comparison filter. Built once; only its charts redraw on stack/model change. */
  function renderOptCard() {
    const host = document.getElementById("opt-card-host");
    if (!host) return;
    if (!OPT_STACKS.length || !OPT_MODELS.length) { host.innerHTML = ""; return; }
    host.innerHTML = `
      <section class="card" id="opt-on-models">
        <div class="card-head"><h2>How optimizations change speed &amp; memory</h2><div class="modelpop" id="opt-models-pop"></div></div>
        <p class="muted">Its own model picker (separate from the comparison above). Pick an optimization stack to see its effect across the models measured in the experiments. Quality scores above are at 4-bit; speed &amp; memory here come from the optimization runs. Full deep-dive: <a href="optimizations.html">Optimizations</a>.</p>
        <div class="toggles" id="opt-on-models-toggles"><div class="tgroup"><span class="tlabel">Optimization</span>${OPT_STACKS.map((s, i) => (i === 0 ? "" : `<button data-opt="${i}" class="${i === optStackIdx ? "active" : ""}">${s.label}</button>`)).join("")}</div></div>
        <div class="grid-2">
          <div data-info-corner="throughput"><h3>Throughput — baseline vs selected (tok/s)</h3><canvas id="om-tps"></canvas></div>
          <div data-info-corner="gpu_memory"><h3>Peak memory — baseline vs selected (MB)</h3><canvas id="om-mem"></canvas></div>
        </div>
        <div class="analysis" id="om-analysis"></div>
      </section>`;
    if (typeof modelPopover === "function") modelPopover("opt-models-pop", OPT_MODELS, optSelected, () => { syncExcludedFrom(OPT_MODELS, optSelected); drawOpt(); }, { label: "Models" });
    if (typeof fillInfo === "function") fillInfo();
    drawOpt();
  }

  function drawOpt() {
    document.querySelectorAll("#opt-on-models-toggles button[data-opt]").forEach((b) => b.classList.toggle("active", +b.getAttribute("data-opt") === optStackIdx));
    const base = OPT_STACKS[0], stack = OPT_STACKS[optStackIdx];
    const present = OPT_MODELS.filter((lbl) => optSelected.has(lbl) && comboOf(lbl, base) && comboOf(lbl, stack));
    if (!present.length) {
      ["om-tps", "om-mem"].forEach((id) => optCharts[id] && optCharts[id].destroy());
      document.getElementById("om-analysis").innerHTML = `<ul><li class="muted">No optimization-measured models selected — pick at least one with “Models ▾”.</li></ul>`;
      return;
    }
    const series = (key) => [
      { label: base.label, data: present.map((lbl) => comboOf(lbl, base)[key]), backgroundColor: "#8a93a6", borderRadius: 5 },
      { label: stack.label, data: present.map((lbl) => comboOf(lbl, stack)[key]), backgroundColor: "#34d399", borderRadius: 5 }];
    const grouped = (id, key, ytext) => {
      if (optCharts[id]) optCharts[id].destroy();
      optCharts[id] = new Chart(document.getElementById(id), { type: "bar",
        data: { labels: present, datasets: series(key) },
        options: { plugins: { legend: { display: true } }, scales: { x: { ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 55 } }, y: { beginAtZero: true, title: { display: true, text: ytext } } } } });
      const el = document.getElementById(id); if (el) el.style.minWidth = present.length > 6 ? (present.length * 80) + "px" : "";
    };
    grouped("om-tps", "throughput_tps", "tokens / sec");
    grouped("om-mem", "peak_mem_mb", "memory (MB)");
    const ex = present[0];
    if (ex) {
      const b = comboOf(ex, base), s = comboOf(ex, stack);
      const dT = (s.throughput_tps / b.throughput_tps - 1) * 100, dM = (1 - s.peak_mem_mb / b.peak_mem_mb) * 100;
      document.getElementById("om-analysis").innerHTML = `<ul>
        <li>On <b>${ex}</b>, “${stack.label}” gives <b>${dT >= 0 ? "+" : ""}${fmt(dT, 0)}%</b> throughput and <b>${dM >= 0 ? "−" : "+"}${fmt(Math.abs(dM), 0)}%</b> memory vs the bf16 baseline.</li>
        <li>Quantization is the big lever; KV-quant &amp; speculative pay off mainly on bigger models / long context — see the <a href="optimizations.html">Optimizations</a> tab.</li></ul>`;
    }
  }

  // events — controls header is persistent, so a direct listener is fine
  document.addEventListener("click", (e) => {
    const opt = e.target.closest("#opt-on-models-toggles button[data-opt]"); if (!opt) return;
    optStackIdx = +opt.getAttribute("data-opt"); drawOpt();
  });

  render();
  renderOptCard();
})();
