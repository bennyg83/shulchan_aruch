#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite433 } from "./lib/translate-cite-433.mjs";

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
  "eliyah-rabbah",
  "kaf-hachayyim",
  "peri-megadim",
  "chokhmat-shlomo",
  "chatam-sofer",
  "eshel-avraham",
  "levushei-serad",
  "netiv-chayim",
  "shaarei-teshuvah",
  "yad-ephraim",
  "ateret-zekenim",
  "rabbi-akiva-eiger",
];

function loadHand() {
  const hand = {};
  for (const f of fs.readdirSync(__dirname)) {
    if (f.startsWith("siman433-") && f.endsWith(".json")) {
      Object.assign(hand, JSON.parse(fs.readFileSync(path.join(__dirname, f), "utf8")));
    }
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_433/${slug}/part-001.txt`;
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
      if (!en && slug === "beer-hagolah") en = translateCite433(b.he);
      if (!en) missing.push(hk);
      else fixes[file][k] = en;
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman433-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 433 part ${partNum} — bedikat chametz */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
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
