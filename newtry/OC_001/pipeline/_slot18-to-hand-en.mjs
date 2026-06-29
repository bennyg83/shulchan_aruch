#!/usr/bin/env node
/** Flatten FIXES_BY_SIMAN from _hand684-696-en.mjs into _hand-en-{siman}.json keys slug/seif:marker */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES_BY_SIMAN } from "./_hand684-696-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const [siman, files] of Object.entries(FIXES_BY_SIMAN)) {
  const hand = {};
  for (const [rel, blocks] of Object.entries(files)) {
    const slug = rel.split("/")[0];
    for (const [key, en] of Object.entries(blocks)) {
      hand[`${slug}/${key}`] = en;
    }
  }
  const out = path.join(__dirname, `_hand-en-${siman}.json`);
  const prev = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, "utf8")) : {};
  const merged = { ...prev, ...hand };
  fs.writeFileSync(out, JSON.stringify(merged, null, 2) + "\n");
  console.log(`siman ${siman}: +${Object.keys(hand).length} -> ${Object.keys(merged).length} total`);
}
