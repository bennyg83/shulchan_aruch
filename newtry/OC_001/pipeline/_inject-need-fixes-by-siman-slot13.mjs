#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot13-lib.mjs";

const siman = process.argv[2];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const all = JSON.parse(fs.readFileSync(path.join(__dirname, "work", "slot13-need-fixes.json"), "utf8"));
const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const prefix = `${siman}|`;
let n = 0;
for (const it of hand.items) {
  const k = `${siman}|${it.rel}|${it.key}`;
  const en = all[k];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en);
console.log("siman", siman, "injected", n, "missing", miss.length);
if (miss.length) {
  for (const m of miss) console.log(" ", m.rel, m.key);
  process.exit(1);
}
