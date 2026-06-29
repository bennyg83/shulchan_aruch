#!/usr/bin/env node
/** Export siman 153 blocks: pass bad_mt but match garbled heuristics → work/hand153-garbled.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

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
  /\bPanad\b/i,
  /\bEkal\b/i,
  /\bAkal\b/i,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const base = path.join(ROOT, "output", "siman_153");
const outPath = path.join(__dirname, "work", "hand153-garbled.json");

const items = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    const rel = `${slug}/${f}`;
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      const en = b.en || "";
      if (isBadMt447(en)) continue;
      const patterns = GARBLED.filter((re) => re.test(en)).map((r) => r.source);
      if (!patterns.length) continue;
      const key = `${b.seif}:${b.marker || "_"}`;
      items.push({
        rel,
        key,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker || "_",
        patterns,
        he: b.he,
        hePlain: plainFromHtml(b.he),
        en,
      });
    }
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ siman: 153, count: items.length, items }, null, 2) + "\n");
console.log(`extracted ${items.length} garbled -> ${outPath}`);
