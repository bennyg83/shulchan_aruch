#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const KEYS = new Set([
  "baer-heitev/part-001.txt|10:ד",
  "baer-heitev/part-001.txt|30:ב",
  "baer-heitev/part-001.txt|38:א",
  "chokhmat-shlomo/part-001.txt|1:_",
  "eliyah-rabbah/part-001.txt|12:_",
  "kaf-hachayyim/part-001.txt|11:א",
  "kaf-hachayyim/part-001.txt|21:_",
  "kaf-hachayyim/part-001.txt|34:_",
  "levushei-serad/part-001.txt|29:_",
  "levushei-serad/part-001.txt|31:_",
  "levushei-serad/part-001.txt|37:_",
  "levushei-serad/part-001.txt|43:_",
  "levushei-serad/part-001.txt|44:_",
  "levushei-serad/part-001.txt|45:_",
  "machatzit-hashekel/part-001.txt|16:א",
  "machatzit-hashekel/part-001.txt|28:ב",
  "machatzit-hashekel/part-001.txt|31:ב",
  "magen-avraham/part-001.txt|7:_",
  "magen-avraham/part-001.txt|38:_",
  "mishnah-berurah/part-001.txt|1:א",
  "mishnah-berurah/part-001.txt|10:ח",
  "mishnah-berurah/part-001.txt|25:ה",
  "peri-megadim/part-001.txt|35:ב",
]);

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = path.join(ROOT, "output", "siman_128");
const out = {};
for (const [rel, key] of [...KEYS].map((k) => k.split("|"))) {
  const fp = path.join(base, rel);
  for (const b of parseBlocksInFile(fs.readFileSync(fp, "utf8"))) {
    const k = `${b.seif}:${b.marker || "_"}`;
    if (k !== key) continue;
    out[`${rel}|${key}`] = stripHtml(b.he || "");
  }
}
console.log(JSON.stringify(out, null, 2));
