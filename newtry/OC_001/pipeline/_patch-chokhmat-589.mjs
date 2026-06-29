#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot15-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot15-siman-589.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

const FIXES = {
  "2:_": fs.readFileSync(path.join(__dirname, "work", "en-589-chokhmat-2.txt"), "utf8").trim(),
  "3:_": fs.readFileSync(path.join(__dirname, "work", "en-589-chokhmat-3.txt"), "utf8").trim(),
  "4:_": fs.readFileSync(path.join(__dirname, "work", "en-589-chokhmat-4.txt"), "utf8").trim(),
};

for (const it of hand.items) {
  if (it.slug !== "chokhmat-shlomo") continue;
  const en = FIXES[it.key];
  if (en) it.en = autoFix(en, it.marker, it.he || "");
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en).length;
console.log("patched chokhmat, missing", miss);
