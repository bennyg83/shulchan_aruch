/**
 * Merge data/corrections_seif_*.json into data/oc318-paragraph-corrections.json
 * (string keys "5", "8", ... as required by apply-oc318-line-corrections.js).
 *
 * Usage: node scripts/merge-oc318-paragraph-corrections.js
 */
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const outPath = path.join(dataDir, "oc318-paragraph-corrections.json");

function main() {
  const merged = {};
  const names = fs.readdirSync(dataDir).filter((n) => /^corrections_seif_\d{2}\.json$/.test(n));
  names.sort();
  if (names.length === 0) {
    console.error("No data/corrections_seif_XX.json files found.");
    process.exit(1);
  }
  for (const n of names) {
    const p = path.join(dataDir, n);
    const part = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const [k, v] of Object.entries(part)) {
      merged[String(k)] = v;
    }
  }
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`Merged ${names.length} files, ${Object.keys(merged).length} keys -> ${outPath}`);
}

main();
