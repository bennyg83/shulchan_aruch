#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt454.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he454-export.json"), "utf8"));
const parts = [1, 2, 3].map((n) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `siman454-part${n}.json`), "utf8"))
);

function stripHtml(h) {
  return h
    .replace(/<small>[\s\S]*?<\/small>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const map = { 1: PART1, 2: PART2, 3: PART3 };

for (const pn of [1, 2, 3]) {
  const hand = parts[pn - 1];
  const out = {};
  for (const [k, v] of Object.entries(exp)) {
    if (hand[k]) continue;
    const slug = k.split("/")[0];
    if (!map[pn].includes(slug)) continue;
    out[k] = { he: stripHtml(v.he), en_bad: v.en };
  }
  fs.writeFileSync(path.join(__dirname, `he454-queue-p${pn}.json`), JSON.stringify(out, null, 2) + "\n");
  console.log(`he454-queue-p${pn}.json`, Object.keys(out).length);
}
