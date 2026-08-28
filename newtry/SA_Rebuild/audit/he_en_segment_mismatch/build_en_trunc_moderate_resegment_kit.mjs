/**
 * Build EN_TRUNC_MODERATE_RESEGMENT_KIT — wave1 moderate tier (~78 cases).
 * Live corpus read for current he/en segments. Audit JSON/MD only.
 *
 *   node build_en_trunc_moderate_resegment_kit.mjs
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

const KIT = "EN_TRUNC_MODERATE_RESEGMENT_KIT";
const MAX_PART_BYTES = 85_000;
const VOL_ORDER = { oc1: 0, yd1: 1, eh1: 2, cm1: 3 };

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

function readCorpusCase(id) {
  const [vol, sim, seif, slug] = id.split("/");
  const hePath = path.join(CORPUS, vol, sim, seif, slug, "he.html");
  const enPath = path.join(CORPUS, vol, sim, seif, slug, "en.html");
  const heExists = fs.existsSync(hePath);
  const enExists = fs.existsSync(enPath);
  const heRaw = heExists ? fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "") : "";
  const enRaw = enExists ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "") : "";
  const heParts = splitHtmlByBrSegments(heRaw);
  const enParts = splitHtmlByBrSegments(enRaw);
  return {
    id,
    volume: vol,
    siman: simanNum(sim),
    seif: seifNum(seif),
    slug,
    kind: "en_truncated_vs_multi_he",
    heSegs: heParts.length,
    enSegs: enParts.length,
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
      const bytes = Buffer.byteLength(buildPartJson(cases.slice(i, i + mid), 1, 1, i), "utf8");
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
      console.log(`[moderate-kit] truncated oversized case ${originalId} → ${bytes} bytes`);
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
  for (let n = chunks.length + 1; n <= 99; n++) {
    const stale = path.join(AUDIT, `${packBaseName}_part${String(n).padStart(2, "0")}.json`);
    if (fs.existsSync(stale)) fs.unlinkSync(stale);
  }
  return partInfos;
}

const PROMPT = `SA_Rebuild EN_TRUNC MODERATE — RE-SEGMENT WITH ALIGNED HE+EN PAIRS.

INPUTS (both required)
1) EN_TRUNC_MODERATE_RESEGMENT_KIT.json (or one part; this chunk only)
2) full_dictionary.md (attached by the user — follow it without exception)

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation per the dictionary; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use the dictionary transliteration/rendering for every listed term (e.g. muktzeh, melacha, kli rishon, yad soledes bo, psik reisha, d'oraisa, d'rabbanan, l'chatchila, b'dieved).
- Part 3 — commentator names: use names exactly as listed (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per the dictionary.
- Never invent alternate glosses when the dictionary specifies a term.

CONTEXT
- Each case has heSegs > 1 and enSegs === 1 (one EN blob vs multiple HE segments).
- Tier: wave1_moderate — structural split is plausible (high EN/HE ratio) but lacks reliable auto-delimiters; sentence-boundary or semantic alignment required.
- Wave1 strict (24 ids) was already auto-applied or held separately; this kit excludes those.
- Goal: produce heSegs aligned EN segments mapped to each HE slot. Prefer splitting the existing EN blob; translate from HE only where the EN blob clearly lacks material for that HE slot.

TRANSLATION NORMS (when fresh_translate needed)
- Complete: translate every clause; no omissions, summarizing, or paraphrasing away content.
- No additions: no introductions, notes, "Note:", or explanations beyond the source.
- Rama glosses introduced by הגה → {Rama: ...} (curly braces).
- Plain English only — no "Translation:" label, no markdown wrappers around segment text.
- Where norms and full_dictionary.md conflict, full_dictionary.md wins.

TASK
For each case:
1) Align EN to HE slots (index 0 .. heSegs-1).
2) When the existing EN blob clearly contains the translation for a HE slot: split it out (source: split_existing_en). Preserve exact wording where possible.
3) When EN is missing for a HE slot (truncated blob, partial coverage): translate that slot from HE only (source: fresh_translate).
4) When a slot mixes preserved EN cut + gap-fill translation: source: partial.
5) If alignment is unsafe: action needs_human; still return segments[] with best-effort he+en if possible, or empty en for unclear slots.

ACTIONS
- resegment — EN blob splits cleanly into heSegs pieces; no new translation needed.
- mixed_resegment_translate — some slots from EN split, some fresh from HE.
- needs_human — unsafe / ambiguous; flag for manual review.

OUTPUT — JSON array only, same ids/order as input cases:
[{
  "id": "...",
  "action": "resegment" | "mixed_resegment_translate" | "needs_human",
  "segments": [
    {
      "index": 0,
      "he": "...",
      "en": "...",
      "source": "split_existing_en" | "fresh_translate" | "partial"
    }
  ],
  "en_segments": ["...", "..."],
  "notes": "short",
  "confidence": "high"|"medium"|"low"
}]

CONSTRAINTS
- segments.length MUST equal that case's heSegs (and match he_segments 1:1).
- Each segment object MUST include both he and en side-by-side for evaluation.
- en_segments[] (legacy mirror) should match segments[].en in order when present.
- source on each segment documents whether EN came from blob split vs fresh translation.
- No corpus edits. Return JSON only.`;

// --- Load sources ---
const evalPath = path.join(AUDIT, "EN_TRUNC_PACK_ALL_REVIEW_EVAL.json");
const applyLogPath = path.join(AUDIT, "en_trunc_wave1_apply_log.json");
const reviewPath = path.join(AUDIT, "EN_TRUNC_PACK_ALL_REVIEW.json");

const evalDoc = readJson(evalPath);
const applyLog = readJson(applyLogPath);
const reviewArr = readJson(reviewPath);
const reviewById = Object.fromEntries(reviewArr.map((r) => [r.id, r]));

const moderateIds = evalDoc.wave1_moderate_hold_ids ?? [];
const excludeApplied = new Set((applyLog.applied ?? []).map((a) => a.id));
const excludeHeld = new Set((applyLog.held ?? []).map((h) => h.id));
const excludeStrict = new Set([
  ...(evalDoc.wave1_strict_ids ?? []),
  ...excludeApplied,
  ...excludeHeld,
]);

const targetIds = moderateIds.filter((id) => !excludeStrict.has(id));
const excludedFromModerate = moderateIds.filter((id) => excludeStrict.has(id));

console.log(`[moderate-kit] moderate tier=${moderateIds.length} exclude strict overlap=${excludedFromModerate.length} target=${targetIds.length}`);

const cases = [];
const warnings = [];

for (const id of targetIds) {
  let c;
  try {
    c = readCorpusCase(id);
  } catch (e) {
    warnings.push({ id, error: String(e.message) });
    continue;
  }
  if (c.enSegs !== 1 || c.heSegs <= 1) {
    warnings.push({
      id,
      note: `live state enSegs=${c.enSegs} heSegs=${c.heSegs} (expected enSegs=1 heSegs>1)`,
    });
  }
  const rev = reviewById[id];
  const spot = (evalDoc.spot ?? []).find((s) => s.id === id);
  cases.push({
    ...c,
    tier: "wave1_moderate",
    review_action: rev?.action ?? null,
    review_split_plan: rev?.split_plan ?? null,
    review_notes: rev?.notes ?? null,
    eval_coverage_ratio: spot?.coverage_ratio ?? null,
    eval_cues: spot?.cues ?? null,
  });
}

sortCases(cases);

const created = new Date().toISOString();
const byVol = countBy(cases, (c) => c.volume);
const bySlug = countBy(cases, (c) => `${c.volume}/${c.slug}`);

const packMetaBase = {
  created,
  kit: KIT,
  kind: "en_truncated_vs_multi_he",
  tier: "wave1_moderate",
  purpose:
    "Re-segment moderate en_trunc: map existing EN to HE slots; translate from HE only where EN missing for that slot. Output aligned he+en pairs for evaluation.",
  corpus: CORPUS,
  split: "normalize consecutive <br> then split on <br>; strip tags for segment text",
  source_lists: {
    eval: "EN_TRUNC_PACK_ALL_REVIEW_EVAL.json",
    pack: "EN_TRUNC_PACK.json",
    apply_log: "en_trunc_wave1_apply_log.json",
  },
  exclusions: {
    wave1_strict_applied: [...excludeApplied],
    wave1_strict_held: [...excludeHeld],
    excluded_from_moderate_overlap: excludedFromModerate,
    editorial_tier_excluded: "99 needs_editorial cases — separate kit later",
  },
  counts: {
    total: cases.length,
    moderate_tier_raw: moderateIds.length,
    by_volume: byVol,
    by_volume_slug: bySlug,
  },
  output_schema: {
    primary: "segments[] with he+en side-by-side per slot",
    legacy_mirror: "en_segments[] optional",
    segment_source: "split_existing_en | fresh_translate | partial",
  },
  instructions_for_reviewer: PROMPT.split("\n"),
  warnings,
};

const fullPack = { meta: packMetaBase, cases };
const fullJson = JSON.stringify(fullPack, null, 2);
const fullPath = path.join(AUDIT, `${KIT}.json`);
writeAtomic(fullPath, fullJson);
const fullBytes = Buffer.byteLength(fullJson, "utf8");
const fullSha = sha256(fullJson);

const partInfos = packCases(cases, KIT, packMetaBase, fullSha);

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

const md = `# ${KIT} — EN_TRUNC wave1 moderate re-segment (aligned HE+EN eval)

**For external AI review only. Do not apply to corpus until after human/parent check.**

Side-by-side \`segments[].he\` + \`segments[].en\` pairs make slot alignment auditable before any corpus apply.

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **${cases.length}** |
| Moderate tier (eval) | ${moderateIds.length} |
| Excluded (strict overlap) | ${excludedFromModerate.length} |
| Wave1 strict applied (excluded) | ${excludeApplied.size} |
| Wave1 strict held (excluded) | ${excludeHeld.size} |
| Editorial tier (not in kit) | 99 |

### By volume

| Volume | Count |
|--------|------:|
${volRows || "| — | 0 |"}

## Files

- Full kit: [\`${KIT}.json\`](./${KIT}.json)
  - UTF-8 bytes: ${fullBytes.toLocaleString()}
  - SHA-256: \`${fullSha}\`
  - Cases: ${cases.length}
- Parts: each ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes (hard cap)
- Dictionary (user attaches): **\`full_dictionary.md\`** — see [\`DICTIONARY_REF.md\`](./DICTIONARY_REF.md)
- Source eval: [\`EN_TRUNC_PACK_ALL_REVIEW_EVAL.json\`](./EN_TRUNC_PACK_ALL_REVIEW_EVAL.json)
- Apply log (strict excluded): [\`en_trunc_wave1_apply_log.json\`](./en_trunc_wave1_apply_log.json)
- Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/\`
- Created: ${created}

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
${partTable || "| — | — | 0 | 0 | — | — | |"}

## ChatGPT prompt (re-segment with aligned HE+EN pairs)

Paste this prompt together with **both** attachments: (1) one \`${KIT}.json\` / \`${KIT}_partNN.json\` file, and (2) **\`full_dictionary.md\`**. Return a JSON array for **only** the case ids in that chunk.

\`\`\`
${PROMPT}
\`\`\`

## Notes

- Moderate tier only; 99 \`needs_editorial\` cases excluded (separate fresh-translate kit later).
- Wave1 strict (21 applied + 3 held) excluded from this kit.
- Live corpus rescan for current \`he_segments[]\` / \`en_segments[]\`.
- Paired \`segments[].he\` + \`segments[].en\` output enables per-slot evaluation before apply.
- No corpus apply from this kit.
${warnings.length ? `\n### Warnings (${warnings.length})\n\n${warnings.map((w) => `- \`${w.id}\`: ${w.note ?? w.error}`).join("\n")}` : ""}
`;

writeAtomic(path.join(AUDIT, `${KIT}.md`), md);

const buildSummary = {
  kit: KIT,
  created,
  cases: cases.length,
  moderate_tier_raw: moderateIds.length,
  excluded_overlap: excludedFromModerate.length,
  full: { path: fullPath, bytes: fullBytes, sha256: fullSha },
  parts: partInfos,
  warnings,
};
writeAtomic(path.join(AUDIT, `${KIT}_BUILD.json`), JSON.stringify(buildSummary, null, 2));

console.log(JSON.stringify(buildSummary, null, 2));
