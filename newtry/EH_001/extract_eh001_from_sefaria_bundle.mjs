/**
 * Build EH001 block files from Sefaria-shaped per-seif bundles only (`seif-NNN.json`).
 *
 * Source: `Sefaria Pulls/shulchan-arukh/Even_HaEzer/simanim/NNN/seif-MMM.json`
 *
 * Usage:
 *   node extract_eh001_from_sefaria_bundle.mjs --siman 1 --from 1 --to 14
 *   npm run bootstrap:eh001-simanim -- --from 1 --to 178 --skip-existing
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { eh001OutputSlugFromLayerKey } from "../lib/even_ha_ezer_layer_slug.mjs";
import { serializeBlock, EN_PENDING_DEFAULT } from "./eh001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(__dirname, "..", "..");

function parseArgs(argv) {
  let siman = 1;
  let from = 1;
  let to = 14;
  let outDir = "output";
  let outSubdir = "";
  let maxChars = 45000;
  let bundleRoot = path.join(
    WORKSPACE_ROOT,
    "Sefaria Pulls",
    "shulchan-arukh",
    "Even_HaEzer",
    "simanim"
  );

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--siman" && argv[i + 1]) siman = Number(argv[++i]);
    else if (argv[i] === "--from" && argv[i + 1]) from = Number(argv[++i]);
    else if (argv[i] === "--to" && argv[i + 1]) to = Number(argv[++i]);
    else if (argv[i] === "--out" && argv[i + 1]) outDir = argv[++i];
    else if (argv[i] === "--out-subdir" && argv[i + 1])
      outSubdir = String(argv[++i]).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    else if (argv[i] === "--max-chars" && argv[i + 1]) {
      maxChars = Math.max(5000, Number(argv[++i]) || 45000);
    } else if (argv[i] === "--bundle-root" && argv[i + 1]) {
      bundleRoot = path.resolve(argv[++i]);
    }
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Invalid --siman");
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  return { siman, from, to, outDir, outSubdir, maxChars, bundleRoot };
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

const HEBREW_MARKERS =
  "\u05d0\u05d1\u05d2\u05d3\u05d4\u05d5\u05d6\u05d7\u05d8\u05d9\u05db\u05dc\u05de\u05e0\u05e1\u05e2\u05e4\u05e6\u05e7\u05e8\u05e9\u05ea";

function markerForSegmentIndex(i) {
  if (i < HEBREW_MARKERS.length) return HEBREW_MARKERS[i];
  return String(i + 1);
}

function blocksFromLayer(layerKey, layer, slug, seifNum) {
  if (!layer || layer === null) return [];
  const seif = String(seifNum);
  const kind = layer.kind;

  if (kind === "html") {
    const he = String(layer.html ?? "").trim();
    if (!he) return [];
    const marker = slug === "mechaber" ? "main" : "_";
    return [
      serializeBlock({
        slug,
        seif,
        marker,
        he,
        en: EN_PENDING_DEFAULT,
      }),
    ];
  }

  if (kind === "segments" && Array.isArray(layer.segments)) {
    const out = [];
    layer.segments.forEach((seg, i) => {
      const he = String(seg).trim();
      if (!he) return;
      out.push(
        serializeBlock({
          slug,
          seif,
          marker: markerForSegmentIndex(i),
          he,
          en: EN_PENDING_DEFAULT,
        })
      );
    });
    return out;
  }

  return [];
}

function writeChunkedSource(baseOut, slug, blocks, maxChars) {
  if (!blocks.length) return { parts: [], totalBlocks: 0 };
  const slugDir = path.join(baseOut, slug);
  ensureDir(slugDir);

  const parts = [];
  let buf = [];
  let chars = 0;
  let part = 1;

  const flush = () => {
    if (!buf.length) return;
    const fname = `part-${String(part).padStart(3, "0")}.txt`;
    const fp = path.join(slugDir, fname);
    fs.writeFileSync(fp, buf.join("\n\n").trimEnd() + "\n", "utf8");
    parts.push({ file: fname, blocks: buf.length });
    part += 1;
    buf = [];
    chars = 0;
  };

  for (const b of blocks) {
    const add = b.length + 2;
    if (buf.length && chars + add > maxChars) flush();
    buf.push(b);
    chars += add;
  }
  flush();

  return {
    parts,
    totalBlocks: blocks.length,
  };
}

function run() {
  const { siman, from, to, outDir: outRel, outSubdir, maxChars, bundleRoot } = parseArgs(
    process.argv.slice(2)
  );
  const pad = (n) => String(n).padStart(3, "0");
  const simanDir = path.join(bundleRoot, pad(siman));

  const firstBundlePath = path.join(simanDir, `seif-${pad(from)}.json`);
  if (!fs.existsSync(firstBundlePath)) {
    console.error("Missing bundle:", firstBundlePath);
    console.error("Run Phase A rebuild or pass --bundle-root to Even_HaEzer/simanim");
    process.exit(1);
  }

  const firstDoc = JSON.parse(fs.readFileSync(firstBundlePath, "utf8"));
  const rawLayerKeys = Object.keys(firstDoc.layers || {});
  const layerKeys = [
    ...rawLayerKeys.filter((k) => k === "mechaber"),
    ...rawLayerKeys.filter((k) => k !== "mechaber"),
  ];
  const sourceOrder = layerKeys.map((k) => eh001OutputSlugFromLayerKey(k));

  const bySlug = new Map();
  for (const k of sourceOrder) bySlug.set(k, []);

  for (let seif = from; seif <= to; seif++) {
    const bundlePath = path.join(simanDir, `seif-${pad(seif)}.json`);
    if (!fs.existsSync(bundlePath)) {
      console.warn("Skip missing:", bundlePath);
      continue;
    }
    const doc = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
    const layers = doc.layers || {};

    for (const layerKey of layerKeys) {
      const slug = eh001OutputSlugFromLayerKey(layerKey);
      const layer = layers[layerKey];
      const blocks = blocksFromLayer(layerKey, layer, slug, seif);
      for (const b of blocks) {
        bySlug.get(slug).push(b);
      }
    }
  }

  const baseOut = outSubdir
    ? path.join(__dirname, outRel, outSubdir)
    : path.join(__dirname, outRel);
  ensureDir(baseOut);

  const manifestSources = [];
  for (const slug of sourceOrder) {
    const blocks = bySlug.get(slug) || [];
    const meta = writeChunkedSource(baseOut, slug, blocks, maxChars);
    manifestSources.push({
      slug,
      directory: slug,
      ...meta,
    });
  }

  const manifest = {
    eh001Extract: "by-source",
    source: "Sefaria Pulls — Even_HaEzer/simanim/NNN/seif-MMM.json (rebuild-by-siman.mjs)",
    dictionaryNote:
      "In-house glossary: ../../full_dictionary (1).md",
    generatedAt: new Date().toISOString(),
    bundleRoot: path.relative(__dirname, bundleRoot),
    siman,
    seifRange: { from, to },
    outputDirectory: outSubdir ? `${outRel}/${outSubdir}` : outRel,
    outSubdir: outSubdir || null,
    sourceOrder,
    maxChunkChars: maxChars,
    sources: manifestSources,
  };

  fs.writeFileSync(
    path.join(baseOut, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  console.log("Output:", baseOut);
  console.log("Source order:", sourceOrder.join(", "));
  console.log("Manifest:", path.join(baseOut, "manifest.json"));
}

run();
