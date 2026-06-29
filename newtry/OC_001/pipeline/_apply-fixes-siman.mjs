#!/usr/bin/env node
/** node _apply-fixes-siman.mjs 379 ./_siman379-fixes.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot10-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const modPath = path.resolve(process.argv[3]);
const { FIXES } = await import(pathToFileURL(modPath).href);
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
let total = 0;
const fails = [];

for (const [rel, blockFixes] of Object.entries(FIXES)) {
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
    if (pf) fails.push(`${rel} ${key}: ${pf}`);
  }
}
console.log(`siman_${siman} fixed ${total} blocks`);
if (fails.length) {
  console.error("PREFLIGHT FAILURES:\n" + fails.join("\n"));
  process.exit(1);
}
console.log("preflight ok");
