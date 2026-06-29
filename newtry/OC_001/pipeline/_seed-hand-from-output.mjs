#!/usr/bin/env node
/** Seed hand-slot11 JSON en fields from current output (for re-edit pass) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot11-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
for (const it of hand.items) {
  it.en = autoFix(it.enBad || "", it.marker, it.he || "");
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("seeded", hand.items.length, "from output for siman", siman);
