#!/usr/bin/env node
/** worker-slot-6 — siman 266 editorial batch 5 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { FIXES } from "./_siman266-slot6-batch5-data.mjs";
import { preflightFail } from "./_slot6-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, "..", "output", "siman_266");
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
console.log("fixed", total);
if (fails.length) {
  console.error("PREFLIGHT FAILURES:", fails.join("\n"));
  process.exit(1);
}
console.log("preflight ok");

import { spawnSync } from "child_process";
const sync = spawnSync(
  process.execPath,
  [path.join(__dirname, "sync-queue-from-output.mjs"), path.join(__dirname, "work", "editorial-queue-siman-266.json")],
  { cwd: path.join(__dirname, ".."), stdio: "inherit" }
);
if (sync.status !== 0) process.exit(sync.status ?? 1);
