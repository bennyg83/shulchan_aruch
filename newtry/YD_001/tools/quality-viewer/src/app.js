const summaryEl = document.getElementById("summary");
const simanListEl = document.getElementById("siman-list");
const progressEl = document.getElementById("progress-lines");
const llmBadgeEl = document.getElementById("llm-badge");
const llmJobEl = document.getElementById("llm-job");
const llmSelectedBtn = document.getElementById("llm-selected");

export function setLoading(isLoading) {
  document.body.classList.toggle("is-loading", isLoading);
}

export function setError(message) {
  summaryEl.innerHTML = `<div class="card card-fail"><strong>Scan failed</strong><p>${escapeHtml(message)}</p></div>`;
}

export function setLlmStatus(status) {
  if (!llmBadgeEl) return;
  if (!status?.server?.ok) {
    llmBadgeEl.textContent = "LLM offline";
    llmBadgeEl.className = "badge badge-fail";
    return;
  }
  const c = status.cache || {};
  llmBadgeEl.textContent = `LLM ${c.clean ?? 0} pass / ${c.reviewed ?? 0} reviewed`;
  llmBadgeEl.className = "badge badge-live";
}

export function setLlmJob(text) {
  if (llmJobEl) llmJobEl.textContent = text || "";
}

export function setSelectedSiman(siman) {
  if (llmSelectedBtn) {
    llmSelectedBtn.disabled = !siman;
    llmSelectedBtn.textContent = siman
      ? `LLM validate siman ${String(siman).padStart(3, "0")}`
      : "LLM validate siman";
  }
}

export function setData(_data) {
  // kept for HMR compatibility
}

function pct(n, d) {
  if (!d) return "0%";
  return `${Math.round((n / d) * 1000) / 10}%`;
}

function filterSimanim(rows, filter, search) {
  let out = rows;
  if (filter === "pass") out = out.filter((r) => r.status === "pass");
  if (filter === "fail") out = out.filter((r) => r.status === "fail");
  if (filter === "warn") out = out.filter((r) => r.status === "warn");
  if (filter === "quality-pass") out = out.filter((r) => r.qualityPassTagged);
  if (filter === "not-logged") out = out.filter((r) => !r.logged);
  if (filter === "llm-pending") out = out.filter((r) => (r.llmPending ?? 0) > 0);
  if (filter === "llm-clean") out = out.filter((r) => r.llmReviewed > 0 && (r.llmPending ?? 0) === 0);
  if (filter === "llm-unreviewed")
    out = out.filter((r) => (r.llmReviewed ?? 0) < r.blockCount);
  const q = search.trim();
  if (q) out = out.filter((r) => String(r.siman).includes(q) || r.tag.includes(q));
  return out;
}

function llmLabelClass(label) {
  if (label === "C") return "llm-c";
  if (label === "B") return "llm-b";
  if (label === "A") return "llm-a";
  return "llm-d";
}

export function renderApp({ data, filter, search, selectedSiman, onSelectSiman }) {
  if (!data) return;
  const t = data.totals;
  setSelectedSiman(selectedSiman);

  summaryEl.innerHTML = `
    <div class="card card-pass">
      <div class="card-value">${t.simanimPass}</div>
      <div class="card-label">Heuristic pass</div>
      <div class="card-sub">${pct(t.simanimPass, t.simanim)} simanim</div>
    </div>
    <div class="card card-fail">
      <div class="card-value">${t.simanimFail}</div>
      <div class="card-label">Heuristic fail</div>
      <div class="card-sub">${t.errorBlocks} error blocks</div>
    </div>
    <div class="card card-pass">
      <div class="card-value">${t.llmClean ?? 0}</div>
      <div class="card-label">LLM pass (B/C)</div>
      <div class="card-sub">Label B/C, no escalate</div>
    </div>
    <div class="card card-warn">
      <div class="card-value">${t.llmPending ?? 0}</div>
      <div class="card-label">LLM pending</div>
      <div class="card-sub">A/D or low confidence</div>
    </div>
    <div class="card">
      <div class="card-value">${t.llmUnreviewed ?? 0}</div>
      <div class="card-label">Not LLM-reviewed</div>
      <div class="card-sub">${t.llmReviewed ?? 0} reviewed of ${t.blocks}</div>
    </div>
    <div class="card">
      <div class="card-value">${t.ramaMissingBlocks}</div>
      <div class="card-label">Rama gaps</div>
      <div class="card-sub">Missing {Rama:}</div>
    </div>
  `;

  const rows = filterSimanim(data.simanim, filter, search);
  simanListEl.innerHTML = rows
    .map((r) => {
      const selected = selectedSiman === r.siman ? " selected" : "";
      const badges = [
        r.qualityPassTagged ? '<span class="mini-tag">QP</span>' : "",
        r.logged ? "" : '<span class="mini-tag mini-warn">unlogged</span>',
        r.llmReviewed
          ? `<span class="mini-tag">${r.llmClean}/${r.llmReviewed} LLM</span>`
          : "",
      ].join("");
      const issues =
        r.topIssues?.length > 0
          ? r.topIssues.map((i) => `${i.code}×${i.count}`).join(", ")
          : "clean";
      return `
        <button type="button" class="siman-row siman-${r.status}${selected}" data-siman="${r.siman}">
          <span class="siman-num">${r.tag}</span>
          <span class="status-pill status-${r.status}">${r.status}</span>
          <span class="siman-blocks">${r.passedCount}/${r.blockCount}</span>
          <span class="siman-issues">${issues}</span>
          <span class="siman-badges">${badges}</span>
        </button>`;
    })
    .join("");

  simanListEl.querySelectorAll("[data-siman]").forEach((btn) => {
    btn.addEventListener("click", () => onSelectSiman(Number(btn.dataset.siman)));
  });

  progressEl.innerHTML = (data.progress?.lastLines || [])
    .map((line) => `<li><code>${escapeHtml(line)}</code></li>`)
    .join("");
}

export function renderBlockDetail(blocks) {
  return blocks
    .map((b) => {
      const status = b.passed ? "pass" : b.errors.length || b.failPattern ? "fail" : "warn";
      const tags = [
        b.failPattern ? "failure-pattern" : "",
        b.ramaMissing ? "rama-missing" : "",
        b.hasRama ? "has-rama" : "",
        ...b.errors.map((e) => e.code),
        ...b.warns.map((w) => w.code),
      ]
        .filter(Boolean)
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("");

      const llm = b.llm
        ? `<div class="llm-row">
            <span class="llm-pill ${llmLabelClass(b.llm.label)}">${escapeHtml(b.llm.label)}</span>
            <span class="muted">${Math.round((b.llm.confidence ?? 0) * 100)}%</span>
            <span>${escapeHtml(b.llm.reason || "")}</span>
            ${b.llm.escalate ? '<span class="tag tag-warn">escalate</span>' : '<span class="tag tag-ok">clean</span>'}
          </div>`
        : `<div class="llm-row muted">Not LLM-reviewed yet</div>`;

      return `
        <article class="block block-${status}">
          <header>
            <strong>Seif ${escapeHtml(b.seif)}</strong>
            <span class="muted">marker: ${escapeHtml(b.marker)}</span>
            <span class="status-pill status-${status}">${status}</span>
          </header>
          <div class="tags">${tags || '<span class="tag tag-ok">clean</span>'}</div>
          ${llm}
          <div class="preview">
            <div><span class="label">Hebrew</span><p>${escapeHtml(b.hePreview)}</p></div>
            <div><span class="label">English</span><p>${escapeHtml(b.enPreview)}</p></div>
          </div>
        </article>`;
    })
    .join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
