#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "..", "output");

let totalBad = 0;
const bySiman = {};

for (const siman of simans) {
  const dir = path.join(outRoot, `siman_${siman}`);
  if (!fs.existsSync(dir)) continue;
  let n = 0;
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!isBadMt447(b.en)) continue;
        n++;
        totalBad++;
        const hit = BAD_MT_447.find((re) => re.test(b.en || ""));
        if (process.argv.includes("--verbose")) {
          console.log(
            `siman_${siman} ${slug}/${f} ${b.seif}:${b.marker || "_"} [${hit?.source}] ${(b.en || "").slice(0, 80)}`
          );
        }
      }
    }
  }
  bySiman[siman] = n;
}

console.log("bySiman", JSON.stringify(bySiman));
console.log("totalBad", totalBad);
