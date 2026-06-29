#!/usr/bin/env node
/** Apply T map (rel|seif:marker) directly to output blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot12-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
const patchPath = process.argv[3];
if (!siman || !patchPath) {
  console.error("Usage: _apply-hand-patches-output-slot12.mjs <siman> <patches.mjs>");
  process.exit(1);
}

const { T } = await import(pathToFileURL(path.resolve(patchPath)).href + "?v=" + Date.now());
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
const byRel = {};
for (const [k, en] of Object.entries(T)) {
  const [rel, blockKey] = k.split("|");
  if (!byRel[rel]) byRel[rel] = {};
  byRel[rel][blockKey] = en;
}

let total = 0;
const fails = [];
for (const [rel, blockFixes] of Object.entries(byRel)) {
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
console.log(`siman ${siman}: patched ${total}`);
if (fails.length) {
  console.error("PREFLIGHT FAILURES:", fails.join("\n"));
  process.exit(1);
}
