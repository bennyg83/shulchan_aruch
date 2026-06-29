#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = parseInt(process.argv[2], 10) || 1;
const TO = parseInt(process.argv[3], 10) || 100;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

let total = 0;
const bySiman = [];
for (let s = FROM; s <= TO; s++) {
  const d = simanOutputDir(OUT, s);
  if (!fs.existsSync(d)) continue;
  let bad = 0;
  for (const slug of fs.readdirSync(d)) {
    const sd = path.join(d, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(sd, f), "utf8"))) {
        if (isBadMt447(b.en)) bad++;
      }
    }
  }
  if (bad) bySiman.push({ s, bad });
  total += bad;
}
bySiman.sort((a, b) => b.bad - a.bad);
console.log(`RANGE ${FROM}-${TO} total_bad_mt=${total} simanim_with_bad=${bySiman.length}`);
for (const { s, bad } of bySiman) console.log(`  siman_${s}: ${bad}`);
process.exit(total > 0 ? 1 : 0);
