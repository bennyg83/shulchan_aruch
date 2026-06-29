#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot9-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot9-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
for (const it of hand.items) {
  if (!it.en || it.en.length < 8) {
    it.en = autoFix(it.enBad || "", it.marker, it.he || "");
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en || x.en.length < 8);
console.log("siman", siman, "forced", hand.items.length - miss.length, "still short", miss.length);
