import { renderSidebar, renderSimanView } from "./app.js";

let state = {
  index: [],
  activeSiman: null,
  simanData: null,
  activeCommentary: null,
  filterGarbage: false,
  search: "",
};

async function fetchIndex() {
  const r = await fetch("/api/index");
  state.index = await r.json();
}

async function fetchSiman(num) {
  const r = await fetch(`/api/siman?n=${num}`);
  state.simanData = await r.json();
  state.activeCommentary = state.simanData?.commentaries?.[0]?.slug || null;
}

async function selectSiman(num) {
  state.activeSiman = num;
  await fetchSiman(num);
  renderAll();
}

function renderAll() {
  renderSidebar(state, { onSelect: selectSiman });
  if (state.simanData) {
    renderSimanView(state, { onSelectCommentary: (slug) => {
      state.activeCommentary = slug;
      renderAll();
    }});
  }
}

// HMR live updates
if (import.meta.hot) {
  import.meta.hot.on("siman-update", ({ siman, data }) => {
    if (siman === state.activeSiman) {
      state.simanData = data;
      renderAll();
    }
  });
  import.meta.hot.on("index-update", (entry) => {
    if (!entry) return;
    const i = state.index.findIndex((s) => s.siman === entry.siman);
    if (i !== -1) state.index[i] = entry;
    else state.index.push(entry);
    state.index.sort((a, b) => a.siman - b.siman);
    renderSidebar(state, { onSelect: selectSiman });
  });
}

// Controls
document.getElementById("filter-garbage").addEventListener("change", (e) => {
  state.filterGarbage = e.target.checked;
  renderSidebar(state, { onSelect: selectSiman });
});
document.getElementById("search-siman").addEventListener("input", (e) => {
  state.search = e.target.value.trim();
  renderSidebar(state, { onSelect: selectSiman });
});

// Boot
await fetchIndex();
renderSidebar(state, { onSelect: selectSiman });
// Auto-select first dirty siman
const first = state.index.find((s) => s.garbageBlocks > 0) || state.index[0];
if (first) await selectSiman(first.siman);
