#!/usr/bin/env node
/** Rebuild translations: dump base + OVERRIDES + hand maps + polish */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { polishMtStragglers } from "./_lib-polish-mt-stragglers.mjs";
import { OVERRIDES } from "./_siman501-697-stragglers-overrides.mjs";

const OC_ROOT = path.dirname(fileURLToPath(import.meta.url));
const dump = JSON.parse(
  fs.readFileSync(path.join(OC_ROOT, "_stragglers-501-697-dump.json"), "utf8"),
);
const { TRANSLATIONS: prev } = await import("./_siman501-697-stragglers-translations.mjs");

const TRANSLATIONS = {};
let ov = 0;
let prevEn = 0;
for (const x of dump) {
  const [siman, slug, seif, marker] = x.k.split("|");
  let en = OVERRIDES[x.k];
  if (en) {
    ov++;
  } else {
    en = prev[x.k] ?? x.en ?? "";
    prevEn++;
  }
  en = polishMtStragglers(en, { seif, marker });
  TRANSLATIONS[x.k] = en;
}

const outPath = path.join(OC_ROOT, "_siman501-697-stragglers-translations.mjs");
const header = `/** simanim 501–697 stragglers — ${dump.length} blocks (${ov} overrides) */\n`;
fs.writeFileSync(
  outPath,
  `${header}export const TRANSLATIONS = ${JSON.stringify(TRANSLATIONS, null, 2)};\n`,
  "utf8",
);
console.log(`Wrote ${dump.length} keys: overrides=${ov} prev=${prevEn}`);
