#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { t as mech355 } from "./mech355-en.mjs";
import { t as bh355 } from "./bh355-en.mjs";
import { t as taz355 } from "./taz355-en.mjs";
import { t as beer355 } from "./beer355-en.mjs";
import { t as gra355 } from "./gra355-en.mjs";
import { t as biur355 } from "./biur355-en.mjs";
import { t as ma355 } from "./ma355-en.mjs";
import { t as mb355 } from "./mb355-en.mjs";
import { t as mh355 } from "./mh355-en.mjs";
import { t as er355 } from "./er355-en.mjs";
import { t as kaf355 } from "./kaf355-en.mjs";
import { t as pm355 } from "./pm355-en.mjs";
import { t as netiv355 } from "./netiv355-en.mjs";
import { t as rae355 } from "./rae355-en.mjs";
import { t as yad355 } from "./yad355-en.mjs";
import { t as mech356 } from "./mech356-en.mjs";
import { t as bh356 } from "./bh356-en.mjs";
import { t as taz356 } from "./taz356-en.mjs";
import { t as beer356 } from "./beer356-en.mjs";
import { t as gra356 } from "./gra356-en.mjs";
import { t as biur356 } from "./biur356-en.mjs";
import { t as ma356 } from "./ma356-en.mjs";
import { t as mb356 } from "./mb356-en.mjs";
import { t as mh356 } from "./mh356-en.mjs";
import { t as er356 } from "./er356-en.mjs";
import { t as kaf356 } from "./kaf356-en.mjs";
import { t as pm356 } from "./pm356-en.mjs";
import { t as chatam356 } from "./chatam356-en.mjs";
import { t as yad356 } from "./yad356-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SIMANIM = {
  355: [
    [mech355, "mechaber"],
    [bh355, "baer-heitev"],
    [taz355, "turei-zahav"],
    [beer355, "beer-hagolah"],
    [gra355, "beur-hagra"],
    [biur355, "biur-halacha"],
    [ma355, "magen-avraham"],
    [mb355, "mishnah-berurah"],
    [mh355, "machatzit-hashekel"],
    [er355, "eliyah-rabbah"],
    [kaf355, "kaf-hachayyim"],
    [pm355, "peri-megadim"],
    [netiv355, "netiv-chayim"],
    [rae355, "rabbi-akiva-eiger"],
    [yad355, "yad-ephraim"],
  ],
  356: [
    [mech356, "mechaber"],
    [bh356, "baer-heitev"],
    [taz356, "turei-zahav"],
    [beer356, "beer-hagolah"],
    [gra356, "beur-hagra"],
    [biur356, "biur-halacha"],
    [ma356, "magen-avraham"],
    [mb356, "mishnah-berurah"],
    [mh356, "machatzit-hashekel"],
    [er356, "eliyah-rabbah"],
    [kaf356, "kaf-hachayyim"],
    [pm356, "peri-megadim"],
    [chatam356, "chatam-sofer"],
    [yad356, "yad-ephraim"],
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
    console.error("MISSING:", missing.slice(0, 30).join("\n"));
    console.error(`... ${missing.length} total missing`);
    process.exit(1);
  }
}

const logPath = path.join(root, "progress.log");
const ts = new Date().toISOString().slice(0, 19);
const lines = [];
for (const siman of [355, 356]) {
  for (const [slug, n] of Object.entries(results[siman].stats)) {
    if (n) lines.push(`${ts} siman_${siman}/${slug} ${n} blocks DONE`);
  }
  const tot = Object.values(results[siman].stats).reduce((a, b) => a + b, 0);
  lines.push(`${ts} siman_${siman} COMPLETE (${tot} blocks)`);
}
fs.appendFileSync(logPath, lines.join("\n") + "\n", "utf8");
console.log("progress.log updated");
console.log("[COMPLETE] Session done — simanim: 355, 356");
