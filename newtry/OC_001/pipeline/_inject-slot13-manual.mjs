#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { autoFix } from "./_slot13-lib.mjs";

const siman = Number(process.argv[2]);
const manualPath = process.argv[3];
if (!siman || !manualPath) {
  console.error("Usage: _inject-slot13-manual.mjs <siman> <manual.mjs>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { MANUAL } = await import(pathToFileURL(path.resolve(manualPath)).href);
const fixes = MANUAL[siman];
if (!fixes) {
  console.error("No MANUAL entry for siman", siman);
  process.exit(1);
}

const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const en = fixes[it.rel]?.[it.key];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const missing = hand.items.filter((x) => !x.en || x.en.length < 8);
console.log("manual injected", n, "still missing", missing.length);
if (missing.length) {
  console.error(missing.slice(0, 8).map((x) => `${x.rel} ${x.key}`).join("\n"));
  process.exit(1);
}
