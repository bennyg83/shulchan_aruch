/**
 * Inventory CM_001 output: pending vs translated, by slug.
 *   node inventory_cm001.mjs
 */
import fs from "fs";
import path from "path";

const CM_OUT =
  process.argv[2] ||
  "C:/Users/binya/Downloads/Shulchan Aruch2/newtry/CM_001/output";

const PENDING_RE = /English translation pending/i;
const BLOCK_SPLIT = /\*{4}\s*CM001 SOURCE BLOCK\s*\*{4}/i;

function parseBlocks(text) {
  const chunks = text.split(BLOCK_SPLIT).slice(1);
  if (chunks.length) return chunks;
  // fallback: count ENGLISH sections
  const m = text.match(/\*{4}\s*ENGLISH\s*\*{4}/g);
  return m ? m.map(() => "") : [];
}

function enOf(chunk) {
  const m = chunk.match(/\*{4}\s*ENGLISH\s*\*{4}([\s\S]*?)\*{4}\s*END BLOCK\s*\*{4}/);
  return m ? m[1].trim() : "";
}

const sims = fs.readdirSync(CM_OUT).filter((n) => /^siman_\d+$/.test(n)).sort();
const bySlug = new Map();
let totalFiles = 0;
let totalBlocks = 0;
let pendingBlocks = 0;
let dirtyGarbage = 0;

const GARBAGE =
  /\bthe Lord\b|Lord'?s Prayer|Hashem'?s Word|Hashem'?s people|\bPassover\b|\bPsalms?\b|\bthe Bible\b|Capernaum|hand recoils|Saturday/i;

for (const sim of sims) {
  const simN = Number(sim.replace("siman_", ""));
  for (const slug of fs.readdirSync(path.join(CM_OUT, sim))) {
    const d = path.join(CM_OUT, sim, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    if (!bySlug.has(slug)) {
      bySlug.set(slug, {
        slug,
        simanim: 0,
        files: 0,
        blocks: 0,
        pending: 0,
        translated: 0,
        dirty: 0,
        pendingSimans: [],
      });
    }
    const st = bySlug.get(slug);
    st.simanim++;
    let simPending = 0;
    for (const f of fs.readdirSync(d).filter((n) => /^part-\d+\.txt$/i.test(n))) {
      totalFiles++;
      st.files++;
      const text = fs.readFileSync(path.join(d, f), "utf8");
      const blocks = parseBlocks(text);
      for (const b of blocks) {
        totalBlocks++;
        st.blocks++;
        const en = enOf(b);
        if (!en || PENDING_RE.test(en)) {
          pendingBlocks++;
          st.pending++;
          simPending++;
        } else {
          st.translated++;
          if (GARBAGE.test(en)) {
            dirtyGarbage++;
            st.dirty++;
          }
        }
      }
    }
    if (simPending) st.pendingSimans.push(simN);
  }
}

const rows = [...bySlug.values()].sort((a, b) => b.pending - a.pending || b.blocks - a.blocks);
console.log(
  JSON.stringify(
    {
      root: CM_OUT,
      simanim: sims.length,
      files: totalFiles,
      blocks: totalBlocks,
      pendingBlocks,
      translatedBlocks: totalBlocks - pendingBlocks,
      dirtyGarbageApprox: dirtyGarbage,
      bySlug: rows.map((r) => ({
        slug: r.slug,
        simanim: r.simanim,
        files: r.files,
        blocks: r.blocks,
        pending: r.pending,
        translated: r.translated,
        dirty: r.dirty,
        pending_siman_span:
          r.pendingSimans.length
            ? `${Math.min(...r.pendingSimans)}-${Math.max(...r.pendingSimans)}`
            : "-",
      })),
    },
    null,
    2
  )
);
