#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { TRANSLATIONS } from "./hand454-translations.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { PART1, PART2, PART3 } from "./_analyze-bad-mt454.mjs";

function partOf(slug) {
  if (PART1.includes(slug)) return 1;
  if (PART2.includes(slug)) return 2;
  if (PART3.includes(slug)) return 3;
  return 0;
}

const parts = { 1: {}, 2: {}, 3: {} };
for (const [k, v] of Object.entries(TRANSLATIONS)) {
  const slug = k.split("/")[0];
  const pn = partOf(slug);
  if (pn) parts[pn][k] = v;
}

for (const pn of [1, 2, 3]) {
  const handPath = path.join(__dirname, `siman454-part${pn}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  Object.assign(hand, parts[pn]);
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
  console.log(`merged part${pn}:`, Object.keys(parts[pn]).length, "total", Object.keys(hand).length);
}
