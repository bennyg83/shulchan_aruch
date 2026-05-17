/**
 * Copy only manifest-listed translated sources (he.html + en.html) from a seif
 * folder into a Vite/React public corpus tree for offline fetches.
 *
 * Usage (from repo / Orach_Chayim):
 *   node tools/sync-translated-seif-to-public.mjs \
 *     --manifest simanim/001/seif-001/translated-sources-manifest.json \
 *     --out ../../../newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/seif1
 *
 * --manifest: relative to Orach_Chayim root (next to tools/) unless absolute.
 * --out: relative to process.cwd() unless absolute (so `npm run sync` from the Vite app works).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");

function resolveManifestPath(manifestRel) {
  if (path.isAbsolute(manifestRel)) return manifestRel;
  const fromCwd = path.resolve(process.cwd(), manifestRel);
  if (fs.existsSync(fromCwd)) return fromCwd;
  return path.join(OC, manifestRel);
}

function parseArgs() {
  let manifestRel = "simanim/001/seif-001/translated-sources-manifest.json";
  let outRel = "";
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--manifest" && a[i + 1]) manifestRel = a[++i];
    if (a[i] === "--out" && a[i + 1]) outRel = a[++i];
  }
  if (!outRel) {
    console.error('Missing --out "<path-to-public-corpus-folder>"');
    process.exit(1);
  }
  return {
    manifestPath: resolveManifestPath(manifestRel),
    outRoot: path.isAbsolute(outRel) ? outRel : path.resolve(process.cwd(), outRel),
  };
}

const { manifestPath, outRoot } = parseArgs();
const seifDir = path.dirname(manifestPath);
const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sources = doc.sources || [];

fs.mkdirSync(outRoot, { recursive: true });
fs.writeFileSync(path.join(outRoot, "translated-sources-manifest.json"), JSON.stringify(doc, null, 2), "utf8");

let copied = 0;
for (const s of sources) {
  const slug = s.slug;
  if (!slug) continue;
  const srcDir = path.join(seifDir, slug);
  const he = path.join(srcDir, "he.html");
  const en = path.join(srcDir, "en.html");
  if (!fs.existsSync(he) || !fs.existsSync(en)) {
    console.warn("Skip (missing he or en):", slug);
    continue;
  }
  const destDir = path.join(outRoot, slug);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(he, path.join(destDir, "he.html"));
  fs.copyFileSync(en, path.join(destDir, "en.html"));
  copied++;
  console.log("Copied:", slug);
}

console.log("Done. Manifest +", copied, "source folders →", outRoot);
