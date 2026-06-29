#!/usr/bin/env node
/** Apply hand EN fixes without autoFix (avoids God→Hashem bad_mt). */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const siman = process.argv[2];
const dataMod = process.argv[3];
if (!siman || !dataMod) {
  console.error("usage: node _apply-hand-en-siman.mjs 502 ./_siman502-hand-en.mjs");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { FIXES } = await import(pathToFileURL(path.resolve(dataMod)).href);
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
let total = 0;
const fails = [];
const stillBad = [];

for (const [rel, blockFixes] of Object.entries(FIXES)) {
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
    if (pf) fails.push(`${rel} ${key}: preflight ${pf}`);
    if (isBadMt447(en)) stillBad.push(`${rel} ${key}`);
  }
}

console.log(`siman_${siman}: applied ${total}`);
if (fails.length) {
  console.error("PREFLIGHT:", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:", stillBad.join("\n"));
  process.exit(1);
}
console.log("ok bad_mt=0 preflight=0");
