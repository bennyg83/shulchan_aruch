/**
 * Prepare a siman slice for the translated reader flow:
 * - export Hebrew to simanim/NNN/seif-NNN/<slug>/he.html (from seif-NNN.json layers)
 * - ensure translated-sources-manifest.json exists per seif (copied from a template manifest)
 * - ensure every manifest-listed source has an en.html (empty placeholder if missing)
 * - apply in-house glossary to each en.html
 *
 * Usage (from Orach_Chayim root):
 *   node tools/prepare-translated-siman-slice.mjs --siman 1 --from 1 --to 9
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");

function parseArgs() {
  let siman = 1;
  let from = 1;
  let to = 1;
  let template = "simanim/001/seif-001/translated-sources-manifest.json";
  let refreshManifest = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    if (a[i] === "--template" && a[i + 1]) template = a[++i];
    if (a[i] === "--refresh-manifest") refreshManifest = true;
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Invalid --siman");
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  return { siman, from, to, template, refreshManifest };
}

const pad = (n) => String(n).padStart(3, "0");

function runNode(scriptRelToTools, args) {
  const scriptAbs = path.join(__dirname, scriptRelToTools);
  const r = spawnSync(process.execPath, [scriptAbs, ...args], { encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error(`Failed: node ${path.basename(scriptAbs)} ${args.join(" ")}\n${(r.stderr || r.stdout || "").trim()}`);
  }
}

function copyManifestTemplate(templateAbs, outPath, siman, seif) {
  const doc = JSON.parse(fs.readFileSync(templateAbs, "utf8"));
  doc.siman = siman;
  doc.seif = seif;
  doc.description = `Prepared for translation pipeline. Slugs match folder names under this directory.`;
  fs.writeFileSync(outPath, JSON.stringify(doc, null, 2), "utf8");
}

function ensureEnPlaceholders(seifDir, manifestPath) {
  const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const sources = doc.sources || [];
  for (const s of sources) {
    if (!s.slug) continue;
    const srcDir = path.join(seifDir, s.slug);
    fs.mkdirSync(srcDir, { recursive: true });
    const en = path.join(srcDir, "en.html");
    if (!fs.existsSync(en)) {
      fs.writeFileSync(en, "", "utf8");
    }
  }
}

function normalizeNewlines(s) {
  return String(s || "").replace(/\r\n/g, "\n");
}

function trimManifestToActualEnglish(seifDir, manifestPath) {
  const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const src = Array.isArray(doc.sources) ? doc.sources : [];
  const bySlug = new Map(src.map((s) => [s.slug, s]));
  const mechaber = bySlug.get("mechaber");
  if (!mechaber) {
    throw new Error(`Manifest missing required source: mechaber (${path.relative(OC, manifestPath)})`);
  }

  const keep = [mechaber];
  for (const s of src) {
    if (!s?.slug) continue;
    if (s.slug === "mechaber") continue;
    const enPath = path.join(seifDir, s.slug, "en.html");
    if (!fs.existsSync(enPath)) continue;
    const en = normalizeNewlines(fs.readFileSync(enPath, "utf8")).trim();
    if (en.length === 0) continue;
    keep.push(s);
  }

  doc.sources = keep;
  fs.writeFileSync(manifestPath, JSON.stringify(doc, null, 2), "utf8");
  return keep.length;
}

const { siman, from, to, template, refreshManifest } = parseArgs();
const templateAbs = path.isAbsolute(template) ? template : path.join(OC, template);
if (!fs.existsSync(templateAbs)) {
  console.error("Missing template manifest:", templateAbs);
  process.exit(1);
}

for (let seif = from; seif <= to; seif++) {
  const simanDir = path.join(OC, "simanim", pad(siman));
  const seifBundle = path.join(simanDir, `seif-${pad(seif)}.json`);
  if (!fs.existsSync(seifBundle)) {
    console.warn("Skip (missing bundle):", path.relative(OC, seifBundle));
    continue;
  }

  console.log(`\n== Siman ${siman} · Seif ${seif} ==`);

  // Hebrew export (creates simanim/NNN/seif-NNN/<slug>/he.html)
  runNode("export-seif-hebrew.mjs", ["--siman", String(siman), "--seif", String(seif)]);

  const seifDir = path.join(simanDir, `seif-${pad(seif)}`);
  const manifestPath = path.join(seifDir, "translated-sources-manifest.json");
  if (refreshManifest || !fs.existsSync(manifestPath)) {
    copyManifestTemplate(templateAbs, manifestPath, siman, seif);
    console.log("Wrote manifest:", path.relative(OC, manifestPath));
  }

  ensureEnPlaceholders(seifDir, manifestPath);

  const kept = trimManifestToActualEnglish(seifDir, manifestPath);
  console.log("Manifest sources kept:", kept);

  // Glossary pass on every en.html
  runNode("apply-dictionary-to-seif-en.mjs", ["--siman", String(siman), "--seif", String(seif)]);
}

console.log("\nDone.");

