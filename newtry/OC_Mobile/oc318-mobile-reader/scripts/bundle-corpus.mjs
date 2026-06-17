/**
 * bundle-corpus.mjs
 *
 * Bundles all per-seif corpus files into per-siman JSON bundles.
 * Output: public/corpus/oc1/bundles/simanN.json  (one file per siman)
 *
 * Run:  node scripts/bundle-corpus.mjs
 *
 * Each bundle contains every seif's Hebrew + English content for all
 * "includeInReader" commentators, keyed by dataKey.  The PWA service
 * worker precaches these 697 files (~21 MB compressed) so the app
 * works fully offline after the first install.
 */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

function parseVolumeArg() {
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--volume" && a[i + 1]) return a[++i];
  }
  return "oc1";
}

const VOLUME_ID = parseVolumeArg();
const CORPUS_ROOT = join(ROOT, "public", "corpus", VOLUME_ID);
const BUNDLES_DIR = join(CORPUS_ROOT, "bundles");

/** How many simanim to process in parallel. */
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

  // ── Read seif-index.json ──────────────────────────────────────────
  let seifIndex;
  try {
    seifIndex = JSON.parse(await readText(join(simanDir, "seif-index.json")));
  } catch {
    return null;
  }
  const seifims = Array.isArray(seifIndex.seifim) ? seifIndex.seifim : [];
  if (!seifims.length) return null;

  // ── Canonical source meta (from first available manifest) ─────────
  let canonicalSources = [];
  for (const sn of seifims) {
    try {
      const m = JSON.parse(
        await readText(
          join(simanDir, `seif-${pad3(sn)}`, "translated-sources-manifest.json")
        )
      );
      if (m.sources?.length) {
        canonicalSources = m.sources;
        break;
      }
    } catch {
      /* try next seif */
    }
  }
  if (!canonicalSources.length) return null;

  // sourceMeta: ordered list of non-mechaber sources with title + dataKey
  const sourceMeta = canonicalSources
    .filter((s) => s.slug !== "mechaber")
    .map((s) => ({ slug: s.slug, title: s.title, dataKey: dataKeyOf(s) }));

  // ── Build per-seif data (all seifim in parallel) ──────────────────
  const seifEntries = await Promise.all(
    seifims.map(async (seifNum) => {
      const seifDir = join(simanDir, `seif-${pad3(seifNum)}`);

      let manifest;
      try {
        manifest = JSON.parse(
          await readText(join(seifDir, "translated-sources-manifest.json"))
        );
      } catch {
        return null;
      }

      const sources = manifest.sources || [];
      // mechaber always included; others only if includeInReader !== false
      const included = sources.filter(
        (s) => s.slug === "mechaber" || s.includeInReader !== false
      );

      // Read he/en for each included source in parallel (both files per source)
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

  // Assemble data map (skip any seifs that failed to load)
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

  console.log(`Bundling ${simanDirs.length} ${VOLUME_ID} simanim → ${BUNDLES_DIR}`);
  const start = Date.now();
  let done = 0;

  for (let i = 0; i < simanDirs.length; i += CONCURRENCY) {
    const batch = simanDirs.slice(i, i + CONCURRENCY);
    const bundles = await Promise.all(batch.map(bundleSiman));

    for (const bundle of bundles) {
      if (!bundle) continue;
      await writeFile(
        join(BUNDLES_DIR, `siman${bundle.siman}.json`),
        JSON.stringify(bundle),
        "utf8"
      );
      done++;
    }

    const pct = Math.round(((i + batch.length) / simanDirs.length) * 100);
    process.stdout.write(`\r  ${i + batch.length}/${simanDirs.length} (${pct}%)...`);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone. ${done} bundles written in ${elapsed}s.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
