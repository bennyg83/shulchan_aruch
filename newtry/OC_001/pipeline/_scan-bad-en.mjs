#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.join(__dirname, "..");

const badRe =
  /(Lord's Prayer|Hashem|Cherokee|Article A|velvet|Eddie was|Go to KW|epic\.|Affia without|John Dishyn|Spief|Graffin|snail, and snail|water heater will also|father of Israel|I will curse Abraham|from the snail is walking|Psalm\) and snails|Name of B:|exalted man|they are a criminal|compromise the snow)/i;

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".txt")) acc.push(p);
  }
  return acc;
}

for (const s of process.argv.slice(2).map(Number)) {
  const dir = path.join(OC, "output", `siman_${s}`);
  const hits = [];
  for (const fp of walk(dir)) {
    const rel = path.relative(dir, fp).replace(/\\/g, "/");
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    for (const b of blocks) {
      if (badRe.test(b.en || "")) hits.push(`${rel} ${b.seif}:${b.marker || "_"}`);
    }
  }
  console.log(`siman ${s}: ${hits.length} bad`);
  hits.forEach((h) => console.log(" ", h));
}
