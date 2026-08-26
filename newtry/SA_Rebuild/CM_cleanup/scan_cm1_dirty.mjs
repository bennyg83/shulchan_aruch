/**
 * Scan whole CM001 output for residual dirty English (post-ingest).
 *   node scan_cm1_dirty.mjs
 *   node scan_cm1_dirty.mjs --slug beur-hagra
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CM_OUT = path.resolve(__dirname, "../../CM_001/output");
const AUDIT = path.resolve(__dirname, "../audit");

const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const onlySlug = arg("--slug");

const DIRTY_RE =
  /\bthe Lord\b|Lord['']?s Prayer|Hashem['']?s Word|Hashem['']?s people|\bPassover\b|\bPsalms?\b|\bthe Bible\b|\bYahweh\b|\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b|Capernaum|hand recoils|Saturday|Don['']?t fuck|soundtrack from Darren|And thou, Capernaum|apostle|New Testament|\bchurch(?:es)?\b|crucifix|\bislam(?:ic)?\b|koran|qur['']?an|gospel|vatican|trinity/i;
const HEBREW_LEAK = /[\u0590-\u05FF]{2,}/;
const BLOCK_SPLIT = /\*{4}\s*CM001 SOURCE BLOCK\s*\*{4}/i;
const SKIP = new Set(["beer-hagolah", "beer-hagolah-on-shulchan-arukh-choshen-mishpat"]);

function isDirty(en) {
  const t = String(en || "").trim();
  if (!t || /English translation pending/i.test(t)) return true;
  if (DIRTY_RE.test(t)) return true;
  if (HEBREW_LEAK.test(t)) return true;
  return false;
}

function dirtyTerms(en) {
  const terms = [];
  const t = String(en || "");
  const m = t.match(DIRTY_RE);
  if (m) terms.push(m[0]);
  const h = t.match(HEBREW_LEAK);
  if (h) terms.push(`hebrewLeak:${h[0]}`);
  if (!t.trim() || /English translation pending/i.test(t)) terms.push("pending");
  return terms;
}

const bySlug = new Map();
const rows = [];
let total = 0;
let dirty = 0;

for (const simDir of fs.readdirSync(CM_OUT).filter((n) => /^siman_\d+$/.test(n))) {
  const siman = Number(simDir.replace("siman_", ""));
  for (const slug of fs.readdirSync(path.join(CM_OUT, simDir))) {
    if (SKIP.has(slug)) continue;
    if (onlySlug && slug !== onlySlug) continue;
    const d = path.join(CM_OUT, simDir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const fname of fs.readdirSync(d).filter((n) => /^part-\d+\.txt$/i.test(n)).sort()) {
      const text = fs.readFileSync(path.join(d, fname), "utf8");
      const chunks = text.split(BLOCK_SPLIT).slice(1);
      let i = 0;
      for (const chunk of chunks) {
        total++;
        const enM = chunk.match(/\*{4}\s*ENGLISH\s*\*{4}([\s\S]*?)\*{4}\s*END BLOCK\s*\*{4}/);
        const en = enM ? enM[1].trim() : "";
        if (isDirty(en)) {
          dirty++;
          if (!bySlug.has(slug)) bySlug.set(slug, { dirty: 0, bySiman: new Map() });
          const st = bySlug.get(slug);
          st.dirty++;
          st.bySiman.set(siman, (st.bySiman.get(siman) || 0) + 1);
          rows.push({
            siman,
            seif: Number((chunk.match(/^seif:\s*(\d+)/m) || [])[1] || 0),
            slug,
            part_file: fname,
            part_index_in_file: i,
            terms: dirtyTerms(en).join("; "),
          });
        }
        i++;
      }
    }
  }
}

const day = new Date().toISOString().slice(0, 10);
const prefix = path.join(AUDIT, `cm1_dirty_${day}`);
fs.mkdirSync(AUDIT, { recursive: true });

const slugSummary = [...bySlug.entries()]
  .map(([slug, st]) => {
    const simans = [...st.bySiman.keys()].sort((a, b) => a - b);
    return {
      slug,
      dirty: st.dirty,
      simanim_with_dirty: simans.length,
      siman_min: simans[0] ?? null,
      siman_max: simans[simans.length - 1] ?? null,
    };
  })
  .sort((a, b) => b.dirty - a.dirty);

const summary = {
  generated_at: new Date().toISOString(),
  cm_out: CM_OUT,
  only_slug: onlySlug || null,
  total_blocks_scanned: total,
  dirty_blocks: dirty,
  clean_blocks: total - dirty,
  by_slug: slugSummary,
};

fs.writeFileSync(prefix + "_summary.json", JSON.stringify(summary, null, 2));
fs.writeFileSync(prefix + "_rows.json", JSON.stringify(rows, null, 2));

let md = `# CM1 dirty scan — ${day}\n\n`;
md += `Blocks scanned: **${total}** · Dirty: **${dirty}** · Clean: **${total - dirty}**\n\n`;
md += `| Slug | Dirty | Simanim | Range |\n|------|------:|--------:|-------|\n`;
for (const s of slugSummary) {
  md += `| ${s.slug} | ${s.dirty} | ${s.simanim_with_dirty} | ${s.siman_min}-${s.siman_max} |\n`;
}
fs.writeFileSync(prefix + "_REPORT.md", md);

console.log(JSON.stringify(summary, null, 2));
console.log("report", prefix + "_REPORT.md");
