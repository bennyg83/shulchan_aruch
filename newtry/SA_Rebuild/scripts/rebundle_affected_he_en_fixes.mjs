/**
 * Rebundle affected simanim from fix_affected_simanim.json in small batches.
 *   node rebundle_affected_he_en_fixes.mjs --volume yd1 --batch-size 40
 *   node rebundle_affected_he_en_fixes.mjs --volume oc1 --batch-size 40 --offset 0
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../..");
const LIST = path.join(
  REPO,
  "newtry/SA_Rebuild/audit/he_en_segment_mismatch/fix_affected_simanim.json"
);
const BUNDLE_SCRIPT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/scripts/bundle-corpus.mjs"
);
const CORPUS_PARENT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

function arg(name, fallback = null) {
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === `--${name}` && a[i + 1]) return a[++i];
  }
  return fallback;
}

const volume = arg("volume");
const batchSize = parseInt(arg("batch-size", "40"), 10);
const offset = parseInt(arg("offset", "0"), 10);
if (!volume) {
  console.error("Need --volume oc1|yd1|cm1");
  process.exit(1);
}

const all = JSON.parse(fs.readFileSync(LIST, "utf8"));
const simanim = all[volume] || [];
const slice = simanim.slice(offset, offset + batchSize);
console.log(
  `[rebundle] ${volume} offset=${offset} batch=${slice.length}/${simanim.length} → ${slice[0]}…${slice[slice.length - 1]}`
);
if (!slice.length) process.exit(0);

const r = spawnSync(
  process.execPath,
  [
    BUNDLE_SCRIPT,
    "--corpus-root",
    CORPUS_PARENT,
    "--volume",
    volume,
    "--simanim",
    slice.join(","),
  ],
  {
    env: { ...process.env, BUNDLE_CONCURRENCY: "1" },
    stdio: "inherit",
  }
);
process.exit(r.status ?? 1);
