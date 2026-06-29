import fs from "fs";
import { MANUAL_TRANSLATIONS } from "./_siman1-104-stragglers-translations-manual.mjs";

const auto = JSON.parse(fs.readFileSync("_stragglers-1-104-auto.json", "utf8"));
const TRANSLATIONS = { ...auto, ...MANUAL_TRANSLATIONS };

let out = "export const TRANSLATIONS = {\n";
for (const [k, v] of Object.entries(TRANSLATIONS).sort()) {
  out += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
out += "};\n";
fs.writeFileSync("_siman1-104-stragglers-translations.mjs", out);
console.log("wrote", Object.keys(TRANSLATIONS).length, "keys");
