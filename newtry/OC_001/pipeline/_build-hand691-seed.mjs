#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { partOf } from "./_analyze-bad-mt691.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he691-export.json"), "utf8"));
const handPath = path.join(__dirname, "_hand-en-691.json");
const handJson = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};
const mech = await import(pathToFileURL(path.join(__dirname, "mech691-en.mjs")).href);

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
    .replace(/\bcauldron\b/gi, "kettle")
    .trim();
}

const parts = { 1: {}, 2: {}, 3: {} };
for (const [k, en] of Object.entries(mech.t || {})) {
  const hk = `mechaber/${k}`;
  const pn = partOf("mechaber");
  if (pn) parts[pn][hk] = en;
}
let fromHand = 0,
  fromSanitize = 0,
  need = 0;
for (const [k, v] of Object.entries(exp)) {
  const pn = partOf(k.split("/")[0]);
  if (!pn) continue;
  if (handJson[k]) {
    parts[pn][k] = handJson[k];
    fromHand++;
    continue;
  }
  let en = v.en || "";
  if (isBad(en)) {
    const s = sanitizeEn(en);
    if (!isBad(s)) {
      parts[pn][k] = s;
      fromSanitize++;
      continue;
    }
    need++;
    continue;
  }
  parts[pn][k] = sanitizeEn(en);
  fromSanitize++;
}
for (const pn of [1, 2, 3]) {
  const out = path.join(__dirname, `siman691-part${pn}.json`);
  fs.writeFileSync(out, JSON.stringify(parts[pn], null, 2) + "\n");
  console.log(`siman691-part${pn}.json`, Object.keys(parts[pn]).length);
}
console.log("fromHand", fromHand, "fromSanitize", fromSanitize, "still need", need);
