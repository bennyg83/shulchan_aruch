#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exported = JSON.parse(fs.readFileSync(path.join(__dirname, "he447-export.json"), "utf8"));

const PARTS = {
  1: [
    "mechaber",
    "mishnah-berurah",
    "machatzit-hashekel",
    "magen-avraham",
    "turei-zahav",
    "beer-hagolah",
    "baer-heitev",
  ],
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

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

for (const [pn, slugs] of Object.entries(PARTS)) {
  const set = new Set(slugs);
  const outPath = path.join(__dirname, `siman447-part${pn}.json`);
  const out = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf8")) : {};
  let good = 0;
  for (const [hk, v] of Object.entries(exported)) {
    if (!set.has(hk.split("/")[0])) continue;
    if (hk.startsWith("mechaber/") || hk.startsWith("beer-hagolah/")) continue;
    if (!isBadMt447(v.en)) {
      out[hk] = sanitizeEn(v.en);
      good++;
    }
  }
  const p = path.join(__dirname, `siman447-part${pn}.json`);
  fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n");
  console.log(`part${pn} seeded ${good} good -> ${p}`);
}
