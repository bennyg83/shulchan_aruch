#!/usr/bin/env node
/** Generate slot10 pipeline scripts from slot9 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-10";

const CORE = [
  "_slot9-lib.mjs",
  "_export-he-slot9.mjs",
  "_inject-hand-en-slot9.mjs",
  "_gen-fixes-siman-slot9-from-en.mjs",
  "_audit-hand-slot9.mjs",
  "_build-slot9-siman.mjs",
  "_finalize-siman-slot9.mjs",
  "_preflight-fix-siman-slot9.mjs",
  "_checkpoint-remaining-slot9.mjs",
  "_force-seed-hand-slot9.mjs",
  "_seed-hand-slot9-partial.mjs",
  "_fix-hand-preflight-slot9.mjs",
  "_run-one-siman-slot9.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-9", WORKER)
    .replaceAll("hand-slot9", "hand-slot10")
    .replaceAll("_slot9-lib.mjs", "_slot10-lib.mjs")
    .replaceAll("-slot9", "-slot10")
    .replaceAll("slot9", "slot10");
  const outName = name.replaceAll("slot9", "slot10");
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
  fs.writeFileSync(outPath, body, "utf8");
  console.log("wrote", outName);
}

console.log("done");
