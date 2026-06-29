#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot7-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const dataMod = process.argv[3];
if (!sim || !dataMod) {
  console.error("usage: node _apply-siman-batch.mjs siman_357 ./_siman357-batch1-data.mjs");
  process.exit(1);
}
const { FIXES } = await import(pathToFileURL(path.resolve(dataMod)).href);
const base = path.join(__dirname, "..", "output", sim);
let total = 0;
const fails = [];

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        const en = autoFix(blockFixes[key], b.marker, b.he);
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
  for (const [key, raw] of Object.entries(blockFixes)) {
    const en = autoFix(raw, key.split(":")[1], "");
    const pf = preflightFail(en);
    if (pf) fails.push(`${rel} ${key}: ${pf}`);
  }
}
const ts = new Date().toISOString().slice(0, 19);
const log = path.join(__dirname, "..", "progress.log");
const lines = Object.entries(FIXES).map(
  ([rel, bf]) => `${ts} ${sim}/${rel.replace("/part-001.txt", "")} ${Object.keys(bf).length} blocks DONE`
);
fs.appendFileSync(log, lines.join("\n") + "\n");
console.log("fixed", total, "blocks in", sim);
if (fails.length) {
  console.error("PREFLIGHT FAILURES:", fails.join("\n"));
  process.exit(1);
}
console.log("preflight ok");
