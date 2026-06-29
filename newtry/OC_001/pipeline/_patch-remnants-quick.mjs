#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const patches = [
  ["output/siman_677/chokhmat-shlomo/part-001.txt", "3", "_"],
  ["output/siman_684/biur-halacha/part-001.txt", "3", "א"],
];

function patchEn(en) {
  return en
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bHashem\b/gi, "Heaven")
    .replace(/\bG-d\b/g, "Heaven")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat");
}

for (const [fp, seif, marker] of patches) {
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks.map((b) => {
    if (b.seif !== seif || (b.marker || "_") !== marker) return b;
    return { ...b, en: patchEn(b.en).trim() };
  });
  fs.writeFileSync(fp, out.map(serializeBlock).join("\n\n") + "\n", "utf8");
  const b = out.find((x) => x.seif === seif && (x.marker || "_") === marker);
  console.log(fp, "bad?", isBadMt447(b.en));
}
