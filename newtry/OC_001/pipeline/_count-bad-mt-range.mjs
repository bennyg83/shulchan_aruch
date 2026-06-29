#!/usr/bin/env node
/** Count bad_mt in siman range. Usage: node pipeline/_count-bad-mt-range.mjs 510 600 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = parseInt(process.argv[2], 10) || 510;
const TO = parseInt(process.argv[3], 10) || 600;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

let total = 0;
let bad = 0;
const bySiman = [];

for (let s = FROM; s <= TO; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  let t = 0,
    b = 0;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const bl of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        t++;
        if (isBadMt447(bl.en)) b++;
      }
    }
  }
  if (b > 0) bySiman.push({ s, b, t });
  total += t;
  bad += b;
}

bySiman.sort((a, b) => b.b - a.b);
console.log(`RANGE ${FROM}-${TO}: blocks=${total} bad_mt=${bad} simanim_with_bad=${bySiman.length}`);
for (const x of bySiman) {
  console.log(`  siman_${String(x.s).padStart(3, "0")}: ${x.b}/${x.t}`);
}
