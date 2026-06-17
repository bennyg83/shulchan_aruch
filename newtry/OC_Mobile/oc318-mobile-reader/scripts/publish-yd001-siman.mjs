/**
 * Publish YD_001 block translations directly into the mobile/web corpus (no Sefaria Pulls tree).
 *
 * Source: newtry/YD_001/output/siman_NNN/<slug>/part-*.txt
 * Target: public/corpus/yd1/simanN/seif-NNN/<slug>/{he.html,en.html}
 *
 * Usage (from oc318-mobile-reader):
 *   node scripts/publish-yd001-siman.mjs --siman 1
 *   node scripts/publish-yd001-siman.mjs --from 1 --to 99 --write-catalog
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { COMMENTARY_ORDER, PUBLIC_CORPUS_YD1, YD001_OUTPUT } from "../../../lib/yd001-volume.mjs";
import { parseBlocksInFile, EN_PENDING_DEFAULT } from "../../../YD_001/yd001_block_lib.mjs";

const YD_MERGED_SIMANIM = {
  168: {
    includes: [169],
    title: "Simanim 168–169",
    comment:
      "Standard Shulchan Aruch numbering: siman 169 (קסט) is merged into siman 168 (קסח–קסט, ribbis via a non-Jew). No separate siman 169 folder.",
  },
};

const YD_SEARCH_INDEX = {
  redirects: { 169: 168 },
  merged: Object.entries(YD_MERGED_SIMANIM).map(([canonical, meta]) => ({
    canonical: Number(canonical),
    includes: meta.includes,
    comment: meta.comment,
  })),
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const READER_ROOT = path.resolve(__dirname, "..");

const pad3 = (n) => String(n).padStart(3, "0");

function dataKeyOf(slug) {
  return slug.replace(/-/g, "_");
}

function parseArgs() {
  let siman = null;
  let from = null;
  let to = null;
  let publicRoot = PUBLIC_CORPUS_YD1;
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
  const p = path.join(YD001_OUTPUT, `siman_${pad3(siman)}`, "manifest.json");
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

function buildManifestSources(simanDir, slugsWithContent) {
  const bySlug = new Map(COMMENTARY_ORDER.map((c) => [c.slug, c]));
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
  const simanDir = path.join(YD001_OUTPUT, `siman_${pad3(siman)}`);
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
    .map((d) => d.name)
    .filter((n) => n !== "manifest.json");

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

    const sources = buildManifestSources(simanDir, slugsWithContent);
    const manifest = {
      schemaVersion: 1,
      siman,
      seif,
      description: "Published from YD_001/output block files.",
      sources,
    };
    fs.mkdirSync(outSeif, { recursive: true });
    fs.writeFileSync(path.join(outSeif, "translated-sources-manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
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

function writeCatalog(publicRoot, through) {
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
    const simanDir = path.join(publicRoot, `siman${n}`);
    if (!fs.existsSync(path.join(simanDir, "seif-index.json"))) continue;
    const merged = YD_MERGED_SIMANIM[n];
    const existing = bySiman.get(n);
    if (!existing) {
      bySiman.set(n, {
        siman: n,
        title: merged?.title ?? `Siman ${n}`,
        subtitle: "Yoreh De'ah",
        corpusPath: `/corpus/yd1/siman${n}`,
        ...(merged
          ? { searchAliases: merged.includes, comment: merged.comment }
          : {}),
      });
    } else if (merged) {
      bySiman.set(n, {
        ...existing,
        title: merged.title,
        searchAliases: merged.includes,
        comment: merged.comment,
      });
    }
  }
  const simanim = [...bySiman.keys()]
    .sort((a, b) => a - b)
    .map((k) => bySiman.get(k));
  const redirects = {};
  for (const m of YD_SEARCH_INDEX.merged) {
    for (const alias of m.includes) redirects[String(alias)] = m.canonical;
  }
  fs.writeFileSync(
    catalogPath,
    JSON.stringify({ schemaVersion: 1, simanim, searchIndex: { redirects, merged: YD_SEARCH_INDEX.merged } }, null, 2) + "\n",
    "utf8"
  );
  console.log(`Wrote catalog.json (${simanim.length} simanim) → ${catalogPath}`);
}

const { from, to, publicRoot, writeCatalog: doCatalog } = parseArgs();
fs.mkdirSync(publicRoot, { recursive: true });

let ok = 0;
for (let s = from; s <= to; s++) {
  if (publishSiman(s, publicRoot)) ok++;
}

if (doCatalog) writeCatalog(publicRoot, to);
console.log(`\nDone. published=${ok} range=${from}-${to}`);
if (!ok) process.exit(1);
