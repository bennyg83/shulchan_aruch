#!/usr/bin/env node
/** Generate _363-translations-data-part2.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const slugs = {
  "kaf-hachayyim": "_kaf_hachayyim363-he.json",
  "machatzit-hashekel": "_machatzit_hashekel363-he.json",
  "beer-hagolah": "_beer_hagolah363-he.json",
  "beur-hagra": "_beur_hagra363-he.json",
};

const { T2 } = await import(`./_363-translations-data-part2.mjs?t=${Date.now()}`).catch(() => ({ T2: null }));

// If T2 already complete, validate only
async function validate(T) {
  let total = 0;
  for (const [slug, heFile] of Object.entries(slugs)) {
    const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
    let miss = 0;
    for (const k of Object.keys(he)) {
      const full = `${slug}:${k}`;
      if (!(full in T)) {
        console.error("MISSING", full);
        miss++;
      }
    }
    const n = Object.keys(he).length;
    console.log(`${slug}: ${n} keys${miss ? ` (${miss} missing)` : ""}`);
    total += n;
  }
  console.log(`TOTAL: ${total}`);
  return total;
}

if (T2) {
  await validate(T2);
  process.exit(0);
}
