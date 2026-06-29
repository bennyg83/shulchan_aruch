#!/usr/bin/env node
/** Copy good fixes text back into siman447-part*.json for keys still flagged bad. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { fixes as fixes1 } from "./_fixes-siman447-part1.mjs";
import { fixes as fixes2 } from "./_fixes-siman447-part2.mjs";
import { fixes as fixes3 } from "./_fixes-siman447-part3.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PARTS = [
  [1, fixes1],
  [2, fixes2],
  [3, fixes3],
];

for (const [n, fixes] of PARTS) {
  const handPath = path.join(__dirname, `siman447-part${n}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let c = 0;
  for (const [file, blockFixes] of Object.entries(fixes)) {
    const slug = file.split(/[/\\]/).slice(-2, -1)[0];
    for (const [k, en] of Object.entries(blockFixes)) {
      const hk = `${slug}/${k}`;
      if (hand[hk] && isBadMt447(hand[hk]) && en && !isBadMt447(en)) {
        hand[hk] = en;
        c++;
      }
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
  console.log(`part${n}: synced ${c} bad hand entries from fixes`);
}
