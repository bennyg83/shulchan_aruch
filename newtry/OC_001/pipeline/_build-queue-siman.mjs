#!/usr/bin/env node
/** Build heNNN-queue.json of bad-MT blocks needing translation */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, `he${siman}-export.json`), "utf8"));
const handPath = path.join(__dirname, `_hand-en-${siman}.json`);
const hand = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};

const queue = {};
let bad = 0;
for (const [k, v] of Object.entries(exp)) {
  const en = hand[k] || v.en || "";
  if (isBad(en)) {
    queue[k] = { he: v.he, en, file: v.file };
    bad++;
  }
}
const out = path.join(__dirname, `he${siman}-queue.json`);
fs.writeFileSync(out, JSON.stringify(queue, null, 2) + "\n");
console.log(`siman_${siman}: bad=${bad} queued -> ${out}`);
