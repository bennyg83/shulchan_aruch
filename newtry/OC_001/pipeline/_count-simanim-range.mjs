#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";

const lo = Number(process.argv[2]);
const hi = Number(process.argv[3]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

for (let s = lo; s <= hi; s++) {
  const pad = String(s).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  let blocks = 0;
  let files = 0;
  for (const abs of walkOc001PartFiles(OUT)) {
    if (!abs.includes(needle)) continue;
    files++;
    blocks += parseBlocksInFile(fs.readFileSync(abs, "utf8")).length;
  }
  console.log(`${s}\t${blocks}\t${files}`);
}
