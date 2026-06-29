#!/usr/bin/env node
/** Inject English fixes for slot19 remaining blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix } from "./_slot18-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

const siman = parseInt(process.argv[2], 10);
const all = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "slot19-fixes.json"), "utf8")
)[String(siman)];
if (!all) {
  console.log("no fixes for", siman);
  process.exit(0);
}

for (const [rel, blockFixes] of Object.entries(all)) {
  const fp = path.join(OUT, `siman_${siman}`, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (!blockFixes[key]) return b;
      const en = autoFix(blockFixes[key], b.marker, b.he);
      return { ...b, en };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  console.log("patched", rel, Object.keys(blockFixes).length);
}
