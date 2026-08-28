/**
 * Build EN_HAS_MORE_REVIEW_PACK.json (+ sized parts + .md).
 * Live corpus scan: all pairs where enSegs > heSegs (br-split).
 * Read-only on corpus. Writes audit JSON/MD only.
 *
 *   node build_en_has_more_review_pack.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE = path.resolve(__dirname, "../../../..");
const AUDIT = __dirname;
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const MAX_PART_BYTES = 85_000;
const VOLS = ["oc1", "yd1", "eh1", "cm1"];
const VOL_ORDER = { oc1: 0, yd1: 1, eh1: 2, cm1: 3 };

/** Remaining OPEN from glued pack (9). */
const GLUED_STILL_OPEN = new Set([
  "yd1/siman106/seif-002/baer-heitev",
  "yd1/siman245/seif-006/beur-hagra",
  "yd1/siman263/seif-005/baer-heitev",
  "yd1/siman308/seif-003/beur-hagra",
  "yd1/siman331/seif-034/beur-hagra",
  "yd1/siman334/seif-042/beur-hagra",
  "yd1/siman334/seif-045/beur-hagra",
  "yd1/siman269/seif-003/beur-hagra",
  "cm1/siman275/seif-003/ketzot-hachoshen",
]);

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function stripTags(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function readFile(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

function writeAtomic(filePath, text) {
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, text, "utf8");
  fs.renameSync(tmp, filePath);
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function seifNum(seifDir) {
  const m = String(seifDir).match(/(\d+)/);
  return m ? Number(m[1]) : seifDir;
}

function simanNum(simDir) {
  const m = String(simDir).match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

function tagCase(id, heSegs) {
  if (heSegs === 0) return "heSegs_zero";
  if (GLUED_STILL_OPEN.has(id)) return "glued_still_open";
  return "other_en_has_more";
}

function reviewerTemplate(c) {
  if (c.tag === "heSegs_zero") {
    return {
      id: c.id,
      action: "needs_he_restore|skip_structure",
      merge_groups: null,
      pair_map: null,
      drop_indices: null,
      notes: "",
    };
  }
  return {
    id: c.id,
    action:
      "merge_groups|pair_map|drop_en_indices|needs_editorial|needs_human|skip",
    merge_groups: null,
    pair_map: null,
    drop_indices: null,
    notes: "",
  };
}

// --- Scan live corpus ---
const cases = [];
let scannedBoth = 0;
let enPresentHeAbsent = 0;

for (const vol of VOLS) {
  const root = path.join(CORPUS, vol);
  if (!fs.existsSync(root)) continue;
  for (const sim of fs.readdirSync(root).filter((n) => /^siman\d+$/i.test(n))) {
    const simDir = path.join(root, sim);
    for (const seif of fs
      .readdirSync(simDir)
      .filter((n) => n.startsWith("seif-"))) {
      const seifDir = path.join(simDir, seif);
      let slugs;
      try {
        slugs = fs
          .readdirSync(seifDir, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);
      } catch {
        continue;
      }
      for (const slug of slugs) {
        const id = `${vol}/${sim}/${seif}/${slug}`;
        const hePath = path.join(seifDir, slug, "he.html");
        const enPath = path.join(seifDir, slug, "en.html");
        const heExists = fs.existsSync(hePath);
        const enExists = fs.existsSync(enPath);

        if (!enExists) continue;

        const enRaw = readFile(enPath);
        if (enRaw == null) continue;

        let heRaw = "";
        let heFilePresent = heExists;
        if (heExists) {
          const h = readFile(hePath);
          if (h == null) continue; // both expected but HE unreadable — skip
          heRaw = h;
          scannedBoth++;
        } else {
          enPresentHeAbsent++;
          heFilePresent = false;
        }

        const heParts = splitHtmlByBrSegments(heRaw);
        const enParts = splitHtmlByBrSegments(enRaw);
        const heSegs = heParts.length;
        const enSegs = enParts.length;

        if (!(enSegs > heSegs)) continue;

        const tag = tagCase(id, heSegs);
        const c = {
          id,
          volume: vol,
          siman: simanNum(sim),
          seif: seifNum(seif),
          slug,
          tag,
          heSegs,
          enSegs,
          he_file_present: heFilePresent,
          he_segments: heParts.map(stripTags),
          en_segments: enParts.map(stripTags),
        };
        c.reviewer_output_template = reviewerTemplate(c);
        cases.push(c);
      }
    }
  }
}

cases.sort(
  (a, b) =>
    (VOL_ORDER[a.volume] ?? 9) - (VOL_ORDER[b.volume] ?? 9) ||
    a.siman - b.siman ||
    a.seif - b.seif ||
    a.slug.localeCompare(b.slug) ||
    a.id.localeCompare(b.id)
);

// Prefer heSegs_zero first (separate GPT sessions), then non-zero
const zeroCases = cases.filter((c) => c.tag === "heSegs_zero");
const nonZeroCases = cases.filter((c) => c.tag !== "heSegs_zero");
const orderedCases = [...zeroCases, ...nonZeroCases];

const byTag = {};
const byVol = {};
const byTagVol = {};
for (const c of orderedCases) {
  byTag[c.tag] = (byTag[c.tag] || 0) + 1;
  byVol[c.volume] = (byVol[c.volume] || 0) + 1;
  const k = `${c.tag}|${c.volume}`;
  byTagVol[k] = (byTagVol[k] || 0) + 1;
}

const created = new Date().toISOString();

const PROMPT = `SA_Rebuild EN_HAS_MORE structure review. INPUT: one EN_HAS_MORE_REVIEW_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has enSegs > heSegs after the same <br>-normalize/split used in corpus audits.
- Tags: heSegs_zero | glued_still_open | other_en_has_more.
- Goal is STRUCTURE only: how EN segments should map to HE slots. Do NOT invent Hebrew. Do NOT rewrite English text in this pass (notes may flag rewrite needed).

RULES BY TAG / heSegs
1) If heSegs === 0 (tag heSegs_zero):
   - EN rejoin / merge_groups CANNOT create HE.
   - Do NOT invent merge_groups to "match" 0 HE slots.
   - action MUST be needs_he_restore or skip_structure.
   - merge_groups, pair_map, drop_indices = null.
   - Optional short notes (e.g. empty HE file vs missing HE).

2) If heSegs > 0:
   - Prefer contiguous merge_groups: array of EN-index arrays, length === heSegs, partitioning 0..enSegs-1 in order. Only merge true continuations; never glue distinct HE lemmas/notes.
   - If stubs/bodies are non-contiguous, use action pair_map with pair_map as array of EN-index groups per HE slot (non-contiguous OK), length === heSegs.
   - If clear duplicate/extra EN junk, action drop_en_indices with drop_indices (0-based), remaining must be alignable.
   - If unsafe: needs_editorial or needs_human; merge_groups/pair_map/drop_indices null as appropriate.
   - skip only if out of scope / already fixed.

OUTPUT JSON array only, same ids/order as this part's cases:
[{"id":"...","action":"needs_he_restore"|"skip_structure"|"merge_groups"|"pair_map"|"drop_en_indices"|"needs_editorial"|"needs_human"|"skip","merge_groups":null|[[0],[1,2]],"pair_map":null|[[0,3],[1,4]],"drop_indices":null|[2],"notes":"short"}]

Conservative when unsure. No new case ids. No corpus edits.`;

const packMetaBase = {
  created,
  purpose:
    "External AI: structure review for ALL live en_has_more cases (enSegs > heSegs)",
  corpus: CORPUS,
  split:
    "normalize consecutive <br> then split on <br>; strip tags for segment text",
  inclusion:
    "EN present; HE file optional (absent HE → heSegs 0). Both-file empty HE counted as heSegs 0.",
  glued_still_open_ids: [...GLUED_STILL_OPEN],
  counts: {
    total: orderedCases.length,
    by_tag: byTag,
    by_volume: byVol,
    by_tag_volume: byTagVol,
    en_present_he_absent_included: orderedCases.filter((c) => !c.he_file_present)
      .length,
    scanned_both_files_pairs: scannedBoth,
    en_present_he_absent_dirs: enPresentHeAbsent,
  },
  instructions_for_reviewer: PROMPT.split("\n"),
};

const fullPack = {
  meta: {
    ...packMetaBase,
    hard_cap_utf8_bytes: MAX_PART_BYTES,
  },
  cases: orderedCases,
};

const fullJson = JSON.stringify(fullPack, null, 2);
const fullPath = path.join(AUDIT, "EN_HAS_MORE_REVIEW_PACK.json");
writeAtomic(fullPath, fullJson);
const fullBytes = Buffer.byteLength(fullJson, "utf8");
const fullSha = sha256(fullJson);

// --- Pack into ≤85k parts (zero group first, then non-zero; greedy by size) ---
function buildPartJson(partCases, chunkIndex, chunkTotal, caseOffset, group) {
  const part = {
    meta: {
      ...packMetaBase,
      chunk_index: chunkIndex,
      chunk_total: chunkTotal,
      case_offset: caseOffset,
      cases_in_chunk: partCases.length,
      case_group: group,
      hard_cap_utf8_bytes: MAX_PART_BYTES,
      parent_pack: "EN_HAS_MORE_REVIEW_PACK.json",
      parent_sha256: fullSha,
    },
    cases: partCases,
  };
  return JSON.stringify(part, null, 2);
}

function packGroup(groupCases, groupName) {
  const chunks = [];
  let i = 0;
  while (i < groupCases.length) {
    let lo = 1;
    let hi = groupCases.length - i;
    let best = 1;
    // binary search max count that fits
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const slice = groupCases.slice(i, i + mid);
      // provisional total unknown; size with placeholder totals
      const text = buildPartJson(slice, 1, 1, i, groupName);
      const bytes = Buffer.byteLength(text, "utf8");
      if (bytes <= MAX_PART_BYTES) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    // Single oversized case: still emit alone (warn)
    if (best < 1) best = 1;
    const slice = groupCases.slice(i, i + best);
    let text = buildPartJson(slice, 1, 1, i, groupName);
    let bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_PART_BYTES && slice.length > 1) {
      // should not happen; shrink
      while (slice.length > 1 && bytes > MAX_PART_BYTES) {
        slice.pop();
        text = buildPartJson(slice, 1, 1, i, groupName);
        bytes = Buffer.byteLength(text, "utf8");
      }
    }
    chunks.push({
      cases: slice.slice(),
      group: groupName,
      offsetInGroup: i,
      bytes,
    });
    i += slice.length;
  }
  return chunks;
}

const zeroChunks = packGroup(zeroCases, "heSegs_zero");
const nonZeroChunks = packGroup(nonZeroCases, "non_zero_he");
const allChunks = [...zeroChunks, ...nonZeroChunks];

// Fix offsets to be global in orderedCases + rewrite with final chunk_index/total
const partInfos = [];
let globalOffset = 0;
for (let idx = 0; idx < allChunks.length; idx++) {
  const ch = allChunks[idx];
  const chunkIndex = idx + 1;
  const text = buildPartJson(
    ch.cases,
    chunkIndex,
    allChunks.length,
    globalOffset,
    ch.group
  );
  const bytes = Buffer.byteLength(text, "utf8");
  const name = `EN_HAS_MORE_REVIEW_PACK_part${String(chunkIndex).padStart(2, "0")}.json`;
  const partPath = path.join(AUDIT, name);
  writeAtomic(partPath, text);
  if (bytes > MAX_PART_BYTES) {
    console.warn(
      `[warn] ${name} exceeds ${MAX_PART_BYTES}: ${bytes} (cases=${ch.cases.length})`
    );
  }
  partInfos.push({
    part: chunkIndex,
    file: name,
    group: ch.group,
    cases: ch.cases.length,
    case_offset: globalOffset,
    bytes,
    characters: text.length,
    sha256: sha256(text),
    tags: ch.cases.reduce((acc, c) => {
      acc[c.tag] = (acc[c.tag] || 0) + 1;
      return acc;
    }, {}),
  });
  globalOffset += ch.cases.length;
}

// Remove stale higher part files from a prior run if any
for (let n = allChunks.length + 1; n <= 99; n++) {
  const stale = path.join(
    AUDIT,
    `EN_HAS_MORE_REVIEW_PACK_part${String(n).padStart(2, "0")}.json`
  );
  if (fs.existsSync(stale)) fs.unlinkSync(stale);
}

const partTable = partInfos
  .map(
    (p) =>
      `| ${p.part} | \`${p.file}\` | ${p.group} | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | ${p.sha256.slice(0, 12)}… |`
  )
  .join("\n");

const tagVolRows = Object.entries(byTagVol)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, n]) => {
    const [tag, vol] = k.split("|");
    return `| ${tag} | ${vol} | ${n} |`;
  })
  .join("\n");

const md = `# EN_HAS_MORE_REVIEW_PACK — full live set

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total en_has_more** | **${orderedCases.length}** |
| heSegs_zero | ${byTag.heSegs_zero || 0} |
| glued_still_open | ${byTag.glued_still_open || 0} |
| other_en_has_more | ${byTag.other_en_has_more || 0} |

### By volume

| Volume | Count |
|--------|------:|
${Object.entries(byVol)
  .sort(([a], [b]) => (VOL_ORDER[a] ?? 9) - (VOL_ORDER[b] ?? 9))
  .map(([v, n]) => `| ${v} | ${n} |`)
  .join("\n")}

### By tag × volume

| Tag | Volume | Count |
|-----|--------|------:|
${tagVolRows}

## Files

- Full pack: [\`EN_HAS_MORE_REVIEW_PACK.json\`](./EN_HAS_MORE_REVIEW_PACK.json)
  - UTF-8 bytes: ${fullBytes.toLocaleString()}
  - SHA-256: \`${fullSha}\`
  - Cases: ${orderedCases.length}
- Parts: each ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes (hard cap)
- Split strategy: **heSegs_zero parts first**, then **non_zero_he** (glued_still_open + other_en_has_more), greedy pack by size
- Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/\`
- Split: normalize consecutive \`<br>\` then split on \`<br>\`; strip tags for segment text
- Created: ${created}

## Parts

| Part | File | Group | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) |
|------|------|-------|------:|------------:|--------------:|------------------|
${partTable}

## Review prompt (use with each part)

Paste this prompt together with **one** \`EN_HAS_MORE_REVIEW_PACK_partNN.json\` file. Return a JSON array for **only** the case ids in that part.

\`\`\`
${PROMPT}
\`\`\`

## Notes

- \`heSegs_zero\` (~empty/missing HE with EN present): GPT must **not** propose merge_groups; use \`needs_he_restore\` or \`skip_structure\`.
- \`glued_still_open\`: the 9 remaining OPEN glued-pack cases (also in \`GLUED_STILL_OPEN_9_KIT\`).
- \`other_en_has_more\`: any live leftover with heSegs>0 that is not in the OPEN-9 set.
- No corpus apply from this pack.
`;

const mdPath = path.join(AUDIT, "EN_HAS_MORE_REVIEW_PACK.md");
writeAtomic(mdPath, md);

const summary = {
  total: orderedCases.length,
  byTag,
  byVol,
  byTagVol,
  full: { path: fullPath, bytes: fullBytes, sha256: fullSha },
  parts: partInfos,
  md: mdPath,
  scannedBoth,
  enPresentHeAbsent,
  prompt: PROMPT,
};

writeAtomic(
  path.join(AUDIT, "EN_HAS_MORE_REVIEW_PACK_BUILD.json"),
  JSON.stringify(summary, null, 2)
);

console.log(JSON.stringify(summary, null, 2));
