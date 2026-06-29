#!/usr/bin/env node
/** Build pipeline/_fixes-simanNNN.mjs from heNNN-export + hand overrides + cite helper */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite433 } from "./lib/translate-cite-433.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("Usage: node _merge-build-fixes-siman.mjs NNN");
  process.exit(1);
}

const BAD = [
  /pending/i, /Lord'?s Prayer/i, /Hashem/i, /strike in/i, /&quot;/, /there in the/i,
  /According to the/i, /\bin me\b/i, /Capernaum/i, /U\.S\./, /PLO|UN in Cologne|KGB/i,
  /T-shirt/i, /Dr\. D/i, /Delave|Delolla/i, /Saturday/i, /hand recoils/i,
  /first dish/i, /allocated/i, /Shield of Abraham/i, /her age/i, /the craft/i,
  /Darbanan/i, /Israelite/i, /Chametz/i, /hametz/i, /Qur'an/i, /Colosse/i,
  /guerna/i, /Wayne/i, /gambler/i, /Spike Darin/i, /oxygen of criminal/i,
  /Mount Wayne/i, /cliche/i, /fee that has found/i, /Pre-Trial/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bIsraelite(s?)\b/g, "Jew$1")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/&quot;/g, '"')
    .replace(/\bone paragraph\b/g, "1 seif")
  .trim();
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_${siman}/${slug}/part-001.txt`;
}

const exportPath = path.join(__dirname, `he${siman}-export.json`);
const handPath = path.join(__dirname, `_hand-en-${siman}.json`);
if (!fs.existsSync(exportPath)) {
  console.error("Missing", exportPath);
  process.exit(1);
}
const exported = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const hand = fs.existsSync(handPath)
  ? JSON.parse(fs.readFileSync(handPath, "utf8"))
  : {};

const dir = path.join(ROOT, `output/siman_${siman}`);
const slugs = fs.readdirSync(dir).filter((s) =>
  fs.existsSync(path.join(dir, s, "part-001.txt"))
);

const fixes = {};
const missing = [];
let fromHand = 0,
  fromSanitize = 0,
  fromCite = 0;

for (const slug of slugs.sort()) {
  const file = rel(slug);
  const abs = path.join(ROOT, file.replace(/\//g, path.sep));
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  fixes[file] = {};
  for (const b of blocks) {
    const k = keyFor(b);
    const hk = `${slug}/${k}`;
    let en =
      hand[hk] ||
      (slug === "beer-hagolah" && isBad(exported[hk]?.en)
        ? translateCite433(b.he)
        : null);
    if (en && slug === "beer-hagolah" && !hand[hk]) fromCite++;
    if (!en) {
      const cur = exported[hk]?.en || b.en || "";
      if (!isBad(cur)) {
        en = sanitizeEn(cur);
        fromSanitize++;
      }
    } else if (hand[hk]) fromHand++;
    if (!en) missing.push(hk);
    else fixes[file][k] = en;
  }
}

const outPath = path.join(__dirname, `_fixes-siman${siman}.mjs`);
fs.writeFileSync(
  outPath,
  `/** siman ${siman} — chametz/Pesach slot3 */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
);
let total = 0;
for (const f of Object.values(fixes)) total += Object.keys(f).length;
console.log(`siman ${siman}: FIXED ${total} hand=${fromHand} sanitize=${fromSanitize} cite=${fromCite} MISSING ${missing.length}`);
if (missing.length) console.log(missing.join("\n"));
