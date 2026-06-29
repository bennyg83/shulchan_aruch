#!/usr/bin/env node
/** Apply _fixes-quality-451-447.mjs to output blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot10-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const { FIXES } = await import(pathToFileURL(path.join(__dirname, "_fixes-quality-451-447.mjs")).href);

const bySiman = new Map();
for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const m = rel.match(/^siman_(\d+)\//);
  if (!m) throw new Error(`Bad rel path: ${rel}`);
  const siman = m[1];
  const inner = rel.replace(/^siman_\d+\//, "");
  if (!bySiman.has(siman)) bySiman.set(siman, {});
  bySiman.get(siman)[inner] = blockFixes;
}

let total = 0;
const fails = [];
for (const [siman, files] of bySiman) {
  const base = path.join(OC_ROOT, "output", `siman_${siman}`);
  for (const [rel, blockFixes] of Object.entries(files)) {
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
      if (pf) fails.push(`siman_${siman}/${rel} ${key}: ${pf}`);
    }
  }
}
console.log(`Applied ${total} block fixes`);
if (fails.length) {
  console.error("PREFLIGHT FAILURES:\n" + fails.join("\n"));
  process.exit(1);
}
console.log("preflight ok");
