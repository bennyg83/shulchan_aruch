/**
 * Builds OC318_Complete_interleaved.txt from AlHaTorah inspect HTML + bilingual *_he_en files.
 * Same as build_oc318_full_complete but only BILINGUAL_META layers (no HTML-extracted-only columns).
 *
 * Usage: node build_oc318_interleaved_from_html.mjs [path-to-html]
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
  slugFromParshanEl,
  formatVerseHeadingBlock,
  alignmentHintFromVerse,
  emitSection,
  readIfExists,
} from "./oc318_html_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OUT = path.join(__dirname, "OC318_Complete_interleaved.txt");
const DEFAULT_HTML = path.join(__dirname, "source html");

const WORK_ORDER = Object.keys(BILINGUAL_META);

function run() {
  const htmlPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_HTML;
  const htmlRaw = readIfExists(htmlPath);
  const $ = load(htmlRaw);
  const library = buildBilingualLibrary(__dirname);

  const chunks = [];
  chunks.push(SEP);
  chunks.push("OC 318 — Complete interleaved by seif (from AlHaTorah DOM)");
  chunks.push(SEP);
  chunks.push("");
  chunks.push(
    "Structure: for each seif, Mechaber & Rama (pre-split files), then commentary columns",
    "as rendered on AlHaTorah, in column order. Each subsection is matched to bilingual",
    "sources by the Hebrew marker in span.num, e.g. (א), (ו), (הקדמה).",
    "Alignment hint = plain text from the page Mechaber/Rama row for that seif.",
    "For HTML-only commentaries (sources lists, etc.), use oc318_full_complete.txt / build_oc318_full_complete.mjs.",
    ""
  );

  const verses = $(".verse[data-num]").toArray().sort((a, b) => {
    const na = Number($(a).attr("data-num")) || 0;
    const nb = Number($(b).attr("data-num")) || 0;
    return na - nb;
  });

  const warnings = [];

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
      if (!slug || !WORK_ORDER.includes(slug) || emittedSlugs.has(slug)) return;
      emittedSlugs.add(slug);

      const markers = extractMarkers($, $col);
      if (markers.length === 0) return;

      const meta = BILINGUAL_META[slug];
      const map = library[slug];

      chunks.push(SEP);
      chunks.push(`${meta.title} — markers under this seif: ${markers.join(", ")}`);
      chunks.push(SEP);
      chunks.push("");

      for (const marker of markers) {
        const block = map.get(marker);
        if (!block) {
          warnings.push(`Missing [${slug}] (${marker}) — seif ${num}`);
          chunks.push(
            emitSection(marker, "[No matching section in bilingual export]", "", null)
          );
          chunks.push(SEP);
          chunks.push("");
          continue;
        }
        chunks.push(emitSection(marker, block.he, block.en, null));
        chunks.push(SEP);
        chunks.push("");
      }
    });

    chunks.push("");
  }

  chunks.push(SEP);
  chunks.push("END");
  chunks.push(SEP);
  if (warnings.length) {
    chunks.push("\n--- Build warnings ---\n");
    chunks.push(warnings.join("\n"));
    chunks.push("");
  }

  const outText = chunks.join("\n").replace(/\n{4,}/g, "\n\n\n");
  fs.writeFileSync(OUT, outText + "\n", "utf8");
  console.log("Wrote", OUT);
  if (warnings.length) console.warn("Warnings:", warnings.length);
}

run();
