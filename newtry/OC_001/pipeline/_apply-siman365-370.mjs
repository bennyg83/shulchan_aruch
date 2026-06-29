#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SIMANIM = {
  365: [
    ["mech365-en.mjs", "mechaber"],
    ["bh365-en.mjs", "baer-heitev"],
    ["taz365-en.mjs", "turei-zahav"],
    ["beer365-en.mjs", "beer-hagolah"],
    ["gra365-en.mjs", "beur-hagra"],
    ["biur365-en.mjs", "biur-halacha"],
    ["ma365-en.mjs", "magen-avraham"],
    ["mb365-en.mjs", "mishnah-berurah"],
    ["mh365-en.mjs", "machatzit-hashekel"],
    ["er365-en.mjs", "eliyah-rabbah"],
    ["kaf365-en.mjs", "kaf-hachayyim"],
    ["pm365-en.mjs", "peri-megadim"],
    ["netiv365-en.mjs", "netiv-chayim"],
    ["rae365-en.mjs", "rabbi-akiva-eiger"],
    ["sha365-en.mjs", "shaarei-teshuvah"],
    ["chatam365-en.mjs", "chatam-sofer"],
    ["dag365-en.mjs", "dagul-merevavah"],
    ["yad365-en.mjs", "yad-ephraim"],
  ],
  370: [
    ["mech370-en.mjs", "mechaber"],
    ["bh370-en.mjs", "baer-heitev"],
    ["taz370-en.mjs", "turei-zahav"],
    ["beer370-en.mjs", "beer-hagolah"],
    ["gra370-en.mjs", "beur-hagra"],
    ["biur370-en.mjs", "biur-halacha"],
    ["ma370-en.mjs", "magen-avraham"],
    ["mb370-en.mjs", "mishnah-berurah"],
    ["mh370-en.mjs", "machatzit-hashekel"],
    ["er370-en.mjs", "eliyah-rabbah"],
    ["kaf370-en.mjs", "kaf-hachayyim"],
    ["pm370-en.mjs", "peri-megadim"],
    ["netiv370-en.mjs", "netiv-chayim"],
    ["rae370-en.mjs", "rabbi-akiva-eiger"],
    ["yad370-en.mjs", "yad-ephraim"],
  ],
};

async function loadT(file) {
  const fp = path.join(__dirname, file);
  if (!fs.existsSync(fp)) return null;
  const mod = await import(pathToFileURL(fp).href);
  return mod.t;
}

async function applySiman(siman, maps) {
  const base = path.join(root, "output", `siman_${String(siman).padStart(3, "0")}`);
  const stats = {};
  let missing = [];

  for (const [file, slug] of maps) {
    const t = await loadT(file);
    if (!t) {
      console.warn(`WARN: missing ${file}`);
      continue;
    }
    const dir = path.join(base, slug);
    if (!fs.existsSync(dir)) continue;
    const parts = fs.readdirSync(dir).filter((f) => /^part-\d+\.txt$/.test(f)).sort();
    let count = 0;
    for (const part of parts) {
      const fp = path.join(dir, part);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      const out = blocks
        .map((b) => {
          const key = `${b.seif}:${b.marker || "_"}`;
          if (t[key]) {
            count++;
            return { ...b, en: t[key] };
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
  const { stats, missing } = await applySiman(Number(siman), maps);
  results[siman] = { stats, missing };
  const total = Object.values(stats).reduce((a, b) => a + b, 0);
  console.log(`siman_${siman}: ${total} blocks applied, ${missing.length} missing`);
}

const allMissing = Object.values(results).flatMap((r) => r.missing);
if (allMissing.length) {
  console.error("MISSING:", allMissing.slice(0, 40).join("\n"));
  console.error(`... ${allMissing.length} total missing`);
  process.exit(1);
}

const logPath = path.join(root, "progress.log");
const ts = new Date().toISOString().slice(0, 19);
const lines = [];
for (const siman of [365, 370]) {
  for (const [slug, n] of Object.entries(results[siman].stats)) {
    if (n) lines.push(`${ts} siman_${siman}/${slug} ${n} blocks DONE`);
  }
  const tot = Object.values(results[siman].stats).reduce((a, b) => a + b, 0);
  lines.push(`${ts} siman_${siman} COMPLETE (${tot} blocks)`);
}
fs.appendFileSync(logPath, lines.join("\n") + "\n", "utf8");
console.log("progress.log updated");
console.log("[COMPLETE] Session done — simanim: 365, 370");
