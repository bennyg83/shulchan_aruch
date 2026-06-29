#!/usr/bin/env node
/** Assemble _363-translations-data-part2.mjs from chunks */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { KAF } from "./_363-p2-kaf.mjs";
import { MHS_A } from "./_363-p2-mhs-a.mjs";
import { MHS_B } from "./_363-p2-mhs-b.mjs";
import { GRA_A } from "./_363-p2-gra-a.mjs";
import { GRA_B } from "./_363-p2-gra-b.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const beer = JSON.parse(
  fs.readFileSync(path.join(dir, "_363-beer-hagolah-en.json"), "utf8")
);

const T2 = {
  ...KAF,
  ...MHS_A,
  ...MHS_B,
  ...beer,
  ...GRA_A,
  ...GRA_B,
};

const slugs = {
  "kaf-hachayyim": "_kaf_hachayyim363-he.json",
  "machatzit-hashekel": "_machatzit_hashekel363-he.json",
  "beer-hagolah": "_beer_hagolah363-he.json",
  "beur-hagra": "_beur_hagra363-he.json",
};

let total = 0;
for (const [slug, f] of Object.entries(slugs)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  let miss = 0;
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(full in T2)) {
      console.error("MISSING", full);
      miss++;
    }
  }
  console.log(`${slug}: ${Object.keys(he).length}${miss ? ` MISSING ${miss}` : ""}`);
  total += Object.keys(he).length;
}
console.log("T2 total:", Object.keys(T2).length);
if (Object.keys(T2).length !== total) {
  console.error("Count mismatch");
  process.exit(1);
}

const lines = [
  "/** OC siman 363 batch part 2 — kaf-hachayyim, machatzit-hashekel, beer-hagolah, beur-hagra (279 keys) */",
  "export const T2 = {",
];
for (const [k, v] of Object.entries(T2)) {
  lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
}
lines.push("};");
lines.push("");

fs.writeFileSync(
  path.join(dir, "_363-translations-data-part2.mjs"),
  lines.join("\n"),
  "utf8"
);
console.log("Wrote _363-translations-data-part2.mjs");
