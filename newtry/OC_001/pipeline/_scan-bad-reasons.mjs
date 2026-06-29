#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { BAD_MT_447 } from "./lib/bad-mt-447.mjs";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, "..", "output");
const counts = {};

for (const siman of simans) {
  const dir = path.join(outRoot, `siman_${siman}`);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        const en = b.en || "";
        if (!en.trim() || (en.length < 8 && /^[\(\)\d\s\-–—.:,'"]+$/.test(en))) {
          counts.pending = (counts.pending || 0) + 1;
          continue;
        }
        for (const re of BAD_MT_447) {
          if (re.test(en)) {
            const k = re.source.slice(0, 40);
            counts[k] = (counts[k] || 0) + 1;
            break;
          }
        }
      }
    }
  }
}
console.log(JSON.stringify(counts, null, 2));
