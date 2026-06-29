#!/usr/bin/env node
/** Merge siman451-part{1,2,3}.json + cite + mechaber → _fixes-siman451-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite451 } from "./lib/translate-cite-451.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PART1 = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];
const PART2 = ["chok-yaakov", "beur-hagra", "peri-megadim"];
const PART3 = [
  "biur-halacha",
  "ateret-zekenim",
  "chatam-sofer",
  "dagul-merevavah",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "rabbi-akiva-eiger",
  "shaarei-teshuvah",
  "yad-ephraim",
  "chokhmat-shlomo",
];

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/gi, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

const MECHABER = {
  "mechaber/5:main":
    "There are those who permit renting his oven to a non-Jew on condition that he bake matzah in it; and if he bakes chametz in it, one is not concerned. {Rama: And likewise it is permitted to rent him a house to dwell in, even though he may later bring chametz into it. (Agur)}",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman451-part1.json", "siman451-part2.json", "siman451-part3.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, `output/siman_451/${slug}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => `output/siman_451/${slug}/${f}`);
}

function buildPart(slugs, partNum, hand) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    for (const file of listPartFiles(slug)) {
      const abs = path.join(ROOT, file.replace(/\//g, path.sep));
      const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
      fixes[file] = fixes[file] || {};
      for (const b of blocks) {
        const k = keyFor(b);
        const hk = `${slug}/${k}`;
        let en = hand[hk];
        if (!en && slug === "beer-hagolah") en = translateCite451(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman451-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 451 part ${partNum} — hagalas kelim */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  return { fixes, missing };
}

const hand = loadHand();
const r1 = buildPart(PART1, 1, hand);
const r2 = buildPart(PART2, 2, hand);
const r3 = buildPart(PART3, 3, hand);
let n = 0;
for (const f of [r1, r2, r3]) {
  for (const x of Object.values(f.fixes)) n += Object.keys(x).length;
}
console.log("HAND_KEYS", Object.keys(hand).length);
console.log("FIXED", n);
const miss = r1.missing.length + r2.missing.length + r3.missing.length;
console.log("MISSING", miss);
if (r1.missing.length)
  console.log("MISSING_P1", r1.missing.length, r1.missing.slice(0, 20).join(", "));
if (r2.missing.length)
  console.log("MISSING_P2", r2.missing.length, r2.missing.slice(0, 20).join(", "));
if (r3.missing.length)
  console.log("MISSING_P3", r3.missing.length, r3.missing.slice(0, 20).join(", "));
