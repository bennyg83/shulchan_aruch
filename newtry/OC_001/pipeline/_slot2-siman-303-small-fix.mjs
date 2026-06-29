#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t } from "./small303-en.mjs";

const fixes = new Map(Object.entries(t));
const files = [
  "ateret-zekenim",
  "chatam-sofer",
  "chokhmat-shlomo",
  "dagul-merevavah",
  "netiv-chayim",
  "rabbi-akiva-eiger",
  "yad-ephraim",
];
let missing = [];
for (const slug of files) {
  const f = `output/siman_303/${slug}/part-001.txt`;
  const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = fixes.get(key);
      if (!en) missing.push(key);
      return en ? { ...b, en } : b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(f, out);
}
console.log("Small 303:", fixes.size, "missing:", missing.length);
if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
