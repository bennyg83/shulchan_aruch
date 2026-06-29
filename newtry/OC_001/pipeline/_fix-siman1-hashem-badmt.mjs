#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = simanOutputDir(path.join(ROOT, "output"), 1);

function fixEn(en) {
  return en
    .replace(/Hashem Elokei avosai/g, "the Name, God of my fathers")
    .replace(/Baruch Atah Hashem shomei'a/g, "Baruch Atah — Who hears prayer")
    .replace(/Remember what Hashem your God/g, "Remember what God your God")
    .replace(/and Hashem spoke/g, "and God spoke")
    .replace(/I am Hashem your God/g, "I am God, your God")
    .replace(/Hashem our God, Hashem is one/g, "the Name is our God, the Name is One")
    .replace(/Hashem your God you shall fear/g, "God your God you shall fear")
    .replace(/says Hashem/g, "says God")
    .replace(/\bHashem\b/g, "God");
}

let blocksPatched = 0;
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    const p = path.join(d, f);
    const blocks = parseBlocksInFile(fs.readFileSync(p, "utf8"));
    let ch = false;
    for (const b of blocks) {
      if (!b.en || !/\bHashem\b/.test(b.en)) continue;
      b.en = fixEn(b.en);
      ch = true;
      blocksPatched++;
    }
    if (ch) {
      const out = blocks.map((b) => serializeBlock(b)).join("\n");
      fs.writeFileSync(p, out.endsWith("\n") ? out : out + "\n", "utf8");
      console.log("Updated", path.relative(ROOT, p));
    }
  }
}
console.log(`blocks patched: ${blocksPatched}`);
