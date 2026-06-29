#!/usr/bin/env node
import { MHS_A } from "./_363-p2-mhs-a.mjs";
import { MHS_B } from "./_363-p2-mhs-b.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = {};
for (const src of [MHS_A, MHS_B]) {
  for (const [k, v] of Object.entries(src)) {
    out[k.replace(/^machatzit-hashekel:/, "")] = v;
  }
}
const p = path.join(dir, "_en363-slugs", "machatzit-hashekel.json");
fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`wrote ${Object.keys(out).length} keys to machatzit-hashekel.json`);
