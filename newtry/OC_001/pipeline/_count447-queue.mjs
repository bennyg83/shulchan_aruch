#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exported = JSON.parse(fs.readFileSync(path.join(__dirname, "he447-export.json"), "utf8"));
const PARTS = {
  1: ["mishnah-berurah", "machatzit-hashekel", "magen-avraham", "turei-zahav", "baer-heitev"],
  2: ["chok-yaakov", "beur-hagra", "peri-megadim"],
  3: [
    "biur-halacha",
    "ateret-zekenim",
    "chatam-sofer",
    "dagul-merevavah",
    "eliyah-rabbah",
    "eshel-avraham",
    "kaf-hachayyim",
    "netiv-chayim",
    "rabbi-akiva-eiger",
    "shaarei-teshuvah",
    "yad-ephraim",
    "chokhmat-shlomo",
  ],
};
const BAD = [/pending/i,/Hashem/i,/\bHametz\b/,/\bChametz\b/,/Rema:\s*Rema:/i,/Gloss-/i,/Reichah/i,/&quot;/,/leaven/i,/chometz/i,/\bYom tov\b/i];
function isBad(en) {
  if (!en?.trim()) return true;
  return BAD.some((re) => re.test(en));
}
for (const [pn, slugs] of Object.entries(PARTS)) {
  const hand = JSON.parse(fs.readFileSync(path.join(__dirname, `siman447-part${pn}.json`), "utf8"));
  let need = 0;
  for (const [hk, v] of Object.entries(exported)) {
    if (!slugs.includes(hk.split("/")[0])) continue;
    if (!hand[hk] || isBad(hand[hk])) need++;
  }
  console.log("part", pn, "need translate", need);
}
