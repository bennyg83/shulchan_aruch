const fs = require("fs");
const path = require("path");

const SOURCE_ORDER = [
  "Mechaber and Rama",
  "Tur",
  "Magen Avraham",
  "Taz",
  "Be'er Heitev",
  "Biur Halacha",
  "Shulchan Aruch K'pshuto"
];

function usage() {
  console.log(
    "Usage: node scripts/build-oc318-txt.js --input data/oc318.full.json --output output/oc_318_v4.txt"
  );
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input") {
      args.input = argv[i + 1];
      i += 1;
    } else if (t === "--output") {
      args.output = argv[i + 1];
      i += 1;
    } else if (t === "--help" || t === "-h") {
      args.help = true;
    }
  }
  return args;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hasValue(s) {
  return typeof s === "string" && s.trim().length > 0;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function normalizeNewlines(s) {
  return String(s).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function normalizeEnglishForReview(s) {
  let out = String(s);

  // Remove hidden directionality / zero-width controls that can display as duplicates.
  out = out.replace(/[\u200b\u200e\u200f\u202a-\u202e\u2060\u00ad\ufeff]/g, "");

  // Collapse runaway parenthetical tags.
  out = out.replace(/\(Aramaic\)(?:\s*\(Aramaic\))+/gi, "(Aramaic)");

  // Drop injected dictionary glosses that should not appear inline.
  out = out.replace(/\s*[—–-]\s*priestly portion of produce(?:\s+of\s+produce)*/gi, "");
  out = out.replace(/\bpriestly portion of produce(?:\s+of\s+produce)*/gi, "");

  // Collapse runaway headword repetitions.
  out = out.replace(/\bterumah\s+of\s+produce\b/gi, "terumah");
  out = out.replace(/\bterumah(?:\s*[—–-]\s*terumah)+\b/gi, "terumah");
  out = out.replace(/\bterumah\s+produce\b/gi, "terumah");
  out = out.replace(/\bproduce(?:\s+produce)+\b/gi, "produce");

  return out;
}

function writeBlock(lines, hebrew, english) {
  lines.push(normalizeNewlines(hebrew));
  lines.push(normalizeNewlines(normalizeEnglishForReview(english)));
  lines.push(""); // blank line between paragraphs
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.input || !args.output) {
    usage();
    process.exit(args.help ? 0 : 1);
  }

  const inputPath = path.resolve(args.input);
  const outputPath = path.resolve(args.output);

  assert(fs.existsSync(inputPath), `Input not found: ${inputPath}`);
  const obj = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  assert(obj && Array.isArray(obj.seifim), "Invalid input JSON: seifim[] required");

  const outLines = [];

  for (const seif of obj.seifim) {
    outLines.push(`=== SEIF ${seif.number} ===`);
    outLines.push("");

    const sources = seif.sources || {};
    const mr = sources["Mechaber and Rama"];
    assert(mr && hasValue(mr.hebrew) && hasValue(mr.english), `Seif ${seif.number}: missing Mechaber and Rama`);

    outLines.push("[Mechaber and Rama]");
    writeBlock(outLines, mr.hebrew, mr.english);

    for (const sourceName of SOURCE_ORDER.slice(1)) {
      const block = sources[sourceName];
      if (!block || !Array.isArray(block.notes) || block.notes.length === 0) {
        continue;
      }

      outLines.push(`[${sourceName}]`);
      outLines.push("");

      for (const note of block.notes) {
        if (!note || !hasValue(note.hebrew) || !hasValue(note.english)) {
          continue;
        }
        writeBlock(outLines, note.hebrew, note.english);
      }
    }

    outLines.push(""); // extra spacing between seifim
  }

  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, outLines.join("\n"), "utf8");
  console.log(`Wrote ${outputPath}`);
}

main();

