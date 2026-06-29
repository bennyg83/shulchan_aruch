#!/usr/bin/env node
/** Seed hand-slot7 items[].en from current output block English (autoFixed) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, blockKey } from "./_slot7-lib.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _seed-hand-en-from-output-slot7.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const handPath = path.join(__dirname, "work", `hand-slot7-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

for (const it of hand.items) {
  const fp = path.join(OUT, it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const [seif, marker] = it.key.includes(":") ? it.key.split(":") : [it.key, "_"];
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(seif) &&
      String(x.marker || "_") === String(marker || "_")
  );
  it.en = autoFix(String(b?.en ?? it.enBad ?? ""), it.marker, b?.he ?? it.he ?? "");
}

fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("seeded", hand.items.length, "from output for siman", siman);
