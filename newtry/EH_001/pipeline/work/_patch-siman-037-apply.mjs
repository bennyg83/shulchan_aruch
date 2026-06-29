#!/usr/bin/env node
/**
 * Apply all siman 037 patch modules in canonical commentary order.
 */
import { pathToFileURL } from "url";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.dirname(fileURLToPath(import.meta.url));

const MODULES = [
  "_patch-siman-037-mechaber.mjs",
  "_patch-siman-037-beer-hagolah.mjs",
  "_patch-siman-037-baer-hetev.mjs",
  "_patch-siman-037-beit-shmuel.mjs",
  "_patch-siman-037-beit-meir.mjs",
  "_patch-siman-037-turei-zahav.mjs",
  "_patch-siman-037-beur-hagra.mjs",
  "_patch-siman-037-chokhmat-shlomo.mjs",
  "_patch-siman-037-pitchei-teshuva.mjs",
  "_patch-siman-037-rabbi-akiva-eiger.mjs",
];

const counts = {};

for (const mod of MODULES) {
  const fp = path.join(DIR, mod);
  const m = await import(pathToFileURL(fp).href);
  const slug = mod.replace("_patch-siman-037-", "").replace(".mjs", "");
  counts[slug] = m.default ?? 0;
}

console.log("\n=== siman_037 patch totals ===");
let total = 0;
for (const [slug, n] of Object.entries(counts)) {
  console.log(`  ${slug}: ${n}`);
  total += n;
}
console.log(`  TOTAL: ${total}`);
