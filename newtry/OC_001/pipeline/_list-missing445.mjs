#!/usr/bin/env node
import fs from "fs";
import { translateCite433 } from "./lib/translate-cite-433.mjs";

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /U\.S\./, /PLO|UN in Cologne|KGB/i,
  /T-shirt/i, /Dr\. D/i, /Delave|Delolla/i, /Saturday/i, /hand recoils/i,
  /first dish/i, /allocated/i, /Shield of Abraham/i, /her age/i, /the craft/i,
  /Darbanan/i, /Israelite/i, /Chametz/i, /hametz/i, /Qur'an/i, /Colosse/i,
  /guerna/i, /Wayne/i, /gambler/i, /Spike Darin/i, /oxygen of criminal/i,
  /Mount Wayne/i, /cliche/i, /fee that has found/i, /Pre-Trial/i, /IDF/i, /Gaza/i,
  /Tel Aviv/i, /Afrikan/i, /P\.A\./i, /Judean/i, /Ferrero/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bIsraelite(s?)\b/g, "Jew$1")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/&quot;/g, '"')
    .replace(/\bone paragraph\b/g, "1 seif")
    .trim();
}

const exported = JSON.parse(fs.readFileSync("pipeline/he445-export.json", "utf8"));
const missing = [];
let ok = 0;
for (const [k, v] of Object.entries(exported)) {
  const slug = k.split("/")[0];
  let en = null;
  if (slug === "beer-hagolah" && isBad(v.en)) en = translateCite433(v.he);
  if (!en && !isBad(v.en)) en = sanitizeEn(v.en);
  if (en) ok++;
  else missing.push(k);
}
console.log("OK", ok, "MISSING", missing.length);
missing.forEach((k) => console.log(k));
