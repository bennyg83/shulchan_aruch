#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he447-export.json"), "utf8"));
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, "siman447-part2.json"), "utf8"));
const slugs = ["chok-yaakov", "beur-hagra", "peri-megadim"];
const HARD_BAD =
  /Lord'?s Prayer|Hashem|&quot;|hand recoils|first dish|allocated|Shield of Abraham|Gloss-|Reichah|chometz|\bYom tov\b|strike in/i;

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/&quot;/g, '"')
    .trim();
}

let filled = 0;
const still = [];
for (const slug of slugs) {
  const dir = path.join(path.dirname(__dirname), "output/siman_447", slug);
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt"))) {
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8"))) {
      const hk = `${slug}/${b.seif}:${b.marker || "_"}`;
      if (hand[hk]) continue;
      const en = sanitizeEn(exp[hk]?.en || "");
      if (!en || HARD_BAD.test(en)) still.push(hk);
      else {
        hand[hk] = en;
        filled++;
      }
    }
  }
}
fs.writeFileSync(path.join(__dirname, "siman447-part2.json"), JSON.stringify(hand, null, 2) + "\n");
console.log("filled", filled, "still", still.length);
