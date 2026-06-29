#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt454.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he454-export.json"), "utf8"));

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

function partOf(slug) {
  if (PART1.includes(slug)) return 1;
  if (PART2.includes(slug)) return 2;
  if (PART3.includes(slug)) return 3;
  return 0;
}

const parts = { 1: {}, 2: {}, 3: {} };
let seeded = 0;
let need = 0;

for (const [k, v] of Object.entries(exp)) {
  const slug = k.split("/")[0];
  const pn = partOf(slug);
  if (!pn) continue;
  let en = v.en || "";
  if (isBad(en)) {
    const s = sanitizeEn(en);
    if (!isBad(s)) {
      parts[pn][k] = s;
      seeded++;
      continue;
    }
    need++;
    continue;
  }
  parts[pn][k] = sanitizeEn(en);
  seeded++;
}

for (const pn of [1, 2, 3]) {
  const p = path.join(__dirname, `siman454-part${pn}.json`);
  fs.writeFileSync(p, JSON.stringify(parts[pn], null, 2) + "\n");
  console.log(`siman454-part${pn}.json`, Object.keys(parts[pn]).length);
}
console.log("seeded", seeded, "need_translate", need);
