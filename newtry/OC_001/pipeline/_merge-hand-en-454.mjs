#!/usr/bin/env node
/** Merge _hand-en-454.json remnant fixes into siman454-part{1,2,3}.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt454.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function partOf(slug) {
  if (PART1.includes(slug)) return 1;
  if (PART2.includes(slug)) return 2;
  if (PART3.includes(slug)) return 3;
  return 0;
}

const handEnPath = path.join(__dirname, "_hand-en-454.json");
if (!fs.existsSync(handEnPath)) {
  console.log("no _hand-en-454.json — skip");
  process.exit(0);
}

const handEn = JSON.parse(fs.readFileSync(handEnPath, "utf8"));
const parts = { 1: {}, 2: {}, 3: {} };

for (const [k, v] of Object.entries(handEn)) {
  const slug = k.split("/")[0];
  const pn = partOf(slug);
  if (pn) parts[pn][k] = v;
}

for (const pn of [1, 2, 3]) {
  const handPath = path.join(__dirname, `siman454-part${pn}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  Object.assign(hand, parts[pn]);
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
  console.log(`merged hand-en → part${pn}:`, Object.keys(parts[pn]).length, "total", Object.keys(hand).length);
}
