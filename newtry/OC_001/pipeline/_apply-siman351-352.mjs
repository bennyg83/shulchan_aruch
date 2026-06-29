#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mech351 } from "./mech351-en.mjs";
import { t as bh351 } from "./bh351-en.mjs";
import { t as beer351 } from "./beer351-en.mjs";
import { t as gra351 } from "./gra351-en.mjs";
import { t as biur351 } from "./biur351-en.mjs";
import { t as mb351 } from "./mb351-en.mjs";
import { t as mh351 } from "./mh351-en.mjs";
import { t as ma351 } from "./ma351-en.mjs";
import { t as er351 } from "./er351-en.mjs";
import { t as kaf351 } from "./kaf351-en.mjs";
import { t as pm351 } from "./pm351-en.mjs";
import { t as taz351 } from "./taz351-en.mjs";
import { t as netiv351 } from "./netiv351-en.mjs";
import { t as yad351 } from "./yad351-en.mjs";
import { t as mech352 } from "./mech352-en.mjs";
import { t as bh352 } from "./bh352-en.mjs";
import { t as beer352 } from "./beer352-en.mjs";
import { t as gra352 } from "./gra352-en.mjs";
import { t as biur352 } from "./biur352-en.mjs";
import { t as mb352 } from "./mb352-en.mjs";
import { t as mh352 } from "./mh352-en.mjs";
import { t as ma352 } from "./ma352-en.mjs";
import { t as er352 } from "./er352-en.mjs";
import { t as kaf352 } from "./kaf352-en.mjs";
import { t as pm352 } from "./pm352-en.mjs";
import { t as taz352 } from "./taz352-en.mjs";
import { t as netiv352 } from "./netiv352-en.mjs";
import { t as rae352 } from "./rae352-en.mjs";
import { t as dag352 } from "./dag352-en.mjs";
import { t as yad352 } from "./yad352-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SIMANIM = {
  351: [
    [mech351, "mechaber"],
    [bh351, "baer-heitev"],
    [taz351, "turei-zahav"],
    [beer351, "beer-hagolah"],
    [gra351, "beur-hagra"],
    [biur351, "biur-halacha"],
    [ma351, "magen-avraham"],
    [mb351, "mishnah-berurah"],
    [mh351, "machatzit-hashekel"],
    [er351, "eliyah-rabbah"],
    [kaf351, "kaf-hachayyim"],
    [pm351, "peri-megadim"],
    [netiv351, "netiv-chayim"],
    [yad351, "yad-ephraim"],
  ],
  352: [
    [mech352, "mechaber"],
    [bh352, "baer-heitev"],
    [taz352, "turei-zahav"],
    [beer352, "beer-hagolah"],
    [gra352, "beur-hagra"],
    [biur352, "biur-halacha"],
    [ma352, "magen-avraham"],
    [mb352, "mishnah-berurah"],
    [mh352, "machatzit-hashekel"],
    [er352, "eliyah-rabbah"],
    [kaf352, "kaf-hachayyim"],
    [pm352, "peri-megadim"],
    [netiv352, "netiv-chayim"],
    [rae352, "rabbi-akiva-eiger"],
    [dag352, "dagul-merevavah"],
    [yad352, "yad-ephraim"],
  ],
};

function applySiman(siman, maps) {
  const base = path.join(root, "output", `siman_${String(siman).padStart(3, "0")}`);
  const stats = {};
  let missing = [];

  for (const [t, slug] of maps) {
    const dir = path.join(base, slug);
    if (!fs.existsSync(dir)) continue;
    const fixes = {};
    for (const [k, v] of Object.entries(t)) fixes[k] = v;
    const parts = fs.readdirSync(dir).filter((f) => /^part-\d+\.txt$/.test(f)).sort();
    let count = 0;
    for (const part of parts) {
      const fp = path.join(dir, part);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      const out = blocks
        .map((b) => {
          const key = `${b.seif}:${b.marker || "_"}`;
          if (fixes[key]) {
            count++;
            return { ...b, en: fixes[key] };
          }
          missing.push(`${slug}/${part} ${key}`);
          return b;
        })
        .map(serializeBlock)
        .join("\n\n");
      fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    }
    stats[slug] = count;
  }
  return { stats, missing };
}

const results = {};
for (const [siman, maps] of Object.entries(SIMANIM)) {
  const { stats, missing } = applySiman(Number(siman), maps);
  results[siman] = { stats, missing };
  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  console.log(`siman_${siman}: ${total} blocks applied`);
  if (missing.length) {
    console.error("MISSING:", missing.slice(0, 20).join("\n"));
    process.exit(1);
  }
}

const logPath = path.join(root, "progress.log");
const ts = new Date().toISOString().slice(0, 19).replace("T", "T");
const lines = [];
for (const siman of [351, 352]) {
  for (const [slug, n] of Object.entries(results[siman].stats)) {
    if (n) lines.push(`${ts} siman_${siman}/${slug} ${n} blocks DONE`);
  }
  const tot = Object.values(results[siman].stats).reduce((a, b) => a + b, 0);
  lines.push(`${ts} siman_${siman} COMPLETE (${tot} blocks)`);
}
fs.appendFileSync(logPath, lines.join("\n") + "\n", "utf8");
console.log("progress.log updated");
