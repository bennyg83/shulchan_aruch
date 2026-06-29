#!/usr/bin/env node
/** Split siman 240 extract into batch JSON files (~41 blocks each) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "_extract-siman240.json"), "utf8"));
const flat = [];
for (const [file, blocks] of Object.entries(data)) {
  for (const [key, he] of Object.entries(blocks)) {
    flat.push({ file, key, he });
  }
}
const BATCH = 41;
for (let i = 0; i < flat.length; i += BATCH) {
  const n = Math.floor(i / BATCH) + 1;
  const chunk = flat.slice(i, i + BATCH);
  const out = {};
  for (const { file, key, he } of chunk) {
    if (!out[file]) out[file] = {};
    out[file][key] = he;
  }
  const p = path.join(__dirname, `_extract-siman240-batch${n}.json`);
  fs.writeFileSync(p, JSON.stringify(out, null, 2), "utf8");
  console.log("batch", n, Object.keys(chunk).length, "blocks", chunk.length);
}
