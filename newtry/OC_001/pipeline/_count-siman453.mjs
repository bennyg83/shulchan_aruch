#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const base = "output/siman_453";
let total = 0;
const counts = {};
for (const slug of fs.readdirSync(base).sort()) {
  const dir = path.join(base, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  let n = 0;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    n += parseBlocksInFile(raw).length;
  }
  if (n) {
    counts[slug] = n;
    total += n;
  }
}
console.log(JSON.stringify(counts, null, 2));
console.log("TOTAL", total);
