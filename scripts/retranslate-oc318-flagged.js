/**
 * For each English paragraph classified RETRANSLATE_FROM_HEBREW_REQUIRED,
 * replaces the English with a fresh Anthropic translation from the paired Hebrew.
 * Does not use local find-and-replace.
 *
 * Requires ANTHROPIC_API_KEY. Uses ANTHROPIC_MODEL like build-oc318-anthropic.js.
 *
 * Usage:
 *   node scripts/retranslate-oc318-flagged.js --input data/oc318.full.json [--output same]
 *   node scripts/retranslate-oc318-flagged.js [--dry-run]
 *   node scripts/retranslate-oc318-flagged.js --seif 2
 *   node scripts/retranslate-oc318-flagged.js --include-review   # also REVIEW_REQUIRED (full cleanup)
 */

const fs = require("fs");
const path = require("path");
const { scanJsonData, classifyParagraphEnglish } = require("./scan-oc318-failures.js");

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";
const MAX_TOKENS = Math.min(
  16384,
  parseInt(process.env.ANTHROPIC_MAX_TOKENS_RETRANSLATE || "16384", 10) || 16384
);
const DELAY_MS = parseInt(process.env.ANTHROPIC_DELAY_MS || "600", 10) || 600;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseArgs(argv) {
  const args = {
    input: path.join("data", "oc318.full.json"),
    output: null,
    seif: null,
    dryRun: false,
    includeReview: false,
    help: false
  };
  for (let i = 2; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--input" || t === "-i") {
      args.input = argv[i + 1];
      i += 1;
    } else if (t === "--output" || t === "-o") {
      args.output = argv[i + 1];
      i += 1;
    } else if (t === "--seif") {
      args.seif = parseInt(argv[i + 1], 10);
      i += 1;
    } else if (t === "--dry-run") {
      args.dryRun = true;
    } else if (t === "--include-review") {
      args.includeReview = true;
    } else if (t === "--help" || t === "-h") {
      args.help = true;
    }
  }
  if (!args.output) args.output = args.input;
  return args;
}

function getHebrewForCell(data, seifNum, source, noteIndex) {
  const seif = (data.seifim || []).find((s) => s.number === seifNum);
  if (!seif) return null;
  const src = seif.sources || {};
  if (source === "Mechaber and Rama") {
    return (src["Mechaber and Rama"] && src["Mechaber and Rama"].hebrew) || null;
  }
  const block = src[source];
  if (!block || !Array.isArray(block.notes)) return null;
  const idx = noteIndex != null ? noteIndex - 1 : null;
  if (idx == null || idx < 0 || idx >= block.notes.length) return null;
  return block.notes[idx].hebrew || null;
}

function setEnglish(data, seifNum, source, noteIndex, english) {
  const seif = (data.seifim || []).find((s) => s.number === seifNum);
  if (!seif) throw new Error(`Seif ${seifNum} not found`);
  const src = seif.sources || {};
  if (source === "Mechaber and Rama") {
    if (!src["Mechaber and Rama"]) throw new Error("Mechaber missing");
    src["Mechaber and Rama"].english = english;
    return;
  }
  if (noteIndex == null) {
    throw new Error("noteIndex required for per-source notes");
  }
  const block = src[source];
  if (!block || !Array.isArray(block.notes)) throw new Error(`Source ${source} missing`);
  const idx = noteIndex != null ? noteIndex - 1 : null;
  if (idx == null || idx < 0 || idx >= block.notes.length)
    throw new Error(`Bad note index ${noteIndex}`);
  block.notes[idx].english = english;
}

function buildUserPrompt(seifNumber, sourceLabel, hebrewParagraph, failedEnglish) {
  return `Translate the following halachic Hebrew paragraph fresh into English.

Ignore the existing English translation completely. It failed validation and may contain machine translation artifacts.

Rules:
1. Translate from the Hebrew only.
2. Do not preserve any machine fragments.
3. Expand rosh teivot correctly.
4. Resolve gematria and references where clear.
5. Preserve source names such as Tur, Magen Avraham, Taz, Rashba, Rosh, Rif, Rama, Shulchan Aruch, Beit Yosef, Gra, Pri Megadim, and Rabbi Akiva Eiger.
6. Use consistent halachic terminology from the project glossary.
7. Do not add commentary.
8. Do not summarize.
9. Do not skip any words.
10. If OCR corruption prevents reliable translation, mark only the unclear phrase as [unclear OCR].
11. Return only the corrected English paragraph.
12. Hebrew note markers: use Hebrew letters (א)(ב)… or standard (a)(b) numbering — never English-letter artifacts like (Yid), (Tu), or (Kid).

The following text is the old English (for your awareness of what failed — do not copy it):
---
${(failedEnglish || "").slice(0, 2000)}${(failedEnglish || "").length > 2000 ? "\n… [truncated]" : ""}
---

Context:
Seif: ${seifNumber}
Source: ${sourceLabel}

Hebrew:
${hebrewParagraph}`;
}

async function fetchRetranslation(apiKey, userText) {
  const body = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: userText }]
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const t = await response.text();
    throw new Error(`Anthropic ${response.status}: ${t}`);
  }

  const json = await response.json();
  const parts = (json.content || []).filter((b) => b.type === "text");
  return parts.map((b) => b.text).join("\n").trim();
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(`
Usage: node scripts/retranslate-oc318-flagged.js [options]

  --input   JSON path (default: data/oc318.full.json)
  --output  Write path (default: same as input)
  --seif N  Only process this seif number (omit for all 19 seifim)
  --include-review   Also retranslate REVIEW_REQUIRED paragraphs (stricter cleanup)
  --dry-run List paragraphs that would be retranslated (no API calls)

Default: only paragraphs with status RETRANSLATE_FROM_HEBREW_REQUIRED (≥2 failure markers).
Requires ANTHROPIC_API_KEY. Saves JSON after each paragraph (crash-safe).
`);
    process.exit(0);
  }

  const inputPath = path.resolve(args.input);
  const outputPath = path.resolve(args.output);

  if (!fs.existsSync(inputPath)) {
    console.error(`Missing: ${inputPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const data = JSON.parse(raw);

  const scan = scanJsonData(data, args.seif);
  const targets = scan.rows.filter((r) => {
    if (args.seif != null && r.seif !== args.seif) return false;
    if (r.status === "RETRANSLATE_FROM_HEBREW_REQUIRED") return true;
    if (args.includeReview && r.status === "REVIEW_REQUIRED") return true;
    return false;
  });

  targets.sort((a, b) =>
    a.seif !== b.seif
      ? a.seif - b.seif
      : a.source !== b.source
        ? a.source.localeCompare(b.source)
        : (a.noteIndex ?? 0) - (b.noteIndex ?? 0)
  );

  const rt = targets.filter(
    (t) => t.status === "RETRANSLATE_FROM_HEBREW_REQUIRED"
  ).length;
  const rv = targets.filter((t) => t.status === "REVIEW_REQUIRED").length;

  console.log(
    `Retranslation targets: ${targets.length} (RETRANSLATE_FROM_HEBREW_REQUIRED: ${rt}${args.includeReview ? `, REVIEW_REQUIRED: ${rv}` : ""})`
  );

  if (args.dryRun) {
    for (const t of targets) {
      const note = t.noteIndex != null ? ` note ${t.noteIndex}` : "";
      console.log(
        `  Seif ${t.seif} | ${t.source}${note} | ${t.status} | hits=${t.hitCount}`
      );
    }
    process.exit(0);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error(
      "Set ANTHROPIC_API_KEY to retranslate. Use --dry-run to list targets only."
    );
    process.exit(1);
  }

  let done = 0;
  for (const row of targets) {
    const heb = getHebrewForCell(data, row.seif, row.source, row.noteIndex);
    if (!heb || !String(heb).trim()) {
      console.warn(
        `Skip seif ${row.seif} ${row.source} note ${row.noteIndex}: no Hebrew`
      );
      continue;
    }

    const userText = buildUserPrompt(
      row.seif,
      row.source,
      heb,
      row.english
    );

    console.log(
      `Retranslating: Seif ${row.seif} | ${row.source} | note ${row.noteIndex ?? "—"}`
    );

    const english = await fetchRetranslation(apiKey, userText);
    if (!english) {
      console.warn("  Empty response, skipping write.");
      continue;
    }

    setEnglish(data, row.seif, row.source, row.noteIndex, english);

    const post = classifyParagraphEnglish(english);
    console.log(
      `  Done. Post-scan: ${post.status} (hard=${post.hardHits.length} soft=${post.softHits.length})`
    );

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

    done += 1;
    await sleep(DELAY_MS);
  }

  console.log(`Finished. Wrote ${outputPath} (${done} paragraph(s) updated).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
