#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ma, mh, mb, biur } from "./_data362-batchB.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

function write(t, heFile, outFile) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const heKeys = Object.keys(he);
  const lines = ["export const t = {"];
  for (const k of heKeys) {
    const v = t[k];
    if (!v) throw new Error(`${outFile} missing ${k}`);
    lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  }
  lines.push("};");
  fs.writeFileSync(path.join(dir, outFile), lines.join("\n") + "\n", "utf8");
  console.log(`${outFile}: ${heKeys.length} keys`);
}

write(ma, "_magen_avraham362-he.json", "ma362-en.mjs");
write(mh, "_machatzit_hashekel362-he.json", "mh362-en.mjs");
write(mb, "_mishnah_berurah362-he.json", "mb362-en.mjs");
write(biur, "_biur_halacha362-he.json", "biur362-en.mjs");
