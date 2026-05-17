/**
 * Set sources[].includeInReader on each translated-sources-manifest.json under a siman.
 * Rule (deliberate): substantive Hebrew must exist in that seif's he.html for the slug;
 * otherwise includeInReader=false so the mobile reader skips the commentary entirely.
 *
 * Uses the same htmlHasLetterOrDigit helper as oc318-mobile-reader/src/corpus.js.
 *
 * Usage (from Orach_Chayim root):
 *   node tools/annotate-manifest-include-in-reader.mjs --siman 2
 *   node tools/annotate-manifest-include-in-reader.mjs --from 1 --to 697
 *   node tools/annotate-manifest-include-in-reader.mjs --siman 3 --no-sefaria
 *   node tools/annotate-manifest-include-in-reader.mjs --siman 2 --dry
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(OC, "..", "..", "..");
const CORPUS_JS = path.join(WORKSPACE, "newtry", "OC_Mobile", "oc318-mobile-reader", "src", "corpus.js");
const DEFAULT_PUBLIC_SIMANIM = path.join(WORKSPACE, "newtry", "OC_Mobile", "oc318-mobile-reader", "public", "corpus", "oc1");

const pad = (n) => String(n).padStart(3, "0");

function parseArgs() {
  let fromSim = NaN;
  let toSim = NaN;
  let doSefaria = true;
  let doPublic = true;
  let dry = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) {
      const v = Number(a[++i]);
      fromSim = v;
      toSim = v;
    } else if (a[i] === "--from" && a[i + 1]) fromSim = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) toSim = Number(a[++i]);
    else if (a[i] === "--no-sefaria") doSefaria = false;
    else if (a[i] === "--no-public") doPublic = false;
    else if (a[i] === "--dry") dry = true;
  }
  if (!Number.isFinite(fromSim) || fromSim < 1) {
    throw new Error("Provide --siman N or --from N (with --to M).");
  }
  if (!Number.isFinite(toSim) || toSim < 1) toSim = fromSim;
  if (toSim < fromSim) throw new Error("Invalid range: --to must be >= --from");
  return { fromSim, toSim, doSefaria, doPublic, dry };
}

function listSeifDirs(simanRoot) {
  if (!fs.existsSync(simanRoot)) return [];
  return fs
    .readdirSync(simanRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^seif-\d{3}$/.test(d.name))
    .map((d) => path.join(simanRoot, d.name))
    .sort();
}

function annotateTree({ simanRoot, htmlHasLetterOrDigit, dry, label }) {
  let files = 0;
  let updated = 0;
  for (const seifDir of listSeifDirs(simanRoot)) {
    const manifestPath = path.join(seifDir, "translated-sources-manifest.json");
    if (!fs.existsSync(manifestPath)) continue;
    files++;
    const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const sources = Array.isArray(doc.sources) ? doc.sources : [];
    let changed = false;
    for (const s of sources) {
      if (!s || !s.slug) continue;
      if (s.slug === "mechaber") {
        if ("includeInReader" in s) {
          delete s.includeInReader;
          changed = true;
        }
        continue;
      }
      const hePath = path.join(seifDir, s.slug, "he.html");
      const heRaw = fs.existsSync(hePath) ? fs.readFileSync(hePath, "utf8") : "";
      const he = String(heRaw ?? "").replace(/^\uFEFF/, "").trim();
      const include = htmlHasLetterOrDigit(he);
      if (s.includeInReader !== include) {
        s.includeInReader = include;
        changed = true;
      }
    }
    if (changed && !dry) {
      fs.writeFileSync(manifestPath, JSON.stringify(doc, null, 2) + "\n", "utf8");
      updated++;
    } else if (changed && dry) {
      updated++;
    }
  }
  console.log(`${label}: manifests touched ${files}, ${dry ? "would update" : "updated"} ${updated}`);
}

const { fromSim, toSim, doSefaria, doPublic, dry } = parseArgs();
const { htmlHasLetterOrDigit } = await import(pathToFileURL(CORPUS_JS).href);

if (!fs.existsSync(CORPUS_JS)) {
  console.error("Missing corpus.js:", CORPUS_JS);
  process.exit(1);
}

console.log("Workspace:", WORKSPACE);
console.log(
  "Annotate includeInReader for simanim",
  fromSim,
  "–",
  toSim,
  dry ? "(dry-run)" : ""
);

for (let siman = fromSim; siman <= toSim; siman++) {
  if (doSefaria) {
    const root = path.join(OC, "simanim", pad(siman));
    annotateTree({ simanRoot: root, htmlHasLetterOrDigit, dry, label: `Sefaria siman ${siman}` });
  }
  if (doPublic) {
    const root = path.join(DEFAULT_PUBLIC_SIMANIM, `siman${siman}`);
    annotateTree({ simanRoot: root, htmlHasLetterOrDigit, dry, label: `Public siman ${siman}` });
  }
}

console.log("Done.");
