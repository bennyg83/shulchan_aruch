#!/usr/bin/env node
/** Build small489-en.mjs + batchB data, apply fixes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { T as short } from "./_tr489-short.mjs";
import { T as bhg } from "./_tr489-beur-hagra.mjs";
import { T as bh } from "./_tr489-biur-halacha.mjs";
import { T as cy } from "./_tr489-chok-yaakov.mjs";
import { T as mb } from "./_tr489-mishnah-berurah.mjs";
import { T as pm } from "./_tr489-peri-megadim.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SMALL = { ...short, ...bhg, ...bh, ...cy, ...mb, ...pm };

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const lines = [
  "/** OC siman 489 batch B — slug:seif:marker translations */",
  "export const SMALL = {",
];
for (const k of Object.keys(SMALL).sort((a, b) => a.localeCompare(b, "en"))) {
  lines.push(`  ${JSON.stringify(k)}: \`${esc(SMALL[k])}\`,`);
}
lines.push("};", "");
fs.writeFileSync(path.join(__dirname, "small489-en.mjs"), lines.join("\n"), "utf8");

const FIXES = {};
for (const [fullKey, en] of Object.entries(SMALL)) {
  const [slug, seif, marker] = fullKey.split(":");
  const rel = `${slug}/part-001.txt`;
  const bk = `${seif}:${marker}`;
  if (!FIXES[rel]) FIXES[rel] = {};
  FIXES[rel][bk] = en;
}

const dataLines = [
  `/** worker-slot-12 — siman 489 editorial batch B fixes (${Object.keys(SMALL).length} blocks) */`,
  "export const FIXES = {",
];
for (const [rel, m] of Object.entries(FIXES)) {
  dataLines.push(`  ${JSON.stringify(rel)}: {`);
  for (const [k, v] of Object.entries(m)) {
    dataLines.push(`    ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  }
  dataLines.push("  },");
}
dataLines.push("};", "");
fs.writeFileSync(path.join(__dirname, "_siman489-slot12-batchB-data.mjs"), dataLines.join("\n"), "utf8");
console.log("wrote small489-en.mjs and batchB data:", Object.keys(SMALL).length);
