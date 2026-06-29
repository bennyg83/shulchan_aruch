const simanListEl = document.getElementById("siman-list");
const indexSummaryEl = document.getElementById("index-summary");
const mainPlaceholder = document.getElementById("main-placeholder");
const simanViewEl = document.getElementById("siman-view");
const simanHeaderEl = document.getElementById("siman-header");
const commentaryTabsEl = document.getElementById("commentary-tabs");
const blocksViewEl = document.getElementById("blocks-view");

const SLUG_LABELS = {
  "mechaber": "Mechaber",
  "rama": "Rama",
  "tur": "Tur",
  "beit-yosef": "Beit Yosef",
  "darkei-moshe": "Darkei Moshe",
  "turei-zahav": "Taz",
  "magen-avraham": "Magen Avraham",
  "siftei-kohen": "Shach",
  "bach": "Bach",
  "beur-hagra": "Beur HaGra",
  "peri-megadim": "Peri Megadim",
  "mishna-berurah": "Mishna Berurah",
  "biur-halacha": "Biur Halacha",
  "shulchan-aruch-kpeshuta": "SA Kpeshuta",
  "chayei-adam": "Chayei Adam",
  "beer-hagolah": "Be'er HaGolah",
  "baer-heitev": "Baer Heitev",
  "nekudot-hakesef": "Nekudot HaKesef",
  "pitchei-teshuva": "Pitchei Teshuva",
  "rabbi-akiva-eiger-yd": "R. Akiva Eiger",
  "yad-avraham": "Yad Avraham",
  "chokhmat-adam": "Chokhmat Adam",
};

function label(slug) { return SLUG_LABELS[slug] || slug; }

function esc(s) {
  return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

export function renderSidebar(state, { onSelect }) {
  const total = state.index.length;
  const clean = state.index.filter((s) => s.clean).length;
  const dirty = total - clean;
  const totalGc = state.index.reduce((a, s) => a + s.garbageBlocks, 0);
  indexSummaryEl.innerHTML =
    `${total} simanim · <span style="color:var(--red)">${dirty} dirty</span> · ${totalGc} garbage blocks <span class="live-dot"></span>`;

  let rows = state.index;
  if (state.filterGarbage) rows = rows.filter((s) => s.garbageBlocks > 0);
  if (state.search) rows = rows.filter((s) => String(s.siman).includes(state.search));

  simanListEl.innerHTML = rows.map((s) => `
    <li class="${s.garbageBlocks > 0 ? "dirty" : "clean"} ${state.activeSiman === s.siman ? "active" : ""}"
        data-siman="${s.siman}">
      <span class="siman-num">${String(s.siman).padStart(3,"0")}</span>
      <span class="siman-gc ${s.garbageBlocks === 0 ? "zero" : ""}">
        ${s.garbageBlocks > 0 ? `⚠ ${s.garbageBlocks} dirty` : "✓ clean"}
      </span>
    </li>
  `).join("");

  simanListEl.querySelectorAll("li[data-siman]").forEach((li) => {
    li.addEventListener("click", () => onSelect(Number(li.dataset.siman)));
  });
}

export function renderSimanView(state, { onSelectCommentary }) {
  const d = state.simanData;
  if (!d) return;

  mainPlaceholder.style.display = "none";
  simanViewEl.style.display = "flex";
  simanViewEl.style.flexDirection = "column";
  simanViewEl.style.height = "100%";
  simanViewEl.style.overflow = "hidden";

  const gcClass = d.garbageBlocks > 0 ? "dirty" : "clean";
  simanHeaderEl.innerHTML = `
    <h2>Siman ${String(d.siman).padStart(3,"0")}</h2>
    <span class="gc-badge ${gcClass}">
      ${d.garbageBlocks > 0 ? `⚠ ${d.garbageBlocks} / ${d.totalBlocks} blocks dirty` : `✓ All ${d.totalBlocks} blocks clean`}
    </span>
  `;

  // Tabs
  commentaryTabsEl.innerHTML = d.commentaries.map((c) => `
    <button class="tab-btn ${c.garbageBlocks > 0 ? "has-garbage" : ""} ${state.activeCommentary === c.slug ? "active" : ""}"
            data-slug="${c.slug}">
      ${label(c.slug)}${c.garbageBlocks > 0 ? ` (${c.garbageBlocks})` : ""}
    </button>
  `).join("");
  commentaryTabsEl.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => onSelectCommentary(btn.dataset.slug));
  });

  // Blocks
  const activeC = d.commentaries.find((c) => c.slug === state.activeCommentary) || d.commentaries[0];
  if (!activeC) { blocksViewEl.innerHTML = ""; return; }

  blocksViewEl.innerHTML = activeC.blocks.map((b) => `
    <div class="block-card ${b.garbage ? "garbage" : ""}">
      <div class="block-meta">
        <span class="seif-label">Seif ${esc(b.seif)}</span>
        ${b.marker !== "_" ? `<span class="marker-label">marker ${esc(b.marker)}</span>` : ""}
        ${b.garbage ? `<span class="garbage-tag">⚠ GARBAGE</span>` : ""}
      </div>
      <div class="he-col">${esc(b.hebrew)}</div>
      <div class="en-col">${esc(b.english)}</div>
    </div>
  `).join("");
}
