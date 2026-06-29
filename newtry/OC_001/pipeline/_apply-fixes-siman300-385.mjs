#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { FIXES_BY_SIMAN } from "./_fixes-siman300-385-remnant.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const stillBad = [];
let total = 0;

for (const [siman, files] of Object.entries(FIXES_BY_SIMAN)) {
  const base = path.join(ROOT, "output", `siman_${String(siman).padStart(3, "0")}`);
  for (const [rel, blockFixes] of Object.entries(files)) {
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
      total++;
      if (isBadMt447(en)) stillBad.push(`siman_${siman} ${rel} ${key}`);
    }
  }
}

console.log(`applied ${total} blocks`);
if (stillBad.length) {
  console.error("STILL bad_mt:", stillBad.join("\n"));
  process.exit(1);
}

// verify range 300-385
let bad = 0;
for (let s = 300; s <= 385; s++) {
  const dir = path.join(ROOT, "output", `siman_${s}`);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (isBadMt447(b.en)) {
          bad++;
          stillBad.push(`siman_${s}/${slug}/${f} ${b.seif}:${b.marker}`);
        }
      }
    }
  }
}
console.log(`verify 300-385 bad_mt=${bad}`);
if (bad) process.exit(1);
console.log("ok bad_mt=0");
