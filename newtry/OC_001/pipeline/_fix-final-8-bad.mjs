#!/usr/bin/env node
/** MT + aggressive sanitize for final 8 bad_mt blocks in range 101-243 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { FIXES } from "./_fixes-final-8-hand.mjs";

const SIMANS = [124, 142, 148, 158, 160, 187, 223, 242];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

for (const siman of SIMANS) {
  const pad = String(siman).padStart(3, "0");
  for (const [rel, blocks] of Object.entries(FIXES[siman] || {})) {
    const fp = path.join(ROOT, "output", `siman_${pad}`, rel);
    const parsed = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = parsed
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blocks[key]) return { ...b, en: blocks[key].trim() };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    for (const [key, en] of Object.entries(blocks)) {
      if (isBadMt447(en)) {
        console.error(`STILL_BAD siman_${siman} ${rel} ${key}`);
        process.exit(1);
      }
    }
    console.log(`ok siman_${siman} ${rel} (${Object.keys(blocks).length} blocks)`);
  }
}
console.log("all 8 hand fixes applied, bad_mt=0");
