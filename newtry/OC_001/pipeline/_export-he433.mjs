#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PART1_MACH = [
  ["machatzit-hashekel", "1", "_"],
  ["machatzit-hashekel", "2", "_"],
  ["machatzit-hashekel", "3", "א"],
  ["machatzit-hashekel", "3", "ב"],
  ["machatzit-hashekel", "3", "ג"],
  ["machatzit-hashekel", "4", "_"],
  ["machatzit-hashekel", "5", "א"],
  ["machatzit-hashekel", "5", "ב"],
  ["machatzit-hashekel", "6", "_"],
  ["machatzit-hashekel", "8", "_"],
  ["machatzit-hashekel", "9", "א"],
  ["machatzit-hashekel", "9", "ב"],
  ["machatzit-hashekel", "9", "ג"],
  ["machatzit-hashekel", "10", "א"],
  ["machatzit-hashekel", "10", "ב"],
  ["machatzit-hashekel", "10", "ג"],
  ["machatzit-hashekel", "10", "ד"],
  ["machatzit-hashekel", "10", "ה"],
  ["machatzit-hashekel", "10", "ו"],
  ["machatzit-hashekel", "10", "ז"],
  ["machatzit-hashekel", "11", "_"],
];

const PART2 = {
  "beur-hagra": [
    ["1", "א"],
    ["1", "ב"],
    ["2", "א"],
    ["2", "ב"],
    ["2", "ג"],
    ["3", "א"],
    ["3", "ב"],
    ["3", "ג"],
    ["3", "ד"],
    ["5", "א"],
    ["5", "ב"],
    ["6", "א"],
    ["6", "ב"],
    ["6", "ג"],
    ["7", "א"],
    ["7", "ב"],
    ["9", "_"],
    ["10", "_"],
    ["11", "א"],
    ["11", "ב"],
    ["11", "ג"],
    ["11", "ד"],
  ],
  "biur-halacha": [
    ["8", "_"],
    ["9", "_"],
  ],
  "chok-yaakov": "all",
  "eliyah-rabbah": "all",
  "kaf-hachayyim": "all",
  "peri-megadim": "all",
  "eshel-avraham": [
    ["1", "_"],
    ["2", "א"],
    ["2", "ב"],
    ["7", "א"],
    ["7", "ב"],
    ["8", "א"],
    ["8", "ב"],
  ],
  "levushei-serad": [
    ["1", "_"],
    ["2", "_"],
  ],
  "shaarei-teshuvah": [
    ["1", "_"],
    ["2", "_"],
  ],
  "yad-ephraim": [
    ["1", "_"],
    ["2", "_"],
    ["3", "_"],
    ["4", "_"],
    ["5", "_"],
  ],
  "ateret-zekenim": [
    ["1", "א"],
    ["1", "ב"],
    ["3", "א"],
    ["3", "ב"],
    ["4", "א"],
    ["4", "ב"],
    ["7", "_"],
    ["8", "_"],
  ],
};

function getBlocks(slug) {
  const fp = path.join(ROOT, "output/siman_433", slug, "part-001.txt");
  return parseBlocksInFile(fs.readFileSync(fp, "utf8"));
}

function findBlock(blocks, seif, marker) {
  const m = marker || "_";
  return blocks.find(
    (b) => String(b.seif) === String(seif) && (b.marker || "_") === m
  );
}

const out = {};
for (const [slug, seif, m] of PART1_MACH) {
  const b = findBlock(getBlocks(slug), seif, m);
  const k = `${slug}/${seif}:${m}`;
  out[k] = b ? b.he : "MISSING";
}
for (const [slug, spec] of Object.entries(PART2)) {
  const blocks = getBlocks(slug);
  const keys = spec === "all" ? blocks.map((b) => [b.seif, b.marker || "_"]) : spec;
  for (const [seif, m] of keys) {
    const b = findBlock(blocks, seif, m);
    const k = `${slug}/${seif}:${m || "_"}`;
    out[k] = b ? b.he : "MISSING";
  }
}
const outPath = path.join(__dirname, "_he433-export.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("KEYS", Object.keys(out).length);
const missing = Object.entries(out).filter(([, v]) => v === "MISSING");
if (missing.length) console.log("MISSING", missing.map(([k]) => k).join(", "));
