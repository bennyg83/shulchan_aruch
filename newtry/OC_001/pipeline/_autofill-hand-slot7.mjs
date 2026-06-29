#!/usr/bin/env node
/** Set hand-slot7 items[].en = autoFix(enBad) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot7-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot7-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
for (const it of hand.items) {
  it.en = autoFix(it.enBad ?? "", it.marker, it.he ?? "");
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("autofilled", hand.items.length, "blocks for siman", siman);
