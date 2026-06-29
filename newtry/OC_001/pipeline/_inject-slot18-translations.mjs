#!/usr/bin/env node
/** Inject slot18-translations.json into hand-slot18-siman-NNN.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot18-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const allPath = path.join(__dirname, "work", "slot18-translations.json");
if (!fs.existsSync(allPath)) {
  console.error("missing", allPath);
  process.exit(1);
}
const all = JSON.parse(fs.readFileSync(allPath, "utf8"));
const fixes = all[String(siman)] || all[siman];
if (!fixes) {
  console.error("no translations for siman", siman);
  process.exit(1);
}
const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const k = `${it.rel}|${it.key}`;
  const en = fixes[k];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en || x.en.length < 8);
console.log("siman", siman, "injected", n, "missing", miss.length);
if (miss.length) {
  miss.slice(0, 8).forEach((m) => console.error(" ", m.rel, m.key));
  process.exit(1);
}
