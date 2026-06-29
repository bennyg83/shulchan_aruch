#!/usr/bin/env node
/** Parse fail fixes .mjs (duplicate top-level rel keys) into one merged FIXES object */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(__dirname, "_fixes-need-fail-manual-slot15.mjs"), "utf8");
const merged = {};
const relRe = /"([^"]+\/part-001\.txt)":\s*\{/g;
let m;
const positions = [];
while ((m = relRe.exec(src)) !== null) {
  positions.push({ rel: m[1], start: m.index + m[0].length });
}
for (let i = 0; i < positions.length; i++) {
  const { rel, start } = positions[i];
  const end = i + 1 < positions.length ? positions[i + 1].start - positions[i + 1].rel.length - 30 : src.length;
  const chunk = src.slice(start, end);
  const keyRe = /"([^"]+)":\s*\n\s*"((?:[^"\\]|\\.)*)"/g;
  let km;
  while ((km = keyRe.exec(chunk)) !== null) {
    const key = km[1];
    const en = km[2].replace(/\\n/g, "\n").replace(/\\"/g, '"');
    if (!merged[rel]) merged[rel] = {};
    merged[rel][key] = en;
  }
}
const out = path.join(__dirname, "_fixes-need-fail-merged-slot15.mjs");
fs.writeFileSync(
  out,
  `/** merged — no duplicate rel keys */\nexport const FIXES = ${JSON.stringify(merged, null, 2)};\n`,
  "utf8"
);
const n = Object.values(merged).reduce((a, o) => a + Object.keys(o).length, 0);
console.log("rels", Object.keys(merged).length, "blocks", n);
console.log("machatzit keys", Object.keys(merged["machatzit-hashekel/part-001.txt"] || {}));
console.log("chokhmat keys", Object.keys(merged["chokhmat-shlomo/part-001.txt"] || {}));
