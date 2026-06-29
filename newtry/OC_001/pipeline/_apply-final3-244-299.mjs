#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";
import { FIXES_BY_SIMAN } from "./_fixes-244-299-final3.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const stillBad = [];

for (const [siman, files] of Object.entries(FIXES_BY_SIMAN)) {
  const base = path.join(ROOT, "output", `siman_${siman}`);
  for (const [rel, blockFixes] of Object.entries(files)) {
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
      const pf = preflightFail(en);
      if (pf) fails.push(`siman_${siman} ${rel} ${key}: ${pf}`);
      if (isBadMt447(en)) stillBad.push(`siman_${siman} ${rel} ${key}`);
    }
  }
}

if (fails.length) {
  console.error("PREFLIGHT:", fails.join("\n"));
  process.exit(1);
}
if (stillBad.length) {
  console.error("BAD_MT:", stillBad.join("\n"));
  process.exit(1);
}
console.log("ok bad_mt=0 preflight=0 final3 applied");
