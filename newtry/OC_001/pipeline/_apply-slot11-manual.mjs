#!/usr/bin/env node
/** Merge _slot11-manual-en.mjs into hand-slot11 JSON for listed simanim */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { T } from "./_slot11-manual-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const simanim = [439, 440, 442, 443, 445];

for (const siman of simanim) {
  const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const k = `${it.rel}|${it.key}`;
    if (T[k]) {
      it.en = T[k];
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("siman", siman, "merged manual", n);
}
