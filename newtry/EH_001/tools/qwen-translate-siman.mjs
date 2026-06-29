/**
 * qwen-translate-siman.mjs
 * Reads EH001 blocks, detects garbled/word-salad English, sends Hebrew to
 * Qwen 7B for retranslation. One block at a time — no large context.
 *
 * Usage:
 *   node tools/qwen-translate-siman.mjs --siman 61
 *   node tools/qwen-translate-siman.mjs --siman 61 --dry-run
 *   node tools/qwen-translate-siman.mjs --siman 61 --slug beit-shmuel
 *   node tools/qwen-translate-siman.mjs --from 61 --to 100
 *   node tools/qwen-translate-siman.mjs --scan --from 1 --to 178   (report only, no writes)
 *   node tools/qwen-translate-siman.mjs --siman 61 --force          (retranslate ALL blocks)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../output");
const LOG  = path.resolve(__dirname, "../progress.log");
const API  = "http://127.0.0.1:8080/v1/chat/completions";

const SLUG_ORDER = [
  "mechaber","beit-shmuel","turei-zahav","baer-hetev","beer-hagolah",
  "beur-hagra","pitchei-teshuva","rabbi-akiva-eiger","ezer-mikodesh",
  "beit-meir","chokhmat-shlomo"
];

// ── garbage detection ────────────────────────────────────────────────────────
// Hard patterns — always garbage
const HARD_GARBAGE = [
  /Lord.s Prayer/i, /Hashem.s Word/i, /Hashem.s promise/i,
  /Bible says/i, /Bible wrote/i, /United States/i, /\bSaturday\b/,
  /MYMEMORY WARNING/i, /English translation pending/i,
  /^\["/, /The:$/m,
  /helps \/ is effective/i, /does not help \/ is ineffective/i,
  /\/[a-zA-Zא-ת]+\//,   // /word/ editorial markup leaked into English
];

// Word-salad indicators — score-based
const SALAD_TOKENS = [
  /\bwrote\b/g,          // raw "wrote" as verb fragment (not "X wrote that")
  /\bthere is no\b/g,
  /\bit is clear\b/g,
  /\bnevertheless\b/g,
  /\bbehold\b/g,
  /\bfurther\b/g,
  /\bsafek\b/g,          // Hebrew halachic term leaking untranslated
  /(?<!\w)'(?!\w)/g,     // lone apostrophe used as quotation mark artifact
  / " /g,                // lone double-quote as word separator
  /\bfolio\b/g,          // "folio" used as fragment (Daf translation artifact)
  /\bseif "\b/g,         // seif followed by raw quote mark
  /\bsiman "\b/g,
  /\baccording to\b.*\baccording to\b/g,  // repeated fragments
];

function saladScore(text) {
  if (!text || text.length < 5) return 100;
  let score = 0;
  for (const re of SALAD_TOKENS) {
    const m = text.match(re);
    if (m) score += m.length;
  }
  // Penalise very short blocks heavily (truncated MT)
  if (text.length < 30) score += 10;
  // Penalise lack of sentence structure (no period in a long block)
  if (text.length > 100 && !text.includes(".")) score += 5;
  return score;
}

function isGarbage(text) {
  if (!text || text.trim().length < 3) return true;
  if (HARD_GARBAGE.some(re => re.test(text))) return true;
  return saladScore(text) >= 4;  // threshold: 4+ hits = garbled
}

// ── Hebrew /word/ markup fixer ───────────────────────────────────────────────
// Replaces "prev-word /correction/" with "correction" in Hebrew sections
function fixHebrewMarkup(txt) {
  // Pattern: word space /replacement/ → replacement
  // e.g. "לשמוע /לכתוב/" → "לכתוב"
  // e.g. "שעות /שהות/" → "שהות"
  return txt.replace(/\S+ \/([^/\n]+)\//g, '$1');
}

// ── block parser ─────────────────────────────────────────────────────────────
const BLOCK_RE = /(\*{4} EH001 SOURCE BLOCK \*{4}[\s\S]*?\*{4} ENGLISH \*{4}\n)([\s\S]*?)(\n\*{4} END BLOCK \*{4})/g;
const HEB_RE   = /\*{4} HEBREW \*{4}\n([\s\S]*?)\n\*{4} ENGLISH \*{4}/;

function parseBlocks(txt) {
  const blocks = [];
  let m;
  BLOCK_RE.lastIndex = 0;
  while ((m = BLOCK_RE.exec(txt)) !== null) {
    blocks.push({ header: m[1], english: m[2], footer: m[3], index: m.index, full: m[0] });
  }
  return blocks;
}

function extractHebrew(header) {
  const m = header.match(HEB_RE);
  return m ? m[1].trim() : "";
}

function extractSlug(header) {
  const m = header.match(/slug:\s*(\S+)/);
  return m ? m[1] : "";
}

// ── args ─────────────────────────────────────────────────────────────────────
const args   = process.argv.slice(2);
const get    = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i+1] : null; };
const has    = (f) => args.includes(f);

const simanArg = get("--siman");
const fromArg  = get("--from");
const toArg    = get("--to");
const slugArg  = get("--slug");
const dryRun   = has("--dry-run");
const force    = has("--force");
const scanOnly = has("--scan");

let simanRange = [];
if (simanArg)              simanRange = [parseInt(simanArg)];
else if (fromArg && toArg) for (let i = parseInt(fromArg); i <= parseInt(toArg); i++) simanRange.push(i);
else { console.error("Usage: --siman N | --from N --to M | --scan --from N --to M"); process.exit(1); }

// ── Qwen translation ──────────────────────────────────────────────────────────
const SYSTEM = `You are a halachic translator (Hebrew→English). Translate the passage accurately and completely for a learned English reader.
Rules:
- Use: Hashem, Shabbat, onah, get, ketubah, yibbum, chalitzah, erusin, kiddushin, mamzer, seif, siman
- {Rama: ...} for הגה glosses
- No added commentary. No Hebrew letters in output.
- Output plain flowing English only.`;

async function translate(hebrew, slug, retries = 3) {
  const userMsg = `Commentary type: ${slug}\n\nTranslate:\n${hebrew}`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer local" },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system",  content: SYSTEM },
            { role: "user",    content: userMsg }
          ],
          temperature: 0.15,
          max_tokens: 800,
          stream: false
        }),
        signal: AbortSignal.timeout(90000)
      });
      if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0,200)}`);
      const j = await res.json();
      return (j.choices?.[0]?.message?.content || "").trim();
    } catch(e) {
      if (attempt < retries) {
        process.stdout.write(`[retry ${attempt}] `);
        await new Promise(r => setTimeout(r, 3000 * attempt));
      } else throw e;
    }
  }
}

// ── main ──────────────────────────────────────────────────────────────────────
let totalFixed = 0, totalSkipped = 0, totalErrors = 0;
const badSimanim = [];

for (const siman of simanRange) {
  const pad = String(siman).padStart(3, "0");
  const dir = path.join(ROOT, `siman_${pad}`);
  if (!fs.existsSync(dir)) { if (!scanOnly) console.log(`[SKIP] siman_${pad} — no folder`); continue; }

  const logContent = fs.existsSync(LOG) ? fs.readFileSync(LOG, "utf8") : "";
  if (!force && !scanOnly && logContent.includes(`siman_${pad} qwen-CLEAN`)) {
    console.log(`[SKIP] siman_${pad} — already qwen-CLEAN`);
    continue;
  }

  const slugs = SLUG_ORDER.filter(s => {
    if (slugArg && s !== slugArg) return false;
    return fs.existsSync(path.join(dir, s));
  });

  let simanDirty = 0, simanFixed = 0;

  for (const slug of slugs) {
    const fpath = path.join(dir, slug, "part-001.txt");
    if (!fs.existsSync(fpath)) continue;

    let txt    = fs.readFileSync(fpath, "utf8").replace(/\r\n/g, "\n");

    // Fix Hebrew /markup/ first
    const fixedHeb = fixHebrewMarkup(txt);
    if (fixedHeb !== txt && !dryRun && !scanOnly) {
      fs.writeFileSync(fpath, fixedHeb, "utf8");
      txt = fixedHeb;
    }

    const blocks = parseBlocks(txt);
    const dirty  = blocks.filter(b => force || isGarbage(b.english));
    simanDirty += dirty.length;

    if (scanOnly) {
      if (dirty.length > 0) process.stdout.write(`  ${slug}: ${dirty.length}/${blocks.length} dirty\n`);
      totalSkipped += blocks.length - dirty.length;
      continue;
    }

    if (dirty.length === 0) { process.stdout.write("."); totalSkipped += blocks.length; continue; }

    console.log(`\n  [${pad}] ${slug} — ${dirty.length}/${blocks.length} blocks to fix`);

    for (let i = 0; i < dirty.length; i++) {
      const b      = dirty[i];
      const hebrew = extractHebrew(b.header);
      if (!hebrew) { totalErrors++; continue; }

      process.stdout.write(`    [${i+1}/${dirty.length}] `);
      try {
        const eng = await translate(hebrew, slug);
        if (!eng || eng.length < 5 || isGarbage(eng)) {
          console.log(`bad output (score ${saladScore(eng)}) — skip`);
          totalErrors++;
          continue;
        }
        console.log(`✓`);
        if (!dryRun) {
          txt = txt.replace(b.full, b.header + eng + b.footer);
          simanFixed++;
          totalFixed++;
        }
      } catch(e) {
        console.log(`ERROR: ${e.message}`);
        totalErrors++;
      }
    }

    if (!dryRun && simanFixed > 0) fs.writeFileSync(fpath, txt, "utf8");
  }

  if (scanOnly) {
    if (simanDirty > 0) { console.log(`siman_${pad}: ${simanDirty} dirty blocks`); badSimanim.push(siman); }
  } else {
    if (simanFixed > 0 && !dryRun && !slugArg)
      fs.appendFileSync(LOG, `siman_${pad} qwen-translated (${simanFixed} blocks)\n`);
  }
}

console.log(`\n══ ${scanOnly ? "SCAN" : dryRun ? "DRY RUN" : "DONE"} ══`);
if (scanOnly) {
  console.log(`Simanim with dirty blocks: ${badSimanim.length}`);
  if (badSimanim.length) console.log(`  ${badSimanim.join(", ")}`);
} else {
  console.log(`Fixed: ${totalFixed}  Skipped: ${totalSkipped}  Errors: ${totalErrors}`);
}
