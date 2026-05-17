/**
 * OC 318 “very full” interleaved build:
 * - Same DOM/mechanics as build_oc318_full_complete.mjs
 * - Additionally merges standalone bilingual documents:
 *     318_bach_he_en.txt → slug bach
 *     318_perishah_he_en.txt → slug perishah
 *     318_darkhei_moshe_he_en.txt → slug darkhei-moshe
 *     318_or_chadash_he_en.txt → slug or-chadash-tashlum-beit-yosef
 *     318_beur_halakhah_he_en.txt → beur-halakhah (matched by Shulchan Aruch seif number in headings)
 * - Remaining HTML-only commentaries still use translation_layers/<slug>_en.json
 *
 * Usage: node build_oc318_very_full.mjs [path-to-html]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { load } from "cheerio";
import {
  SEP,
  BILINGUAL_META,
  buildBilingualLibrary,
  parseHeEnTxt,
  extractMarkers,
  extractSectionsFromColumn,
  slugFromParshanEl,
  displayTitleForColumn,
  formatVerseHeadingBlock,
  alignmentHintFromVerse,
  emitSection,
  emitExtractedCommentarySection,
  loadTranslationLayer,
  englishForExtracted,
  readIfExists,
} from "./oc318_html_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "oc_318_very_full.txt");
const DEFAULT_HTML = path.join(__dirname, "source html");

/** Wired like BILINGUAL_META; merged into the bilingual lookup map. */
export const EXTRA_BILINGUAL_META = {
  bach: {
    title: "BACH",
    file: "318_bach_he_en.txt",
    kind: "he_en",
  },
  perishah: {
    title: "PERISHAH",
    file: "318_perishah_he_en.txt",
    kind: "he_en",
  },
  "darkhei-moshe": {
    title: "DARKHEI MOSHE",
    file: "318_darkhei_moshe_he_en.txt",
    kind: "he_en",
  },
  "or-chadash-tashlum-beit-yosef": {
    title: "OR CHADASH (TASHLUM BEIT YOSEF)",
    file: "318_or_chadash_he_en.txt",
    kind: "he_en",
  },
};

const MERGED_META = { ...BILINGUAL_META, ...EXTRA_BILINGUAL_META };
const VERY_FULL_BILINGUAL_SLUGS = new Set(Object.keys(MERGED_META));

function buildVeryFullLibrary(dir) {
  const lib = buildBilingualLibrary(dir);
  for (const [slug, meta] of Object.entries(EXTRA_BILINGUAL_META)) {
    if (meta.kind === "he_en") {
      lib[slug] = parseHeEnTxt(readIfExists(path.join(dir, meta.file)));
    }
  }
  return lib;
}

function pendingPlaceholder(slug, num, marker) {
  return (
    "[English pending — add translation_layers/" +
    slug +
    '_en.json → "' +
    num +
    '" → "' +
    marker +
    '"]'
  );
}

function buildDocument($, library, beurHalakhahBySeif, enCache, includePending) {
  const chunks = [];
  const warnings = [];

  chunks.push(SEP);
  chunks.push(
    "OC 318 — Very full compilation (bilingual *_he_en.txt + Beur Halakhah document + translation_layers)"
  );
  chunks.push(SEP);
  chunks.push("");
  chunks.push(
    "Includes merged standalone translations:",
    "• Bach, Perishah, Darkhei Moshe, Or Chadash — from 318_*_he_en.txt (same marker keys as AlHaTorah).",
    "• Beur Halakhah — from 318_beur_halakhah_he_en.txt, keyed by Shulchan Aruch seif number (1), (3), …",
    "• Plus all layers already in BILINGUAL_META (Beit Yosef, Taz, … Mishna Berurah, Kitzur).",
    "• Other columns: translation_layers JSON + Hebrew from inspect HTML.",
    ""
  );

  const verses = $(".verse[data-num]").toArray().sort((a, b) => {
    const na = Number($(a).attr("data-num")) || 0;
    const nb = Number($(b).attr("data-num")) || 0;
    return na - nb;
  });

  for (const vEl of verses) {
    const $verse = $(vEl);
    const num = String($verse.attr("data-num") || "").trim();
    const label = ($verse.attr("data-label") || "").trim();
    const pad = num.padStart(2, "0");
    const mechaberPath = path.join(__dirname, `318_mechaber_rama_seif_${pad}.txt`);

    const hint = alignmentHintFromVerse($, $verse);

    chunks.push(SEP);
    chunks.push(`SEIF ${num}${label ? ` (${label})` : ""}`);
    chunks.push(SEP);
    chunks.push(...formatVerseHeadingBlock($, $verse));
    chunks.push("");
    chunks.push(`Alignment hint (Mechaber/Rama): ${hint || "[empty]"}`);
    chunks.push("");

    try {
      chunks.push(readIfExists(mechaberPath).trimEnd());
    } catch {
      chunks.push(`[Missing ${path.basename(mechaberPath)}]`);
      warnings.push(`Missing mechaber file for seif ${num}`);
    }
    chunks.push("");

    const $cols = $verse.find(".parshan-columns > .parshan");
    const emittedSlugs = new Set();

    $cols.each((_, colEl) => {
      const $col = $(colEl);
      const slug = slugFromParshanEl($col);
      if (!slug || emittedSlugs.has(slug)) return;
      emittedSlugs.add(slug);

      const title = displayTitleForColumn($, $col);

      /* Beur Halakhah: inspect HTML uses one block per seif (marker “_”); bilingual doc keys by seif number. */
      if (slug === "beur-halakhah") {
        const bh = beurHalakhahBySeif.get(num);
        if (bh && (includePending || String(bh.en || "").trim())) {
          chunks.push(SEP);
          chunks.push(`BEUR HALAKHAH — seif ${num} [318_beur_halakhah_he_en.txt]`);
          chunks.push(SEP);
          chunks.push("");
          chunks.push(
            emitSection(
              num,
              bh.he,
              includePending ? bh.en || pendingPlaceholder(slug, num, num) : bh.en,
              null
            )
          );
          chunks.push(SEP);
          chunks.push("");
          return;
        }
        if (!bh) warnings.push(`Beur Halakhah: no block (${num}) in 318_beur_halakhah_he_en.txt — falling back`);
        /* Fallback: translation_layers + HTML Hebrew */
        if (!enCache.has(slug)) enCache.set(slug, loadTranslationLayer(__dirname, slug));
        const enMap = enCache.get(slug);
        const sections = extractSectionsFromColumn($, $col);
        const rows = [];
        for (const { marker, he } of sections) {
          const resolved = englishForExtracted(enMap, num, marker);
          if (includePending) {
            rows.push({
              marker,
              he,
              en: resolved || pendingPlaceholder(slug, num, marker),
            });
          } else if (resolved && String(resolved).trim()) {
            rows.push({ marker, he, en: resolved.trim() });
          }
        }
        if (rows.length === 0) return;
        chunks.push(SEP);
        chunks.push(`${title} (${slug}) — ${rows.length} subsection(s) [fallback: inspect HTML + JSON]`);
        chunks.push(SEP);
        chunks.push("");
        for (const { marker, he, en } of rows) {
          chunks.push(emitExtractedCommentarySection(marker, he, en, null, slug));
          chunks.push(SEP);
          chunks.push("");
        }
        return;
      }

      if (VERY_FULL_BILINGUAL_SLUGS.has(slug)) {
        const markers = extractMarkers($, $col);
        if (markers.length === 0) return;

        const meta = MERGED_META[slug];
        const map = library[slug];

        const blocksOut = [];
        for (const marker of markers) {
          const block = map.get(marker);
          if (!block) {
            warnings.push(`Missing [${slug}] (${marker}) — seif ${num}`);
            if (!includePending) continue;
            blocksOut.push({
              marker,
              he: "[No matching section in bilingual export]",
              en: "",
            });
            continue;
          }
          const hasEn = String(block.en || "").trim().length > 0;
          if (!includePending && !hasEn) continue;
          blocksOut.push({ marker, he: block.he, en: block.en || "" });
        }

        if (blocksOut.length === 0) return;

        chunks.push(SEP);
        const src = meta.file || meta.sectionsJson || "kitzur";
        chunks.push(`${meta.title} — markers: ${blocksOut.map((b) => b.marker).join(", ")} [${src}]`);
        chunks.push(SEP);
        chunks.push("");

        for (const { marker, he, en } of blocksOut) {
          chunks.push(emitSection(marker, he, en, null));
          chunks.push(SEP);
          chunks.push("");
        }
        return;
      }

      if (!enCache.has(slug)) {
        enCache.set(slug, loadTranslationLayer(__dirname, slug));
      }
      const enMap = enCache.get(slug);

      const sections = extractSectionsFromColumn($, $col);
      if (sections.length === 0) return;

      const rows = [];
      for (const { marker, he } of sections) {
        const resolved = englishForExtracted(enMap, num, marker);
        if (includePending) {
          rows.push({
            marker,
            he,
            en: resolved || pendingPlaceholder(slug, num, marker),
          });
        } else if (resolved && String(resolved).trim()) {
          rows.push({ marker, he, en: resolved.trim() });
        }
      }

      if (rows.length === 0) return;

      chunks.push(SEP);
      chunks.push(`${title} (${slug}) — ${rows.length} subsection(s) [Hebrew from inspect HTML]`);
      chunks.push(SEP);
      chunks.push("");

      for (const { marker, he, en } of rows) {
        chunks.push(emitExtractedCommentarySection(marker, he, en, null, slug));
        chunks.push(SEP);
        chunks.push("");
      }
    });

    chunks.push("");
  }

  chunks.push(SEP);
  chunks.push("END");
  chunks.push(SEP);
  chunks.push("");
  chunks.push(SEP);
  chunks.push("Notes");
  chunks.push(SEP);
  chunks.push(
    "• Built by build_oc318_very_full.mjs — merges EXTRA_BILINGUAL_META files + Beur Halakhah txt + BILINGUAL_META + translation_layers.",
    ""
  );

  return { chunks, warnings };
}

function run() {
  const htmlPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_HTML;
  const htmlRaw = readIfExists(htmlPath);
  const $ = load(htmlRaw);

  const library = buildVeryFullLibrary(__dirname);
  const beurHalakhahBySeif = parseHeEnTxt(
    readIfExists(path.join(__dirname, "318_beur_halakhah_he_en.txt"))
  );
  const enCache = new Map();

  const doc = buildDocument($, library, beurHalakhahBySeif, enCache, false);

  const warnText = (w) =>
    w.length ? ["--- Build warnings ---\n", w.join("\n"), "\n"] : [];

  let out = doc.chunks.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
  out += warnText(doc.warnings).join("");
  fs.writeFileSync(OUT, out, "utf8");

  console.log("Wrote", OUT);
  if (doc.warnings.length) console.warn("Warnings:", doc.warnings.length);
}

run();
