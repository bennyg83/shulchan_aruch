/**
 * Publish EH_001 block translations into the mobile/web corpus.
 *
 * Source: newtry/EH_001/output/siman_NNN/<slug>/part-*.txt
 * Target: public/corpus/eh1/simanN/seif-NNN/<slug>/{he.html,en.html}
 *
 * Usage (from oc318-mobile-reader):
 *   node scripts/publish-eh001-siman.mjs --siman 1
 *   node scripts/publish-eh001-siman.mjs --from 1 --to 178 --write-catalog
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  COMMENTARY_ORDER,
  PUBLIC_CORPUS_EH1,
  EH001_OUTPUT,
  VOLUME_LABEL,
  SIMAN_MAX,
} from "../../../lib/eh001-volume.mjs";
import { parseBlocksInFile, EN_PENDING_DEFAULT } from "../../../EH_001/eh001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pad3 = (n) => String(n).padStart(3, "0");

function dataKeyOf(slug) {
  return slug.replace(/-/g, "_");
}

function parseArgs() {
  let siman = null;
  let from = null;
  let to = null;
  let publicRoot = PUBLIC_CORPUS_EH1;
  let writeCatalog = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    else if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--public-root" && a[i + 1]) publicRoot = path.resolve(a[++i]);
    else if (a[i] === "--write-catalog") writeCatalog = true;
  }
  if (siman != null) {
    from = siman;
    to = siman;
  }
  if (from == null || to == null) throw new Error("Required: --siman N or --from N --to M");
  return { from, to, publicRoot, writeCatalog };
}

function loadSimanManifest(siman) {
  const p = path.join(EH001_OUTPUT, `siman_${pad3(siman)}`, "manifest.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadAllBlocksForSlug(simanDir, slug) {
  const dir = path.join(simanDir, slug);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((n) => /^part-\d+\.txt$/i.test(n))
    .sort((a, b) => {
      const na = Number((/^part-(\d+)\.txt$/i.exec(a) || [])[1]) || 0;
      const nb = Number((/^part-(\d+)\.txt$/i.exec(b) || [])[1]) || 0;
      return na - nb;
    });
  const blocks = [];
  for (const fname of files) {
    blocks.push(...parseBlocksInFile(fs.readFileSync(path.join(dir, fname), "utf8")));
  }
  return blocks;
}

function mergeHtml(blocks, field) {
  const parts = blocks
    .map((b) => String(b[field] || "").trim())
    .filter((t) => t && t !== EN_PENDING_DEFAULT);
  if (!parts.length) return "";
  return parts.join("<br>\n") + "\n";
}

function blocksForSeif(blocks, seif) {
  return blocks.filter((b) => Number(b.seif) === Number(seif));
}

function buildManifestSources(slugsWithContent) {
  const ordered = [];
  for (const c of COMMENTARY_ORDER) {
    if (!slugsWithContent.has(c.slug)) continue;
    ordered.push({
      slug: c.slug,
      title: c.title,
      long: c.tier === "long",
      dataKey: dataKeyOf(c.slug),
      includeInReader: true,
    });
  }
  for (const slug of slugsWithContent) {
    if (ordered.some((s) => s.slug === slug)) continue;
    ordered.push({
      slug,
      title: slug,
      long: false,
      dataKey: dataKeyOf(slug),
      includeInReader: true,
    });
  }
  return ordered;
}

function publishSiman(siman, publicRoot) {
  const simanDir = path.join(EH001_OUTPUT, `siman_${pad3(siman)}`);
  if (!fs.existsSync(simanDir)) {
    console.warn(`skip siman ${siman}: missing ${simanDir}`);
    return false;
  }

  const meta = loadSimanManifest(siman);
  const seifFrom = meta?.seifRange?.from ?? 1;
  const seifTo = meta?.seifRange?.to ?? seifFrom;
  const outRoot = path.join(publicRoot, `siman${siman}`);
  fs.mkdirSync(outRoot, { recursive: true });

  const slugDirs = fs
    .readdirSync(simanDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const blocksBySlug = new Map();
  for (const slug of slugDirs) {
    const blocks = loadAllBlocksForSlug(simanDir, slug);
    if (blocks.length) blocksBySlug.set(slug, blocks);
  }

  const seifList = [];
  for (let seif = seifFrom; seif <= seifTo; seif++) {
    const slugsWithContent = new Set();
    const outSeif = path.join(outRoot, `seif-${pad3(seif)}`);
    let wroteAny = false;

    for (const [slug, allBlocks] of blocksBySlug) {
      const rowBlocks = blocksForSeif(allBlocks, seif);
      if (!rowBlocks.length) continue;
      const he = mergeHtml(rowBlocks, "he");
      const en = mergeHtml(rowBlocks, "en");
      if (!he && !en) continue;
      slugsWithContent.add(slug);
      const dest = path.join(outSeif, slug);
      fs.mkdirSync(dest, { recursive: true });
      if (he) fs.writeFileSync(path.join(dest, "he.html"), he, "utf8");
      if (en) fs.writeFileSync(path.join(dest, "en.html"), en, "utf8");
      wroteAny = true;
    }

    if (!wroteAny) continue;

    const sources = buildManifestSources(slugsWithContent);
    const manifest = {
      schemaVersion: 1,
      siman,
      seif,
      description: "Published from EH_001/output block files.",
      sources,
    };
    fs.mkdirSync(outSeif, { recursive: true });
    fs.writeFileSync(
      path.join(outSeif, "translated-sources-manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n",
      "utf8"
    );
    seifList.push(seif);
  }

  if (!seifList.length) {
    console.warn(`skip siman ${siman}: no seif content`);
    return false;
  }

  fs.writeFileSync(
    path.join(outRoot, "seif-index.json"),
    JSON.stringify({ schemaVersion: 1, siman, seifim: seifList }, null, 2) + "\n",
    "utf8"
  );
  console.log(`siman ${siman}: ${seifList.length} seifim → ${outRoot}`);
  return true;
}

function writeCatalog(publicRoot) {
  const catalogPath = path.join(publicRoot, "catalog.json");
  const bySiman = new Map();
  if (!fs.existsSync(publicRoot)) {
    fs.writeFileSync(catalogPath, JSON.stringify({ schemaVersion: 1, simanim: [] }, null, 2) + "\n", "utf8");
    return;
  }
  for (const name of fs.readdirSync(publicRoot)) {
    const m = /^siman(\d+)$/.exec(name);
    if (!m) continue;
    const n = Number(m[1]);
    const simanDir = path.join(publicRoot, name);
    if (!fs.existsSync(path.join(simanDir, "seif-index.json"))) continue;
    bySiman.set(n, {
      siman: n,
      title: `Siman ${n}`,
      subtitle: VOLUME_LABEL,
      corpusPath: `/corpus/eh1/siman${n}`,
    });
  }
  const simanim = [...bySiman.keys()]
    .sort((a, b) => a - b)
    .map((k) => bySiman.get(k));
  fs.writeFileSync(
    catalogPath,
    JSON.stringify({ schemaVersion: 1, simanim }, null, 2) + "\n",
    "utf8"
  );
  console.log(`Wrote catalog.json (${simanim.length} simanim) → ${catalogPath}`);
}

const { from, to, publicRoot, writeCatalog: doCatalog } = parseArgs();
if (to > SIMAN_MAX) {
  console.warn(`--to ${to} exceeds SIMAN_MAX ${SIMAN_MAX}; clamping.`);
}
const toClamped = Math.min(to, SIMAN_MAX);

fs.mkdirSync(publicRoot, { recursive: true });

let ok = 0;
for (let s = from; s <= toClamped; s++) {
  if (publishSiman(s, publicRoot)) ok++;
}

if (doCatalog) writeCatalog(publicRoot);
console.log(`\nDone. published=${ok} range=${from}-${toClamped}`);
if (!ok) process.exit(1);
