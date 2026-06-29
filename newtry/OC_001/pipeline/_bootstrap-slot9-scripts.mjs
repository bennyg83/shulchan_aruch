#!/usr/bin/env node
/** Generate slot9 pipeline scripts from slot8 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLOT8 = [
  "_export-he-slot8.mjs",
  "_seed-hand-slot8-partial.mjs",
  "_inject-hand-en-slot8.mjs",
  "_force-seed-hand-slot8.mjs",
  "_fix-hand-preflight-slot8.mjs",
  "_audit-hand-slot8.mjs",
  "_preflight-fix-siman-slot8.mjs",
  "_build-slot8-siman.mjs",
  "_checkpoint-remaining-slot8.mjs",
  "_finalize-siman-slot8.mjs",
  "_slot8-lib.mjs",
  "_gen-fixes-siman-slot8-from-en.mjs",
];

for (const src of SLOT8) {
  const dst = src.replace("slot8", "slot9");
  const text = fs
    .readFileSync(path.join(__dirname, src), "utf8")
    .replace(/slot8/g, "slot9")
    .replace(/worker-slot-8/g, "worker-slot-9");
  fs.writeFileSync(path.join(__dirname, dst), text, "utf8");
  console.log("wrote", dst);
}
