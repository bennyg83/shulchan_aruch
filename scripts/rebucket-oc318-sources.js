/**
 * Re-bucket OC318 notes into their correct source blocks.
 *
 * Problem this fixes:
 * - Some notes that belong to Magen Avraham / Taz ended up inside the Tur block
 *   (often identifiable by Hebrew markers like (מ״א) / (ט״ז) or English prefixes
 *   like "(Magen Avraham)" / "(Taz)").
 *
 * This script moves such notes into the appropriate `seif.sources[SourceName].notes[]`.
 *
 * Usage:
 *   node scripts/rebucket-oc318-sources.js --input data/oc318.full.json
 */
const fs = require("fs");
const path = require("path");

const SOURCE_MAGEN = "Magen Avraham";
const SOURCE_TAZ = "Taz";
const SOURCE_BEER = "Be'er Heitev";

function parseArgs(argv) {
  const out = { input: "data/oc318.full.json" };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input") {
      out.input = argv[i + 1];
      i += 1;
    } else if (t === "--help" || t === "-h") {
      out.help = true;
    }
  }
  return out;
}

function usage() {
  console.log("Usage: node scripts/rebucket-oc318-sources.js --input data/oc318.full.json");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function ensureBlock(sources, name) {
  if (!sources[name]) sources[name] = { notes: [] };
  if (!Array.isArray(sources[name].notes)) sources[name].notes = [];
  return sources[name];
}

function startsWithHebrewMarker(text, re) {
  if (typeof text !== "string") return false;
  return re.test(text.trim());
}

function startsWithEnglishPrefix(text, re) {
  if (typeof text !== "string") return false;
  return re.test(text.trim());
}

function classifyNote(note) {
  const heb = note && typeof note.hebrew === "string" ? note.hebrew : "";
  const eng = note && typeof note.english === "string" ? note.english : "";

  // Hebrew markers
  const isMagenHeb = startsWithHebrewMarker(heb, /^\(\s*מ[״"']?א\s*\)/);
  const isTazHeb = startsWithHebrewMarker(heb, /^\(\s*ט[״"']?ז\s*\)/);

  // English prefixes
  const isMagenEng = startsWithEnglishPrefix(eng, /^\(\s*Magen Avraham\s*\)/i);
  const isTazEng = startsWithEnglishPrefix(eng, /^\(\s*Taz\s*\)/i);

  // Be'er Heitev (עבה״ט = עיין באר היטב) – rebucket when it looks like a Be'er Heitev-style note.
  const isBeerHeb =
    startsWithHebrewMarker(heb, /^\(\s*[^)]+\s*\)\s*עבה[״"']?ט\b/) ||
    startsWithHebrewMarker(heb, /^\(\s*[^)]+\s*\)\s*[^:]{0,30}\s*עבה[״"']?ט\b/);
  const isBeerEng =
    startsWithEnglishPrefix(eng, /Beer Heitev/i) ||
    startsWithEnglishPrefix(eng, /Baer Heitev/i) ||
    startsWithEnglishPrefix(eng, /Be'er Heitev/i);

  if (isMagenHeb || isMagenEng) return SOURCE_MAGEN;
  if (isTazHeb || isTazEng) return SOURCE_TAZ;
  if (isBeerHeb || isBeerEng) return SOURCE_BEER;
  return null;
}

function isSeif2MagenAvrahamCluster(note) {
  // User-validated: these specific notes in Seif 2 belong to Magen Avraham.
  const heb = note && typeof note.hebrew === "string" ? note.hebrew : "";
  return /^\(\s*[דהוזח]\s*\)\s*(שחלה היום|חי בשבת|שמא ירבה|ואפי׳ בישל|משום שגדל)/.test(
    heb.trim()
  );
}

function extractLeadingLabel(hebrew) {
  if (typeof hebrew !== "string") return null;
  const m = hebrew.trim().match(/^\(\s*([^)]+?)\s*\)\s*/);
  return m ? m[1] : null;
}

function isTopicDotForm(hebrew) {
  // Example: "(ד) שחלה היום." / "(ו) שמא ירבה."
  if (typeof hebrew !== "string") return false;
  const s = hebrew.trim();
  return /^\(\s*[^)]+\s*\)\s*[^–-]{2,60}\.\s/.test(s);
}

function isTopicDashForm(hebrew) {
  // Example: "(ד) חי –" / "(ו) והולך –"
  if (typeof hebrew !== "string") return false;
  const s = hebrew.trim();
  return /^\(\s*[^)]+\s*\)\s*[^.]{1,60}\s+–\s*/.test(s);
}

function moveMagenByDuplicateLabelHeuristic(turBlock, magenBlock) {
  // Heuristic learned from Seif 2:
  // when a label repeats and one note is "topic." while another is "topic –",
  // the "topic." note is typically the Magen Avraham note that was mis-bucketed into Tur.
  if (!turBlock || !Array.isArray(turBlock.notes) || turBlock.notes.length < 2) return 0;

  const groups = new Map(); // label -> indices
  for (let i = 0; i < turBlock.notes.length; i += 1) {
    const n = turBlock.notes[i];
    const lbl = extractLeadingLabel(n && n.hebrew);
    if (!lbl) continue;
    const arr = groups.get(lbl) || [];
    arr.push(i);
    groups.set(lbl, arr);
  }

  const toMove = new Set();
  for (const idxs of groups.values()) {
    if (idxs.length < 2) continue;
    let hasDash = false;
    let hasDot = false;
    for (const i of idxs) {
      const heb = turBlock.notes[i] && turBlock.notes[i].hebrew;
      if (isTopicDashForm(heb)) hasDash = true;
      if (isTopicDotForm(heb)) hasDot = true;
    }
    if (!(hasDash && hasDot)) continue;
    for (const i of idxs) {
      const heb = turBlock.notes[i] && turBlock.notes[i].hebrew;
      if (isTopicDotForm(heb)) toMove.add(i);
    }
  }

  if (toMove.size === 0) return 0;

  const out = [];
  let moved = 0;
  for (let i = 0; i < turBlock.notes.length; i += 1) {
    const n = turBlock.notes[i];
    if (toMove.has(i)) {
      magenBlock.notes.push(n);
      moved += 1;
    } else {
      out.push(n);
    }
  }
  turBlock.notes = out;
  return moved;
}

function moveNotes(block, toBlock, predicate) {
  const out = [];
  let moved = 0;
  for (const note of block.notes || []) {
    if (predicate(note)) {
      toBlock.notes.push(note);
      moved += 1;
    } else {
      out.push(note);
    }
  }
  block.notes = out;
  return moved;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    usage();
    process.exit(0);
  }

  const inputPath = path.resolve(args.input);
  assert(fs.existsSync(inputPath), `Input not found: ${inputPath}`);

  const obj = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  assert(obj && Array.isArray(obj.seifim), "Invalid input JSON: seifim[] required");

  let movedMagen = 0;
  let movedTaz = 0;
  let movedBeer = 0;

  for (const seif of obj.seifim) {
    const sources = seif.sources || {};
    seif.sources = sources;

    const magenBlock = ensureBlock(sources, SOURCE_MAGEN);
    const tazBlock = ensureBlock(sources, SOURCE_TAZ);
    const beerBlock = ensureBlock(sources, SOURCE_BEER);

    // Search all non-MR blocks for mis-bucketed notes.
    for (const [sourceName, block] of Object.entries(sources)) {
      if (!block || !Array.isArray(block.notes)) continue;
      if (sourceName === SOURCE_MAGEN || sourceName === SOURCE_TAZ || sourceName === SOURCE_BEER)
        continue;
      if (sourceName === "Mechaber and Rama") continue;

      movedMagen += moveNotes(block, magenBlock, (n) => classifyNote(n) === SOURCE_MAGEN);
      movedTaz += moveNotes(block, tazBlock, (n) => classifyNote(n) === SOURCE_TAZ);
      movedBeer += moveNotes(block, beerBlock, (n) => classifyNote(n) === SOURCE_BEER);
    }

    // Targeted fix: Seif 2 contains a known Magen Avraham cluster inside the Tur block.
    const tur = sources["Tur"];
    if (tur && Array.isArray(tur.notes)) {
      movedMagen += moveNotes(tur, magenBlock, isSeif2MagenAvrahamCluster);
      movedMagen += moveMagenByDuplicateLabelHeuristic(tur, magenBlock);
      movedBeer += moveNotes(tur, beerBlock, (n) => classifyNote(n) === SOURCE_BEER);
    }
  }

  fs.writeFileSync(inputPath, JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log(
    `Rebucketed notes. Moved: Magen Avraham=${movedMagen}, Taz=${movedTaz}, Be'er Heitev=${movedBeer}`
  );
}

main();

