#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot12-lib.mjs";

const siman = process.argv[2];
const fixPath = process.argv[3];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(fixPath, "utf8"));
const base = path.join(__dirname, "..", "output", `siman_${siman}`);
const fails = [];
let n = 0;
for (const [rel, keys] of Object.entries(T)) {
  const fp = path.join(base, rel.replace(`siman_${siman}/`, ""));
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
console.log("applied", n, fails);
if (fails.length) process.exit(1);
