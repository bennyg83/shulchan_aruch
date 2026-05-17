/**
 * Builds OC 318 compilations from inspect HTML + bilingual *_he_en files + translation_layers JSON.
 *
 * Writes TWO files:
 *   oc318_full_complete.txt — Mechaber/Rama + only commentary subsections that have English
 *     (bilingual maps with non-empty EN, or extract-only layers with JSON English). DOM order.
 *   oc318_full_complete_with_pending.txt — same structure but every column; missing English shows
 *     “[English pending — …]” (translator working copy).
 *
 * Usage: node build_oc318_full_complete.mjs [path-to-html]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { load } from "cheerio";
import {
  SEP,
  BILINGUAL_META,
  buildBilingualLibrary,
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

const OUT_TRANSLATED = path.join(__dirname, "oc318_full_complete.txt");
const OUT_PENDING = path.join(__dirname, "oc318_full_complete_with_pending.txt");
const DEFAULT_HTML = path.join(__dirname, "source html");

const BILINGUAL_SLUGS = new Set(Object.keys(BILINGUAL_META));

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

/**
 * @param {boolean} includePending
 * @returns {{ chunks: string[], warnings: string[] }}
 */
function buildDocument($, library, enCache, includePending) {
  const chunks = [];
  const warnings = [];

  if (includePending) {
    chunks.push(SEP);
    chunks.push("OC 318 — Full compilation (all inspect commentaries + bilingual layers)");
    chunks.push(SEP);
    chunks.push("");
    chunks.push(
      "Mechaber/Rama: pre-split files. Commentaries: column order = AlHaTorah DOM.",
      "Bilingual files (Beit Yosef, Taz, Magen Avraham, Baer Hetev, Biur HaGra, Kitzuta, Mishna Berurah): Hebrew+English from project *_he_en files keyed by (marker).",
      "All other columns: Hebrew from saved inspect HTML; English from translation_layers/<slug>_en.json",
      'if present — shape: { "1": { "א": "English..." }, "2": { ... } }. Otherwise “[English pending]”.',
      "Generate/update stubs: node export_oc318_translation_stubs.mjs",
      ""
    );
  } else {
    chunks.push(SEP);
    chunks.push("OC 318 — Translated compilation (interleaved Hebrew + English, DOM order)");
    chunks.push(SEP);
    chunks.push("");
    chunks.push(
      "Same column order as AlHaTorah. Only subsections with English are included:",
      "• Bilingual layers: marker kept if the *_he_en / Kitzur export has non-empty English.",
      "• Extract-only layers (Beur Halakhah, Kaf HaChayim, …): subsection kept if translation_layers/<slug>_en.json has text for that seif + marker.",
      "For missing-stub translation work use oc318_full_complete_with_pending.txt from this same build.",
      ""
    );
  }

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

      if (BILINGUAL_SLUGS.has(slug)) {
        const markers = extractMarkers($, $col);
        if (markers.length === 0) return;

        const meta = BILINGUAL_META[slug];
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
        chunks.push(`${meta.title} — markers: ${blocksOut.map((b) => b.marker).join(", ")}`);
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
  if (includePending) {
    chunks.push(
      "• Extracted columns use Hebrew exactly as in the inspect save (plain text).",
      "• To add English for a commentary, create translation_layers/<slug>_en.json",
      '  Example: { "1": { "א": "First English paragraph..." } }',
      "• Run `node export_oc318_translation_stubs.mjs` to emit Hebrew-only JSON stubs per slug.",
      "• Full parallel EN (subsection-by-subsection with HE): only layers loaded from *_he_en.txt / Kitzur JSON — Beit Yosef, Taz, Magen Avraham, Mishna Berurah, Kaf HaChayim, Baer Hetev, Biur HaGra, Shulchan Aruch Kitzuta.",
      "• All other commentaries use translation_layers/<slug>_en.json paired with Hebrew from HTML; many keys were written as summaries or source glosses (e.g. Tur sources), not word-for-word translations — replace JSON text to upgrade.",
      ""
    );
  } else {
    chunks.push(
      "• This file omits commentary blocks without English.",
      "• Partner file oc318_full_complete_with_pending.txt lists every subsection with placeholders.",
      "• Full parallel EN: Beit Yosef, Taz, Magen Avraham, Mishna Berurah, Kaf HaChayim, Baer Hetev, Biur HaGra, Kitzur (from bilingual exports).",
      "• Other commentaries: English from translation_layers JSON — quality varies; Tur-sources/Bach/Or Chadash/Derishah/etc. are largely thematic or analytic summaries unless you substitute full translations.",
      ""
    );
  }

  return { chunks, warnings };
}

function run() {
  const htmlPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_HTML;
  const htmlRaw = readIfExists(htmlPath);
  const $ = load(htmlRaw);
  const library = buildBilingualLibrary(__dirname);

  /** Shared cache so both builds load JSON once. */
  const enCache = new Map();

  const pendingDoc = buildDocument($, library, enCache, true);
  const translatedDoc = buildDocument($, library, enCache, false);

  const warnText = (w) =>
    w.length ? ["--- Build warnings ---\n", w.join("\n"), "\n"] : [];

  let outPending = pendingDoc.chunks.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
  outPending += warnText(pendingDoc.warnings).join("");
  fs.writeFileSync(OUT_PENDING, outPending, "utf8");

  let outTranslated = translatedDoc.chunks.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
  outTranslated += warnText(translatedDoc.warnings).join("");
  fs.writeFileSync(OUT_TRANSLATED, outTranslated, "utf8");

  console.log("Wrote", OUT_TRANSLATED, "(translated-only interleaved)");
  console.log("Wrote", OUT_PENDING, "(with pending stubs)");
  const nw = new Set([...pendingDoc.warnings, ...translatedDoc.warnings]).size;
  if (nw) console.warn("Warnings:", nw);
}

run();
