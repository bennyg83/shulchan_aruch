import fs from "fs";
import { MANUAL_TRANSLATIONS } from "./_siman105-199-stragglers-translations-manual.mjs";

const dump = JSON.parse(fs.readFileSync("_stragglers-105-199-dump.json", "utf8"));
const auto = JSON.parse(fs.readFileSync("_stragglers-105-199-auto.json", "utf8"));

function fixDivine(en) {
  return en
    .replace(/\*\*\*\* END BLOCK \*\*\*\*/g, "")
    .replace(/with God's help/gi, "with Hashem's help")
    .replace(/God's help/gi, "Hashem's help")
    .replace(/God, faithful King/g, "Hashem, faithful King")
    .replace(/"God, faithful/g, '"Hashem, faithful')
    .replace(/the Holy One, blessed be He/g, "Hashem")
    .replace(/Holy One, blessed be He/g, "Hashem")
    .trim();
}

const TRANSLATIONS = { ...auto };
for (const [k, v] of Object.entries(MANUAL_TRANSLATIONS)) {
  if (v != null) TRANSLATIONS[k] = v;
}
for (const [k, v] of Object.entries(MANUAL_TRANSLATIONS)) {
  if (v === null) {
    const row = dump.find((x) => x.k === k);
    if (!row?.en) throw new Error(`no dump en for ${k}`);
    TRANSLATIONS[k] = fixDivine(row.en);
  }
}

let out = "export const TRANSLATIONS = {\n";
for (const [k, v] of Object.entries(TRANSLATIONS).sort()) {
  out += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
out += "};\n";
fs.writeFileSync("_siman105-199-stragglers-translations.mjs", out);
console.log("wrote", Object.keys(TRANSLATIONS).length, "keys");
