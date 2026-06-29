#!/usr/bin/env node
/** worker slot 3 — siman 439 (mouse / loaves bedika) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { fixes } from "./_fixes-siman439.mjs";

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bHashem\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
  /\bDarbanan\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\bSaturday\b/i,
  /\bher age\b/i,
  /\bthe craft\b/i,
  /\bPresidents of\b/i,
  /\bIDF\b/i,
  /\bGaza\b/i,
];

const files = Object.keys(fixes).sort();

console.log("=== blocks in txt files (preflight inventory) ===");
let inventoryTotal = 0;
for (const rel of files) {
  const file = rel.replace(/\//g, "\\");
  const n = parseBlocksInFile(fs.readFileSync(file, "utf8")).length;
  inventoryTotal += n;
  console.log(`${rel}: ${n}`);
}
console.log("INVENTORY_TOTAL", inventoryTotal);
console.log("");

let total = 0;
const perFile = {};
const risks = [];
const missing = [];

for (const rel of files) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  const blockFixes = fixes[rel];
  let n = 0;
  for (const b of blocks) {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (!blockFixes[key]) missing.push({ file, key });
  }
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) risks.push({ file, key, pattern: re.source });
        }
        if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_shem_note" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  perFile[rel] = n;
  total += n;
}

console.log("=== block counts per file ===");
for (const rel of files) {
  const expected = Object.keys(fixes[rel]).length;
  const applied = perFile[rel];
  const flag = applied === expected ? "" : " MISMATCH";
  console.log(`${rel}: ${applied}/${expected}${flag}`);
}
const expectedTotal = Object.values(fixes).reduce((s, o) => s + Object.keys(o).length, 0);
console.log("TOTAL", total, "/", expectedTotal);
if (missing.length) console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
if (risks.length) console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
else console.log("PREFLIGHT_RISKS none");
