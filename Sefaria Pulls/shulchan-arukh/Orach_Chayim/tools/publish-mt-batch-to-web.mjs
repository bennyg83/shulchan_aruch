/**
 * Publish OC001 machine translations (output/siman_NNN) into the mobile/web corpus.
 * Calls publish-oc-siman.mjs per siman with fast flags (no rebuild, no re-extract).
 *
 * Usage (from Orach_Chayim root):
 *   node tools/publish-mt-batch-to-web.mjs --from 2 --to 697
 *   node tools/publish-mt-batch-to-web.mjs --simanim 308,328,451
 *   node tools/publish-mt-batch-to-web.mjs --from 2 --to 697 --min-translated 5
 *   node tools/publish-mt-batch-to-web.mjs --from 2 --to 697 --write-catalog
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const WORKSPACE = path.resolve(OC, "..", "..", "..");
const OC001_ROOT = path.join(WORKSPACE, "newtry", "OC_001");
const CHECKLIST = path.join(OC001_ROOT, "checklist-output", "checklist.json");
const PUBLISH = path.join(__dirname, "publish-oc-siman.mjs");
const DEFAULT_PUBLIC = path.join(WORKSPACE, "newtry", "OC_Mobile", "oc318-mobile-reader", "public", "corpus", "oc1");

const pad = (n) => String(n).padStart(3, "0");

function parseArgs() {
  let from = 1;
  let to = 697;
  let simanim = null;
  let minTranslated = 1;
  let publicRoot = DEFAULT_PUBLIC;
  let writeCatalog = false;
  let dry = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--simanim" && a[i + 1]) {
      simanim = a[++i]
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => Number.isFinite(n) && n > 0);
    } else if (a[i] === "--min-translated" && a[i + 1]) minTranslated = Math.max(0, Number(a[++i]) || 0);
    else if (a[i] === "--public-root" && a[i + 1]) publicRoot = path.resolve(a[++i]);
    else if (a[i] === "--write-catalog") writeCatalog = true;
    else if (a[i] === "--dry-run") dry = true;
  }
  return { from, to, simanim, minTranslated, publicRoot, writeCatalog, dry };
}

function loadChecklist() {
  if (!fs.existsSync(CHECKLIST)) return null;
  return JSON.parse(fs.readFileSync(CHECKLIST, "utf8"));
}

function hasOc001Tree(siman) {
  if (siman === 1) {
    return (
      fs.existsSync(path.join(OC001_ROOT, "output", "siman_001")) ||
      fs.existsSync(path.join(OC001_ROOT, "output", "mechaber"))
    );
  }
  return fs.existsSync(path.join(OC001_ROOT, "output", `siman_${pad(siman)}`));
}

function pickSimanim({ from, to, simanim, minTranslated }) {
  if (simanim?.length) return simanim.sort((a, b) => a - b);
  const doc = loadChecklist();
  const list = [];
  for (let n = from; n <= to; n++) {
    if (!hasOc001Tree(n)) continue;
    const sec = doc?.sections?.find((s) => s.siman === n);
    const tr = sec?.translated ?? 0;
    if (tr < minTranslated) continue;
    list.push(n);
  }
  return list;
}

function hasMeta(siman) {
  return fs.existsSync(path.join(OC, "simanim", pad(siman), "meta.json"));
}

function publishOne(siman, publicRoot, dry) {
  const args = [
    "--siman",
    String(siman),
    "--public-root",
    publicRoot,
    "--skip-rebuild",
    "--skip-hebrew",
    "--skip-extract",
    "--skip-oc001-dictionary",
    "--skip-seif-en-dictionary",
  ];
  if (dry) {
    console.log("[dry-run] publish-oc-siman", args.join(" "));
    return true;
  }
  const r = spawnSync(process.execPath, [PUBLISH, ...args], {
    cwd: OC,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(`FAILED siman ${siman}\n${(r.stderr || r.stdout || "").slice(-3000)}`);
    return false;
  }
  return true;
}

function writeExtendedCatalog(publicRoot, through) {
  const catalogPath = path.join(publicRoot, "catalog.json");
  let base = { schemaVersion: 1, simanim: [] };
  if (fs.existsSync(catalogPath)) {
    try {
      base = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
    } catch {
      /* keep */
    }
  }
  const bySiman = new Map();
  for (const e of base.simanim || []) {
    if (e && Number.isFinite(Number(e.siman))) bySiman.set(Number(e.siman), { ...e });
  }
  for (let n = 1; n <= through; n++) {
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
  fs.writeFileSync(catalogPath, JSON.stringify({ ...base, schemaVersion: 1, simanim }, null, 2) + "\n", "utf8");
  console.log("Wrote catalog.json through siman", through);
}

const opts = parseArgs();
const list = pickSimanim(opts);
console.log(`Publishing ${list.length} simanim → ${opts.publicRoot}`);
if (!list.length) {
  console.log("Nothing to publish (check --from/--to, output/siman_NNN, checklist).");
  process.exit(0);
}

let ok = 0;
let skip = 0;
let fail = 0;
for (let i = 0; i < list.length; i++) {
  const siman = list[i];
  if (!hasMeta(siman)) {
    console.warn(`[${i + 1}/${list.length}] skip siman ${siman} (no meta.json)`);
    skip++;
    continue;
  }
  console.log(`\n[${i + 1}/${list.length}] siman ${siman}`);
  if (publishOne(siman, opts.publicRoot, opts.dry)) ok++;
  else fail++;
}

if (opts.writeCatalog && !opts.dry) {
  const maxSiman = Math.max(...list, 1);
  writeExtendedCatalog(opts.publicRoot, maxSiman);
}

console.log(`\nDone. ok=${ok} skip=${skip} fail=${fail}`);
if (fail) process.exit(1);
