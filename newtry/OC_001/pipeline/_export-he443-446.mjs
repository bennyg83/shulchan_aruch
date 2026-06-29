#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function exportSiman(n) {
  const SIMAN = path.join(ROOT, `output/siman_${n}`);
  const out = {};
  for (const slug of fs.readdirSync(SIMAN).sort()) {
    const f = path.join(SIMAN, slug, "part-001.txt");
    if (!fs.existsSync(f)) continue;
    for (const b of parseBlocksInFile(fs.readFileSync(f, "utf8"))) {
      out[`${slug}/${b.seif}:${b.marker || "_"}`] = { he: b.he, en: b.en };
    }
  }
  const p = path.join(__dirname, `he${n}-export.json`);
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n");
  console.log(`siman ${n} keys`, Object.keys(out).length, "->", p);
}

exportSiman(443);
exportSiman(446);
