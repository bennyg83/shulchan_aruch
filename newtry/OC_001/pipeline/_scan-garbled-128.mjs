#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const GARBLED = [
  /\bDam[a-z]{2,}/i,
  /\bAAG\b/,
  /\bDoh'\b/,
  /\bKai\b.*\bKai\b/,
  /\bM\. A\. Sec\b/,
  /\bSkala\b/i,
  /\bDamh/i,
  /\bRiu\b/,
  /\bDuff\b/,
  /\bDeshani\b/,
  /\bDabarcha\b/,
  /\bMbadilin\b/,
  /\bMadlikin\b/,
  /\[hand\]/i,
  /\bthe Omnipresent demanded\b/i,
  /\bar's milk\b/i,
  /\bcreamed her face\b/i,
  /\bMaga\b/i,
  /\bKSHAL\b/i,
  /\bDamgila\b/i,
  /\bDomter\b/i,
  /\bAmash\b/i,
  /\bDakohen\b/i,
  /\bDaorita\b/i,
  /\bDSL\b/,
  /\bDeobar\b/i,
  /\bSKIA\b/,
  /\bDavnach\b/i,
  /\bSqm\b/i,
  /\bDamari\b/i,
];

const base = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", "siman_128");
let n = 0;
const hits = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      if (GARBLED.some((re) => re.test(b.en || ""))) {
        n++;
        hits.push(`${slug}/${f} ${b.seif}:${b.marker || "_"}`);
      }
    }
  }
}
console.log(`garbled count: ${n}`);
console.log(hits.join("\n"));
