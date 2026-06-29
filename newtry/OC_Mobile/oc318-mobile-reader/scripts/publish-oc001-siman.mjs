/**
 * Publish OC_001 block translations into the mobile/web corpus.
 *
 * Source: newtry/OC_001/output/siman_NNN/<slug>/part-*.txt
 * Target: public/corpus/oc1/simanN/seif-NNN/<slug>/{he.html,en.html}
 *
 * Usage (from oc318-mobile-reader):
 *   node scripts/publish-oc001-siman.mjs --siman 55
 *   node scripts/publish-oc001-siman.mjs --from 1 --to 697
 *
 * SKIP_SLUGS: commentators whose TXT seif fields are sequential (not SA seif numbers).
 * Their HE was remapped directly in corpus — publishing from TXT would clobber that.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, EN_PENDING_DEFAULT } from "../../../OC_001/oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const READER_ROOT = path.resolve(__dirname, "..");
const OC001_OUTPUT = path.resolve(__dirname, "../../../OC_001/output");
const CORPUS_ROOT = path.join(READER_ROOT, "public/corpus/oc1");

// These commentators' TXT seif numbers are sequential (wrong) — their corpus HE
// was remapped directly and must not be overwritten from TXT.
const SKIP_SLUGS = new Set([
  "rabbi-akiva-eiger",
  "chokhmat-shlomo",
  "yad-ephraim",
  "chatam-sofer",
  "shaarei-teshuvah",
]);

const pad3 = (n) => String(n).padStart(3, "0");

function safeWrite(p, content) {
  const tmp = p + ".tmp";
  fs.writeFileSync(tmp, content, "utf8");
  try {
    fs.renameSync(tmp, p);
  } catch {
    // Windows: rename fails if destination exists; unlink then retry
    try { fs.unlinkSync(p); } catch {}
    fs.renameSync(tmp, p);
  }
}

function parseArgs() {
  let siman = null, from = null, to = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = Number(a[++i]);
    else if (a[i] === "--from" && a[i + 1]) from = Number(a[++i]);
    else if (a[i] === "--to" && a[i + 1]) to = Number(a[++i]);
  }
  if (siman != null) { from = siman; to = siman; }
  if (from == null || to == null) throw new Error("Required: --siman N  or  --from N --to M");
  return { from, to };
}

function loadAllBlocksForSlug(simanDir, slug) {
  const dir = path.join(simanDir, slug);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir)
    .filter(n => /^part-\d+\.txt$/i.test(n))
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

const GARBAGE_RE = /terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;

function stripTags(h) { return h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }

function mergeField(blocks, field) {
  const parts = blocks
    .map(b => String(b[field] || "").trim())
    .filter(t => t && t !== EN_PENDING_DEFAULT);
  if (!parts.length) return "";
  return parts.join("<br />\n") + "\n";
}

function publishSiman(siman, stats) {
  const simanDir = path.join(OC001_OUTPUT, `siman_${pad3(siman)}`);
  if (!fs.existsSync(simanDir)) return;

  const slugDirs = fs.readdirSync(simanDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !SKIP_SLUGS.has(d.name))
    .map(d => d.name);

  if (!slugDirs.length) return;

  // Collect all blocks grouped by seif
  const seifMap = new Map(); // seif# -> Map<slug, Block[]>

  for (const slug of slugDirs) {
    const blocks = loadAllBlocksForSlug(simanDir, slug);
    for (const b of blocks) {
      const seif = Number(b.seif);
      if (!seif || seif < 1) continue;
      if (!seifMap.has(seif)) seifMap.set(seif, new Map());
      const bySlug = seifMap.get(seif);
      if (!bySlug.has(slug)) bySlug.set(slug, []);
      bySlug.get(slug).push(b);
    }
  }

  const outRoot = path.join(CORPUS_ROOT, `siman${siman}`);

  for (const [seif, bySlug] of seifMap) {
    const seifDir = path.join(outRoot, `seif-${pad3(seif)}`);
    for (const [slug, blocks] of bySlug) {
      const he = mergeField(blocks, "he");
      const en = mergeField(blocks, "en");
      if (!he && !en) continue;
      const dest = path.join(seifDir, slug);
      fs.mkdirSync(dest, { recursive: true });
      if (he) safeWrite(path.join(dest, "he.html"), he);
      if (en) {
        // Regression guard: don't overwrite if new EN has fewer segments than HE.
        // Corpus HE may have a chapter-title segment that the TXT doesn't include in EN.
        const heSegs = he ? he.split(/<br\s*\/?>/).filter(s => s.trim()).length : 0;
        const newEnSegs = en.split(/<br\s*\/?>/).filter(s => s.trim()).length;
        const existingEn = fs.existsSync(path.join(dest, "en.html"))
          ? fs.readFileSync(path.join(dest, "en.html"), "utf8") : "";
        const existingEnSegs = existingEn.split(/<br\s*\/?>/).filter(s => s.trim()).length;
        const isPlaceholder = !existingEnSegs || existingEn.includes(EN_PENDING_DEFAULT);
        if (!isPlaceholder && existingEnSegs >= heSegs && newEnSegs < heSegs) {
          // New EN would create a mismatch where existing EN was fine — skip.
          stats.wrote++;
          continue;
        }
        // Garbage guard: never overwrite a clean corpus entry with garbage from TXT.
        if (!isPlaceholder && !GARBAGE_RE.test(stripTags(existingEn)) && GARBAGE_RE.test(stripTags(en))) {
          stats.wrote++;
          continue;
        }
        safeWrite(path.join(dest, "en.html"), en);
      }
      stats.wrote++;
    }
  }
}

const { from, to } = parseArgs();
const stats = { wrote: 0 };
let published = 0;

for (let s = from; s <= to; s++) {
  publishSiman(s, stats);
  published++;
  if (published % 100 === 0) process.stdout.write(`  ${s}/${to}...\n`);
}

console.log(`Done. Simanim ${from}–${to} | Corpus entries written: ${stats.wrote}`);
