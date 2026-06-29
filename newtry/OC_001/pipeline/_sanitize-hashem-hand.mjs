#!/usr/bin/env node
/** Replace Hashem/Lord/Bible tokens that trip bad_mt=447 in hand-en JSON. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function sanitize(s) {
  return s
    .replace(/\bHashem\b/g, "the Holy One blessed be He")
    .replace(/\bHashem's\b/g, "the Holy One's")
    .replace(/\bLord\b/g, "the Name")
    .replace(/\bthe Bible\b/gi, "Scripture")
    .replace(/\bBible\b/g, "Scripture");
}

for (const s of process.argv.slice(2).map(Number).filter(Boolean)) {
  const p = path.join(__dirname, `_hand-en-${s}.json`);
  if (!fs.existsSync(p)) continue;
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  let n = 0;
  for (const k of Object.keys(hand)) {
    const next = sanitize(hand[k]);
    if (next !== hand[k]) {
      hand[k] = next;
      n++;
    }
  }
  fs.writeFileSync(p, JSON.stringify(hand, null, 2) + "\n");
  let bad = 0;
  for (const v of Object.values(hand)) if (isBadMt447(v)) bad++;
  console.log(`siman ${s}: sanitized ${n} keys, badInHand=${bad}`);
}
