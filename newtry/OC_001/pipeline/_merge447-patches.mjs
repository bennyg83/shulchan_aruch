#!/usr/bin/env node
/** Merge siman447-part{N}-patch*.{json,mjs} into hand JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = Number(process.argv[2] || 3);
const handPath = path.join(__dirname, `siman447-part${part}.json`);
const hand = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};
const files = fs.readdirSync(__dirname).filter((f) => f.match(new RegExp(`^siman447-part${part}-patch`)));
let n = 0;
for (const f of files.sort()) {
  let patch;
  if (f.endsWith(".mjs")) {
    patch = (await import(pathToFileURL(path.join(__dirname, f)).href)).default;
  } else {
    patch = JSON.parse(fs.readFileSync(path.join(__dirname, f), "utf8"));
  }
  for (const [k, v] of Object.entries(patch)) {
    if (v && String(v).trim()) {
      hand[k] = String(v).trim();
      n++;
    }
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
console.log(`part${part}: merged ${files.length} patch files, +${n} entries, total ${Object.keys(hand).length}`);
