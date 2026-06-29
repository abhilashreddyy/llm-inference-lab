/* Speculative decoding page: cross-model comparison + deep single-target story. */
(function () {
  const D = window.EXP_DATA || {};
  if (window.Chart) { Chart.defaults.color = "#93a1b5"; Chart.defaults.borderColor = "rgba(36,48,73,0.6)"; Chart.defaults.maintainAspectRatio = false; }
  const XM = D.spec_by_model || [];
  if (!XM.length) return; // keep pending

  document.getElementById("pending").remove();
  document.getElementById("body").hidden = false;
  document.getElementById("mode-badge").innerHTML = `<span class="badge">mode: <b>${D.mode || "?"}</b></span><span class="badge">${(D.models || []).length} models</span>`;

  const fmt = (n, d = 0) => (n == null ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const C = { blue: "#5b8cff", teal: "#34d399", amber: "#f5a524", gray: "#8a93a6", purple: "#c4b5fd" };
  const metric = (l, v, s, good, key) => `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${l}</div><div class="val ${good ? "good" : ""}">${v}</div>${s ? `<div class="sub">${s}</div>` : ""}</div>`;
  function bar(id, labels, data, colors, suffix, pctMax) {
    const el = document.getElementById(id); if (!el) return;
    new Chart(el, { type: "bar", data: { labels, datasets: [{ data, backgroundColor: colors, borderRadius: 6 }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${fmt(c.parsed.y, 2)}${suffix || ""}` } } },
        scales: { x: { ticks: { font: { size: 10 }, autoSkip: false, maxRotation: 25 } }, y: { beginAtZero: true, max: pctMax ? 100 : undefined } } } });
  }

  /* ---- cross-model ---- */
  const labels = XM.map((m) => m.model);
  const col = XM.map((m) => (m.speedup >= 1 ? C.teal : C.gray));
  const best = XM.reduce((a, b) => (a.speedup >= b.speedup ? a : b));
  document.getElementById("xm-cards").innerHTML = [
    metric("Best speedup", `${fmt(best.speedup, 2)}×`, `${best.model} (draft ${best.draft})`, best.speedup > 1, "speculative"),
    metric("Models helped", `${XM.filter((m) => m.speedup > 1.03).length}/${XM.length}`, "speedup > 1.03×", true, "speculative"),
  ].join("");
  bar("xm-speedup", labels, XM.map((m) => m.speedup), col, "×");
  bar("xm-accept", labels, XM.map((m) => m.acceptance_rate * 100), XM.map(() => C.blue), "%", true);

  const cols = [["Model", (m) => `${m.model} <span class="pill">${m.params_b}B</span>`], ["Draft", (m) => m.draft || "—"],
    ["Baseline tok/s", (m) => fmt(m.baseline_tps, 1)], ["Spec tok/s", (m) => fmt(m.spec_tps, 1)],
    ["Speedup", (m) => fmt(m.speedup, 2) + "×", "max", (m) => m.speedup],
    ["Acceptance", (m) => fmt(m.acceptance_rate * 100, 0) + "%", "max", (m) => m.acceptance_rate],
    ["Stretch", (m) => fmt(m.tokens_per_target_pass, 2) + "×", "max", (m) => m.tokens_per_target_pass],
    ["Mem (MB)", (m) => fmt(m.peak_mem_mb, 0)]];
  const bv = {}; cols.forEach((c, i) => { if (!c[2]) return; const v = XM.map(c[3]); bv[i] = Math.max(...v); });
  document.getElementById("xm-table").innerHTML = `<thead><tr>${cols.map((c) => `<th>${c[0]}</th>`).join("")}</tr></thead><tbody>` +
    XM.map((m) => `<tr>${cols.map((c, i) => `<td class="${c[2] && c[3](m) === bv[i] ? "best" : ""}">${c[1](m)}</td>`).join("")}</tr>`).join("") + "</tbody>";

  const helped = XM.filter((m) => m.speedup > 1.03).length;
  const xa = document.getElementById("xm-analysis");
  if (xa) {
    xa.innerHTML = helped === 0
      ? `<ul>
          <li><b>Speculative decoding doesn't pay off on these small targets.</b> A 2–3B model is already cheap to run, so the cost of running the draft and verifying it isn't repaid — every model here is at or below 1× (slower).</li>
          <li>It's a tool for <b>large, slow targets</b> (7B+), where one target forward pass is expensive and a tiny draft is nearly free. The bigger the target-to-draft gap and the higher the acceptance, the bigger the win.</li>
          <li>Acceptance still matters and still varies (see the prompt-type chart below) — but on a cheap target even high acceptance can't overcome the overhead. This is the honest "know when <i>not</i> to use it" result.</li>
        </ul>`
      : `<ul>
          <li><b>${helped}/${XM.length}</b> targets got a real speedup (>1.03×). Best: <b>${best.model}</b> at ${fmt(best.speedup, 2)}×.</li>
          <li>The win grows with the target-to-draft size gap and with acceptance — bigger, slower targets benefit most.</li>
        </ul>`;
  }

  /* ---- story ---- */
  document.getElementById("story").innerHTML = `
    <p>Each token normally needs one full pass through the big model. Speculative decoding lets a small, cheap model guess the next <b>k</b> tokens; the big model then runs <b>one</b> pass to check them all and keeps the correct prefix.</p>
    <ol>
      <li><b>Draft</b> — the small model generates k candidate tokens.</li>
      <li><b>Verify in parallel</b> — the big model scores all k at once.</li>
      <li><b>Accept/reject</b> — greedy keeps tokens while <code>argmax(target) == draft</code>; sampling accepts with <code>min(1, p_target/p_draft)</code>.</li>
      <li><b>Correct once</b> — the big model adds one token at the first disagreement, free.</li>
      <li><b>Repeat</b> — each big-model pass now yields 1…k+1 tokens. Output is identical, just faster — <i>when</i> the draft is cheap and often right.</li>
    </ol>`;

  /* ---- deep detail ---- */
  const det = D.spec_detail;
  if (!det) { document.getElementById("detail-card").hidden = true; }
  else {
    document.getElementById("detail-target").textContent = det.target || D.detail_target || "";
    const base = det.baseline || {};
    const ks = [...(det.k_sweep || [])].sort((a, b) => a.k - b.k);
    const bestK = ks.reduce((a, b) => (a.throughput_tps >= b.throughput_tps ? a : b), ks[0] || {});
    document.getElementById("k-cards").innerHTML = [
      metric("Best stretch", `${fmt(bestK.tokens_per_target_pass, 2)}×`, `tokens/target pass at k=${bestK.k}`, true, "acceptance"),
      metric("Acceptance", `${fmt(bestK.acceptance_rate * 100, 0)}%`, `of proposed, k=${bestK.k}`, true, "acceptance"),
      base.throughput_tps ? metric("Speedup", `${fmt(bestK.throughput_tps / base.throughput_tps, 2)}×`, "vs no speculation", bestK.throughput_tps > base.throughput_tps, "throughput") : "",
    ].filter(Boolean).join("");
    if (ks.length) new Chart(document.getElementById("kacc"), { type: "bar",
      data: { labels: ks.map((r) => "k=" + r.k), datasets: [
        { label: "acceptance %", data: ks.map((r) => r.acceptance_rate * 100), backgroundColor: C.blue, borderRadius: 5, yAxisID: "y" },
        { label: "tokens/target pass", type: "line", data: ks.map((r) => r.tokens_per_target_pass), borderColor: C.teal, backgroundColor: C.teal, yAxisID: "y1", tension: 0.25 }] },
      options: { scales: { y: { position: "left", beginAtZero: true, max: 100, title: { display: true, text: "acceptance %" } }, y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: "tokens / pass" } } } } });
    bar("ktps", ks.map((r) => "k=" + r.k), ks.map((r) => r.throughput_tps), ks.map(() => C.teal), " tok/s");

    if (bestK.accepted_draft != null) new Chart(document.getElementById("donut"), { type: "doughnut",
      data: { labels: ["From draft (cheap)", "From target (verify)"], datasets: [{ data: [bestK.accepted_draft, bestK.target_tokens], backgroundColor: [C.teal, C.gray], borderWidth: 0 }] },
      options: { plugins: { legend: { position: "bottom" } } } });
    document.getElementById("donut-note").innerHTML = `<p>At k=${bestK.k}, <b>${fmt((bestK.draft_token_fraction || 0) * 100, 0)}%</b> of output tokens came cheaply from the draft and were only verified by the big model — that ratio is the speedup.</p>`;

    const ps = det.prompt_sweep || [];
    bar("prompt", ps.map((r) => r.prompt_type), ps.map((r) => r.acceptance_rate * 100), ps.map(() => C.amber), "%", true);
    const dc = det.draft_compare || [];
    bar("draft", dc.map((r) => r.draft + " draft"), dc.map((r) => r.acceptance_rate * 100), dc.map(() => C.purple), "%", true);

    if (ps.length) {
      const hi = [...ps].sort((a, b) => b.acceptance_rate - a.acceptance_rate)[0];
      const lo = [...ps].sort((a, b) => a.acceptance_rate - b.acceptance_rate)[0];
      document.getElementById("detail-analysis").innerHTML = `<ul>
        <li><b>${hi.prompt_type}</b> text gives the highest acceptance (${fmt(hi.acceptance_rate * 100, 0)}%) — predictable output is easy to guess.</li>
        <li><b>${lo.prompt_type}</b> is hardest (${fmt(lo.acceptance_rate * 100, 0)}%) — open-ended text diverges from the draft. <b>This is where speculation shines vs struggles.</b></li>
        ${dc.length === 2 ? `<li>A bigger draft (${dc[1].draft}) accepts more than ${dc[0].draft}, but costs more per token — the best draft balances the two.</li>` : ""}
      </ul>`;
    }
  }

  const fm = document.getElementById("footer-meta"); if (fm) fm.textContent = `Cross-model speculative · mode ${D.mode || "?"}`;
  if (typeof fillInfo === "function") fillInfo();
})();
