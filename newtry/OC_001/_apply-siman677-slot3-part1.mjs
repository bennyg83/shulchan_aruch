#!/usr/bin/env node
/** worker slot 3 (400-499) — siman 677 part 1 (Pesach) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { fixes } from "./pipeline/_fixes-siman677-part1.mjs";

const PREFLIGHT = [];

let total = 0;
const risks = [];
const missing = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (!blockFixes[key]) missing.push({ file, key });
  }
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) risks.push({ file, key, pattern: re.source });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n, "/", blocks.length);
  total += n;
}

console.log("PART1 TOTAL", total);
if (missing.length) console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
if (risks.length) console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
else console.log("PREFLIGHT_RISKS none");
if (missing.length) process.exit(1);
