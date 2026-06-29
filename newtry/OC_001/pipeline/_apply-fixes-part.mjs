#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot11-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modPath = process.argv[2];
if (!modPath) {
  console.error("usage: node _apply-fixes-part.mjs <fixes.mjs>");
  process.exit(1);
}
const { FIXES } = await import(pathToFileURL(path.resolve(modPath)).href);
const m = modPath.match(/siman(\d+)/);
const siman = m ? Number(m[1]) : null;
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
let total = 0;
const fails = [];
for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: autoFix(blockFixes[key], b.marker, b.he) };
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
console.log("fixed", total);
if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
