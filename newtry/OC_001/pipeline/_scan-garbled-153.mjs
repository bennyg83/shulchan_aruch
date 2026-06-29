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
  /\bMagan\b/i,
  /\bBhak\b/i,
  /\bKhanas\b/i,
  /\bBehkenas\b/i,
  /\bPanad\b/i,
  /\bKmash\b/i,
  /\bKSHAL\b/i,
  /\bDamgila\b/i,
  /\bDomter\b/i,
  /\bDamari\b/i,
  /\bAmash\b/i,
  /\bAmshal\b/i,
  /\bDakohen\b/i,
  /\bDaorita\b/i,
  /\bMashak\b/i,
  /\bDSL\b/,
  /\bDeobar\b/i,
  /\bSKIA\b/,
  /\bIdna\b/,
  /\bSqm\b/i,
  /\bDavnach\b/i,
  /\bDahmer\b/i,
  /\bDamksha\b/i,
  /\bDamastama\b/i,
  /\bDamakrin\b/i,
  /\bDambarach\b/i,
  /\bDamhoyev\b/i,
  /\bDamhiksha\b/i,
  /\bDamharim\b/i,
  /\bDamked\b/i,
  /\bDamnam\b/i,
  /\bDammetinan\b/i,
  /\bDamshash\b/i,
  /\bDamshide\b/i,
  /\bDam Mor\b/i,
  /\bDam Amor\b/i,
  /\bDam Rabbi\b/i,
  /\bDam Cohen\b/i,
  /\bDam Dela\b/i,
  /\bDam P\./i,
  /\bDam there\b/i,
  /\bDam said\b/i,
  /\bMaja\b/i,
  /\bBhakchi\b/i,
  /\bBhakti\b/i,
  /\bBhakhanas\b/i,
  /\bBhakhon\b/i,
  /\bBHC\b/,
  /\bHumshin\b/i,
  /\bChomshin\b/i,
  /\bMkash\b/i,
  /\bTaffi\b/i,
  /\bNami Kashya\b/i,
  /\bDhamkshan\b/i,
  /\bDhamrodchi\b/i,
  /\bDahidhid\b/i,
  /\bBahchan\b/i,
  /\bHaKanas\b/i,
  /\bKushit\b/i,
  /\bPanad\b/i,
  /\bLakmia\b/i,
  /\bDAMA\b/,
  /\bIbra\b/i,
  /\bDLPZ\b/,
  /\bDebandah\b/i,
  /\bZATA\b/,
  /\bIfka\b/i,
  /\bDabsudar\b/i,
  /\bMashsh\b/i,
  /\bDam, he\b/i,
  /\bDam, he built\b/i,
];

const UNIQUE = [...new Set(GARBLED.map((r) => r.source))].map(
  (s) => new RegExp(s, GARBLED.find((r) => r.source === s)?.flags || "i")
);

const base = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", "siman_153");
let n = 0;
const hits = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      const pats = UNIQUE.filter((re) => re.test(b.en || ""));
      if (pats.length) {
        n++;
        hits.push(`${slug}/${f} ${b.seif}:${b.marker || "_"}`);
      }
    }
  }
}
console.log(`garbled count: ${n}`);
console.log(hits.join("\n"));
