#!/usr/bin/env node
/** Build siman450-part{1,2}.json from he450-export + hand translations + cite450 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translateCite450 } from "./lib/translate-cite-450.mjs";
import { HAND_P1 } from "./siman450-en-part1.mjs";
import { HAND_P2 } from "./siman450-en-part2.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "he450-export.json");

const PART1_SLUGS = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];
const PART2_SLUGS = [
  "ateret-zekenim",
  "beur-hagra",
  "biur-halacha",
  "chatam-sofer",
  "chok-yaakov",
  "chokhmat-shlomo",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "peri-megadim",
  "rabbi-akiva-eiger",
  "yad-ephraim",
];

const PREFLIGHT = [
  /Lord'?s Prayer/i,
  /Hashem/i,
  /\bHametz\b/i,
  /Rema:\s*Rema/i,
  /\ban Jew\b/i,
  /\bIsraelite/i,
  /\bgentile\b/i,
  /\bGentile\b/i,
  /\bLeavened\b/i,
  /\bnon-Jewish\b/i,
  /\bthere in the\b/i,
];

function slugOf(k) {
  return k.split("/")[0];
}

function pickHand(k) {
  const slug = slugOf(k);
  if (PART1_SLUGS.includes(slug)) return HAND_P1[k];
  if (PART2_SLUGS.includes(slug)) return HAND_P2[k];
  return undefined;
}

function resolveEn(k, he) {
  if (slugOf(k) === "beer-hagolah") return translateCite450(he);
  const hand = pickHand(k);
  if (!hand) throw new Error(`Missing translation: ${k}`);
  for (const r of PREFLIGHT) {
    if (r.test(hand)) throw new Error(`Preflight ${r} in ${k}`);
  }
  return hand;
}

const src = JSON.parse(fs.readFileSync(SRC, "utf8"));
const p1 = {};
const p2 = {};
for (const k of Object.keys(src).sort()) {
  const en = resolveEn(k, src[k].he);
  if (PART1_SLUGS.includes(slugOf(k))) p1[k] = en;
  else if (PART2_SLUGS.includes(slugOf(k))) p2[k] = en;
}

fs.writeFileSync(path.join(__dirname, "siman450-part1.json"), JSON.stringify(p1, null, 2) + "\n");
fs.writeFileSync(path.join(__dirname, "siman450-part2.json"), JSON.stringify(p2, null, 2) + "\n");
console.log("part1", Object.keys(p1).length);
console.log("part2", Object.keys(p2).length);
console.log("total", Object.keys(p1).length + Object.keys(p2).length);
