#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { partOf } from "./_analyze-bad-mt453.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he453-export.json"), "utf8"));

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bhametz\b/gi, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven(ing|ed|s)?\b/gi, (m) => m.replace(/leaven/i, "chametz"))
    .replace(/&quot;/g, '"')
    .replace(/\bkitniyiot\b/gi, "kitniyot")
    .trim();
}

const parts = { 1: {}, 2: {}, 3: {} };
let seeded = 0;
let need = 0;

for (const [k, v] of Object.entries(exp)) {
  const pn = partOf(k.split("/")[0]);
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
  const p = path.join(__dirname, `siman453-part${pn}.json`);
  fs.writeFileSync(p, JSON.stringify(parts[pn], null, 2) + "\n");
  console.log(`siman453-part${pn}.json`, Object.keys(parts[pn]).length);
}
console.log("seeded", seeded, "still need translation", need);
