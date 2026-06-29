#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = Number(process.argv[2]);
const exported = JSON.parse(fs.readFileSync(path.join(__dirname, "he447-export.json"), "utf8"));
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, `siman447-part${part}.json`), "utf8"));

const PART_SLUGS = {
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

const BAD = [
  /pending/i,
  /Lord'?s Prayer/i,
  /Hashem/i,
  /Bible says/i,
  /\bIDF\b/i,
  /\bHametz\b/,
  /\bChametz\b/,
  /Rema:\s*Rema:/i,
  /Gloss-/i,
  /Reichah Milsah/i,
  /chometz/i,
  /\bleaven\b/i,
  /\bYom tov\b/,
];
function isBad(en) {
  if (!en?.trim()) return true;
  return BAD.some((re) => re.test(en));
}

const slugs = new Set(PART_SLUGS[part]);
const items = [];
for (const [hk, v] of Object.entries(exported)) {
  if (!slugs.has(hk.split("/")[0])) continue;
  if (hand[hk] && !isBad(hand[hk])) continue;
  items.push({ key: hk, he: plainFromHtml(v.he) });
}
const out = path.join(__dirname, `he447-missing-p${part}.json`);
fs.writeFileSync(out, JSON.stringify(items, null, 2) + "\n");
console.log("wrote", items.length, "->", out);
