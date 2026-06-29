#!/usr/bin/env node
/** Build fixes from output EN for need blocks, expanding abbreviations via autoFix */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot7-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "need-blocks-292-299.json"), "utf8")
).filter((x) => x.siman === siman);

const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const FIXES = {};
const still = [];

for (const n of need) {
  const fp = path.join(OUT, n.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const [seif, marker] = n.key.includes(":") ? n.key.split(":") : [n.key, "_"];
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(seif) &&
      String(x.marker || "_") === String(marker || "_")
  );
  let en = autoFix(String(b?.en ?? ""), marker, b?.he ?? n.he);
  en = en
    .replace(/\bS"E\b/g, "Shemoneh Esrei")
    .replace(/\bShmone Esrei\b/g, "Shemoneh Esrei")
    .replace(/יבנ"ה/g, "yud-beit-nun-hey")
    .replace(/הנה אל ישועתי/g, "Hinei el yeshuati")
    .replace(/כוס ישועות אשא/g, "Kos yeshuot esa")
    .replace(/ליהודים היתה אורה/g, "LaYehudim hayetah orah")
    .replace(/בורא פרי הגפן/g, "Borei peri hagafen")
    .replace(/והוא רחום/g, "V'hu rachum")
    .replace(/ברכו/g, "Barkhu")
    .replace(/ויהי נועם/g, "V'yehi noam")
    .replace(/צדקתך/g, "Tzedekatcha")
    .replace(/אשרי/g, "Ashrei")
    .replace(/ובא לציון/g, "U'va l'Tzion")
    .replace(/ואני תפלתי/g, "V'ani tfilati")
    .replace(/\{Rama:/g, "{Rama:")
    .replace(/&quot;/g, '"');
  const issues = runBlockQualityChecks({ slug: b?.slug, seif, marker, he: b?.he, en });
  const bad = preflightFail(en) || maxSeverity(issues) >= SEVERITY.warn;
  if (!FIXES[n.rel]) FIXES[n.rel] = {};
  FIXES[n.rel][n.key] = en;
  if (bad) still.push({ rel: n.rel, key: n.key, issues: issues.map((i) => i.code), pf: preflightFail(en) });
}

const outPath = path.join(__dirname, `_fixes-siman${siman}-slot7.mjs`);
fs.writeFileSync(
  outPath,
  `/** worker-slot-7 — siman ${siman} fixes from output (${need.length} blocks) */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`,
  "utf8"
);
console.log("wrote", outPath, "still bad", still.length);
if (still.length) console.log(JSON.stringify(still, null, 2));
