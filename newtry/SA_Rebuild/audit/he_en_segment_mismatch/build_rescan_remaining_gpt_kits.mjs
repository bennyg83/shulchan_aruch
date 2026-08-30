/**
 * Rescan-driven rebuild of GPT kits — only cells still flagged post-apply (2026-08-28).
 * Excludes he_missing entirely. Audit JSON/MD only; no corpus apply.
 *
 *   node build_rescan_remaining_gpt_kits.mjs
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
const VOLS = ["oc1", "yd1", "eh1", "cm1"];
const VOL_ORDER = { oc1: 0, yd1: 1, eh1: 2, cm1: 3 };

function readJson(p) {
  if (!fs.existsSync(p)) return null;
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

function visuallyEmpty(html) {
  return stripTags(html).length === 0;
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

function fpPattern(kind, slug, heS, enS, heRaw, enRaw) {
  if (kind === "he_missing") return "fp_zero_he_by_design";
  if (kind === "en_missing") return "true_en_missing";
  if (kind === "en_truncated_vs_multi_he") {
    const likut = heS.filter((x) => /^\(ליקוט\)/.test(stripTags(x))).length;
    if (likut > 0) return "true_likut_en_merged";
    if (slug === "beer-hagolah") return "true_beer_degree_split";
    return "true_en_truncated";
  }
  if (kind === "he_has_more_segments") {
    const likut = heS.filter((x) => /^\(ליקוט\)/.test(stripTags(x))).length;
    if (likut > 0 && enS.length < heS.length) return "true_likut_en_merged";
    if (slug === "beer-hagolah") return "true_beer_degree_split";
    if (/<p\b|<div\b/i.test(heRaw) || /<p\b|<div\b/i.test(enRaw))
      return "fp_html_block_vs_br";
    if (enS.some((s) => /<br/i.test(s))) return "fp_inline_br_in_en";
    return "true_offset_editorial";
  }
  if (kind === "en_has_more_segments") {
    if (enS.some((s) => /<br/i.test(s))) return "fp_inline_br_in_en";
    return "true_en_oversplit";
  }
  return "other";
}

function* walkCorpus() {
  for (const vol of VOLS) {
    const volRoot = path.join(CORPUS, vol);
    if (!fs.existsSync(volRoot)) continue;
    for (const simanEnt of fs.readdirSync(volRoot, { withFileTypes: true })) {
      if (!simanEnt.isDirectory() || !/^siman\d+$/i.test(simanEnt.name)) continue;
      const simanDir = path.join(volRoot, simanEnt.name);
      for (const seifEnt of fs.readdirSync(simanDir, { withFileTypes: true })) {
        if (!seifEnt.isDirectory() || !seifEnt.name.startsWith("seif-")) continue;
        const seifDir = path.join(simanDir, seifEnt.name);
        for (const slugEnt of fs.readdirSync(seifDir, { withFileTypes: true })) {
          if (!slugEnt.isDirectory()) continue;
          yield {
            vol,
            siman: simanEnt.name,
            seif: seifEnt.name,
            slug: slugEnt.name,
            slugDir: path.join(seifDir, slugEnt.name),
          };
        }
      }
    }
  }
}

function scanOpenIssues() {
  const issues = [];
  for (const { vol, siman, seif, slug, slugDir } of walkCorpus()) {
    const hePath = path.join(slugDir, "he.html");
    const enPath = path.join(slugDir, "en.html");
    const heExists = fs.existsSync(hePath);
    const enExists = fs.existsSync(enPath);
    const heRaw = heExists ? fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "") : "";
    const enRaw = enExists ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "") : "";
    const heParts = splitHtmlByBrSegments(heRaw);
    const enParts = splitHtmlByBrSegments(enRaw);
    const cls = classify(heParts, enParts, heRaw, enRaw);
    if (!cls || cls.kind === "he_missing") continue;
    const id = `${vol}/${siman}/${seif}/${slug}`;
    issues.push({
      id,
      volume: vol,
      siman: simanNum(siman),
      seif: seifNum(seif),
      slug,
      kind: cls.kind,
      heSegs: cls.heN,
      enSegs: cls.enN,
      he_deficit: Math.max(0, cls.heN - cls.enN),
      en_deficit: Math.max(0, cls.enN - cls.heN),
      he_file_present: heExists,
      en_file_present: enExists,
      he_segments: heParts.map(stripTags),
      en_segments: enParts.map(stripTags),
      fp_pattern: fpPattern(cls.kind, slug, heParts, enParts, heRaw, enRaw),
    });
  }
  return issues;
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

function evalIds(file, verdicts) {
  const d = readJson(path.join(AUDIT, file));
  if (!d?.results) return new Set();
  const vs = new Set(verdicts);
  return new Set(d.results.filter((r) => vs.has(r.verdict)).map((r) => r.id));
}

function evalMap(file) {
  const d = readJson(path.join(AUDIT, file));
  if (!d?.results) return {};
  return Object.fromEntries(d.results.map((r) => [r.id, r]));
}

function kitIds(file) {
  const d = readJson(path.join(AUDIT, file));
  return new Set((d?.cases ?? []).map((c) => c.id));
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
      } else hi = mid - 1;
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
    // Never truncate segment text — GPT reviewers need full HE/EN for offset fixes.
    // Single-case parts may exceed hard_cap; parent pack also ships in zip.
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
      exceeds_hard_cap: bytes > MAX_PART_BYTES,
    });
  }
  removeStaleParts(packBaseName, chunks.length);
  return partInfos;
}

function buildKit(def) {
  const { kit, cases, packMetaBase, prompt, mdTitle, mdNotes = [] } = def;
  if (cases.length === 0) {
    console.log(`[kits] ${kit}: SKIP (0 cases)`);
    return null;
  }
  sortCases(cases);
  const byVol = countBy(cases, (c) => c.volume);
  const fullMeta = {
    ...packMetaBase,
    created: def.created,
    kit,
    counts: {
      total: cases.length,
      by_volume: byVol,
      by_kind: countBy(cases, (c) => c.kind),
      by_fp_pattern: countBy(cases, (c) => c.fp_pattern ?? "—"),
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
  writeAtomic(path.join(AUDIT, `${kit}.json`), fullJson);
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
        `| ${p.part} | \`${p.file}\` | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | \`${p.sha256.slice(0, 12)}…\` | ${p.exceeds_hard_cap ? "over cap" : ""} |`
    )
    .join("\n");
  const maxPartBytes = partInfos.reduce((m, p) => Math.max(m, p.bytes), 0);
  const overCapParts = partInfos.filter((p) => p.exceeds_hard_cap).length;

  const md = `# ${mdTitle}

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: \`${packMetaBase.mode}\` · Dictionary: attach **\`full_dictionary.md\`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **${cases.length}** |

### By volume

| Volume | Count |
|--------|------:|
${volRows}

## Files

- Full kit: [\`${kit}.json\`](./${kit}.json) (${fullBytes.toLocaleString()} bytes, SHA \`${fullSha.slice(0, 12)}…\`)
- Parts: target ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip includes **full parent** \`${kit}.json\` plus all parts
- Created: ${def.created}

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
${partTable}

${overCapParts ? `\\* ${overCapParts} part(s) exceed 85k target — full segment text preserved (no truncation).` : ""}

## ChatGPT prompt

\`\`\`
${prompt}
\`\`\`

## Notes

${mdNotes.map((n) => `- ${n}`).join("\n")}
- Rescan-driven _REMAINING kit (2026-08-28). No corpus apply.
`;

  writeAtomic(path.join(AUDIT, `${kit}.md`), md);
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
  console.log(`[kits] ${kit}: cases=${cases.length} parts=${partInfos.length}`);
  return buildSummary;
}

// --- Prompts (kit names updated for _REMAINING) ---
const DICT = `DICTIONARY (mandatory — full_dictionary.md)
- Expand abbreviations; halachic terms per dictionary; commentator names exact; Arabic numerals; connectives per dictionary.`;

const NORMS = `TRANSLATION NORMS
- Complete translation; no omissions. No additions beyond source. {Rama: ...} for Rama glosses. Plain English only.`;

function promptFor(kitBase, body) {
  return body.replace(/_KIT\.json/g, `${kitBase}.json`);
}

const PROMPTS = {
  EN_MISSING_2_REMAINING: promptFor(
    "EN_MISSING_2_REMAINING",
    `SA_Rebuild EN_MISSING REMAINING — FRESH TRANSLATE FROM HEBREW.

INPUTS: EN_MISSING_2_REMAINING.json + full_dictionary.md
${DICT}
${NORMS}

OUTPUT — JSON array only:
[{"id":"...","action":"fresh_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
en_segments.length === heSegs. No corpus edits.`
  ),
  EN_HAS_MORE_REMAINING: promptFor(
    "EN_HAS_MORE_REMAINING",
    `SA_Rebuild EN_HAS_MORE / GLUED REMAINING — REWRITE EN BY HE SLOT.

INPUTS: EN_HAS_MORE_REMAINING.json (or one part) + full_dictionary.md
${DICT}

CONTEXT: enSegs > heSegs (oversplit/glued EN). Pair_map hints may be present. Rewrite one EN segment per HE slot.

OUTPUT — JSON array only:
[{"id":"...","action":"rewrite_en_by_he_slot"|"needs_human","pair_map":null|[[0,3]],"corrected_en":null|["..."],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
en_segments.length === heSegs. No corpus edits.`
  ),
  EN_TRUNC_MODERATE_REMAINING: promptFor(
    "EN_TRUNC_MODERATE_REMAINING",
    `SA_Rebuild EN_TRUNC MODERATE REMAINING — RE-SEGMENT WITH ALIGNED HE+EN PAIRS.

INPUTS: EN_TRUNC_MODERATE_REMAINING.json (or one part) + full_dictionary.md
${DICT}

CONTEXT: Prior moderate kit HOLD/REJECT; still en_truncated in rescan. Split EN blob to heSegs slots; fresh_translate gaps only.

OUTPUT — JSON array only:
[{"id":"...","action":"resegment"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"|"partial"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.`
  ),
  EN_TRUNC_EDITORIAL_REMAINING: promptFor(
    "EN_TRUNC_EDITORIAL_REMAINING",
    `SA_Rebuild EN_TRUNC EDITORIAL REMAINING — FRESH MULTI-SEGMENT TRANSLATE.

INPUTS: EN_TRUNC_EDITORIAL_REMAINING.json (or one part) + full_dictionary.md
${DICT}
${NORMS}

CONTEXT: needs_editorial en_trunc still open after part01 apply + parts 02-06 never run.

OUTPUT — JSON array only:
[{"id":"...","action":"fresh_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.`
  ),
  BEER_DEGREE_SPLIT_REMAINING: promptFor(
    "BEER_DEGREE_SPLIT_REMAINING",
    `SA_Rebuild BEER-HAGOLAH DEGREE SPLIT REMAINING — SPLIT EN AT DEGREE MARKERS.

INPUTS: BEER_DEGREE_SPLIT_REMAINING.json (or one part) + full_dictionary.md
${DICT}

CONTEXT: beer-hagolah degree/footnote splits — HE has 2+ segments, EN under-split. Split EN at degree markers matching HE; do not merge HE.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.`
  ),
  EN_TRUNC_REMAINING: promptFor(
    "EN_TRUNC_REMAINING",
    `SA_Rebuild EN_TRUNC REMAINING — RESEGMENT OR FRESH TRANSLATE.

INPUTS: EN_TRUNC_REMAINING.json (or one part) + full_dictionary.md
${DICT}
${NORMS}

CONTEXT: Residual en_truncated not in moderate/editorial/beer kits. Prefer split EN blob; fresh_translate if garbled.

OUTPUT — JSON array only:
[{"id":"...","action":"resegment"|"mixed_resegment_translate"|"fresh_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No corpus edits.`
  ),
  HE_HAS_MORE_LIKUT_REMAINING: promptFor(
    "HE_HAS_MORE_LIKUT_REMAINING",
    `SA_Rebuild HE_HAS_MORE LIKUT REMAINING — SPLIT EN (content_drift holds).

INPUTS: HE_HAS_MORE_LIKUT_REMAINING.json (or one part) + full_dictionary.md
${DICT}

CONTEXT: 13 prior Likut kit HOLD (content_drift). Split EN at (Likut)|(Collected)|(Supplement); never merge HE.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No merge_groups on HE. No corpus edits.`
  ),
  HE_HAS_MORE_EDITORIAL_REMAINING: promptFor(
    "HE_HAS_MORE_EDITORIAL_REMAINING",
    `SA_Rebuild HE_HAS_MORE EDITORIAL REMAINING — RESEGMENT / OFFSET FIX.

INPUTS: HE_HAS_MORE_EDITORIAL_REMAINING.json (or one part) + full_dictionary.md
${DICT}

CONTEXT: Prior editorial kit HOLD (91). Offset/structure fix; merge_groups only for true HE continuation.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"merge_groups"|"mixed_resegment_translate"|"needs_human","merge_groups":null|[[0,1]],"segments":null|[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":null|["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
When segments[] returned, length === heSegs. No corpus edits.`
  ),
  HE_HAS_MORE_LIKUT_MERGED_REMAINING: promptFor(
    "HE_HAS_MORE_LIKUT_MERGED_REMAINING",
    `SA_Rebuild HE_HAS_MORE LIKUT MERGED REMAINING — SPLIT EN TO MATCH HE LIKUT SLOTS.

INPUTS: HE_HAS_MORE_LIKUT_MERGED_REMAINING.json (or one part) + full_dictionary.md
${DICT}

CONTEXT: true_likut_en_merged pattern — HE has (ליקוט) segments, EN under-split. Split EN; never merge distinct HE Likut notes.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs. No merge_groups on HE. No corpus edits.`
  ),
  HE_HAS_MORE_OFFSET_REMAINING: promptFor(
    "HE_HAS_MORE_OFFSET_REMAINING",
    `SA_Rebuild HE_HAS_MORE OFFSET REMAINING — RESEGMENT / OFFSET FIX.

INPUTS: HE_HAS_MORE_OFFSET_REMAINING.json (full parent pack — attach even when reviewing one part) + full_dictionary.md
${DICT}

CONTEXT: Residual he_has_more (true_offset_editorial) not in likut/editorial kits.
CORPUS TEXT: he_segments[] and en_segments[] are COMPLETE from live corpus (no truncation). If alignment remains ambiguous after review, mark needs_human with a short reason.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"merge_groups"|"mixed_resegment_translate"|"needs_human","segments":[{"index":0,"he":"...","en":"...","source":"..."}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs after fix. No corpus edits.`
  ),
};

// --- Scan + route ---
const created = new Date().toISOString();
const openIssues = scanOpenIssues();
const openById = Object.fromEntries(openIssues.map((o) => [o.id, o]));

const moderateHoldReject = new Set([
  ...evalIds("EN_TRUNC_MODERATE_GPT_RESULT_ALL_EVAL.json", ["HOLD", "REJECT"]),
  ...evalIds("EN_TRUNC_MODERATE_REMAINING_GPT_RESULT_EVAL.json", [
    "HOLD",
    "REJECT",
  ]),
]);
const editorialKitIds = kitIds("EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json");
const editorialPart01Eval = evalMap("EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json");
const heEditorialHold = new Set([
  ...evalIds("HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.json", ["HOLD"]),
  ...evalIds("HE_HAS_MORE_EDITORIAL_REMAINING_GPT_RESULT_EVAL.json", ["HOLD"]),
]);
const heLikutHold = new Set([
  ...evalIds("HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL_EVAL.json", ["HOLD"]),
  ...evalIds("HE_HAS_MORE_LIKUT_REMAINING_GPT_RESULT_EVAL.json", ["HOLD"]),
  ...evalIds("HE_HAS_MORE_LIKUT_MERGED_REMAINING_GPT_RESULT_EVAL.json", [
    "HOLD",
  ]),
]);
const heEditorialEval = {
  ...evalMap("HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.json"),
  ...evalMap("HE_HAS_MORE_EDITORIAL_REMAINING_GPT_RESULT_EVAL.json"),
};
const heLikutEval = {
  ...evalMap("HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL_EVAL.json"),
  ...evalMap("HE_HAS_MORE_LIKUT_REMAINING_GPT_RESULT_EVAL.json"),
  ...evalMap("HE_HAS_MORE_LIKUT_MERGED_REMAINING_GPT_RESULT_EVAL.json"),
};
const moderateEval = {
  ...evalMap("EN_TRUNC_MODERATE_GPT_RESULT_ALL_EVAL.json"),
  ...evalMap("EN_TRUNC_MODERATE_REMAINING_GPT_RESULT_EVAL.json"),
};

const gluedKit = readJson(path.join(AUDIT, "GLUED_STILL_OPEN_9_KIT.json"));
const gluedIds = new Set((gluedKit?.cases ?? []).map((c) => c.id));

const buckets = {
  EN_MISSING_2_REMAINING: [],
  EN_HAS_MORE_REMAINING: [],
  EN_TRUNC_MODERATE_REMAINING: [],
  EN_TRUNC_EDITORIAL_REMAINING: [],
  BEER_DEGREE_SPLIT_REMAINING: [],
  EN_TRUNC_REMAINING: [],
  HE_HAS_MORE_LIKUT_REMAINING: [],
  HE_HAS_MORE_EDITORIAL_REMAINING: [],
  HE_HAS_MORE_LIKUT_MERGED_REMAINING: [],
  HE_HAS_MORE_OFFSET_REMAINING: [],
};

const assigned = new Set();
const routingLog = [];

function route(id, bucket, reason) {
  if (assigned.has(id)) return;
  const c = openById[id];
  if (!c) return;
  assigned.add(id);
  buckets[bucket].push({ ...c, route_reason: reason });
  routingLog.push({ id, bucket, reason, kind: c.kind, fp_pattern: c.fp_pattern });
}

// Priority routing
for (const c of openIssues) {
  if (c.kind === "en_missing") {
    route(c.id, "EN_MISSING_2_REMAINING", "en_missing still open");
  }
}

for (const c of openIssues) {
  if (c.kind !== "en_has_more_segments") continue;
  if (gluedIds.has(c.id)) {
    const gCase = gluedKit.cases.find((x) => x.id === c.id);
    route(c.id, "EN_HAS_MORE_REMAINING", "glued kit still open", gCase);
    if (gCase) {
      const idx = buckets.EN_HAS_MORE_REMAINING.length - 1;
      buckets.EN_HAS_MORE_REMAINING[idx] = {
        ...buckets.EN_HAS_MORE_REMAINING[idx],
        category: gCase.category,
        pair_map_hint: gCase.pair_map_hint ?? null,
        suggested_action: gCase.suggested_action ?? null,
      };
    }
  } else {
    route(c.id, "EN_HAS_MORE_REMAINING", "en_has_more still open");
  }
}

for (const id of moderateHoldReject) {
  if (openById[id]?.kind === "en_truncated_vs_multi_he") {
    const ev = moderateEval[id];
    route(id, "EN_TRUNC_MODERATE_REMAINING", `moderate eval ${ev?.verdict ?? "HOLD/REJECT"}`);
    const idx = buckets.EN_TRUNC_MODERATE_REMAINING.length - 1;
    if (idx >= 0) {
      buckets.EN_TRUNC_MODERATE_REMAINING[idx] = {
        ...buckets.EN_TRUNC_MODERATE_REMAINING[idx],
        prior_eval_verdict: ev?.verdict ?? null,
        prior_eval_reason: ev?.reason ?? null,
      };
    }
  }
}

for (const id of editorialKitIds) {
  if (!openById[id] || openById[id].kind !== "en_truncated_vs_multi_he") continue;
  if (assigned.has(id)) continue;
  const p01 = editorialPart01Eval[id];
  route(
    id,
    "EN_TRUNC_EDITORIAL_REMAINING",
    p01 ? `editorial kit part01 ${p01.verdict}` : "editorial kit parts 02-06"
  );
  const idx = buckets.EN_TRUNC_EDITORIAL_REMAINING.length - 1;
  buckets.EN_TRUNC_EDITORIAL_REMAINING[idx] = {
    ...buckets.EN_TRUNC_EDITORIAL_REMAINING[idx],
    prior_eval_verdict: p01?.verdict ?? "not_run",
  };
}

for (const id of heLikutHold) {
  if (openById[id]?.kind === "he_has_more_segments") {
    const ev = heLikutEval[id];
    route(id, "HE_HAS_MORE_LIKUT_REMAINING", `likut eval HOLD: ${ev?.reason ?? ""}`);
    const idx = buckets.HE_HAS_MORE_LIKUT_REMAINING.length - 1;
    buckets.HE_HAS_MORE_LIKUT_REMAINING[idx] = {
      ...buckets.HE_HAS_MORE_LIKUT_REMAINING[idx],
      prior_eval_verdict: ev?.verdict,
      prior_eval_reason: ev?.reason,
    };
  }
}

for (const id of heEditorialHold) {
  if (openById[id]?.kind === "he_has_more_segments" && !assigned.has(id)) {
    const ev = heEditorialEval[id];
    route(id, "HE_HAS_MORE_EDITORIAL_REMAINING", `editorial eval HOLD: ${ev?.reason ?? ""}`);
    const idx = buckets.HE_HAS_MORE_EDITORIAL_REMAINING.length - 1;
    buckets.HE_HAS_MORE_EDITORIAL_REMAINING[idx] = {
      ...buckets.HE_HAS_MORE_EDITORIAL_REMAINING[idx],
      prior_eval_verdict: ev?.verdict,
      prior_eval_reason: ev?.reason,
      prior_eval_flags: ev?.flags ?? null,
    };
  }
}

for (const c of openIssues) {
  if (assigned.has(c.id)) continue;
  if (c.fp_pattern === "true_beer_degree_split") {
    route(c.id, "BEER_DEGREE_SPLIT_REMAINING", "beer-hagolah degree split pattern");
  }
}

for (const c of openIssues) {
  if (assigned.has(c.id)) continue;
  if (c.kind === "he_has_more_segments" && c.fp_pattern === "true_likut_en_merged") {
    route(c.id, "HE_HAS_MORE_LIKUT_MERGED_REMAINING", "true_likut_en_merged");
  }
}

for (const c of openIssues) {
  if (assigned.has(c.id)) continue;
  if (c.kind === "en_truncated_vs_multi_he") {
    route(c.id, "EN_TRUNC_REMAINING", "residual en_truncated");
  }
}

for (const c of openIssues) {
  if (assigned.has(c.id)) continue;
  if (c.kind === "he_has_more_segments") {
    route(c.id, "HE_HAS_MORE_OFFSET_REMAINING", "residual he_has_more offset");
  }
}

// Build kits
const kitDefs = [
  {
    kit: "EN_MISSING_2_REMAINING",
    cases: buckets.EN_MISSING_2_REMAINING,
    mode: "fresh_translate",
    purpose: "2 en_missing still open in rescan",
    prompt: PROMPTS.EN_MISSING_2_REMAINING,
    mdTitle: "EN_MISSING_2_REMAINING — fresh translate (rescan)",
    mdNotes: ["Held from EN_MISSING apply; verify still open in rescan."],
  },
  {
    kit: "EN_HAS_MORE_REMAINING",
    cases: buckets.EN_HAS_MORE_REMAINING,
    mode: "rewrite_en_by_he_slot",
    purpose: "9 en_has_more / glued oversplit still open",
    prompt: PROMPTS.EN_HAS_MORE_REMAINING,
    mdTitle: "EN_HAS_MORE_REMAINING — glued/oversplit rewrite (rescan)",
    mdNotes: ["Replaces GLUED_STILL_OPEN_9 for cells still flagged."],
  },
  {
    kit: "EN_TRUNC_MODERATE_REMAINING",
    cases: buckets.EN_TRUNC_MODERATE_REMAINING,
    mode: "resegment_split_en",
    purpose: "Moderate kit HOLD+REJECT still en_truncated",
    prompt: PROMPTS.EN_TRUNC_MODERATE_REMAINING,
    mdTitle: "EN_TRUNC_MODERATE_REMAINING — moderate resegment retry",
    mdNotes: ["37 prior HOLD+REJECT minus fixed by today's applies."],
  },
  {
    kit: "EN_TRUNC_EDITORIAL_REMAINING",
    cases: buckets.EN_TRUNC_EDITORIAL_REMAINING,
    mode: "fresh_multi_segment_translate",
    purpose: "Editorial en_trunc still open (parts 02-06 + part01 holds)",
    prompt: PROMPTS.EN_TRUNC_EDITORIAL_REMAINING,
    mdTitle: "EN_TRUNC_EDITORIAL_REMAINING — editorial fresh translate retry",
    mdNotes: ["Excludes part01 APPROVE cases no longer flagged."],
  },
  {
    kit: "BEER_DEGREE_SPLIT_REMAINING",
    cases: buckets.BEER_DEGREE_SPLIT_REMAINING,
    mode: "split_en_beer_degree",
    purpose: "beer-hagolah degree/footnote EN under-split",
    prompt: PROMPTS.BEER_DEGREE_SPLIT_REMAINING,
    mdTitle: "BEER_DEGREE_SPLIT_REMAINING — Beer HaGolah degree splits",
    mdNotes: ["true_beer_degree_split pattern from FP analysis."],
  },
  {
    kit: "EN_TRUNC_REMAINING",
    cases: buckets.EN_TRUNC_REMAINING,
    mode: "resegment_or_fresh",
    purpose: "Other en_truncated not in moderate/editorial/beer kits",
    prompt: PROMPTS.EN_TRUNC_REMAINING,
    mdTitle: "EN_TRUNC_REMAINING — catch-all en_truncated",
    mdNotes: ["New en_trunc or not in prior kit tiers."],
  },
  {
    kit: "HE_HAS_MORE_LIKUT_REMAINING",
    cases: buckets.HE_HAS_MORE_LIKUT_REMAINING,
    mode: "split_en_not_merge_he",
    purpose: "13 Likut kit HOLD (content_drift) still open",
    prompt: PROMPTS.HE_HAS_MORE_LIKUT_REMAINING,
    mdTitle: "HE_HAS_MORE_LIKUT_REMAINING — Likut content_drift retry",
    mdNotes: ["Prior HE_HAS_MORE_LIKUT_SPLIT eval HOLD only."],
  },
  {
    kit: "HE_HAS_MORE_EDITORIAL_REMAINING",
    cases: buckets.HE_HAS_MORE_EDITORIAL_REMAINING,
    mode: "resegment_offset_fix",
    purpose: "91 editorial HOLD still he_has_more",
    prompt: PROMPTS.HE_HAS_MORE_EDITORIAL_REMAINING,
    mdTitle: "HE_HAS_MORE_EDITORIAL_REMAINING — editorial HOLD retry",
    mdNotes: ["Prior HE_HAS_MORE_EDITORIAL eval HOLD only."],
  },
  {
    kit: "HE_HAS_MORE_LIKUT_MERGED_REMAINING",
    cases: buckets.HE_HAS_MORE_LIKUT_MERGED_REMAINING,
    mode: "split_en_likut_merged",
    purpose: "true_likut_en_merged he_has_more not in other kits",
    prompt: PROMPTS.HE_HAS_MORE_LIKUT_MERGED_REMAINING,
    mdTitle: "HE_HAS_MORE_LIKUT_MERGED_REMAINING — Likut EN merged pattern",
    mdNotes: ["~99 pattern; excludes likut HOLD + editorial HOLD tiers."],
  },
  {
    kit: "HE_HAS_MORE_OFFSET_REMAINING",
    cases: buckets.HE_HAS_MORE_OFFSET_REMAINING,
    mode: "resegment_offset_fix",
    purpose: "Residual he_has_more (offset editorial)",
    prompt: PROMPTS.HE_HAS_MORE_OFFSET_REMAINING,
    mdTitle: "HE_HAS_MORE_OFFSET_REMAINING — offset editorial catch-all",
    mdNotes: ["true_offset_editorial and other he_has_more not routed above."],
  },
];

const kitSummaries = [];
for (const def of kitDefs) {
  const summary = buildKit({
    created,
    kit: def.kit,
    cases: def.cases,
    packMetaBase: {
      kind: "mixed",
      tier: "rescan_remaining",
      mode: def.mode,
      purpose: def.purpose,
      source: "SEGMENT_RESCAN_2026-08-30.json live corpus scan",
      rescan_totals: readJson(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"))?.totals,
      exclusions: ["he_missing (59) — held per user"],
      output_schema: {
        primary: "segments[] with he+en per slot",
        legacy_mirror: "en_segments[]",
      },
    },
    prompt: def.prompt,
    mdTitle: def.mdTitle,
    mdNotes: def.mdNotes,
  });
  if (summary) kitSummaries.push(summary);
}

const totalInKits = kitSummaries.reduce((n, k) => n + k.cases, 0);
const unassigned = openIssues.filter((c) => !assigned.has(c.id));

const master = {
  created,
  corpus: CORPUS,
  rescan_source: "SEGMENT_RESCAN_2026-08-30.json",
  scan_open_actionable: openIssues.length,
  scan_total_issues: readJson(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"))?.totals?.issues ?? openIssues.length + 59,
  excluded_he_missing: 59,
  kits: kitSummaries,
  bucket_counts: Object.fromEntries(
    Object.entries(buckets).map(([k, v]) => [k, v.length])
  ),
  total_cases_in_kits: totalInKits,
  unassigned_count: unassigned.length,
  unassigned_ids: unassigned.map((c) => c.id),
  routing_sample: routingLog.slice(0, 20),
  dedup_note:
    "Each open cell assigned to exactly one kit via priority routing; same id never appears in multiple kits.",
};

writeAtomic(
  path.join(AUDIT, "RESCAN_REMAINING_GPT_KITS_BUILD.json"),
  JSON.stringify(master, null, 2)
);

// --- Update SEGMENT_GPT_KITS_INDEX.md ---
const kitRows = kitSummaries
  .map((k) => {
    return `| \`${k.kit}\` | rescan_remaining | ${k.cases} | ${k.parts} | ${k.max_part_bytes?.toLocaleString?.() ?? "—"} | \`${String(k.full_sha256).slice(0, 12)}…\` | [\`${k.kit}.json\`](./${k.kit}.json) |`;
  })
  .join("\n");

const purposeLines = kitSummaries.map((k) => `- **${k.kit}**: ${k.purpose}`).join("\n");

const indexMd = `# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN \`<br>\`-segment mismatches. **Audit only — no corpus apply.**

**Last rebuild:** ${created} (rescan-driven _REMAINING kits)  
Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/\`  
Rescan: [\`SEGMENT_RESCAN_2026-08-30.json\`](./SEGMENT_RESCAN_2026-08-30.json) · FP: [\`SEGMENT_RESCAN_FP_ANALYSIS.json\`](./SEGMENT_RESCAN_FP_ANALYSIS.json)

## Excluded from all new kits

- **he_missing (59)** — held per user; do not include in ChatGPT kits until reassigned.
- Cells no longer flagged in post-apply rescan (fixed by today's applies).

## Rescan totals (post-apply)

| Kind | Open count |
|------|----------:|
| en_truncated_vs_multi_he | ${readJson(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"))?.totals?.byKind?.en_truncated_vs_multi_he ?? "—"} |
| he_has_more_segments | ${readJson(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"))?.totals?.byKind?.he_has_more_segments ?? "—"} |
| en_has_more_segments | ${readJson(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"))?.totals?.byKind?.en_has_more_segments ?? 0} |
| en_missing | ${readJson(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"))?.totals?.byKind?.en_missing ?? 0} |
| he_missing | 59 (EXCLUDED) |
| **Actionable** | **${openIssues.length}** |

## Run order (_REMAINING kits — use these)

1. **EN_MISSING_2_REMAINING** — en_missing still open.
2. **EN_HAS_MORE_REMAINING** — glued/oversplit EN cases.
3. **EN_TRUNC_MODERATE_REMAINING** — moderate HOLD+REJECT retry.
4. **EN_TRUNC_EDITORIAL_REMAINING** — editorial en_trunc.
5. **BEER_DEGREE_SPLIT_REMAINING** — Beer HaGolah degree splits.
6. **EN_TRUNC_REMAINING** — other en_truncated catch-all.
7. **HE_HAS_MORE_LIKUT_REMAINING** — Likut content_drift HOLD retry.
8. **HE_HAS_MORE_EDITORIAL_REMAINING** — editorial HOLD retry.
9. **HE_HAS_MORE_LIKUT_MERGED_REMAINING** — true_likut_en_merged pattern.
10. **HE_HAS_MORE_OFFSET_REMAINING** — residual offset editorial he_has_more.

## _REMAINING kits (this rebuild)

| Kit | Kind | Cases | Parts | Max part bytes | SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|------------------|------|
${kitRows}

**Total cases in rebuilt kits:** ${totalInKits} (of ${openIssues.length} actionable; ${unassigned.length} unassigned)

### One-line purpose

${purposeLines}

## Prior kits (superseded for open work — reference only)

Older kits without _REMAINING suffix reflect pre-rescan state. Use _REMAINING kits above for new ChatGPT sessions.

| Prior kit | Original cases | Status |
|-----------|---------------:|--------|
| EN_TRUNC_MODERATE_RESEGMENT_KIT | 78 | 41 applied; 37 → MODERATE_REMAINING |
| EN_TRUNC_EDITORIAL_RETRANSLATE_KIT | 99 | 18 part01 applied; rest → EDITORIAL_REMAINING |
| HE_HAS_MORE_EDITORIAL_KIT | 218 | 127 applied; 91 HOLD → EDITORIAL_REMAINING |
| HE_HAS_MORE_LIKUT_SPLIT_KIT | 53 | 40 applied; 13 HOLD → LIKUT_REMAINING |
| GLUED_STILL_OPEN_9_KIT | 9 | → EN_HAS_MORE_REMAINING |
| EN_MISSING_2_HELD_KIT | 2 | → EN_MISSING_2_REMAINING |

## Apply log

- **2026-08-28 AM:** EN_MISSING 18/20; EN_TRUNC wave1; HE_HAS_MORE wave1/wave2; Likut 40/53.
- **2026-08-28 PM:** Post-apply rescan → _REMAINING kit rebuild (${totalInKits} cases across ${kitSummaries.length} kits).

## Deduplication

${master.dedup_note} Priority: en_missing → en_has_more → moderate HOLD → editorial kit → likut HOLD → editorial HOLD → beer degree → likut merged → en_trunc catch-all → he_has_more catch-all.

Zips: \`zips/*_REMAINING.zip\` (prompt + full parent JSON + parts + full_dictionary.md). See [\`zips/ZIPS_MANIFEST.md\`](./zips/ZIPS_MANIFEST.md).
`;

writeAtomic(path.join(AUDIT, "SEGMENT_GPT_KITS_INDEX.md"), indexMd);

console.log("\n=== RESCAN REMAINING KIT BUILD ===");
console.log(`Open actionable: ${openIssues.length}`);
console.log(`Total in kits: ${totalInKits}`);
console.log(`Unassigned: ${unassigned.length}`);
console.log("Buckets:", master.bucket_counts);
console.log(JSON.stringify(master, null, 2));
