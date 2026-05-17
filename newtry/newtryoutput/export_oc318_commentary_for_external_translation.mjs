/**
 * Export ONE HTML-extracted commentary to a plain-text file for off-line full translation.
 * Work on one slug at a time; when done, run import_oc318_commentary_from_external_translation.mjs.
 *
 * Prerequisites: translation_layers/<slug>_he_extracted.json (from export_oc318_translation_stubs.mjs)
 *
 * Usage:
 *   node export_oc318_commentary_for_external_translation.mjs <slug>
 *
 * Output:
 *   translation_work/<slug>_OC318_translate.txt
 *
 * Workflow:
 *   1. node export_oc318_translation_stubs.mjs
 *   2. node export_oc318_commentary_for_external_translation.mjs derishah
 *   3. Translate every <<<EN>>> block (keep delimiters; do not edit <<<HE>>> unless you know what you’re doing)
 *   4. node import_oc318_commentary_from_external_translation.mjs derishah
 *   5. node build_oc318_full_complete.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAYERS = path.join(__dirname, "translation_layers");
const WORK = path.join(__dirname, "translation_work");

function blockTemplate(slug, seif, marker, heText) {
  return (
    `<<<OC318BLOCK slug=${slug} seif=${seif} marker=${marker}>>>\n` +
    `<<<HE>>>\n${heText}\n` +
    `<<<EN>>>\n\n` +
    `<<<END>>>\n\n`
  );
}

function run() {
  const slug = (process.argv[2] || "").trim();
  if (!slug) {
    console.error("Usage: node export_oc318_commentary_for_external_translation.mjs <slug>");
    console.error("Example: node export_oc318_commentary_for_external_translation.mjs derishah");
    process.exit(1);
  }

  const hePath = path.join(LAYERS, `${slug}_he_extracted.json`);
  if (!fs.existsSync(hePath)) {
    console.error("Missing:", hePath);
    console.error("Run first: node export_oc318_translation_stubs.mjs");
    process.exit(1);
  }

  const heTree = JSON.parse(fs.readFileSync(hePath, "utf8"));
  const seifs = Object.keys(heTree).sort((a, b) => Number(a) - Number(b));

  const lines = [
    `# OC 318 — external translation workspace`,
    `# slug: ${slug}`,
    `#`,
    `# Instructions:`,
    `# - Translate only inside each block: between <<<EN>>> and the next <<<END>>>.`,
    `# - Keep all <<<...>>> lines exactly; the importer depends on them.`,
    `# - Hebrew is under <<<HE>>> for reference; refresh by re-running this export if HTML changes.`,
    `#`,
    `# Import when done:`,
    `#   node import_oc318_commentary_from_external_translation.mjs ${slug}`,
    `# Then:`,
    `#   node build_oc318_full_complete.mjs`,
    "",
  ];

  for (const seif of seifs) {
    const markers = Object.keys(heTree[seif]).sort((a, b) => {
      if (a === "_") return -1;
      if (b === "_") return 1;
      return String(a).localeCompare(String(b), "he");
    });
    for (const marker of markers) {
      const heText = heTree[seif][marker];
      lines.push(blockTemplate(slug, seif, marker, heText));
    }
  }

  if (!fs.existsSync(WORK)) fs.mkdirSync(WORK, { recursive: true });

  const outPath = path.join(WORK, `${slug}_OC318_translate.txt`);
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("Wrote", outPath, `(${seifs.length} seif group(s))`);
}

run();
