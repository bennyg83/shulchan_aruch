#!/usr/bin/env node
/** Build _fixes-simanNNN-slot12.mjs from hand-slot12 JSON (items with en). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot12-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const fixes = {};
for (const it of hand.items) {
  if (!it.en) continue;
  if (!fixes[it.rel]) fixes[it.rel] = {};
  fixes[it.rel][it.key] = autoFix(it.en, it.marker, it.he || "");
}
const n = Object.values(fixes).reduce((s, m) => s + Object.keys(m).length, 0);
const out = path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`);
fs.writeFileSync(
  out,
  `/** siman ${siman} fixes from hand (${n} blocks) */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
  "utf8"
);
console.log("wrote", out, n, "blocks", "missing", hand.items.length - n);
