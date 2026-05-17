/**
 * Apply English paragraph replacements keyed by DOCX paragraph indices (non-empty paragraphs,
 * 0-based enumerate) when exporting review DOCX — same ordering as scripts/build-oc318-txt.js
 * non-blank lines, plus an offset (default 2) for title + sources lines above === SEIF ===.
 *
 * Keys: docxIndex = nonBlankLinesBeforeThatEnglishParagraph + offset (see scripts/oc318-docx-key-map.js).
 *
 * Usage:
 *   node scripts/apply-oc318-line-corrections.js --input data/oc318.full.json --corrections data/oc318-paragraph-corrections.json
 *   node scripts/apply-oc318-line-corrections.js --input data/oc318.full.json --corrections data/oc318-paragraph-corrections.json --offset 2 --output data/oc318.full.json
 */
const fs = require("fs");
const path = require("path");
const { buildDocxParagraphKeyToSetter } = require("./oc318-docx-key-map");

function usage() {
  console.log(
    "Usage: node scripts/apply-oc318-line-corrections.js --input data/oc318.full.json --corrections data/oc318-paragraph-corrections.json [--offset 2] [--output path]"
  );
}

function parseArgs(argv) {
  const args = { offset: 2 };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input") {
      args.input = argv[i + 1];
      i += 1;
    } else if (t === "--corrections") {
      args.corrections = argv[i + 1];
      i += 1;
    } else if (t === "--offset") {
      args.offset = Number(argv[i + 1]);
      i += 1;
    } else if (t === "--output") {
      args.output = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.input || !args.corrections) {
    usage();
    process.exit(1);
  }

  const inputPath = path.resolve(args.input);
  const corrPath = path.resolve(args.corrections);

  if (!fs.existsSync(inputPath)) {
    console.error(`Missing input: ${inputPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(corrPath)) {
    console.error(`Missing corrections: ${corrPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const obj = JSON.parse(raw);

  const off = Number.isFinite(args.offset) ? args.offset : 2;
  const lineMap = buildDocxParagraphKeyToSetter(obj, off);
  const corrections = JSON.parse(fs.readFileSync(corrPath, "utf8"));

  let applied = 0;
  let missing = 0;

  for (const [k, text] of Object.entries(corrections)) {
    const lineNum = Number(k);
    if (!Number.isFinite(lineNum)) continue;
    const entry = lineMap.get(lineNum);
    if (!entry) {
      console.warn(`No English paragraph at line ${lineNum} (skipping)`);
      missing += 1;
      continue;
    }
    entry.set(String(text));
    applied += 1;
  }

  const outPath = args.output ? path.resolve(args.output) : inputPath;
  fs.writeFileSync(outPath, JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log(`Applied ${applied} corrections to ${outPath}; ${missing} line keys had no match.`);
}

main();
