#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p1 = await import(pathToFileURL(path.join(__dirname, "_hand-en-siman221-part1.mjs")).href);
const p2 = await import(pathToFileURL(path.join(__dirname, "_hand-en-siman221-part2.mjs")).href);
const FIXES = { ...p1.FIXES, ...p2.FIXES };
for (const [rel, blocks] of Object.entries(p2.FIXES)) {
  if (!FIXES[rel]) FIXES[rel] = {};
  Object.assign(FIXES[rel], blocks);
}
for (const [rel, blocks] of Object.entries(p1.FIXES)) {
  if (!FIXES[rel]) FIXES[rel] = {};
  Object.assign(FIXES[rel], blocks);
}
const out = `/** worker-slot-5 — siman 221 hand translations (42 blocks) */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "_siman221-slot5-en.mjs"), out, "utf8");
console.log("wrote _siman221-slot5-en.mjs", Object.values(FIXES).reduce((n, o) => n + Object.keys(o).length, 0), "blocks");
