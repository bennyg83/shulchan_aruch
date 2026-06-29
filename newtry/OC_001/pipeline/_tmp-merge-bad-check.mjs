#!/usr/bin/env node
import fs from "fs";

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /U\.S\./, /\bChametz\b/, /\bhametz\b/,
  /Qur'an/i, /Colosse/i, /guerna/i, /Wayne/i, /gambler/i, /Spike Darin/i,
  /oxygen of criminal/i, /Mount Wayne/i, /cliche/i, /fee that has found/i, /Pre-Trial/i,
  /Israelite/i, /Shield of Abraham/i, /Saturday/i, /hand recoils/i, /first dish/i,
  /allocated/i, /Darbanan/i, /al-Qaqah/i, /\bUN\b/i, /IDF/i, /Holy See/i, /Abuka/i,
  /Dafran/i, /Delave/i, /Dr\. D/i, /Afrikan/i, /Efthan/i, /platitude/i, /Ferrero/i,
  /Berlin/i, /CAT at/i, /Dao Dao/i, /Affith/i, /buffer graph/i, /buffer against/i,
  /skin was/i, /coals\. Dr/i, /It is called/i, /The Gifts of Chapter/i, /The Rambam in the Bible/i,
  /It's called/i, /Bible and as/i, /called "A"/i, /called "D/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bHagah:\s*/gi, "{Rama: ")
    .replace(/\bIsraelite(s?)\b/g, "Jew$1")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

const j = JSON.parse(fs.readFileSync("pipeline/he445-export.json", "utf8"));
const bad = [];
for (const [k, v] of Object.entries(j)) {
  if (isBad(sanitizeEn(v.en || ""))) bad.push(k);
}
console.log("bad after sanitize:", bad.length);
console.log(bad.join("\n"));
