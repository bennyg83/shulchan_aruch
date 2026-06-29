#!/usr/bin/env node
/** Build _fixes-siman433-part{1,2}.mjs from siman433-hand-en.json + cite helper */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite433 } from "./lib/translate-cite-433.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HAND_PATH = path.join(__dirname, "siman433-hand-en.json");

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

const hand = JSON.parse(fs.readFileSync(HAND_PATH, "utf8"));

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_433/${slug}/part-001.txt`;
}

function buildPart(slugs, partNum) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    const file = rel(slug);
    const abs = path.join(ROOT, file.replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) {
      console.warn("SKIP missing file", file);
      continue;
    }
    const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
    fixes[file] = {};
    for (const b of blocks) {
      const k = keyFor(b);
      const hk = `${slug}/${k}`;
      if (hand[hk]) {
        fixes[file][k] = hand[hk];
      } else if (slug === "beer-hagolah") {
        fixes[file][k] = translateCite433(b.he);
      } else {
        missing.push(hk);
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman433-part${partNum}.mjs`);
  const body =
    `/** Auto-generated from siman433-hand-en.json — siman 433 part ${partNum} */\n` +
    `export const fixes = ${JSON.stringify(fixes, null, 2)};\n`;
  fs.writeFileSync(outPath, body);
  console.log(`Wrote ${outPath}, missing hand keys: ${missing.length}`);
  if (missing.length) console.log(missing.slice(0, 20).join("\n"));
  return { fixes, missing };
}

const r1 = buildPart(PART1, 1);
const r2 = buildPart(PART2, 2);
let total = 0;
for (const f of Object.values(r1.fixes)) total += Object.keys(f).length;
for (const f of Object.values(r2.fixes)) total += Object.keys(f).length;
console.log("TOTAL_KEYS", total, "MISSING", r1.missing.length + r2.missing.length);
