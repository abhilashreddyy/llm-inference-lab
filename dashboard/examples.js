/* Examples page: pick a task + question, see every model's answer side-by-side. */
(function () {
  const D = window.MODELS_DATA || { examples: {} };
  const EX = D.examples || {};
  const TASKS = [["humaneval", "Coding (HumanEval)"], ["gsm8k", "Math (GSM8K)"]].filter(([k]) => (EX[k] || []).length);
  if (!TASKS.length) return; // keep "pending"

  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const body = document.getElementById("ex-body");

  body.innerHTML = `
    <section class="card">
      <div class="ex-controls">
        <label>Test
          <select id="ex-task">${TASKS.map(([k, l]) => `<option value="${k}">${l}</option>`).join("")}</select>
        </label>
        <label>Question
          <select id="ex-q"></select>
        </label>
        <span class="muted" id="ex-hint"></span>
      </div>
      <div id="ex-render"></div>
    </section>`;

  const taskSel = document.getElementById("ex-task");
  const qSel = document.getElementById("ex-q");

  function fillQuestions() {
    const items = EX[taskSel.value] || [];
    qSel.innerHTML = items.map((it, i) => {
      const preview = (it.question || "").replace(/\s+/g, " ").trim().slice(0, 60);
      return `<option value="${i}">Q${it.idx + 1}: ${esc(preview)}…</option>`;
    }).join("");
    render();
  }

  function render() {
    const items = EX[taskSel.value] || [];
    const it = items[Number(qSel.value)] || items[0];
    if (!it) { document.getElementById("ex-render").innerHTML = ""; return; }
    const isCode = taskSel.value === "humaneval";
    const goldLine = isCode
      ? `<div class="muted">Function to complete: <code>${esc(it.entry_point)}</code> — graded by running hidden unit tests.</div>`
      : `<div class="muted">Correct answer: <b>${esc(it.gold)}</b></div>`;

    const answers = Object.entries(it.answers || {}).map(([label, a]) => {
      const tag = a.correct ? `<span class="tag-pass">✓ correct</span>` : `<span class="tag-fail">✗ wrong${!isCode && a.predicted != null ? ` (said ${esc(a.predicted)})` : ""}</span>`;
      return `<div class="ex-a">
        <div class="hd"><b>${esc(label)}</b>${tag}</div>
        <pre>${esc(a.answer)}</pre>
      </div>`;
    }).join("");

    document.getElementById("ex-render").innerHTML = `
      <div class="ex-q">
        <div class="qtext">${esc(it.question)}</div>
        ${goldLine}
      </div>
      <div class="ex-answers">${answers}</div>`;
    document.getElementById("ex-hint").textContent =
      `${Object.keys(it.answers || {}).length} models · ${isCode ? "pass@1" : "exact-match"}`;
  }

  taskSel.addEventListener("change", fillQuestions);
  qSel.addEventListener("change", render);
  fillQuestions();
})();
