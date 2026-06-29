/* Batching page: cross-model throughput / per-stream / memory vs batch size. */
(function () {
  const D = window.EXP_DATA || {};
  if (window.Chart) { Chart.defaults.color = "#93a1b5"; Chart.defaults.borderColor = "rgba(36,48,73,0.6)"; Chart.defaults.maintainAspectRatio = false; }
  const B = D.batch_by_model || [];
  if (!B.length) return;

  document.getElementById("pending").remove();
  document.getElementById("body").hidden = false;
  document.getElementById("mode-badge").innerHTML = `<span class="badge">mode: <b>${D.mode || "?"}</b></span>`;

  const fmt = (n, d = 0) => (n == null ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const palette = ["#34d399", "#5b8cff", "#f5a524", "#c4b5fd", "#f472b6"];
  const metric = (l, v, s, good, key) => `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${l}</div><div class="val ${good ? "good" : ""}">${v}</div>${s ? `<div class="sub">${s}</div>` : ""}</div>`;

  const models = [...new Set(B.map((r) => r.model))];
  const sizes = [...new Set(B.map((r) => r.batch_size))].sort((a, b) => a - b);
  const at = (m, bs, key) => { const r = B.find((x) => x.model === m && x.batch_size === bs); return r ? r[key] : null; };

  // best aggregate throughput + best scaling
  let bestAgg = { v: 0 }, bestScale = { v: 0 };
  models.forEach((m) => {
    const top = Math.max(...sizes.map((bs) => at(m, bs, "agg_tps") || 0));
    const lo = at(m, sizes[0], "agg_tps") || 1, hi = at(m, sizes[sizes.length - 1], "agg_tps") || 0;
    if (top > bestAgg.v) bestAgg = { v: top, m };
    if (hi / lo > bestScale.v) bestScale = { v: hi / lo, m };
  });
  document.getElementById("b-cards").innerHTML = [
    metric("Peak throughput", `${fmt(bestAgg.v, 0)} tok/s`, `${bestAgg.m} at batch ${sizes[sizes.length - 1]}`, true, "batching"),
    metric("Best scaling", `${fmt(bestScale.v, 1)}×`, `${bestScale.m} · batch 1→${sizes[sizes.length - 1]}`, true, "batching"),
  ].join("");

  function lines(id, key, ytext) {
    const el = document.getElementById(id); if (!el) return;
    new Chart(el, { type: "line",
      data: { labels: sizes, datasets: models.map((m, i) => ({ label: m, data: sizes.map((bs) => at(m, bs, key)),
        borderColor: palette[i % palette.length], backgroundColor: palette[i % palette.length], tension: 0.25, pointRadius: 3 })) },
      options: { plugins: { legend: { display: true } }, scales: { x: { title: { display: true, text: "batch size" } }, y: { beginAtZero: true, title: { display: true, text: ytext } } } } });
  }
  lines("b-agg", "agg_tps", "aggregate tok/s");
  lines("b-stream", "per_stream_tps", "per-stream tok/s");
  lines("b-mem", "peak_mem_mb", "peak GPU memory (MB)");

  document.getElementById("b-analysis").innerHTML = `<ul>
    <li><b>${bestScale.m}</b> scales best — ${fmt(bestScale.v, 1)}× aggregate throughput from batch 1 to ${sizes[sizes.length - 1]}.</li>
    <li>Per-stream throughput falls as batch grows (each request waits its turn) while memory rises — the latency-vs-throughput-vs-memory trade-off. Smaller models scale to bigger batches before running out of memory.</li>
    <li>This is <b>static</b> batching; vLLM's <b>continuous</b> batching does this dynamically per request on a GPU server — the production version.</li>
  </ul>`;

  const fm = document.getElementById("footer-meta"); if (fm) fm.textContent = `Cross-model batching · mode ${D.mode || "?"}`;
  if (typeof fillInfo === "function") fillInfo();
})();
