#!/usr/bin/env node
/** Merge hand452-extra-p{2,3}.json into siman452-part{2,3}.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const p of [2, 3]) {
  const handPath = path.join(__dirname, `siman452-part${p}.json`);
  const extraPath = path.join(__dirname, `hand452-extra-p${p}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  if (fs.existsSync(extraPath)) {
    Object.assign(hand, JSON.parse(fs.readFileSync(extraPath, "utf8")));
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
  console.log(`part${p}:`, Object.keys(hand).length, "keys");
}
