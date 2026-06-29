#!/usr/bin/env node
/** Generate slot15 pipeline scripts from slot14 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLOT14 = [
  "_export-he-slot14.mjs",
  "_seed-hand-slot14-partial.mjs",
  "_inject-hand-en-slot14.mjs",
  "_force-seed-hand-slot14.mjs",
  "_fix-hand-preflight-slot14.mjs",
  "_audit-hand-slot14.mjs",
  "_preflight-fix-siman-slot14.mjs",
  "_build-slot14-siman.mjs",
  "_checkpoint-remaining-slot14.mjs",
  "_finalize-siman-slot14.mjs",
  "_gen-fixes-siman-slot14-from-en.mjs",
  "_complete-siman-slot14.mjs",
  "_apply-siman-fixes-slot14.mjs",
  "_apply-hand-all-slot14.mjs",
  "_bootstrap-hand-slot14.mjs",
  "_import-sefaria-need-slot14.mjs",
];

for (const src of SLOT14) {
  const dst = src.replace("slot14", "slot15");
  const text = fs
    .readFileSync(path.join(__dirname, src), "utf8")
    .replace(/slot14/g, "slot15")
    .replace(/worker-slot-14/g, "worker-slot-15");
  fs.writeFileSync(path.join(__dirname, dst), text, "utf8");
  console.log("wrote", dst);
}

const lib = fs
  .readFileSync(path.join(__dirname, "_slot14-lib.mjs"), "utf8")
  .replace(/slot14/g, "slot15")
  .replace(/worker-slot-14/g, "worker-slot-15");
fs.writeFileSync(path.join(__dirname, "_slot15-lib.mjs"), lib, "utf8");
console.log("wrote _slot15-lib.mjs");
