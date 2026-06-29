#!/usr/bin/env node
/** node _apply-hand-siman.mjs 374 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot9-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const handPath = path.join(__dirname, `en${siman}-hand.json`);
const queuePath = path.join(__dirname, `he${siman}-queue.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const base = path.join(__dirname, "..", "output", `siman_${siman}`);

const byFile = {};
for (const [fullKey, en] of Object.entries(hand)) {
  const meta = queue[fullKey];
  if (!meta) continue;
  const rel = meta.file;
  if (!byFile[rel]) byFile[rel] = {};
  byFile[rel][meta.blockKey] = en;
}

let total = 0;
const fails = [];
for (const [rel, blockFixes] of Object.entries(byFile)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      fails.push(`MISSING ${rel} ${key}`);
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
  for (const [key, en] of Object.entries(blockFixes)) {
    const pf = preflightFail(en);
    if (pf) fails.push(`${rel} ${key}: ${pf}`);
  }
}
console.log(`siman_${siman} applied`, total);
const miss = fails.filter((f) => f.startsWith("MISSING"));
const pf = fails.filter((f) => !f.startsWith("MISSING"));
if (miss.length) console.error("MISSING", miss.length, miss.slice(0, 5).join("\n"));
if (pf.length) {
  console.error("PREFLIGHT", pf.join("\n"));
  process.exit(1);
}
