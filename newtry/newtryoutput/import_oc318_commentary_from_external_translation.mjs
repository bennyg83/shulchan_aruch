/**
 * Import completed translation_work/<slug>_OC318_translate.txt into translation_layers/<slug>_en.json.
 *
 * Usage:
 *   node import_oc318_commentary_from_external_translation.mjs <slug>
 *   node import_oc318_commentary_from_external_translation.mjs <slug> --replace-empty
 *
 * Empty <<<EN>>> blocks do not erase existing JSON (so a fresh re-export does not wipe work).
 * Pass --replace-empty to write empty strings for blocks left blank.
 *
 * See export_oc318_commentary_for_external_translation.mjs for file format.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAYERS = path.join(__dirname, "translation_layers");
const WORK = path.join(__dirname, "translation_work");

function sliceBetween(s, startTag, endTag) {
  const i = s.indexOf(startTag);
  const j = s.indexOf(endTag);
  if (i === -1 || j === -1 || j <= i) return null;
  return s
    .slice(i + startTag.length, j)
    .replace(/^\r?\n/, "")
    .replace(/\r?\n$/, "");
}

/** Parse blocks from exported translate file. Returns Map "seif|marker" -> en string */
function parseTranslateFile(raw) {
  const map = new Map();
  const chunks = raw.split(/(?=<<<OC318BLOCK)/);
  const headerRe =
    /^<<<OC318BLOCK\s+slug=(\S+)\s+seif=(\d+)\s+marker=(\S+)\s*>>>/;
  for (const chunk of chunks) {
    const hm = chunk.match(headerRe);
    if (!hm) continue;
    const seif = hm[2];
    const marker = hm[3];
    const enText = sliceBetween(chunk, "<<<EN>>>", "<<<END>>>");
    if (enText === null) {
      console.warn(`Skipping malformed block seif=${seif} marker=${marker}`);
      continue;
    }
    map.set(`${seif}|${marker}`, enText);
  }
  return map;
}

function run() {
  const slug = (process.argv[2] || "").trim();
  if (!slug) {
    console.error("Usage: node import_oc318_commentary_from_external_translation.mjs <slug>");
    process.exit(1);
  }

  const inPath = path.join(WORK, `${slug}_OC318_translate.txt`);
  if (!fs.existsSync(inPath)) {
    console.error("Missing:", inPath);
    console.error("Run: node export_oc318_commentary_for_external_translation.mjs", slug);
    process.exit(1);
  }

  const hePath = path.join(LAYERS, `${slug}_he_extracted.json`);
  if (!fs.existsSync(hePath)) {
    console.error("Missing:", hePath);
    process.exit(1);
  }

  const heTree = JSON.parse(fs.readFileSync(hePath, "utf8"));
  const raw = fs.readFileSync(inPath, "utf8");
  const imported = parseTranslateFile(raw);

  const enPath = path.join(LAYERS, `${slug}_en.json`);
  let existing = {};
  if (fs.existsSync(enPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(enPath, "utf8"));
    } catch {
      existing = {};
    }
  }

  const replaceEmpty = process.argv.includes("--replace-empty");

  let updated = 0;
  let missing = 0;
  let skippedEmpty = 0;
  for (const seif of Object.keys(heTree)) {
    if (!existing[seif]) existing[seif] = {};
    for (const marker of Object.keys(heTree[seif])) {
      const key = `${seif}|${marker}`;
      const prev =
        existing[seif][marker] !== undefined ? String(existing[seif][marker]) : "";
      if (imported.has(key)) {
        const v = imported.get(key).trim();
        if (v.length > 0) {
          existing[seif][marker] = v;
          updated++;
        } else if (replaceEmpty) {
          existing[seif][marker] = "";
        } else if (!prev) {
          existing[seif][marker] = "";
        } else {
          skippedEmpty++;
          /* keep prev English — fresh export has blank <<<EN>>>; do not wipe */
        }
      } else {
        missing++;
        if (existing[seif][marker] === undefined) existing[seif][marker] = "";
      }
    }
  }

  fs.writeFileSync(enPath, JSON.stringify(existing, null, 2) + "\n", "utf8");
  console.log("Wrote", enPath);
  console.log(`Imported non-empty English strings: ${updated}`);
  if (skippedEmpty)
    console.log(
      `Skipped ${skippedEmpty} empty <<<EN>>> blocks (kept existing JSON). Use --replace-empty to clear them.`
    );
  if (missing)
    console.warn(
      `Blocks not found in translate file: ${missing} keys — re-export if structure drifted.`
    );
  console.log("Next: node build_oc318_full_complete.mjs");
}

run();
