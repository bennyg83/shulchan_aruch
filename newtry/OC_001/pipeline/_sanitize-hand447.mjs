#!/usr/bin/env node
/** Fix preflight-failure patterns in siman447-part*.json hand files */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function fixEn(s) {
  return s
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bYom tov\b/gi, "Yom Tov")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bOr Hashem\b/g, "Or HaChaim")
    .replace(/\bAccording to the\b/g, "Per the")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz");
}

for (const n of [1, 2, 3]) {
  const p = path.join(__dirname, `siman447-part${n}.json`);
  if (!fs.existsSync(p)) continue;
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  let c = 0;
  for (const [k, v] of Object.entries(hand)) {
    const f = fixEn(String(v));
    if (f !== v) {
      hand[k] = f;
      c++;
    }
  }
  fs.writeFileSync(p, JSON.stringify(hand, null, 2) + "\n");
  console.log(`part${n} sanitized ${c} entries`);
}
