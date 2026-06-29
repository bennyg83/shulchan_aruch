#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const patchPath = process.argv[3];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const patches = JSON.parse(fs.readFileSync(path.resolve(patchPath), "utf8"));
const handPath = path.join(__dirname, "work", `hand-slot6-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  const en = patches[it.rel]?.[it.key];
  if (en) {
    it.en = en;
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const missing = hand.items.filter((x) => !x.en || x.en.length < 8);
console.log("patched", n, "missing", missing.length);
if (missing.length) {
  console.error(missing.map((x) => `${x.rel} ${x.key}`).join("\n"));
  process.exit(1);
}
