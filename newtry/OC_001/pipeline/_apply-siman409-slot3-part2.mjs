#!/usr/bin/env node
/** worker slot 3 — siman 409 part 2 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { fixesPartA } from "./_siman409-p2-fixes-part-a.mjs";
import { fixesPartB } from "./_siman409-p2-fixes-part-b.mjs";
import { fixesPartC } from "./_siman409-p2-fixes-part-c.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function mergeFixes(...parts) {
  const out = {};
  for (const part of parts) {
    for (const [file, blocks] of Object.entries(part)) {
      out[file] = { ...(out[file] || {}), ...blocks };
    }
  }
  return out;
}

const fixes = mergeFixes(fixesPartA, fixesPartB, fixesPartC);

let total = 0;
for (const [file, blockFixes] of Object.entries(fixes)) {
  const fp = path.join(root, file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  console.log(file, n);
  total += n;
}
console.log("TOTAL", total);
