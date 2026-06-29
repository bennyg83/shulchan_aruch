#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";
import { BY_SIMAN } from "./_siman591-600-remnant-hand-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
let hadError = false;

for (const [simanStr, FIXES] of Object.entries(BY_SIMAN)) {
  const siman = simanStr;
  const base = path.join(ROOT, "output", `siman_${siman}`);
  let total = 0;

  for (const [rel, blockFixes] of Object.entries(FIXES)) {
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
      const pf = preflightFail(en);
      if (pf) {
        console.error(`PREFLIGHT siman_${siman} ${rel} ${key}: ${pf}`);
        hadError = true;
      }
      if (isBadMt447(en)) {
        console.error(`BAD_MT siman_${siman} ${rel} ${key}`);
        hadError = true;
      }
    }
  }
  console.log(`siman_${siman}: applied ${total}`);
}

for (const siman of [591, 592, 593, 594, 595, 596, 597, 598, 599, 600]) {
  const dir = path.join(ROOT, "output", `siman_${siman}`);
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (isBadMt447(b.en)) {
          console.error(`VERIFY bad siman_${siman} ${slug}/${b.seif}:${b.marker || "_"}`);
          hadError = true;
        }
      }
    }
  }
}

if (hadError) process.exit(1);
console.log("ok bad_mt=0 preflight=0");
