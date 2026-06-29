#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot17-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FAIL = [
  /her age|Spike Duma|time sand|optimistic|Capernaum|Quran|Audience\.|Madger|Rem"a:|Hol Hamoed|Christmas|Fucking|Stupid|Saturday/i,
  /\bLord\b/i,
  /&quot;/,
];

for (const siman of simanim) {
  const p = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
  if (!fs.existsSync(p)) {
    console.log(siman, "no hand");
    continue;
  }
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  const need = hand.items.filter((it) => {
    if (!it.en || !String(it.en).trim()) return true;
    const en = autoFix(it.en, it.marker, it.he || "");
    return (
      preflightFail(en) ||
      maxSeverity(
        runBlockQualityChecks({
          slug: it.slug,
          seif: it.seif,
          marker: it.marker,
          he: it.he,
          en,
        })
      ) >= SEVERITY.warn ||
      FAIL.some((r) => r.test(en))
    );
  });
  const out = path.join(__dirname, "work", `need-slot17-siman-${siman}.json`);
  fs.writeFileSync(
    out,
    JSON.stringify({ siman, count: need.length, items: need }, null, 2) + "\n",
    "utf8"
  );
  console.log("siman", siman, "need", need.length, "->", out);
}
