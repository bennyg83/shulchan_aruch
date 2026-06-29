#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const [fp, seif, marker, en] = process.argv.slice(2);
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const out = blocks
  .map((b) => {
    const mk = b.marker || "_";
    if (String(b.seif) === seif && mk === marker) return { ...b, en };
    return b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
console.log("patched", fp, seif, marker);
