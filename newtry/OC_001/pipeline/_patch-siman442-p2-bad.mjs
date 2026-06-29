#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { hand442P2Bad } from "./_hand-en-442-p2-bad-blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, "siman442-part2.json");
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const BAD = /Lord's Prayer|Capernaum|Hashem's Word|Hashem’s Word/i;
let patched = 0;
for (const [k, v] of Object.entries(hand442P2Bad)) {
  if (!(k in data)) {
    console.warn(`[warn] key missing: ${k}`);
    continue;
  }
  if (BAD.test(data[k])) patched++;
  data[k] = v;
}
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
console.log(`[patch] updated ${Object.keys(hand442P2Bad).length} keys (${patched} replaced bad machine text)`);
