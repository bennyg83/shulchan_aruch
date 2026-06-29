#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const patch = JSON.parse(fs.readFileSync(path.join(__dirname, "_patch-en-455-457.json"), "utf8"));

for (const siman of [455, 456, 457]) {
  const handPath = path.join(__dirname, `_hand-en-${siman}.json`);
  const hand = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};
  const p = patch[String(siman)] || {};
  Object.assign(hand, p);
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
  console.log(`siman_${siman}: hand keys ${Object.keys(hand).length}, patch added ${Object.keys(p).length}`);
}
