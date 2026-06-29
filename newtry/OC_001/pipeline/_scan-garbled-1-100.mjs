#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const GARBLED = [
  /\bDam[a-z]{2,}/i,
  /\bAAG\b/,
  /\bDoh'\b/,
  /\bKai\b.*\bKai\b/,
  /\bM\. A\. Sec\b/,
  /\bSkala\b/i,
  /\bDamh/i,
  /\bRiu\b/,
  /\bDuff\b/,
  /\bDeshani\b/,
  /\bDabarcha\b/,
  /\bMbadilin\b/,
  /\bMadlikin\b/,
  /\[hand\]/i,
  /\bthe Omnipresent demanded\b/i,
  /\bar's milk\b/i,
  /\bcreamed her face\b/i,
];

const OUT = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), "output");
let strict = 0,
  pre = 0,
  qual = 0,
  garbled = 0;
const bySiman = {};

for (let s = 1; s <= 100; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  let bs = 0,
    bp = 0,
    bq = 0,
    bg = 0;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (isBadMt447(b.en)) bs++;
        if (preflightFail(b.en)) bp++;
        const issues = runBlockQualityChecks(b);
        if (maxSeverity(issues) >= SEVERITY.warn) bq++;
        if (GARBLED.some((re) => re.test(b.en || ""))) bg++;
      }
    }
  }
  strict += bs;
  pre += bp;
  qual += bq;
  garbled += bg;
  if (bs || bp || bg) bySiman[s] = { strict: bs, pre: bp, garbled: bg, qual: bq };
}

console.log(`strict bad_mt=${strict} preflight=${pre} quality_warn+=${qual} garbled_heuristic=${garbled}`);
const sorted = Object.entries(bySiman)
  .map(([s, v]) => ({ siman: Number(s), ...v }))
  .sort((a, b) => b.garbled - a.garbled || b.strict - a.strict);
for (const x of sorted.slice(0, 20)) {
  console.log(`  siman_${String(x.siman).padStart(3, "0")}: strict=${x.strict} garbled=${x.garbled} pre=${x.pre}`);
}
