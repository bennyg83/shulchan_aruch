/**
 * OC318 loop / runaway repetition scan.
 *
 * Goal: catch "human-reading" failures that pass marker scans, such as:
 * - repeated parentheticals: "(Aramaic) (Aramaic) (Aramaic) ..."
 * - repeated gloss chains: "terumah — ... — terumah — ... — terumah ..."
 * - repeated words / bigrams: "one who acts one who acts one who acts ..."
 *
 * Usage:
 *   node scripts/scan-oc318-loops.js --input data/oc318.full.json
 *   node scripts/scan-oc318-loops.js --input data/oc318.full.json --output output/OC318_loop_report.md --fail-on-any
 */
const fs = require("fs");
const path = require("path");

const DEFAULT_INPUT = "data/oc318.full.json";
const DEFAULT_OUTPUT = "output/OC318_loop_report.md";

const SOURCE_ORDER = [
  "Mechaber and Rama",
  "Tur",
  "Magen Avraham",
  "Taz",
  "Be'er Heitev",
  "Biur Halacha",
  "Shulchan Aruch K'pshuto",
];

function parseArgs(argv) {
  const out = { input: DEFAULT_INPUT, output: DEFAULT_OUTPUT, failOnAny: false };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input") {
      out.input = argv[i + 1];
      i += 1;
    } else if (t === "--output") {
      out.output = argv[i + 1];
      i += 1;
    } else if (t === "--fail-on-any") {
      out.failOnAny = true;
    } else if (t === "--help" || t === "-h") {
      out.help = true;
    }
  }
  return out;
}

function usage() {
  console.log("Usage: node scripts/scan-oc318-loops.js --input data/oc318.full.json [--output output/OC318_loop_report.md] [--fail-on-any]");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function stripInvisibles(s) {
  // Bidi / zero-width / soft hyphen / BOM
  return String(s).replace(/[\u200b\u200e\u200f\u202a-\u202e\u2060\u00ad\ufeff]/g, "");
}

function normalizeSpaces(s) {
  return stripInvisibles(s).replace(/\s+/g, " ").trim();
}

function findRepeatedParenthetical(text) {
  const hits = [];
  const t = normalizeSpaces(text);
  // e.g. "(Aramaic) (Aramaic) (Aramaic)"
  const re = /\(([A-Za-z][A-Za-z0-9\s'’.-]{0,60})\)(?:\s+\(\1\)){2,}/g;
  let m;
  while ((m = re.exec(t))) {
    hits.push({ kind: "repeated_parenthetical", snippet: m[0] });
  }
  return hits;
}

function findRepeatedDashToken(text) {
  const hits = [];
  const t = normalizeSpaces(text);
  // e.g. "intentionally — intentionally — intentionally"
  const re = /\b([A-Za-z][A-Za-z'’.-]{2,})\b(?:\s*[—–-]\s*\1\b){3,}/g;
  let m;
  while ((m = re.exec(t))) {
    hits.push({ kind: "repeated_dash_token", snippet: m[0] });
  }
  return hits;
}

function findRepeatedWordRuns(text) {
  const hits = [];
  const t = normalizeSpaces(text);
  // e.g. "terumah terumah terumah terumah terumah"
  const re = /\b([A-Za-z][A-Za-z'’.-]{1,})\b(?:\s+\1\b){5,}/g;
  let m;
  while ((m = re.exec(t))) {
    hits.push({ kind: "repeated_word_run", snippet: m[0] });
  }
  return hits;
}

function findRepeatedBigram(text) {
  const hits = [];
  const t = normalizeSpaces(text);
  // e.g. "one who acts one who acts one who acts"
  const re = /\b([A-Za-z][A-Za-z'’.-]{1,})\s+([A-Za-z][A-Za-z'’.-]{1,})\b(?:\s+\1\s+\2\b){4,}/g;
  let m;
  while ((m = re.exec(t))) {
    hits.push({ kind: "repeated_bigram", snippet: m[0] });
  }
  return hits;
}

function findTerumahGlossLoop(text) {
  const hits = [];
  const t = normalizeSpaces(text);
  // Conservative targeted detector for the known catastrophic loop family.
  if (/\bterumah\b/i.test(t) && /\bpriestly portion of produce\b/i.test(t)) {
    hits.push({
      kind: "known_gloss_loop",
      snippet: "Contains both 'terumah' and 'priestly portion of produce' (likely injected gloss loop).",
    });
  }
  if (/\bterumah\b(?:\s*[—–-]\s*terumah\b){6,}/i.test(t)) {
    hits.push({
      kind: "known_gloss_loop",
      snippet: "Repeated 'terumah — terumah — ...' chain.",
    });
  }
  return hits;
}

function scanParagraph(text) {
  const hits = [];
  hits.push(...findRepeatedParenthetical(text));
  hits.push(...findRepeatedDashToken(text));
  hits.push(...findRepeatedWordRuns(text));
  hits.push(...findRepeatedBigram(text));
  hits.push(...findTerumahGlossLoop(text));
  return hits;
}

function pushFinding(findings, where, hit) {
  findings.push({
    ...where,
    kind: hit.kind,
    snippet: hit.snippet,
  });
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    usage();
    process.exit(0);
  }

  const inputPath = path.resolve(args.input);
  const outputPath = path.resolve(args.output);

  assert(fs.existsSync(inputPath), `Input not found: ${inputPath}`);
  const obj = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  assert(obj && Array.isArray(obj.seifim), "Invalid input JSON: seifim[] required");

  const findings = [];

  for (const seif of obj.seifim) {
    const seifNo = seif.number;
    const sources = seif.sources || {};

    for (const sourceName of SOURCE_ORDER) {
      const block = sources[sourceName];
      if (!block) continue;

      if (sourceName === "Mechaber and Rama") {
        const english = block.english;
        if (typeof english === "string" && english.trim()) {
          for (const hit of scanParagraph(english)) {
            pushFinding(findings, { seif: seifNo, source: sourceName, noteIndex: null }, hit);
          }
        }
        continue;
      }

      const notes = Array.isArray(block.notes) ? block.notes : [];
      for (let i = 0; i < notes.length; i += 1) {
        const note = notes[i];
        const english = note && typeof note.english === "string" ? note.english : "";
        if (!english.trim()) continue;
        for (const hit of scanParagraph(english)) {
          pushFinding(findings, { seif: seifNo, source: sourceName, noteIndex: i }, hit);
        }
      }
    }
  }

  const outLines = [];
  outLines.push(`# OC318 loop scan report`);
  outLines.push(`Generated: ${new Date().toISOString()}`);
  outLines.push(`Input: \`${inputPath}\``);
  outLines.push("");
  outLines.push(`Total findings: **${findings.length}**`);
  outLines.push("");

  if (findings.length === 0) {
    outLines.push("No runaway repetition loops detected by the heuristics in this scan.");
    outLines.push("");
  } else {
    for (const f of findings) {
      const loc =
        f.noteIndex === null
          ? `Seif ${f.seif} · ${f.source}`
          : `Seif ${f.seif} · ${f.source} · note ${f.noteIndex + 1}`;
      outLines.push(`- **${f.kind}** at **${loc}**`);
      outLines.push(`  - Snippet: ${"`"}${String(f.snippet).slice(0, 400)}${"`"}`);
    }
    outLines.push("");
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, outLines.join("\n"), "utf8");
  console.log(`Wrote ${outputPath}`);
  console.log(`Findings: ${findings.length}`);

  if (args.failOnAny && findings.length > 0) {
    process.exit(2);
  }
}

main();

