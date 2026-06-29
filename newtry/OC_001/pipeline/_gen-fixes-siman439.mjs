#!/usr/bin/env node
/** Build _fixes-siman439.mjs from _hand-en-439.mjs + cite helper */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { HAND439 } from "./_hand-en-439.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SLUGS = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
  "beur-hagra",
  "chok-yaakov",
  "chokhmat-shlomo",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "peri-megadim",
  "ateret-zekenim",
  "rabbi-akiva-eiger",
  "yad-ephraim",
];

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_439/${slug}/part-001.txt`;
}

const fixes = {};
const missing = [];
for (const slug of SLUGS) {
  const file = rel(slug);
  const abs = path.join(ROOT, file.replace(/\//g, path.sep));
  if (!fs.existsSync(abs)) {
    console.warn("SKIP", file);
    continue;
  }
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  fixes[file] = {};
  for (const b of blocks) {
    const k = keyFor(b);
    const hk = `${slug}/${k}`;
    if (HAND439[hk]) {
      fixes[file][k] = HAND439[hk];
    } else {
      missing.push(hk);
    }
  }
}

const outPath = path.join(__dirname, "_fixes-siman439.mjs");
fs.writeFileSync(
  outPath,
  `/** Auto-generated — siman 439 (mouse / loaves bedika) */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
);
let total = 0;
for (const f of Object.values(fixes)) total += Object.keys(f).length;
console.log(`Wrote ${outPath}, keys ${total}, missing ${missing.length}`);
if (missing.length) console.log(missing.join("\n"));
