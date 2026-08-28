/**
 * Harden GPT kit prompts with explicit FAILURE RULES, sync JSON meta, rebuild zips.
 *
 *   node _harden_gpt_kit_prompts.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const ZIPS_DIR = path.join(AUDIT, "zips");
const LIVE = path.resolve(AUDIT, "../../../..");
const DICT_SRC = path.join(LIVE, "full_dictionary (1).md");

const UNIVERSAL = `FAILURE RULES — DO NOT (causes REJECT/HOLD in eval pipeline)

UNIVERSAL — any EN segment text:
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN output.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholder text in EN ("TBD", "translation pending", etc.).
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.

JSON OUTPUT (mandatory):
- Return en_segments[] as the primary deliverable; segments[] with he+en is optional for audit alignment.
- Valid JSON only — escape every " as \\" inside strings; use straight ASCII quotes only (no smart quotes).
- Prefer returning en_segments[] without embedding he in strings when possible.
- en_segments.length MUST equal heSegs for every case.`;

const SPLIT_RULES = `SPLIT_EXISTING_EN / RESEGMENT (this kit):
- When source is split_existing_en: preserve existing EN wording VERBATIM — cut/join ONLY at boundaries.
- Do NOT normalize citations (e.g. "32a"→"daf 32"), synonym-swap ("halachic authorities"→"poskim"), or reword "where possible".
- Do NOT re-translate from Hebrew when the EN blob already contains the text for that slot.
- Do NOT paraphrase, summarize, compress, or "improve" prose on preserved splits — change ONLY by splitting/joining.
- Eval REJECTs truncated segments (broken JSON quotes) and HOLDs content_drift / unjustified fresh_translate.`;

const FRESH_RULES = `FRESH_TRANSLATE (this kit):
- Complete translation of every Hebrew clause; no omissions or paraphrasing away content.
- Use full_dictionary.md for halachic terms and commentator names; expand all abbreviations; Arabic numerals for numbers.
- {Rama: ...} format for Rama glosses; no additions beyond source.
- Do NOT preserve garbled MT from unreliable EN blob when fresh translate is required.
- Eval REJECTs empty/truncated EN slots and HOLDs short_en / kit_he_truncated flags.`;

const FRESH_GAP_RULES = `FRESH_TRANSLATE (gap slots only):
- Complete translation of every Hebrew clause in gap slots; use full_dictionary.md; expand abbreviations; Arabic numerals.
- {Rama: ...} format for Rama glosses; no additions beyond source.
- Apply fresh_translate ONLY where EN blob lacks material — never on slots covered by existing EN text.`;

const MERGE_RULES = `MERGE_GROUPS (only when explicitly allowed):
- merge_groups ONLY for true HE continuation (same lemma body split across <br>); never glue distinct notes or Likut blocks.
- Do NOT output merge_groups that reduce heSegs on Likut cases — split EN instead.`;

const GLUED_RULES = `REWRITE_EN_BY_HE_SLOT (this kit):
- corrected_en[i] must be a complete fresh translation of he_segments[i]; one segment per HE slot.
- Use full_dictionary.md for halachic terms; expand abbreviations; Arabic numerals; {Rama: ...} for Rama glosses.
- You may use paired EN stubs as draft material but output clean halachic English — no MT garbage, no Hebrew in EN.
- Do NOT invent HE content; do NOT drop a HE slot; do NOT fabricate EN on needs_human cases.`;

const KITS = [
  {
    md: "EN_TRUNC_MODERATE_RESEGMENT_KIT.md",
    kit: "EN_TRUNC_MODERATE_RESEGMENT_KIT",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.md",
    kit: "EN_TRUNC_EDITORIAL_RETRANSLATE_KIT",
    failureBlock: [UNIVERSAL, FRESH_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_WAVE2_HELD_KIT.md",
    kit: "HE_HAS_MORE_WAVE2_HELD_KIT",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_LIKUT_SPLIT_KIT.md",
    kit: "HE_HAS_MORE_LIKUT_SPLIT_KIT",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_EDITORIAL_KIT.md",
    kit: "HE_HAS_MORE_EDITORIAL_KIT",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES, MERGE_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "EN_MISSING_2_HELD_KIT.md",
    kit: "EN_MISSING_2_HELD_KIT",
    failureBlock: [UNIVERSAL, FRESH_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "GLUED_STILL_OPEN_9_KIT.md",
    kit: "GLUED_STILL_OPEN_9_KIT",
    failureBlock: [UNIVERSAL, GLUED_RULES].join("\n\n"),
    insertBefore: "OUTPUT JSON array only",
    jsonSingle: "GLUED_STILL_OPEN_9_KIT.json",
    promptField: "prompt",
  },
  // --- Rescan _REMAINING kits (2026-08-28) ---
  {
    md: "EN_MISSING_2_REMAINING.md",
    kit: "EN_MISSING_2_REMAINING",
    failureBlock: [UNIVERSAL, FRESH_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "EN_HAS_MORE_REMAINING.md",
    kit: "EN_HAS_MORE_REMAINING",
    failureBlock: [UNIVERSAL, GLUED_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "EN_TRUNC_MODERATE_REMAINING.md",
    kit: "EN_TRUNC_MODERATE_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "EN_TRUNC_EDITORIAL_REMAINING.md",
    kit: "EN_TRUNC_EDITORIAL_REMAINING",
    failureBlock: [UNIVERSAL, FRESH_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "BEER_DEGREE_SPLIT_REMAINING.md",
    kit: "BEER_DEGREE_SPLIT_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "EN_TRUNC_REMAINING.md",
    kit: "EN_TRUNC_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_LIKUT_REMAINING.md",
    kit: "HE_HAS_MORE_LIKUT_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_EDITORIAL_REMAINING.md",
    kit: "HE_HAS_MORE_EDITORIAL_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES, MERGE_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_LIKUT_MERGED_REMAINING.md",
    kit: "HE_HAS_MORE_LIKUT_MERGED_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
  {
    md: "HE_HAS_MORE_OFFSET_REMAINING.md",
    kit: "HE_HAS_MORE_OFFSET_REMAINING",
    failureBlock: [UNIVERSAL, SPLIT_RULES, FRESH_GAP_RULES, MERGE_RULES].join("\n\n"),
    insertBefore: "OUTPUT — JSON array only",
  },
];

function sha256File(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

function extractPromptFromMd(mdText) {
  const m = mdText.match(/```\n([\s\S]*?)\n```/);
  return m ? m[1] : null;
}

function replacePromptInMd(mdText, newPrompt) {
  return mdText.replace(/```\n[\s\S]*?\n```/, `\`\`\`\n${newPrompt}\n\`\`\``);
}

function stripOldFailureBlock(prompt) {
  return prompt.replace(
    /\n*FAILURE RULES — DO NOT[\s\S]*?(?=\n(?:OUTPUT|CONSTRAINTS|Rules:))/,
    "\n"
  );
}

function tightenPermissiveLanguage(prompt) {
  return prompt
    .replace(
      /Preserve exact wording where possible\./g,
      "Preserve exact wording VERBATIM — cut/join only; no rewording."
    )
    .replace(
      /split existing EN where possible/gi,
      "split existing EN verbatim where the blob contains the text"
    )
    .replace(
      /Split EN where possible/g,
      "Split EN verbatim where the blob contains the text"
    )
    .replace(
      /translate from HE only where EN lacks material\./g,
      "fresh_translate from HE only where EN blob clearly lacks material for that slot — never re-translate covered text."
    );
}

function insertFailureBlock(prompt, block, insertBefore) {
  let p = tightenPermissiveLanguage(stripOldFailureBlock(prompt));
  const idx = p.indexOf(insertBefore);
  if (idx === -1) throw new Error(`insertBefore not found: ${insertBefore}`);
  const before = p.slice(0, idx).trimEnd();
  const after = p.slice(idx);
  if (before.includes("FAILURE RULES — DO NOT")) return p;
  return `${before}\n\n${block}\n\n${after}`;
}

function syncJsonMeta(filePath, promptLines, promptField = null) {
  if (!fs.existsSync(filePath)) return false;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
  if (!data.meta) return false;
  data.meta.instructions_for_reviewer = promptLines;
  if (promptField) data.meta[promptField] = promptLines.join("\n");
  if (data.meta.prompt && !promptField) data.meta.prompt = promptLines.join("\n");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
  return true;
}

function listKitPartFiles(kit) {
  const files = [];
  for (const name of fs.readdirSync(AUDIT)) {
    if (name.startsWith(`${kit}_part`) && name.endsWith(".json")) files.push(name);
  }
  files.sort();
  return files;
}

function zipContents(def) {
  const files = [def.md];
  if (def.jsonSingle) {
    files.push(def.jsonSingle);
  } else {
    files.push(...listKitPartFiles(def.kit));
  }
  files.push("full_dictionary.md");
  return files;
}

function rebuildZip(zipName, files) {
  const zipPath = path.join(ZIPS_DIR, zipName);
  const staging = path.join(ZIPS_DIR, `.staging_${zipName}`);
  if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(staging, { recursive: true });

  for (const f of files) {
    const src = f === "full_dictionary.md" ? DICT_SRC : path.join(AUDIT, f);
    if (!fs.existsSync(src)) throw new Error(`missing for zip: ${src}`);
    fs.copyFileSync(src, path.join(staging, f));
  }

  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  // PowerShell Compress-Archive (Windows)
  const ps = `Compress-Archive -Path '${staging.replace(/'/g, "''")}\\*' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`;
  execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: "pipe" });
  fs.rmSync(staging, { recursive: true, force: true });
  return { zipPath, bytes: fs.statSync(zipPath).size, files };
}

// --- main ---
if (!fs.existsSync(DICT_SRC)) {
  console.error(`[ERROR] Dictionary not found: ${DICT_SRC}`);
  process.exit(1);
}
fs.mkdirSync(ZIPS_DIR, { recursive: true });

const manifestRows = [];
const changed = [];

for (const def of KITS) {
  const mdPath = path.join(AUDIT, def.md);
  let mdText = fs.readFileSync(mdPath, "utf8");
  let prompt = extractPromptFromMd(mdText);
  if (!prompt) throw new Error(`No prompt block in ${def.md}`);

  prompt = insertFailureBlock(prompt, def.failureBlock, def.insertBefore);
  mdText = replacePromptInMd(mdText, prompt);
  fs.writeFileSync(mdPath, mdText, "utf8");
  changed.push(def.md);

  const promptLines = prompt.split("\n");
  const jsonFiles = def.jsonSingle
    ? [def.jsonSingle]
    : [path.basename(`${def.kit}.json`), ...listKitPartFiles(def.kit)];

  for (const jf of jsonFiles) {
    const jp = path.join(AUDIT, jf);
    if (syncJsonMeta(jp, promptLines, def.promptField ?? null)) changed.push(jf);
  }

  const zipName = `${def.kit}.zip`;
  const contents = zipContents(def);
  const { bytes, files } = rebuildZip(zipName, contents);
  manifestRows.push({ zip: zipName, bytes, contents: files });
  console.log(`[zip] ${zipName} → ${bytes} bytes (${files.length} files)`);
}

const now = new Date().toISOString();
const manifest = `# GPT Kit Zips Manifest

Generated: ${now}
Note: prompt hardened 2026-08-28

| Zip | Size (bytes) | Contents |
|-----|-------------:|----------|
${manifestRows
  .map((r) => `| \`${r.zip}\` | ${r.bytes} | ${r.contents.join(", ")} |`)
  .join("\n")}
`;

const manifestPath = path.join(ZIPS_DIR, "ZIPS_MANIFEST.md");
fs.writeFileSync(manifestPath, manifest, "utf8");
changed.push("zips/ZIPS_MANIFEST.md", ...manifestRows.map((r) => `zips/${r.zip}`));

console.log("\n[done] Files changed:");
[...new Set(changed)].sort().forEach((f) => console.log(`  ${f}`));
