#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { HAND } from "./hand551-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const badKeys = [1, 2, 3].flatMap((p) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `he551-bad-p${p}.json`), "utf8"))
);
const trimmed = {};
for (const k of badKeys) {
  if (!HAND[k]) throw new Error("missing " + k);
  trimmed[k] = HAND[k];
}
fs.writeFileSync(path.join(__dirname, "hand551-en-trimmed.mjs"), `export const HAND = ${JSON.stringify(trimmed, null, 2)};\n`);
console.log("trimmed", Object.keys(trimmed).length);
