#!/usr/bin/env node
/** Patch specific en into hand-slot5-siman-NNN.json: node _patch-hand-en.mjs 223 fixes.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const siman = parseInt(process.argv[2], 10);
const fixesPath = process.argv[3];
const { FIXES } = await import(pathToFileURL(path.resolve(fixesPath)).href);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot5-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const en = FIXES[it.rel]?.[it.key];
  if (en) {
    it.en = en;
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("patched", n);
