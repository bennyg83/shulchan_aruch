#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

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

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output");

for (const s of simanim) {
  const dir = path.join(OUT, `siman_${String(s).padStart(3, "0")}`);
  const hits = [];
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        const en = b.en || "";
        if (isBadMt447(en)) continue;
        const pats = GARBLED.filter((re) => re.test(en));
        if (!pats.length) continue;
        hits.push({
          key: `${slug}/${b.seif}:${b.marker || "_"}`,
          file: f,
          patterns: pats.map((r) => r.source),
        });
      }
    }
  }
  console.log(`\nsiman_${String(s).padStart(3, "0")}: pass_bad_mt+garbled=${hits.length}`);
  for (const h of hits) console.log(`  ${h.key} [${h.file}] ${h.patterns.join(",")}`);
}
