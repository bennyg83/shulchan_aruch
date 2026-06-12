import {
  renderApp,
  renderBlockDetail,
  setError,
  setLoading,
  setLlmJob,
  setLlmStatus,
} from "./app.js";

const filterEl = document.getElementById("filter");
const searchEl = document.getElementById("search");
const refreshEl = document.getElementById("refresh");
const llmPendingEl = document.getElementById("llm-pending");
const llmSelectedEl = document.getElementById("llm-selected");
const updatedEl = document.getElementById("updated-at");
const liveBadge = document.getElementById("live-badge");

let currentData = null;
let selectedSiman = null;
let llmRunning = false;

async function fetchQuality(siman = null) {
  const qs = siman ? `?siman=${siman}` : "";
  const res = await fetch(`/api/mechaber-quality${qs}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function fetchLlmStatus() {
  const res = await fetch("/api/llm-status");
  if (!res.ok) return null;
  return res.json();
}

async function startLlmValidation(body) {
  if (llmRunning) return;
  llmRunning = true;
  setLlmJob("LLM validation running…");
  try {
    const res = await fetch("/api/llm-validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || res.statusText);
    setLlmJob(`LLM done — reviewed ${json.reviewed} block(s)`);
    await loadAll({ keepSelection: true });
    await refreshLlmStatus();
  } catch (err) {
    setLlmJob(String(err.message || err));
  } finally {
    llmRunning = false;
  }
}

async function refreshLlmStatus() {
  const status = await fetchLlmStatus();
  setLlmStatus(status);
}

async function loadAll({ keepSelection = true } = {}) {
  setLoading(true);
  try {
    const data = await fetchQuality();
    currentData = data;
    if (!keepSelection || !selectedSiman) {
      selectedSiman = null;
    }
    renderApp({
      data,
      filter: filterEl.value,
      search: searchEl.value,
      selectedSiman,
      onSelectSiman,
    });
    updatedEl.textContent = `Updated ${new Date(data.generatedAt).toLocaleString()}`;
    liveBadge.textContent = "Live";
    liveBadge.className = "badge badge-live";
    await refreshLlmStatus();
  } catch (err) {
    setError(String(err.message || err));
    liveBadge.textContent = "Error";
    liveBadge.className = "badge badge-fail";
  } finally {
    setLoading(false);
  }
}

async function onSelectSiman(siman) {
  selectedSiman = siman;
  const detail = document.getElementById("detail");
  detail.innerHTML = "<p class='muted'>Loading blocks…</p>";
  document.getElementById("detail-title").textContent = `Siman ${String(siman).padStart(3, "0")}`;

  renderApp({
    data: currentData,
    filter: filterEl.value,
    search: searchEl.value,
    selectedSiman,
    onSelectSiman,
  });

  try {
    const detailData = await fetchQuality(siman);
    const sim = detailData.simanim?.[0];
    if (!sim?.blocks) {
      detail.innerHTML = "<p class='muted'>No blocks found.</p>";
      return;
    }
    detail.innerHTML = renderBlockDetail(sim.blocks);
  } catch (err) {
    detail.innerHTML = `<p class="fail-text">${escapeHtml(String(err.message || err))}</p>`;
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

filterEl.addEventListener("change", () =>
  renderApp({
    data: currentData,
    filter: filterEl.value,
    search: searchEl.value,
    selectedSiman,
    onSelectSiman,
  })
);
searchEl.addEventListener("input", () =>
  renderApp({
    data: currentData,
    filter: filterEl.value,
    search: searchEl.value,
    selectedSiman,
    onSelectSiman,
  })
);
refreshEl.addEventListener("click", () => loadAll({ keepSelection: true }));
llmPendingEl.addEventListener("click", () => startLlmValidation({ pending: true, limit: 40 }));
llmSelectedEl.addEventListener("click", () => {
  if (selectedSiman) startLlmValidation({ siman: selectedSiman });
});

if (import.meta.hot) {
  import.meta.hot.accept("./app.js", (mod) => {
    if (mod && currentData) {
      mod.renderApp({
        data: currentData,
        filter: filterEl.value,
        search: searchEl.value,
        selectedSiman,
        onSelectSiman,
      });
    }
  });
}

function connectLiveUpdates() {
  if (!import.meta.hot) return;
  import.meta.hot.on("quality-update", (payload) => {
    if (payload?.error) {
      setError(payload.error);
      return;
    }
    if (payload?.data) {
      currentData = payload.data;
      renderApp({
        data: currentData,
        filter: filterEl.value,
        search: searchEl.value,
        selectedSiman,
        onSelectSiman,
      });
      updatedEl.textContent = `Updated ${new Date(payload.data.generatedAt).toLocaleString()} (${payload.reason || "live"})`;
      if (selectedSiman) onSelectSiman(selectedSiman);
      refreshLlmStatus();
    }
  });
  import.meta.hot.on("llm-progress", (progress) => {
    if (progress?.type === "block") {
      setLlmJob(`LLM ${progress.job?.done}/${progress.job?.total} — ${progress.result?.label} ${progress.result?.id?.split("#")[0] || ""}`);
    }
    if (progress?.type === "done") {
      setLlmJob(`LLM batch done — ${progress.summary?.reviewed ?? 0} in cache`);
      loadAll({ keepSelection: true });
    }
  });
}

loadAll();
connectLiveUpdates();
