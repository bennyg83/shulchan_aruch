/**
 * Build GPT kit for Class B + Class C open cases only (15).
 * Full HE/EN from live corpus — NO truncation. Hardened FAILURE RULES prompt.
 *
 *   node build_open_class_b_c_gpt_kit.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const LIVE = path.resolve(__dirname, "../../../..");
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const ZIPS = path.join(AUDIT, "zips");
const DICT_CANDIDATES = [
  path.join(LIVE, "newtry/SA_Rebuild/gpt-kit/full_dictionary.md"),
  path.join(LIVE, "full_dictionary.md"),
  path.join(LIVE, "full_dictionary (1).md"),
  path.join(LIVE, "newtry/OC_001/full_dictionary.md"),
];

const MAX_PART_BYTES = 85_000;
const KIT = "OPEN_CLASS_B_C_GPT_KIT";
const ZIP_NAME = "01_OPEN_CLASS_B_C_GPT_KIT.zip";
const VOL_ORDER = { oc1: 0, yd1: 1, eh1: 2, cm1: 3 };

const CLASS_B = [
  "yd1/siman128/seif-003/beur-hagra",
  "yd1/siman160/seif-005/beur-hagra",
  "yd1/siman161/seif-002/beur-hagra",
];

const CLASS_C = [
  "yd1/siman109/seif-001/beur-hagra",
  "yd1/siman127/seif-001/beur-hagra",
  "yd1/siman127/seif-003/beur-hagra",
  "yd1/siman157/seif-001/beur-hagra",
  "yd1/siman165/seif-001/beer-hagolah",
  "yd1/siman165/seif-001/siftei-kohen",
  "yd1/siman166/seif-001/siftei-kohen",
  "yd1/siman168/seif-018/siftei-kohen",
  "yd1/siman170/seif-001/turei-zahav",
  "yd1/siman197/seif-002/siftei-kohen",
  "yd1/siman199/seif-003/siftei-kohen",
  "yd1/siman242/seif-004/beur-hagra",
];

const CLASS_NOTES = {
  "yd1/siman128/seif-003/beur-hagra":
    "Class B: Likut split at (Collection) is mechanical; EN[1–3] garbled — fresh_translate those slots.",
  "yd1/siman160/seif-005/beur-hagra":
    "Class B: multi Extract alignment — 3 consecutive ליקוט lemmas; split carefully then fresh_translate gaps.",
  "yd1/siman161/seif-002/beur-hagra":
    "Class B: EN[0] packs 4×(Extract) for 5 HE ליקוט chain; multi-split + fresh_translate as needed.",
  "yd1/siman109/seif-001/beur-hagra":
    "Class C: HE11/EN4; EN[0] covers ~7 non-Likut Gra notes with no mid markers — semantic resegment / fresh_translate.",
  "yd1/siman127/seif-001/beur-hagra":
    "Class C: HE19/EN17; deficit≠Likut-only; garbled EN — fresh_translate bad slots.",
  "yd1/siman127/seif-003/beur-hagra":
    "Class C: HE20/EN13; 6 ליקוט + heavy garbled EN; ambiguous multi-offset.",
  "yd1/siman157/seif-001/beur-hagra":
    "Class C: HE21/EN18; long Gra + garbled segs + non-marker deficit.",
  "yd1/siman165/seif-001/beer-hagolah":
    "Class C: EN garbage loop; beer-degree fresh_translate; avoid failure patterns.",
  "yd1/siman165/seif-001/siftei-kohen":
    "Class C: EN/HE ratio low; missing long Shach; fresh_translate.",
  "yd1/siman166/seif-001/siftei-kohen":
    "Class C: offset editorial; substantial missing EN; fresh_translate.",
  "yd1/siman168/seif-018/siftei-kohen":
    "Class C: HE9/EN4; ~70% EN missing; multi-slot fresh_translate.",
  "yd1/siman170/seif-001/turei-zahav":
    "Class C: long Taz; EN truncated/offset; fresh_translate.",
  "yd1/siman197/seif-002/siftei-kohen":
    "Class C: EN covers wrong lemmas; fresh_translate from HE.",
  "yd1/siman199/seif-003/siftei-kohen":
    "Class C: huge missing HE[0] chafifah sugya; fresh_translate.",
  "yd1/siman242/seif-004/beur-hagra":
    "Class C: HE8/EN4; long missing Gra block; offset fresh_translate.",
};

const PROMPT = `SA_Rebuild OPEN CLASS B+C — SPLIT / FRESH TRANSLATE (hardened).

INPUTS: OPEN_CLASS_B_C_GPT_KIT.json (full parent pack — attach even when reviewing one part) + full_dictionary.md

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use dictionary transliteration/rendering for every listed term.
- Part 3 — commentator names: exact dictionary forms (never anglicize Shach/Taz/Beit Yosef/etc.).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per dictionary.

CORPUS TEXT: he_segments[] and en_segments[] are COMPLETE from live corpus (NO truncation). Use them as the source of truth for existing EN wording.

STRATEGY
1) If EN already contains the full material for HE slots (often mid markers (Collection)/(Extract)/(Addition)/(Additional note)/(Likkut)): action=split_en or mixed_resegment_translate with source=split_existing_en — VERBATIM cut only.
2) If EN is missing, garbled, offset, or wrong lemma: source=fresh_translate for those slots only (mixed_resegment_translate when some slots are preserved).
3) HE slots starting with (ליקוט): EN segment MUST start with "(Likkut) " (normalize Collection/Extract/Addition/Additional note → (Likkut) on ליקוט heads only).
4) Never merge HE ליקוט blocks. Prefer split EN. merge_groups only for true HE continuation of the SAME note (not distinct lemmas).

FAILURE RULES — DO NOT (causes REJECT/HOLD in eval pipeline)

UNIVERSAL — any EN segment text:
- Do NOT output: "the craft", "Saturday", "Lord's Prayer", "her age", "hand recoils", "first dish", "to the world" (for l'olam), "Hashem's Word", "Holy One" junk loops, "massacre", allocated (for muktzeh), or other known MT failure patterns.
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN output.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholder text in EN ("TBD", "translation pending", etc.).
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.

JSON OUTPUT (mandatory):
- Return en_segments[] as the primary deliverable; segments[] with he+en is optional for audit alignment.
- Valid JSON only — escape every " as \\" inside strings; use straight ASCII quotes only (no smart quotes).
- Prefer returning en_segments[] without embedding he in strings when possible.
- en_segments.length MUST equal heSegs for every case.

SPLIT_EXISTING_EN / RESEGMENT:
- When source is split_existing_en: preserve existing EN wording VERBATIM — cut/join ONLY at boundaries.
- Do NOT normalize citations, synonym-swap, paraphrase, summarize, compress, or "improve" prose on preserved splits.
- Do NOT re-translate from Hebrew when the EN blob already contains the text for that slot.
- Eval HOLDs content_drift / unjustified fresh_translate; REJECTs truncated/broken JSON.

FRESH_TRANSLATE (gap / garbled / offset slots only):
- Complete translation of every Hebrew clause; no omissions; no additions beyond source.
- Use full_dictionary.md; expand abbreviations; Arabic numerals; {Rama: ...} for Rama glosses.
- Apply fresh_translate ONLY where EN blob lacks material or is garbled — never on slots fully covered by good existing EN.
- Prefer plain scholarly English; keep (Likkut) markers on ליקוט HE slots.

OUTPUT — JSON array only:
[{"id":"...","action":"split_en"|"mixed_resegment_translate"|"fresh_translate"|"needs_human","merge_groups":null,"segments":[{"index":0,"he":"...","en":"...","source":"split_existing_en"|"fresh_translate"}],"en_segments":["..."],"notes":"short","confidence":"high"|"medium"|"low"}]
segments.length === heSegs (when segments returned). No corpus edits.`;

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

function classify(heParts, enParts) {
  const heN = heParts.length;
  const enN = enParts.length;
  if (heN === enN) return { kind: "aligned_but_queued", heN, enN };
  if (enN === 1 && heN > 1) return { kind: "en_truncated_vs_multi_he", heN, enN };
  if (enN > heN) return { kind: "en_has_more_segments", heN, enN };
  return { kind: "he_has_more_segments", heN, enN };
}

function fpPattern(kind, slug, heS) {
  const likut = heS.filter((x) => /^\(ליקוט\)/.test(stripTags(x))).length;
  if (slug === "beer-hagolah") return "true_beer_degree_split";
  if (likut > 0 && kind !== "aligned_but_queued") return "true_likut_en_merged";
  if (kind === "en_truncated_vs_multi_he") return "true_en_truncated";
  return "true_offset_editorial";
}

function loadCase(id, klass) {
  const [vol, siman, seif, slug] = id.split("/");
  const hePath = path.join(CORPUS, id, "he.html");
  const enPath = path.join(CORPUS, id, "en.html");
  if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) {
    throw new Error(`missing corpus for ${id}`);
  }
  const heRaw = fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "");
  const enRaw = fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "");
  const heParts = splitHtmlByBrSegments(heRaw);
  const enParts = splitHtmlByBrSegments(enRaw);
  const cls = classify(heParts, enParts);
  return {
    id,
    volume: vol,
    siman: simanNum(siman),
    seif: seifNum(seif),
    slug,
    class: klass,
    kind: cls.kind,
    heSegs: cls.heN,
    enSegs: cls.enN,
    he_deficit: Math.max(0, cls.heN - cls.enN),
    en_deficit: Math.max(0, cls.enN - cls.heN),
    he_file_present: true,
    en_file_present: true,
    // FULL segments — no truncation
    he_segments: heParts.map(stripTags),
    en_segments: enParts.map(stripTags),
    fp_pattern: fpPattern(cls.kind, slug, heParts),
    class_note: CLASS_NOTES[id] ?? "",
    route_reason: klass === "B" ? "class_B_editorial" : "class_C_gpt_quality",
  };
}

function sortCases(cases) {
  cases.sort(
    (a, b) =>
      (a.class === "B" ? 0 : 1) - (b.class === "B" ? 0 : 1) ||
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

function packCases(cases, packMetaBase, fullSha) {
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
          parent_pack: `${KIT}.json`,
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
    chunks.push({ cases: slice.slice(), offset: i, bytes });
    i += slice.length;
  }

  const partInfos = [];
  for (let idx = 0; idx < chunks.length; idx++) {
    const ch = chunks[idx];
    const chunkIndex = idx + 1;
    const text = buildPartJson(ch.cases, chunkIndex, chunks.length, ch.offset);
    const bytes = Buffer.byteLength(text, "utf8");
    const name = `${KIT}_part${String(chunkIndex).padStart(2, "0")}.json`;
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
  removeStaleParts(KIT, chunks.length);
  return partInfos;
}

function findDict() {
  for (const p of DICT_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("full_dictionary.md not found");
}

function makeZip(partInfos) {
  fs.mkdirSync(ZIPS, { recursive: true });
  const zipPath = path.join(ZIPS, ZIP_NAME);
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  const dictSrc = findDict();
  const staging = path.join(ZIPS, `_staging_${KIT}`);
  fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(staging, { recursive: true });

  const files = [
    `${KIT}.md`,
    `${KIT}.json`,
    ...partInfos.map((p) => p.file),
  ];
  for (const f of files) {
    fs.copyFileSync(path.join(AUDIT, f), path.join(staging, f));
  }
  fs.copyFileSync(dictSrc, path.join(staging, "full_dictionary.md"));

  // Prefer tar (git-bash) or PowerShell Compress-Archive
  try {
    execFileSync(
      "tar",
      ["-a", "-cf", zipPath, "-C", staging, ...fs.readdirSync(staging)],
      { stdio: "inherit" }
    );
  } catch {
    execFileSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-Command",
        `Compress-Archive -Path '${staging}\\*' -DestinationPath '${zipPath}' -Force`,
      ],
      { stdio: "inherit" }
    );
  }
  fs.rmSync(staging, { recursive: true, force: true });
  return { zipPath, size: fs.statSync(zipPath).size, contents: files.concat(["full_dictionary.md"]) };
}

function updateIndex(buildSummary, zipInfo) {
  const indexPath = path.join(AUDIT, "SEGMENT_GPT_KITS_INDEX.md");
  const stamp = new Date().toISOString();
  const block = `

## OPEN CLASS B+C kit (2026-08-30 — GPT first; Class A applied separately)

**Do not include Class A (12 mechanical Likut splits) in GPT sessions.** Those are applied locally.

| Kit | Class | Cases | Parts | Max part bytes | SHA-256 (prefix) | Zip |
|-----|-------|------:|------:|---------------:|------------------|-----|
| \`${KIT}\` | B+C | ${buildSummary.cases} | ${buildSummary.parts} | ${buildSummary.max_part_bytes.toLocaleString()} | \`${buildSummary.full_sha256.slice(0, 12)}…\` | [\`zips/${ZIP_NAME}\`](./zips/${ZIP_NAME}) |

- Built: ${stamp}
- Mode: \`split_or_fresh_translate_hardened\`
- Full HE/EN from live corpus (no truncation)
- Class B (3): multi-Extract / garbled-slot editorial
- Class C (12): long Gra / offset / missing EN / quality fresh_translate
- Prompt: hardened FAILURE RULES (verbatim split where EN complete; fresh_translate gaps; ban "the craft"/"Saturday"; \`(Likkut)\` on ליקוט heads)
`;

  let existing = "";
  if (fs.existsSync(indexPath)) existing = fs.readFileSync(indexPath, "utf8");
  // Replace prior OPEN CLASS B+C section if present, else append after title block
  if (/## OPEN CLASS B\+C kit/.test(existing)) {
    existing = existing.replace(
      /## OPEN CLASS B\+C kit[\s\S]*?(?=\n## |\n*$)/,
      block.trim() + "\n\n"
    );
  } else {
    // Insert after first heading block
    const lines = existing.split("\n");
    let insertAt = 1;
    for (let i = 1; i < Math.min(lines.length, 20); i++) {
      if (lines[i].startsWith("## ")) {
        insertAt = i;
        break;
      }
    }
    lines.splice(insertAt, 0, block.trim(), "");
    existing = lines.join("\n");
  }
  writeAtomic(indexPath, existing);

  const manifestPath = path.join(ZIPS, "ZIPS_MANIFEST.md");
  let man = fs.existsSync(manifestPath)
    ? fs.readFileSync(manifestPath, "utf8")
    : "# GPT Kit Zips Manifest\n\n";
  const manLine = `| \`${ZIP_NAME}\` | ${zipInfo.size} | ${zipInfo.contents.join(", ")} |`;
  if (/01_OPEN_CLASS_B_C_GPT_KIT\.zip/.test(man)) {
    man = man.replace(/\| `01_OPEN_CLASS_B_C_GPT_KIT\.zip` \|[^|]*\|[^|]*\|/, manLine);
  } else {
    man += `\n## Open Class B+C (post-classification)\n\n| Zip | Size (bytes) | Contents |\n|-----|-------------:|----------|\n${manLine}\n`;
  }
  writeAtomic(manifestPath, man);
}

function main() {
  const created = new Date().toISOString();
  const cases = sortCases([
    ...CLASS_B.map((id) => loadCase(id, "B")),
    ...CLASS_C.map((id) => loadCase(id, "C")),
  ]);

  const packMetaBase = {
    kind: "mixed",
    tier: "open_class_b_c",
    mode: "split_or_fresh_translate_hardened",
    purpose:
      "15 open B+C cases for GPT — Class A (12 mechanical) applied separately; do not include A IDs",
    source: "manual Class B+C list from SEGMENT classification 2026-08-30",
    exclusions: [
      "Class A 12 mechanical Likut mid-marker splits (local apply)",
      "he_missing held",
    ],
    class_B_ids: CLASS_B,
    class_C_ids: CLASS_C,
    output_schema: {
      primary: "en_segments[]",
      optional: "segments[] with he+en per slot",
    },
  };

  const fullMeta = {
    ...packMetaBase,
    created,
    kit: KIT,
    counts: {
      total: cases.length,
      by_class: countBy(cases, (c) => c.class),
      by_volume: countBy(cases, (c) => c.volume),
      by_kind: countBy(cases, (c) => c.kind),
      by_fp_pattern: countBy(cases, (c) => c.fp_pattern ?? "—"),
    },
    hard_cap_utf8_bytes: MAX_PART_BYTES,
    dictionary_file: "full_dictionary.md",
    prompt: PROMPT,
    instructions_for_reviewer: PROMPT.split("\n"),
  };

  const fullPack = { meta: fullMeta, cases };
  const fullJson = JSON.stringify(fullPack, null, 2);
  writeAtomic(path.join(AUDIT, `${KIT}.json`), fullJson);
  const fullBytes = Buffer.byteLength(fullJson, "utf8");
  const fullSha = sha256(fullJson);
  fullMeta.parent_sha256 = fullSha;
  // rewrite with sha in meta
  const fullPack2 = { meta: { ...fullMeta, parent_sha256: fullSha }, cases };
  const fullJson2 = JSON.stringify(fullPack2, null, 2);
  writeAtomic(path.join(AUDIT, `${KIT}.json`), fullJson2);
  const fullSha2 = sha256(fullJson2);

  const partInfos = packCases(cases, fullPack2.meta, fullSha2);
  const maxPartBytes = partInfos.reduce((m, p) => Math.max(m, p.bytes), 0);
  const overCapParts = partInfos.filter((p) => p.exceeds_hard_cap).length;

  const partTable = partInfos
    .map(
      (p) =>
        `| ${p.part} | \`${p.file}\` | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | \`${p.sha256.slice(0, 12)}…\` | ${p.exceeds_hard_cap ? "over cap" : ""} |`
    )
    .join("\n");

  const md = `# OPEN_CLASS_B_C_GPT_KIT — 15 open B+C cases

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: \`split_or_fresh_translate_hardened\` · Dictionary: attach **\`full_dictionary.md\`**

**Class A (12 mechanical Likut splits) are NOT in this kit** — applied locally separately.

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **${cases.length}** |
| Class B | ${CLASS_B.length} |
| Class C | ${CLASS_C.length} |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | ${cases.length} |

## Files

- Full kit: [\`${KIT}.json\`](./${KIT}.json) (${Buffer.byteLength(fullJson2, "utf8").toLocaleString()} bytes, SHA \`${fullSha2.slice(0, 12)}…\`)
- Parts: target ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes when batched; single-case parts keep **full** segment text (may exceed cap)
- Zip: [\`zips/${ZIP_NAME}\`](./zips/${ZIP_NAME}) includes **full parent** \`${KIT}.json\` plus all parts + dictionary
- Created: ${created}

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
${partTable}

${overCapParts ? `\\* ${overCapParts} part(s) exceed 85k target — full segment text preserved (no truncation).` : ""}

## ChatGPT prompt

\`\`\`
${PROMPT}
\`\`\`

## Class B IDs

${CLASS_B.map((id) => `- \`${id}\` — ${CLASS_NOTES[id]}`).join("\n")}

## Class C IDs

${CLASS_C.map((id) => `- \`${id}\` — ${CLASS_NOTES[id]}`).join("\n")}

## Notes

- Full HE/EN from live corpus — **no truncation**.
- Hardened FAILURE RULES: verbatim split where EN complete; fresh_translate for gaps/garbled; ban "the craft"/"Saturday"; \`(Likkut)\` on ליקוט heads.
- No corpus apply from this kit until parent approve.
`;

  writeAtomic(path.join(AUDIT, `${KIT}.md`), md);

  const buildSummary = {
    kit: KIT,
    mode: packMetaBase.mode,
    purpose: packMetaBase.purpose,
    cases: cases.length,
    class_B: CLASS_B.length,
    class_C: CLASS_C.length,
    parts: partInfos.length,
    max_part_bytes: maxPartBytes,
    full_bytes: Buffer.byteLength(fullJson2, "utf8"),
    full_sha256: fullSha2,
    path: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${KIT}.json`,
    md: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${KIT}.md`,
    zip: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/zips/${ZIP_NAME}`,
    parts_detail: partInfos,
    ids: cases.map((c) => c.id),
  };
  writeAtomic(
    path.join(AUDIT, `${KIT}_BUILD.json`),
    JSON.stringify(buildSummary, null, 2)
  );

  const zipInfo = makeZip(partInfos);
  buildSummary.zip_bytes = zipInfo.size;
  writeAtomic(
    path.join(AUDIT, `${KIT}_BUILD.json`),
    JSON.stringify(buildSummary, null, 2)
  );
  updateIndex(buildSummary, zipInfo);

  console.log(
    `[kits] ${KIT}: cases=${cases.length} parts=${partInfos.length} zip=${ZIP_NAME} (${zipInfo.size} bytes)`
  );
  for (const p of partInfos) {
    console.log(
      `  part${p.part}: cases=${p.cases} bytes=${p.bytes}${p.exceeds_hard_cap ? " OVER_CAP" : ""}`
    );
  }
}

main();
