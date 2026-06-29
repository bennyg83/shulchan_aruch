#!/usr/bin/env node
import fs from "fs";

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /U\.S\./, /\bChametz\b/, /\bhametz\b/,
  /Holy See/i, /Tel Aviv/i, /al-Qaqah/i, /\bUN\b/i, /IDF/i, /Abuka/i, /Dafran/i,
  /gambler/i, /Dr\. D/i, /Delave/i, /oxygen of criminal/i, /Pre-Trial/i, /Israelite/i,
  /Shield of Abraham/i, /Saturday/i, /hand recoils/i, /first dish/i, /allocated/i,
];

const j = JSON.parse(fs.readFileSync("pipeline/he445-export.json", "utf8"));
const need = [];
const ok = [];
for (const [k, v] of Object.entries(j)) {
  const en = (v.en || "").trim();
  const bad =
    !en ||
    BAD.some((r) => r.test(en)) ||
    (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en));
  if (bad) need.push(k);
  else ok.push(k);
}
console.log("need", need.length, "ok", ok.length);
console.log("NEED:\n" + need.join("\n"));
fs.writeFileSync("pipeline/_445-need-keys.txt", need.join("\n"));
