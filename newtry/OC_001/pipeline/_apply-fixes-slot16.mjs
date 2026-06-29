#!/usr/bin/env node
/** Apply _fixes-simanNNN-slot16.mjs to output */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot10-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _apply-fixes-slot16.mjs <siman>");

const fixesPath = path.join(__dirname, `_fixes-siman${siman}-slot16.mjs`);
if (!fs.existsSync(fixesPath)) throw new Error("missing " + fixesPath);

const { FIXES } = await import(pathToFileURL(fixesPath).href + "?v=" + Date.now());
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
console.log("applied", total, "blocks");
if (fails.length) {
  console.error("PREFLIGHT FAILURES:", fails.join("\n"));
  process.exit(1);
}
console.log("preflight ok");
