/* Scorecard: one unified view of everything we've measured.
   Top table = across models (at 4-bit). Bottom = one model's optimization stacks.
   Every column header carries a glossary info icon. Only measured cells are filled; the
   rest show "—". Best value per numeric column is highlighted. */
(function () {
  const MODELS = (window.MODELS_DATA || {}).models || [];
  const E = window.EXP_DATA || {};
  const fmt = (n, d = 0) => (n == null || Number.isNaN(n) ? "—" : Number(n).toLocaleString(undefined, { maximumFractionDigits: d }));
  const pct = (x) => (x == null ? "—" : (x * 100).toFixed(0) + "%");
  const DASH = `<span class="muted">—</span>`;
  const ic = (key) => (typeof info === "function" ? info(key) : "");   // clickable glossary icon
  // 4-bit end-to-end throughput from the optimization run — same source the Optimizations tab uses,
  // so a model's tok/s matches across every tab (no decode-vs-throughput drift). Falls back to decode_tps.
  const tput4 = (label) => {
    const c = (E.combos || []).find((x) => x.model === label && String(x.precision) === "int4" && String(x.kv) === "off" && !x.spec);
    if (c) return c.throughput_tps;
    const q = (E.quant_by_model || []).find((x) => x.model === label && x.precision === "int4");
    return q ? q.throughput_tps : null;
  };
  const spd = (m) => { const t = tput4(m.label); return t != null ? t : m.decode_tps; };

  /* ---------- a small table renderer with per-column "best" highlight ---------- */
  // cols: [{h, key, cell(row)->html, val(row)->number|null, dir:"max"|"min"}]
  function renderTable(elId, cols, rows) {
    const el = document.getElementById(elId); if (!el) return;
    const best = cols.map((c) => {
      if (!c.dir || !c.val) return null;
      const vals = rows.map(c.val).filter((v) => v != null && !Number.isNaN(v));
      if (!vals.length) return null;
      return c.dir === "max" ? Math.max(...vals) : Math.min(...vals);
    });
    el.innerHTML =
      `<thead><tr>${cols.map((c) => `<th>${c.h}${c.key ? " " + ic(c.key) : ""}</th>`).join("")}</tr></thead>` +
      `<tbody>${rows.map((r) =>
        `<tr>${cols.map((c, i) => {
          const isBest = best[i] != null && c.val && c.val(r) === best[i];
          return `<td class="${isBest ? "best" : ""}">${c.cell(r)}</td>`;
        }).join("")}</tr>`).join("")}</tbody>`;
  }

  /* ================= ACROSS MODELS (at 4-bit) ================= */
  const selModels = (typeof selectedFrom === "function") ? selectedFrom(MODELS.map((m) => m.label)) : new Set(MODELS.map((m) => m.label));
  const modelCols = [
    { h: "Model", cell: (m) => `${m.label} <span class="pill ${m.kind}">${m.kind}</span>` },
    { h: "tok/s", key: "throughput", dir: "max", val: (m) => spd(m), cell: (m) => fmt(spd(m), 0) },
    { h: "TTFT", key: "ttft", dir: "min", val: (m) => m.ttft_ms, cell: (m) => (m.ttft_ms != null ? fmt(m.ttft_ms, 0) + " ms" : DASH) },
    { h: "TPOT", key: "tpot", dir: "min", val: (m) => m.tpot_ms, cell: (m) => (m.tpot_ms != null ? fmt(m.tpot_ms, 1) + " ms" : DASH) },
    { h: "Weights", key: "gpu_memory", dir: "min", val: (m) => m.weights_mb, cell: (m) => (m.weights_mb != null ? fmt(m.weights_mb / 1024, 1) + " GB" : DASH) },
    { h: "HumanEval", key: "humaneval", dir: "max", val: (m) => m.humaneval, cell: (m) => (m.humaneval == null ? DASH : `${pct(m.humaneval)}${m.humaneval_n ? ` <span class="muted">(${m.humaneval_passed}/${m.humaneval_n})</span>` : ""}`) },
    { h: "GSM8K", key: "gsm8k", dir: "max", val: (m) => m.gsm8k, cell: (m) => (m.gsm8k == null ? DASH : `${pct(m.gsm8k)}${m.gsm8k_n ? ` <span class="muted">(${m.gsm8k_correct}/${m.gsm8k_n})</span>` : ""}`) },
    { h: "PPL", key: "perplexity", dir: "min", val: (m) => m.perplexity, cell: (m) => (m.perplexity != null ? fmt(m.perplexity, 1) : DASH) },
  ];
  function renderModels() {
    const rows = MODELS.filter((m) => selModels.has(m.label)).sort((a, b) => (b.params_b || 0) - (a.params_b || 0));
    renderTable("sc-models-table", modelCols, rows);
  }

  /* ================= OPTIMIZATION STACKS (one model) ================= */
  const COMBOS = E.combos || [];
  const QUANT = E.quant_by_model || [];
  const KVP = E.kv_precision_by_model || [];
  const optModels = E.combos_models && E.combos_models.length ? E.combos_models : [...new Set(COMBOS.map((c) => c.model))];
  let curModel = (typeof focusOrDefault === "function") ? focusOrDefault(optModels) : optModels[0];

  const pplFor = (model, prec) => { const q = QUANT.find((x) => x.model === model && x.precision === prec); return q ? q.perplexity : null; };
  const kvFidFor = (model, kvBits) => {
    const kp = KVP.find((x) => x.model === model); if (!kp) return null;
    const row = kp.rows.find((r) => String(r.kv) === String(kvBits)); return row ? row.fidelity : null;
  };
  const stackCols = [
    { h: "Stack", cell: (c) => c.label },
    { h: "tok/s", key: "throughput", dir: "max", val: (c) => c.throughput_tps, cell: (c) => fmt(c.throughput_tps, 0) },
    { h: "TPOT", key: "tpot", dir: "min", val: (c) => c.tpot_ms, cell: (c) => (c.tpot_ms != null ? fmt(c.tpot_ms, 1) + " ms" : DASH) },
    { h: "Peak mem", key: "gpu_memory", dir: "min", val: (c) => c.peak_mem_mb, cell: (c) => (c.peak_mem_mb != null ? fmt(c.peak_mem_mb / 1024, 1) + " GB" : DASH) },
    { h: "PPL", key: "perplexity", dir: "min", val: (c) => c._ppl, cell: (c) => (c._ppl != null ? fmt(c._ppl, 1) : DASH) },
    { h: "KV-fid", key: "kv_quant", cell: (c) => (c._kvfid != null ? `<span class="${c._kvfid >= 0.95 ? "" : "muted"}">${fmt(c._kvfid * 100, 0)}%</span>` : (c.spec ? `<span class="muted">lossless</span>` : DASH)) },
    { h: "HumanEval", key: "humaneval", cell: () => DASH },
    { h: "GSM8K", key: "gsm8k", cell: () => DASH },
  ];
  function renderStacks() {
    const rows = COMBOS.filter((c) => (c.model || curModel) === curModel).map((c) => {
      // perplexity only where a pure-precision quant run exists (bf16 / 4-bit); "+stacks" reuse 4-bit weights -> shown on the 4-bit row only
      const pure = c.kv === "off" && !c.spec;
      const _ppl = pure ? pplFor(curModel, c.precision) : null;
      const _kvfid = c.kv !== "off" ? kvFidFor(curModel, c.kv) : null;
      return Object.assign({ _ppl, _kvfid }, c);
    });
    renderTable("sc-stacks-table", stackCols, rows);
    if (typeof fillInfo === "function") fillInfo();
  }

  /* ---------- controls ---------- */
  if (typeof modelPopover === "function" && MODELS.length) {
    modelPopover("sc-models-pop", MODELS.map((m) => m.label), selModels, () => { syncExcludedFrom(MODELS.map((m) => m.label), selModels); renderModels(); }, { label: "Models" });
  }
  const sel = document.getElementById("sc-model-select");
  if (sel && optModels.length) {
    sel.innerHTML = optModels.map((m) => `<option ${m === curModel ? "selected" : ""}>${m}</option>`).join("");
    if (typeof fitSelect === "function") fitSelect(sel);
    sel.onchange = (e) => { curModel = e.target.value; if (typeof setFocusModel === "function") setFocusModel(curModel); if (typeof fitSelect === "function") fitSelect(sel); renderStacks(); };
  }

  renderModels();
  renderStacks();
  const fm = document.getElementById("footer-meta");
  if (fm) fm.textContent = `Scorecard · ${MODELS.length} models · optimization data: ${optModels.length} models (${E.mode || "?"})`;
})();
