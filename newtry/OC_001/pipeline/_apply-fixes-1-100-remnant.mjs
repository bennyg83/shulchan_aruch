#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { FIXES } from "./_fixes-simanim-1-100-remnant.mjs";

const MAP = [
  [4, "kaf-hachayyim/part-001.txt", "kaf-hachayyim/22:_"],
  [9, "machatzit-hashekel/part-001.txt", "machatzit-hashekel/3:_"],
  [25, "beur-hagra/part-001.txt", "beur-hagra/9:א"],
  [90, "machatzit-hashekel/part-001.txt", "machatzit-hashekel/15:_"],
  [100, "kaf-hachayyim/part-001.txt", "kaf-hachayyim/1:_"],
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

for (const [siman, rel, fixKey] of MAP) {
  const en = FIXES[fixKey];
  if (!en) {
    console.error("missing fix", fixKey);
    process.exit(1);
  }
  const blockKey = fixKey.split("/")[1];
  const fp = path.join(ROOT, "output", `siman_${String(siman).padStart(3, "0")}`, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const k = `${b.seif}:${b.marker || "_"}`;
      if (k === blockKey) return { ...b, en: en.trim() };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  if (isBadMt447(en)) {
    console.error("STILL_BAD", siman, fixKey);
    process.exit(1);
  }
  console.log("ok", siman, fixKey);
}

console.log("ok bad_mt=0 for 5 remnants");
