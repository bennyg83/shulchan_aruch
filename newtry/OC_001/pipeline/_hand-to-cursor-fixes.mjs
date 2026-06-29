#!/usr/bin/env node
/** Merge hand-slot12 translations into cursor-fixes JSON for _apply-cursor-json.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) throw new Error("Usage: _hand-to-cursor-fixes.mjs <siman> [siman...]");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");
const FIXES = {};

for (const siman of simanim) {
  const handPath = path.join(WORK, `hand-slot12-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  FIXES[siman] = {};
  for (const it of hand.items) {
    if (!it.en || !String(it.en).trim()) {
      throw new Error(`missing en: siman ${siman} ${it.rel} ${it.key}`);
    }
    if (!FIXES[siman][it.rel]) FIXES[siman][it.rel] = {};
    FIXES[siman][it.rel][it.key] = String(it.en).trim();
  }
}

const outName =
  simanim.length === 1
    ? `cursor-fixes-${simanim[0]}.json`
    : `cursor-fixes-${simanim.join("-")}.json`;
const outPath = path.join(WORK, outName);
fs.writeFileSync(outPath, JSON.stringify(FIXES, null, 2) + "\n", "utf8");
let n = 0;
for (const s of simanim) for (const r of Object.values(FIXES[s])) n += Object.keys(r).length;
console.log("wrote", outPath, n, "blocks");
