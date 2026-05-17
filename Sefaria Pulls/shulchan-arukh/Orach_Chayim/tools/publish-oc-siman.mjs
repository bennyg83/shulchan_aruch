/**
 * After translating OC001 blocks under `newtry/OC_001/output/siman_NNN/`, run the same
 * publish chain as `prepare-mobile-oc-simanim.mjs` for a single siman: optional rebuild +
 * Hebrew export + manifest, optional re-extract, glossary on that subtree, import English,
 * wire mechaber, glossary on flat en.html, sync to mobile public corpus.
 *
 * Usage (from Orach_Chayim root):
 *   node tools/publish-oc-siman.mjs --siman 2
 *   node tools/publish-oc-siman.mjs --siman 2 --skip-rebuild --skip-hebrew
 *   node tools/publish-oc-siman.mjs --siman 2 --extract   # re-run OC001 extract (overwrites output/siman_NNN .txt)
 *
 * By default **extract is skipped** so OC001 translations under output/siman_NNN are not wiped.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(OC, "..", "..", "..");
const OC001_ROOT = path.join(WORKSPACE, "newtry", "OC_001");
const APPLY_DICT = path.join(OC001_ROOT, "apply_dictionary_oc001.mjs");
const EXTRACT_SCRIPT = path.join(OC001_ROOT, "extract_oc001_from_sefaria_bundle.mjs");
const DEFAULT_PUBLIC = path.join(WORKSPACE, "newtry", "OC_Mobile", "oc318-mobile-reader", "public", "corpus", "oc1");
const TEMPLATE_MANIFEST = path.join(OC, "simanim", "001", "seif-001", "translated-sources-manifest.json");

const pad = (n) => String(n).padStart(3, "0");

function parseArgs() {
  let siman = NaN;
  let publicRoot = DEFAULT_PUBLIC;
  let skipRebuild = false;
  let skipHebrew = false;
  /** Default true: do not re-extract (would reset English placeholders in output/siman_NNN). */
  let skipExtract = true;
  let skipOc001Dictionary = false;
  let skipSeifEnDictionary = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    else if (a[i] === "--public-root" && a[i + 1]) publicRoot = path.resolve(a[++i]);
    else if (a[i] === "--skip-rebuild") skipRebuild = true;
    else if (a[i] === "--skip-hebrew") skipHebrew = true;
    else if (a[i] === "--skip-extract") skipExtract = true;
    else if (a[i] === "--extract") skipExtract = false;
    else if (a[i] === "--skip-oc001-dictionary") skipOc001Dictionary = true;
    else if (a[i] === "--skip-seif-en-dictionary") skipSeifEnDictionary = true;
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Required: --siman <positive integer>");
  return {
    siman,
    publicRoot,
    skipRebuild,
    skipHebrew,
    skipExtract,
    skipOc001Dictionary,
    skipSeifEnDictionary,
  };
}

function runNode(scriptPath, args, cwd, label) {
  const r = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(`\nFAILED: ${label}\n${(r.stderr || r.stdout || "").slice(-4000)}`);
    process.exit(r.status ?? 1);
  }
}

function readSeifCount(s) {
  const metaPath = path.join(OC, "simanim", pad(s), "meta.json");
  if (!fs.existsSync(metaPath)) throw new Error(`Missing meta.json for siman ${s}`);
  const m = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  const n = Number(m.seif_count);
  if (!Number.isFinite(n) || n < 1) throw new Error(`Bad seif_count in ${metaPath}`);
  return n;
}

function normalizeManifestTemplate(doc) {
  const copy = JSON.parse(JSON.stringify(doc));
  for (const src of copy.sources || []) {
    if (src.slug === "kaf-hachayyim") {
      src.slug = "kaf-hachayim";
      src.dataKey = "kaf_hachayim";
    }
  }
  return copy;
}

function ensureManifestForSeif(templateDoc, siman, seif) {
  const seifDir = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`);
  const manifestPath = path.join(seifDir, "translated-sources-manifest.json");
  if (fs.existsSync(manifestPath)) return;
  fs.mkdirSync(seifDir, { recursive: true });
  const doc = { ...templateDoc, siman, seif };
  fs.writeFileSync(manifestPath, JSON.stringify(doc, null, 2) + "\n", "utf8");
}

const {
  siman,
  publicRoot,
  skipRebuild,
  skipHebrew,
  skipExtract,
  skipOc001Dictionary,
  skipSeifEnDictionary,
} = parseArgs();

if (!fs.existsSync(TEMPLATE_MANIFEST)) {
  console.error("Missing template manifest:", TEMPLATE_MANIFEST);
  process.exit(1);
}
if (!fs.existsSync(EXTRACT_SCRIPT)) {
  console.error("Missing extract script:", EXTRACT_SCRIPT);
  process.exit(1);
}
if (!fs.existsSync(APPLY_DICT)) {
  console.error("Missing apply_dictionary_oc001.mjs:", APPLY_DICT);
  process.exit(1);
}

const seifCount = readSeifCount(siman);
const subdir = `siman_${pad(siman)}`;
const outSiman = path.join(publicRoot, `siman${siman}`);
const templateDoc = normalizeManifestTemplate(JSON.parse(fs.readFileSync(TEMPLATE_MANIFEST, "utf8")));

console.log("Workspace:", WORKSPACE);
console.log("Orach_Chayim:", OC);
console.log(`Publish siman ${siman} (${seifCount} se’ifim) →`, outSiman);

if (!skipRebuild) {
  runNode(path.join(__dirname, "rebuild-by-siman.mjs"), ["--siman", String(siman)], OC, `rebuild siman ${siman}`);
}

if (!skipHebrew) {
  for (let seif = 1; seif <= seifCount; seif++) {
    runNode(
      path.join(__dirname, "export-seif-hebrew.mjs"),
      ["--siman", String(siman), "--seif", String(seif)],
      OC,
      `export Hebrew siman ${siman} seif ${seif}`
    );
    ensureManifestForSeif(templateDoc, siman, seif);
  }
}

if (!skipExtract) {
  runNode(
    EXTRACT_SCRIPT,
    [
      "--siman",
      String(siman),
      "--from",
      "1",
      "--to",
      String(seifCount),
      "--bundle-root",
      path.join(OC, "simanim"),
      "--out-subdir",
      subdir,
    ],
    OC001_ROOT,
    `OC001 extract → output/${subdir}`
  );
}

if (!skipOc001Dictionary) {
  runNode(
    APPLY_DICT,
    ["--root", path.join("output", subdir)],
    OC001_ROOT,
    `OC001 glossary on output/${subdir}`
  );
}

runNode(
  path.join(__dirname, "import-oc001-english-to-seif-en.mjs"),
  ["--siman", String(siman), "--from", "1", "--to", String(seifCount), "--oc001-subdir", subdir],
  OC,
  `import OC001 English siman ${siman}`
);

runNode(
  path.join(__dirname, "wire-mechaber-en-hooks-oc001.mjs"),
  ["--siman", String(siman), "--from", "1", "--to", String(seifCount), "--oc001-subdir", subdir],
  OC,
  `wire mechaber siman ${siman}`
);

if (!skipSeifEnDictionary) {
  for (let seif = 1; seif <= seifCount; seif++) {
    runNode(
      path.join(__dirname, "apply-dictionary-to-seif-en.mjs"),
      ["--siman", String(siman), "--seif", String(seif)],
      OC,
      `HTML glossary siman ${siman} seif ${seif}`
    );
  }
}

fs.mkdirSync(outSiman, { recursive: true });
runNode(
  path.join(__dirname, "sync-translated-siman-to-public.mjs"),
  [
    "--siman",
    String(siman),
    "--from",
    "1",
    "--to",
    String(seifCount),
    "--manifest-template",
    TEMPLATE_MANIFEST,
    "--out",
    outSiman,
  ],
  OC,
  `sync → ${outSiman}`
);

console.log("\nDone. If the mobile app catalog does not list this siman yet, add it to catalog.json, then npm run build in oc318-mobile-reader.");
