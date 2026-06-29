/**
 * SA_Sandbox/scripts/scan.mjs
 *
 * Scans the production corpus en.html files for known garbage MT patterns.
 * Reads  FROM: ../OC_Mobile/oc318-mobile-reader/public/corpus/
 * Writes   TO: ./scan-results/garbage-report.json
 *
 * Usage: node scripts/scan.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SANDBOX_ROOT = path.join(__dirname, "..");

const CORPUS_ROOT = path.join(
  SANDBOX_ROOT,
  "..",
  "OC_Mobile",
  "oc318-mobile-reader",
  "public",
  "corpus"
);

const RESULTS_DIR = path.join(SANDBOX_ROOT, "scan-results");

// Extended garbage pattern — union of all known bad MT phrases
const GARBAGE_RE = /terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|magen avraham anglicized|m\.m\.m|d\.d\.d|her age\b|the craft\b|waker of the dawn|confession of the lord|lord enlightened|lord.*before his eyes.*yahweh|lord'?s (his )?name in vain|lord our god the lord is one.*meaning is hear|a jerusalemite\b|column\b.*\ba jerusalemite|\bcolumn:\s*$|head of maha|chief there\b|gabi p\.|name in the column|you answered as old|always lb\b|star work|in arabic yahar|heat in the east|see it in the west|3rd prayers of confession|hates israel, the lord our god, the lord is one/i;

// Placeholder text pattern — untranslated en.html files
const PLACEHOLDER_RE = /english translation pending|replace after editing this block/i;

const results = { oc1: {}, yd1: {} };
const summary = {
  oc1: { total: 0, garbage: 0, placeholder: 0, empty: 0, clean: 0 },
  yd1: { total: 0, garbage: 0, placeholder: 0, empty: 0, clean: 0 },
};
const garbageBySlug = {};
const placeholderBySlug = {};
const garbageFiles = [];    // flat list of garbage paths
const placeholderFiles = []; // flat list of placeholder paths

function scanVolume(vol) {
  const base = path.join(CORPUS_ROOT, vol);
  if (!fs.existsSync(base)) {
    console.warn(`  [WARN] Volume not found: ${base}`);
    return;
  }

  const simanDirs = fs.readdirSync(base)
    .filter((d) => /^siman\d+$/.test(d))
    .sort((a, b) => parseInt(a.slice(5)) - parseInt(b.slice(5)));

  for (const si of simanDirs) {
    const siPath = path.join(base, si);
    const seifDirs = fs.readdirSync(siPath).filter((d) => /^seif-\d+$/.test(d));

    for (const se of seifDirs) {
      const seifPath = path.join(siPath, se);
      let slugs;
      try {
        slugs = fs.readdirSync(seifPath).filter((s) => {
          try { return fs.statSync(path.join(seifPath, s)).isDirectory(); } catch { return false; }
        });
      } catch { continue; }

      for (const slug of slugs) {
        const enPath = path.join(seifPath, slug, "en.html");
        if (!fs.existsSync(enPath)) continue;

        summary[vol].total++;
        const content = fs.readFileSync(enPath, "utf8").trim();

        if (!content) {
          summary[vol].empty++;
          continue;
        }

        const text = content.replace(/<[^>]+>/g, " ");
        if (GARBAGE_RE.test(text)) {
          summary[vol].garbage++;
          if (!garbageBySlug[slug]) garbageBySlug[slug] = [];
          garbageBySlug[slug].push({ vol, si, se, path: enPath, preview: text.slice(0, 100) });
          if (!results[vol][slug]) results[vol][slug] = [];
          results[vol][slug].push({ si, se, path: enPath });
          garbageFiles.push(enPath);
        } else if (PLACEHOLDER_RE.test(text)) {
          summary[vol].placeholder++;
          if (!placeholderBySlug[slug]) placeholderBySlug[slug] = [];
          placeholderBySlug[slug].push({ vol, si, se, path: enPath });
          placeholderFiles.push(enPath);
        } else {
          summary[vol].clean++;
        }
      }
    }
  }
}

console.log("\n[SA_Sandbox] Scanning corpus for garbage MT patterns...");
console.log(`  Source: ${CORPUS_ROOT}\n`);

scanVolume("oc1");
scanVolume("yd1");

// ── Report ──────────────────────────────────────────────────────────────
console.log("=== GARBAGE SCAN RESULTS ===\n");

const totalGarbage = summary.oc1.garbage + summary.yd1.garbage;
const totalPlaceholder = summary.oc1.placeholder + summary.yd1.placeholder;
const totalFiles = summary.oc1.total + summary.yd1.total;

console.log(`OC1: ${summary.oc1.total} total | ${summary.oc1.garbage} garbage | ${summary.oc1.placeholder} placeholder | ${summary.oc1.empty} empty | ${summary.oc1.clean} clean`);
console.log(`YD1: ${summary.yd1.total} total | ${summary.yd1.garbage} garbage | ${summary.yd1.placeholder} placeholder | ${summary.yd1.empty} empty | ${summary.yd1.clean} clean`);
console.log(`\nTOTAL GARBAGE: ${totalGarbage} | TOTAL PLACEHOLDER: ${totalPlaceholder} | TOTAL BROKEN: ${totalGarbage + totalPlaceholder} / ${totalFiles}\n`);

if (totalGarbage === 0) {
  console.log("✅  No garbage found — corpus is clean!\n");
} else {
  console.log("=== GARBAGE BY COMMENTATOR SLUG ===");
  const slugsSorted = Object.keys(garbageBySlug).sort(
    (a, b) => garbageBySlug[b].length - garbageBySlug[a].length
  );
  for (const slug of slugsSorted) {
    const entries = garbageBySlug[slug];
    const byVol = {};
    for (const e of entries) { byVol[e.vol] = (byVol[e.vol] || 0) + 1; }
    const volStr = Object.entries(byVol).map(([v, n]) => `${v}:${n}`).join(", ");
    console.log(`  ${slug.padEnd(35)} ${entries.length} hits  [${volStr}]`);
  }

  console.log("\n=== SAMPLE GARBAGE PREVIEWS ===");
  for (const slug of slugsSorted.slice(0, 8)) {
    console.log(`\n  [${slug}]`);
    garbageBySlug[slug].slice(0, 3).forEach((e) => {
      console.log(`    ${e.vol}/${e.si}/${e.se}: "${e.preview.replace(/\n/g, " ").slice(0, 80)}"`);
    });
  }
}

if (totalPlaceholder > 0) {
  console.log("\n=== PLACEHOLDER FILES BY SLUG ===");
  const pSlugs = Object.keys(placeholderBySlug).sort(
    (a, b) => placeholderBySlug[b].length - placeholderBySlug[a].length
  );
  for (const slug of pSlugs) {
    const entries = placeholderBySlug[slug];
    const byVol = {};
    for (const e of entries) { byVol[e.vol] = (byVol[e.vol] || 0) + 1; }
    const volStr = Object.entries(byVol).map(([v, n]) => `${v}:${n}`).join(", ");
    console.log(`  ${slug.padEnd(35)} ${entries.length} files  [${volStr}]`);
  }
}

// ── Write JSON report ───────────────────────────────────────────────────
fs.mkdirSync(RESULTS_DIR, { recursive: true });
const report = {
  scannedAt: new Date().toISOString(),
  corpusSource: CORPUS_ROOT,
  summary,
  totalGarbage,
  totalPlaceholder,
  totalBroken: totalGarbage + totalPlaceholder,
  garbageBySlug,
  placeholderBySlug,
  byVolume: results,
  garbageFiles,
  placeholderFiles,
};
const outPath = path.join(RESULTS_DIR, "garbage-report.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`\n  Report written → scan-results/garbage-report.json`);
console.log(`  Flat file list → scan-results/garbage-report.json (.garbageFiles[])\n`);
