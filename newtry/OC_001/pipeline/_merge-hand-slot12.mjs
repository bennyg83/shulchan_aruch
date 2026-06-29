#!/usr/bin/env node
/** Merge T map into hand-slot12-siman-NNN.json — keys: "rel|seif:marker" */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const dataPath = process.argv[3];
if (!siman || !dataPath) {
  console.error("Usage: _merge-hand-slot12.mjs <siman> <translations.mjs>");
  process.exit(1);
}

const { T } = await import(path.resolve(dataPath) + "?v=" + Date.now());
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const k = `${it.rel}|${it.key}`;
  if (T[k]) {
    it.en = T[k];
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en || x.en.length < 8);
console.log(`siman ${siman}: merged ${n}, missing ${miss.length}`);
if (miss.length) {
  console.log(miss.slice(0, 5).map((x) => `${x.rel} ${x.key}`).join("\n"));
  process.exit(1);
}
