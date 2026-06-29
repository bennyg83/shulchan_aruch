#!/usr/bin/env node
/** Restore siman447-part3.json: seed good MT + patches + hand447 chunks. */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "siman447-part3.json");
const exported = JSON.parse(
  fs.readFileSync(path.join(__dirname, "he447-export.json"), "utf8")
);
const SLUGS = new Set([
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
]);

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

const hand = {};
for (const [hk, v] of Object.entries(exported)) {
  if (!SLUGS.has(hk.split("/")[0])) continue;
  const en = sanitizeEn(v.en || "");
  if (!isBadMt447(en)) hand[hk] = en;
}

for (const p of ["a", "b", "c", "d"]) {
  const patch = path.join(__dirname, `siman447-part3-patch-${p}.json`);
  if (fs.existsSync(patch)) Object.assign(hand, JSON.parse(fs.readFileSync(patch, "utf8")));
}

for (const chunk of [
  "hand447-p3-chunk.mjs",
  "hand447-p3-rest.mjs",
  "hand447-p3-missing.mjs",
]) {
  const mod = await import(pathToFileURL(path.join(__dirname, chunk)).href);
  Object.assign(hand, mod.HAND || {});
}

if (hand["rabbi-akiva-eiger/3:_"]) {
  hand["rabbi-akiva-eiger/3:_"] = hand["rabbi-akiva-eiger/3:_"].replace(
    /\bleavened\b/g,
    "had become chametz"
  );
}

fs.writeFileSync(outPath, JSON.stringify(hand, null, 2) + "\n");
console.log("restored part3 keys", Object.keys(hand).length);
