/**
 * Prepare Orach Chayim simanim for the OC mobile reader: rebuild bundle slice, export Hebrew,
 * ensure translated-sources-manifest.json per seif, OC001 extract into output/siman_NNN/,
 * import English (where blocks are translated), wire mechaber, optional dictionary, sync to public/.
 *
 * Siman 1 OC001 editorial files live in output/ (flat). Siman 2+ use output/siman_NNN/ via --out-subdir.
 *
 * Usage (from Orach_Chayim root):
 *   node tools/prepare-mobile-oc-simanim.mjs --from 2 --to 20
 *   node tools/prepare-mobile-oc-simanim.mjs --from 3 --to 3 --skip-rebuild
 *   node tools/prepare-mobile-oc-simanim.mjs --from 21 --to 697 --skip-rebuild --skip-extract --write-catalog
 *   node tools/prepare-mobile-oc-simanim.mjs --from 2 --to 20 --apply-dictionary
 *
 * Defaults --public-root to the oc318-mobile-reader public corpus folder under the workspace.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(OC, "..", "..", "..");
const OC001_ROOT = path.join(WORKSPACE, "newtry", "OC_001");
const EXTRACT_SCRIPT = path.join(OC001_ROOT, "extract_oc001_from_sefaria_bundle.mjs");
const DEFAULT_PUBLIC = path.join(WORKSPACE, "newtry", "OC_Mobile", "oc318-mobile-reader", "public", "corpus", "oc1");
const TEMPLATE_MANIFEST = path.join(OC, "simanim", "001", "seif-001", "translated-sources-manifest.json");

const pad = (n) => String(n).padStart(3, "0");

function parseArgs() {
  let from = 2;
  let to = 20;
  let publicRoot = DEFAULT_PUBLIC;
  let skipRebuild = false;
  /** Skip OC001 re-extract (keeps existing newtry/OC_001/output/siman_NNN translations). */
  let skipExtract = false;
  /** After publishing, extend public/corpus/oc1/catalog.json through --to (preserves existing titles). */
  let writeCatalog = false;
  /** Dictionary pass is slow; skip by default for bulk simanim (use --apply-dictionary to run). */
  let skipDictionary = true;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--public-root" && a[i + 1]) publicRoot = path.resolve(a[++i]);
    else if (a[i] === "--skip-rebuild") skipRebuild = true;
    else if (a[i] === "--skip-extract") skipExtract = true;
    else if (a[i] === "--write-catalog") writeCatalog = true;
    else if (a[i] === "--apply-dictionary") skipDictionary = false;
  }
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  return { from, to, publicRoot, skipRebuild, skipExtract, writeCatalog, skipDictionary };
}

function runNode(scriptPath, args, label) {
  const r = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: OC,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(`\nFAILED: ${label}\n${(r.stderr || r.stdout || "").slice(-4000)}`);
    process.exit(r.status ?? 1);
  }
}

function readSeifCount(siman) {
  const metaPath = path.join(OC, "simanim", pad(siman), "meta.json");
  if (!fs.existsSync(metaPath)) throw new Error(`Missing meta.json for siman ${siman}`);
  const m = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  const n = Number(m.seif_count);
  if (!Number.isFinite(n) || n < 1) throw new Error(`Bad seif_count in ${metaPath}`);
  return n;
}

function normalizeManifestTemplate(doc) {
  const copy = JSON.parse(JSON.stringify(doc));
  for (const s of copy.sources || []) {
    if (s.slug === "kaf-hachayyim") {
      s.slug = "kaf-hachayim";
      s.dataKey = "kaf_hachayim";
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

const { from, to, publicRoot, skipRebuild, skipExtract, writeCatalog, skipDictionary } = parseArgs();

if (!fs.existsSync(TEMPLATE_MANIFEST)) {
  console.error("Missing template manifest:", TEMPLATE_MANIFEST);
  process.exit(1);
}
if (!fs.existsSync(EXTRACT_SCRIPT)) {
  console.error("Missing extract script:", EXTRACT_SCRIPT);
  process.exit(1);
}

const templateDoc = normalizeManifestTemplate(JSON.parse(fs.readFileSync(TEMPLATE_MANIFEST, "utf8")));

console.log("Workspace:", WORKSPACE);
console.log("Orach_Chayim:", OC);
console.log("Public corpus root:", publicRoot);

for (let siman = from; siman <= to; siman++) {
  const seifCount = readSeifCount(siman);
  const subdir = `siman_${pad(siman)}`;
  const outSiman = path.join(publicRoot, `siman${siman}`);

  console.log(`\n========== Siman ${siman} · ${seifCount} se’ifim ==========`);

  if (!skipRebuild) {
    runNode(path.join(__dirname, "rebuild-by-siman.mjs"), ["--siman", String(siman)], `rebuild siman ${siman}`);
  }

  for (let seif = 1; seif <= seifCount; seif++) {
    runNode(
      path.join(__dirname, "export-seif-hebrew.mjs"),
      ["--siman", String(siman), "--seif", String(seif)],
      `export Hebrew siman ${siman} seif ${seif}`
    );
    ensureManifestForSeif(templateDoc, siman, seif);
  }

  if (!skipExtract) {
    runNode(
      EXTRACT_SCRIPT,
      ["--siman", String(siman), "--from", "1", "--to", String(seifCount), "--bundle-root", path.join(OC, "simanim"), "--out-subdir", subdir],
      `OC001 extract → output/${subdir}`
    );
  }

  runNode(
    path.join(__dirname, "import-oc001-english-to-seif-en.mjs"),
    ["--siman", String(siman), "--from", "1", "--to", String(seifCount), "--oc001-subdir", subdir],
    `import OC001 English siman ${siman}`
  );

  runNode(
    path.join(__dirname, "wire-mechaber-en-hooks-oc001.mjs"),
    ["--siman", String(siman), "--from", "1", "--to", String(seifCount), "--oc001-subdir", subdir],
    `wire mechaber siman ${siman}`
  );

  if (!skipDictionary) {
    for (let seif = 1; seif <= seifCount; seif++) {
      runNode(
        path.join(__dirname, "apply-dictionary-to-seif-en.mjs"),
        ["--siman", String(siman), "--seif", String(seif)],
        `dictionary siman ${siman} seif ${seif}`
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
    `sync → ${outSiman}`
  );
}

function writeExtendedCatalog(publicRoot, catalogThrough) {
  const catalogPath = path.join(publicRoot, "catalog.json");
  let base = { schemaVersion: 1, simanim: [] };
  if (fs.existsSync(catalogPath)) {
    try {
      base = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
    } catch {
      /* keep default */
    }
  }
  const bySiman = new Map();
  for (const e of base.simanim || []) {
    if (e && Number.isFinite(Number(e.siman))) bySiman.set(Number(e.siman), { ...e });
  }
  for (let n = 1; n <= catalogThrough; n++) {
    if (!bySiman.has(n)) {
      bySiman.set(n, {
        siman: n,
        title: `Siman ${n}`,
        subtitle: "Orach Chayim",
        corpusPath: `/corpus/oc1/siman${n}`,
      });
    }
  }
  const simanim = [...bySiman.keys()]
    .sort((a, b) => a - b)
    .map((k) => bySiman.get(k));
  const out = { ...base, schemaVersion: 1, simanim };
  fs.writeFileSync(catalogPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log("\nWrote catalog.json through siman", catalogThrough, "→", catalogPath);
}

if (writeCatalog) {
  writeExtendedCatalog(publicRoot, to);
}

console.log("\nDone. If you extended the catalog, run npm run build in oc318-mobile-reader.");
