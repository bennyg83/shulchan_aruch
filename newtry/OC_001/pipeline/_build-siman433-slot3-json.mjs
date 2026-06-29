#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { EN_MACH } from "./_en433-machatzit.mjs";
import { EN_PART2 } from "./_en433-part2.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PART1_KEYS = [
  "machatzit-hashekel/1:_",
  "machatzit-hashekel/2:_",
  "machatzit-hashekel/3:א",
  "machatzit-hashekel/3:ב",
  "machatzit-hashekel/3:ג",
  "machatzit-hashekel/4:_",
  "machatzit-hashekel/5:א",
  "machatzit-hashekel/5:ב",
  "machatzit-hashekel/6:_",
  "machatzit-hashekel/8:_",
  "machatzit-hashekel/9:א",
  "machatzit-hashekel/9:ב",
  "machatzit-hashekel/9:ג",
  "machatzit-hashekel/10:א",
  "machatzit-hashekel/10:ב",
  "machatzit-hashekel/10:ג",
  "machatzit-hashekel/10:ד",
  "machatzit-hashekel/10:ה",
  "machatzit-hashekel/10:ו",
  "machatzit-hashekel/10:ז",
  "machatzit-hashekel/11:_",
];

const PART2_KEYS = Object.keys(EN_PART2);

function pick(keys, src) {
  const out = {};
  const missing = [];
  for (const k of keys) {
    if (src[k]) out[k] = src[k];
    else missing.push(k);
  }
  return { out, missing };
}

const m1 = pick(PART1_KEYS, EN_MACH);
const m2 = pick(PART2_KEYS, EN_PART2);

if (m1.missing.length) {
  console.error("PART1 missing:", m1.missing);
  process.exit(1);
}
if (m2.missing.length) {
  console.error("PART2 missing:", m2.missing);
  process.exit(1);
}

fs.writeFileSync(
  path.join(__dirname, "siman433-machatzit.json"),
  JSON.stringify(m1.out, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(__dirname, "siman433-part2.json"),
  JSON.stringify(m2.out, null, 2) + "\n"
);

console.log(
  "machatzit",
  Object.keys(m1.out).length,
  "part2",
  Object.keys(m2.out).length,
  "total",
  Object.keys(m1.out).length + Object.keys(m2.out).length
);
