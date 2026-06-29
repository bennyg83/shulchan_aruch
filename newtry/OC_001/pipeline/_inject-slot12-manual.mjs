#!/usr/bin/env node
/** Merge manual translations into hand-slot12 JSON files */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const batches = process.argv.slice(2);
if (!batches.length) {
  console.error("Usage: _inject-slot12-manual.mjs batch0.json [batch1.json ...]");
  process.exit(1);
}

const all = [];
for (const b of batches) {
  const fp = path.resolve(b);
  all.push(...JSON.parse(fs.readFileSync(fp, "utf8")));
}

const bySiman = {};
for (const { siman, rel, key, en } of all) {
  if (!bySiman[siman]) bySiman[siman] = {};
  bySiman[siman][`${rel}|${key}`] = en;
}

let n = 0;
for (const [siman, map] of Object.entries(bySiman)) {
  const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  for (const it of hand.items) {
    const k = `${it.rel}|${it.key}`;
    if (map[k]) {
      it.en = map[k];
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const miss = hand.items.filter((x) => !x.en || !String(x.en).trim()).length;
  console.log("siman", siman, "injected", Object.keys(map).length, "still missing", miss);
  if (miss) process.exit(1);
}
console.log("total injected", n);
