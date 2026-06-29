#!/usr/bin/env node
/** Merge patch JSON objects into siman447-part{N}.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = Number(process.argv[2]);
const patchPath = process.argv[3];
if (!part || !patchPath) {
  console.error("Usage: node _patch-hand447.mjs <1|2|3> <patch.json>");
  process.exit(1);
}
const handPath = path.join(__dirname, `siman447-part${part}.json`);
const hand = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};
const patch = JSON.parse(fs.readFileSync(patchPath, "utf8"));
let n = 0;
for (const [k, v] of Object.entries(patch)) {
  if (v && String(v).trim()) {
    hand[k] = String(v).trim();
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
console.log(`patched part${part}: +${n} keys, total ${Object.keys(hand).length}`);
