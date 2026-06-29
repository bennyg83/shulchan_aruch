#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const siman = Number(process.argv[2]);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = simanOutputDir(path.join(ROOT, "output"), siman);
let total = 0, bad = 0;
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      total++;
      if (isBad(b.en)) bad++;
    }
  }
}
console.log(`siman_${siman}: total=${total} bad_mt=${bad} good=${total - bad}`);
