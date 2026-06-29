#!/usr/bin/env node
/** node _apply-partial.mjs 378 fixes378.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot9-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
import { pathToFileURL } from "url";
const modPath = path.resolve(process.argv[3]);
const { FIXES } = await import(pathToFileURL(modPath).href);
const queue = JSON.parse(
  fs.readFileSync(path.join(__dirname, `he${siman}-queue.json`), "utf8")
);
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
const byFile = {};
for (const [fullKey, en] of Object.entries(FIXES)) {
  const meta = queue[fullKey];
  if (!meta) {
    console.error("unknown key", fullKey);
    process.exit(1);
  }
  if (!byFile[meta.file]) byFile[meta.file] = {};
  byFile[meta.file][meta.blockKey] = en;
}
let total = 0;
const fails = [];
for (const [rel, blockFixes] of Object.entries(byFile)) {
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
console.log(`siman_${siman} partial`, total);
if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
