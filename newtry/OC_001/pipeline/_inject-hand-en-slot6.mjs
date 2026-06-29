#!/usr/bin/env node
/** Merge FIXES { rel: { key: en } } into work/hand-slot6-siman-NNN.json items[].en */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const fixesPath = process.argv[3];
if (!siman || !fixesPath) {
  console.error("Usage: _inject-hand-en-slot6.mjs <siman> <fixes.mjs>");
  process.exit(1);
}

const { FIXES } = await import(pathToFileURL(path.resolve(fixesPath)).href);
const handPath = path.join(__dirname, "work", `hand-slot6-siman-${siman}.json`);
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
const missing = hand.items.filter((x) => !x.en || x.en.length < 8);
console.log("injected", n, "missing", missing.length);
if (missing.length) {
  console.error(missing.slice(0, 5).map((x) => `${x.rel} ${x.key}`).join("\n"));
  process.exit(1);
}
