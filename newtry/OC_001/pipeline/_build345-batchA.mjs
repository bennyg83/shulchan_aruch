import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugFiles = [
  ["baer-heitev", "baer345-en.mjs"],
  ["beer-hagolah", "beer345-en.mjs"],
  ["beur-hagra", "gra345-en.mjs"],
  ["biur-halacha", "biur345-en.mjs"],
  ["chokhmat-shlomo", "cs345-en.mjs"],
  ["eliyah-rabbah", "er345-en.mjs"],
  ["kaf-hachayyim", "kaf345-en.mjs"],
  ["machatzit-hashekel", "ms345-en.mjs"],
  ["magen-avraham", "ma345-en.mjs"],
  ["mishnah-berurah", "mb345-en.mjs"],
  ["netiv-chayim", "nc345-en.mjs"],
  ["peri-megadim", "pm345-en.mjs"],
  ["rabbi-akiva-eiger", "rae345-en.mjs"],
  ["shaarei-teshuvah", "st345-en.mjs"],
  ["turei-zahav", "taz345-en.mjs"],
  ["yad-ephraim", "ye345-en.mjs"],
];

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const merged = {};
for (const [slug, file] of slugFiles) {
  const fp = path.join(dir, file);
  if (!fs.existsSync(fp)) {
    console.error(`MISSING: ${file}`);
    process.exit(1);
  }
  const mod = await import(pathToFileURL(fp).href);
  for (const [k, v] of Object.entries(mod.t)) {
    merged[`${slug}:${k}`] = v;
  }
}

const lines = ["export const t = {"];
const keys = Object.keys(merged).sort((a, b) => a.localeCompare(b, "en"));
for (const k of keys) {
  lines.push(`  ${JSON.stringify(k)}: \`${esc(merged[k])}\`,`);
}
lines.push("};");
lines.push("");

const out = path.join(dir, "small345-en.mjs");
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out} — ${keys.length} keys`);
