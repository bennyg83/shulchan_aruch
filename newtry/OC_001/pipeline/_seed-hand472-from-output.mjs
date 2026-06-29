#!/usr/bin/env node
/** Seed hand-slot12-siman-472.json en from output where quality ok */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot12-siman-472.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const badPat =
  /Epi |West Bank|According to the|&quot;|allocated|hand recoils|Lord's Prayer|Josephah|Bible is in|craft |Saturday|Golden Rows|Shield of Abraham|Rema: Rema/i;

let seeded = 0;
let need = 0;
for (const it of hand.items) {
  const fp = path.join(__dirname, "..", "output", "siman_472", it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) => String(x.seif) === String(it.seif) && (x.marker || "_") === (it.marker || "_")
  );
  const en = (b?.en || "").trim();
  if (en && en.length > 8 && !badPat.test(en)) {
    it.en = en;
    seeded++;
  } else need++;
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("seeded", seeded, "still need", need);
