#!/usr/bin/env node
/** Apply cursor translations: node _apply-cursor-translations.mjs <siman> <translations.json> */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail, autoFix } from "./_slot12-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const transPath = process.argv[3];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
const T = JSON.parse(fs.readFileSync(transPath, "utf8"));
const fails = [];
let n = 0;

for (const [rel, keys] of Object.entries(T)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (!keys[key]) return b;
      const en = autoFix(keys[key], b.marker, b.he);
      const pf = preflightFail(en);
      if (pf) fails.push(`${rel} ${key}: ${pf}`);
      n++;
      return { ...b, en };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
}
console.log("applied", n, "fails", fails.length);
if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
