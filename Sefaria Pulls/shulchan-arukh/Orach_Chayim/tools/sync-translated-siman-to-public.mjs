/**
 * Copy per-seif translated corpora into a public/ tree and write a seif index.
 *
 * Output layout:
 *   <outRoot>/
 *     seif-index.json
 *     seif-001/translated-sources-manifest.json + <slug>/{he.html,en.html}
 *     seif-002/...
 *
 * Usage (from anywhere):
 *   node tools/sync-translated-siman-to-public.mjs \
 *     --siman 1 --from 1 --to 9 \
 *     --manifest-template simanim/001/seif-001/translated-sources-manifest.json \
 *     --out ../../../newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/siman1
 *
 * Notes:
 * - Copies only sources listed in each seif's own manifest (or the template, if missing).
 * - `en.html` may be empty placeholders; it is still copied if present.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");

const pad = (n) => String(n).padStart(3, "0");

function resolvePathMaybeCwdThenOc(p) {
  if (path.isAbsolute(p)) return p;
  const fromCwd = path.resolve(process.cwd(), p);
  if (fs.existsSync(fromCwd)) return fromCwd;
  return path.join(OC, p);
}

function parseArgs() {
  let siman = 1;
  let from = 1;
  let to = 1;
  let outRel = "";
  let manifestTemplateRel = "simanim/001/seif-001/translated-sources-manifest.json";
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    if (a[i] === "--out" && a[i + 1]) outRel = a[++i];
    if (a[i] === "--manifest-template" && a[i + 1]) manifestTemplateRel = a[++i];
  }
  if (!outRel) throw new Error('Missing --out "<path-to-public-corpus-folder>"');
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Invalid --siman");
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  return {
    siman,
    from,
    to,
    outRoot: path.isAbsolute(outRel) ? outRel : path.resolve(process.cwd(), outRel),
    manifestTemplatePath: resolvePathMaybeCwdThenOc(manifestTemplateRel),
  };
}

function copyFileIfExists(src, dst) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  return true;
}

const { siman, from, to, outRoot, manifestTemplatePath } = parseArgs();
if (!fs.existsSync(manifestTemplatePath)) {
  console.error("Missing manifest template:", manifestTemplatePath);
  process.exit(1);
}

const templateDoc = JSON.parse(fs.readFileSync(manifestTemplatePath, "utf8"));

fs.mkdirSync(outRoot, { recursive: true });

const seifList = [];

for (let seif = from; seif <= to; seif++) {
  const seifDir = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`);
  if (!fs.existsSync(seifDir)) {
    console.warn("Skip (missing seif dir):", seifDir);
    continue;
  }

  const outSeifRoot = path.join(outRoot, `seif-${pad(seif)}`);
  fs.mkdirSync(outSeifRoot, { recursive: true });

  // Manifest: copy from seifDir if present; else write from template with updated seif.
  const manifestPath = path.join(seifDir, "translated-sources-manifest.json");
  const outManifestPath = path.join(outSeifRoot, "translated-sources-manifest.json");
  let manifestDoc = null;
  if (fs.existsSync(manifestPath)) {
    manifestDoc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    fs.copyFileSync(manifestPath, outManifestPath);
  } else {
    manifestDoc = { ...templateDoc, siman, seif };
    fs.writeFileSync(outManifestPath, JSON.stringify(manifestDoc, null, 2), "utf8");
  }

  const sources = (manifestDoc && Array.isArray(manifestDoc.sources)) ? manifestDoc.sources : [];

  let copied = 0;
  for (const s of sources) {
    const slug = s.slug;
    if (!slug) continue;
    const srcDir = path.join(seifDir, slug);
    const he = path.join(srcDir, "he.html");
    const en = path.join(srcDir, "en.html");
    const destDir = path.join(outSeifRoot, slug);
    fs.mkdirSync(destDir, { recursive: true });
    if (copyFileIfExists(he, path.join(destDir, "he.html"))) copied++;
    copyFileIfExists(en, path.join(destDir, "en.html"));
  }

  console.log(`Synced seif-${pad(seif)}: ${copied} he.html copied`);
  seifList.push(seif);
}

fs.writeFileSync(
  path.join(outRoot, "seif-index.json"),
  JSON.stringify({ schemaVersion: 1, siman, seifim: seifList }, null, 2),
  "utf8"
);

console.log("Done. Wrote seif-index.json →", outRoot);

