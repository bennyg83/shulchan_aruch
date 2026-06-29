import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const dir = path.dirname(fileURLToPath(import.meta.url));

const pairs = [
  ["beer307-en.mjs", "_beer_hagolah307-he.json"],
  ["gra307-en.mjs", "_beur_hagra307-he.json"],
  ["bh307-en.mjs", "_baer_heitev307-he.json"],
  ["taz307-en.mjs", "_turei_zahav307-he.json"],
  ["biur307-en.mjs", "_biur_halacha307-he.json"],
];

const smallSources = {
  "ateret-zekenim": "_ateret_zekenim307-he.json",
  "dagul-merevavah": "_dagul_merevavah307-he.json",
  "chatam-sofer": "_chatam_sofer307-he.json",
  "chokhmat-shlomo": "_chokhmat_shlomo307-he.json",
  "shaarei-teshuvah": "_shaarei_teshuvah307-he.json",
  "rabbi-akiva-eiger": "_rabbi_akiva_eiger307-he.json",
};

let ok = true;

function diff(label, expected, actual) {
  const missing = expected.filter((k) => !actual.includes(k));
  const extra = actual.filter((k) => !expected.includes(k));
  console.log(`${label}: expected=${expected.length} actual=${actual.length}`);
  if (missing.length) {
    console.log("  MISSING:", missing);
    ok = false;
  }
  if (extra.length) {
    console.log("  EXTRA:", extra);
    ok = false;
  }
}

for (const [enFile, heFile] of pairs) {
  const heKeys = Object.keys(JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8")));
  const mod = await import(pathToFileURL(path.join(dir, enFile)).href);
  diff(enFile, heKeys, Object.keys(mod.t));
}

const expectedSmall = [];
for (const [slug, file] of Object.entries(smallSources)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) {
    expectedSmall.push(`${slug}:${k}`);
  }
}
const smallMod = await import(pathToFileURL(path.join(dir, "small307-en.mjs")).href);
diff("small307-en.mjs", expectedSmall, Object.keys(smallMod.t));

console.log(ok ? "ALL KEYS MATCH" : "KEY MISMATCH");
process.exit(ok ? 0 : 1);
