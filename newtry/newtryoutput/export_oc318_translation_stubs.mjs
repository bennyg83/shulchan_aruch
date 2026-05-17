/**
 * From inspect HTML: for each commentary column not covered by bilingual *_he_en files,
 * writes:
 *   translation_layers/<slug>_he_extracted.json  — Hebrew tree { "1": { "א": "..." } } (refreshed each run)
 *   translation_layers/<slug>_en.json            — English stub (created only if missing; empty strings)
 *
 * Translators fill translation_layers/<slug>_en.json; rebuild oc318_full_complete.txt to pull English in.
 *
 * Usage: node export_oc318_translation_stubs.mjs [path-to-html]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { load } from "cheerio";
import {
  BILINGUAL_META,
  extractSectionsFromColumn,
  slugFromParshanEl,
  readIfExists,
} from "./oc318_html_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_HTML = path.join(__dirname, "source html");
const OUT_DIR = path.join(__dirname, "translation_layers");

const BILINGUAL_SLUGS = new Set(Object.keys(BILINGUAL_META));

function deepMergeEmptyEn(heTree) {
  const en = {};
  for (const [seif, markers] of Object.entries(heTree)) {
    en[seif] = {};
    for (const marker of Object.keys(markers)) {
      en[seif][marker] = "";
    }
  }
  return en;
}

function mergePreserve(existing, incomingKeys) {
  const out = { ...existing };
  for (const [seif, markers] of Object.entries(incomingKeys)) {
    if (!out[seif]) out[seif] = {};
    for (const marker of Object.keys(markers)) {
      if (out[seif][marker] === undefined) out[seif][marker] = "";
    }
  }
  return out;
}

function run() {
  const htmlPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_HTML;
  const htmlRaw = readIfExists(htmlPath);
  const $ = load(htmlRaw);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  /** slug -> { seif -> { marker -> he } } */
  const acc = new Map();

  const verses = $(".verse[data-num]").toArray().sort((a, b) => {
    const na = Number($(a).attr("data-num")) || 0;
    const nb = Number($(b).attr("data-num")) || 0;
    return na - nb;
  });

  for (const vEl of verses) {
    const $verse = $(vEl);
    const num = String($verse.attr("data-num") || "").trim();
    const $cols = $verse.find(".parshan-columns > .parshan");
    const seen = new Set();

    $cols.each((_, colEl) => {
      const $col = $(colEl);
      const slug = slugFromParshanEl($col);
      if (!slug || seen.has(slug)) return;
      seen.add(slug);
      if (BILINGUAL_SLUGS.has(slug)) return;

      const sections = extractSectionsFromColumn($, $col);
      if (sections.length === 0) return;

      if (!acc.has(slug)) acc.set(slug, {});
      const tree = acc.get(slug);
      if (!tree[num]) tree[num] = {};
      for (const { marker, he } of sections) {
        tree[num][marker] = he;
      }
    });
  }

  for (const [slug, heTree] of acc) {
    const hePath = path.join(OUT_DIR, `${slug}_he_extracted.json`);
    fs.writeFileSync(hePath, JSON.stringify(heTree, null, 2), "utf8");
    console.log("Wrote", hePath);

    const enPath = path.join(OUT_DIR, `${slug}_en.json`);
    if (!fs.existsSync(enPath)) {
      const enStub = deepMergeEmptyEn(heTree);
      fs.writeFileSync(enPath, JSON.stringify(enStub, null, 2), "utf8");
      console.log("Wrote new stub", enPath);
    } else {
      const existing = JSON.parse(fs.readFileSync(enPath, "utf8"));
      const merged = mergePreserve(existing, heTree);
      fs.writeFileSync(enPath, JSON.stringify(merged, null, 2), "utf8");
      console.log("Merged keys into", enPath);
    }
  }

  console.log("Done. Edit *_en.json files, then: node build_oc318_full_complete.mjs");
}

run();
