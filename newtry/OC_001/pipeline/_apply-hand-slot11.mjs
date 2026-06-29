#!/usr/bin/env node
/** Apply work/hand-slot11-siman-NNN.json to output */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot11-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const base = path.join(OC_ROOT, "output", `siman_${siman}`);
const byRel = {};
for (const it of hand.items) {
  if (!it.en || String(it.en).trim().length < 8) {
    console.error("missing en", it.rel, it.key);
    process.exit(1);
  }
  if (!byRel[it.rel]) byRel[it.rel] = {};
  byRel[it.rel][it.key] = autoFix(it.en, it.marker, it.he || "");
}
const fails = [];
let total = 0;
for (const [rel, blockFixes] of Object.entries(byRel)) {
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
  for (const [key, en] of Object.entries(blockFixes)) {
    const pf = preflightFail(en);
    if (pf) fails.push(`${rel} ${key}: ${pf}`);
  }
}
console.log("applied", total, "blocks");
if (fails.length) {
  console.error("PREFLIGHT:", fails.slice(0, 20).join("\n"));
  process.exit(1);
}
console.log("preflight ok");
