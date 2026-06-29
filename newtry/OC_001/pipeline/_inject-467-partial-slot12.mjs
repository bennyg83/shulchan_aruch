#!/usr/bin/env node
/** Merge mech467 + CHUNK1/2 into hand-slot12-siman-467.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot12-lib.mjs";
import { CHUNK1 } from "./_467-small-chunk1.mjs";
import { CHUNK2 } from "./_467-small-chunk2.mjs";
import { t as mech } from "./mech467-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot12-siman-467.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const map = { ...CHUNK1, ...CHUNK2 };
let n = 0;
for (const it of hand.items) {
  const lookup = `${it.slug}:${it.key}`;
  let en = map[lookup];
  if (!en && it.slug === "mechaber") en = mech[it.key];
  if (en) {
    it.en = autoFix(en, it.marker, it.he || "");
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const need = hand.items.filter((x) => !x.en).length;
console.log("injected", n, "still need", need);
