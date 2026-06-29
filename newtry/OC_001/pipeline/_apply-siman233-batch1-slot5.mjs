#!/usr/bin/env node
/** worker-slot-5 — siman 233 editorial batch 1 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { FIXES } from "./_siman233-slot5-batch1-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_233");

const PREFLIGHT = [
  /\bLord's Prayer\b/i,
  /\bShield of Abraham\b/i,
  /\bGolden Rows\b/i,
  /\bHouse of Joseph\b/i,
  /\bCapernaum\b/i,
  /\bArabic\b/i,
  /\bguide\b/i,
  /&quot;/,
  /&amp;/,
];

let total = 0;
const preflightFail = [];

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  for (const [key, en] of Object.entries(blockFixes)) {
    if (!en || en.length < 8) {
      preflightFail.push(`too_short ${rel} ${key}`);
      continue;
    }
    for (const re of PREFLIGHT) {
      if (re.test(en)) preflightFail.push(`${rel} ${key}: ${re.source}`);
    }
  }
}
if (preflightFail.length) {
  console.error("PREFLIGHT FAILURES:", preflightFail.join("\n"));
  process.exit(1);
}
console.log("preflight ok");
