const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";
const MAX_TOKENS = Math.min(
  16384,
  parseInt(process.env.ANTHROPIC_MAX_TOKENS || "16384", 10) || 16384
);
const API_DELAY_MS = parseInt(process.env.ANTHROPIC_DELAY_MS || "400", 10) || 0;

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const SYSTEM_DOCS = [
  {
    id: "main",
    heading: "=== MAIN PROJECT PROMPT ===",
    file: "OC318_Translation_Project_Prompt.md",
    required: true
  },
  {
    id: "pipeline",
    heading: "=== HALACHIC TEXT TRANSLATION PIPELINE ===",
    file: "scripts/halachic_text_translation_pipeline.md",
    required: false
  },
  {
    id: "addendum",
    heading: "=== OC318 TRANSLATION RULES ADDENDUM ===",
    file: "OC318_Translation_Rules_Addendum_for_Cursor.md",
    required: false
  },
  {
    id: "vocab",
    heading: "=== VOCABULARY CORRECTIONS (scripted table; for model context) ===",
    file: "OC318_Vocabulary_Corrections.md",
    required: false
  }
];

/**
 * Layered system prompt: main + pipeline + addendum + vocabulary table.
 * @returns {{ text: string, loadedFiles: string[], missingFiles: string[] }}
 */
function loadSystemPrompt() {
  const cwd = process.cwd();
  const loadedFiles = [];
  const missingFiles = [];
  const chunks = [];

  for (const doc of SYSTEM_DOCS) {
    const abs = path.resolve(cwd, doc.file);
    if (!fs.existsSync(abs)) {
      missingFiles.push(doc.file);
      if (doc.required) {
        throw new Error(`Required system prompt file missing: ${doc.file}`);
      }
      console.warn(`Warning: optional system prompt file missing: ${doc.file}`);
      continue;
    }
    loadedFiles.push(doc.file);
    const body = fs.readFileSync(abs, "utf8");
    chunks.push(`${doc.heading}\n\n${body}`);
  }

  const text = chunks.join("\n\n");
  return { text, loadedFiles, missingFiles };
}

function findSourceDocx() {
  const envPath = process.env.OC318_SOURCE_DOCX;
  if (envPath) {
    const p = path.resolve(envPath);
    if (!fs.existsSync(p)) {
      throw new Error(`OC318_SOURCE_DOCX not found: ${p}`);
    }
    return p;
  }
  const files = fs.readdirSync(process.cwd());
  const candidates = files.filter(
    (f) =>
      f.toLowerCase().endsWith(".docx") &&
      f !== "OC318_NEW_seif1.docx" &&
      !f.startsWith("~$") &&
      !f.toLowerCase().startsWith("output/")
  );
  if (!candidates.length) {
    throw new Error(
      "No source DOCX found in workspace root. Set OC318_SOURCE_DOCX to the Hebrew corpus path."
    );
  }
  return path.resolve(candidates[0]);
}

const SEIF_USER_CHECKLIST = `
Halachic translation checklist for this seif (apply in English):
- סימן references: use "chapter" + numeric/shorthand as in the edition (Orach Chayim), not "sign." עיין לעיל: "see above" with chapter and seif, not "look at the above sign."
- סעיף: "seif" (not "section" for Shulchan Aruch paragraphs).
- מלאכה: "melacha" / "melachos" (not craft, trade, or generic "work" for Shabbos labors).
- יד סולדת בו: render as the halachic standard (e.g. yad soledet bo / hand-recoiling heat), not literal "scalded" or "disgusted hand."
- Rosh teivot: expand or render per source map (Rashba, Magen Avraham, או״ח, מו״ש, etc.); do not guess gematria numbers—read the exact letters in the source.
- Do not paraphrase away legal meaning; keep structure and every word of the source.
`.trim();

function parseJsonObjectFromText(text) {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  if (fenced) {
    return JSON.parse(fenced[1]);
  }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("No JSON object found in model response.");
  }
  return JSON.parse(text.slice(first, last + 1));
}

function normalizeSeif(seif, number) {
  const sourceOrder = [
    "Mechaber and Rama",
    "Tur",
    "Magen Avraham",
    "Taz",
    "Biur Halacha",
    "Shulchan Aruch K'pshuto"
  ];

  const out = {
    number,
    sources: {}
  };

  const s = seif && seif.sources ? seif.sources : {};
  const mr = s["Mechaber and Rama"] || {};
  out.sources["Mechaber and Rama"] = {
    hebrew: String(mr.hebrew || "").trim(),
    english: String(mr.english || "").trim()
  };

  for (const name of sourceOrder.slice(1)) {
    if (!s[name]) {
      continue;
    }
    const notes = Array.isArray(s[name].notes) ? s[name].notes : [];
    out.sources[name] = {
      notes: notes
        .map((n) => ({
          hebrew: String((n && n.hebrew) || "").trim(),
          english: String((n && n.english) || "").trim()
        }))
        .filter((n) => n.hebrew && n.english)
    };
  }

  return out;
}

async function fetchSeifTranslation({
  apiKey,
  systemPromptText,
  sourceDocxBase64,
  sourceMediaType,
  seifNumber
}) {
  const body = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPromptText,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: sourceMediaType,
              data: sourceDocxBase64
            }
          },
          {
            type: "text",
            text:
              `Translate seif ${seifNumber} of Orach Chayim siman 318 fully — every source, every note, nothing omitted.\n\n` +
              SEIF_USER_CHECKLIST +
              `\n\nReturn ONLY valid JSON with this exact schema:\n` +
              `{\n` +
              `  "number": ${seifNumber},\n` +
              `  "sources": {\n` +
              `    "Mechaber and Rama": { "hebrew": "...", "english": "..." },\n` +
              `    "Tur": { "notes": [ { "hebrew": "...", "english": "..." } ] },\n` +
              `    "Magen Avraham": { "notes": [ { "hebrew": "...", "english": "..." } ] },\n` +
              `    "Taz": { "notes": [ { "hebrew": "...", "english": "..." } ] },\n` +
              `    "Biur Halacha": { "notes": [ { "hebrew": "...", "english": "..." } ] },\n` +
              `    "Shulchan Aruch K'pshuto": { "notes": [ { "hebrew": "...", "english": "..." } ] }\n` +
              `  }\n` +
              `}\n` +
              `Include only sources that are present in the source document for this seif.`
          }
        ]
      }
    ]
  };

  const maxAttempts = 4;
  let payload;
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(body)
      });

      if (response.status === 429 || response.status >= 500) {
        const errText = await response.text();
        lastErr = new Error(
          `Anthropic request failed (${response.status}): ${errText}`
        );
        const wait = Math.min(60000, 2000 * 2 ** (attempt - 1));
        console.warn(
          `  attempt ${attempt}/${maxAttempts} failed (${response.status}), retry in ${wait}ms...`
        );
        await sleep(wait);
        continue;
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Anthropic request failed (${response.status}): ${errText}`);
      }

      payload = await response.json();
      break;
    } catch (e) {
      const msg = e.message || "";
      if (/Anthropic request failed \((?!429)4\d\d\)/.test(msg)) {
        throw e;
      }
      lastErr = e;
      if (attempt === maxAttempts) {
        throw lastErr;
      }
      const wait = Math.min(30000, 1500 * 2 ** (attempt - 1));
      console.warn(`  attempt ${attempt}/${maxAttempts} error (${e.message}), retry in ${wait}ms...`);
      await sleep(wait);
    }
  }

  if (!payload) {
    throw lastErr || new Error("Anthropic request failed after retries.");
  }

  const parts = Array.isArray(payload.content) ? payload.content : [];
  const text = parts
    .filter((p) => p && p.type === "text")
    .map((p) => p.text || "")
    .join("\n")
    .trim();

  const parsed = parseJsonObjectFromText(text);
  return normalizeSeif(parsed, seifNumber);
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY environment variable.");
  }

  const { text: systemPromptText, loadedFiles, missingFiles } = loadSystemPrompt();
  console.log("Loaded system prompt docs:");
  for (const f of loadedFiles) {
    console.log(`- ${f}`);
  }
  if (missingFiles.length) {
    console.warn("Missing optional docs (skipped):");
    for (const f of missingFiles) {
      console.warn(`- ${f}`);
    }
  }
  console.log(`Total system prompt characters: ${systemPromptText.length}`);

  const sourceDocxPath = findSourceDocx();
  console.log(`Source DOCX: ${sourceDocxPath}`);
  const sourceDocxBase64 = fs.readFileSync(sourceDocxPath).toString("base64");

  const seifim = [];
  for (let n = 1; n <= 19; n += 1) {
    if (n > 1 && API_DELAY_MS > 0) {
      await sleep(API_DELAY_MS);
    }
    console.log(`Translating seif ${n}/19 with ${MODEL} (max_tokens=${MAX_TOKENS})...`);
    const seif = await fetchSeifTranslation({
      apiKey,
      systemPromptText,
      sourceDocxBase64,
      sourceMediaType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      seifNumber: n
    });
    seifim.push(seif);
  }

  const outDataPath = path.resolve("data/oc318.full.anthropic.json");
  fs.writeFileSync(outDataPath, JSON.stringify({ seifim }, null, 2), "utf8");
  console.log(`Wrote ${outDataPath}`);
  // Optional: npm run fix:vocab — applies OC318_Vocabulary_Corrections.md to JSON before rebuilding.

  const docSuffix = process.env.OC318_DOC_SUFFIX || "";
  const suffixArgs = docSuffix ? ` --suffix ${docSuffix}` : "";
  run(
    `node scripts/build-oc318.js --input data/oc318.full.anthropic.json --output output${suffixArgs}`
  );

  const sfx = docSuffix || "";
  const mergedName = sfx ? `OC318_Complete${sfx}.docx` : "OC318_Complete.docx";
  const srcMerged = path.resolve(path.join("output", mergedName));
  const backupName = sfx ? `OC318_Complete2${sfx}.docx` : "OC318_Complete2.doc";
  const dstMerged = path.resolve(path.join("output", backupName));
  if (fs.existsSync(srcMerged)) {
    fs.copyFileSync(srcMerged, dstMerged);
    console.log(`Copied merged output to ${dstMerged}`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
