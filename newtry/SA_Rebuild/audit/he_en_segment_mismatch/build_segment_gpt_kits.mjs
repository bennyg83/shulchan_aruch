/**
 * Build GPT kits for segment-mismatch kinds beyond non-zero en_has_more:
 *   HE_HAS_MORE_PACK, EN_TRUNC_PACK, HE_MISSING_MISALIGN_PACK, EN_MISSING_PACK
 * + SEGMENT_GPT_KITS_INDEX.md
 *
 * Live corpus scan (read-only). Audit JSON/MD only. Anti-lock atomic writes.
 * Parts ≤ 85_000 UTF-8 bytes.
 *
 *   node build_segment_gpt_kits.mjs
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

const PRIOR_COUNTS = {
  he_has_more_segments: 395,
  en_truncated_vs_multi_he: 215,
  he_missing: 59,
  en_missing: 20,
};

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

function visuallyEmpty(html) {
  return stripTags(html).length === 0;
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
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      fs.renameSync(tmp, filePath);
      return;
    } catch (e) {
      if (attempt === 7) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25 * (attempt + 1));
    }
  }
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

function classify(heParts, enParts, heRaw, enRaw) {
  const heN = heParts.length;
  const enN = enParts.length;
  const heEmpty = visuallyEmpty(heRaw);
  const enEmpty = visuallyEmpty(enRaw);

  if (heEmpty && enEmpty) return null;
  if (heEmpty && !enEmpty) return { kind: "he_missing", heN: 0, enN };
  if (!heEmpty && enEmpty) return { kind: "en_missing", heN, enN: 0 };
  if (heN === enN) return null;
  if (heN === 1 && enN > 1) return { kind: "he_truncated_vs_multi_en", heN, enN };
  if (enN === 1 && heN > 1) return { kind: "en_truncated_vs_multi_he", heN, enN };
  if (enN > heN) return { kind: "en_has_more_segments", heN, enN };
  return { kind: "he_has_more_segments", heN, enN };
}

function sortCases(cases) {
  cases.sort(
    (a, b) =>
      (VOL_ORDER[a.volume] ?? 9) - (VOL_ORDER[b.volume] ?? 9) ||
      a.siman - b.siman ||
      a.seif - b.seif ||
      a.slug.localeCompare(b.slug) ||
      a.id.localeCompare(b.id)
  );
  return cases;
}

function countBy(cases, keyFn) {
  const out = {};
  for (const c of cases) {
    const k = keyFn(c);
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

function removeStaleParts(prefix, keepCount) {
  for (let n = keepCount + 1; n <= 99; n++) {
    const stale = path.join(
      AUDIT,
      `${prefix}_part${String(n).padStart(2, "0")}.json`
    );
    if (fs.existsSync(stale)) fs.unlinkSync(stale);
  }
}

function truncateSeg(s, maxChars) {
  const t = String(s ?? "");
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars)}…[truncated ${t.length - maxChars} chars; full in parent pack]`;
}

/** Shrink a single oversized case so its part JSON fits ≤ MAX_PART_BYTES. */
function fitCaseForPart(c, packMetaBase, fullSha, packBaseName) {
  let maxChars = 8000;
  let fitted = c;
  for (let attempt = 0; attempt < 24; attempt++) {
    fitted = {
      ...c,
      segments_truncated_in_part: true,
      full_text_in_parent_pack: `${packBaseName}.json`,
      he_segments: c.he_segments.map((s) => truncateSeg(s, maxChars)),
      en_segments: c.en_segments.map((s) => truncateSeg(s, maxChars)),
    };
    const text = JSON.stringify(
      {
        meta: {
          ...packMetaBase,
          chunk_index: 1,
          chunk_total: 1,
          case_offset: 0,
          cases_in_chunk: 1,
          hard_cap_utf8_bytes: MAX_PART_BYTES,
          parent_pack: `${packBaseName}.json`,
          parent_sha256: fullSha,
          note: "Single-case part; segment text may be truncated to fit 85k — full text in parent pack",
        },
        cases: [fitted],
      },
      null,
      2
    );
    if (Buffer.byteLength(text, "utf8") <= MAX_PART_BYTES) return fitted;
    maxChars = Math.max(200, Math.floor(maxChars * 0.6));
  }
  // Last resort: drop segment bodies
  return {
    ...c,
    segments_truncated_in_part: true,
    full_text_in_parent_pack: `${packBaseName}.json`,
    he_segments: c.he_segments.map((_, i) => `[omitted he[${i}]; see parent pack]`),
    en_segments: c.en_segments.map((_, i) => `[omitted en[${i}]; see parent pack]`),
  };
}

function packCases(cases, packBaseName, packMetaBase, fullSha) {
  function buildPartJson(partCases, chunkIndex, chunkTotal, caseOffset) {
    const part = {
      meta: {
        ...packMetaBase,
        chunk_index: chunkIndex,
        chunk_total: chunkTotal,
        case_offset: caseOffset,
        cases_in_chunk: partCases.length,
        hard_cap_utf8_bytes: MAX_PART_BYTES,
        parent_pack: `${packBaseName}.json`,
        parent_sha256: fullSha,
      },
      cases: partCases,
    };
    return JSON.stringify(part, null, 2);
  }

  const chunks = [];
  let i = 0;
  while (i < cases.length) {
    let lo = 1;
    let hi = cases.length - i;
    let best = 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const slice = cases.slice(i, i + mid);
      const text = buildPartJson(slice, 1, 1, i);
      const bytes = Buffer.byteLength(text, "utf8");
      if (bytes <= MAX_PART_BYTES) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    if (best < 1) best = 1;
    let slice = cases.slice(i, i + best);
    let text = buildPartJson(slice, 1, 1, i);
    let bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_PART_BYTES && slice.length > 1) {
      while (slice.length > 1 && bytes > MAX_PART_BYTES) {
        slice.pop();
        text = buildPartJson(slice, 1, 1, i);
        bytes = Buffer.byteLength(text, "utf8");
      }
    }
    if (bytes > MAX_PART_BYTES && slice.length === 1) {
      const originalId = slice[0].id;
      slice = [fitCaseForPart(slice[0], packMetaBase, fullSha, packBaseName)];
      text = buildPartJson(slice, 1, 1, i);
      bytes = Buffer.byteLength(text, "utf8");
      console.log(
        `[kits] truncated part payload for oversized case ${originalId} → ${bytes} bytes`
      );
    }
    chunks.push({ cases: slice.slice(), offset: i, bytes });
    i += slice.length;
  }

  const partInfos = [];
  for (let idx = 0; idx < chunks.length; idx++) {
    const ch = chunks[idx];
    const chunkIndex = idx + 1;
    const text = buildPartJson(
      ch.cases,
      chunkIndex,
      chunks.length,
      ch.offset
    );
    const bytes = Buffer.byteLength(text, "utf8");
    const name = `${packBaseName}_part${String(chunkIndex).padStart(2, "0")}.json`;
    const partPath = path.join(AUDIT, name);
    writeAtomic(partPath, text);
    if (bytes > MAX_PART_BYTES) {
      console.warn(
        `[warn] ${name} exceeds ${MAX_PART_BYTES}: ${bytes} (cases=${ch.cases.length})`
      );
    }
    const truncated = ch.cases.some((c) => c.segments_truncated_in_part);
    partInfos.push({
      part: chunkIndex,
      file: name,
      cases: ch.cases.length,
      case_offset: ch.offset,
      bytes,
      sha256: sha256(text),
      segments_truncated_in_part: truncated,
    });
  }
  removeStaleParts(packBaseName, chunks.length);
  return partInfos;
}

// --- Prompts ---
const PROMPTS = {
  HE_HAS_MORE_PACK: `SA_Rebuild HE_HAS_MORE structure review. INPUT: one HE_HAS_MORE_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has heSegs > enSegs after the same <br>-normalize/split used in corpus audits (formal kind he_has_more_segments).
- Both heSegs and enSegs are > 0. This is NOT he_missing (empty HE) and NOT en_truncated_vs_multi_he (single EN blob).
- Goal is STRUCTURE alignment: either split EN further OR rejoin HE segments so counts match. Do NOT invent missing English or Hebrew text in this pass.

RULES
1) Prefer contiguous HE merge_groups: array of HE-index arrays, length === enSegs, partitioning 0..heSegs-1 in order. Only merge true HE continuations (same lemma/note body split across <br>); never glue distinct notes.
2) If EN looks under-split (clear delimiters / lemma markers / bold heads inside an EN segment), propose action split_en with split_hints (0-based EN indices + brief delimiter note). Do not output rewritten EN text here.
3) If unsafe / ambiguous: needs_editorial or needs_human; merge_groups/split_hints null.
4) skip only if out of scope / already fixed on live corpus.

OUTPUT JSON array only, same ids/order as this part's cases:
[{"id":"...","action":"merge_groups"|"split_en"|"needs_editorial"|"needs_human"|"skip","merge_groups":null|[[0,1],[2]],"split_hints":null|[{"en_index":0,"note":"bold lemma"}],"notes":"short"}]

Conservative when unsure. No new case ids. No corpus edits. Do not invent HE or EN.`,

  EN_TRUNC_PACK: `SA_Rebuild EN_TRUNC (en_truncated_vs_multi_he) review. INPUT: one EN_TRUNC_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has heSegs > 1 and enSegs === 1 (one EN blob vs multiple HE segments).
- Goal: split EN into heSegs aligned segments IF clear delimiters exist; else escalate. Do NOT invent English. Do NOT invent Hebrew.

RULES
1) If EN contains clear delimiters matching HE structure (bold lemma heads, numbered markers, <br>-like breaks lost in ingest, parallel note markers): action split_en with proposed_split_count === heSegs and split_plan describing 0-based cut points / delimiter cues. Do not paste full rewritten EN here unless a cut is trivial index-only.
2) If no safe delimiter map: needs_editorial or needs_human.
3) Never propose merging HE down to 1 just to match a glued EN blob unless notes explicitly say HE was wrongly oversplit AND evidence is strong — default is split EN or escalate.
4) skip only if already fixed.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"split_en"|"needs_editorial"|"needs_human"|"skip","proposed_split_count":null|N,"split_plan":null|"brief","notes":"short"}]

Conservative when unsure. No corpus edits.`,

  HE_MISSING_MISALIGN_PACK: `SA_Rebuild HE_MISSING MISALIGNMENT review. INPUT: one HE_MISSING_MISALIGN_PACK_partNN.json (this chunk only).

CONTEXT — MISALIGNMENT / WRONG-SEIF / MISSING HE INGEST
- Each case has heSegs === 0 (visually empty or absent HE) while EN is present.
- This is NOT a structure-rejoin / merge_groups problem. Empty HE cannot be fixed by rejoining EN.
- Do NOT invent Hebrew. Do NOT fabricate HE segments from EN.

RULES
1) needs_he_restore — HE should exist for this slug/seif (EN looks like a real translation of that commentary); restore from authoritative HE source later.
2) wrong_seif_suspect — EN content appears to belong to a different seif/siman/slug (misfiled); note suspected target if clear.
3) needs_human — ambiguous; cannot classify safely.
4) skip — already restored / out of scope.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"needs_he_restore"|"wrong_seif_suspect"|"needs_human"|"skip","suspected_target":null|"vol/simanN/seif-NNN/slug","notes":"short"}]

No merge_groups. No invented HE. No corpus edits.`,

  EN_MISSING_PACK: `SA_Rebuild EN_MISSING review. INPUT: one EN_MISSING_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has HE present and EN absent/empty (enSegs === 0).
- Goal: classify how to obtain English — do NOT invent a full translation in this pass unless the user later authorizes a translation job.
- Do NOT treat old machine-translation .txt pipeline files as authority unless the user explicitly says so. Prefer marking needs_en_source.

RULES
1) needs_en_source — HE is real; EN must be restored from an approved English source (Sefaria pull / curated EN / authorized translation). Default for most cases.
2) needs_human — ambiguous path, wrong slug suspicion, or HE itself looks corrupt/misplaced.
3) skip — already filled / out of scope.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"needs_en_source"|"needs_human"|"skip","notes":"short"}]

Do not invent EN text in this kit. No corpus edits. Do not use old MT .txt as authority unless user says so.`,
};

const KIT_DEFS = [
  {
    key: "HE_HAS_MORE_PACK",
    kind: "he_has_more_segments",
    purpose:
      "Structure review when HE has more <br>-segments than EN (rejoin HE or split EN)",
    mdTitle: "HE_HAS_MORE_PACK — heSegs > enSegs (both > 0)",
    mdNotes: [
      "Formal kind `he_has_more_segments` only (excludes `en_truncated_vs_multi_he` and `he_missing`).",
      "Separate from glued/en_has_more packs — do not mix.",
    ],
  },
  {
    key: "EN_TRUNC_PACK",
    kind: "en_truncated_vs_multi_he",
    purpose:
      "Split single EN blob vs multi HE, or escalate to editorial/human",
    mdTitle: "EN_TRUNC_PACK — en_truncated_vs_multi_he (enSegs===1, heSegs>1)",
    mdNotes: [
      "Prefer split EN when delimiters exist; else needs_editorial / needs_human.",
    ],
  },
  {
    key: "HE_MISSING_MISALIGN_PACK",
    kind: "he_missing",
    purpose:
      "Misalignment kit: empty/absent HE with EN present — restore HE or flag wrong-seif (NOT structure rejoin)",
    mdTitle:
      "HE_MISSING_MISALIGN_PACK — MISALIGNMENT (heSegs===0, EN present)",
    mdNotes: [
      "**Misalignment / wrong-seif / missing HE ingest** — not a merge_groups structure pack.",
      "Do not invent Hebrew. Do not mix into HE_HAS_MORE or glued EN rejoin kits.",
    ],
  },
  {
    key: "EN_MISSING_PACK",
    kind: "en_missing",
    purpose:
      "HE present, EN absent — locate approved EN source (not old MT unless authorized)",
    mdTitle: "EN_MISSING_PACK — HE present, EN absent/empty",
    mdNotes: [
      "Default action needs_en_source. Do not use old MT .txt as authority unless user says so.",
    ],
  },
];

// --- Scan ---
console.log(`[kits] corpus=${CORPUS}`);
console.log(`[kits] scanning…`);
const t0 = Date.now();

const buckets = {
  he_has_more_segments: [],
  en_truncated_vs_multi_he: [],
  he_missing: [],
  en_missing: [],
  en_has_more_segments: [],
  he_truncated_vs_multi_en: [],
};
let pairs = 0;
let scannedBoth = 0;

for (const vol of VOLS) {
  const root = path.join(CORPUS, vol);
  if (!fs.existsSync(root)) {
    console.warn(`[kits] missing volume ${vol}`);
    continue;
  }
  const simans = fs.readdirSync(root).filter((n) => /^siman\d+$/i.test(n));
  for (const sim of simans) {
    const simDir = path.join(root, sim);
    let seifs;
    try {
      seifs = fs.readdirSync(simDir).filter((n) => n.startsWith("seif-"));
    } catch {
      continue;
    }
    for (const seif of seifs) {
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
        if (!heExists && !enExists) continue;

        pairs++;
        const heRaw = heExists ? readFile(hePath) ?? "" : "";
        const enRaw = enExists ? readFile(enPath) ?? "" : "";
        if (heExists && enExists) scannedBoth++;

        const heParts = splitHtmlByBrSegments(heRaw);
        const enParts = splitHtmlByBrSegments(enRaw);
        const cls = classify(heParts, enParts, heRaw, enRaw);
        if (!cls) continue;
        if (!buckets[cls.kind]) buckets[cls.kind] = [];

        const c = {
          id,
          volume: vol,
          siman: simanNum(sim),
          seif: seifNum(seif),
          slug,
          kind: cls.kind,
          heSegs: cls.heN,
          enSegs: cls.enN,
          he_file_present: heExists,
          en_file_present: enExists,
          he_segments: heParts.map(stripTags),
          en_segments: enParts.map(stripTags),
        };
        buckets[cls.kind].push(c);
      }
    }
  }
  console.log(
    `[kits] ${vol} done — he_has_more=${buckets.he_has_more_segments.filter((c) => c.volume === vol).length} en_trunc=${buckets.en_truncated_vs_multi_he.filter((c) => c.volume === vol).length} he_missing=${buckets.he_missing.filter((c) => c.volume === vol).length} en_missing=${buckets.en_missing.filter((c) => c.volume === vol).length}`
  );
}

const scanMs = Date.now() - t0;
const created = new Date().toISOString();
console.log(`[kits] scan finished in ${scanMs}ms pairs=${pairs} both=${scannedBoth}`);

const liveCounts = {
  he_has_more_segments: buckets.he_has_more_segments.length,
  en_truncated_vs_multi_he: buckets.en_truncated_vs_multi_he.length,
  he_missing: buckets.he_missing.length,
  en_missing: buckets.en_missing.length,
  en_has_more_segments: buckets.en_has_more_segments.length,
  he_truncated_vs_multi_en: (buckets.he_truncated_vs_multi_en || []).length,
};

const countDiffs = {};
for (const [k, prior] of Object.entries(PRIOR_COUNTS)) {
  const live = liveCounts[k] ?? 0;
  if (live !== prior) countDiffs[k] = { prior, live, delta: live - prior };
}

const kitSummaries = [];

for (const def of KIT_DEFS) {
  const cases = sortCases(buckets[def.kind].slice());
  const byVol = countBy(cases, (c) => c.volume);
  const bySlug = countBy(cases, (c) => `${c.volume}/${c.slug}`);
  const prompt = PROMPTS[def.key];

  const packMetaBase = {
    created,
    kit: def.key,
    kind: def.kind,
    purpose: def.purpose,
    corpus: CORPUS,
    split:
      "normalize consecutive <br> then split on <br>; strip tags for segment text",
    classification:
      "same formal kinds as scan_corpus_he_en_segment_mismatch.mjs",
    counts: {
      total: cases.length,
      by_volume: byVol,
      by_volume_slug: bySlug,
      prior_expected: PRIOR_COUNTS[def.kind] ?? null,
      prior_delta:
        (PRIOR_COUNTS[def.kind] != null
          ? cases.length - PRIOR_COUNTS[def.kind]
          : null),
    },
    instructions_for_reviewer: prompt.split("\n"),
  };

  const fullPack = {
    meta: {
      ...packMetaBase,
      hard_cap_utf8_bytes: MAX_PART_BYTES,
    },
    cases,
  };
  const fullJson = JSON.stringify(fullPack, null, 2);
  const fullPath = path.join(AUDIT, `${def.key}.json`);
  writeAtomic(fullPath, fullJson);
  const fullBytes = Buffer.byteLength(fullJson, "utf8");
  const fullSha = sha256(fullJson);

  const partInfos = packCases(cases, def.key, packMetaBase, fullSha);

  const truncParts = partInfos.filter((p) => p.segments_truncated_in_part).length;
  const partTable = partInfos
    .map(
      (p) =>
        `| ${p.part} | \`${p.file}\` | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | ${p.sha256.slice(0, 12)}… | ${p.segments_truncated_in_part ? "yes*" : ""} |`
    )
    .join("\n");

  const volRows = Object.entries(byVol)
    .sort(([a], [b]) => (VOL_ORDER[a] ?? 9) - (VOL_ORDER[b] ?? 9))
    .map(([v, n]) => `| ${v} | ${n} |`)
    .join("\n");

  const slugRows = Object.entries(bySlug)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([k, n]) => {
      const [vol, ...slugParts] = k.split("/");
      return `| ${vol} | ${slugParts.join("/")} | ${n} |`;
    })
    .join("\n");

  const maxPartBytes = partInfos.reduce((m, p) => Math.max(m, p.bytes), 0);

  const md = `# ${def.mdTitle}

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **${cases.length}** |
| Prior expected (${def.kind}) | ${PRIOR_COUNTS[def.kind] ?? "—"} |
| Delta vs prior | ${PRIOR_COUNTS[def.kind] != null ? cases.length - PRIOR_COUNTS[def.kind] : "—"} |

### By volume

| Volume | Count |
|--------|------:|
${volRows || "| — | 0 |"}

### By volume / slug

| Volume | Slug | Count |
|--------|------|------:|
${slugRows || "| — | — | 0 |"}

## Files

- Full pack: [\`${def.key}.json\`](./${def.key}.json)
  - UTF-8 bytes: ${fullBytes.toLocaleString()}
  - SHA-256: \`${fullSha}\`
  - Cases: ${cases.length}
- Parts: each ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes (hard cap)
- Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/\`
- Split: normalize consecutive \`<br>\` then split on \`<br>\`; strip tags for segment text
- Created: ${created}

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
${partTable || "| — | — | 0 | 0 | 0 | — | |"}

${
  truncParts
    ? `\\* ${truncParts} part(s) contain a single oversized case with segment text truncated to fit the 85k cap; **full** \`he_segments\` / \`en_segments\` remain in [\`${def.key}.json\`](./${def.key}.json).`
    : ""
}

## Review prompt (use with each part)

Paste this prompt together with **one** \`${def.key}_partNN.json\` file. Return a JSON array for **only** the case ids in that part.

\`\`\`
${prompt}
\`\`\`

## Notes

${def.mdNotes.map((n) => `- ${n}`).join("\n")}
- No corpus apply from this pack.
`;

  const mdPath = path.join(AUDIT, `${def.key}.md`);
  writeAtomic(mdPath, md);

  const buildSummary = {
    kit: def.key,
    kind: def.kind,
    total: cases.length,
    byVol,
    full: { path: fullPath, bytes: fullBytes, sha256: fullSha },
    parts: partInfos,
    max_part_bytes: maxPartBytes,
    md: mdPath,
  };
  writeAtomic(
    path.join(AUDIT, `${def.key}_BUILD.json`),
    JSON.stringify(buildSummary, null, 2)
  );

  kitSummaries.push({
    kit: def.key,
    kind: def.kind,
    purpose: def.purpose,
    cases: cases.length,
    parts: partInfos.length,
    max_part_bytes: maxPartBytes,
    full_bytes: fullBytes,
    full_sha256: fullSha,
    path: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${def.key}.json`,
    md: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${def.key}.md`,
  });

  console.log(
    `[kits] ${def.key}: cases=${cases.length} parts=${partInfos.length} maxPart=${maxPartBytes} sha=${fullSha.slice(0, 12)}…`
  );
}

// --- Cross-link existing en_has_more / glued kits (do not rebuild) ---
function fileMeta(name) {
  const p = path.join(AUDIT, name);
  if (!fs.existsSync(p)) return null;
  const buf = fs.readFileSync(p);
  return {
    file: name,
    bytes: buf.length,
    sha256: sha256(buf),
    exists: true,
  };
}

const crossLinks = {
  GLUED_STILL_OPEN_9_KIT: fileMeta("GLUED_STILL_OPEN_9_KIT.json"),
  GLUED_STILL_OPEN_9_KIT_md: fileMeta("GLUED_STILL_OPEN_9_KIT.md"),
  EN_HAS_MORE_GLUED_REVIEW_PACK: fileMeta("EN_HAS_MORE_GLUED_REVIEW_PACK.json"),
  EN_HAS_MORE_REVIEW_PACK: fileMeta("EN_HAS_MORE_REVIEW_PACK.json"),
  EN_HAS_MORE_NONZERO_HE_PACK: fileMeta("EN_HAS_MORE_NONZERO_HE_PACK.json"),
};

const skippedRebuild = [];
if (crossLinks.GLUED_STILL_OPEN_9_KIT || crossLinks.EN_HAS_MORE_NONZERO_HE_PACK) {
  skippedRebuild.push(
    "Skipped rebuilding glued / non-zero en_has_more kits — already present (cross-linked below)."
  );
}

const indexMd = `# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN \`<br>\`-segment mismatches. **Audit only — no corpus apply.**

Generated: ${created}  
Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/\`  
Scan: live (${scanMs}ms), pairs=${pairs.toLocaleString()}, both-files=${scannedBoth.toLocaleString()}

## Run order (recommended)

1. **HE_MISSING_MISALIGN_PACK** — empty HE + EN present (misalignment / wrong-seif / missing HE). Do **not** mix with structure rejoin.
2. **EN_MISSING_PACK** — HE present, EN absent (source EN; do not invent; do not trust old MT unless authorized).
3. **EN_TRUNC_PACK** — single EN blob vs multi HE (split EN or escalate).
4. **HE_HAS_MORE_PACK** — heSegs > enSegs with both > 0 (HE rejoin or EN split).
5. **GLUED_STILL_OPEN_9_KIT** / existing en_has_more packs — remaining non-zero EN overs (already packed; do not rebuild here).

## Kits built this run

| Kit | Kind | Cases | Parts | Max part bytes | Full SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|----------------------:|------|
${kitSummaries
  .map(
    (k) =>
      `| \`${k.kit}\` | ${k.kind} | ${k.cases} | ${k.parts} | ${k.max_part_bytes.toLocaleString()} | \`${k.full_sha256.slice(0, 12)}…\` | [\`${k.kit}.json\`](./${k.kit}.json) |`
  )
  .join("\n")}

### One-line purpose

${kitSummaries.map((k) => `- **${k.kit}**: ${k.purpose}`).join("\n")}

## Counts vs prior (395 / 215 / 59 / 20)

| Kind | Prior | Live | Delta |
|------|------:|-----:|------:|
| he_has_more_segments | ${PRIOR_COUNTS.he_has_more_segments} | ${liveCounts.he_has_more_segments} | ${liveCounts.he_has_more_segments - PRIOR_COUNTS.he_has_more_segments} |
| en_truncated_vs_multi_he | ${PRIOR_COUNTS.en_truncated_vs_multi_he} | ${liveCounts.en_truncated_vs_multi_he} | ${liveCounts.en_truncated_vs_multi_he - PRIOR_COUNTS.en_truncated_vs_multi_he} |
| he_missing | ${PRIOR_COUNTS.he_missing} | ${liveCounts.he_missing} | ${liveCounts.he_missing - PRIOR_COUNTS.he_missing} |
| en_missing | ${PRIOR_COUNTS.en_missing} | ${liveCounts.en_missing} | ${liveCounts.en_missing - PRIOR_COUNTS.en_missing} |

${
  Object.keys(countDiffs).length
    ? `**Note:** live scan differs from prior on: ${Object.keys(countDiffs).join(", ")}.`
    : "**Note:** live scan matches prior counts 395 / 215 / 59 / 20."
}

Other live kinds (not packed here): en_has_more_segments=${liveCounts.en_has_more_segments}, he_truncated_vs_multi_en=${liveCounts.he_truncated_vs_multi_en}.

## Existing en_has_more / glued kits (cross-link; not rebuilt)

${skippedRebuild.map((s) => `- ${s}`).join("\n") || "- (none skipped)"}

| Artifact | Exists | Bytes | SHA-256 (prefix) |
|----------|:------:|------:|------------------|
| \`GLUED_STILL_OPEN_9_KIT.json\` | ${crossLinks.GLUED_STILL_OPEN_9_KIT ? "yes" : "no"} | ${crossLinks.GLUED_STILL_OPEN_9_KIT?.bytes?.toLocaleString() ?? "—"} | ${crossLinks.GLUED_STILL_OPEN_9_KIT ? "`" + crossLinks.GLUED_STILL_OPEN_9_KIT.sha256.slice(0, 12) + "…`" : "—"} |
| \`EN_HAS_MORE_GLUED_REVIEW_PACK.json\` | ${crossLinks.EN_HAS_MORE_GLUED_REVIEW_PACK ? "yes" : "no"} | ${crossLinks.EN_HAS_MORE_GLUED_REVIEW_PACK?.bytes?.toLocaleString() ?? "—"} | ${crossLinks.EN_HAS_MORE_GLUED_REVIEW_PACK ? "`" + crossLinks.EN_HAS_MORE_GLUED_REVIEW_PACK.sha256.slice(0, 12) + "…`" : "—"} |
| \`EN_HAS_MORE_REVIEW_PACK.json\` | ${crossLinks.EN_HAS_MORE_REVIEW_PACK ? "yes" : "no"} | ${crossLinks.EN_HAS_MORE_REVIEW_PACK?.bytes?.toLocaleString() ?? "—"} | ${crossLinks.EN_HAS_MORE_REVIEW_PACK ? "`" + crossLinks.EN_HAS_MORE_REVIEW_PACK.sha256.slice(0, 12) + "…`" : "—"} |
| \`EN_HAS_MORE_NONZERO_HE_PACK.json\` | ${crossLinks.EN_HAS_MORE_NONZERO_HE_PACK ? "yes" : "no"} | ${crossLinks.EN_HAS_MORE_NONZERO_HE_PACK?.bytes?.toLocaleString() ?? "—"} | ${crossLinks.EN_HAS_MORE_NONZERO_HE_PACK ? "`" + crossLinks.EN_HAS_MORE_NONZERO_HE_PACK.sha256.slice(0, 12) + "…`" : "—"} |

See also: [\`GLUED_STILL_OPEN_9_KIT.md\`](./GLUED_STILL_OPEN_9_KIT.md), [\`EN_HAS_MORE_GLUED_REVIEW_PACK.md\`](./EN_HAS_MORE_GLUED_REVIEW_PACK.md) (if present).

## Case fields (all kits)

Each case includes: \`id\`, \`volume\`, \`siman\`, \`seif\`, \`slug\`, \`kind\`, \`heSegs\`, \`enSegs\`, \`he_segments[]\`, \`en_segments[]\` (full stripped text), plus file-present flags.
`;

writeAtomic(path.join(AUDIT, "SEGMENT_GPT_KITS_INDEX.md"), indexMd);

const master = {
  created,
  corpus: CORPUS,
  scanMs,
  pairs,
  scannedBoth,
  liveCounts,
  priorCounts: PRIOR_COUNTS,
  countDiffs,
  kits: kitSummaries,
  crossLinks,
  skippedRebuild,
};
writeAtomic(
  path.join(AUDIT, "SEGMENT_GPT_KITS_BUILD.json"),
  JSON.stringify(master, null, 2)
);

console.log(JSON.stringify(master, null, 2));
