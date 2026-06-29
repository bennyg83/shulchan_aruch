#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { plainFromHtml } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const simanDir = path.join(ROOT, "output", "siman_038");
const out = {};

for (const slug of fs.readdirSync(simanDir).filter((d) => fs.statSync(path.join(simanDir, d)).isDirectory()).sort()) {
  const parts = fs.readdirSync(path.join(simanDir, slug)).filter((f) => f.endsWith(".txt"));
  out[slug] = [];
  for (const part of parts.sort()) {
    const raw = fs.readFileSync(path.join(simanDir, slug, part), "utf8");
    for (const b of parseBlocksInFile(raw)) {
      const marker = b.marker === "_" || !b.marker ? "main" : b.marker;
      const key = `${b.seif}#${marker}`;
      out[slug].push({ key, part, he: plainFromHtml(b.he) });
    }
  }
}

const fp = path.join(path.dirname(fileURLToPath(import.meta.url)), "_siman-038-hebrew-dump.json");
fs.writeFileSync(fp, JSON.stringify(out, null, 2), "utf8");
let n = 0;
for (const [s, arr] of Object.entries(out)) { console.log(s, arr.length); n += arr.length; }
console.log("TOTAL", n, "->", fp);
