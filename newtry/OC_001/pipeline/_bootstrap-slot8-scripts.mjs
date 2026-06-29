#!/usr/bin/env node
/** Generate slot8 pipeline scripts from slot7 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLOT7 = [
  "_export-he-slot7.mjs",
  "_seed-hand-slot7-partial.mjs",
  "_inject-hand-en-slot7.mjs",
  "_force-seed-hand-slot7.mjs",
  "_fix-hand-preflight-slot7.mjs",
  "_audit-hand-slot7.mjs",
  "_preflight-fix-siman-slot7.mjs",
  "_build-slot7-siman.mjs",
  "_checkpoint-remaining-slot7.mjs",
  "_finalize-siman-slot7.mjs",
];

for (const src of SLOT7) {
  const dst = src.replace("slot7", "slot8");
  const text = fs
    .readFileSync(path.join(__dirname, src), "utf8")
    .replace(/slot7/g, "slot8")
    .replace(/worker-slot-7/g, "worker-slot-8");
  fs.writeFileSync(path.join(__dirname, dst), text, "utf8");
  console.log("wrote", dst);
}
