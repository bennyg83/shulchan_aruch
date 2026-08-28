/**
 * Build remaining open-track GPT kits (audit JSON/MD only; no corpus apply).
 *
 *   node build_remaining_open_gpt_kits.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const LIVE = path.resolve(__dirname, "../../../..");
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const MAX_PART_BYTES = 85_000;
const VOL_ORDER = { oc1: 0, yd1: 1, eh1: 2, cm1: 3 };

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
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

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

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

function seifNum(seifDir) {
  const m = String(seifDir).match(/(\d+)/);
  return m ? Number(m[1]) : seifDir;
}

function simanNum(simDir) {
  const m = String(simDir).match(/(\d+)/);
  return m ? Number(m[1]) : 0;
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

function readCorpusCase(id, kindOverride) {
  const [vol, sim, seif, slug] = id.split("/");
  const hePath = path.join(CORPUS, vol, sim, seif, slug, "he.html");
  const enPath = path.join(CORPUS, vol, sim, seif, slug, "en.html");
  const heExists = fs.existsSync(hePath);
  const enExists = fs.existsSync(enPath);
  const heRaw = heExists ? fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "") : "";
  const enRaw = enExists ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "") : "";
  const heParts = splitHtmlByBrSegments(heRaw);
  const enParts = splitHtmlByBrSegments(enRaw);
  let kind = kindOverride;
  if (!kind) {
    const heN = heParts.length;
    const enN = enParts.length;
    if (enN === 1 && heN > 1) kind = "en_truncated_vs_multi_he";
    else if (heN > enN && enN > 0) kind = "he_has_more_segments";
    else if (enN === 0 && heN > 0) kind = "en_missing";
    else kind = "segment_mismatch";
  }
  return {
    id,
    volume: vol,
    siman: simanNum(sim),
    seif: seifNum(seif),
    slug,
    kind,
    heSegs: heParts.length,
    enSegs: enParts.length,
    he_deficit: Math.max(0, heParts.length - enParts.length),
    he_file_present: heExists,
    en_file_present: enExists,
    he_segments: heParts.map(stripTags),
    en_segments: enParts.map(stripTags),
  };
}

function truncateSeg(s, maxChars) {
  const t = String(s ?? "");
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars)}…[truncated ${t.length - maxChars} chars; full in parent pack]`;
}

function fitCaseForPart(c, packMetaBase, fullSha, packBaseName) {
  let maxChars = 8000;
  for (let attempt = 0; attempt < 24; attempt++) {
    const fitted = {
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
  return {
    ...c,
    segments_truncated_in_part: true,
    full_text_in_parent_pack: `${packBaseName}.json`,
    he_segments: c.he_segments.map((_, i) => `[omitted he[${i}]; see parent pack]`),
    en_segments: c.en_segments.map((_, i) => `[omitted en[${i}]; see parent pack]`),
  };
}

function removeStaleParts(prefix, keepCount) {
  for (let n = keepCount + 1; n <= 99; n++) {
    const stale = path.join(AUDIT, `${prefix}_part${String(n).padStart(2, "0")}.json`);
    if (fs.existsSync(stale)) fs.unlinkSync(stale);
  }
}

function packCases(cases, packBaseName, packMetaBase, fullSha) {
  function buildPartJson(partCases, chunkIndex, chunkTotal, caseOffset) {
    return JSON.stringify(
      {
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
      },
      null,
      2
    );
  }

  const chunks = [];
  let i = 0;
  while (i < cases.length) {
    let lo = 1;
    let hi = cases.length - i;
    let best = 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const bytes = Buffer.byteLength(
        buildPartJson(cases.slice(i, i + mid), 1, 1, i),
        "utf8"
      );
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
      console.log(`[kits] truncated part payload for ${originalId} → ${bytes} bytes`);
    }
    chunks.push({ cases: slice.slice(), offset: i, bytes });
    i += slice.length;
  }

  const partInfos = [];
  for (let idx = 0; idx < chunks.length; idx++) {
    const ch = chunks[idx];
    const chunkIndex = idx + 1;
    const text = buildPartJson(ch.cases, chunkIndex, chunks.length, ch.offset);
    const bytes = Buffer.byteLength(text, "utf8");
    const name = `${packBaseName}_part${String(chunkIndex).padStart(2, "0")}.json`;
    writeAtomic(path.join(AUDIT, name), text);
    partInfos.push({
      part: chunkIndex,
      file: name,
      cases: ch.cases.length,
      case_offset: ch.offset,
      bytes,
      sha256: sha256(text),
      segments_truncated_in_part: ch.cases.some((c) => c.segments_truncated_in_part),
    });
  }
  removeStaleParts(packBaseName, chunks.length);
  return partInfos;
}

function fileMeta(name) {
  const p = path.join(AUDIT, name);
  if (!fs.existsSync(p)) return null;
  const buf = fs.readFileSync(p);
  return { file: name, bytes: buf.length, sha256: sha256(buf), exists: true };
}

function buildKit(def) {
  const { kit, cases, packMetaBase, prompt, mdTitle, mdNotes = [] } = def;
  sortCases(cases);
  const byVol = countBy(cases, (c) => c.volume);
  const fullMeta = {
    ...packMetaBase,
    created: def.created,
    kit,
    counts: {
      total: cases.length,
      by_volume: byVol,
      ...(packMetaBase.counts_extra ?? {}),
    },
    hard_cap_utf8_bytes: MAX_PART_BYTES,
    mode: packMetaBase.mode,
    dictionary_file: "full_dictionary.md",
    prompt,
    instructions_for_reviewer: prompt.split("\n"),
    output_schema: packMetaBase.output_schema,
  };

  const fullPack = { meta: fullMeta, cases };
  const fullJson = JSON.stringify(fullPack, null, 2);
  const fullPath = path.join(AUDIT, `${kit}.json`);
  writeAtomic(fullPath, fullJson);
  const fullBytes = Buffer.byteLength(fullJson, "utf8");
  const fullSha = sha256(fullJson);
  const partInfos = packCases(cases, kit, fullMeta, fullSha);

  const volRows = Object.entries(byVol)
    .sort(([a], [b]) => (VOL_ORDER[a] ?? 9) - (VOL_ORDER[b] ?? 9))
    .map(([v, n]) => `| ${v} | ${n} |`)
    .join("\n");

  const partTable = partInfos
    .map(
      (p) =>
        `| ${p.part} | \`${p.file}\` | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | \`${p.sha256.slice(0, 12)}…\` | ${p.segments_truncated_in_part ? "yes*" : ""} |`
    )
    .join("\n");

  const maxPartBytes = partInfos.reduce((m, p) => Math.max(m, p.bytes), 0);
  const truncParts = partInfos.filter((p) => p.segments_truncated_in_part).length;

  const md = `# ${mdTitle}

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: \`${packMetaBase.mode}\` · Dictionary: attach **\`full_dictionary.md\`** (see [\`DICTIONARY_REF.md\`](./DICTIONARY_REF.md))

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **${cases.length}** |

### By volume

| Volume | Count |
|--------|------:|
${volRows || "| — | 0 |"}

## Files

- Full kit: [\`${kit}.json\`](./${kit}.json)
  - UTF-8 bytes: ${fullBytes.toLocaleString()}
  - SHA-256: \`${fullSha}\`
  - Cases: ${cases.length}
- Parts: each ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes (hard cap)
- Created: ${def.created}

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
${partTable || "| — | — | 0 | 0 | — | — | |"}

${
  truncParts
    ? `\\* ${truncParts} part(s) contain oversized case(s) with segment text truncated to fit the 85k cap; **full** text remains in [\`${kit}.json\`](./${kit}.json).`
    : ""
}

## ChatGPT prompt

Paste this prompt together with **both** attachments: (1) one \`${kit}.json\` / \`${kit}_partNN.json\` file, and (2) **\`full_dictionary.md\`**. Return a JSON array for **only** the case ids in that chunk.

\`\`\`
${prompt}
\`\`\`

## Notes

${mdNotes.map((n) => `- ${n}`).join("\n")}
- No corpus apply from this kit.
`;

  const mdPath = path.join(AUDIT, `${kit}.md`);
  writeAtomic(mdPath, md);

  const buildSummary = {
    kit,
    mode: packMetaBase.mode,
    purpose: packMetaBase.purpose,
    cases: cases.length,
    parts: partInfos.length,
    max_part_bytes: maxPartBytes,
    full_bytes: fullBytes,
    full_sha256: fullSha,
    path: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${kit}.json`,
    md: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${kit}.md`,
    parts_detail: partInfos,
  };
  writeAtomic(
    path.join(AUDIT, `${kit}_BUILD.json`),
    JSON.stringify(buildSummary, null, 2)
  );
  console.log(
    `[kits] ${kit}: cases=${cases.length} parts=${partInfos.length} maxPart=${maxPartBytes} sha=${fullSha.slice(0, 12)}…`
  );
  return buildSummary;
}

// --- Prompts ---
const DICT_BLOCK = `DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.`;

const NORMS_BLOCK = `TRANSLATION NORMS
- Complete: translate every clause; no omissions or paraphrasing away content.
- No additions: no introductions, notes, or explanations beyond the source.
- Rama glosses introduced by הגה → {Rama: ...} (curly braces).
- Plain English only — no "Translation:" label.
- Where norms and full_dictionary.md conflict, full_dictionary.md wins.`;

const PROMPT_EN_TRUNC_EDITORIAL = `SA_Rebuild EN_TRUNC EDITORIAL — FRESH MULTI-SEGMENT TRANSLATE FROM HEBREW.

INPUTS (both required)
1) EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

${DICT_BLOCK}

CONTEXT
- Each case has heSegs > 1 and enSegs === 1 (one EN blob vs multiple HE segments).
- GPT review action was needs_editorial: EN is truncated, garbled, or structurally unsafe to split mechanically.
- Wave1 strict/moderate tiers excluded (already in other kits or applied).
- Goal: produce heSegs fresh English segments — one accurate translation per HE slot. Treat existing EN blob as unreliable; do NOT preserve garbled MT wording.

${NORMS_BLOCK}

TASK
For each case:
1) Translate each he_segments[i] into segments[i].en (source: fresh_translate).
2) segments.length MUST equal heSegs (1:1 with he_segments).
3) If HE slot is corrupt/unusable: action needs_human for that case; still return best-effort segments[] if possible.

OUTPUT — JSON array only, same ids/order as input cases:
[{
  "id": "...",
  "action": "fresh_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "fresh_translate" }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length === heSegs; each segment includes paired he+en.
- en_segments[] mirrors segments[].en in order.
- source on each segment is fresh_translate (or partial if you must flag a slot).
- No corpus edits. Return JSON only.`;

const PROMPT_WAVE2_HELD = `SA_Rebuild HE_HAS_MORE WAVE2 HELD — RESEGMENT / SPLIT EN TO MATCH HE.

INPUTS (both required)
1) HE_HAS_MORE_WAVE2_HELD_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

${DICT_BLOCK}

CONTEXT
- Wave2 auto split_en apply held these 18 Gra (beur-hagra) cases: marker-based EN split was insufficient (missing markers, multi-piece deficit, or no internal marker at hinted index).
- heSegs > enSegs; HE must NOT be merged down. Split EN (or resegment with semantic alignment) until counts match.
- Use HE (ליקוט) / lemma positions and en_segments[] from the kit; wave2 held reason is in hold_reason.

TASK
For each case:
1) Map each HE slot to one EN segment (split existing EN where possible; fresh_translate gaps from HE only).
2) Prefer splitting EN at (Likut)|(Collected)|(Supplement) markers matching HE dual-likut patterns.
3) If unsafe: action needs_human; still return best-effort paired segments[].

OUTPUT — JSON array only, same ids/order:
[{
  "id": "...",
  "action": "split_en" | "mixed_resegment_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "split_existing_en"|"fresh_translate"|"partial" }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length MUST equal heSegs.
- Do NOT propose merge_groups on HE.
- No corpus edits. Return JSON only.`;

const PROMPT_LIKUT_SPLIT = `SA_Rebuild HE_HAS_MORE LIKUT — SPLIT EN (DO NOT MERGE HE).

INPUTS (both required)
1) HE_HAS_MORE_LIKUT_SPLIT_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

${DICT_BLOCK}

CONTEXT
- GPT wrongly proposed merge_groups on Gra Likut cases where HE has separate (ליקוט) segments but EN is under-split.
- Eval classified 53 beur-hagra Likut-glued merge_groups as hold_semantic_likut_merge — need EN split, NOT HE merge.
- heSegs > enSegs. Never merge distinct HE notes. Split EN at (Likut)|(Collected note)|(Supplement) matching HE structure.

CRITICAL
- Do NOT output merge_groups that reduce heSegs.
- Do NOT glue distinct HE Likut segments together.
- Default action: split_en or mixed_resegment_translate.

TASK
For each case:
1) Split en_segments[] (or the under-split EN piece) so final count === heSegs.
2) Align each HE slot to one EN segment; translate from HE only where EN lacks material.
3) Use review merge_groups as anti-pattern (what NOT to do).

OUTPUT — JSON array only, same ids/order:
[{
  "id": "...",
  "action": "split_en" | "mixed_resegment_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "split_existing_en"|"fresh_translate"|"partial" }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length === heSegs.
- No merge_groups on HE. No corpus edits. Return JSON only.`;

const PROMPT_EN_MISSING_2 = `SA_Rebuild EN_MISSING HELD (2) — FRESH TRANSLATE FROM HEBREW.

INPUTS (both required)
1) EN_MISSING_2_HELD_KIT.json
2) full_dictionary.md (attached by the user — follow it without exception)

${DICT_BLOCK}

CONTEXT
- Two residual en_missing cases held from EN_MISSING apply (2026-08-28):
  1) yd1/siman173/seif-001/yad-avraham — Noda B'Yehuda Tinyana: HE cites chelek YD (חי״ד) siman 75; prior EN wrongly referenced Choshen Mishpat — fix volume/citation.
  2) yd1/siman210/seif-001/yad-avraham — HE garbled (?dl"a); translate cautiously or needs_human if HE unusable.

${NORMS_BLOCK}

OUTPUT — JSON array only, same ids/order:
[{
  "id": "...",
  "action": "fresh_translate" | "needs_human",
  "segments": [
    { "index": 0, "he": "...", "en": "...", "source": "fresh_translate" }
  ],
  "en_segments": ["..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- en_segments.length === heSegs.
- No corpus edits. Return JSON only.`;

const PROMPT_HE_EDITORIAL = `SA_Rebuild HE_HAS_MORE EDITORIAL — RESEGMENT / OFFSET FIX / HUMAN ESCALATION.

INPUTS (both required)
1) HE_HAS_MORE_EDITORIAL_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

${DICT_BLOCK}

CONTEXT
- GPT review action needs_editorial (218 cases): real heSegs > enSegs mismatch but no safe automatic merge_groups or split_en.
- Wave1 merge (62) and wave2 split (38 applied) excluded. Likut wrong-merge tier (53) is a separate kit.
- Goal: propose structure fix OR paired segments[] where you can align EN to HE slots.

TASK (pick best per case)
1) split_en — if you find reliable EN split points matching HE.
2) merge_groups — ONLY if true HE continuation (same lemma body split across <br>); never glue distinct notes.
3) mixed_resegment_translate — split EN where possible + fresh_translate gaps from HE.
4) needs_human — ambiguous / unsafe.

OUTPUT — JSON array only, same ids/order:
[{
  "id": "...",
  "action": "split_en"|"merge_groups"|"mixed_resegment_translate"|"needs_human",
  "merge_groups": null|[[0,1],[2]],
  "segments": null|[{ "index": 0, "he": "...", "en": "...", "source": "..." }],
  "en_segments": null|["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- When returning segments[], length MUST equal heSegs after your proposed fix.
- Prefer paired segments[] for evaluation whenever you rewrite or split EN.
- No corpus edits. Return JSON only.`;

// --- Load sources ---
const created = new Date().toISOString();
const enTruncReview = readJson(path.join(AUDIT, "EN_TRUNC_PACK_ALL_REVIEW.json"));
const enTruncEval = readJson(path.join(AUDIT, "EN_TRUNC_PACK_ALL_REVIEW_EVAL.json"));
const enTruncApply = readJson(path.join(AUDIT, "en_trunc_wave1_apply_log.json"));
const heReview = readJson(path.join(AUDIT, "HE_HAS_MORE_PACK_ALL_REVIEW.json"));
const heEval = readJson(path.join(AUDIT, "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json"));
const heWave2Apply = readJson(path.join(AUDIT, "he_has_more_wave2_apply_log.json"));
const heWave1Apply = readJson(path.join(AUDIT, "he_has_more_wave1_apply_log.json"));

const reviewById = (arr) => Object.fromEntries(arr.map((r) => [r.id, r]));
const enTruncReviewMap = reviewById(enTruncReview);
const heReviewMap = reviewById(heReview);

const appliedEnTrunc = new Set([
  ...(enTruncApply.applied ?? []).map((a) => a.id),
  ...(enTruncApply.held ?? []).map((h) => h.id),
  ...(enTruncEval.wave1_moderate_hold_ids ?? []),
]);

const appliedHeWave1 = new Set((heWave1Apply.applied ?? []).map((a) => a.id));
const appliedHeWave2 = new Set((heWave2Apply.applied ?? []).map((a) => a.id));

function enrichCase(c, review, extra = {}) {
  const rev = review?.[c.id];
  return {
    ...c,
    review_action: rev?.action ?? null,
    review_notes: rev?.notes ?? null,
    review_merge_groups: rev?.merge_groups ?? null,
    review_split_hints: rev?.split_hints ?? null,
    ...extra,
  };
}

// 1) EN_TRUNC editorial (~99)
const enTruncEditorialIds = enTruncReview
  .filter((r) => r.action === "needs_editorial")
  .map((r) => r.id)
  .filter((id) => !appliedEnTrunc.has(id));

const enTruncEditorialCases = enTruncEditorialIds.map((id) =>
  enrichCase(readCorpusCase(id, "en_truncated_vs_multi_he"), enTruncReviewMap, {
    tier: "editorial",
    eval_hold_editorial: true,
  })
);

// 2) WAVE2 held (18)
const wave2HeldCases = (heWave2Apply.held ?? []).map((h) =>
  enrichCase(readCorpusCase(h.id, "he_has_more_segments"), heReviewMap, {
    wave2_tier: "HOLD",
    hold_reason: h.reason ?? null,
    wave2_deficit: h.deficit ?? null,
    wave2_hints: h.hints ?? null,
    wave2_split_plan: h.splitPlan ?? null,
    enSegs_before: h.enSegsBefore ?? null,
    enSegs_after_auto: h.enSegsAfter ?? null,
  })
);

// 3) Likut split (53)
const likutIds = heEval.refined?.likut_merge_ids ?? heEval.likut_merge_ids ?? [];
const likutCases = likutIds
  .filter((id) => !appliedHeWave1.has(id) && !appliedHeWave2.has(id))
  .map((id) =>
    enrichCase(readCorpusCase(id, "he_has_more_segments"), heReviewMap, {
      eval_tier: "hold_semantic_likut_merge",
      wrong_review_action: "merge_groups",
    })
  );

// 4) EN_MISSING 2 held
const enMissing2Ids = [
  "yd1/siman173/seif-001/yad-avraham",
  "yd1/siman210/seif-001/yad-avraham",
];
const enMissing2Cases = enMissing2Ids.map((id) =>
  enrichCase(readCorpusCase(id, "en_missing"), null, {
    hold_reason:
      id.includes("siman173")
        ? "Noda BY Tinyana YD not CM citation fix required"
        : "HE garbled ?dl\"a — uncertain expansion",
  })
);

// 6) HE_HAS_MORE editorial (218)
const heEditorialIds = heReview
  .filter((r) => r.action === "needs_editorial")
  .map((r) => r.id)
  .filter((id) => !appliedHeWave1.has(id) && !appliedHeWave2.has(id));

const heEditorialCases = heEditorialIds.map((id) =>
  enrichCase(readCorpusCase(id, "he_has_more_segments"), heReviewMap, {
    tier: "editorial",
    eval_hold_editorial: true,
  })
);

// Top-50 worst deficit for index note
const heEditorialWorst50 = [...heEditorialCases]
  .sort((a, b) => b.he_deficit - a.he_deficit || a.id.localeCompare(b.id))
  .slice(0, 50)
  .map((c) => ({ id: c.id, he_deficit: c.he_deficit, heSegs: c.heSegs, enSegs: c.enSegs }));

const kitSummaries = [];

kitSummaries.push(
  buildKit({
    created,
    kit: "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT",
    cases: enTruncEditorialCases,
    packMetaBase: {
      kind: "en_truncated_vs_multi_he",
      tier: "editorial",
      mode: "fresh_multi_segment_translate",
      purpose:
        "EN truncated/garbled blob — fresh multi-segment translate from HE (needs_editorial tier)",
      source_lists: {
        review: "EN_TRUNC_PACK_ALL_REVIEW.json",
        eval: "EN_TRUNC_PACK_ALL_REVIEW_EVAL.json",
        exclusions: "wave1 applied/held + moderate resegment kit ids",
      },
      output_schema: {
        primary: "segments[] with index, he, en, source:fresh_translate",
        legacy_mirror: "en_segments[]",
      },
    },
    prompt: PROMPT_EN_TRUNC_EDITORIAL,
    mdTitle: "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT — needs_editorial fresh translate",
    mdNotes: [
      `${enTruncEditorialCases.length} cases (GPT review needs_editorial; excludes wave1 applied/held + moderate kit).`,
      "Paired segments[] output for evaluation before apply.",
    ],
  })
);

kitSummaries.push(
  buildKit({
    created,
    kit: "HE_HAS_MORE_WAVE2_HELD_KIT",
    cases: wave2HeldCases,
    packMetaBase: {
      kind: "he_has_more_segments",
      tier: "wave2_held",
      mode: "resegment_split_en",
      purpose: "Wave2 split_en held (18 Gra) — resegment EN to match HE Likut/lemma slots",
      source_lists: {
        apply_log: "he_has_more_wave2_apply_log.json",
        review: "HE_HAS_MORE_PACK_ALL_REVIEW.json",
      },
      output_schema: {
        primary: "segments[] with he+en per slot",
        legacy_mirror: "en_segments[]",
      },
    },
    prompt: PROMPT_WAVE2_HELD,
    mdTitle: "HE_HAS_MORE_WAVE2_HELD_KIT — wave2 held split_en (18 Gra)",
    mdNotes: [
      "18 cases held from wave2 auto split (insufficient markers / no marker at hint).",
      "Do NOT merge HE. Split EN to match heSegs.",
    ],
  })
);

kitSummaries.push(
  buildKit({
    created,
    kit: "HE_HAS_MORE_LIKUT_SPLIT_KIT",
    cases: likutCases,
    packMetaBase: {
      kind: "he_has_more_segments",
      tier: "hold_semantic_likut_merge",
      mode: "split_en_not_merge_he",
      purpose: "53 Gra Likut cases — split EN to match HE; reject wrong merge_groups",
      source_lists: {
        eval: "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json#likut_merge_ids",
        review: "HE_HAS_MORE_PACK_ALL_REVIEW.json",
      },
      output_schema: {
        primary: "segments[] with he+en per slot",
        legacy_mirror: "en_segments[]",
      },
    },
    prompt: PROMPT_LIKUT_SPLIT,
    mdTitle: "HE_HAS_MORE_LIKUT_SPLIT_KIT — split EN not merge HE (53 Gra Likut)",
    mdNotes: [
      "53 beur-hagra Likut cases where GPT wrongly proposed merge_groups.",
      "Prompt explicitly forbids HE merge; split EN at Likut/Collected markers.",
    ],
  })
);

kitSummaries.push(
  buildKit({
    created,
    kit: "EN_MISSING_2_HELD_KIT",
    cases: enMissing2Cases,
    packMetaBase: {
      kind: "en_missing",
      tier: "held_from_apply",
      mode: "fresh_translate",
      purpose: "2 held en_missing — fresh translate with citation/HE fixes",
      source_lists: { apply: "EN_MISSING_APPLY.md" },
      output_schema: {
        primary: "segments[] + en_segments[]",
        legacy_mirror: "en_segments[]",
      },
    },
    prompt: PROMPT_EN_MISSING_2,
    mdTitle: "EN_MISSING_2_HELD_KIT — 2 residual en_missing holds",
    mdNotes: [
      "siman173: fix Tinyana YD not CM citation.",
      "siman210: garbled HE — cautious translate or needs_human.",
      "Single JSON (2 cases); no parts expected.",
    ],
  })
);

kitSummaries.push(
  buildKit({
    created,
    kit: "HE_HAS_MORE_EDITORIAL_KIT",
    cases: heEditorialCases,
    packMetaBase: {
      kind: "he_has_more_segments",
      tier: "editorial",
      mode: "resegment_offset_fix",
      purpose: "218 needs_editorial he_has_more — resegment/offset fix or human escalation",
      source_lists: {
        review: "HE_HAS_MORE_PACK_ALL_REVIEW.json",
        eval: "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json",
      },
      counts_extra: {
        worst_50_by_he_deficit: heEditorialWorst50,
        remainder_note: "Full kit includes all editorial ids; prioritize worst deficit first in ChatGPT sessions",
      },
      output_schema: {
        primary: "segments[] or merge_groups/split_en proposal",
        legacy_mirror: "en_segments[] when segments returned",
      },
    },
    prompt: PROMPT_HE_EDITORIAL,
    mdTitle: "HE_HAS_MORE_EDITORIAL_KIT — needs_editorial structure review (218)",
    mdNotes: [
      `${heEditorialCases.length} cases (GPT needs_editorial; excludes wave1/wave2 applied).`,
      "Full text in parent pack; parts ≤85k. Worst-50 by he-en deficit listed in meta.counts.worst_50_by_he_deficit.",
    ],
  })
);

// --- Update index ---
const crossLinks = {
  GLUED_STILL_OPEN_9_KIT: fileMeta("GLUED_STILL_OPEN_9_KIT.json"),
  EN_TRUNC_MODERATE_RESEGMENT_KIT: fileMeta("EN_TRUNC_MODERATE_RESEGMENT_KIT.json"),
  HE_HAS_MORE_PACK: fileMeta("HE_HAS_MORE_PACK.json"),
  EN_TRUNC_PACK: fileMeta("EN_TRUNC_PACK.json"),
  HE_MISSING_MISALIGN_PACK: fileMeta("HE_MISSING_MISALIGN_PACK.json"),
  EN_MISSING_PACK: fileMeta("EN_MISSING_PACK.json"),
};

const priorKits = [
  {
    kit: "HE_MISSING_MISALIGN_PACK",
    kind: "he_missing",
    purpose: "Misalignment: empty HE + EN present — restore HE or flag wrong-seif",
    ...pickMeta(crossLinks.HE_MISSING_MISALIGN_PACK, "HE_MISSING_MISALIGN_PACK.json"),
    cases: 59,
    parts: 1,
  },
  {
    kit: "EN_MISSING_PACK",
    kind: "en_missing",
    purpose: "HE present, EN absent — fresh translate (18/20 applied; 2 in EN_MISSING_2_HELD_KIT)",
    ...pickMeta(crossLinks.EN_MISSING_PACK, "EN_MISSING_PACK.json"),
    cases: 20,
    parts: 1,
  },
  {
    kit: "EN_TRUNC_PACK",
    kind: "en_truncated_vs_multi_he",
    purpose: "Split single EN blob vs multi HE, or escalate",
    ...pickMeta(crossLinks.EN_TRUNC_PACK, "EN_TRUNC_PACK.json"),
    cases: 215,
    parts: 12,
  },
  {
    kit: "EN_TRUNC_MODERATE_RESEGMENT_KIT",
    kind: "en_truncated_vs_multi_he (moderate)",
    purpose: "Wave1 moderate en_trunc — map EN blob to HE slots; translate gaps",
    ...pickMeta(crossLinks.EN_TRUNC_MODERATE_RESEGMENT_KIT, "EN_TRUNC_MODERATE_RESEGMENT_KIT.json"),
    cases: 78,
    parts: 4,
  },
  {
    kit: "HE_HAS_MORE_PACK",
    kind: "he_has_more_segments",
    purpose: "Structure review when HE has more segments than EN",
    ...pickMeta(crossLinks.HE_HAS_MORE_PACK, "HE_HAS_MORE_PACK.json"),
    cases: 395,
    parts: 66,
  },
];

function pickMeta(meta, jsonName) {
  if (!meta) return { path: `./${jsonName}`, max_part_bytes: null, full_sha256: null };
  return {
    path: `./${jsonName}`,
    max_part_bytes: null,
    full_sha256: meta.sha256,
  };
}

const allKitRows = [...priorKits, ...kitSummaries].map((k) => {
  const sha = k.full_sha256 ?? k.full_sha256;
  const shaPrefix = sha ? `\`${String(sha).slice(0, 12)}…\` ` : "—";
  const parts = k.parts ?? k.parts_detail?.length ?? "—";
  const maxBytes = k.max_part_bytes?.toLocaleString?.() ?? k.max_part_bytes ?? "—";
  return `| \`${k.kit}\` | ${k.kind ?? "—"} | ${k.cases} | ${parts} | ${maxBytes} | ${shaPrefix} | [\`${k.kit}.json\`](./${k.kit}.json) |`;
});

const purposeLines = [...priorKits, ...kitSummaries]
  .map((k) => `- **${k.kit}**: ${k.purpose}`)
  .join("\n");

const indexMd = `# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN \`<br>\`-segment mismatches. **Audit only — no corpus apply.**

Generated: ${created}  
Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/\`  
LIVE audit base: \`newtry/SA_Rebuild/audit/he_en_segment_mismatch/\`

## Run order (recommended)

1. **HE_MISSING_MISALIGN_PACK** — empty HE + EN present (misalignment / wrong-seif / missing HE).
2. **EN_MISSING_2_HELD_KIT** — 2 residual en_missing holds (fresh translate + citation fix).
3. **EN_TRUNC_MODERATE_RESEGMENT_KIT** — wave1 moderate (78): re-segment with aligned HE+EN pairs.
4. **EN_TRUNC_EDITORIAL_RETRANSLATE_KIT** — needs_editorial en_trunc (~99): fresh multi-segment translate from HE.
5. **HE_HAS_MORE_WAVE2_HELD_KIT** — wave2 held split_en (18 Gra): resegment EN to match HE.
6. **HE_HAS_MORE_LIKUT_SPLIT_KIT** — 53 Gra Likut wrong-merge: split EN not merge HE.
7. **HE_HAS_MORE_EDITORIAL_KIT** — needs_editorial he_has_more (218): resegment / offset / human.
8. **GLUED_STILL_OPEN_9_KIT** — remaining glued EN overs (cross-link; already built).

## Kits (this run + prior)

| Kit | Kind | Cases | Parts | Max part bytes | Full SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|----------------------:|------|
${allKitRows.join("\n")}

### One-line purpose

${purposeLines}

## Apply log (post-kit)

- **2026-08-28:** EN_MISSING 18/20 applied; 2 held → **EN_MISSING_2_HELD_KIT**.
- **2026-08-28:** EN_TRUNC wave1 strict 21/24 applied; moderate → **EN_TRUNC_MODERATE_RESEGMENT_KIT** (user running in ChatGPT).
- **2026-08-28:** HE_HAS_MORE wave1 merge 62 applied; wave2 split 38/56 applied; 18 held → **HE_HAS_MORE_WAVE2_HELD_KIT**; 53 Likut wrong-merge → **HE_HAS_MORE_LIKUT_SPLIT_KIT**.

## Existing glued kit (cross-link; not rebuilt)

| Artifact | Exists | Bytes | SHA-256 (prefix) |
|----------|:------:|------:|------------------|
| \`GLUED_STILL_OPEN_9_KIT.json\` | ${crossLinks.GLUED_STILL_OPEN_9_KIT ? "yes" : "no"} | ${crossLinks.GLUED_STILL_OPEN_9_KIT?.bytes?.toLocaleString() ?? "—"} | ${crossLinks.GLUED_STILL_OPEN_9_KIT ? "`" + crossLinks.GLUED_STILL_OPEN_9_KIT.sha256.slice(0, 12) + "…`" : "—"} |

See: [\`GLUED_STILL_OPEN_9_KIT.md\`](./GLUED_STILL_OPEN_9_KIT.md)

## Case fields (all kits)

Each case includes: \`id\`, \`volume\`, \`siman\`, \`seif\`, \`slug\`, \`kind\`, \`heSegs\`, \`enSegs\`, \`he_segments[]\`, \`en_segments[]\` (full stripped text), plus review/apply metadata where applicable.

## HE_HAS_MORE editorial priority

Worst 50 by \`heSegs - enSegs\` deficit are listed in \`HE_HAS_MORE_EDITORIAL_KIT.json\` → \`meta.counts.worst_50_by_he_deficit\`. Process those first if batching ChatGPT sessions.
`;

writeAtomic(path.join(AUDIT, "SEGMENT_GPT_KITS_INDEX.md"), indexMd);

const master = {
  created,
  corpus: CORPUS,
  kits: kitSummaries,
  counts: {
    en_trunc_editorial: enTruncEditorialCases.length,
    wave2_held: wave2HeldCases.length,
    likut_split: likutCases.length,
    en_missing_held: enMissing2Cases.length,
    he_has_more_editorial: heEditorialCases.length,
  },
  crossLinks: { GLUED_STILL_OPEN_9_KIT: crossLinks.GLUED_STILL_OPEN_9_KIT },
};
writeAtomic(
  path.join(AUDIT, "REMAINING_OPEN_GPT_KITS_BUILD.json"),
  JSON.stringify(master, null, 2)
);

console.log(JSON.stringify(master, null, 2));
