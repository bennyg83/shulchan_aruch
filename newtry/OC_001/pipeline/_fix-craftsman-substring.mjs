#!/usr/bin/env node
/** Fix false bad_mt hits: "the craft" inside "craftsman's/craftsman". */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 1;
const to = parseInt(process.argv[3], 10) || 697;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

function patchEn(en) {
  return String(en)
    .replace(/\bcraftsman's\b/gi, "artisan's")
    .replace(/\bcraftsman\b/gi, "artisan")
    .replace(/\bthe craft of\b/gi, "the melacha of");
}

let changed = 0;
for (let siman = from; siman <= to; siman++) {
  const dir = simanOutputDir(OUT, siman);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      let fileChanged = false;
      const out = blocks.map((b) => {
        const en2 = patchEn(b.en);
        if (en2 !== b.en) {
          changed++;
          fileChanged = true;
        }
        return { ...b, en: en2 };
      });
      if (fileChanged) {
        const text = out.map(serializeBlock).join("\n\n");
        fs.writeFileSync(fp, text.endsWith("\n") ? text : text + "\n", "utf8");
      }
    }
  }
}
console.log(`patched ${changed} blocks in simanim ${from}-${to}`);
