#!/usr/bin/env node
/** Seed all hand-slot12-siman-472 en from output blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix } from "./_slot12-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot12-siman-472.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const OUT = path.join(__dirname, "..", "output", "siman_472");
let n = 0;
for (const it of hand.items) {
  const fp = path.join(OUT, it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  const en = autoFix(String(b?.en ?? "").trim(), it.marker, it.he || "");
  if (en) {
    it.en = en;
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("seeded", n, "of", hand.items.length);
