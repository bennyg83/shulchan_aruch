#!/usr/bin/env node
/** Inject need-dump translations into hand-slot13 JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { autoFix } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const fixesPath = process.argv[3];
if (!siman || !fixesPath) {
  console.error("Usage: _apply-need-fixes.mjs <siman> <fixes.json>");
  process.exit(1);
}

const { FIXES } = await import(pathToFileURL(path.resolve(fixesPath)).href);
const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const en = FIXES[it.rel]?.[it.key];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("updated", n, "items in hand json for siman", siman);
