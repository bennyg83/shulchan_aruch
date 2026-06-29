#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

export const GARBLED_USER = [
  /\bMaga\b/i,
  /\bSkala\b/i,
  /\bKSHAL\b/i,
  /\bDuff\b/i,
  /\bRiu\b/i,
  /\bMbadilin\b/i,
  /\bDamgila\b/i,
  /\bDamast/i,
  /\bDamari/i,
  /\bDamtsino/i,
  /\bDakohen\b/i,
  /\bDaorita\b/i,
  /\bDavnach\b/i,
  /\bSqm\b/i,
  /\bSKIA\b/i,
  /\bDamksha\b/i,
  /\bDamshah\b/i,
  /\bDamhiksha\b/i,
  /\bDamharim\b/i,
  /\bDamked\b/i,
  /\bDamnam\b/i,
  /\bDammetinan\b/i,
  /\bDamshash\b/i,
  /\bDamshide\b/i,
  /\bDamastama\b/i,
  /\bDamakrin\b/i,
  /\bDambarach\b/i,
  /\bDamhoyev\b/i,
  /\bDam there\b/i,
  /\bDam P\./i,
  /\bDam Cohen\b/i,
  /\bDam Rabbi\b/i,
  /\bDam Amor\b/i,
  /\bDam said\b/i,
  /\bDam Dela\b/i,
  /\bDam Mor\b/i,
  /\bDam they\b/i,
];

const base = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output", "siman_128");
const hits = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      if (GARBLED_USER.some((re) => re.test(b.en || ""))) {
        hits.push(`${slug}/${f} ${b.seif}:${b.marker || "_"}`);
      }
    }
  }
}
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  console.log(`user-pattern garbled: ${hits.length}`);
  console.log(hits.join("\n"));
}
