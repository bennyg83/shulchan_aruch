/**
 * SA_Sandbox/scripts/bundle.mjs
 *
 * Rebuilds per-siman JSON bundles from production corpus en.html/he.html files.
 * Reads  FROM: ../OC_Mobile/oc318-mobile-reader/public/corpus/{volume}/
 * Writes   TO: ./public/bundles/{volume}/simanN.json
 *
 * Usage:
 *   node scripts/bundle.mjs --volume oc1
 *   node scripts/bundle.mjs --volume yd1
 */

import { readFile, writeFile, mkdir, readdir, rename } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const SANDBOX_ROOT = join(__dirname, "..");

function parseVolumeArg() {
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--volume" && a[i + 1]) return a[++i];
  }
  return "oc1";
}

const VOLUME_ID = parseVolumeArg();

// Production corpus (read-only — never written to)
const CORPUS_ROOT = join(
  SANDBOX_ROOT,
  "..",
  "OC_Mobile",
  "oc318-mobile-reader",
  "public",
  "corpus",
  VOLUME_ID
);

// Sandbox bundle output (written here, not in production)
const BUNDLES_DIR = join(SANDBOX_ROOT, "public", "bundles", VOLUME_ID);

const CONCURRENCY = 12;
const pad3 = (n) => String(n).padStart(3, "0");

async function readText(p) {
  try {
    return (await readFile(p, "utf8")).replace(/^﻿/, "").trim();
  } catch {
    return "";
  }
}

function dataKeyOf(s) {
  return s.dataKey || s.slug.replace(/-/g, "_");
}

async function bundleSiman(simanDir) {
  const simanName = basename(simanDir);
  const simanNum = parseInt(simanName.replace("siman", ""), 10);
  if (!Number.isFinite(simanNum)) return null;

  let seifIndex;
  try {
    seifIndex = JSON.parse(await readText(join(simanDir, "seif-index.json")));
  } catch {
    return null;
  }
  const seifims = Array.isArray(seifIndex.seifim) ? seifIndex.seifim : [];
  if (!seifims.length) return null;

  const canonicalSources = [];
  const seenSlugs = new Set();
  for (const sn of seifims) {
    try {
      const m = JSON.parse(
        await readText(join(simanDir, `seif-${pad3(sn)}`, "translated-sources-manifest.json"))
      );
      if (m.sources?.length) {
        for (const s of m.sources) {
          if (!seenSlugs.has(s.slug)) {
            seenSlugs.add(s.slug);
            canonicalSources.push(s);
          }
        }
      }
    } catch { /* skip */ }
  }
  if (!canonicalSources.length) return null;

  const sourceMeta = canonicalSources
    .filter((s) => s.slug !== "mechaber")
    .map((s) => ({ slug: s.slug, title: s.title, dataKey: dataKeyOf(s) }));

  const seifEntries = await Promise.all(
    seifims.map(async (seifNum) => {
      const seifDir = join(simanDir, `seif-${pad3(seifNum)}`);
      let manifest;
      try {
        manifest = JSON.parse(await readText(join(seifDir, "translated-sources-manifest.json")));
      } catch {
        return null;
      }
      const sources = manifest.sources || [];
      const included = sources.filter(
        (s) => s.slug === "mechaber" || s.includeInReader !== false
      );
      const pairs = await Promise.all(
        included.map(async (s) => {
          const [he, en] = await Promise.all([
            readText(join(seifDir, s.slug, "he.html")),
            readText(join(seifDir, s.slug, "en.html")),
          ]);
          return { dk: dataKeyOf(s), slug: s.slug, he, en };
        })
      );
      const seifData = {};
      const includedKeys = [];
      for (const { dk, slug, he, en } of pairs) {
        seifData[dk] = { he, en };
        if (slug !== "mechaber") includedKeys.push(dk);
      }
      seifData._included = includedKeys;
      return [String(seifNum), seifData];
    })
  );

  const data = Object.fromEntries(seifEntries.filter(Boolean));
  return { siman: simanNum, seifim: seifims, sourceMeta, data };
}

async function main() {
  await mkdir(BUNDLES_DIR, { recursive: true });

  const entries = await readdir(CORPUS_ROOT, { withFileTypes: true });
  const simanDirs = entries
    .filter((e) => e.isDirectory() && /^siman\d+$/.test(e.name))
    .map((e) => join(CORPUS_ROOT, e.name))
    .sort((a, b) => {
      const na = parseInt(basename(a).replace("siman", ""), 10);
      const nb = parseInt(basename(b).replace("siman", ""), 10);
      return na - nb;
    });

  console.log(`\n[SA_Sandbox] Bundling ${simanDirs.length} ${VOLUME_ID} simanim`);
  console.log(`  Source:  ${CORPUS_ROOT}`);
  console.log(`  Output:  ${BUNDLES_DIR}\n`);

  const start = Date.now();
  let done = 0;

  for (let i = 0; i < simanDirs.length; i += CONCURRENCY) {
    const batch = simanDirs.slice(i, i + CONCURRENCY);
    const bundles = await Promise.all(batch.map(bundleSiman));
    for (const bundle of bundles) {
      if (!bundle) continue;
      const dest = join(BUNDLES_DIR, `siman${bundle.siman}.json`);
      const tmp = dest + ".tmp";
      await writeFile(tmp, JSON.stringify(bundle), "utf8");
      await rename(tmp, dest);
      done++;
    }
    const pct = Math.round(((i + batch.length) / simanDirs.length) * 100);
    process.stdout.write(`\r  ${i + batch.length}/${simanDirs.length} (${pct}%)...`);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n  Done. ${done} bundles written in ${elapsed}s.\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });
