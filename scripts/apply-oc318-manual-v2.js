/**
 * Apply English replacements from OC318_manual_retranslate_replacements_V2.md
 * to data/oc318.full.json. Match by (seif, source, note) with overrides where
 * the manual's "Tur note N" does not match JSON array order (notably Seif 2).
 *
 * Usage: node scripts/apply-oc318-manual-v2.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const JSON_PATH = path.join(ROOT, "data", "oc318.full.json");
const MD_PATH = path.join(ROOT, "OC318_manual_retranslate_replacements_V2.md");

/** 0-based index; key = `${seif}|${source}|${noteNum}` */
const NOTE_INDEX_OVERRIDES = {
  "2|Tur|3": 2,
  "2|Tur|5": 4,
  "2|Tur|7": 6,
  "2|Tur|9": 8,
  "2|Tur|11": 9,
  "2|Tur|13": 10,
  "2|Tur|16": 15,
  "2|Tur|21": 20
};

function parseManualMd(md) {
  const patches = [];
  const parts = md.split(/\n(?=## )/);
  for (const sec of parts) {
    const head = sec.match(/^##\s+Seif\s+(\d+),\s*(.+?)\s*$/m);
    if (!head) continue;
    const seif = parseInt(head[1], 10);
    const tail = head[2].trim();
    const bodyMatch = sec.match(
      /Replacement English:\s*\n\n([\s\S]*?)(?=\n## |\n# After applying|\s*$)/
    );
    if (!bodyMatch) continue;
    const english = bodyMatch[1].trim();
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
      } else {
        m = tail.match(/^Biur Halacha note (\d+)$/);
        if (m) {
          source = "Biur Halacha";
          noteNum = parseInt(m[1], 10);
        } else {
          m = tail.match(/^Shulchan Aruch K'pshuto note (\d+)$/);
          if (m) {
            source = "Shulchan Aruch K'pshuto";
            noteNum = parseInt(m[1], 10);
          } else {
            throw new Error(`Unrecognized heading: ${tail}`);
          }
        }
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

function main() {
  const dry = process.argv.includes("--dry-run");
  const md = fs.readFileSync(MD_PATH, "utf8");
  const patches = parseManualMd(md);
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

  console.log(`Parsed ${patches.length} replacement blocks from V2 manual.`);

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
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
    console.log(`Wrote ${JSON_PATH}`);
  }
}

main();
