/**
 * Apply OC318_soft_marker_cleanup_patch_V4.md: specific paragraph replacements,
 * then global phrase/parenthetical replacements on all English fields.
 *
 * Usage: node scripts/apply-oc318-soft-marker-v4.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const JSON_PATH = path.join(ROOT, "data", "oc318.full.json");
const MD_PATH = path.join(ROOT, "OC318_soft_marker_cleanup_patch_V4.md");

/** Same convention as V2: manual "Tur note N" vs JSON index when they diverge. */
const NOTE_INDEX_OVERRIDES = {
  "2|Tur|3": 2,
  "2|Tur|5": 4,
  "2|Tur|7": 6,
  "2|Tur|9": 8,
  "2|Tur|11": 9,
  "2|Tur|13": 10,
  "2|Tur|16": 15,
  "2|Tur|21": 20,
};

/** Longest keys first to avoid partial replacements. */
const GENERAL_PHRASE_REPLACEMENTS = [
  ["the hand is scalded with it", "it is yad soledet bo"],
  ["the hand is scalded by it", "it is yad soledet bo"],
  ["the hand is averse to it", "it is yad soledet bo"],
  ["hand is not disgusted with it", "it is not yad soledet bo"],
  ["when we didn't catch a cold", "as long as it has not cooled completely"],
  ["if we catch a cold", "if it cooled"],
  ["in a Sunday vessel", "in a kli rishon"],
  ["Sunday vessel", "kli rishon"],
  ["disgusted hand", "yad soledet bo"],
  ["the hand is scalded", "yad soledet bo"],
  ["arbitrators", "poskim"],
];

const PAREN_LABEL_REPLACEMENTS = [
  ["(Yid)", "(10)"],
  ["(Tu)", "(15)"],
  ["(Kid)", "(24)"],
  ["(Lev)", "(32)"],
  ["(J)", "(10)"],
];

function parseManualMd(md) {
  const patches = [];
  const parts = md.split(/\n(?=## )/);
  for (const sec of parts) {
    const head = sec.match(/^##\s+Seif\s+(\d+),\s*(.+?)\s*$/m);
    if (!head) continue;
    const seif = parseInt(head[1], 10);
    const tail = head[2].trim();
    const bodyMatch = sec.match(
      /Replacement English:\s*\n\n([\s\S]*?)(?=\n## |\n# After applying|\s*$)/m
    );
    if (!bodyMatch) continue;
    const english = bodyMatch[1].trim().replace(/\n---\s*$/, "");
    if (!english) continue;

    let source;
    let noteNum = null;
    if (tail === "Mechaber and Rama") {
      source = "Mechaber and Rama";
    } else {
      let m = tail.match(/^Tur note (\d+)$/);
      if (m) {
        source = "Tur";
        noteNum = parseInt(m[1], 10);
      } else if ((m = tail.match(/^Biur Halacha note (\d+)$/))) {
        source = "Biur Halacha";
        noteNum = parseInt(m[1], 10);
      } else if ((m = tail.match(/^Shulchan Aruch K'pshuto note (\d+)$/))) {
        source = "Shulchan Aruch K'pshuto";
        noteNum = parseInt(m[1], 10);
      } else {
        throw new Error(`Unrecognized heading: ${tail}`);
      }
    }
    patches.push({ seif, source, noteNum, english });
  }
  return patches;
}

function resolveIndex(seif, source, noteNum) {
  const key = `${seif}|${source}|${noteNum}`;
  if (NOTE_INDEX_OVERRIDES[key] !== undefined) {
    return NOTE_INDEX_OVERRIDES[key];
  }
  if (noteNum == null) return null;
  return noteNum - 1;
}

function setEnglish(data, seifNum, source, noteIndex, english) {
  const seif = (data.seifim || []).find((s) => s.number === seifNum);
  if (!seif) throw new Error(`Seif ${seifNum} not found`);
  const src = seif.sources || {};
  if (source === "Mechaber and Rama") {
    if (!src["Mechaber and Rama"]) throw new Error("Mechaber missing");
    src["Mechaber and Rama"].english = english;
    return;
  }
  const block = src[source];
  if (!block || !Array.isArray(block.notes)) {
    throw new Error(`Source ${source} missing or has no notes`);
  }
  if (noteIndex < 0 || noteIndex >= block.notes.length) {
    throw new Error(
      `Bad note index ${noteIndex} for seif ${seifNum} ${source} (len=${block.notes.length})`
    );
  }
  block.notes[noteIndex].english = english;
}

function applyGeneralToString(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [from, to] of GENERAL_PHRASE_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  for (const [from, to] of PAREN_LABEL_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

function walkApplyGeneral(data) {
  for (const seif of data.seifim || []) {
    const src = seif.sources || {};
    for (const key of Object.keys(src)) {
      const block = src[key];
      if (block && typeof block.english === "string") {
        block.english = applyGeneralToString(block.english);
      }
      if (block && Array.isArray(block.notes)) {
        for (const n of block.notes) {
          if (n && typeof n.english === "string") {
            n.english = applyGeneralToString(n.english);
          }
        }
      }
    }
  }
}

function main() {
  const dry = process.argv.includes("--dry-run");
  const md = fs.readFileSync(MD_PATH, "utf8");
  const patches = parseManualMd(md);
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

  console.log(`Parsed ${patches.length} replacement blocks from V4 manual.`);

  for (const p of patches) {
    const idx = resolveIndex(p.seif, p.source, p.noteNum);
    const key = `${p.seif}|${p.source}|${p.noteNum ?? "MR"}`;
    if (dry) {
      const preview = p.english.slice(0, 72).replace(/\s+/g, " ");
      console.log(
        `  [dry] Seif ${p.seif} ${p.source} noteIndex=${idx} (${key}) → ${preview}...`
      );
      continue;
    }
    setEnglish(data, p.seif, p.source, idx, p.english);
    console.log(`  Applied Seif ${p.seif} ${p.source} idx=${idx}`);
  }

  if (!dry) {
    console.log("Applying global phrase and parenthetical replacements to all English fields...");
    walkApplyGeneral(data);
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
    console.log(`Wrote ${JSON_PATH}`);
  } else {
    console.log("[dry] Skipped global replacements and JSON write.");
  }
}

main();
