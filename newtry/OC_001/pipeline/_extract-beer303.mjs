#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const blocks = parseBlocksInFile(fs.readFileSync("output/siman_303/beer-hagolah/part-001.txt", "utf8"));
const lines = ["export const t = {"];
for (const b of blocks) {
  const k = `${b.seif}:${b.marker}`;
  const v = b.en.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
  lines.push(`  "${k}": \`${v}\`,`);
}
lines.push("};");
fs.writeFileSync("pipeline/beer303-en.mjs", lines.join("\n") + "\n");
console.log(blocks.length);
