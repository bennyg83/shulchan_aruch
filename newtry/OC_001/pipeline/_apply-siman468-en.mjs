#!/usr/bin/env node
/** Merge siman468 EN parts into hand JSON and build fixes file */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PART1 } from "./lib/siman468-en-part1.mjs";
import { PART2 } from "./lib/siman468-en-part2.mjs";
import { PART3 } from "./lib/siman468-en-part3.mjs";
import { PART4 } from "./lib/siman468-en-part4.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot11-siman-468.json");
const fixesPath = path.join(__dirname, "_fixes-siman468-slot11.mjs");

const FIXES = { ...PART1, ...PART2, ...PART3, ...PART4 };
for (const parts of [PART1, PART2, PART3, PART4]) {
  for (const [rel, keys] of Object.entries(parts)) {
    if (!FIXES[rel]) FIXES[rel] = {};
    Object.assign(FIXES[rel], keys);
  }
}

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
let miss = [];
for (const it of hand.items) {
  const en = FIXES[it.rel]?.[it.key];
  if (en) {
    it.en = en;
    n++;
  } else {
    miss.push(`${it.rel} ${it.key}`);
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
fs.writeFileSync(
  fixesPath,
  `export const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`,
  "utf8"
);
console.log("applied", n, "missing", miss.length);
if (miss.length) {
  console.error(miss.join("\n"));
  process.exit(1);
}
