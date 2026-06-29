#!/usr/bin/env node
/** Re-apply autoFix/scrubEn to all hand-slot18 items for one siman */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot18-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
for (const it of hand.items) {
  if (!it.en) continue;
  it.en = autoFix(it.en, it.marker, it.he || "");
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("scrubbed siman", siman, hand.items.length, "items");
