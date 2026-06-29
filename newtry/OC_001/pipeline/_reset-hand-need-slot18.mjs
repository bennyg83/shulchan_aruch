#!/usr/bin/env node
/** Clear hand-slot18 en for items that fail editorial quality */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const FAIL = [
  /her age|the craft|Saturday|Spike Duma|time sand|optimistic|Capernaum|Quran|Audience\.|from her age|Madger|Rem"a:|Hol Hamoed|Christmas|Fucking|Stupid|Thor and|Gogo war|Gothic/i,
  /\bLord\b/i,
  /&quot;/,
  /Hashem's Word is Hashem|Hashem's promise that Hashem/i,
  /\. \. \. \. \./,
];
let cleared = 0;
for (const it of hand.items) {
  let en = it.en || autoFix(it.enBad || "", it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  const sev = maxSeverity(issues);
  const failPat = FAIL.some((r) => r.test(en));
  if (pf || sev >= SEVERITY.error || failPat) {
    it.en = "";
    cleared++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("siman", siman, "cleared", cleared, "of", hand.items.length);
