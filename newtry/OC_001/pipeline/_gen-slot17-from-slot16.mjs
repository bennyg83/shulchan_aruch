#!/usr/bin/env node
/** Generate slot17 pipeline scripts from slot16 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-17";

const CORE = [
  "_slot16-lib.mjs",
  "_export-he-slot16.mjs",
  "_inject-hand-en-slot16.mjs",
  "_gen-fixes-siman-slot16-from-en.mjs",
  "_audit-hand-slot16.mjs",
  "_build-slot16-siman.mjs",
  "_finalize-siman-slot16.mjs",
  "_preflight-fix-siman-slot16.mjs",
  "_checkpoint-remaining-slot16.mjs",
  "_force-seed-hand-slot16.mjs",
  "_seed-hand-slot16-partial.mjs",
  "_fix-hand-preflight-slot16.mjs",
  "_run-one-siman-slot16.mjs",
  "_apply-fixes-slot16.mjs",
  "_complete-siman-slot16.mjs",
  "_bootstrap-hand-slot16.mjs",
  "_apply-fixes-part.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-16", WORKER)
    .replaceAll("hand-slot16", "hand-slot17")
    .replaceAll("_slot16-lib.mjs", "_slot17-lib.mjs")
    .replaceAll("-slot16", "-slot17")
    .replaceAll("slot16", "slot17");
  const outName = name.replaceAll("slot16", "slot17");
  return [outName, out];
}

for (const name of CORE) {
  const src = path.join(__dirname, name);
  if (!fs.existsSync(src)) {
    console.error("missing", name);
    continue;
  }
  const [outName, body] = xform(name, fs.readFileSync(src, "utf8"));
  fs.writeFileSync(path.join(__dirname, outName), body, "utf8");
  console.log("wrote", outName);
}

console.log("done");
