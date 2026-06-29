#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite440 } from "./lib/translate-cite-440.mjs";

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
const PART2 = [
  "beur-hagra",
  "biur-halacha",
  "chok-yaakov",
  "chokhmat-shlomo",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "peri-megadim",
  "ateret-zekenim",
  "chatam-sofer",
  "rabbi-akiva-eiger",
  "yad-ephraim",
  "shaarei-teshuvah",
  "netiv-chayim",
  "levushei-serad",
];

function loadHand() {
  const hand = {};
  for (const f of ["siman440-part1.json", "siman440-part2.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_440/${slug}/part-001.txt`;
}

function buildPart(slugs, partNum, hand) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    const file = rel(slug);
    const abs = path.join(ROOT, file.replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) continue;
    const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
    fixes[file] = {};
    for (const b of blocks) {
      const k = keyFor(b);
      const hk = `${slug}/${k}`;
      let en = hand[hk];
      if (!en && slug === "beer-hagolah") en = translateCite440(b.he);
      if (!en) missing.push(hk);
      else fixes[file][k] = en;
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman440-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 440 part ${partNum} — non-Jew's chametz deposited */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  return { fixes, missing };
}

const hand = loadHand();
const r1 = buildPart(PART1, 1, hand);
const r2 = buildPart(PART2, 2, hand);
let n = 0;
for (const f of Object.values(r1.fixes)) n += Object.keys(f).length;
for (const f of Object.values(r2.fixes)) n += Object.keys(f).length;
console.log("HAND_KEYS", Object.keys(hand).length);
console.log("FIXED", n);
console.log("MISSING", r1.missing.length + r2.missing.length);
if (r1.missing.length) console.log("MISSING_P1", r1.missing.join(", "));
if (r2.missing.length) console.log("MISSING_P2", r2.missing.join(", "));
