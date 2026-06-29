/* Shared UI: nav bar + glossary info-icon tooltips. Used by every page. */

const REPO_URL = "https://github.com/abhilashreddyy/llm-inference-lab";

const PAGES = [
  ["index.html", "Summary"],
  ["models.html", "Models"],
  ["scorecard.html", "Scorecard"],
  ["optimizations.html", "Optimizations"],
  ["examples.html", "Examples"],
  ["glossary.html", "Glossary"],
];

const GH_ICON = `<svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`;

function renderNav() {
  const here = location.pathname.split("/").pop() || "index.html";
  const links = PAGES.map(([href, label]) =>
    `<a href="${href}" class="${href === here ? "active" : ""}">${label}</a>`).join("");
  const gh = `<a class="gh-link" href="${REPO_URL}" target="_blank" rel="noopener" title="View the source on GitHub" aria-label="GitHub repository">${GH_ICON}<span>GitHub</span></a>`;
  const nav = document.getElementById("nav");
  if (nav) nav.innerHTML = `<a class="brand" href="index.html">LLM Inference Lab</a><div class="navlinks">${links}${gh}</div>`;
}

/* info(key) -> a clickable ⓘ icon. Hover shows the one-liner; click opens a
   popover with Overview (plain) + Deeper (technical) tabs. */
function info(key) {
  const g = (window.GLOSSARY || {})[key];
  if (!g) return "";
  const tip = (g.short || "").replace(/"/g, "&quot;");
  return `<span class="info" tabindex="0" role="button" data-key="${key}" title="${tip}\n(click for details)" aria-label="${g.term}: ${tip}. Click for details.">i</span>`;
}

function ensureModal() {
  if (document.getElementById("info-modal")) return;
  const m = document.createElement("div");
  m.id = "info-modal";
  m.className = "modal-overlay";
  m.hidden = true;
  m.innerHTML = `
    <div class="modal" role="complementary" aria-modal="false" aria-labelledby="info-modal-title">
      <button class="modal-x" aria-label="Close">×</button>
      <h3 id="info-modal-title"></h3>
      <div class="modal-tabs">
        <button data-tab="overview" class="active">Overview</button>
        <button data-tab="deeper">Deeper</button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-look"></div>
      <div class="modal-learn"></div>
    </div>`;
  document.body.appendChild(m);
  const close = () => { m.hidden = true; document.body.classList.remove("drawer-open"); };
  m.addEventListener("click", (e) => { if (e.target === m) close(); });
  m.querySelector(".modal-x").addEventListener("click", close);
  m.querySelectorAll(".modal-tabs button").forEach((b) =>
    b.addEventListener("click", () => setTab(b.getAttribute("data-tab"))));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

let _curKey = null;
function setTab(which) {
  const g = (window.GLOSSARY || {})[_curKey];
  if (!g) return;
  const m = document.getElementById("info-modal");
  m.querySelectorAll(".modal-tabs button").forEach((b) =>
    b.classList.toggle("active", b.getAttribute("data-tab") === which));
  m.querySelector(".modal-body").innerHTML = which === "deeper" ? (g.deeper || g.overview) : (g.overview || g.short);
  if (typeof linkifyGlossary === "function") linkifyGlossary(m.querySelector(".modal-body"), _curKey);
}

function openInfo(key) {
  const g = (window.GLOSSARY || {})[key];
  if (!g) return;
  ensureModal();
  _curKey = key;
  const m = document.getElementById("info-modal");
  m.querySelector("#info-modal-title").textContent = g.term;
  setTab("overview");
  m.querySelector(".modal-look").innerHTML = g.look
    ? `<div class="look-title">What to look for</div><div class="look-body">${g.look}</div>`
    : "";
  if (typeof linkifyGlossary === "function") linkifyGlossary(m.querySelector(".modal-look"), _curKey);
  const learn = g.learn || [];
  m.querySelector(".modal-learn").innerHTML = learn.length
    ? `<div class="learn-title">Learn more</div>` +
      learn.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.title} ↗</a>`).join("")
    : "";
  m.hidden = false;
  document.body.classList.add("drawer-open");
}

document.addEventListener("click", (e) => {
  const icon = e.target.closest && e.target.closest(".info[data-key]");
  if (icon) { e.preventDefault(); openInfo(icon.getAttribute("data-key")); }
});
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("info")) {
    const k = document.activeElement.getAttribute("data-key");
    if (k) { e.preventDefault(); openInfo(k); }
  }
});

/* fitSelect(sel) -> size a native <select> to its CURRENT selection (not the widest option),
   so it hugs its text like the .pop-btn does — consistent, compact dropdowns everywhere.
   Keep in sync with .selwrap select padding in styles.css (12 left + 32 right for the caret). */
function fitSelect(sel) {
  if (!sel || !sel.options.length) return;
  const opt = sel.options[sel.selectedIndex] || sel.options[0];
  const cs = getComputedStyle(sel);
  const span = document.createElement("span");
  span.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font-size:${cs.fontSize};font-family:${cs.fontFamily};font-weight:${cs.fontWeight};`;
  span.textContent = opt.text;
  document.body.appendChild(span);
  const textW = span.offsetWidth;
  span.remove();
  sel.style.width = Math.ceil(textW + 12 + 32 + 2) + "px";   // text + padding-left + caret room + borders
}

/* infoCorner(key) -> an info icon meant to sit in a container's top-right corner. */
function infoCorner(key) {
  const g = (window.GLOSSARY || {})[key];
  if (!g) return "";
  const tip = (g.short || "").replace(/"/g, "&quot;");
  return `<span class="info info-corner" tabindex="0" role="button" data-key="${key}" title="${tip}\n(click for details)" aria-label="${g.term}: ${tip}. Click for details.">i</span>`;
}

/* term(key) -> the human label + an info icon, for headings/labels. */
function term(key, labelOverride) {
  const g = (window.GLOSSARY || {})[key];
  return `${labelOverride || (g ? g.term : key)} ${info(key)}`;
}

/* Fill info icons:
   - <span data-info="key"></span>      -> inline icon (replaces the span)
   - any element with data-info-corner="key" -> icon pinned to its top-right corner */
function fillInfo() {
  document.querySelectorAll("[data-info]").forEach((el) => {
    el.outerHTML = info(el.getAttribute("data-info"));
  });
  document.querySelectorAll("[data-info-corner]").forEach((el) => {
    const k = el.getAttribute("data-info-corner");
    el.classList.add("corner-host");
    el.insertAdjacentHTML("afterbegin", infoCorner(k));
    el.removeAttribute("data-info-corner");
  });
}

/* ---------- shared model selection across tabs (persisted by label) ----------
   Stored as the set of DESELECTED labels, so a tab only needs to know its own models:
   a model is shown iff it's not in the excluded set. Default (nothing stored) = all on. */
function loadExcludedModels() { try { return new Set(JSON.parse(localStorage.getItem("llmlab.excluded") || "[]")); } catch (e) { return new Set(); } }
function saveExcludedModels(set) { try { localStorage.setItem("llmlab.excluded", JSON.stringify([...set])); } catch (e) {} }
function syncExcludedFrom(models, selSet) {            // fold this tab's selection into the global excluded set
  const ex = loadExcludedModels();
  models.forEach((m) => { if (selSet.has(m)) ex.delete(m); else ex.add(m); });
  saveExcludedModels(ex);
}
function selectedFrom(models) { const ex = loadExcludedModels(); return new Set(models.filter((m) => !ex.has(m))); }
function getFocusModel() { try { return localStorage.getItem("llmlab.focus") || null; } catch (e) { return null; } }
function setFocusModel(label) { try { localStorage.setItem("llmlab.focus", label); } catch (e) {} }
function focusOrDefault(options) { const f = getFocusModel(); return (f && options.includes(f)) ? f : options[0]; }

/* Shared compact multi-select: a "Models ▾" button that opens a checkbox panel.
   Mutates selSet in place and calls onChange() after each toggle. Returns {sync}. */
function modelPopover(hostId, models, selSet, onChange, opts) {
  opts = opts || {};
  const host = document.getElementById(hostId);
  if (!host) return null;
  host.innerHTML =
    `<button class="pop-btn" type="button">${opts.label || "Models"}: <span class="pop-count"></span> <span class="caret">▾</span></button>` +
    `<div class="pop-panel" hidden>${models.map((m) => `<label><input type="checkbox" data-m="${m}"> ${m}</label>`).join("")}</div>`;
  const btn = host.querySelector(".pop-btn"), panel = host.querySelector(".pop-panel"), count = host.querySelector(".pop-count");
  const sync = () => {
    host.querySelectorAll("input[data-m]").forEach((cb) => { cb.checked = selSet.has(cb.getAttribute("data-m")); });
    count.textContent = selSet.size === models.length ? `all ${models.length}` : `${selSet.size} of ${models.length}`;
  };
  btn.addEventListener("click", (e) => { e.stopPropagation(); panel.hidden = !panel.hidden; });
  panel.addEventListener("change", (e) => {
    const cb = e.target.closest("input[data-m]"); if (!cb) return;
    const m = cb.getAttribute("data-m");
    if (cb.checked) selSet.add(m); else selSet.delete(m);
    sync(); onChange();
  });
  document.addEventListener("click", (e) => { if (!host.contains(e.target)) panel.hidden = true; });
  sync();
  return { sync };
}

/* Compact every page header: collapse the descriptive tagline behind a small
   "i" next to the h1 (hover = preview, click = show/hide). Frees vertical space. */
function compactHero() {
  document.querySelectorAll(".hero").forEach((hero) => {
    const h1 = hero.querySelector("h1");
    const tag = hero.querySelector(".tagline");
    if (!h1 || !tag || h1.querySelector(".hero-info")) return;
    tag.hidden = true;
    const icon = document.createElement("span");
    icon.className = "info hero-info";
    icon.setAttribute("role", "button");
    icon.tabIndex = 0;
    icon.textContent = "i";
    icon.title = (tag.textContent || "").trim() + "\n(click to show / hide)";
    h1.appendChild(document.createTextNode(" "));
    h1.appendChild(icon);
    const toggle = (e) => { e.preventDefault(); e.stopPropagation(); tag.hidden = !tag.hidden; };
    icon.addEventListener("click", toggle);
    icon.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") toggle(e); });
  });
}

/* ---------- auto-link glossary terms in prose to the glossary page (new tab) ----------
   Scoped to readable prose only: skips tables, buttons, controls, chart values, code, and
   already-linked text. Each distinct term is linked once per section (dedup), longest match wins. */
const GLOSS_TERMS = [
  ["KV-cache quantization", "kv_quant"], ["KV cache quantization", "kv_quant"], ["KV-cache quant", "kv_quant"], ["KV quant", "kv_quant"],
  ["continuous batching", "continuous_batching"], ["speculative decoding", "speculative"], ["draft model", "draft_model"],
  ["batch size", "batch_size"], ["KV-cache", "kv_cache"], ["KV cache", "kv_cache"], ["GPU memory", "gpu_memory"], ["VRAM", "gpu_memory"],
  ["HumanEval", "humaneval"], ["GSM8K", "gsm8k"], ["pass@1", "pass@1"], ["perplexity", "perplexity"], ["throughput", "throughput"],
  ["TTFT", "ttft"], ["TPOT", "tpot"], ["latency", "latency"], ["acceptance", "acceptance"], ["speculative", "speculative"],
  ["quantization", "quantization"], ["quantized", "quantization"], ["quantize", "quantization"], ["batching", "batching"],
  ["bf16", "bf16"], ["8-bit", "int8"], ["4-bit", "int4"], ["vLLM", "vllm"], ["MLX", "mlx"],
];
const GLOSS_ALIAS = {}; GLOSS_TERMS.forEach(([a, k]) => { GLOSS_ALIAS[a.toLowerCase()] = k; });
const GLOSS_RE = new RegExp("\\b(" + GLOSS_TERMS.map(([a]) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).sort((x, y) => y.length - x.length).join("|") + ")\\b", "gi");
const GLOSS_SKIP_TAGS = new Set(["A", "BUTTON", "CODE", "PRE", "SCRIPT", "STYLE", "CANVAS", "SELECT", "OPTION", "INPUT", "TEXTAREA", "LABEL", "H1", "TABLE", "THEAD", "TBODY", "TR", "TD", "TH"]);
const GLOSS_SKIP_CLASS = ["info", "gloss-link", "no-gloss", "pill", "badge", "val", "ctl-status", "ctl-label", "pop-btn", "pop-panel", "modelchips", "chip", "tag-pass", "tag-fail", "caret", "tgroup", "filtergroup", "navlinks", "brand", "modal-tabs", "subtabs"];
let _linkifying = false, _glossObs = null;

function glossSkipped(el, root) {
  for (let p = el; p && p !== root.parentElement; p = p.parentElement) {
    if (p.nodeType !== 1) continue;
    if (GLOSS_SKIP_TAGS.has(p.tagName)) return true;
    for (const c of GLOSS_SKIP_CLASS) if (p.classList && p.classList.contains(c)) return true;
  }
  return false;
}

function linkifyGlossary(root, excludeKey) {
  if (!root || _linkifying) return;
  _linkifying = true;
  if (_glossObs) _glossObs.disconnect();
  try {
    const used = new Set(); if (excludeKey) used.add(excludeKey);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() && !glossSkipped(n.parentElement, root)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
    });
    const nodes = []; let nn; while ((nn = walker.nextNode())) nodes.push(nn);
    nodes.forEach((node) => {
      const text = node.nodeValue; GLOSS_RE.lastIndex = 0;
      let m, last = 0, frag = null;
      while ((m = GLOSS_RE.exec(text))) {
        const key = GLOSS_ALIAS[m[1].toLowerCase()];
        if (!key || used.has(key)) continue;
        used.add(key);
        frag = frag || document.createDocumentFragment();
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const a = document.createElement("a");
        a.href = "glossary.html#gloss-" + key; a.target = "_blank"; a.rel = "noopener"; a.className = "gloss-link";
        a.title = "Open “" + m[1] + "” in the glossary"; a.textContent = m[1];
        frag.appendChild(a); last = m.index + m[1].length;
      }
      if (frag) { if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last))); node.parentNode.replaceChild(frag, node); }
    });
  } catch (e) { /* never let linkifying break the page */ } finally {
    _linkifying = false;
    if (_glossObs) _glossObs.observe(document.querySelector(".wrap"), { childList: true, subtree: true });
  }
}

function startGlossaryLinks() {
  const here = location.pathname.split("/").pop() || "index.html";
  if (here === "glossary.html") return;                     // don't self-link the glossary page
  const wrap = document.querySelector(".wrap"); if (!wrap) return;
  _glossObs = new MutationObserver((muts) => {
    if (_linkifying) return;
    const roots = [];
    muts.forEach((mu) => mu.addedNodes.forEach((n) => { if (n.nodeType === 1) roots.push(n); }));
    if (roots.length) requestAnimationFrame(() => roots.forEach((r) => r.isConnected && linkifyGlossary(r)));
  });
  linkifyGlossary(wrap);                                    // initial pass (also starts the observer)
}

document.addEventListener("DOMContentLoaded", () => { renderNav(); compactHero(); fillInfo(); startGlossaryLinks(); });
