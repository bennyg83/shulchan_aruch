#!/usr/bin/env node
/**
 * sa-preprocess.mjs
 *
 * Mechanical pre-processing pipeline for the entire Shulchan Aruch.
 * Zero LLM calls. Zero API tokens. Pure structural extraction.
 *
 * STAGES HANDLED:
 *   1 — Read seif-NNN.json Sefaria bundles, extract all commentary layers
 *   2 — Map Sefaria slugs to canonical positions per seif
 *   3 — Identify siman/seif structure and commentary placement via hooks
 *   4 — Write part-NNN.txt files: Hebrew preserved + English placeholder slots
 *   +   Introduction (merged.json) handled as flat paragraph blocks
 *
 * USAGE:
 *   node sa-preprocess.mjs --all                          (everything)
 *   node sa-preprocess.mjs --section OC --all             (all of OC)
 *   node sa-preprocess.mjs --section OC --siman 318       (one siman)
 *   node sa-preprocess.mjs --section OC --siman 1 --from 1 --to 9
 *   node sa-preprocess.mjs --section intro                (introduction only)
 *   node sa-preprocess.mjs --all --dry-run                (preview, no writes)
 *
 * BUNDLE ROOT:
 *   Auto-detected. Override with --bundle-root "C:\path\to\shulchan-arukh"
 *
 * OUTPUT:
 *   output/intro/introduction.txt
 *   output/<SECTION>/siman_NNN/<slug>/part-NNN.txt
 *   output/<SECTION>/siman_NNN/manifest.json
 *   output/<SECTION>/siman_NNN/TRANSLATION_QUEUE.md
 *   output/<SECTION>/siman_NNN/status.json
 *   output/global_status.json
 */

import fs   from 'fs';
import path from 'path';

// ─── Constants ────────────────────────────────────────────────────────────────

const PLACEHOLDER = 'English translation pending — replace after editing this block (keep Hebrew above intact).';
const BLOCK_OPEN  = '**** SA SOURCE BLOCK ****';
const HEB_MARKER  = '**** HEBREW ****';
const ENG_MARKER  = '**** ENGLISH ****';
const END_MARKER  = '**** END BLOCK ****';

// ─── Section config ───────────────────────────────────────────────────────────

const SECTION_CONFIG = {
  OC:    { folder: 'Orach_Chayim',    simanRange: [1, 697], label: 'Orach Chayyim'   },
  YD:    { folder: 'Yoreh_Deah',      simanRange: [1, 403], label: "Yoreh De'ah"     },
  EH:    { folder: 'Even_HaEzer',     simanRange: [1, 178], label: 'Even HaEzer'     },
  CM:    { folder: 'Choshen_Mishpat', simanRange: [1, 427], label: 'Choshen Mishpat' },
  INTRO: { folder: 'Introduction',    simanRange: [0, 0],   label: 'Introduction'    },
};

// ─── Commentary order ─────────────────────────────────────────────────────────

const SOURCE_ORDER = [
  'mechaber','ateret-zekenim','baer-heitev','beer-hagolah','beur-hagra',
  'biur-halacha','chatam-sofer','chokhmat-shlomo','chok-yaakov',
  'dagul-merevavah','eliyah-rabbah','eshel-avraham','kaf-hachayyim',
  'kol-yaakov','levushei-serad','machatzit-hashekel','magen-avraham',
  'mishnah-berurah','netiv-chayim','peri-megadim','rabbi-akiva-eiger',
  'shaarei-teshuvah','turei-zahav','yad-ephraim',
  // YD additions
  'siftei-kohen','tiferet-yisrael','torat-hashlamim','pitchei-teshuva',
  'peleti','yad-avraham','peri-megadim-yd','rabbi-akiva-eiger-yd',
];

const SLUG_LABELS = {
  'mechaber':'Mechaber and Rama','ateret-zekenim':'Ateret Zekeinim',
  'baer-heitev':'Baer Hetev','beer-hagolah':"Be'er HaGolah",
  'beur-hagra':'Biur HaGRA','biur-halacha':'Biur Halacha',
  'chatam-sofer':'Chatam Sofer','chokhmat-shlomo':'Chokhmat Shlomo',
  'chok-yaakov':'Chok Yaakov','dagul-merevavah':'Dagul Merevavah',
  'eliyah-rabbah':'Eliyah Rabbah','eshel-avraham':'Eshel Avraham',
  'kaf-hachayyim':'Kaf HaChayyim','kol-yaakov':'Kol Yaakov',
  'levushei-serad':'Levushei Serad','machatzit-hashekel':'Machatzit HaShekel',
  'magen-avraham':'Magen Avraham','mishnah-berurah':'Mishnah Berurah',
  'netiv-chayim':'Netiv Chayim','peri-megadim':'Peri Megadim',
  'rabbi-akiva-eiger':'Rabbi Akiva Eiger','shaarei-teshuvah':'Shaarei Teshuvah',
  'turei-zahav':'Turei Zahav (Taz)','yad-ephraim':'Yad Ephraim',
  'siftei-kohen':'Siftei Kohen (Shach)','tiferet-yisrael':'Tiferet Yisrael',
  'torat-hashlamim':'Torat HaShlamim','pitchei-teshuva':'Pitchei Teshuva',
  'peleti':'Peleti','yad-avraham':'Yad Avraham',
  'peri-megadim-yd':"Peri Megadim (YD)",'rabbi-akiva-eiger-yd':'Rabbi Akiva Eiger (YD)',
};

// ─── Hebrew numerals ──────────────────────────────────────────────────────────

const HEB_LETTERS = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י',
                     'יא','יב','יג','יד','טו','טז','יז','יח','יט','כ'];
const hebrewIndex = n => HEB_LETTERS[n - 1] || String(n);

// ─── CLI parsing ──────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    section: null, siman: null, from: 1, to: null,
    all: false, dryRun: false, bundleRoot: null,
    outRoot: 'output', maxChars: 45000,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--section':     opts.section    = args[++i].toUpperCase(); break;
      case '--siman':       opts.siman      = parseInt(args[++i]);     break;
      case '--from':        opts.from       = parseInt(args[++i]);     break;
      case '--to':          opts.to         = parseInt(args[++i]);     break;
      case '--all':         opts.all        = true;                    break;
      case '--dry-run':     opts.dryRun     = true;                    break;
      case '--bundle-root': opts.bundleRoot = args[++i];               break;
      case '--out':         opts.outRoot    = args[++i];               break;
      case '--max-chars':   opts.maxChars   = parseInt(args[++i]);     break;
    }
  }
  return opts;
}

// ─── Bundle root detection ────────────────────────────────────────────────────

function detectBundleRoot(opts) {
  if (opts.bundleRoot) return opts.bundleRoot;
  const cwd = process.cwd();
  const candidates = [
    cwd,
    path.join(cwd, '..', '..', 'Sefaria Pulls', 'shulchan-arukh'),
    path.join(process.env.USERPROFILE || '', 'Downloads', 'Shulchan Aruch', 'Sefaria Pulls', 'shulchan-arukh'),
    path.join(process.env.HOME || '', 'Downloads', 'Shulchan Aruch', 'Sefaria Pulls', 'shulchan-arukh'),
    'C:\\Users\\binya\\Downloads\\Shulchan Aruch\\Sefaria Pulls\\shulchan-arukh',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) &&
       (fs.existsSync(path.join(c, 'Orach_Chayim')) ||
        fs.existsSync(path.join(c, 'Yoreh_Deah')))) {
      console.log(`  Bundle root: ${c}`);
      return c;
    }
  }
  throw new Error(
    'Cannot find bundle root.\nRun from inside the shulchan-arukh folder, or pass:\n' +
    '--bundle-root "C:\\Users\\binya\\Downloads\\Shulchan Aruch\\Sefaria Pulls\\shulchan-arukh"'
  );
}

// ─── HTML stripping ───────────────────────────────────────────────────────────

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<b>/gi,'').replace(/<\/b>/gi,'')
    .replace(/<i[^>]*>/gi,'').replace(/<\/i>/gi,'')
    .replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ')
    .trim();
}

// ─── Normalize commentary layer ───────────────────────────────────────────────

function normalizeLayer(layer) {
  if (!layer) return [];
  if (Array.isArray(layer) && layer[0] && typeof layer[0] === 'object' && layer[0].he)
    return layer;
  if (Array.isArray(layer) && typeof layer[0] === 'string')
    return layer.map((he, i) => ({ he, marker: hebrewIndex(i + 1) }));
  if (layer.he) {
    const arr = Array.isArray(layer.he) ? layer.he : [layer.he];
    return arr.map((he, i) => ({ he, marker: hebrewIndex(i + 1) }));
  }
  return [];
}

// ─── Parse existing part file (preserve translations) ────────────────────────

function parsePartFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const map = {};
  for (const raw of content.split(END_MARKER)) {
    if (!raw.includes(HEB_MARKER)) continue;
    const lines   = raw.split('\n');
    const get = p => (lines.find(l => l.startsWith(p)) || '').replace(p,'').trim();
    const key = `${get('slug:')}|${get('siman:')}|${get('seif:')}|${get('marker:')}`;
    const ei  = lines.findIndex(l => l.trim() === ENG_MARKER);
    if (ei < 0) continue;
    const english = lines.slice(ei + 1).join('\n').trim();
    if (english && english !== PLACEHOLDER) map[key] = english;
  }
  return map;
}

// ─── Serialize one block ──────────────────────────────────────────────────────

function blockToText(block, existingTranslations) {
  const key = `${block.slug}|${block.siman}|${block.seif}|${block.marker}`;
  return [
    BLOCK_OPEN,
    `slug: ${block.slug}`,
    `section: ${block.section || ''}`,
    `siman: ${block.siman}`,
    `seif: ${block.seif}`,
    `marker: ${block.marker}`,
    HEB_MARKER,
    block.hebrewHtml || block.hebrew,
    ENG_MARKER,
    existingTranslations[key] || PLACEHOLDER,
    END_MARKER,
    '', '',
  ].join('\n');
}

// ─── Write part file ──────────────────────────────────────────────────────────

function writePartFile(filePath, blocks, existingTranslations) {
  fs.writeFileSync(filePath, blocks.map(b => blockToText(b, existingTranslations)).join(''), 'utf8');
}

// ─── Load seif bundle ─────────────────────────────────────────────────────────

function loadSeifBundle(bundleRoot, sectionFolder, simanNum, seifNum) {
  const p = path.join(
    bundleRoot, sectionFolder, 'simanim',
    String(simanNum).padStart(3,'0'),
    `seif-${String(seifNum).padStart(3,'0')}.json`
  );
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.warn(`  Warning: cannot parse ${p}`); return null; }
}

// ─── Detect seif range ────────────────────────────────────────────────────────

function detectSeifRange(bundleRoot, sectionFolder, simanNum) {
  const dir = path.join(bundleRoot, sectionFolder, 'simanim', String(simanNum).padStart(3,'0'));
  if (!fs.existsSync(dir)) return { from: 1, to: 0 };
  const nums = fs.readdirSync(dir)
    .filter(f => /^seif-\d{3}\.json$/.test(f))
    .map(f => parseInt(f.slice(5,8)))
    .sort((a,b) => a-b);
  return nums.length ? { from: nums[0], to: nums[nums.length-1] } : { from: 1, to: 0 };
}

// ─── Extract blocks from bundle ───────────────────────────────────────────────

function extractBlocksFromBundle(bundle, sectionKey, simanNum, seifNum) {
  if (!bundle || !bundle.layers) return [];
  const blocks = [];

  for (const slug of SOURCE_ORDER) {
    const layer = bundle.layers[slug];
    if (!layer) continue;

    if (slug === 'mechaber') {
      let raw = '';
      if (Array.isArray(layer)) raw = layer.join('\n');
      else if (layer && typeof layer === 'object') {
        if (layer.kind === 'html' && typeof layer.html === 'string') raw = layer.html;
        else if (typeof layer.he === 'string') raw = layer.he;
        else if (typeof layer.hebrew === 'string') raw = layer.hebrew;
        else raw = '';
      } else raw = String(layer ?? '');
      if (raw && raw.trim()) {
        blocks.push({
          slug, section: sectionKey, siman: simanNum, seif: seifNum, marker: '_',
          hebrew: stripHtml(raw).trim(), hebrewHtml: raw, hooks: bundle.hooks || [],
        });
      }
      continue;
    }

    normalizeLayer(layer).forEach((note, idx) => {
      if (!note || !note.he) return;
      blocks.push({
        slug, section: sectionKey, siman: simanNum, seif: seifNum,
        marker: note.marker || note.label || hebrewIndex(idx + 1),
        hebrew: stripHtml(note.he).trim(), hebrewHtml: note.he,
      });
    });
  }
  return blocks;
}

// ─── Write manifest ───────────────────────────────────────────────────────────

function writeManifest(dir, meta, stats) {
  fs.writeFileSync(path.join(dir, 'manifest.json'),
    JSON.stringify({ ...meta, generatedAt: new Date().toISOString(), sources: stats }, null, 2), 'utf8');
}

// ─── Write TRANSLATION_QUEUE.md ───────────────────────────────────────────────

function writeTranslationQueue(dir, title, seifRange, stats) {
  const total = stats.reduce((a,s) => a + s.totalBlocks, 0);
  const done  = stats.reduce((a,s) => a + s.translatedBlocks, 0);
  const pct   = total > 0 ? Math.round(done/total*100) : 0;

  const rows = stats.map((s, i) => {
    if (s.totalBlocks === 0)
      return `| — | ${s.label} | \`${s.slug}\` | *(empty)* | 0 | — |`;
    const files = s.parts.map(p => `\`${s.slug}/${p.file}\``).join(', ');
    return `| ${i+1} | ${s.label} | \`${s.slug}\` | ${files} | ${s.totalBlocks} | ${s.translatedBlocks} |`;
  });

  fs.writeFileSync(path.join(dir, 'TRANSLATION_QUEUE.md'), [
    `# ${title} — Translation Queue`,
    '',
    seifRange ? `Seifim ${seifRange.from}–${seifRange.to}.` : '',
    '',
    'Replace each `**** ENGLISH ****` block. Keep `**** HEBREW ****` intact.',
    `Placeholder: \`${PLACEHOLDER}\``,
    '**After any change:** `npm run apply:dictionary`',
    '',
    '| Step | Commentary | Slug | File(s) | Blocks | Translated |',
    '|------|------------|------|---------|--------|------------|',
    ...rows,
    '',
    `**Total:** ${total} blocks | **Done:** ${done} (${pct}%) | **Pending:** ${total - done}`,
  ].join('\n'), 'utf8');
}

// ─── Write status.json ────────────────────────────────────────────────────────

function writeStatus(dir, meta, stats) {
  const total = stats.reduce((a,s) => a + s.totalBlocks, 0);
  const done  = stats.reduce((a,s) => a + s.translatedBlocks, 0);
  fs.writeFileSync(path.join(dir, 'status.json'), JSON.stringify({
    ...meta, totalBlocks: total, translatedBlocks: done,
    pendingBlocks: total - done,
    percentComplete: total > 0 ? Math.round(done/total*100) : 0,
    lastUpdated: new Date().toISOString(),
    sources: stats.map(s => ({ slug: s.slug, total: s.totalBlocks, translated: s.translatedBlocks })),
  }, null, 2), 'utf8');
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTRODUCTION — special handler
// Input:  Introduction/merged.json  (flat "text": [...] array of paragraphs)
// Output: output/intro/introduction.txt
//
// Format differs from main sections — no commentaries, no seifim, no layers.
// Each paragraph gets its own block with a Hebrew letter marker (א, ב, ...).
// ═══════════════════════════════════════════════════════════════════════════════

function processIntroduction(bundleRoot, outRoot, opts) {
  console.log("\n=== Introduction (R' Yosef Karo's preface) ===");

  // Find the JSON — try several possible filenames
  const introDir = path.join(bundleRoot, 'Introduction');
  let introData  = null;

  const candidates = [
    path.join(introDir, 'merged.json'),
    path.join(introDir, 'introduction.json'),
    path.join(introDir, 'Shulchan_Arukh,_Introduction.json'),
  ];

  // Also scan the directory for any matching JSON
  if (fs.existsSync(introDir)) {
    for (const f of fs.readdirSync(introDir).filter(f => f.endsWith('.json'))) {
      candidates.push(path.join(introDir, f));
    }
  }

  for (const c of [...new Set(candidates)]) {
    if (!fs.existsSync(c)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(c, 'utf8'));
      if (data.text && Array.isArray(data.text) && data.text.length > 0) {
        introData = data;
        console.log(`  Found: ${c}`);
        break;
      }
    } catch (e) { /* skip unparseable */ }
  }

  if (!introData) {
    console.log('  No Introduction JSON found — skipping.');
    return { section: 'INTRO', totalBlocks: 0, translatedBlocks: 0 };
  }

  const paragraphs = introData.text;
  console.log(`  Paragraphs: ${paragraphs.length}`);

  const outputDir = path.join(outRoot, 'intro');
  if (!opts.dryRun) fs.mkdirSync(outputDir, { recursive: true });

  const outFile = path.join(outputDir, 'introduction.txt');

  // Load any existing translations (safe re-run)
  const existing    = parsePartFile(outFile);
  let   doneCount   = 0;

  const lines = [
    '# Shulchan Aruch — Introduction',
    `# ${introData.heTitle || ''} — ${introData.title || ''}`,
    `# Author: R' Yosef Karo`,
    `# Source: ${(introData.versions && introData.versions[0] && introData.versions[0][0]) || ''}`,
    '#',
    '# Replace each ENGLISH placeholder with the translation.',
    '# Keep HEBREW lines intact.',
    '# Run apply:dictionary after translating.',
    '',
  ];

  paragraphs.forEach((para, idx) => {
    const marker  = hebrewIndex(idx + 1);
    const key     = `intro|0|0|${marker}`;
    const english = existing[key] || null;
    if (english) doneCount++;

    lines.push(BLOCK_OPEN);
    lines.push(`slug: intro`);
    lines.push(`section: INTRO`);
    lines.push(`siman: 0`);
    lines.push(`seif: 0`);
    lines.push(`marker: ${marker}`);
    lines.push(`paragraph: ${idx + 1}`);
    lines.push(HEB_MARKER);
    lines.push(para);
    lines.push(ENG_MARKER);
    lines.push(english || PLACEHOLDER);
    lines.push(END_MARKER);
    lines.push('');
    lines.push('');
  });

  if (!opts.dryRun) {
    fs.writeFileSync(outFile, lines.join('\n'), 'utf8');

    fs.writeFileSync(path.join(outputDir, 'status.json'), JSON.stringify({
      section: 'Introduction', totalBlocks: paragraphs.length,
      translatedBlocks: doneCount, pendingBlocks: paragraphs.length - doneCount,
      percentComplete: Math.round(doneCount / paragraphs.length * 100),
      lastUpdated: new Date().toISOString(),
    }, null, 2), 'utf8');

    fs.writeFileSync(path.join(outputDir, 'TRANSLATION_QUEUE.md'), [
      '# Introduction — Translation Queue',
      '',
      `**File:** \`intro/introduction.txt\``,
      `**Paragraphs:** ${paragraphs.length}  |  **Translated:** ${doneCount}  |  **Pending:** ${paragraphs.length - doneCount}`,
      '',
      'Replace each `**** ENGLISH ****` with the translation of the paragraph above it.',
      'Keep Hebrew intact. Run `apply:dictionary` after translating.',
      '',
      '| Para | Marker | Status |',
      '|------|--------|--------|',
      ...paragraphs.map((_, i) => {
        const m   = hebrewIndex(i + 1);
        const key = `intro|0|0|${m}`;
        return `| ${i+1} | ${m} | ${existing[key] ? '✓ Translated' : 'Pending'} |`;
      }),
    ].join('\n'), 'utf8');
  }

  console.log(`  ✓ ${paragraphs.length} paragraphs (${doneCount} translated, ${paragraphs.length - doneCount} pending)`);
  return { section: 'INTRO', totalBlocks: paragraphs.length, translatedBlocks: doneCount };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SECTION PROCESSING (OC / YD / EH / CM)
// ═══════════════════════════════════════════════════════════════════════════════

async function processSiman(bundleRoot, sectionKey, simanNum, seifFrom, seifTo, outRoot, opts) {
  const config        = SECTION_CONFIG[sectionKey];
  const sectionFolder = config.folder;

  if (!seifTo) {
    const range = detectSeifRange(bundleRoot, sectionFolder, simanNum);
    seifTo = range.to;
    if (seifTo === 0) return null;
  }

  const simanStr  = String(simanNum).padStart(3,'0');
  const outputDir = path.join(outRoot, sectionKey, `siman_${simanStr}`);
  if (!opts.dryRun) fs.mkdirSync(outputDir, { recursive: true });

  // Collect blocks by slug across all seifim
  const blocksBySlug = {};
  for (let seif = seifFrom; seif <= seifTo; seif++) {
    const bundle = loadSeifBundle(bundleRoot, sectionFolder, simanNum, seif);
    if (!bundle) continue;
    for (const block of extractBlocksFromBundle(bundle, sectionKey, simanNum, seif)) {
      if (!blocksBySlug[block.slug]) blocksBySlug[block.slug] = [];
      blocksBySlug[block.slug].push(block);
    }
  }

  const sourceStats = [];

  for (const slug of SOURCE_ORDER) {
    const blocks  = blocksBySlug[slug] || [];
    const label   = SLUG_LABELS[slug]  || slug;
    const slugDir = path.join(outputDir, slug);

    if (blocks.length === 0) {
      sourceStats.push({ slug, label, directory: slug, parts: [], totalBlocks: 0, translatedBlocks: 0 });
      continue;
    }

    if (!opts.dryRun) fs.mkdirSync(slugDir, { recursive: true });

    // Chunk blocks into parts by character limit
    const parts    = [[]];
    let   curChars = 0;
    for (const block of blocks) {
      const len = (block.hebrewHtml || block.hebrew || '').length;
      if (curChars + len > opts.maxChars && parts[parts.length-1].length > 0) {
        parts.push([]);
        curChars = 0;
      }
      parts[parts.length-1].push(block);
      curChars += len;
    }

    let   translatedBlocks = 0;
    const partStats        = [];

    for (let pi = 0; pi < parts.length; pi++) {
      const partFile = `part-${String(pi+1).padStart(3,'0')}.txt`;
      const partPath = path.join(slugDir, partFile);
      const existing = parsePartFile(partPath);
      if (!opts.dryRun) writePartFile(partPath, parts[pi], existing);
      const trans = Object.keys(existing).length;
      translatedBlocks += trans;
      partStats.push({ file: partFile, blocks: parts[pi].length, translated: trans });
    }

    sourceStats.push({ slug, label, directory: slug, parts: partStats,
      totalBlocks: blocks.length, translatedBlocks });
  }

  if (!opts.dryRun) {
    const meta = { section: config.label, siman: simanNum, seifRange: { from: seifFrom, to: seifTo } };
    writeManifest(outputDir, meta, sourceStats);
    writeTranslationQueue(outputDir, `${config.label} — Siman ${simanNum}`, { from: seifFrom, to: seifTo }, sourceStats);
    writeStatus(outputDir, { siman: simanNum }, sourceStats);
  }

  const total = sourceStats.reduce((a,s) => a + s.totalBlocks, 0);
  const done  = sourceStats.reduce((a,s) => a + s.translatedBlocks, 0);
  if (total > 0)
    console.log(`    Siman ${simanNum}: ${total} blocks (${done} translated, ${total-done} pending)`);

  return { simanNum, totalBlocks: total, translatedBlocks: done };
}

async function processSection(bundleRoot, sectionKey, opts) {
  if (sectionKey === 'INTRO') return processIntroduction(bundleRoot, opts.outRoot, opts);

  const config    = SECTION_CONFIG[sectionKey];
  const [lo, hi]  = config.simanRange;
  const simanNums = opts.siman
    ? [opts.siman]
    : Array.from({ length: hi - lo + 1 }, (_, i) => i + lo);

  console.log(`\n=== ${config.label} (${simanNums.length} simanim) ===`);

  let total = 0, done = 0;
  for (const n of simanNums) {
    const r = await processSiman(bundleRoot, sectionKey, n, opts.from, opts.to||null, opts.outRoot, opts);
    if (r) { total += r.totalBlocks; done += r.translatedBlocks; }
  }

  const pct = total > 0 ? Math.round(done/total*100) : 0;
  console.log(`  ${config.label}: ${total.toLocaleString()} blocks total — ${done} translated (${pct}%)`);
  return { section: sectionKey, totalBlocks: total, translatedBlocks: done };
}

// ─── Global summary ───────────────────────────────────────────────────────────

function writeGlobalSummary(outRoot, results) {
  const total = results.reduce((a,r) => a + r.totalBlocks, 0);
  const done  = results.reduce((a,r) => a + r.translatedBlocks, 0);
  fs.writeFileSync(path.join(outRoot, 'global_status.json'), JSON.stringify({
    generatedAt: new Date().toISOString(), sections: results,
    totals: { totalBlocks: total, translatedBlocks: done,
      pendingBlocks: total - done,
      percentComplete: total > 0 ? Math.round(done/total*100) : 0 },
  }, null, 2), 'utf8');

  console.log('\n  ══════════════════════════════════════');
  console.log('  GLOBAL SUMMARY');
  console.log('  ══════════════════════════════════════');
  for (const r of results) {
    const pct = r.totalBlocks > 0 ? Math.round(r.translatedBlocks/r.totalBlocks*100) : 0;
    console.log(`  ${r.section.padEnd(6)}  ${String(r.totalBlocks).padStart(8)} blocks  ${String(pct).padStart(3)}% translated`);
  }
  console.log('  ──────────────────────────────────────');
  const pct = total > 0 ? Math.round(done/total*100) : 0;
  console.log(`  TOTAL   ${String(total).padStart(8)} blocks  ${String(pct).padStart(3)}% translated`);
  console.log(`          ${String(total-done).padStart(8)} pending`);
  console.log('');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║  Shulchan Aruch Pre-processor        ║');
  console.log('  ║  Zero LLM calls — structural only    ║');
  if (opts.dryRun)
  console.log('  ║  DRY RUN — no files written          ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');

  const bundleRoot = detectBundleRoot(opts);
  if (!opts.dryRun) fs.mkdirSync(opts.outRoot, { recursive: true });

  // Determine sections
  let sectionsToRun;
  if (opts.all && !opts.section) {
    sectionsToRun = ['INTRO','OC','YD','EH','CM'];
  } else if (opts.section) {
    const key = (opts.section === 'INTRODUCTION') ? 'INTRO' : opts.section;
    sectionsToRun = [key];
  } else {
    sectionsToRun = ['OC']; // safe default
  }

  const results = [];
  for (const key of sectionsToRun) {
    if (!SECTION_CONFIG[key]) {
      console.error(`  Unknown section: ${key}. Valid values: OC YD EH CM INTRO`);
      continue;
    }
    results.push(await processSection(bundleRoot, key, opts));
  }

  if (!opts.dryRun && results.length > 1) writeGlobalSummary(opts.outRoot, results);

  console.log(`  Output: ${path.resolve(opts.outRoot)}`);
  console.log('  All placeholder files ready — hand to Cursor/Claude for translation.');
  console.log('');
}

main().catch(err => {
  console.error('\n  Fatal error:', err.message);
  process.exit(1);
});
