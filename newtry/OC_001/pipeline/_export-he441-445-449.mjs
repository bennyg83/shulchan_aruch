#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function exportSiman(n) {
  const dir = path.join(ROOT, `output/siman_${n}`);
  const out = {};
  for (const slug of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, slug, "part-001.txt");
    if (!fs.existsSync(p)) continue;
    for (const b of parseBlocksInFile(fs.readFileSync(p, "utf8"))) {
      const k = `${slug}/${b.seif}:${b.marker || "_"}`;
      out[k] = { he: b.he, en: b.en };
    }
  }
  const fp = path.join(__dirname, `he${n}-export.json`);
  fs.writeFileSync(fp, JSON.stringify(out, null, 2));
  console.log(n, Object.keys(out).length, "->", fp);
}

for (const n of [441, 445, 449]) exportSiman(n);
