/**
 * GPT kits for dirty CM1 corpus en.html (Hashem's Word / Quran / Lord / etc.).
 *
 *   node build_cm1_corpus_mt_kits.mjs
 *   node build_cm1_corpus_mt_kits.mjs --only beer-hagolah --max-kb 50 --max-parts 15
 *
 * Output: gpt_kits_cm1_corpus_mt/<slug>/gpt_kit_cm1_corpusmt_<slug>_kNNN_sAAA-BBB.zip
 * Apply:  node apply_cm1_corpus_mt_replies.mjs --replies <dir> --worksheets <kit/worksheets>
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../OC_Mobile/oc318-mobile-reader/public/corpus/cm1"
);
const KIT_ROOT = path.join(__dirname, "gpt_kits_cm1_corpus_mt");
const DICT_CANDIDATES = [
  path.join(__dirname, "gpt_kits_cm1/beer-hagolah/full_dictionary.md"),
  path.resolve(__dirname, "../../../full_dictionary (1).md"),
  path.resolve(__dirname, "../../../full_dictionary.md"),
];

const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const maxParts = Number(arg("--max-parts", "15")) || 15;
const maxKb = Number(arg("--max-kb", "50")) || 50;
const maxBytes = Math.floor(maxKb * 1024);
const only = arg("--only")
  ? new Set(arg("--only").split(",").map((s) => s.trim()).filter(Boolean))
  : null;

const PATTERNS = [
  { id: "the_Lord", re: /\bthe Lord\b/i },
  { id: "lords_prayer", re: /Lord['\u2019]s Prayer/i },
  { id: "hashems_word", re: /Hashem['\u2019]s Word/i },
  { id: "hashems_son", re: /Hashem['\u2019]s Son/i },
  { id: "hashems_people", re: /Hashem['\u2019]s people/i },
  { id: "the_bible", re: /\bthe Bible\b/i },
  { id: "yahweh", re: /\bYahweh\b/i },
  { id: "passover", re: /\bPassover\b/i },
  { id: "psalms", re: /\bPsalms?\b/i },
  { id: "new_testament", re: /New Testament/i },
  { id: "gospel", re: /\bgospel\b/i },
  { id: "church", re: /\bchurch(?:es)?\b/i },
  { id: "baptism", re: /\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b/i },
  { id: "capernaum", re: /Capernaum/i },
  { id: "hand_recoils", re: /hand recoils/i },
  { id: "saturday", re: /\bSaturday\b/i },
  { id: "her_age", re: /\bher age\b/i },
  { id: "the_craft", re: /\bthe craft\b/i },
  { id: "first_dish", re: /\bfirst dish\b/i },
  { id: "pending", re: /English translation pending/i },
  { id: "mymemory", re: /MYMEMORY|QUERY LENGTH LIMIT/i },
  { id: "quran", re: /\b(?:koran|qur['\u2019]an)\b/i },
  { id: "apostle", re: /\bapostle\b/i },
  { id: "crucifix", re: /crucifix/i },
  { id: "islam", re: /\bislam(?:ic)?\b/i },
  { id: "vatican", re: /vatican/i },
  { id: "trinity", re: /\btrinity\b/i },
  { id: "abu_dhabi", re: /Abu Dhabi/i },
  { id: "click_here", re: /click here/i },
  { id: "hebrew_leak", re: /[\u0590-\u05FF]{2,}/ },
];

const pad3 = (n) => String(n).padStart(3, "0");

function citationNums(he) {
  const LETTERS = {
    א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
    י: 10, כ: 20, ל: 30, מ: 40, נ: 50, ס: 60, ע: 70, פ: 80, צ: 90,
    ק: 100, ר: 200, ש: 300, ת: 400, ך: 20, ם: 40, ן: 50, ף: 80, ץ: 90,
  };
  const out = new Set();
  const re = /סי(?:מן|׳|'|')?\s*([א-ת״"׳'\u05F3]+)/g;
  let m;
  const text = String(he || "");
  while ((m = re.exec(text))) {
    let n = 0;
    for (const ch of m[1].replace(/[״"']/g, "")) if (LETTERS[ch]) n += LETTERS[ch];
    if (n >= 1 && n <= 999) out.add(n);
  }
  return [...out].sort((a, b) => a - b);
}

function zipFolder(kitDir, zipPath) {
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  const parent = path.dirname(kitDir);
  const base = path.basename(kitDir);
  const r = spawnSync("tar", ["-a", "-c", "-f", zipPath, "-C", parent, base], { encoding: "utf8" });
  if (r.status !== 0 || !fs.existsSync(zipPath)) {
    return { ok: false, err: r.stderr || r.stdout || "zip failed" };
  }
  return { ok: true, bytes: fs.statSync(zipPath).size };
}

function rmDirSafe(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function* walkEn(dir) {
  const ents = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "bundles") continue;
      yield* walkEn(p);
    } else if (e.name === "en.html") yield p;
  }
}

function dirtyHits(en) {
  return PATTERNS.filter((p) => p.re.test(en || "")).map((p) => p.id);
}

const TASK = `# CM1 corpus MT-fix kit

## Volume
Choshen Mishpat reader corpus (\`cm1\` \`en.html\`).

## Your job
1. Open each \`worksheets/cm1_corpusmt_<slug>_*.json\`.
2. For **every** part, translate \`hebrew\` → clean Artscroll Orthodox English in \`new_en\`.
3. Treat \`en_current\` as a **negative example**. Full retranslate. Do not patch garbage phrases.
4. Write \`replies/<exact-worksheet-basename>.reply.json\`.
5. Resume-safe: skip worksheets that already have a matching reply.

## CRITICAL
- **Never** Qur'an / Koran / Quran. Hebrew \`הרמב"ם פי"א מה' גירושין\` = Rambam, chapter 11 of Hilkhot Gerushin. \`המגיד משנה\` = Maggid Mishneh (not Magdalene).
- **Never** "the Lord", Lord's Prayer, Hashem's Word, Hashem's people, Hashem's Son, the Bible, Yahweh, Passover, Psalm(s), baptism, Capernaum, church, gospel, New Testament, Abu Dhabi.
- Hashem / God only for the Divine name. Secular אדון / בעל = master / landlord / owner.
- No Hebrew letter runs in English. No em-dash / en-dash / \`--\`.
- Preserve \`<b>…</b>\` lemmas (English lemma text). Expand abbreviations. Translate Aramaic. Complete and faithful.
- Echo identity: \`part_index\`, \`volume\`, \`slug\`, \`siman\`, \`seif\`, \`corpus_en_path\`, \`decision\`/\`action\` = \`"retranslate"\`, \`new_en\` non-empty.

Dictionary: \`full_dictionary.md\` in this zip (kit root).
`;

const SCHEMA = `# Output schema — CM1 corpus MT-fix replies

\`worksheets/cm1_corpusmt_<slug>_sNNN-MMM_pNN.json\`
→ \`replies/cm1_corpusmt_<slug>_sNNN-MMM_pNN.reply.json\`

Each part: echo identity fields + \`"action": "retranslate"\` + \`new_en\`.
`;

function buildWorksheets(slug, parts, partsPerWs) {
  const worksheets = [];
  for (let i = 0; i < parts.length; i += partsPerWs) {
    const chunk = parts.slice(i, i + partsPerWs);
    const simFrom = chunk[0].siman;
    const simTo = chunk[chunk.length - 1].siman;
    const chunkIdx = Math.floor(i / partsPerWs) + 1;
    const name = `cm1_corpusmt_${slug}_s${pad3(simFrom)}-${pad3(simTo)}_p${String(chunkIdx).padStart(3, "0")}.json`;
    const wsParts = chunk.map((p, idx) => ({
      part_index: idx,
      volume: "cm1",
      kit: "corpus_mt_fix",
      slug,
      siman: p.siman,
      seif: p.seif,
      seg: 0,
      key: `cm1-corpus|${p.siman}|${p.seif}|${slug}`,
      bad_terms: p.bad_terms,
      apply_target: "corpus_en_html",
      corpus_en_path: p.corpus_en_path,
      corpus_he_path: p.corpus_he_path,
      citation_numbers_expected: p.citation_numbers_expected,
      hebrew: p.hebrew,
      en_current: p.en_current,
      new_en: "",
    }));
    worksheets.push({
      name,
      simFrom,
      simTo,
      parts: wsParts,
      json: JSON.stringify(
        {
          volume: "cm1",
          kit: "corpus_mt_fix",
          slug,
          siman_from: simFrom,
          siman_to: simTo,
          note: "Retranslate dirty CM corpus English from hebrew. Echo ALL identity fields.",
          emitted_at: new Date().toISOString(),
          parts: wsParts,
        },
        null,
        2
      ),
    });
  }
  return worksheets;
}

function writeKitDir(kitDir, slug, pack, kitNum) {
  rmDirSafe(kitDir);
  fs.mkdirSync(path.join(kitDir, "worksheets"), { recursive: true });
  fs.mkdirSync(path.join(kitDir, "replies"), { recursive: true });
  fs.mkdirSync(path.join(kitDir, "example"), { recursive: true });
  const indexFiles = [];
  let partCount = 0;
  for (const ws of pack) {
    fs.writeFileSync(path.join(kitDir, "worksheets", ws.name), ws.json, "utf8");
    indexFiles.push({ worksheet: ws.name, parts: ws.parts.length, siman_from: ws.simFrom, siman_to: ws.simTo });
    partCount += ws.parts.length;
  }
  const actualFrom = pack[0].simFrom;
  const actualTo = pack[pack.length - 1].simTo;
  const dictSrc = path.join(path.dirname(kitDir), "full_dictionary.md");
  if (fs.existsSync(dictSrc)) fs.copyFileSync(dictSrc, path.join(kitDir, "full_dictionary.md"));
  fs.writeFileSync(path.join(kitDir, "TASK.md"), TASK);
  fs.writeFileSync(path.join(kitDir, "OUTPUT-SCHEMA.md"), SCHEMA);
  fs.writeFileSync(
    path.join(kitDir, "README.md"),
    `# CM1 corpus MT-fix — ${slug} #${kitNum} (simanim ${actualFrom}–${actualTo})\n\nParts: **${partCount}** · Worksheets: **${indexFiles.length}**\nDictionary is **inside this zip**: \`full_dictionary.md\`.\n`
  );
  fs.writeFileSync(
    path.join(kitDir, "INDEX.json"),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        volume: "cm1",
        kit: "corpus_mt_fix",
        slug,
        kit_number: kitNum,
        siman_actual: [actualFrom, actualTo],
        worksheets: indexFiles.length,
        parts_for_gpt: partCount,
        max_parts_per_worksheet: maxParts,
        max_kb: maxKb,
        files: indexFiles,
      },
      null,
      2
    )
  );
  const ep = pack[0].parts[0];
  fs.writeFileSync(
    path.join(kitDir, "example", "example.reply.json"),
    JSON.stringify(
      {
        volume: "cm1",
        kit: "corpus_mt_fix",
        slug,
        parts: [
          {
            part_index: ep.part_index,
            volume: "cm1",
            slug,
            siman: ep.siman,
            seif: ep.seif,
            corpus_en_path: ep.corpus_en_path,
            decision: "retranslate",
            action: "retranslate",
            new_en: "(full translation — never Qur'an / the Lord / Hashem's Word)",
          },
        ],
      },
      null,
      2
    )
  );
  return { actualFrom, actualTo, partCount, worksheets: indexFiles.length };
}

const KIT_OVERHEAD_BYTES = 8 * 1024;
const ZIP_RATIO = 0.42;
function estimateZipBytes(pack) {
  let raw = KIT_OVERHEAD_BYTES;
  for (const ws of pack) raw += Buffer.byteLength(ws.json, "utf8");
  return Math.ceil(raw * ZIP_RATIO);
}

function packKitsForSlug(slug, parts, slugDir) {
  let partsPerWs = maxParts;
  let worksheets = buildWorksheets(slug, parts, partsPerWs);
  for (let guard = 0; guard < 8; guard++) {
    const big = worksheets.filter((ws) => estimateZipBytes([ws]) > maxBytes);
    if (!big.length) break;
    if (partsPerWs <= 1) break;
    partsPerWs = Math.max(1, Math.floor(partsPerWs / 2));
    console.log(`  ${slug}: shrinking to ${partsPerWs} parts/worksheet`);
    worksheets = buildWorksheets(slug, parts, partsPerWs);
  }
  const packs = [];
  let pack = [];
  for (const ws of worksheets) {
    const trial = [...pack, ws];
    if (pack.length > 0 && estimateZipBytes(trial) > maxBytes) {
      packs.push(pack);
      pack = [ws];
    } else pack = trial;
  }
  if (pack.length) packs.push(pack);

  const kits = [];
  let kitNum = 1;
  function emitOne(packWs) {
    if (!packWs.length) return;
    let cur = [...packWs];
    while (cur.length) {
      const simFrom = cur[0].simFrom;
      const simTo = cur[cur.length - 1].simTo;
      const kitName = `gpt_kit_cm1_corpusmt_${slug}_k${String(kitNum).padStart(3, "0")}_s${pad3(simFrom)}-${pad3(simTo)}`;
      const kitDir = path.join(slugDir, kitName);
      const meta = writeKitDir(kitDir, slug, cur, kitNum);
      const zipPath = path.join(slugDir, `${kitName}.zip`);
      const z = zipFolder(kitDir, zipPath);
      let zipBytes = z.ok ? z.bytes : 0;
      if (z.ok && zipBytes > maxBytes && cur.length > 1) {
        fs.unlinkSync(zipPath);
        rmDirSafe(kitDir);
        const peeled = cur.pop();
        emitOne(cur);
        emitOne([peeled]);
        return;
      }
      if (!z.ok) console.warn("zip failed", kitName, z.err);
      kits.push({
        slug,
        kit_number: kitNum,
        kit_name: kitName,
        siman_from: meta.actualFrom,
        siman_to: meta.actualTo,
        parts: meta.partCount,
        worksheets: meta.worksheets,
        zip: z.ok ? zipPath : null,
        zip_kb: zipBytes ? Math.round((zipBytes / 1024) * 10) / 10 : null,
      });
      console.log(
        `KIT ${slug} k${String(kitNum).padStart(3, "0")} s${pad3(meta.actualFrom)}-${pad3(meta.actualTo)}: parts=${meta.partCount} ws=${meta.worksheets}` +
          (z.ok ? ` zip=${Math.round(zipBytes / 1024)}KB` : "")
      );
      kitNum++;
      return;
    }
  }
  for (const p of packs) emitOne(p);
  return kits;
}

if (!fs.existsSync(CORPUS)) {
  console.error("corpus missing", CORPUS);
  process.exit(1);
}

console.log("scanning corpus", CORPUS);
const bySlug = new Map();
let scanned = 0;
for (const enPath of walkEn(CORPUS)) {
  scanned++;
  const rel = path.relative(CORPUS, enPath).split(path.sep);
  const siman = Number(String(rel[0]).replace(/^siman/i, ""));
  const seif = Number(String(rel[1]).replace(/^seif-/i, ""));
  const slug = rel[2];
  if (only && !only.has(slug)) continue;
  if (!Number.isFinite(siman) || !Number.isFinite(seif) || !slug) continue;
  const en = fs.readFileSync(enPath, "utf8");
  const hits = dirtyHits(en);
  if (!hits.length) continue;
  const hePath = path.join(path.dirname(enPath), "he.html");
  const hebrew = fs.existsSync(hePath) ? fs.readFileSync(hePath, "utf8").trim() : "";
  if (!hebrew) continue;
  let en_current = en.trim();
  if (en_current.length > 1800) en_current = en_current.slice(0, 1800) + "\n[truncated en_current]";
  if (!bySlug.has(slug)) bySlug.set(slug, []);
  bySlug.get(slug).push({
    siman,
    seif,
    slug,
    corpus_en_path: path.resolve(enPath),
    corpus_he_path: path.resolve(hePath),
    hebrew,
    en_current,
    bad_terms: hits.join("; "),
    citation_numbers_expected: citationNums(hebrew),
  });
}
console.log(`scanned ${scanned} en.html; dirty parts ${[...bySlug.values()].reduce((a, b) => a + b.length, 0)}`);

let dictPath = null;
for (const d of DICT_CANDIDATES) {
  if (fs.existsSync(d)) {
    dictPath = d;
    break;
  }
}

rmDirSafe(KIT_ROOT);
fs.mkdirSync(KIT_ROOT, { recursive: true });
const seriesIndex = [];
for (const [slug, parts] of [...bySlug.entries()].sort((a, b) => b[1].length - a[1].length)) {
  parts.sort((a, b) => a.siman - b.siman || a.seif - b.seif);
  const slugDir = path.join(KIT_ROOT, slug);
  fs.mkdirSync(slugDir, { recursive: true });
  if (dictPath) fs.copyFileSync(dictPath, path.join(slugDir, "full_dictionary.md"));
  fs.writeFileSync(path.join(slugDir, "TASK.md"), TASK);
  fs.writeFileSync(path.join(slugDir, "OUTPUT-SCHEMA.md"), SCHEMA);
  fs.writeFileSync(
    path.join(slugDir, "README.md"),
    `# CM1 corpus MT-fix — ${slug}\n\nDirty corpus files: **${parts.length}**\nSend one zip at a time. Dictionary is in this folder.\n`
  );
  seriesIndex.push(...packKitsForSlug(slug, parts, slugDir));
}

const oversize = seriesIndex.filter((k) => k.zip_kb != null && k.zip_kb > maxKb + 0.5);
const md = `# CM1 corpus MT-fix kits (≤${maxKb} KB / zip)

Generated: ${new Date().toISOString()}

**Source:** corpus \`${CORPUS}\`  
**Parts:** ${seriesIndex.reduce((a, b) => a + b.parts, 0)}  
**Kits:** ${seriesIndex.length}  
**Oversize:** ${oversize.length}

| Slug | Kit | Simanim | Parts | Worksheets | Zip KB |
|------|-----|---------|------:|----------:|-------:|
${seriesIndex
  .map(
    (k) =>
      `| ${k.slug} | k${String(k.kit_number).padStart(3, "0")} | ${k.siman_from}–${k.siman_to} | ${k.parts} | ${k.worksheets} | ${k.zip_kb ?? "—"} |`
  )
  .join("\n")}

## Apply
\`\`\`bash
node apply_cm1_corpus_mt_replies.mjs --replies <unzipped>/replies --worksheets <kit>/worksheets
\`\`\`
`;
fs.writeFileSync(path.join(KIT_ROOT, "SERIES_INDEX.md"), md);
fs.writeFileSync(
  path.join(KIT_ROOT, "SERIES_INDEX.json"),
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      corpus: CORPUS,
      max_parts: maxParts,
      max_kb: maxKb,
      kits: seriesIndex,
      total_parts: seriesIndex.reduce((a, b) => a + b.parts, 0),
      total_kits: seriesIndex.length,
      oversize: oversize.map((k) => k.kit_name),
    },
    null,
    2
  )
);
console.log("kits", seriesIndex.length, "parts", seriesIndex.reduce((a, b) => a + b.parts, 0), "oversize", oversize.length);
console.log("out", KIT_ROOT);
