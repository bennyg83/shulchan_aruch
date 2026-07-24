/**
 * Build GPT kit for remaining EH1 corpus cleanup flags (Copy 2).
 * Covers: Psalms, Passover, the Lord, the Bible, baptism, GARBAGE_RE,
 * HebrewLeak, severe foreign scrap (excl. ḥallah→allah FP).
 * Excludes: em-dash noise, Muslims-only REVIEW, challah substring FPs.
 *
 *   node build_eh1_cleanup_kit.mjs
 *   node build_eh1_cleanup_kit.mjs --max-parts 20
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../OC_Mobile/oc318-mobile-reader/public/corpus/eh1"
);
const EH_OUT = path.resolve(__dirname, "../../EH_001/output");
const KIT = path.join(__dirname, "gpt_kit_eh1_cleanup");
const TOOLS = path.resolve(__dirname, "../../OC_Mobile/oc318-mobile-reader/tools");
const DICT_CANDIDATES = [
  path.resolve(__dirname, "../audit/full_dictionary.md"),
  path.resolve(__dirname, "../../../full_dictionary (1).md"),
  path.resolve(__dirname, "../../../full_dictionary.md"),
];

const { GARBAGE_RE, hebrewLeakRuns, stripTags } = await import(
  pathToFileURL(path.join(TOOLS, "provenance-config.mjs")).href
);

const maxParts = (() => {
  const i = process.argv.indexOf("--max-parts");
  return i >= 0 ? Number(process.argv[i + 1]) || 20 : 20;
})();

/** Slugs whose corpus EN is authoritative / skip TXT sync-publish */
const SKIP = new Set([
  "rabbi-akiva-eiger",
  "chokhmat-shlomo",
]);

const LORD = /\bthe Lord\b/i;
const BIBLE = /\bthe Bible\b/i;
const PSALMS = /\bPsalms?\b/i;
const PASSOVER = /\bPassover\b/i;
const BAPTISM = /\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b/i;
const YAHWEH = /\bYahweh\b/i;
const SEVERE =
  /\bYahweh\b|\bthe Bible\b|\bchurch(?:es)?\b|mosque|\bchrist(?:ian|ianity)?\b|\bislam(?:ic)?\b|gospel|crucifix|vatican|trinity|koran|qur['’]?an|\ballah\b|muhammad|\bjesus\b|cathedral|buddh\w*|\bhindu\w*|\bkrishna\b|\bthe pope\b|\bmecca\b|ramadan|\bimams?\b|minaret|caliph/gi;

function pad3(n) {
  return String(n).padStart(3, "0");
}
function plain(h) {
  return stripTags(String(h || ""))
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function isChallahFp(term, text, index) {
  if (!/allah/i.test(term)) return false;
  const ctx = text.slice(Math.max(0, index - 40), index + 50);
  return /[HhḤḥ]allah|challah|ḥallah/i.test(ctx);
}

function collectFlags(text) {
  const flags = [];
  const add = (label, re) => {
    const m = text.match(re);
    if (m) flags.push({ label, term: m[0] });
  };
  add("the_Lord", LORD);
  add("Yahweh", YAHWEH);
  add("the_Bible", BIBLE);
  add("Psalms", PSALMS);
  add("Passover", PASSOVER);
  add("baptism", BAPTISM);

  const g = text.match(GARBAGE_RE);
  if (g && !isChallahFp(g[0], text, g.index)) {
    flags.push({ label: "garbage", term: g[0] });
  }

  SEVERE.lastIndex = 0;
  let sm;
  while ((sm = SEVERE.exec(text)) !== null) {
    if (isChallahFp(sm[0], text, sm.index)) continue;
    if (!flags.some((f) => f.label === "severe" && f.term.toLowerCase() === sm[0].toLowerCase())) {
      flags.push({ label: "severe", term: sm[0] });
    }
  }

  const leaks = hebrewLeakRuns(text);
  if (leaks.length) flags.push({ label: "hebrewLeak", term: leaks[0] });

  return flags;
}

function citationNums(he) {
  const LETTERS = {
    א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
    י: 10, כ: 20, ל: 30, מ: 40, נ: 50, ס: 60, ע: 70, פ: 80, צ: 90,
    ק: 100, ר: 200, ש: 300, ת: 400, ך: 20, ם: 40, ן: 50, ף: 80, ץ: 90,
  };
  const out = new Set();
  const re = /סי(?:מן|׳|'|')?\s*([א-ת״"׳'\u05F3]+)/g;
  let m;
  const t = String(he || "");
  while ((m = re.exec(t))) {
    let n = 0;
    for (const ch of m[1].replace(/[״"']/g, "")) if (LETTERS[ch]) n += LETTERS[ch];
    if (n >= 1 && n <= 999) out.add(n);
  }
  return [...out].sort((a, b) => a - b);
}

function getSourceEnglish(siman, seif, slug) {
  const dir = path.join(EH_OUT, `siman_${pad3(siman)}`, slug);
  if (!fs.existsSync(dir)) return { ok: false };
  let seifText = "";
  for (const fname of fs.readdirSync(dir).filter((n) => /^part-\d+\.txt$/i.test(n)).sort()) {
    const text = fs.readFileSync(path.join(dir, fname), "utf8");
    for (const part of text.split(/(?=\*{4}\s)/)) {
      const sm = part.match(/^seif:\s*(\d+)/m);
      const em = part.match(/\*{4}\s*ENGLISH\s*\*{4}([\s\S]*?)\*{4}\s*END BLOCK\s*\*{4}/);
      if (sm && em && Number(sm[1]) === Number(seif)) seifText += em[1].trim() + "\n";
    }
  }
  if (seifText.trim()) return { ok: true, text: seifText };
  return { ok: false };
}

function findSourceTxtPath(siman, slug) {
  const dir = path.join(EH_OUT, `siman_${pad3(siman)}`, slug);
  if (!fs.existsSync(dir)) return "";
  const parts = fs.readdirSync(dir).filter((n) => /^part-\d+\.txt$/i.test(n)).sort();
  return parts.length ? path.resolve(dir, parts[0]) : path.resolve(dir);
}

function corpusEnPath(siman, seif, slug) {
  return path.resolve(CORPUS, `siman${Number(siman)}`, `seif-${pad3(seif)}`, slug, "en.html");
}
function corpusHePath(siman, seif, slug) {
  return path.resolve(CORPUS, `siman${Number(siman)}`, `seif-${pad3(seif)}`, slug, "he.html");
}

const hits = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      walk(p);
      continue;
    }
    if (e.name !== "en.html") continue;
    const norm = p.split(path.sep).join("/");
    const mPath = norm.match(/siman(\d+)\/seif-(\d+)\/([^/]+)\/en\.html$/i);
    if (!mPath) continue;
    const siman = Number(mPath[1]);
    const seif = Number(mPath[2]);
    const slug = mPath[3];
    const enRaw = fs.readFileSync(p, "utf8");
    const pl = plain(enRaw);
    if (!pl) continue;
    const flags = collectFlags(pl);
    if (!flags.length) continue;
    const actionable = flags.filter((f) => {
      if (f.label === "garbage" && /muslims?/i.test(f.term)) return false;
      return true;
    });
    if (!actionable.length) continue;

    const heP = corpusHePath(siman, seif, slug);
    const heRaw = fs.existsSync(heP) ? fs.readFileSync(heP, "utf8") : "";
    hits.push({
      siman,
      seif,
      slug,
      flags: actionable,
      bad_terms: actionable.map((f) => `${f.label}:${f.term}`).join("; "),
      en_current: enRaw,
      hebrew: heRaw,
      corpus_en_path: corpusEnPath(siman, seif, slug),
      corpus_he_path: fs.existsSync(heP) ? heP : "",
      source_txt_path: findSourceTxtPath(siman, slug),
    });
  }
}

if (!fs.existsSync(CORPUS)) {
  console.error("corpus missing", CORPUS);
  process.exit(1);
}
console.log("scanning", CORPUS);
walk(CORPUS);
hits.sort((a, b) => a.siman - b.siman || a.seif - b.seif || a.slug.localeCompare(b.slug));

const syncRows = [];
const kitParts = [];
const flagHist = {};

for (const h of hits) {
  for (const f of h.flags) flagHist[f.label] = (flagHist[f.label] || 0) + 1;
  const src = getSourceEnglish(h.siman, h.seif, h.slug);
  let source_status = "no_source";
  if (src.ok) {
    source_status = collectFlags(plain(src.text)).filter((f) => {
      if (f.label === "garbage" && /muslims?/i.test(f.term)) return false;
      return true;
    }).length
      ? "source_still_dirty"
      : "source_clean";
  }

  if (SKIP.has(h.slug) && source_status === "source_clean") {
    syncRows.push({
      commentator: h.slug,
      siman: h.siman,
      seif: h.seif,
      bad: h.bad_terms,
      corpus_en_path: h.corpus_en_path,
      source_txt_path: h.source_txt_path,
    });
    continue;
  }

  kitParts.push({
    ...h,
    source_status,
    skip_publish: SKIP.has(h.slug),
    citation_numbers_expected: citationNums(h.hebrew),
  });
}

fs.rmSync(KIT, { recursive: true, force: true });
fs.mkdirSync(path.join(KIT, "worksheets"), { recursive: true });
fs.mkdirSync(path.join(KIT, "replies"), { recursive: true });
fs.mkdirSync(path.join(KIT, "example"), { recursive: true });

const bySlug = new Map();
for (const p of kitParts) {
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, []);
  bySlug.get(p.slug).push(p);
}

const indexFiles = [];
let partCount = 0;

for (const [slug, parts] of [...bySlug.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  parts.sort((a, b) => a.siman - b.siman || a.seif - b.seif);
  for (let i = 0; i < parts.length; i += maxParts) {
    const chunk = parts.slice(i, i + maxParts);
    const label =
      parts.length > maxParts
        ? `_p${String(Math.floor(i / maxParts) + 1).padStart(2, "0")}`
        : "";
    const name = `eh1_cleanup_${slug}${label}.json`;
    const wsParts = chunk.map((p, idx) => ({
      part_index: idx,
      volume: "eh1",
      slug,
      siman: p.siman,
      seif: p.seif,
      seg: 0,
      key: `eh1|${p.siman}|${p.seif}|${slug}`,
      marker: "_",
      bad_terms: p.bad_terms,
      flags: p.flags,
      source_status: p.source_status,
      skip_publish: p.skip_publish,
      apply_target: "corpus_en",
      corpus_en_path: p.corpus_en_path,
      corpus_he_path: p.corpus_he_path,
      source_txt_path: p.source_txt_path || "",
      citation_numbers_expected: p.citation_numbers_expected,
      hebrew: p.hebrew,
      en_current: p.en_current,
      new_en: "",
    }));
    partCount += wsParts.length;
    const ws = {
      volume: "eh1",
      kit: "cleanup",
      slug,
      chunk: label || "all",
      note: "Retranslate from hebrew. Clear all residual EH flags (see TASK.md). Echo ALL identity fields.",
      emitted_at: new Date().toISOString(),
      parts: wsParts,
    };
    fs.writeFileSync(path.join(KIT, "worksheets", name), JSON.stringify(ws, null, 2), "utf8");
    indexFiles.push({
      slug,
      worksheet: name,
      parts: wsParts.length,
      siman_from: chunk[0].siman,
      siman_to: chunk[chunk.length - 1].siman,
    });
  }
}

const task = `# EH1 residual cleanup kit

## Scope
Remaining quality flags in Copy (2) \`public/corpus/eh1\` after the 2026-07-24 in-depth scan.

**In this kit:** Psalms · Passover · the Lord · the Bible · baptism/baptize · GARBAGE_RE · HebrewLeak · severe foreign scrap  
**Out of scope:** em-dash style noise · ḥallah→allah FP · accurate Muslims/ישמעאלים

Skip-publish rows with clean TXT → \`SYNC_FROM_SOURCE.md\`.

## Your job
1. Open each \`worksheets/eh1_cleanup_*.json\`.
2. For **every** part, translate \`hebrew\` → clean Artscroll Orthodox English in \`new_en\`.
3. Treat \`en_current\` as a **negative example**. Prefer full retranslate from Hebrew.
4. Write \`replies/<exact-worksheet-basename>.reply.json\`.
5. Resume-safe: skip worksheets that already have a matching reply.

## CRITICAL vocabulary rules

### Register (zero tolerance in \`new_en\`)
| Forbidden | Prefer |
|-----------|--------|
| the Lord / The Lord | **Hashem** / God (divine); master/landlord if clearly secular אדון/בעל |
| Yahweh | Hashem |
| the Bible | Tanach / Scripture / Torah / Mikra |
| Psalm / Psalms | **Tehillim** |
| Passover | **Pesach** |
| baptism / baptize / baptized | **tevilah** / **immerse** / **mikvah** |

### Garbage / contamination
Never: crucifix, saint (as Christian), Islamic/Islam/Koran/Qur'an, Hashem's Word, Hashem's people, apostle(s)→shaliach/agent, Churchill, New Testament, church, "the sign N", etc.

### HebrewLeak
No Hebrew letter runs in English. Expand mnemonics to Latin if needed. Fully translate soup blocks.

### Also
- No em-dash (—), en-dash (–), or \`--\`
- Complete and faithful; expand abbreviations; translate Aramaic
- Honor \`citation_numbers_expected\`
- Preserve \`<b>…</b>\` lemmas (English lemma text)
- Clean UTF-8 JSON, no BOM

## CRITICAL — reply identity
Every reply part **must** echo verbatim:
- \`part_index\`, \`volume\` (\`"eh1"\`), \`slug\`, \`siman\`, \`seif\`, \`seg\`
- \`corpus_en_path\` (**non-empty** absolute path)
- \`decision\` / \`action\`: both \`"retranslate"\`
- \`new_en\`: non-empty full translation

Include every part. See \`OUTPUT-SCHEMA.md\`.

## Self-check
Grep \`new_en\` for: \`the Lord|Passover|Psalms?|baptis|baptiz|the Bible|crucifix|Islamic|Hashem's (Word|people)\` → **zero**.
`;

const schema = `# Output schema — EH1 cleanup replies

## File naming
\`worksheets/eh1_cleanup_<slug>.json\`
→ \`replies/eh1_cleanup_<slug>.reply.json\`

Chunked worksheets keep the \`_pNN\` suffix in the reply name.

## Reply JSON

\`\`\`json
{
  "volume": "eh1",
  "kit": "cleanup",
  "slug": "pitchei-teshuva",
  "parts": [
    {
      "part_index": 0,
      "volume": "eh1",
      "slug": "pitchei-teshuva",
      "siman": 17,
      "seif": 1,
      "seg": 0,
      "decision": "retranslate",
      "action": "retranslate",
      "corpus_en_path": "C:\\\\Users\\\\binya\\\\Documents\\\\shulchan-aruch-clean - Copy (2)\\\\newtry\\\\OC_Mobile\\\\oc318-mobile-reader\\\\public\\\\corpus\\\\eh1\\\\siman17\\\\seif-001\\\\pitchei-teshuva\\\\en.html",
      "new_en": "<b>Lemma.</b> Full faithful translation…"
    }
  ]
}
\`\`\`

## Hard requirements
| Field | Rule |
|-------|------|
| \`parts.length\` | = worksheet |
| identity fields | Exact copy |
| \`corpus_en_path\` | Non-empty absolute |
| \`new_en\` | Non-empty; no residual flags |

### Forbidden
Empty path · partial replies · markdown fences · Passover/Psalms/the Lord/baptism/the Bible/crucifix/Islamic in \`new_en\`
`;

const readme = `# EH1 GPT kit — residual cleanup

| Path | Purpose |
|------|---------|
| \`TASK.md\` | Register + garbage + leak rules |
| \`OUTPUT-SCHEMA.md\` | Reply contract |
| \`SYNC_FROM_SOURCE.md\` | Clean TXT → corpus |
| \`INDEX.json\` | Counts |
| \`worksheets/\` | Work units |
| \`replies/\` | Drop replies here |

## Operator apply (Copy 2)
\`\`\`bash
node apply_eh1_cleanup_replies.mjs --replies <unzipped>/replies
cd ../OC_Mobile/oc318-mobile-reader
node scripts/bundle-corpus.mjs --volume eh1
\`\`\`

Rebuild: \`node build_eh1_cleanup_kit.mjs\`
`;

let syncMd = `# Sync from source (no GPT)

Skip-publish corpus still flagged, but source TXT English is clean.

| commentator | siman | seif | bad | corpus_en_path | source_txt_path |
|-------------|------:|-----:|-----|----------------|-----------------|
`;
for (const s of syncRows) {
  syncMd += `| ${s.commentator} | ${s.siman} | ${s.seif} | ${s.bad} | \`${s.corpus_en_path}\` | \`${s.source_txt_path}\` |\n`;
}
if (!syncRows.length) syncMd += `\n_(none)_\n`;

fs.writeFileSync(path.join(KIT, "TASK.md"), task);
fs.writeFileSync(path.join(KIT, "OUTPUT-SCHEMA.md"), schema);
fs.writeFileSync(path.join(KIT, "README.md"), readme);
fs.writeFileSync(path.join(KIT, "SYNC_FROM_SOURCE.md"), syncMd);
fs.writeFileSync(
  path.join(KIT, "INDEX.json"),
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      volume: "eh1",
      kit: "cleanup",
      worksheets: indexFiles.length,
      parts_for_gpt: partCount,
      sync_from_source: syncRows.length,
      flag_histogram: flagHist,
      max_parts_per_worksheet: maxParts,
      files: indexFiles,
      sync_rows: syncRows,
    },
    null,
    2
  )
);

for (const d of DICT_CANDIDATES) {
  if (fs.existsSync(d)) {
    fs.copyFileSync(d, path.join(KIT, "full_dictionary.md"));
    break;
  }
}

if (indexFiles.length) {
  const exWs = JSON.parse(
    fs.readFileSync(path.join(KIT, "worksheets", indexFiles[0].worksheet), "utf8")
  );
  const ep = exWs.parts[0];
  fs.writeFileSync(
    path.join(KIT, "example", "example.reply.json"),
    JSON.stringify(
      {
        volume: "eh1",
        kit: "cleanup",
        slug: exWs.slug,
        parts: [
          {
            part_index: ep.part_index,
            volume: "eh1",
            slug: ep.slug,
            siman: ep.siman,
            seif: ep.seif,
            seg: 0,
            decision: "retranslate",
            action: "retranslate",
            corpus_en_path: ep.corpus_en_path,
            new_en:
              "(full translation — Tehillim/Pesach/Hashem/tevilah; never Passover/Psalms/the Lord/baptism/crucifix/Islamic; never leave corpus_en_path empty)",
          },
        ],
      },
      null,
      2
    )
  );
}

console.log("KIT", KIT);
console.log("hits scanned into kit parts", kitParts.length);
console.log("worksheets", indexFiles.length);
console.log("gpt parts", partCount);
console.log("sync-from-source", syncRows.length);
console.log("flag hist", flagHist);
for (const f of indexFiles) {
  console.log(`  ${f.worksheet}  parts=${f.parts}  simanim ${f.siman_from}-${f.siman_to}`);
}
