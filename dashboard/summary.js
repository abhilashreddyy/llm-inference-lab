/* Summary page: headline numbers pulled from both datasets. */
(function () {
  const fmt = (n, d = 0) => (n == null ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const card = (lbl, val, sub, good, key) =>
    `<div class="metric">${key && typeof infoCorner === "function" ? infoCorner(key) : ""}<div class="lbl">${lbl}</div><div class="val ${good ? "good" : ""}">${val}</div>${sub ? `<div class="sub">${sub}</div>` : ""}</div>`;

  const cards = [];
  let note = "";

  // --- model quality (from the eval) ---
  const M = (window.MODELS_DATA && window.MODELS_DATA.models) || [];
  const E = window.EXP_DATA || {};
  if (M.length) {
    const code = M.filter((m) => m.humaneval != null);
    if (code.length) {
      const best = code.reduce((a, b) => (a.humaneval >= b.humaneval ? a : b));
      cards.push(card("Best local coder", `${fmt(best.humaneval * 100, 0)}%`, `${best.label} · HumanEval pass@1`, true, "pass@1"));
    }
    const math = M.filter((m) => m.gsm8k != null);
    if (math.length) {
      const best = math.reduce((a, b) => (a.gsm8k >= b.gsm8k ? a : b));
      cards.push(card("Best local math", `${fmt(best.gsm8k * 100, 0)}%`, `${best.label} · GSM8K`, true, "gsm8k"));
    }
  }

  // --- optimization gains (from the experiments) — bf16 → 4-bit, averaged across models ---
  const byModel = {};
  (E.combos || []).forEach((c) => { (byModel[c.model] = byModel[c.model] || []).push(c); });
  const pairs = [];
  Object.values(byModel).forEach((cs) => {
    const bf = cs.find((c) => c.precision === "bf16" && String(c.kv) === "off" && !c.spec);
    const q4 = cs.find((c) => String(c.precision) === "int4" && String(c.kv) === "off" && !c.spec);
    if (bf && q4 && bf.throughput_tps && bf.peak_mem_mb) {
      pairs.push({ sp: q4.throughput_tps / bf.throughput_tps, mem: 1 - q4.peak_mem_mb / bf.peak_mem_mb });
    }
  });
  if (pairs.length) {
    const avgSp = pairs.reduce((a, p) => a + p.sp, 0) / pairs.length;
    const avgMem = (pairs.reduce((a, p) => a + p.mem, 0) / pairs.length) * 100;
    cards.push(card("4-bit speedup", `${fmt(avgSp, 1)}×`, `vs bf16 · avg of ${pairs.length} models`, true, "quantization"));
    cards.push(card("Memory saved", `${fmt(avgMem, 0)}%`, `with 4-bit · avg of ${pairs.length} models`, true, "gpu_memory"));
  }

  // --- fastest model (4-bit end-to-end throughput, same metric as Models/Optimizations) ---
  const tput4 = (label) => {
    const c = (E.combos || []).find((x) => x.model === label && String(x.precision) === "int4" && String(x.kv) === "off" && !x.spec);
    if (c) return c.throughput_tps;
    const m = M.find((x) => x.label === label);
    return m ? m.decode_tps : null;
  };
  const withSpd = M.map((m) => ({ m, s: tput4(m.label) })).filter((x) => x.s != null);
  if (withSpd.length) {
    const f = withSpd.reduce((a, b) => (a.s >= b.s ? a : b));
    cards.push(card("Fastest model", `${fmt(f.s, 0)} tok/s`, `${f.m.label} · 4-bit throughput`, true, "throughput"));
  }

  if (M.length) {
    note = `${M.length} models · coding HumanEval n=${window.MODELS_DATA.tests?.humaneval_n ?? "?"}, math GSM8K n=${window.MODELS_DATA.tests?.gsm8k_n ?? "?"} · optimizations measured on ${pairs.length} models (bf16/8-bit/4-bit, KV-cache, batching, speculative).`;
  } else {
    note = "Model comparison is still running — the Models and Examples pages will fill in when it finishes.";
  }

  document.getElementById("headline-metrics").innerHTML = cards.join("") ||
    `<div class="empty">No data yet. Run the studies and the model eval.</div>`;
  document.getElementById("headline-note").textContent = note;

  const fm = document.getElementById("footer-meta");
  if (fm) fm.textContent = "local-first · reproducible";
})();
