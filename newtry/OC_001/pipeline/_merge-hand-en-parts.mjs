#!/usr/bin/env node
/** Merge part FIXES into one export: node _merge-hand-en-parts.mjs 223 part1.mjs part2.mjs ... */
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const siman = parseInt(process.argv[2], 10);
const parts = process.argv.slice(3);
if (!siman || !parts.length) {
  console.error("Usage: _merge-hand-en-parts.mjs <siman> <part.mjs> ...");
  process.exit(1);
}

const FIXES = {};
for (const p of parts) {
  const mod = await import(pathToFileURL(path.resolve(p)).href);
  for (const [rel, blocks] of Object.entries(mod.FIXES)) {
    if (!FIXES[rel]) FIXES[rel] = {};
    Object.assign(FIXES[rel], blocks);
  }
}
const out = path.join(path.dirname(pathToFileURL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1")), `_siman${siman}-slot5-en.mjs`);
const outPath = path.join(process.cwd(), "pipeline", `_siman${siman}-slot5-en.mjs`);
const body = `/** worker-slot-5 — siman ${siman} merged hand translations */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
let n = 0;
for (const b of Object.values(FIXES)) n += Object.keys(b).length;
console.log("wrote", outPath, n, "blocks");
