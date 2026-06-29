#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot15-lib.mjs";

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: _patch-hand-en-from-json.mjs <fixes.json>");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot15-siman-${data.siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const en = data.fixes?.[it.rel]?.[it.key];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en).length;
console.log("patched", n, "missing", miss);
