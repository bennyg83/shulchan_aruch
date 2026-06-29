#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot12-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const FIXES = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "work", process.argv[2] || "cursor-fixes-479-485.json"),
    "utf8"
  )
);

let total = 0;
const fails = [];
for (const [siman, relMap] of Object.entries(FIXES)) {
  const base = path.join(OUT, `siman_${siman}`);
  for (const [rel, blockFixes] of Object.entries(relMap)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key] };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    total += Object.keys(blockFixes).length;
    for (const [key, en] of Object.entries(blockFixes)) {
      const pf = preflightFail(en);
      if (pf) fails.push(`siman_${siman} ${rel} ${key}: ${pf}`);
    }
  }
}
console.log("applied", total);
if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
