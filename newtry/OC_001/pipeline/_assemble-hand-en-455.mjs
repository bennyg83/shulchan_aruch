#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const parts = ["_hand-en-455-part-a.json", "_hand-en-455-part-b.json", "_hand-en-455-part-c.json"];
const merged = {};
for (const f of parts) {
  Object.assign(merged, JSON.parse(fs.readFileSync(path.join(__dirname, f), "utf8")));
}
const tz1 = fs.readFileSync(path.join(__dirname, "_hand-en-455-turei-zahav-1.txt"), "utf8").trim();
merged["turei-zahav/1:_"] = tz1;

const out = path.join(__dirname, "_hand-en-455.json");
fs.writeFileSync(out, JSON.stringify(merged, null, 2) + "\n");
const q = JSON.parse(fs.readFileSync(path.join(__dirname, "he455-queue.json"), "utf8"));
const keys = Object.keys(q);
const missing = keys.filter((k) => !merged[k]);
console.log(`Wrote ${out}`);
console.log(`Keys: ${keys.length}, translations: ${Object.keys(merged).length}, missing: ${missing.length}`);
if (missing.length) console.log(missing.join("\n"));
process.exit(missing.length ? 1 : 0);
