/**
 * Build ChatGPT fix kits for OC content-quality work (audit only).
 *
 *   01_OC_MECHABER_CUT_EN_GPT_KIT  — 120 cut/incomplete Mechaber EN
 *   02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT — scan mt_garbage + Netiv Chayim 244:5
 *
 * Packaging matches segment kits: hardened prompt MD, full_dictionary.md,
 * parent JSON, part JSON(s) ≤85k (no HE/EN truncation), numbered zip(s).
 *
 *   node build_oc_gpt_fix_kits.mjs
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
const MAX_PART_BYTES = 85_000;

const DICT_CANDIDATES = [
  path.join(LIVE, "full_dictionary (1).md"),
  path.join(LIVE, "full_dictionary.md"),
  path.join(LIVE, "newtry/SA_Rebuild/gpt-kit/full_dictionary.md"),
];

function latestContentScanPath() {
  const files = fs
    .readdirSync(AUDIT)
    .filter((f) => /^OC_CONTENT_SCAN_\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();
  if (!files.length) throw new Error("No OC_CONTENT_SCAN_*.json in audit dir");
  return path.join(AUDIT, files[files.length - 1]);
}

const SCAN_PATH = latestContentScanPath();
const MECHABER_SRC = path.join(AUDIT, "OC_MECHABER_CUT_EN_KIT.json");
const MANUAL_MT = path.join(AUDIT, "OC_COMMENTARY_MT_GARBAGE_MANUAL.json");

const FAILURE_BAN = `FAILURE RULES — DO NOT (causes REJECT/HOLD)
- Do NOT output: "the craft", "Saturday", "Lord's Prayer", "her age", "hand recoils", "first dish", "to the world" (for l'olam), "Hashem's Word", "Holy One" junk loops, "massacre", allocated (for muktzeh), Danny's dinliness, "circumcised" nonsense, Honeylma/Czechs/captain-style gibberish, or other known MT failure patterns.
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholders ("TBD", "translation pending") in EN.
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.
- Do NOT write {Rama: RAMA: ...} — single wrapper only: {Rama: ...}.
- Valid JSON only — escape every " as \\"; straight ASCII quotes only.`;

const MECHABER_PROMPT = `SA_Rebuild OC MECHABER CUT-EN — FRESH TRANSLATE / COMPLETE FROM HE (hardened).

INPUTS: 01_OC_MECHABER_CUT_EN_GPT_KIT.json (full parent pack — attach even when reviewing one part) + full_dictionary.md

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: use dictionary transliteration/rendering for every listed term (melacha, muktzeh, kli rishon, etc.).
- Part 3 — commentator names: exact dictionary forms (never anglicize).
- Part 4 — numbers: convert Hebrew letter-numbers to Arabic numerals (siman/seif/daf).
- Part 5 — connectives: render logical connectives per dictionary.

CORPUS TEXT: he_html / en_html / he_plain / en_plain are COMPLETE from live corpus (NO truncation). Translate from HE; current EN is draft/bad only.

TASK
1) Replace EN entirely from HE (fresh_translate / complete). Every Hebrew clause must appear in English — no omissions, no summarizing.
2) No additions beyond the source. Plain translated text only.
3) Rama: any הגה / <small>הגה ...</small> → {Rama: ...} once. NEVER {Rama: RAMA: ...}. Place the gloss in HE order (do not move Rama after later Mechaber clauses).
4) After Rama, continue with any remaining Mechaber clauses (common cut failure: post-Rama HE omitted).
5) Restore missing cross-refs (e.g. ע\"ל סי׳ …) when present in HE.
6) Strip HTML for meaning; output plain EN (no tags). Note markers <i data-label="א"> → (1) only if the HE text flow requires the label; do not invent commentary.

${FAILURE_BAN}

OUTPUT — JSON array only:
[{"id":"...","new_en":"...","notes":"short","confidence":"high"|"medium"|"low"}]
One object per case. new_en is the full replacement English for that cell. No corpus edits.`;

const MT_GARBAGE_PROMPT = `SA_Rebuild OC COMMENTARY MT-GARBAGE — FRESH TRANSLATE FROM HE (hardened).

INPUTS: 02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT.json (full parent pack — attach even when reviewing one part) + full_dictionary.md

DICTIONARY (mandatory — full_dictionary.md)
- Part 1 — abbreviations: expand every Hebrew abbreviation; no raw Hebrew abbreviations in EN.
- Part 2 — halachic terms: dictionary transliteration/rendering.
- Part 3 — commentator names: exact dictionary forms (never anglicize Shach/Taz/Magen Avraham/etc.).
- Part 4 — numbers: Hebrew letter-numbers → Arabic numerals.
- Part 5 — connectives: per dictionary.

CORPUS TEXT: he_html / en_html / he_plain / en_plain are COMPLETE (NO truncation). Current EN is MT garbage — do NOT salvage nonsense phrasing.

TASK
1) Fresh-translate EN completely from HE. Completeness; no additions; plain EN only.
2) Discard garbled MT entirely (Czechs/Honeylma/Danny/craft/Saturday/etc.).
3) {Rama: ...} for Rama glosses when HE has הגה; never {Rama: RAMA:}.
4) Preserve commentator lemma/head style when HE has a bold head — translate accurately, do not invent.
5) If HE has JSON-array / bracket leak wrappers in the source HTML, translate the inner Hebrew content; do not echo ["..."] into EN.

${FAILURE_BAN}

OUTPUT — JSON array only:
[{"id":"...","new_en":"...","notes":"short","confidence":"high"|"medium"|"low"}]
One object per case. new_en is the full replacement English. No corpus edits.`;

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

function findDict() {
  for (const p of DICT_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("full_dictionary.md not found");
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

function parseId(id) {
  const [volume, simanDir, seifDir, slug] = id.split("/");
  const siman = Number(String(simanDir).replace(/\D/g, "")) || 0;
  const seif = Number(String(seifDir).replace(/\D/g, "")) || 0;
  return { volume, siman, seif, slug };
}

function loadCorpusCell(id) {
  const hePath = path.join(CORPUS, id, "he.html");
  const enPath = path.join(CORPUS, id, "en.html");
  if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) {
    throw new Error(`missing corpus for ${id}`);
  }
  const he_html = fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "");
  const en_html = fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "");
  return {
    he_html,
    en_html,
    he_plain: stripTags(he_html),
    en_plain: stripTags(en_html),
  };
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

function packCases(kitName, cases, packMetaBase, fullSha) {
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
          parent_pack: `${kitName}.json`,
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
    const name = `${kitName}_part${String(chunkIndex).padStart(2, "0")}.json`;
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
  removeStaleParts(kitName, chunks.length);
  return partInfos;
}

function makeZip(kitName, zipName, partInfos) {
  fs.mkdirSync(ZIPS, { recursive: true });
  const zipPath = path.join(ZIPS, zipName);
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  const dictSrc = findDict();
  const staging = path.join(ZIPS, `_staging_${kitName}`);
  fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(staging, { recursive: true });

  const files = [
    `${kitName}.md`,
    `${kitName}.json`,
    ...partInfos.map((p) => p.file),
  ];
  for (const f of files) {
    fs.copyFileSync(path.join(AUDIT, f), path.join(staging, f));
  }
  fs.copyFileSync(dictSrc, path.join(staging, "full_dictionary.md"));

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
  return {
    zipPath,
    size: fs.statSync(zipPath).size,
    contents: files.concat(["full_dictionary.md"]),
  };
}

function buildKit({
  kitName,
  zipName,
  cases,
  prompt,
  mode,
  purpose,
  source,
  extraMeta = {},
}) {
  const created = new Date().toISOString();
  const packMetaBase = {
    kind: "content_quality",
    tier: kitName,
    mode,
    purpose,
    source,
    hard_cap_utf8_bytes: MAX_PART_BYTES,
    dictionary_file: "full_dictionary.md",
    prompt,
    ...extraMeta,
  };

  const fullMeta = {
    ...packMetaBase,
    created,
    kit: kitName,
    counts: {
      total: cases.length,
      by_volume: countBy(cases, (c) => c.volume || parseId(c.id).volume),
      by_slug: countBy(cases, (c) => c.slug),
      by_priority: countBy(cases, (c) => c.priority || "—"),
    },
    instructions_for_reviewer: prompt.split("\n"),
  };

  const fullPack = { meta: fullMeta, cases };
  let fullJson = JSON.stringify(fullPack, null, 2);
  writeAtomic(path.join(AUDIT, `${kitName}.json`), fullJson);
  let fullSha = sha256(fullJson);

  const fullPack2 = {
    meta: { ...fullMeta, parent_sha256: fullSha },
    cases,
  };
  fullJson = JSON.stringify(fullPack2, null, 2);
  writeAtomic(path.join(AUDIT, `${kitName}.json`), fullJson);
  fullSha = sha256(fullJson);
  const fullBytes = Buffer.byteLength(fullJson, "utf8");

  const partInfos = packCases(kitName, cases, fullPack2.meta, fullSha);
  const maxPartBytes = partInfos.reduce((m, p) => Math.max(m, p.bytes), 0);
  const overCapParts = partInfos.filter((p) => p.exceeds_hard_cap).length;

  const partTable = partInfos
    .map(
      (p) =>
        `| ${p.part} | \`${p.file}\` | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | \`${p.sha256.slice(0, 12)}…\` | ${p.exceeds_hard_cap ? "over cap*" : ""} |`
    )
    .join("\n");

  const md = `# ${kitName}

**For external AI review only. Do not apply to corpus until after human/parent check.**

Mode: \`${mode}\` · Dictionary: attach **\`full_dictionary.md\`**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **${cases.length}** |
| Parts | ${partInfos.length} |
| Parent JSON bytes | ${fullBytes.toLocaleString()} |
| Max part bytes | ${maxPartBytes.toLocaleString()} |

## Files

- Full kit: [\`${kitName}.json\`](./${kitName}.json) (SHA \`${fullSha.slice(0, 12)}…\`)
- Parts: target ≤ ${MAX_PART_BYTES.toLocaleString()} UTF-8 bytes; single-case parts keep **full** HE/EN (may exceed cap)
- Zip: [\`zips/${zipName}\`](./zips/${zipName}) includes **full parent** \`${kitName}.json\` + all parts + dictionary
- Created: ${created}

## Parts

| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
${partTable}

${overCapParts ? `\\* ${overCapParts} part(s) exceed 85k target — full text preserved (no truncation).` : ""}

## ChatGPT prompt

\`\`\`
${prompt}
\`\`\`

## Notes

- Full HE + current EN per case — **no truncation**.
- Audit only — no corpus apply from this kit until parent approve.
- Purpose: ${purpose}
`;

  writeAtomic(path.join(AUDIT, `${kitName}.md`), md);

  const zipInfo = makeZip(kitName, zipName, partInfos);

  const buildSummary = {
    kit: kitName,
    mode,
    purpose,
    cases: cases.length,
    parts: partInfos.length,
    max_part_bytes: maxPartBytes,
    over_cap_parts: overCapParts,
    full_bytes: fullBytes,
    full_sha256: fullSha,
    path: `newtry/SA_Rebuild/audit/content_mismatch/${kitName}.json`,
    md: `newtry/SA_Rebuild/audit/content_mismatch/${kitName}.md`,
    zip: `newtry/SA_Rebuild/audit/content_mismatch/zips/${zipName}`,
    zip_bytes: zipInfo.size,
    zip_contents: zipInfo.contents,
    parts_detail: partInfos,
    ids: cases.map((c) => c.id),
    created,
  };
  writeAtomic(
    path.join(AUDIT, `${kitName}_BUILD.json`),
    JSON.stringify(buildSummary, null, 2)
  );

  console.log(
    `[kits] ${kitName}: cases=${cases.length} parts=${partInfos.length} zip=${zipName} (${zipInfo.size} bytes)`
  );
  for (const p of partInfos) {
    console.log(
      `  part${p.part}: cases=${p.cases} bytes=${p.bytes}${p.exceeds_hard_cap ? " OVER_CAP" : ""}`
    );
  }
  return buildSummary;
}

function buildMechaberCases() {
  const src = JSON.parse(fs.readFileSync(MECHABER_SRC, "utf8"));
  return src.cases.map((c) => {
    const parsed = parseId(c.id);
    // Prefer already-complete kit fields; refresh from corpus if empty
    let he_html = c.he_html;
    let en_html = c.en_html;
    let he_plain = c.he_plain;
    let en_plain = c.en_plain;
    if (!he_html || !en_html) {
      const live = loadCorpusCell(c.id);
      he_html = live.he_html;
      en_html = live.en_html;
      he_plain = live.he_plain;
      en_plain = live.en_plain;
    }
    return {
      id: c.id,
      volume: parsed.volume,
      siman: c.siman ?? parsed.siman,
      seif: c.seif ?? parsed.seif,
      slug: c.slug || parsed.slug,
      priority: c.priority || "P1",
      kinds: c.kinds || [],
      severity: c.severity ?? 0,
      scores: c.scores || {},
      details: c.details || {},
      he_html,
      en_html,
      he_plain: he_plain || stripTags(he_html),
      en_plain: en_plain || stripTags(en_html),
      instruction:
        c.instruction ||
        "Retranslate EN completely from HE. Preserve {Rama: ...} for הגה. No duplicate RAMA: prefix. Do not omit clauses after Rama. Edit EN only.",
    };
  });
}

function buildMtGarbageCases(excludeIds) {
  const scan = JSON.parse(fs.readFileSync(SCAN_PATH, "utf8"));
  const manual = JSON.parse(fs.readFileSync(MANUAL_MT, "utf8"));
  const exclude = new Set(excludeIds);

  const fromScan = scan.flagged
    .filter((c) => (c.kinds || []).includes("mt_garbage"))
    .filter((c) => !exclude.has(c.id));

  const cases = [];
  const seen = new Set();

  // Manual Netiv Chayim 244:5 first (priority seed)
  for (const m of manual.cases || []) {
    const id = m.corpus_id || m.id;
    if (!id || seen.has(id) || exclude.has(id)) continue;
    const parsed = parseId(id);
    const live = loadCorpusCell(id);
    cases.push({
      id,
      volume: parsed.volume,
      siman: m.siman ?? parsed.siman,
      seif: m.seif ?? parsed.seif,
      slug: m.slug || parsed.slug,
      priority: "P0_manual_seed",
      kinds: ["mt_garbage", "manual_confirmed"],
      severity: 99,
      scores: {
        en_bytes: m.sizes?.en_bytes,
        he_bytes: m.sizes?.he_bytes,
      },
      details: {
        manual_flag_id: m.id,
        in_oc_content_scan: m.in_oc_content_scan === true,
        note: "Human-verified MT garbage; not in OC_CONTENT_SCAN flagged list",
      },
      he_html: live.he_html,
      en_html: live.en_html,
      he_plain: live.he_plain,
      en_plain: live.en_plain,
      instruction:
        "Fresh-translate EN from HE. Discard MT garbage entirely. Dictionary terms; no additions.",
    });
    seen.add(id);
  }

  // All scan mt_garbage (prefer high severity, netiv-chayim early via sort)
  const sorted = [...fromScan].sort((a, b) => {
    const aNetiv = a.slug === "netiv-chayim" ? 0 : 1;
    const bNetiv = b.slug === "netiv-chayim" ? 0 : 1;
    if (aNetiv !== bNetiv) return aNetiv - bNetiv;
    return (b.severity || 0) - (a.severity || 0) || a.id.localeCompare(b.id);
  });

  for (const c of sorted) {
    if (seen.has(c.id)) continue;
    const parsed = parseId(c.id);
    const live = loadCorpusCell(c.id);
    cases.push({
      id: c.id,
      volume: parsed.volume,
      siman: parsed.siman,
      seif: parsed.seif,
      slug: c.slug || parsed.slug,
      priority: c.slug === "netiv-chayim" ? "P0_netiv" : "P1_scan_mt_garbage",
      kinds: c.kinds || ["mt_garbage"],
      severity: c.severity ?? 0,
      scores: c.scores || {},
      details: c.details || {},
      he_html: live.he_html,
      en_html: live.en_html,
      he_plain: live.he_plain,
      en_plain: live.en_plain,
      instruction:
        "Fresh-translate EN from HE. Discard MT garbage entirely. Dictionary terms; no additions.",
    });
    seen.add(c.id);
  }

  return {
    cases,
    scan_mt_garbage_total: scan.flagged.filter((c) =>
      (c.kinds || []).includes("mt_garbage")
    ).length,
    excluded_overlap_with_mechaber_kit: [...exclude].filter((id) =>
      scan.flagged.some(
        (c) => c.id === id && (c.kinds || []).includes("mt_garbage")
      )
    ),
  };
}

function writeIndex(summaries) {
  const stamp = new Date().toISOString();
  const rows = summaries
    .map(
      (s) =>
        `| \`${s.kit}\` | ${s.cases} | ${s.parts} | ${s.max_part_bytes.toLocaleString()} | \`${s.full_sha256.slice(0, 12)}…\` | [\`zips/${path.basename(s.zip)}\`](./zips/${path.basename(s.zip)}) |`
    )
    .join("\n");

  const md = `# OC_GPT_KITS_INDEX

External AI kits for **OC content-quality** fixes (cut EN / MT garbage). **Audit only — no corpus apply.**

**Built:** ${stamp}  
Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/\`  
Scan: [\`OC_CONTENT_SCAN_2026-08-30.json\`](./OC_CONTENT_SCAN_2026-08-30.json)  
Flags: [\`CONTENT_FIX_FLAGS.json\`](./CONTENT_FIX_FLAGS.json)

## Active kits

| Kit | Cases | Parts | Max part bytes | SHA-256 (prefix) | Zip |
|-----|------:|------:|---------------:|------------------|-----|
${rows}

### 01 — Mechaber cut-EN
- Source: [\`OC_MECHABER_CUT_EN_KIT.json\`](./OC_MECHABER_CUT_EN_KIT.json) (120 cases, full HE+EN)
- Mode: fresh_translate / complete from HE; fix \`{Rama: RAMA:}\`; restore post-Rama clauses
- Seed: \`oc1/siman244/seif-001/mechaber\`

### 02 — Commentary MT garbage
- Scan \`mt_garbage\` (260) + manual Netiv Chayim 244:5
- IDs already in kit 01 excluded (dedupe)
- Mode: discard MT; fresh_translate from HE
- Parts cover **all** included cases (no text truncation)

## Zip contents (each)

- Hardened prompt MD (\`*_GPT_KIT.md\`)
- Parent JSON (\`*_GPT_KIT.json\`)
- Part JSON(s) \`*_partNN.json\` (≤85k target)
- \`full_dictionary.md\` (from repo \`full_dictionary (1).md\`)

## Deferred

- Rama-heavy tracks (\`rama_he_hagah_unreflected\`, \`rama_spurious\`, etc.) — not in these kits

## Full local clean refresh?

**No** — kits are audit packaging only; corpus unchanged.

## Related

- [\`CONTENT_FIX_FLAGS.md\`](./CONTENT_FIX_FLAGS.md)
- [\`OC_COMMENTARY_MT_GARBAGE_MANUAL.json\`](./OC_COMMENTARY_MT_GARBAGE_MANUAL.json)
`;

  writeAtomic(path.join(AUDIT, "OC_GPT_KITS_INDEX.md"), md);

  // Append pointer on CONTENT_FIX_FLAGS.md
  const flagsMd = path.join(AUDIT, "CONTENT_FIX_FLAGS.md");
  if (fs.existsSync(flagsMd)) {
    let text = fs.readFileSync(flagsMd, "utf8");
    const pointer = `

---

## GPT fix kits (2026-08-30)

See [\`OC_GPT_KITS_INDEX.md\`](./OC_GPT_KITS_INDEX.md).

| Zip | Cases | Parts |
|-----|------:|------:|
${summaries.map((s) => `| \`zips/${path.basename(s.zip)}\` | ${s.cases} | ${s.parts} |`).join("\n")}
`;
    if (/## GPT fix kits/.test(text)) {
      text = text.replace(/## GPT fix kits[\s\S]*?(?=\n## |\n*$)/, pointer.trim() + "\n\n");
    } else {
      text = text.trimEnd() + "\n" + pointer;
    }
    writeAtomic(flagsMd, text);
  }

  const manifestPath = path.join(ZIPS, "ZIPS_MANIFEST.md");
  let man = `# OC Content GPT Kit Zips Manifest\n\nBuilt: ${stamp}\n\n| Zip | Size (bytes) | Contents |\n|-----|-------------:|----------|\n`;
  for (const s of summaries) {
    man += `| \`${path.basename(s.zip)}\` | ${s.zip_bytes} | ${(s.zip_contents || []).join(", ")} |\n`;
  }
  writeAtomic(manifestPath, man);
}

function main() {
  const mechaberCases = buildMechaberCases();
  const mechaberIds = mechaberCases.map((c) => c.id);

  const s1 = buildKit({
    kitName: "01_OC_MECHABER_CUT_EN_GPT_KIT",
    zipName: "01_OC_MECHABER_CUT_EN_GPT_KIT.zip",
    cases: mechaberCases,
    prompt: MECHABER_PROMPT,
    mode: "fresh_translate_complete_from_he",
    purpose:
      "120 highest-priority cut/incomplete Mechaber EN (+ Rama display) for GPT retranslate",
    source: "OC_MECHABER_CUT_EN_KIT.json + live corpus verify",
    extraMeta: {
      seed: "oc1/siman244/seif-001/mechaber",
      output_schema: { primary: "new_en" },
    },
  });

  const mtPack = buildMtGarbageCases(mechaberIds);
  const s2 = buildKit({
    kitName: "02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT",
    zipName: "02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT.zip",
    cases: mtPack.cases,
    prompt: MT_GARBAGE_PROMPT,
    mode: "fresh_translate_discard_mt_garbage",
    purpose:
      "OC commentary (+ residual) MT garbage — full scan mt_garbage set plus Netiv Chayim 244:5 manual",
    source:
      "OC_CONTENT_SCAN_2026-08-30.json mt_garbage + OC_COMMENTARY_MT_GARBAGE_MANUAL.json",
    extraMeta: {
      scan_mt_garbage_total: mtPack.scan_mt_garbage_total,
      excluded_overlap_with_mechaber_kit:
        mtPack.excluded_overlap_with_mechaber_kit,
      manual_seed: "oc1/siman244/seif-005/netiv-chayim",
      output_schema: { primary: "new_en" },
      coverage_note:
        "All scan mt_garbage included except IDs already in 01_OC_MECHABER_CUT_EN_GPT_KIT; plus manual Netiv 244:5",
    },
  });

  writeIndex([s1, s2]);

  writeAtomic(
    path.join(AUDIT, "OC_GPT_KITS_BUILD.json"),
    JSON.stringify(
      {
        built_at: new Date().toISOString(),
        kits: [s1, s2],
        full_local_clean_refresh_needed: false,
        note: "Audit packaging only — corpus unchanged",
      },
      null,
      2
    )
  );

  console.log("[kits] index written: OC_GPT_KITS_INDEX.md");
  console.log("[kits] DONE — full_local_clean_refresh_needed=false");
}

main();
