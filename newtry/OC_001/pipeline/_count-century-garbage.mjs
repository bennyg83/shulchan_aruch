#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 386;
const to = parseInt(process.argv[3], 10) || 509;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");
const RE = /\b\d{1,2}(?:st|nd|rd|th)?\s+century\b/i;

let total = 0;
const bySiman = {};
for (let s = from; s <= to; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (RE.test(plainFromHtml(b.en))) {
          total++;
          bySiman[s] = (bySiman[s] || 0) + 1;
        }
      }
    }
  }
}
console.log(`RANGE ${from}-${to} century_garbage=${total}`);
const top = Object.entries(bySiman)
  .map(([k, v]) => [Number(k), v])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);
for (const [s, n] of top) console.log(`  siman_${s}: ${n}`);
