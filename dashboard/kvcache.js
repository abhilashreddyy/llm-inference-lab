/* KV-cache page: cross-model memory savings + growth with context. */
(function () {
  const D = window.EXP_DATA || {};
  if (window.Chart) { Chart.defaults.color = "#93a1b5"; Chart.defaults.borderColor = "rgba(36,48,73,0.6)"; Chart.defaults.maintainAspectRatio = false; }
  const KV = D.kv_by_model || [];
  if (!KV.length) return;

  document.getElementById("pending").remove();
  document.getElementById("body").hidden = false;
  document.getElementById("mode-badge").innerHTML = `<span class="badge">mode: <b>${D.mode || "?"}</b></span>`;

  const fmt = (n, d = 0) => (n == null ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const C = { gray: "#8a93a6", blue: "#5b8cff", teal: "#34d399", amber: "#f5a524", purple: "#c4b5fd", pink: "#f472b6" };
  const metric = (l, v, s, good, key) => `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${l}</div><div class="val ${good ? "good" : ""}">${v}</div>${s ? `<div class="sub">${s}</div>` : ""}</div>`;

  const models = [...new Set(KV.map((r) => r.model))];
  const ctxs = [...new Set(KV.map((r) => r.ctx))];
  const kvLevels = [...new Set(KV.map((r) => r.kv))]; // e.g. ["full", 4] or ["full",8,4]
  const at = (model, ctx, kv) => { const r = KV.find((x) => x.model === model && x.ctx === ctx && x.kv === kv); return r ? r.peak_mem_mb : null; };
  const longest = ctxs[ctxs.length - 1];

  // savings per model at longest context (4-bit vs full)
  const savings = models.map((m) => {
    const full = at(m, longest, "full"), q4 = at(m, longest, 4);
    return full && q4 ? (1 - q4 / full) * 100 : null;
  });
  const bestIdx = savings.reduce((bi, v, i, a) => (v != null && v > (a[bi] ?? -1) ? i : bi), 0);
  document.getElementById("kv-cards").innerHTML = [
    metric("Best memory saving", `${fmt(savings[bestIdx], 0)}%`, `${models[bestIdx]} · 4-bit KV at ${longest}`, true, "kv_quant"),
    metric("Context tested", longest, "longest in this run", false, "kv_cache"),
  ].join("");

  // cross-model grouped bar at longest context: full vs each quant level
  const colByKv = { full: C.gray, 8: C.blue, 4: C.teal };
  new Chart(document.getElementById("kv-xm"), { type: "bar",
    data: { labels: models, datasets: kvLevels.map((kv) => ({
      label: "KV " + (kv === "full" ? "full" : kv + "-bit"),
      data: models.map((m) => at(m, longest, kv)), backgroundColor: colByKv[kv] || C.purple, borderRadius: 5 })) },
    options: { plugins: { legend: { display: true } }, scales: { x: { ticks: { font: { size: 10 } } }, y: { beginAtZero: false, title: { display: true, text: "peak GPU memory (MB)" } } } } });

  // growth: memory vs context, full vs 4-bit, one pair of lines per model
  const palette = [C.teal, C.blue, C.amber, C.purple, C.pink];
  const dsets = [];
  models.forEach((m, i) => {
    dsets.push({ label: `${m} · full`, data: ctxs.map((c) => at(m, c, "full")), borderColor: palette[i % palette.length], backgroundColor: palette[i % palette.length], borderDash: [5, 4], tension: 0.25, pointRadius: 3 });
    dsets.push({ label: `${m} · 4-bit`, data: ctxs.map((c) => at(m, c, 4)), borderColor: palette[i % palette.length], backgroundColor: palette[i % palette.length], tension: 0.25, pointRadius: 3 });
  });
  new Chart(document.getElementById("kv-growth"), { type: "line",
    data: { labels: ctxs, datasets: dsets },
    options: { plugins: { legend: { display: true } }, scales: { x: { title: { display: true, text: "context length" } }, y: { beginAtZero: false, title: { display: true, text: "peak GPU memory (MB)" } } } } });

  const bestSave = savings[bestIdx] || 0;
  document.getElementById("kv-analysis").innerHTML = bestSave < 2
    ? `<ul>
        <li><b>Almost no difference here — and that's the lesson.</b> At these settings the saving is &lt;2%: peak memory is dominated by the prompt-prefill pass and the weights, while only the (short) generated portion of the cache is quantized.</li>
        <li>KV-cache quant pays off when the <b>generated sequence is long</b> and context is very large — then the cache, not the weights, dominates memory. The full run uses long generation + bigger contexts to surface it.</li>
        <li>Dashed = full-precision KV, solid = 4-bit KV — here they sit on top of each other.</li>
      </ul>`
    : `<ul>
        <li>Dashed = full-precision KV, solid = 4-bit KV. The gap (the saving) widens as context grows.</li>
        <li>Best saving here: <b>${fmt(bestSave, 0)}%</b> on ${models[bestIdx]} at ${longest} context — which is why KV quant matters for long documents and many concurrent requests, not short chats.</li>
      </ul>`;

  const fm = document.getElementById("footer-meta"); if (fm) fm.textContent = `Cross-model KV-cache · mode ${D.mode || "?"}`;
  if (typeof fillInfo === "function") fillInfo();
})();
