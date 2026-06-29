#!/usr/bin/env node
/** Build hand153-garbled.mjs from work/hand153-garbled.json + overrides */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERRIDES as GARBLED_OVERRIDES } from "./hand153-garbled-overrides.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "work", "hand153-garbled.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const keys = new Set(data.items.map((it) => `${it.rel}\t${it.key}`));
const byFile = {};
let missing = 0;

for (const it of data.items) {
  if (!it.en || !String(it.en).trim()) {
    missing++;
    continue;
  }
  if (!byFile[it.rel]) byFile[it.rel] = {};
  byFile[it.rel][it.key] = String(it.en).trim();
}
for (const [rel, blockFixes] of Object.entries(GARBLED_OVERRIDES)) {
  for (const [key, en] of Object.entries(blockFixes)) {
    if (!keys.has(`${rel}\t${key}`)) continue;
    if (!byFile[rel]) byFile[rel] = {};
    byFile[rel][key] = en;
  }
}

const body = `/** siman 153 garbled-block hand fixes (generated + overrides) */\nexport const FIXES = ${JSON.stringify(byFile, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "hand153-garbled.mjs"), body, "utf8");
let blockCount = 0;
for (const f of Object.values(byFile)) blockCount += Object.keys(f).length;
console.log(
  `hand153-garbled.mjs: ${Object.keys(byFile).length} files, ${blockCount} blocks, missing en=${missing}`
);
if (missing) process.exit(1);
