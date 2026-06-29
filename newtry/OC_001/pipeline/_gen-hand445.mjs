#!/usr/bin/env node
/** Generate _hand-en-445.json: sanitize ok + merge manual RETRANSLATE */
import fs from "fs";
import { RETRANSLATE } from "./_hand-en-445-retranslate.mjs";

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bHagah:\s*/gi, "{Rama: ")
    .replace(/\bHagah:\s*/gi, "{Rama: ")
    .replace(/\bIsraelite(s?)\b/g, "Jew$1")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/\bעכו"ם\b/g, "non-Jew")
    .replace(/\bעכו״ם\b/g, "non-Jew")
    .replace(/&quot;/g, '"')
    .replace(/\bone paragraph\b/g, "1 seif")
    .replace(/\bnon-Jewish\b/g, "non-Jew")
    .trim();
}

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /U\.S\./, /\bChametz\b/, /\bhametz\b/,
  /Holy See/i, /Tel Aviv/i, /al-Qaqah/i, /\bUN\b/i, /IDF/i, /Abuka/i, /Dafran/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

const exported = JSON.parse(fs.readFileSync("pipeline/he445-export.json", "utf8"));
const out = {};
for (const [k, v] of Object.entries(exported)) {
  if (RETRANSLATE[k]) {
    out[k] = RETRANSLATE[k];
  } else {
    const cur = v.en || "";
    const en = sanitizeEn(cur);
    if (isBad(en)) {
      console.error("STILL BAD after sanitize:", k);
    }
    out[k] = en;
  }
}
fs.writeFileSync("pipeline/_hand-en-445.json", JSON.stringify(out, null, 2) + "\n");
console.log("keys", Object.keys(out).length);
