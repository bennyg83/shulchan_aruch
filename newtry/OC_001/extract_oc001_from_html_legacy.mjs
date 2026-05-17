/**
 * LEGACY — HTML snapshot extract (AlHaTorah-style DOM). Not used for canonical OC001 workflow.
 *
 * Prefer: `node extract_oc001_from_sefaria_bundle.mjs` (Sefaria `seif-NNN.json` only).
 *
 * Usage:
 *   node extract_oc001_from_html_legacy.mjs [html-path]
 *   node extract_oc001_from_html_legacy.mjs --out output --max-chars 45000
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { load } from "cheerio";
import {
  extractSectionsFromColumn,
  slugFromParshanEl,
  readIfExists,
  SKIP_SLUGS,
} from "../lib/parshan_dom_lib.mjs";
import { serializeBlock, EN_PENDING_DEFAULT } from "./oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_HTML = path.join(__dirname, "OC_001.html");

function parseArgs(argv) {
  let outDir = "output";
  let maxChars = 45000;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out" && argv[i + 1]) outDir = argv[++i];
    else if (argv[i] === "--max-chars" && argv[i + 1]) {
      maxChars = Math.max(5000, Number(argv[++i]) || 45000);
    }
  }
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out" || argv[i] === "--max-chars") {
      i++;
      continue;
    }
    if (!argv[i].startsWith("--")) positional.push(argv[i]);
  }
  const htmlPath = positional[0] ? path.resolve(positional[0]) : DEFAULT_HTML;
  return { htmlPath, outDir, maxChars };
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function extractMechaberRama($, $verse) {
  const $el = $verse.find(".mg-main-shulchanarukh").first();
  if (!$el.length) return "";
  return $el.text().replace(/\s+/g, " ").trim();
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
  const { htmlPath, outDir: outRel, maxChars } = parseArgs(process.argv.slice(2));
  const baseOut = path.join(__dirname, outRel);
  ensureDir(baseOut);

  const htmlRaw = readIfExists(htmlPath);
  const $ = load(htmlRaw);

  const verses = $(".verse[data-num]").toArray().sort((a, b) => {
    const na = Number($(a).attr("data-num")) || 0;
    const nb = Number($(b).attr("data-num")) || 0;
    return na - nb;
  });

  const commentaryOrder = [];
  const seenCommentary = new Set();
  for (const vEl of verses) {
    const $verse = $(vEl);
    $verse.find(".parshan-columns > .parshan").each((_, colEl) => {
      const $col = $(colEl);
      const slug = slugFromParshanEl($col);
      if (!slug || SKIP_SLUGS.has(slug)) return;
      if (seenCommentary.has(slug)) return;
      seenCommentary.add(slug);
      commentaryOrder.push(slug);
    });
  }

  const sourceOrder = ["mechaber", ...commentaryOrder];

  const bySlug = new Map();
  for (const s of sourceOrder) bySlug.set(s, []);

  for (const vEl of verses) {
    const $verse = $(vEl);
    const num = String($verse.attr("data-num") || "").trim();

    const mainHe = extractMechaberRama($, $verse);
    const mechBlock = serializeBlock({
      slug: "mechaber",
      seif: num,
      marker: "main",
      he: mainHe,
      en: EN_PENDING_DEFAULT,
    });
    bySlug.get("mechaber").push(mechBlock);

    const emitted = new Set();
    $verse.find(".parshan-columns > .parshan").each((_, colEl) => {
      const $col = $(colEl);
      const slug = slugFromParshanEl($col);
      if (!slug || emitted.has(slug) || SKIP_SLUGS.has(slug)) return;
      emitted.add(slug);

      const sections = extractSectionsFromColumn($, $col);
      for (const { marker, he } of sections) {
        const heText = String(he || "").trim();
        if (!heText) continue;
        const mk = marker === "_" ? "_" : String(marker).trim() || "_";
        bySlug.get(slug).push(
          serializeBlock({
            slug,
            seif: num,
            marker: mk,
            he: heText,
            en: EN_PENDING_DEFAULT,
          })
        );
      }
    });
  }

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
    oc001Extract: "by-source-legacy-html",
    dictionaryNote:
      "In-house glossary (when applying OC 253 tooling): ../../full_dictionary (1).md",
    generatedAt: new Date().toISOString(),
    html: path.relative(__dirname, htmlPath),
    outputDirectory: outRel,
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
