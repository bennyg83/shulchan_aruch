#!/usr/bin/env node
/** Copy ENGLISH from output blocks into batch-editorial markdown. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, blockKey } from "../oc001_block_lib.mjs";

const batchPath = process.argv[2];
if (!batchPath) throw new Error("Usage: sync-batch-editorial-from-output.mjs <batch.md>");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

let md = fs.readFileSync(batchPath, "utf8");
const parts = md.split(/```text\n/);
let n = 0;
const out = [parts[0]];
for (let i = 1; i < parts.length; i++) {
  const chunk = parts[i];
  const end = chunk.indexOf("\n```");
  if (end === -1) {
    out.push("```text\n" + chunk);
    continue;
  }
  const block = chunk.slice(0, end);
  const tail = chunk.slice(end);
  const slug = /^slug: (.+)$/m.exec(block)?.[1]?.trim();
  const seif = /^seif: (.+)$/m.exec(block)?.[1]?.trim();
  const marker = /^marker: (.+)$/m.exec(block)?.[1]?.trim();
  if (!slug) {
    out.push("```text\n" + chunk);
    continue;
  }
  const section = md.slice(0, md.indexOf("```text\n" + block));
  const fileMatch = section.match(/`siman_\d+\/[^`]+\.txt`/g);
  const rel = fileMatch?.[fileMatch.length - 1]?.slice(1, -1);
  if (!rel) {
    out.push("```text\n" + chunk);
    continue;
  }
  const fp = path.join(OUT, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find((x) => blockKey(x.slug, x.seif, x.marker) === blockKey(slug, seif, marker));
  if (!b) {
    out.push("```text\n" + chunk);
    continue;
  }
  const updated = block.replace(
    /\*\*\*\* ENGLISH \*\*\*\*\n[\s\S]*?\n\*\*\*\* END BLOCK/,
    `**** ENGLISH ****\n${b.en}\n**** END BLOCK`
  );
  n++;
  out.push("```text\n" + updated + tail);
}
fs.writeFileSync(batchPath, out.join(""), "utf8");
console.log(`Updated ${n} ENGLISH section(s) in ${batchPath}`);
