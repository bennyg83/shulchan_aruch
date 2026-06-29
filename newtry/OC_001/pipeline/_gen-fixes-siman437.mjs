#!/usr/bin/env node
/** Build _fixes-siman437-part{1,2}.mjs from _hand-en-437.mjs + cite helper */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { HAND437 } from "./_hand-en-437.mjs";

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
];

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_437/${slug}/part-001.txt`;
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
      if (HAND437[hk]) {
        fixes[file][k] = HAND437[hk];
      } else {
        missing.push(hk);
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman437-part${partNum}.mjs`);
  const body =
    `/** Auto-generated — siman 437 part ${partNum} (rental / bedikat chametz) */\n` +
    `export const fixes = ${JSON.stringify(fixes, null, 2)};\n`;
  fs.writeFileSync(outPath, body);
  console.log(`Wrote ${outPath}, missing: ${missing.length}`);
  if (missing.length) console.log(missing.join("\n"));
  return { fixes, missing };
}

const r1 = buildPart(PART1, 1);
const r2 = buildPart(PART2, 2);
let total = 0;
for (const f of Object.values(r1.fixes)) total += Object.keys(f).length;
for (const f of Object.values(r2.fixes)) total += Object.keys(f).length;
console.log("TOTAL_KEYS", total, "MISSING", r1.missing.length + r2.missing.length);
