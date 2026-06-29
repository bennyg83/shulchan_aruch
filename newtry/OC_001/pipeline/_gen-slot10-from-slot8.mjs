#!/usr/bin/env node
/** Generate slot10 pipeline scripts from slot8 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SLOT = "9";
const SLOT_DASH = "slot10";
const WORKER = "worker-slot-10";

const CORE = [
  "_slot8-lib.mjs",
  "_export-he-slot8.mjs",
  "_inject-hand-en-slot8.mjs",
  "_gen-fixes-siman-slot8-from-en.mjs",
  "_audit-hand-slot8.mjs",
  "_build-slot8-siman.mjs",
  "_finalize-siman-slot8.mjs",
  "_preflight-fix-siman-slot8.mjs",
  "_checkpoint-remaining-slot8.mjs",
  "_force-seed-hand-slot8.mjs",
  "_seed-hand-slot8-partial.mjs",
  "_fix-hand-preflight-slot8.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-8", WORKER)
    .replaceAll("hand-slot8", "hand-slot10")
    .replaceAll("_slot8-lib.mjs", "_slot10-lib.mjs")
    .replaceAll("-slot8", "-slot10")
    .replaceAll("slot8", "slot10");
  const outName = name.replaceAll("slot8", "slot10");
  return [outName, out];
}

for (const name of CORE) {
  const src = path.join(__dirname, name);
  if (!fs.existsSync(src)) {
    console.error("missing", name);
    continue;
  }
  const [outName, body] = xform(name, fs.readFileSync(src, "utf8"));
  const outPath = path.join(__dirname, outName);
  if (fs.existsSync(outPath)) {
    console.log("skip exists", outName);
    continue;
  }
  fs.writeFileSync(outPath, body, "utf8");
  console.log("wrote", outName);
}

console.log("done");
