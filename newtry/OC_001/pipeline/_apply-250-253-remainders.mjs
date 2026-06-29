#!/usr/bin/env node
import { FIXES, FIXES253 } from "./_siman250-253-remainders.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const dir = path.dirname(fileURLToPath(import.meta.url));
spawnSync(process.execPath, [path.join(dir, "_apply-hand-en-siman.mjs"), "250", path.join(dir, "_siman250-253-remainders.mjs")], {
  stdio: "inherit",
});
// apply 253 separately
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const base = path.join(dir, "..", "output", "siman_253");
for (const [rel, blockFixes] of Object.entries(FIXES253)) {
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
    if (preflightFail(en)) throw new Error(`preflight ${rel} ${key}`);
    if (isBadMt447(en)) throw new Error(`bad_mt ${rel} ${key}`);
  }
}
console.log("siman_253 remainders ok");
