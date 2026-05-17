/**
 * Shared helpers for OC 318 HTML-driven builders (inspect export from AlHaTorah).
 */
import fs from "fs";
import path from "path";

export const SEP = "=".repeat(80);

/** Works with pre-built bilingual files in newtryoutput (marker keys match span.num). */
export const BILINGUAL_META = {
  "beit-yosef": {
    title: "BEIT YOSEF",
    file: "318_beit_yosef_he_en.txt",
    kind: "he_en",
  },
  taz: {
    title: "TAZ",
    file: "318_taz_he_en.txt",
    kind: "he_en",
  },
  "magen-avraham": {
    title: "MAGEN AVRAHAM",
    file: "318_magen_avraham_he_en.txt",
    kind: "he_en",
  },
  "mishna-berurah": {
    title: "MISHNA BERURAH",
    file: "318_mishna_berurah_he_en.txt",
    kind: "he_en",
  },
  "kaf-hachayyim": {
    title: "KAF HACHAYYIM",
    file: "318_kaf_hachayyim_he_en.txt",
    kind: "he_en",
  },
  "baer-heitev": {
    title: "BAER HETEV",
    file: "318_ber_heteiv_he_en.txt",
    kind: "he_en",
  },
  "beur-hagra": {
    title: "BIUR HAGRA",
    file: "318_biur_hagra_he_en.txt",
    kind: "he_en",
  },
  "shulchan-arukh-kifshuto": {
    title: "SHULCHAN ARUCH KITZUTA",
    file: "318_kitzur_he_en.txt",
    sectionsJson: "kitzur_sections.json",
    enJson: "kitzur_en_translations.json",
    kind: "kitzur",
  },
};

/** UI / non-commentary column classes to skip. */
export const SKIP_SLUGS = new Set(["minimized"]);

export function readIfExists(p) {
  if (!fs.existsSync(p)) throw new Error(`Missing file: ${p}`);
  return fs.readFileSync(p, "utf8");
}

export function readIfExistsOptional(p) {
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf8");
}

export function parseHeEnTxt(raw) {
  const map = new Map();
  const parts = raw.split(/^={10,}\s*$/m);
  for (const part of parts) {
    const p = part.trim();
    if (!p || /^OC 318/.test(p) || /^Format:/.test(p)) continue;
    const m = p.match(/^\(([^)]+)\)\s*\n([\s\S]*)$/);
    if (!m) continue;
    const letter = m[1].trim();
    const rest = m[2].trim();
    const idx = rest.indexOf("\n\n");
    let he;
    let en;
    if (idx === -1) {
      he = rest;
      en = "";
    } else {
      he = rest.slice(0, idx).trim();
      en = rest.slice(idx + 2).trim();
    }
    map.set(letter, { he, en });
  }
  return map;
}

export function loadKitzurMaps(dir) {
  const sections = JSON.parse(readIfExists(path.join(dir, BILINGUAL_META["shulchan-arukh-kifshuto"].sectionsJson)));
  const ens = JSON.parse(readIfExists(path.join(dir, BILINGUAL_META["shulchan-arukh-kifshuto"].enJson)));
  const map = new Map();
  sections.forEach((s, i) => {
    map.set(s.letter, { he: s.he, en: ens[i] ?? "" });
  });
  return map;
}

export function buildBilingualLibrary(dir) {
  const lib = {};
  for (const [slug, meta] of Object.entries(BILINGUAL_META)) {
    if (meta.kind === "he_en") {
      lib[slug] = parseHeEnTxt(readIfExists(path.join(dir, meta.file)));
    } else if (meta.kind === "kitzur") {
      lib[slug] = loadKitzurMaps(dir);
    }
  }
  return lib;
}

export function normalizeMarkerText($, $numSpan) {
  let t = $numSpan.text().trim();
  if (t === "(_plain)") {
    const ptext = $numSpan.closest(".parshan-p").text();
    const matches = [...ptext.matchAll(/\(([^)]+)\)/g)].map((x) => x[1]);
    const real = matches.find((x) => x !== "_plain");
    return real ? real.trim() : "";
  }
  const m = t.match(/\(([^)]+)\)/);
  if (m) return m[1].trim();
  return t.replace(/^\(|\)$/g, "").trim();
}

export function extractMarkers($, $parshan) {
  const markers = [];
  $parshan.find(".content .parshan-p .num").each((_, el) => {
    const marker = normalizeMarkerText($, $(el));
    if (marker) markers.push(marker);
  });
  return markers;
}

/**
 * Subsections with Hebrew taken from this verse column only (for works without a global bilingual file).
 */
export function extractSectionsFromColumn($, $parshan) {
  const sections = [];
  let curMarker = null;
  let parts = [];

  const flush = () => {
    const txt = normalizeWs(parts.join("\n")).trim();
    if (curMarker === null && !txt) return;
    sections.push({ marker: curMarker ?? "_", he: txt });
    parts = [];
  };

  $parshan.find(".content .parshan-p").each((_, el) => {
    const $p = $(el);
    const $n = $p.find(".num").first();
    if ($n.length) {
      flush();
      curMarker = normalizeMarkerText($, $n);
    }
    const clone = $p.clone();
    clone.find(".num").remove();
    const t = clone.text().replace(/\s+/g, " ").trim();
    if (t) parts.push(t);
  });
  flush();
  return sections;
}

function normalizeWs(s) {
  return s.replace(/\s+/g, " ").trim();
}

export function slugFromParshanEl($el) {
  const cls = ($el.attr("class") || "").split(/\s+/).filter(Boolean);
  for (const s of cls) {
    if (s === "parshan") continue;
    if (SKIP_SLUGS.has(s)) continue;
    return s;
  }
  return null;
}

export function displayTitleForColumn($, $col) {
  const t = $col.find(".parshan-label").first().text().trim();
  return t || slugFromParshanEl($col);
}

export function stripTagsHint(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Reads AlHaTorah chapter heading from the verse row (same source as .mg-verse-iconbar Tur links):
 * data-path, .chapter-title, first <center>, Tur / Tur+SA hrefs, and top-nav book location.
 */
export function extractAlHaTorahVerseHeading($, $verse) {
  const $main = $verse.find(".main").first();
  const dataPath = String($verse.attr("data-path") || "").trim();
  const chapterTitleHe = $main.find(".chapter-title").first().text().replace(/\s+/g, " ").trim();
  const $firstCenter = $main.children("center").first();
  const centerHe = $firstCenter.length
    ? $firstCenter.text().replace(/\s+/g, " ").trim()
    : $main.find("center").first().text().replace(/\s+/g, " ").trim();
  const turHref = $main.find("a.seif-goto-tur").attr("href") || "";
  const turSaHref = $main.find("a.seif-goto-tur-sa").attr("href") || "";
  const navEn = $(".nav-location-text .mg-lang-en").first().text().replace(/\s+/g, " ").trim();
  const navHe = $(".nav-location-text .mg-lang-he").first().text().replace(/\s+/g, " ").trim();
  return {
    simanDecimal: dataPath || null,
    chapterTitleHe,
    centerHe,
    turHref,
    turSaHref,
    navEn,
    navHe,
  };
}

/** Lines to print under each SEIF block (chapter number, titles, icon-bar links). */
export function formatVerseHeadingBlock($, $verse) {
  const h = extractAlHaTorahVerseHeading($, $verse);
  const out = ["AlHaTorah — chapter & title (from page / icon bar)"];
  if (h.navEn) out.push(`  EN (nav): ${h.navEn}`);
  if (h.navHe) out.push(`  HE (nav): ${h.navHe}`);
  if (h.simanDecimal) out.push(`  Siman (decimal, data-path): ${h.simanDecimal}`);
  if (h.chapterTitleHe) out.push(`  Chapter line (div.chapter-title): ${h.chapterTitleHe}`);
  if (h.centerHe) out.push(`  Subtitle (center under icon bar): ${h.centerHe}`);
  if (h.turHref) out.push(`  Tur: ${h.turHref}`);
  if (h.turSaHref) out.push(`  Tur + Shulchan Arukh: ${h.turSaHref}`);
  return out;
}

/** Alignment snippet without icon bar / chapter title / center so it tracks Mechaber text only. */
export function alignmentHintFromVerse($, $verse, maxLen = 280) {
  const $main = $verse.find(".main").first().clone();
  $main.find(".mg-verse-iconbar").remove();
  $main.find(".chapter-title").remove();
  $main.find("center").remove();
  const t = stripTagsHint($main.html() || $main.text());
  if (!t) return "";
  return t.slice(0, maxLen) + (t.length > maxLen ? "…" : "");
}

export function emitSection(marker, he, en, missingNote) {
  const lines = [`(${marker})`, ""];
  if (missingNote) lines.push(missingNote, "");
  lines.push(he, "", en);
  return lines.join("\n");
}

/** When Hebrew is full commentary from HTML and EN is a short summary in translation_layers JSON. */
export const EXTRACTED_EN_RATIO_NOTE =
  "[English below is a thematic summary only. The Hebrew above is the full commentary text from AlHaTorah; it is not rendered here as a sentence-by-sentence translation.]";

/** Long-form HTML-only columns often ship thematic EN summaries in JSON — flag ratio even when EN is thousands of chars. */
export const SUMMARY_STYLE_SLUGS = new Set(["or-chadash-tashlum-beit-yosef", "derishah"]);

export function shouldAnnotateExtractedSummary(he, en, slug = null) {
  const h = String(he || "").length;
  const e = String(en || "").trim().length;
  if (h < 400 || e === 0) return false;
  const enStr = String(en || "");
  if (/English pending/i.test(enStr)) return false;
  const ratio = e / h;
  if (ratio < 0.22) return true;
  /* Or Chadash / Derishah JSON entries are thematic summaries; ratio often lands ~0.35–0.75. */
  if (slug && SUMMARY_STYLE_SLUGS.has(slug) && ratio < 0.82) return true;
  return false;
}

/** Like emitSection but inserts EXTRACTED_EN_RATIO_NOTE between Hebrew and English when EN is proportionally short. */
export function emitExtractedCommentarySection(marker, he, en, missingNote, slug = null) {
  const lines = [`(${marker})`, ""];
  if (missingNote) lines.push(missingNote, "");
  lines.push(he, "");
  if (shouldAnnotateExtractedSummary(he, en, slug)) {
    lines.push(EXTRACTED_EN_RATIO_NOTE, "");
  }
  lines.push(en);
  return lines.join("\n");
}

/** Load optional per-seif / per-marker English for extracted-only layers. */
export function loadTranslationLayer(dir, slug) {
  const p = path.join(dir, "translation_layers", `${slug}_en.json`);
  const raw = readIfExistsOptional(p);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function englishForExtracted(enMap, seifNum, marker) {
  if (!enMap || typeof enMap !== "object") return null;
  const bySeif = enMap[String(seifNum)];
  if (!bySeif || typeof bySeif !== "object") return null;
  const v = bySeif[marker];
  return typeof v === "string" && v.trim() ? v.trim() : null;
}
