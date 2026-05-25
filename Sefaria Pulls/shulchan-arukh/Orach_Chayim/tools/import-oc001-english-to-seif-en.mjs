/**
 * Publish OC_001 **English** translations into the Sefaria Pulls corpus tree (en.html only).
 *
 * Source (editorial / block workspace): `newtry/OC_001/output/<oc001-slug>/part-*.txt`
 * Target (what the app loads): `simanim/NNN/seif-NNN/<sefaria-slug>/en.html`
 *
 * Hebrew is **not** taken from AlHaTorah here. The reader’s `he.html` files must come from the
 * Sefaria-shaped per-seif bundle via:
 *   `node tools/export-seif-hebrew.mjs --siman <n> --seif <k>`
 * (reads `seif-NNN.json` → `layers.*`.) Run that after bundle updates; run this script when
 * OC001 English blocks change.
 *
 * Alignment: Sefaria `segments` layers split one commentary into several OC001 rows (א, ב, …).
 * This script merges all translated English rows for one seif into a single `en.html`
 * fragment (joined with `<br>`), matching one English panel per commentary per seif.
 *
 * Safety:
 * - atomic write + backup when content changes
 * - skips EN_PENDING_DEFAULT segments when merging
 *
 * Mechaber is skipped: keep inline `<i data-commentator …>` hooks from the bundle; use
 * `node tools/wire-mechaber-en-hooks-oc001.mjs` for mechaber English.
 *
 * Usage (from Orach_Chayim root):
 *   node tools/import-oc001-english-to-seif-en.mjs --siman 1 --from 1 --to 9
 *   node tools/import-oc001-english-to-seif-en.mjs --siman 2 --from 1 --to 6 --oc001-subdir siman_002
 *   node tools/import-oc001-english-to-seif-en.mjs --siman 1 --seif 3
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { parseBlocksInFile, EN_PENDING_DEFAULT } from "../../../../newtry/OC_001/oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(OC, "..", "..", ".."); // .../Sefaria Pulls/..../Orach_Chayim -> workspace root

const OC001_OUTPUT_BASE = path.join(WORKSPACE_ROOT, "newtry", "OC_001", "output");

const pad = (n) => String(n).padStart(3, "0");

/**
 * Sefaria `seif-NNN/<slug>/` folder name → `newtry/OC_001/output/<folder>/` name.
 * Most names match; only list exceptions (OC001 extract used alternate spellings).
 */
const SEFARIA_TO_OC001 = {
  "kaf-hachayim": "kaf-hachayyim",
};

function oc001SlugForSefariaSlug(sefariaSlug) {
  return SEFARIA_TO_OC001[sefariaSlug] ?? sefariaSlug;
}

function parseArgs() {
  let siman = 1;
  let seif = null;
  let from = null;
  let to = null;
  let oc001Subdir = "";
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    else if (a[i] === "--seif" && a[i + 1]) seif = Number(a[++i]);
    else if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
    else if (a[i] === "--oc001-subdir" && a[i + 1]) oc001Subdir = String(a[++i]).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  }
  if (!Number.isFinite(siman) || siman < 1) throw new Error("Invalid --siman");

  if (seif != null) {
    from = Number(seif);
    to = Number(seif);
  } else {
    if (from == null) from = 1;
    if (to == null) to = from;
  }
  if (!Number.isFinite(from) || from < 1) throw new Error("Invalid --from/--seif");
  if (!Number.isFinite(to) || to < from) throw new Error("Invalid --to");
  const oc001Out = oc001Subdir ? path.join(OC001_OUTPUT_BASE, oc001Subdir) : OC001_OUTPUT_BASE;
  return { siman, from, to, oc001Out };
}

function sha(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

function writeAtomicWithBackup(targetPath, contents) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const tmp = `${targetPath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, contents, "utf8");

  if (fs.existsSync(targetPath)) {
    const before = sha(targetPath);
    const after = sha(tmp);
    if (before === after) {
      fs.unlinkSync(tmp);
      return { changed: false, backup: null };
    }
    const bak = `${targetPath}.bak-${new Date().toISOString().replace(/[:.]/g, "-")}`;
    fs.copyFileSync(targetPath, bak);
    fs.renameSync(tmp, targetPath);
    return { changed: true, backup: bak };
  }

  fs.renameSync(tmp, targetPath);
  return { changed: true, backup: null };
}

/** Load blocks from every part-NNN.txt under an OC001 commentary folder (stable order). */
function loadAllBlocksForSlug(oc001OutRoot, oc001Slug) {
  const dir = path.join(oc001OutRoot, oc001Slug);
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
    const raw = fs.readFileSync(path.join(dir, fname), "utf8");
    blocks.push(...parseBlocksInFile(raw));
  }
  return blocks;
}

function blocksForSeif(blocks, seif) {
  return blocks.filter((b) => Number(b.seif) === Number(seif));
}

/** Plain English paragraphs only (no per-row marker headers — one panel per seif). */
function mergeEnglishHtml(blocksForSeif) {
  const parts = blocksForSeif
    .map((b) => String(b.en || "").trim())
    .filter((en) => en && en !== EN_PENDING_DEFAULT);
  if (!parts.length) return "";
  return parts.join("<br>\n") + "\n";
}

function importSlugForSeif({ oc001OutRoot, siman, seif, sefariaSlug, oc001Slug }) {
  if (!oc001Slug) return { status: "skip", reason: "no oc001 mapping" };
  const allBlocks = loadAllBlocksForSlug(oc001OutRoot, oc001Slug);
  if (!allBlocks.length) return { status: "skip", reason: "missing oc001 file" };

  const rowBlocks = blocksForSeif(allBlocks, seif);
  if (!rowBlocks.length) return { status: "skip", reason: "no blocks for this seif" };

  const enHtml = mergeEnglishHtml(rowBlocks);
  if (!enHtml) return { status: "skip", reason: "no translated English" };

  const enPath = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`, sefariaSlug, "en.html");
  const rEn = writeAtomicWithBackup(enPath, enHtml);
  return {
    status: rEn.changed ? "updated" : "nochange",
    outPath: enPath,
    backup: rEn.backup,
    blocks: rowBlocks.length,
  };
}

const { siman, from, to, oc001Out } = parseArgs();

for (let seif = from; seif <= to; seif++) {
  const seifDir = path.join(OC, "simanim", pad(siman), `seif-${pad(seif)}`);
  if (!fs.existsSync(seifDir)) {
    console.log(`seif-${pad(seif)}: missing dir`);
    continue;
  }
  console.log(`\n== Publish OC_001 English → Sefaria Pulls · Siman ${siman} · Seif ${seif} ==`);

  const slugs = fs
    .readdirSync(seifDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const sg of slugs) {
    if (sg === "mechaber") {
      console.log(`${sg}: skip (hooks — run tools/wire-mechaber-en-hooks-oc001.mjs)`);
      continue;
    }
    const oc001 = oc001SlugForSefariaSlug(sg);
    const res = importSlugForSeif({ oc001OutRoot: oc001Out, siman, seif, sefariaSlug: sg, oc001Slug: oc001 });
    if (res.status === "updated")
      console.log(`${sg}: UPDATED (merged ${res.blocks} OC001 row(s) → en.html in Sefaria tree)`);
    else if (res.status === "nochange") console.log(`${sg}: ok (no change)`);
    else console.log(`${sg}: skip (${res.reason})`);
  }
}

