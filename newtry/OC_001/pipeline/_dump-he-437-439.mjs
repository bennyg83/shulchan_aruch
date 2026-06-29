#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

export function stripHtml(s) {
  return String(s ?? "")
    .replace(/<small>/gi, " {Rama: ")
    .replace(/<\/small>/gi, "}")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function dumpSiman(n) {
  const dir = path.join(ROOT, "output", `siman_${n}`);
  const out = {};
  for (const slug of fs.readdirSync(dir).sort()) {
    const fp = path.join(dir, slug, "part-001.txt");
    if (!fs.existsSync(fp)) continue;
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    for (const b of blocks) {
      const k = `${slug}/${b.seif}:${b.marker || "_"}`;
      out[k] = { he: b.he, hePlain: stripHtml(b.he), en: b.en };
    }
  }
  return out;
}

for (const n of [437, 439]) {
  const data = dumpSiman(n);
  const p = path.join(__dirname, `_he${n}-export.json`);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`siman ${n}: ${Object.keys(data).length} keys -> ${p}`);
}
