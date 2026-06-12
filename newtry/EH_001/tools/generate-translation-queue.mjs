#!/usr/bin/env node
/**
 * Write TRANSLATION_QUEUE.md from siman 1 manifest + COMMENTARY_ORDER.
 *
 *   node tools/generate-translation-queue.mjs
 *   node tools/generate-translation-queue.mjs --siman 87
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { COMMENTARY_ORDER, EH001_ROOT } from "../../lib/eh001-volume.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  let siman = 1;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
  }
  return { siman };
}

function pad(n) {
  return String(n).padStart(3, "0");
}

const { siman } = parseArgs();
const manifestPath = path.join(EH001_ROOT, "output", `siman_${pad(siman)}`, "manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("Missing", manifestPath);
  process.exit(1);
}
const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const bySlug = new Map((doc.sources || []).map((s) => [s.slug, s]));

const lines = [
  `# EH001 translation queue — siman ${siman}`,
  "",
  `Generated from \`output/siman_${pad(siman)}/manifest.json\`.`,
  "",
  "Process commentaries **in this order** (canonical for agents):",
  "",
];

for (const c of COMMENTARY_ORDER) {
  const src = bySlug.get(c.slug);
  const blocks = src?.totalBlocks ?? 0;
  const parts = (src?.parts || []).map((p) => p.file).join(", ") || "(no parts)";
  lines.push(`1. **${c.slug}** — ${c.title} — ${blocks} blocks — ${parts}`);
}

lines.push("", "## Commands", "", "```bash", "cd newtry/EH_001", `npm run apply:dictionary -- --root output/siman_${pad(siman)}`, "npm run pipeline:validate -- --root output/siman_" + pad(siman), "```", "");

const outPath = path.join(EH001_ROOT, "TRANSLATION_QUEUE.md");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Wrote", outPath);
