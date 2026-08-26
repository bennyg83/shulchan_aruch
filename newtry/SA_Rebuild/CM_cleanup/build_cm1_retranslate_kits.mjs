/**
 * Build GPT retranslation kits for CM001 dirty English.
 *
 * Layout:
 *   gpt_kits_cm1/
 *     SERIES_INDEX.md
 *     <slug>/
 *       full_dictionary.md   (once per commentary — NOT inside each zip)
 *       TASK.md
 *       OUTPUT-SCHEMA.md
 *       gpt_kit_cm1_<slug>_k001_sNNN-MMM.zip   (≤ --max-kb, default 50)
 *
 * Skips beer-hagolah (Claude lane). Use --skip to omit other slugs (e.g. turei-zahav).
 *
 *   node build_cm1_retranslate_kits.mjs
 *   node build_cm1_retranslate_kits.mjs --only beur-hagra,siftei-kohen
 *   node build_cm1_retranslate_kits.mjs --skip turei-zahav --max-kb 50 --max-parts 15
 *   node build_cm1_retranslate_kits.mjs --no-zip
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CM_OUT = path.resolve(__dirname, "../../CM_001/output");
const KIT_ROOT = path.join(__dirname, "gpt_kits_cm1");
const DICT_CANDIDATES = [
  path.resolve(__dirname, "../../CM_001/full_dictionary.md"),
  path.resolve(__dirname, "../../../full_dictionary (1).md"),
  path.resolve(__dirname, "../../../full_dictionary.md"),
  path.resolve("C:/Users/binya/Downloads/Shulchan Aruch2/newtry/CM_001/full_dictionary.md"),
];

const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const maxParts = Number(arg("--max-parts", "15")) || 15;
const maxKb = Number(arg("--max-kb", "50")) || 50;
const maxBytes = Math.floor(maxKb * 1024);
const noZip = args.includes("--no-zip");
const only = arg("--only")
  ? new Set(
      arg("--only")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )
  : null;
const skipExtra = new Set(
  (arg("--skip") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

/** Claude-owned by default — `--only` still builds these slugs. */
const SKIP_SLUGS = new Set([
  "beer-hagolah",
  "beer-hagolah-on-shulchan-arukh-choshen-mishpat",
  ...skipExtra,
]);
function skipSlug(slug) {
  if (only && only.has(slug)) return false;
  return SKIP_SLUGS.has(slug);
}

const DIRTY_RE =
  /\bthe Lord\b|Lord['']?s Prayer|Hashem['']?s Word|Hashem['']?s people|\bPassover\b|\bPsalms?\b|\bthe Bible\b|\bYahweh\b|\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b|Capernaum|hand recoils|Saturday|Don['']?t fuck|soundtrack from Darren|And thou, Capernaum|apostle|New Testament|\bchurch(?:es)?\b|crucifix|\bislam(?:ic)?\b|koran|qur['']?an|gospel|vatican|trinity/i;
const HEBREW_LEAK = /[\u0590-\u05FF]{2,}/;
const BLOCK_SPLIT = /\*{4}\s*CM001 SOURCE BLOCK\s*\*{4}/i;

function pad3(n) {
  return String(n).padStart(3, "0");
}

function parseMeta(chunk) {
  const slug = (chunk.match(/^slug:\s*(.+)$/m) || [])[1]?.trim() || "";
  const seif = Number((chunk.match(/^seif:\s*(\d+)/m) || [])[1] || 0);
  const marker = (chunk.match(/^marker:\s*(.+)$/m) || [])[1]?.trim() || "_";
  const heM = chunk.match(/\*{4}\s*HEBREW\s*\*{4}([\s\S]*?)\*{4}\s*ENGLISH\s*\*{4}/);
  const enM = chunk.match(/\*{4}\s*ENGLISH\s*\*{4}([\s\S]*?)\*{4}\s*END BLOCK\s*\*{4}/);
  return {
    slug,
    seif,
    marker,
    hebrew: heM ? heM[1].trim() : "",
    en_current: enM ? enM[1].trim() : "",
  };
}

function isDirty(en) {
  const t = String(en || "").trim();
  if (!t) return true;
  if (/English translation pending/i.test(t)) return true;
  if (DIRTY_RE.test(t)) return true;
  if (HEBREW_LEAK.test(t)) return true;
  return false;
}

function dirtyTerms(en) {
  const terms = [];
  const t = String(en || "");
  const m = t.match(DIRTY_RE);
  if (m) terms.push(m[0]);
  const h = t.match(HEBREW_LEAK);
  if (h) terms.push(`hebrewLeak:${h[0]}`);
  if (/English translation pending/i.test(t) || !t.trim()) terms.push("pending");
  return terms;
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

if (!fs.existsSync(CM_OUT)) {
  console.error("CM output missing:", CM_OUT);
  console.error("Junction from Downloads/Shulchan Aruch2/newtry/CM_001/output first.");
  process.exit(1);
}

console.log("scanning", CM_OUT);
console.log(`max-kb=${maxKb} max-parts=${maxParts} skip=[${[...SKIP_SLUGS].join(", ")}]`);
const bySlug = new Map();

for (const simDir of fs.readdirSync(CM_OUT).filter((n) => /^siman_\d+$/.test(n))) {
  const siman = Number(simDir.replace("siman_", ""));
  for (const slug of fs.readdirSync(path.join(CM_OUT, simDir))) {
    if (skipSlug(slug)) continue;
    if (only && !only.has(slug)) continue;
    const d = path.join(CM_OUT, simDir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const fname of fs
      .readdirSync(d)
      .filter((n) => /^part-\d+\.txt$/i.test(n))
      .sort()) {
      const fpath = path.join(d, fname);
      const text = fs.readFileSync(fpath, "utf8");
      const chunks = text.split(BLOCK_SPLIT).slice(1);
      let partIndexInFile = 0;
      for (const chunk of chunks) {
        const meta = parseMeta(chunk);
        const slugUse = meta.slug || slug;
        if (skipSlug(slugUse)) {
          partIndexInFile++;
          continue;
        }
        if (only && !only.has(slugUse)) {
          partIndexInFile++;
          continue;
        }
        if (!isDirty(meta.en_current)) {
          partIndexInFile++;
          continue;
        }
        if (!bySlug.has(slugUse)) bySlug.set(slugUse, []);
        bySlug.get(slugUse).push({
          siman,
          seif: meta.seif,
          slug: slugUse,
          marker: meta.marker,
          part_file: fname,
          part_index_in_file: partIndexInFile,
          source_txt_path: path.resolve(fpath),
          hebrew: meta.hebrew,
          en_current: meta.en_current,
          bad_terms: dirtyTerms(meta.en_current).join("; "),
          citation_numbers_expected: citationNums(meta.hebrew),
        });
        partIndexInFile++;
      }
    }
  }
}

fs.mkdirSync(KIT_ROOT, { recursive: true });

let dictPath = null;
for (const d of DICT_CANDIDATES) {
  if (fs.existsSync(d)) {
    dictPath = d;
    break;
  }
}

const TASK_COMMON = `# CM1 retranslation kit

## Volume
Choshen Mishpat (\`cm1\` / CM_001 source TXT).

## Your job
1. Open each \`worksheets/cm1_<slug>_*.json\`.
2. For **every** part, translate \`hebrew\` → clean Artscroll Orthodox English in \`new_en\`.
3. Treat \`en_current\` as a **negative example** (MT garbage). Prefer full retranslate.
4. Write \`replies/<exact-worksheet-basename>.reply.json\`.
5. Resume-safe: skip worksheets that already have a matching reply.

## CRITICAL vocabulary

### the Lord vs Hashem (context-sensitive — read Hebrew)
| Hebrew / sense | English |
|----------------|---------|
| Divine name (ה׳ / השם / הקב״ה / before Hashem in Tanakh verses, berachot, etc.) | **Hashem** (or God where idiom requires). **Never** "the Lord", **never** "Lord's Prayer" |
| Secular אדון / בעל / master / landlord / title of a person | **master** / **landlord** / owner / sir — **not** Hashem, **not** "the Lord" |

When unsure: prefer Hashem only if the Hebrew clearly refers to the Divine; otherwise use the ordinary noun.

### Other register (zero tolerance in \`new_en\`)
| Forbidden | Prefer |
|-----------|--------|
| Lord's Prayer | never — retranslate (often MT junk for לשון / prayer idioms) |
| Hashem's Word / people | the word of Hashem / the people of Hashem |
| Yahweh | Hashem |
| the Bible | Tanach / Scripture / Torah / Mikra |
| Psalm / Psalms | Tehillim |
| Passover | Pesach |
| baptism / baptize | tevilah / immerse / mikvah |
| Capernaum / New Testament / church / crucifix / Islamic | never — retranslate from Hebrew |

### Also
- No Hebrew letter runs in English
- No em-dash (—), en-dash (–), or \`--\`
- Expand abbreviations; translate Aramaic; complete and faithful
- Preserve \`<b>…</b>\` lemmas (English lemma text)
- Honor \`citation_numbers_expected\`
- Clean UTF-8 JSON, no BOM

## Reply identity (echo verbatim)
\`part_index\`, \`volume\` (\`"cm1"\`), \`slug\`, \`siman\`, \`seif\`, \`seg\`, \`source_txt_path\`, \`part_file\`, \`part_index_in_file\`, \`decision\`/\`action\` = \`"retranslate"\`, \`new_en\` non-empty.

See \`OUTPUT-SCHEMA.md\`. Dictionary (if needed) is in the parent commentary folder: \`../full_dictionary.md\`.
`;

const SCHEMA = `# Output schema — CM1 replies

\`worksheets/cm1_<slug>_sNNN-MMM.json\`
→ \`replies/cm1_<slug>_sNNN-MMM.reply.json\`

\`\`\`json
{
  "volume": "cm1",
  "kit": "retranslate",
  "slug": "beur-hagra",
  "parts": [
    {
      "part_index": 0,
      "volume": "cm1",
      "slug": "beur-hagra",
      "siman": 1,
      "seif": 1,
      "seg": 0,
      "part_file": "part-001.txt",
      "part_index_in_file": 0,
      "source_txt_path": "C:\\\\...\\\\siman_001\\\\beur-hagra\\\\part-001.txt",
      "decision": "retranslate",
      "action": "retranslate",
      "new_en": "<b>Lemma.</b> Full faithful translation…"
    }
  ]
}
\`\`\`
`;

function buildWorksheets(slug, parts, partsPerWs) {
  const worksheets = [];
  for (let i = 0; i < parts.length; i += partsPerWs) {
    const chunk = parts.slice(i, i + partsPerWs);
    const simFrom = chunk[0].siman;
    const simTo = chunk[chunk.length - 1].siman;
    const chunkIdx = Math.floor(i / partsPerWs) + 1;
    const name =
      parts.length > partsPerWs
        ? `cm1_${slug}_s${pad3(simFrom)}-${pad3(simTo)}_p${String(chunkIdx).padStart(2, "0")}.json`
        : `cm1_${slug}_s${pad3(simFrom)}-${pad3(simTo)}.json`;
    const wsParts = chunk.map((p, idx) => ({
      part_index: idx,
      volume: "cm1",
      slug,
      siman: p.siman,
      seif: p.seif,
      seg: 0,
      marker: p.marker,
      part_file: p.part_file,
      part_index_in_file: p.part_index_in_file,
      key: `cm1|${p.siman}|${p.seif}|${slug}|${p.part_file}|${p.part_index_in_file}`,
      bad_terms: p.bad_terms,
      apply_target: "source_txt",
      source_txt_path: p.source_txt_path,
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
          kit: "retranslate",
          slug,
          siman_from: simFrom,
          siman_to: simTo,
          note: "Retranslate dirty CM English from hebrew. Echo ALL identity fields.",
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
  fs.writeFileSync(path.join(kitDir, "TASK.md"), TASK_COMMON);
  fs.writeFileSync(path.join(kitDir, "OUTPUT-SCHEMA.md"), SCHEMA);
  fs.writeFileSync(
    path.join(kitDir, "README.md"),
    `# CM1 GPT kit — ${slug} #${kitNum} (simanim ${actualFrom}–${actualTo})\n\nParts: **${partCount}** · Worksheets: **${indexFiles.length}**\nMax zip size target: **${maxKb} KB**\n\nDictionary: see parent folder \`../full_dictionary.md\`.\nDrop replies into \`replies/\`. Apply with \`apply_cm1_retranslate_replies.mjs\`.\n`
  );
  fs.writeFileSync(
    path.join(kitDir, "INDEX.json"),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        volume: "cm1",
        kit: "retranslate",
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

  if (indexFiles.length) {
    const ep = pack[0].parts[0];
    fs.writeFileSync(
      path.join(kitDir, "example", "example.reply.json"),
      JSON.stringify(
        {
          volume: "cm1",
          kit: "retranslate",
          slug,
          parts: [
            {
              part_index: ep.part_index,
              volume: "cm1",
              slug,
              siman: ep.siman,
              seif: ep.seif,
              seg: 0,
              part_file: ep.part_file,
              part_index_in_file: ep.part_index_in_file,
              source_txt_path: ep.source_txt_path,
              decision: "retranslate",
              action: "retranslate",
              new_en: "(full translation — never the Lord / Lord's Prayer / Capernaum / Passover)",
            },
          ],
        },
        null,
        2
      )
    );
  }

  return { actualFrom, actualTo, partCount, worksheets: indexFiles.length };
}

/** Overhead for TASK/README/INDEX/SCHEMA/example inside each zip (no dictionary). */
const KIT_OVERHEAD_BYTES = 8 * 1024;
/** Conservative zip ratio for UTF-8 JSON + markdown (tuned to stay under max-kb). */
const ZIP_RATIO = 0.42;

function estimateZipBytes(pack) {
  let raw = KIT_OVERHEAD_BYTES;
  for (const ws of pack) raw += Buffer.byteLength(ws.json, "utf8");
  return Math.ceil(raw * ZIP_RATIO);
}

/**
 * Pack worksheets into kits ≤ maxBytes.
 * Estimate first; measure final zip; if over, peel worksheets until under (or warn).
 */
function packKitsForSlug(slug, parts, slugDir) {
  let partsPerWs = maxParts;
  let worksheets = buildWorksheets(slug, parts, partsPerWs);

  for (let guard = 0; guard < 8; guard++) {
    const big = worksheets.filter((ws) => estimateZipBytes([ws]) > maxBytes);
    if (!big.length) break;
    if (partsPerWs <= 1) {
      for (const ws of big) {
        console.warn(
          `WARN ${slug}: worksheet ${ws.name} estimated ${Math.round(estimateZipBytes([ws]) / 1024)}KB > ${maxKb}KB`
        );
      }
      break;
    }
    partsPerWs = Math.max(1, Math.floor(partsPerWs / 2));
    console.log(`  ${slug}: shrinking to ${partsPerWs} parts/worksheet`);
    worksheets = buildWorksheets(slug, parts, partsPerWs);
  }

  // Greedy packs by estimate
  const packs = [];
  let pack = [];
  for (const ws of worksheets) {
    const trial = [...pack, ws];
    if (pack.length > 0 && estimateZipBytes(trial) > maxBytes) {
      packs.push(pack);
      pack = [ws];
    } else {
      pack = trial;
    }
  }
  if (pack.length) packs.push(pack);

  const kits = [];
  let kitNum = 1;

  function emitOne(packWs) {
    if (!packWs.length) return;
    // Measure; peel from end until under cap (or single worksheet left)
    let cur = [...packWs];
    while (cur.length) {
      const simFrom = cur[0].simFrom;
      const simTo = cur[cur.length - 1].simTo;
      const kitName = `gpt_kit_cm1_${slug}_k${String(kitNum).padStart(3, "0")}_s${pad3(simFrom)}-${pad3(simTo)}`;
      const kitDir = path.join(slugDir, kitName);
      const meta = writeKitDir(kitDir, slug, cur, kitNum);
      let zipPath = null;
      let zipBytes = 0;
      if (!noZip) {
        zipPath = path.join(slugDir, `${kitName}.zip`);
        const z = zipFolder(kitDir, zipPath);
        if (!z.ok) {
          console.warn("zip failed", kitName, z.err);
          zipPath = null;
        } else zipBytes = z.bytes;
      }
      if (zipPath && zipBytes > maxBytes && cur.length > 1) {
        fs.unlinkSync(zipPath);
        rmDirSafe(kitDir);
        const peeled = cur.pop();
        // keep peeling until remaining fits; peeled goes to next emit
        // continue loop with smaller cur; queue peeled after
        const rest = [peeled];
        // finish shrinking cur first by continuing while
        // Actually: recurse peel on cur, then emit rest
        // Simpler: put peeled back on a queue
        emitOne(cur);
        emitOne(rest);
        return;
      }
      if (zipPath && zipBytes > maxBytes) {
        console.warn(
          `WARN ${slug}: emitting oversize kit ${kitName} (${Math.round(zipBytes / 1024)}KB > ${maxKb}KB)`
        );
      }
      kits.push({
        slug,
        kit_number: kitNum,
        kit_name: kitName,
        siman_from: meta.actualFrom,
        siman_to: meta.actualTo,
        parts: meta.partCount,
        worksheets: meta.worksheets,
        kit_dir: kitDir,
        zip: zipPath,
        zip_kb: zipBytes ? Math.round((zipBytes / 1024) * 10) / 10 : null,
      });
      console.log(
        `KIT ${slug} k${String(kitNum).padStart(3, "0")} s${pad3(meta.actualFrom)}-${pad3(meta.actualTo)}: parts=${meta.partCount} ws=${meta.worksheets}` +
          (zipPath ? ` zip=${Math.round(zipBytes / 1024)}KB` : "")
      );
      kitNum++;
      return;
    }
  }

  for (const p of packs) emitOne(p);
  return kits;
}

const seriesIndex = [];

for (const [slug, parts] of [...bySlug.entries()].sort((a, b) => b[1].length - a[1].length)) {
  parts.sort(
    (a, b) =>
      a.siman - b.siman ||
      a.seif - b.seif ||
      a.part_file.localeCompare(b.part_file) ||
      a.part_index_in_file - b.part_index_in_file
  );

  const slugDir = path.join(KIT_ROOT, slug);
  // Rebuild this commentary folder only (preserve skipped slugs e.g. turei-zahav)
  rmDirSafe(slugDir);
  fs.mkdirSync(slugDir, { recursive: true });

  if (dictPath) fs.copyFileSync(dictPath, path.join(slugDir, "full_dictionary.md"));
  fs.writeFileSync(path.join(slugDir, "TASK.md"), TASK_COMMON);
  fs.writeFileSync(path.join(slugDir, "OUTPUT-SCHEMA.md"), SCHEMA);
  fs.writeFileSync(
    path.join(slugDir, "README.md"),
    `# CM1 — ${slug}\n\nDirty parts in this rebuild: **${parts.length}**\n\nZip kits in this folder are capped at **${maxKb} KB** each (dictionary lives here, not inside zips).\n\nSend one zip at a time to GPT.\n`
  );

  const kits = packKitsForSlug(slug, parts, slugDir);
  seriesIndex.push(...kits);
}

let seriesIndexOut = seriesIndex;
if (only && fs.existsSync(path.join(KIT_ROOT, "SERIES_INDEX.json"))) {
  try {
    const prev = JSON.parse(fs.readFileSync(path.join(KIT_ROOT, "SERIES_INDEX.json"), "utf8"));
    const rebuilt = new Set(seriesIndex.map((k) => k.slug));
    const kept = (prev.kits || []).filter((k) => !rebuilt.has(k.slug));
    seriesIndexOut = [
      ...kept,
      ...seriesIndex.map((k) => ({
        slug: k.slug,
        kit_number: k.kit_number,
        kit_name: k.kit_name,
        siman_from: k.siman_from,
        siman_to: k.siman_to,
        parts: k.parts,
        worksheets: k.worksheets,
        zip: k.zip,
        zip_kb: k.zip_kb,
      })),
    ];
  } catch {
    seriesIndexOut = seriesIndex;
  }
}

const oversize = seriesIndexOut.filter((k) => k.zip_kb != null && k.zip_kb > maxKb + 0.5);
const seriesMd = `# CM1 GPT kit series (≤${maxKb} KB / zip, by commentary)

Generated: ${new Date().toISOString()}

**Source:** \`${CM_OUT}\`  
**Skip:** ${[...SKIP_SLUGS].filter((s) => !(only && only.has(s))).join(", ") || "(none)"}  
**Dirty filter:** register/garbage MT + HebrewLeak + pending  
**Layout:** \`gpt_kits_cm1/<slug>/gpt_kit_*.zip\` (+ shared \`full_dictionary.md\` per slug)  
**Cap:** **${maxKb} KB** per zip · **${maxParts}** parts/worksheet (auto-shrink if needed)

## Kits

| Slug | Kit | Simanim | Parts | Worksheets | Zip KB |
|------|-----|---------|------:|----------:|-------:|
${seriesIndexOut
  .map(
    (k) =>
      `| ${k.slug} | k${String(k.kit_number).padStart(3, "0")} | ${k.siman_from}–${k.siman_to} | ${k.parts} | ${k.worksheets} | ${k.zip_kb ?? "—"} |`
  )
  .join("\n")}

**Total parts:** ${seriesIndexOut.reduce((a, b) => a + b.parts, 0)}  
**Total kits:** ${seriesIndexOut.length}  
**Over ${maxKb} KB:** ${oversize.length}${oversize.length ? ` (${oversize.map((k) => k.kit_name).join(", ")})` : ""}

## Hand to GPT
Upload zips from one commentary folder at a time. Dictionary is in the parent \`<slug>/\` folder.

## Apply
\`\`\`bash
node apply_cm1_retranslate_replies.mjs --replies <unzipped>/replies
\`\`\`
`;

fs.writeFileSync(path.join(KIT_ROOT, "SERIES_INDEX.md"), seriesMd);
fs.writeFileSync(
  path.join(KIT_ROOT, "SERIES_INDEX.json"),
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      cm_out: CM_OUT,
      skip_slugs: [...SKIP_SLUGS].filter((s) => !(only && only.has(s))),
      max_parts: maxParts,
      max_kb: maxKb,
      kits: seriesIndexOut.map((k) => ({
        slug: k.slug,
        kit_number: k.kit_number,
        kit_name: k.kit_name,
        siman_from: k.siman_from,
        siman_to: k.siman_to,
        parts: k.parts,
        worksheets: k.worksheets,
        zip: k.zip,
        zip_kb: k.zip_kb,
      })),
      total_parts: seriesIndexOut.reduce((a, b) => a + b.parts, 0),
      total_kits: seriesIndexOut.length,
      oversize: oversize.map((k) => k.kit_name),
    },
    null,
    2
  )
);

console.log("\nSERIES", KIT_ROOT);
console.log("kits this run", seriesIndex.length);
console.log("kits in index", seriesIndexOut.length);
console.log("total parts this run", seriesIndex.reduce((a, b) => a + b.parts, 0));
if (oversize.length) console.log("OVERSIZE", oversize.map((k) => `${k.kit_name}=${k.zip_kb}KB`).join(", "));
