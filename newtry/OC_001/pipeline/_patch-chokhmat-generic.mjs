#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot15-lib.mjs";

const siman = Number(process.argv[2]);
const key = process.argv[3];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enPath = path.join(__dirname, "work", `en-${siman}-chokhmat-${key}.txt`);
const handPath = path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const en = fs.readFileSync(enPath, "utf8").trim();
for (const it of hand.items) {
  if (it.slug === "chokhmat-shlomo" && it.key === `${key}:_`) {
    it.en = autoFix(en, it.marker, it.he || "");
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("ok", siman, key);
