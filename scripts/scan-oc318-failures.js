/**
 * OC318 failure-marker scan: classifies every English paragraph as
 * CLEAN / REVIEW_REQUIRED / RETRANSLATE_FROM_HEBREW_REQUIRED.
 * Writes output/OC318_validation_report.md and can exit non-zero for build gating.
 *
 * Usage:
 *   node scripts/scan-oc318-failures.js [--input data/oc318.full.json]
 *   node scripts/scan-oc318-failures.js --docx output/OC318_Complete_V3.docx
 *   node scripts/scan-oc318-failures.js --input ... --fail-on-retranslate
 *   node scripts/scan-oc318-failures.js --input ... --fail-on-any-marker
 *   node scripts/scan-oc318-failures.js --input ... --seif 1
 *
 * Classification follows `halachic_translation_living_cursor_guide.md`:
 * any **hard** failure marker → RETRANSLATE_FROM_HEBREW_REQUIRED; else any **soft** → REVIEW_REQUIRED.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

/** Hard case-sensitive fragments (acronyms / garbage tokens). */
const HARD_CASE_SENSITIVE = [
  "DSL",
  "DMSH",
  "Dahoi",
  "Dela",
  "Dafilo",
  "Dafi'",
  "Daitmar",
  "Dagm",
  "Dastma",
  "Dastama",
  "Dachion",
  "KIL",
  "KII",
  "KMSH",
  "KMSh",
  "Lita",
  "LT",
  "A.A.",
  "A.C.",
  "ACM",
  "BBI",
  "B.D.",
  "PG",
  "PK",
  "PB",
  "RPG",
  "S.D.",
  "D.O.T.",
  "Yahu",
  "Shafi",
  "Holkin",
  "Aliyahu",
  "Damhir",
  "Dahmir",
  "Dahui",
  "Daviza",
  "Shaduka",
  "Dabila",
  "Dabitahu"
];

/**
 * Soft markers (living guide §6): review, glossary, or retranslate if sentence is broken.
 * @type {string[]}
 */
const SOFT_PHRASES = [
  "the hand is scalded",
  "hand is scalded",
  "disgusted hand",
  "hand is disgusted",
  "if we catch a cold",
  "arbitrators",
  "Sunday",
  "section y",
  "chapter y",
  "the sign",
  "the mark"
];

const SOFT_PHRASE_LOWER = new Set(SOFT_PHRASES.map((p) => p.toLowerCase()));

/** All legacy phrase rows before hard/soft split; order preserved for diff friendliness. */
const LEGACY_PHRASES = [
  "transfusion from a vessel",
  "infusion from a vessel",
  "religious interpretation",
  "palm in his eyes",
  "Motzei Shabbos 19",
  "prepare LT",
  "the hand is scalded",
  "disgusted hand",
  "the patient model",
  "the healthy model",
  "if we catch a cold",
  "section E",
  "section y",
  "To Koti",
  "Rev. C. B.",
  "Dain Shabbos prepare",
  "Dela Rashi",
  "arbitrators",
  "spurring",
  "Sunday",
  "ovary",
  "the holy one",
  "C. S.",
  "mutiny",
  "the sign",
  "the mark",
  "adds vanity",
  "silent prayer",
  "shem delphi",
  "the history of heat",
  "hot toldot",
  "heated by light that you will be saved",
  "the opinion of the DSL column",
  "we do not recommend cooking in the 20th century",
  "with salt for the sake of sin",
  "forbidden to cut it from the toldot of the light",
  "a daishinin that may not multiply",
  "if he cut a cow from the sick man",
  "from a designated place"
];

/** Hard-only additions (living guide §5). */
const HARD_PHRASE_EXTRA = [
  "the religious interpretation",
  "20th century",
  "must be struck with a mutiny"
];

function dedupePhrases(arr) {
  const seen = new Set();
  const out = [];
  for (const p of arr) {
    const k = p.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

/** Hard phrases = legacy minus soft bucket + guide extras (deduped). */
const HARD_PHRASES = dedupePhrases([
  ...LEGACY_PHRASES.filter((p) => !SOFT_PHRASE_LOWER.has(p.toLowerCase())),
  ...HARD_PHRASE_EXTRA
]);

/** Back-compat export name: full phrase list before tier split. */
const CASE_INSENSITIVE_PHRASES = LEGACY_PHRASES;

/** @deprecated use HARD_CASE_SENSITIVE */
const CASE_SENSITIVE = HARD_CASE_SENSITIVE;

/**
 * Regex-only rules (cannot be expressed as a simple bounded phrase).
 * Keep flags including `g` for iteration.
 */
const CUSTOM_REGEX_RULES = [
  /** Gematria / year garbage */
  { id: "20 20", regex: /\b20\s+20\b/g }
];

/**
 * Mistranslated Hebrew note markers like (י) shown as English gibberish.
 * Only parenthetical forms — bare letters like \\bH\\b / \\bYid\\b are too noisy for scanning.
 */
const BAD_PAREN_NOTE_LABELS = [
  "(Yid)",
  "(Tu)",
  "(Kid)",
  "(Lev)",
  "(J)",
  "(H)"
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Short case-sensitive token: word-boundary, ASCII letters/dots/apostrophe only. */
function caseSensitiveTokenRegex(token) {
  if (token.length <= 6 && /^[A-Za-z.'\u2019]+$/.test(token))
    return new RegExp(`\\b${escapeRegex(token)}\\b`, "g");
  return new RegExp(escapeRegex(token), "g");
}

function buildHardRules() {
  const rules = [];
  for (const phrase of HARD_PHRASES) {
    const escaped = escapeRegex(phrase);
    rules.push({
      id: phrase,
      regex: new RegExp(`\\b${escaped}\\b`, "gi")
    });
  }
  for (const tok of HARD_CASE_SENSITIVE) {
    rules.push({
      id: tok,
      regex: caseSensitiveTokenRegex(tok)
    });
  }
  for (const { id, regex } of CUSTOM_REGEX_RULES) {
    rules.push({
      id,
      regex: new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`)
    });
  }
  return rules;
}

function buildSoftRules() {
  const rules = [];
  for (const phrase of SOFT_PHRASES) {
    const escaped = escapeRegex(phrase);
    rules.push({
      id: phrase,
      regex: new RegExp(`\\b${escaped}\\b`, "gi")
    });
  }
  for (const label of BAD_PAREN_NOTE_LABELS) {
    rules.push({
      id: label,
      regex: new RegExp(escapeRegex(label), "g")
    });
  }
  return rules;
}

const HARD_RULES = buildHardRules();
const SOFT_RULES = buildSoftRules();

/** Union of both tiers for tooling that needs “any marker”. */
const RULES = [...HARD_RULES, ...SOFT_RULES];

/**
 * Non-overlapping matches within one tier; prefer longer spans first.
 * @param {object[]} rules  HARD_RULES or SOFT_RULES
 */
function findMarkersNonOverlapping(text, rules) {
  const candidates = [];
  for (const rule of rules) {
    const re = new RegExp(rule.regex.source, rule.regex.flags.includes("g") ? rule.regex.flags : `${rule.regex.flags}g`);
    let m;
    while ((m = re.exec(text)) !== null) {
      candidates.push({
        id: rule.id,
        start: m.index,
        end: m.index + m[0].length
      });
    }
  }
  candidates.sort((a, b) => {
    const lenDiff = b.end - b.start - (a.end - a.start);
    if (lenDiff !== 0) return lenDiff;
    return a.start - b.start;
  });
  const taken = [];
  const hits = [];
  for (const c of candidates) {
    let overlap = false;
    for (const u of taken) {
      if (!(c.end <= u.start || c.start >= u.end)) {
        overlap = true;
        break;
      }
    }
    if (!overlap) {
      taken.push({ start: c.start, end: c.end });
      hits.push(c.id);
    }
  }
  hits.sort();
  return hits;
}

/** Living guide §16: hard markers force full retranslation; soft markers imply review. */
function classifyFromHardSoft(hardHits, softHits) {
  if (hardHits.length > 0) return "RETRANSLATE_FROM_HEBREW_REQUIRED";
  if (softHits.length > 0) return "REVIEW_REQUIRED";
  return "CLEAN";
}

function classifyParagraphEnglish(text) {
  const hardHits = findMarkersNonOverlapping(text, HARD_RULES);
  const softHits = findMarkersNonOverlapping(text, SOFT_RULES);
  return {
    hardHits,
    softHits,
    hits: [...hardHits, ...softHits].sort(),
    status: classifyFromHardSoft(hardHits, softHits)
  };
}

/** @deprecated Tiered scanning uses classifyFromHardSoft; kept for quick union checks. */
function classifyFromHits(hits) {
  const n = hits.length;
  if (n === 0) return "CLEAN";
  if (n === 1) return "REVIEW_REQUIRED";
  return "RETRANSLATE_FROM_HEBREW_REQUIRED";
}

function aggregateMarkerCounts(hitsList) {
  const counts = {};
  for (const h of hitsList) {
    counts[h] = (counts[h] || 0) + 1;
  }
  return counts;
}

function extractWordXmlFromDocx(docxPath) {
  const abs = path.resolve(docxPath);
  if (!fs.existsSync(abs)) {
    throw new Error(`DOCX not found: ${abs}`);
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "oc318-scan-docx-"));
  try {
    if (process.platform === "win32") {
      const psPath = abs.replace(/'/g, "''");
      const psTmp = tmp.replace(/'/g, "''");
      execSync(
        `powershell.exe -NoProfile -Command "Expand-Archive -LiteralPath '${psPath}' -DestinationPath '${psTmp}' -Force"`,
        { stdio: "pipe" }
      );
    } else {
      execSync(`unzip -oq "${abs}" -d "${tmp}"`, { stdio: "pipe" });
    }
    const xmlPath = path.join(tmp, "word", "document.xml");
    if (!fs.existsSync(xmlPath)) {
      throw new Error("word/document.xml missing after unzip");
    }
    return fs.readFileSync(xmlPath, "utf8");
  } finally {
    try {
      fs.rmSync(tmp, { recursive: true, force: true });
    } catch (_) {
      /* ignore */
    }
  }
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function paragraphsFromWordXml(xml) {
  const pMatches = xml.match(/<w:p[\s\S]*?<\/w:p>/g) || [];
  const out = [];
  for (const p of pMatches) {
    const ts = [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]);
    const t = decodeXml(ts.join("")).replace(/\s+/g, " ").trim();
    if (t.length) out.push(t);
  }
  return out;
}

function scanJsonDocument(data, seifFilter) {
  const rows = [];
  let totalParagraphs = 0;
  const seifim = data.seifim || [];

  function consider(english, meta) {
    const eng = typeof english === "string" ? english.trim() : "";
    if (!eng) return;
    if (seifFilter != null && meta.seif !== seifFilter) return;
    totalParagraphs += 1;
    const { hardHits, softHits, hits, status } = classifyParagraphEnglish(eng);
    rows.push({
      ...meta,
      english: eng,
      hitsHard: hardHits,
      hitsSoft: softHits,
      hits,
      hitCount: hits.length,
      status,
      snippet: eng.slice(0, 220).replace(/\s+/g, " ")
    });
  }

  for (const seif of seifim) {
    const n = seif.number;
    const sources = seif.sources || {};
    const mr = sources["Mechaber and Rama"];
    if (mr && typeof mr.english === "string") {
      consider(mr.english, {
        seif: n,
        source: "Mechaber and Rama",
        noteIndex: null
      });
    }
    for (const name of [
      "Tur",
      "Magen Avraham",
      "Taz",
      "Be'er Heitev",
      "Biur Halacha",
      "Shulchan Aruch K'pshuto"
    ]) {
      const block = sources[name];
      if (!block || !Array.isArray(block.notes)) continue;
      block.notes.forEach((note, i) => {
        if (note && typeof note.english === "string") {
          consider(note.english, { seif: n, source: name, noteIndex: i + 1 });
        }
      });
    }
  }

  const clean = rows.filter((r) => r.status === "CLEAN").length;
  const review = rows.filter((r) => r.status === "REVIEW_REQUIRED").length;
  const retr = rows.filter((r) => r.status === "RETRANSLATE_FROM_HEBREW_REQUIRED")
    .length;

  const allHits = rows.flatMap((r) => r.hits);
  const allHitsHard = rows.flatMap((r) => r.hitsHard || []);
  const allHitsSoft = rows.flatMap((r) => r.hitsSoft || []);
  const markerTally = aggregateMarkerCounts(allHits);
  const markerTallyHard = aggregateMarkerCounts(allHitsHard);
  const markerTallySoft = aggregateMarkerCounts(allHitsSoft);

  const flagged = rows.filter((r) => r.status !== "CLEAN");

  return {
    totalParagraphs,
    clean,
    review,
    retranslate: retr,
    markerTally,
    markerTallyHard,
    markerTallySoft,
    rows,
    flagged
  };
}

function scanDocxParagraphs(docxPath, seifFilter) {
  const xml = extractWordXmlFromDocx(docxPath);
  const paras = paragraphsFromWordXml(xml);
  let totalParagraphs = 0;
  const rows = [];
  for (let i = 0; i < paras.length; i += 1) {
    const eng = paras[i];
    const { hardHits, softHits, hits, status } = classifyParagraphEnglish(eng);
    totalParagraphs += 1;
    rows.push({
      seif: null,
      source: `DOCX paragraph index ${i + 1}`,
      noteIndex: null,
      english: eng,
      hitsHard: hardHits,
      hitsSoft: softHits,
      hits,
      hitCount: hits.length,
      status,
      snippet: eng.slice(0, 220).replace(/\s+/g, " ")
    });
  }
  const clean = rows.filter((r) => r.status === "CLEAN").length;
  const review = rows.filter((r) => r.status === "REVIEW_REQUIRED").length;
  const retr = rows.filter((r) => r.status === "RETRANSLATE_FROM_HEBREW_REQUIRED")
    .length;
  const allHits = rows.flatMap((r) => r.hits);
  const allHitsHard = rows.flatMap((r) => r.hitsHard || []);
  const allHitsSoft = rows.flatMap((r) => r.hitsSoft || []);
  const markerTally = aggregateMarkerCounts(allHits);
  const markerTallyHard = aggregateMarkerCounts(allHitsHard);
  const markerTallySoft = aggregateMarkerCounts(allHitsSoft);
  const flagged = rows.filter((r) => r.status !== "CLEAN");
  return {
    totalParagraphs,
    clean,
    review,
    retranslate: retr,
    markerTally,
    markerTallyHard,
    markerTallySoft,
    rows,
    flagged
  };
}

const REPORT_SOURCE_ORDER = [
  "Mechaber and Rama",
  "Tur",
  "Magen Avraham",
  "Taz",
  "Be'er Heitev",
  "Biur Halacha",
  "Shulchan Aruch K'pshuto"
];

/** Non-clean paragraphs per source label (Mechaber, Tur, …). */
function failuresBySource(flaggedRows) {
  const counts = {};
  for (const r of flaggedRows) {
    const s = r.source || "?";
    counts[s] = (counts[s] || 0) + 1;
  }
  return counts;
}

function orderedSourceKeys(counts) {
  const seen = new Set();
  const out = [];
  for (const name of REPORT_SOURCE_ORDER) {
    if (counts[name] !== undefined) {
      out.push(name);
      seen.add(name);
    }
  }
  const rest = Object.keys(counts)
    .filter((k) => !seen.has(k))
    .sort((a, b) => a.localeCompare(b));
  return out.concat(rest);
}

function writeReport(outPath, inputLabel, result, extra) {
  const lines = [];
  lines.push("# OC318 validation report");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Input: ${inputLabel}`);
  if (extra) lines.push(extra);
  lines.push("");
  lines.push(
    "_Classifier: **`halachic_translation_living_cursor_guide.md`** — any **hard** marker ⇒ `RETRANSLATE_FROM_HEBREW_REQUIRED`; else any **soft** marker ⇒ `REVIEW_REQUIRED`._"
  );
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`| Metric | Count |`);
  lines.push(`| --- | ---: |`);
  lines.push(`| Total paragraphs scanned | ${result.totalParagraphs} |`);
  lines.push(`| CLEAN | ${result.clean} |`);
  lines.push(`| REVIEW_REQUIRED | ${result.review} |`);
  lines.push(`| RETRANSLATE_FROM_HEBREW_REQUIRED | ${result.retranslate} |`);
  lines.push("");
  const tally = result.markerTally;
  const keysByFreq = Object.keys(tally).sort((a, b) =>
    tally[b] !== tally[a] ? tally[b] - tally[a] : a.localeCompare(b)
  );
  lines.push("## Failures by source");
  lines.push("");
  lines.push(
    "_Counts are paragraphs that are not CLEAN (have ≥1 failure marker), grouped by English source block._"
  );
  lines.push("");
  const sourceCounts = failuresBySource(result.flagged);
  const srcKeys = orderedSourceKeys(sourceCounts);
  if (srcKeys.length === 0) {
    lines.push("_No flagged paragraphs._");
  } else {
    lines.push(`| Source | Flagged paragraphs |`);
    lines.push(`| --- | ---: |`);
    for (const k of srcKeys) {
      lines.push(`| ${k.replace(/\|/g, "\\|")} | ${sourceCounts[k]} |`);
    }
  }
  lines.push("");
  lines.push("## Hard failure markers (aggregate)");
  lines.push("");
  const tallyH = result.markerTallyHard || {};
  const keysH = Object.keys(tallyH).sort((a, b) =>
    tallyH[b] !== tallyH[a] ? tallyH[b] - tallyH[a] : a.localeCompare(b)
  );
  if (keysH.length === 0) {
    lines.push("_None._");
  } else {
    lines.push(`| Marker | Count |`);
    lines.push(`| --- | ---: |`);
    for (const k of keysH) {
      lines.push(`| ${k.replace(/\|/g, "\\|")} | ${tallyH[k]} |`);
    }
  }
  lines.push("");
  lines.push("## Soft failure markers (aggregate)");
  lines.push("");
  const tallyS = result.markerTallySoft || {};
  const keysS = Object.keys(tallyS).sort((a, b) =>
    tallyS[b] !== tallyS[a] ? tallyS[b] - tallyS[a] : a.localeCompare(b)
  );
  if (keysS.length === 0) {
    lines.push("_None._");
  } else {
    lines.push(`| Marker | Count |`);
    lines.push(`| --- | ---: |`);
    for (const k of keysS) {
      lines.push(`| ${k.replace(/\|/g, "\\|")} | ${tallyS[k]} |`);
    }
  }
  lines.push("");
  lines.push("## Top 20 recurring failure markers (all tiers)");
  lines.push("");
  if (keysByFreq.length === 0) {
    lines.push("_None._");
  } else {
    lines.push(`| Rank | Marker | Count |`);
    lines.push(`| ---: | --- | ---: |`);
    const top = keysByFreq.slice(0, 20);
    top.forEach((k, i) => {
      lines.push(`| ${i + 1} | ${k.replace(/\|/g, "\\|")} | ${tally[k]} |`);
    });
    if (keysByFreq.length > 20) {
      lines.push("");
      lines.push(
        `_…and ${keysByFreq.length - 20} more distinct marker type(s) in the full tally below._`
      );
    }
  }
  lines.push("");
  lines.push("## All failure markers (full aggregate)");
  lines.push("");
  if (keysByFreq.length === 0) {
    lines.push("_None._");
  } else {
    lines.push(`| Marker | Count |`);
    lines.push(`| --- | ---: |`);
    for (const k of keysByFreq) {
      lines.push(`| ${k.replace(/\|/g, "\\|")} | ${tally[k]} |`);
    }
  }
  lines.push("");
  lines.push("## Flagged paragraphs");
  lines.push("");
  if (result.flagged.length === 0) {
    lines.push("_No flagged paragraphs._");
  } else {
    for (const r of result.flagged) {
      const note =
        r.noteIndex != null ? ` note ${r.noteIndex}` : "";
      lines.push(
        `### Seif ${r.seif ?? "?"} — ${r.source}${note} — **${r.status}**`
      );
      lines.push("");
      lines.push(
        `- **Hard (${(r.hitsHard || []).length}):** ${(r.hitsHard || []).join(", ") || "—"}`
      );
      lines.push(
        `- **Soft (${(r.hitsSoft || []).length}):** ${(r.hitsSoft || []).join(", ") || "—"}`
      );
      lines.push(`- **All markers (${r.hitCount}):** ${r.hits.join(", ") || "—"}`);
      lines.push(`- **Snippet:** ${r.snippet}${r.english.length > 220 ? "…" : ""}`);
      lines.push("");
    }
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
}

function parseArgs(argv) {
  const args = {
    input: null,
    docx: null,
    seif: null,
    failOnRetranslate: false,
    failOnAnyMarker: false,
    noReport: false,
    help: false
  };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input" || t === "-i") {
      args.input = argv[i + 1];
      i += 1;
    } else if (t === "--docx") {
      args.docx = argv[i + 1];
      i += 1;
    } else if (t === "--seif") {
      args.seif = parseInt(argv[i + 1], 10);
      i += 1;
    } else if (t === "--fail-on-retranslate") {
      args.failOnRetranslate = true;
    } else if (t === "--fail-on-any-marker") {
      args.failOnAnyMarker = true;
    } else if (t === "--no-report") {
      args.noReport = true;
    } else if (t === "--help" || t === "-h") {
      args.help = true;
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(`
Usage: node scripts/scan-oc318-failures.js [options]

  --input, -i   Path to oc318 JSON (default: data/oc318.full.json)
  --docx        Scan generated DOCX instead of JSON
  --seif N      When scanning JSON, only include paragraphs from this seif (counts/summary)
  --fail-on-retranslate   Exit 1 if any RETRANSLATE_FROM_HEBREW_REQUIRED
  --fail-on-any-marker    Exit 1 if any paragraph is not CLEAN
  --no-report   Do not write output/OC318_validation_report.md
`);
    process.exit(0);
  }

  const defaultJson = path.join("data", "oc318.full.json");
  let result;
  let inputLabel;

  if (args.docx) {
    inputLabel = path.resolve(args.docx);
    result = scanDocxParagraphs(inputLabel, args.seif);
  } else {
    const inputPath = path.resolve(args.input || defaultJson);
    if (!fs.existsSync(inputPath)) {
      console.error(`Input not found: ${inputPath}`);
      process.exit(1);
    }
    inputLabel = inputPath;
    const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));
    result = scanJsonDocument(data, args.seif);
  }

  const reportPath = path.join("output", "OC318_validation_report.md");
  const seifNote =
    args.seif != null && !Number.isNaN(args.seif)
      ? `(filter: seif ${args.seif} only)`
      : "";
  if (!args.noReport) {
    writeReport(reportPath, inputLabel, result, seifNote);
  }

  console.log(`Scanned: ${inputLabel} ${seifNote}`.trim());
  console.log(`Total paragraphs: ${result.totalParagraphs}`);
  console.log(`CLEAN: ${result.clean}`);
  console.log(`REVIEW_REQUIRED: ${result.review}`);
  console.log(`RETRANSLATE_FROM_HEBREW_REQUIRED: ${result.retranslate}`);
  if (!args.noReport) {
    console.log(`Report: ${path.resolve(reportPath)}`);
  }

  let exitCode = 0;
  if (args.failOnRetranslate && result.retranslate > 0) {
    console.error(
      `FAIL: ${result.retranslate} paragraph(s) require full retranslation from Hebrew.`
    );
    exitCode = 1;
  }
  if (args.failOnAnyMarker && result.flagged.length > 0) {
    console.error(
      `FAIL: ${result.flagged.length} paragraph(s) still contain failure markers.`
    );
    exitCode = 1;
  }

  process.exit(exitCode);
}

/** Exported for retranslate-oc318-flagged.js */
function scanJsonData(data, seifFilter) {
  return scanJsonDocument(data, seifFilter);
}

function paragraphPointerFromScanRow(row) {
  return { seif: row.seif, source: row.source, noteIndex: row.noteIndex };
}

module.exports = {
  RULES,
  HARD_RULES,
  SOFT_RULES,
  HARD_CASE_SENSITIVE,
  HARD_PHRASES,
  SOFT_PHRASES,
  findMarkersNonOverlapping,
  classifyFromHits,
  classifyFromHardSoft,
  classifyParagraphEnglish,
  scanJsonData,
  paragraphPointerFromScanRow,
  CASE_SENSITIVE,
  CASE_INSENSITIVE_PHRASES,
  CUSTOM_REGEX_RULES,
  BAD_PAREN_NOTE_LABELS
};

if (require.main === module) {
  main();
}
