#!/usr/bin/env node
/** worker-slot-4 — siman 199 editorial batch 3 (45 blocks) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_siman199-slot4-batch3-fixes.json"), "utf8")
);

const base = "output/siman_199";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      const mk = b.marker === "main" ? "main" : b.marker || "_";
      const keyMain = `${b.seif}:${mk}`;
      const fix = blockFixes[key] || blockFixes[keyMain];
      if (fix) return { ...b, en: fix };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
