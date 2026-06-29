#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot12-lib.mjs";
import { FIXES } from "./_siman536-540-remnant-hand-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

let total = 0;
const fails = [];
const stillBad = [];

for (const [siman, relMap] of Object.entries(FIXES)) {
  const base = path.join(OUT, `siman_${siman}`);
  for (const [rel, blockFixes] of Object.entries(relMap)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key].trim() };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    for (const [key, en] of Object.entries(blockFixes)) {
      total++;
      const pf = preflightFail(en);
      if (pf) fails.push(`siman_${siman} ${rel} ${key}: ${pf}`);
      if (isBadMt447(en)) stillBad.push(`siman_${siman} ${rel} ${key}`);
    }
  }
}

console.log(`applied ${total}`);
if (fails.length) {
  console.error("PREFLIGHT:", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:", stillBad.join("\n"));
  process.exit(1);
}
console.log("ok bad_mt=0 preflight=0");
