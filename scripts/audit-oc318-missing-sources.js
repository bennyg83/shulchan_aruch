/**
 * Audit OC318 for missing/empty source blocks per seif.
 *
 * Usage:
 *   node scripts/audit-oc318-missing-sources.js --input data/oc318.full.json
 *   node scripts/audit-oc318-missing-sources.js --input data/oc318.full.json --output output/OC318_missing_sources_report.md
 */
const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const out = {
    input: "data/oc318.full.json",
    output: "output/OC318_missing_sources_report.md",
  };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input") {
      out.input = argv[i + 1];
      i += 1;
    } else if (t === "--output") {
      out.output = argv[i + 1];
      i += 1;
    } else if (t === "--help" || t === "-h") {
      out.help = true;
    }
  }
  return out;
}

function usage() {
  console.log(
    "Usage: node scripts/audit-oc318-missing-sources.js --input data/oc318.full.json [--output output/OC318_missing_sources_report.md]"
  );
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const TRACKED = [
  "Tur",
  "Magen Avraham",
  "Taz",
  "Be'er Heitev",
  "Biur Halacha",
  "Shulchan Aruch K'pshuto",
];

function noteCount(block) {
  if (!block) return 0;
  if (Array.isArray(block.notes)) return block.notes.length;
  return 0;
}

function containsMarker(block, markerRe) {
  if (!block || !Array.isArray(block.notes)) return false;
  return block.notes.some((n) => markerRe.test(String(n?.hebrew || "")));
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

  const rows = [];
  for (const seif of obj.seifim) {
    const sources = seif.sources || {};
    const counts = {};
    for (const s of TRACKED) counts[s] = noteCount(sources[s]);

    // Heuristic signals that the seif might reference MA/Taz even if blocks are empty.
    const tur = sources["Tur"];
    const hasMAInTur = containsMarker(tur, /מ״א|\[מ״א\]|\bMagen Avraham\b/i);
    const hasTazInTur = containsMarker(tur, /ט״ז|\[ט״ז\]|\bTaz\b/i);

    rows.push({
      seif: seif.number,
      counts,
      hasMAInTur,
      hasTazInTur,
    });
  }

  const out = [];
  out.push("# OC318 missing source audit");
  out.push(`Generated: ${new Date().toISOString()}`);
  out.push(`Input: \`${inputPath}\``);
  out.push("");

  const missing = rows.filter(
    (r) => r.counts["Magen Avraham"] === 0 || r.counts["Taz"] === 0
  );
  out.push(`Seifim with empty MA/Taz blocks: **${missing.length}**`);
  out.push("");

  for (const r of missing) {
    const parts = [];
    if (r.counts["Magen Avraham"] === 0) parts.push("MA=0");
    if (r.counts["Taz"] === 0) parts.push("Taz=0");
    const signals = [];
    if (r.hasMAInTur) signals.push("Tur mentions MA");
    if (r.hasTazInTur) signals.push("Tur mentions Taz");
    out.push(
      `- **Seif ${r.seif}**: ${parts.join(", ")}${
        signals.length ? ` _(signals: ${signals.join(", ")})_` : ""
      }`
    );
  }

  out.push("");
  out.push("## Note");
  out.push(
    "An empty block can mean either: (a) that commentary truly isn't present in the dataset for that seif, or (b) it is present but mis-bucketed into another block."
  );
  out.push("");

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, out.join("\n"), "utf8");
  console.log(`Wrote ${outputPath}`);
}

main();

