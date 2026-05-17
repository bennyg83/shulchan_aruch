#!/usr/bin/env node
/**
 * sa-checklist.mjs
 *
 * Scans the entire output directory produced by sa-preprocess.mjs
 * and builds a detailed translation progress checklist.
 *
 * USAGE:
 *   node sa-checklist.mjs                        (scans ./output)
 *   node sa-checklist.mjs --out "C:\path\output" (custom output dir)
 *   node sa-checklist.mjs --section OC           (one section only)
 *   node sa-checklist.mjs --siman 318            (one siman only)
 *   node sa-checklist.mjs --pending-only         (hide completed items)
 *   node sa-checklist.mjs --format md            (markdown, default)
 *   node sa-checklist.mjs --format csv           (CSV for spreadsheet)
 *   node sa-checklist.mjs --format json          (machine-readable)
 *
 * OUTPUT FILES (default: ./checklist-output next to this script unless --report-dir):
 *   checklist.md           full markdown report
 *   checklist.csv          spreadsheet-friendly
 *   checklist.json         machine-readable summary
 *   checklist_pending.md   pending items only (always written)
 *
 * LAYOUTS:
 *   sa-preprocess:  output/<OC|YD|EH|CM>/siman_NNN/<slug>/part-*.txt
 *   OC001 bundle:   output/siman_NNN/<slug>/part-*.txt
 *   legacy siman 1: output/<slug>/part-*.txt (only if output/siman_001 is absent)
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

// ─── Constants ────────────────────────────────────────────────────────────────

const PLACEHOLDER    = 'English translation pending';
const END_MARKER     = '**** END BLOCK ****';
const HEB_MARKER     = '**** HEBREW ****';
const ENG_MARKER     = '**** ENGLISH ****';

const SECTION_LABELS = {
  intro: 'Introduction',
  OC:    'Orach Chayyim',
  YD:    "Yoreh De'ah",
  EH:    'Even HaEzer',
  CM:    'Choshen Mishpat',
};

const SLUG_LABELS = {
  'mechaber':             'Mechaber and Rama',
  'intro':                "R' Yosef Karo's Introduction",
  'ateret-zekenim':       'Ateret Zekeinim',
  'baer-heitev':          'Baer Hetev',
  'beer-hagolah':         "Be'er HaGolah",
  'beur-hagra':           'Biur HaGRA',
  'biur-halacha':         'Biur Halacha',
  'chatam-sofer':         'Chatam Sofer',
  'chokhmat-shlomo':      'Chokhmat Shlomo',
  'chok-yaakov':          'Chok Yaakov',
  'dagul-merevavah':      'Dagul Merevavah',
  'eliyah-rabbah':        'Eliyah Rabbah',
  'eshel-avraham':        'Eshel Avraham',
  'kaf-hachayyim':        'Kaf HaChayyim',
  'kol-yaakov':           'Kol Yaakov',
  'levushei-serad':       'Levushei Serad',
  'machatzit-hashekel':   'Machatzit HaShekel',
  'magen-avraham':        'Magen Avraham',
  'mishnah-berurah':      'Mishnah Berurah',
  'netiv-chayim':         'Netiv Chayim',
  'peri-megadim':         'Peri Megadim',
  'rabbi-akiva-eiger':    'Rabbi Akiva Eiger',
  'shaarei-teshuvah':     'Shaarei Teshuvah',
  'turei-zahav':          'Turei Zahav (Taz)',
  'yad-ephraim':          'Yad Ephraim',
  'siftei-kohen':         'Siftei Kohen (Shach)',
  'tiferet-yisrael':      'Tiferet Yisrael',
  'torat-hashlamim':      'Torat HaShlamim',
  'pitchei-teshuva':      'Pitchei Teshuva',
  'peleti':               'Peleti',
  'yad-avraham':          'Yad Avraham',
  'peri-megadim-yd':      'Peri Megadim (YD)',
  'rabbi-akiva-eiger-yd': 'Rabbi Akiva Eiger (YD)',
};

// ─── CLI ──────────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot:     'output',
    section:     null,
    siman:       null,
    pendingOnly: false,
    format:      'md',
    reportDir:   null,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--out':          opts.outRoot     = args[++i]; break;
      case '--section':      opts.section     = args[++i].toUpperCase(); break;
      case '--siman':        opts.siman       = parseInt(args[++i]); break;
      case '--pending-only': opts.pendingOnly = true; break;
      case '--format':       opts.format      = args[++i].toLowerCase(); break;
      case '--report-dir':   opts.reportDir   = args[++i]; break;
    }
  }
  return opts;
}

// ─── Block parser ─────────────────────────────────────────────────────────────

function parsePartFile(filePath, defaultSiman = 0) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const results = [];

  for (const raw of content.split(END_MARKER)) {
    if (!raw.includes(HEB_MARKER)) continue;
    const lines = raw.split('\n');
    const get   = prefix => (lines.find(l => l.startsWith(prefix)) || '').replace(prefix, '').trim();

    const slug   = get('slug:');
    const fromHdr = parseInt(get('siman:'), 10);
    const siman  = Number.isFinite(fromHdr) && fromHdr > 0 ? fromHdr : (defaultSiman || 0);
    const seif   = parseInt(get('seif:'))  || 0;
    const marker = get('marker:');
    const para   = get('paragraph:');

    const ei      = lines.findIndex(l => l.trim() === ENG_MARKER);
    const english = ei >= 0 ? lines.slice(ei + 1).join('\n').trim() : '';
    const firstEngLine = english.split(/\r?\n/).map(l => l.trim()).find(Boolean) || '';
    const done    = firstEngLine.length > 0 && !firstEngLine.startsWith(PLACEHOLDER);

    // Get first line of Hebrew for reference
    const hi      = lines.findIndex(l => l.trim() === HEB_MARKER);
    const hebSnip = hi >= 0
      ? lines.slice(hi + 1).find(l => l.trim())?.replace(/<[^>]+>/g, '').slice(0, 60) || ''
      : '';

    results.push({ slug, siman, seif, marker, para, translated: done, hebSnip });
  }
  return results;
}

// ─── Scan one slug directory ──────────────────────────────────────────────────

function scanSlugDir(slugDir, slug, defaultSiman = 0) {
  if (!fs.existsSync(slugDir)) return [];
  const blocks = [];
  const files  = fs.readdirSync(slugDir).filter(f => /^part-\d+\.txt$/i.test(f)).sort();
  for (const f of files) {
    blocks.push(...parsePartFile(path.join(slugDir, f), defaultSiman));
  }
  return blocks;
}

// ─── Scan one siman directory ─────────────────────────────────────────────────

function scanSimanDir(simanDir, sectionKey, simanNum) {
  const result = {
    section:    sectionKey,
    siman:      simanNum,
    slugs:      {},
    total:      0,
    translated: 0,
    pending:    0,
  };

  if (!fs.existsSync(simanDir)) return result;

  // Each subdirectory is a slug
  const entries = fs.readdirSync(simanDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug   = entry.name;
    const blocks = scanSlugDir(path.join(simanDir, slug), slug, simanNum);
    if (blocks.length === 0) continue;

    const done    = blocks.filter(b => b.translated).length;
    const pending = blocks.length - done;

    result.slugs[slug] = { total: blocks.length, translated: done, pending, blocks };
    result.total      += blocks.length;
    result.translated += done;
    result.pending    += pending;
  }

  return result;
}

// ─── Scan Introduction ────────────────────────────────────────────────────────

function scanIntro(outRoot) {
  const introFile = path.join(outRoot, 'intro', 'introduction.txt');
  if (!fs.existsSync(introFile)) return null;

  const blocks   = parsePartFile(introFile);
  const done     = blocks.filter(b => b.translated).length;

  return {
    section:    'INTRO',
    siman:      0,
    slugs:      { intro: { total: blocks.length, translated: done, pending: blocks.length - done, blocks } },
    total:      blocks.length,
    translated: done,
    pending:    blocks.length - done,
  };
}

// ─── Scan entire output tree ──────────────────────────────────────────────────

function scanOutputTree(opts) {
  const { outRoot, section, siman } = opts;
  const allResults = [];

  // Introduction
  if (!section || section === 'INTRO' || section === 'INTRODUCTION') {
    const intro = scanIntro(outRoot);
    if (intro) allResults.push(intro);
  }

  // Main sections
  const sections = section && section !== 'INTRO' && section !== 'INTRODUCTION'
    ? [section]
    : ['OC', 'YD', 'EH', 'CM'];

  for (const sec of sections) {
    const secDir = path.join(outRoot, sec);
    if (!fs.existsSync(secDir)) continue;

    const simanDirs = fs.readdirSync(secDir, { withFileTypes: true })
      .filter(e => e.isDirectory() && /^siman_\d{3}$/.test(e.name))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of simanDirs) {
      const simanNum = parseInt(entry.name.replace('siman_', ''));
      if (siman && simanNum !== siman) continue;

      const result = scanSimanDir(path.join(secDir, entry.name), sec, simanNum);
      if (result.total > 0) allResults.push(result);
    }
  }

  // OC001 / flat layout: siman_NNN directly under outRoot (no OC/ parent)
  const oc001 = scanOc001Layout(outRoot, opts);
  for (const r of oc001) {
    if (r.total > 0) allResults.push(r);
  }

  const sectionOrder = { INTRO: 0, OC: 1, YD: 2, EH: 3, CM: 4 };
  allResults.sort((a, b) => {
    const da = sectionOrder[a.section] ?? 99;
    const db = sectionOrder[b.section] ?? 99;
    if (da !== db) return da - db;
    return a.siman - b.siman;
  });

  return allResults;
}

/** OC001: output/siman_NNN/<slug>/part-*.txt; legacy siman 1: output/<slug>/ when siman_001 missing */
function scanOc001Layout(outRoot, opts) {
  const { section, siman } = opts;
  // OC001 bundle lives under Orach Chayyim only (not YD/EH/CM/intro-only runs)
  if (section && section !== 'OC' && section !== 'OC001') return [];

  const results = [];
  const siman001Path = path.join(outRoot, 'siman_001');

  const entries = fs.existsSync(outRoot)
    ? fs.readdirSync(outRoot, { withFileTypes: true })
    : [];

  const simanDirs = entries
    .filter(e => e.isDirectory() && /^siman_\d{3}$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of simanDirs) {
    const simanNum = parseInt(entry.name.replace(/^siman_/i, ''), 10);
    if (siman && simanNum !== siman) continue;

    const result = scanSimanDir(path.join(outRoot, entry.name), 'OC', simanNum);
    if (result.total > 0) results.push(result);
  }

  if (!fs.existsSync(siman001Path)) {
    const flat = scanFlatSiman1(outRoot, opts);
    if (flat && flat.total > 0) results.push(flat);
  }

  return results;
}

const FLAT_SIMAN1_SKIP = new Set(
  ['intro', 'oc', 'yd', 'eh', 'cm', 'tools', '_checklist', 'checklist-output', '_reports'].map(s => s.toLowerCase()),
);

function scanFlatSiman1(outRoot, opts) {
  const { siman } = opts;
  if (siman && siman !== 1) return null;

  const result = {
    section:    'OC',
    siman:      1,
    slugs:      {},
    total:      0,
    translated: 0,
    pending:    0,
  };

  const entries = fs.readdirSync(outRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (/^siman_\d{3}$/i.test(name)) continue;
    if (FLAT_SIMAN1_SKIP.has(name.toLowerCase())) continue;

    const slugDir = path.join(outRoot, name);
    const hasParts = fs.readdirSync(slugDir).some(f => /^part-\d+\.txt$/i.test(f));
    if (!hasParts) continue;

    const blocks = scanSlugDir(slugDir, name, 1);
    if (blocks.length === 0) continue;

    const done    = blocks.filter(b => b.translated).length;
    const pending = blocks.length - done;

    result.slugs[name] = { total: blocks.length, translated: done, pending, blocks };
    result.total      += blocks.length;
    result.translated += done;
    result.pending    += pending;
  }

  return result.total > 0 ? result : null;
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function progressBar(done, total, width = 20) {
  if (total === 0) return '[──────────────────────]   0%';
  const pct   = done / total;
  const filled = Math.round(pct * width);
  const bar   = '█'.repeat(filled) + '░'.repeat(width - filled);
  return `[${bar}] ${String(Math.round(pct * 100)).padStart(3)}%`;
}

function statusIcon(done, total) {
  if (total === 0)       return '⬜';
  if (done === total)    return '✅';
  if (done === 0)        return '🔴';
  if (done / total < 0.5) return '🟡';
  return '🟢';
}

// ─── Build markdown report ────────────────────────────────────────────────────

function buildMarkdown(results, opts) {
  const now          = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const grandTotal   = results.reduce((a, r) => a + r.total, 0);
  const grandDone    = results.reduce((a, r) => a + r.translated, 0);
  const grandPending = grandTotal - grandDone;
  const grandPct     = grandTotal > 0 ? Math.round(grandDone / grandTotal * 100) : 0;

  const lines = [
    '# Shulchan Aruch — Translation Progress Checklist',
    '',
    `Generated: ${now}`,
    '',
    '## Overall Progress',
    '',
    `${progressBar(grandDone, grandTotal, 30)}`,
    '',
    `| Metric | Count |`,
    `|--------|-------|`,
    `| Total blocks | ${grandTotal.toLocaleString()} |`,
    `| Translated   | ${grandDone.toLocaleString()} (${grandPct}%) |`,
    `| Pending      | ${grandPending.toLocaleString()} |`,
    '',
    '---',
    '',
  ];

  // Group by section
  const bySection = {};
  for (const r of results) {
    const key = r.section;
    if (!bySection[key]) bySection[key] = [];
    bySection[key].push(r);
  }

  for (const [secKey, simanResults] of Object.entries(bySection)) {
    const secLabel   = SECTION_LABELS[secKey] || secKey;
    const secTotal   = simanResults.reduce((a, r) => a + r.total, 0);
    const secDone    = simanResults.reduce((a, r) => a + r.translated, 0);
    const secPending = secTotal - secDone;
    const secPct     = secTotal > 0 ? Math.round(secDone / secTotal * 100) : 0;
    const icon       = statusIcon(secDone, secTotal);

    lines.push(`## ${icon} ${secLabel}`);
    lines.push('');
    lines.push(`${progressBar(secDone, secTotal, 25)}  ${secDone.toLocaleString()} / ${secTotal.toLocaleString()} blocks`);
    lines.push('');

    // Section summary table
    lines.push('| Siman | Total | Done | Pending | Progress |');
    lines.push('|-------|-------|------|---------|----------|');

    for (const r of simanResults) {
      if (opts.pendingOnly && r.pending === 0) continue;
      const simanLabel = r.siman === 0 ? 'Intro' : `Siman ${r.siman}`;
      const icon2      = statusIcon(r.translated, r.total);
      lines.push(`| ${icon2} ${simanLabel} | ${r.total} | ${r.translated} | ${r.pending} | ${progressBar(r.translated, r.total, 10)} |`);
    }

    lines.push('');

    // Drill into each siman's slugs
    for (const r of simanResults) {
      if (r.pending === 0 && opts.pendingOnly) continue;

      const simanLabel = r.siman === 0 ? 'Introduction' : `Siman ${r.siman}`;
      lines.push(`### ${statusIcon(r.translated, r.total)} ${secLabel} — ${simanLabel}`);
      lines.push('');
      lines.push('| Commentary | Total | Done | Pending | Status |');
      lines.push('|------------|-------|------|---------|--------|');

      for (const [slug, s] of Object.entries(r.slugs)) {
        if (opts.pendingOnly && s.pending === 0) continue;
        const label = SLUG_LABELS[slug] || slug;
        const icon3 = statusIcon(s.translated, s.total);
        lines.push(`| ${icon3} ${label} | ${s.total} | ${s.translated} | ${s.pending} | ${progressBar(s.translated, s.total, 8)} |`);
      }

      lines.push('');

      // List individual pending blocks
      if (!opts.pendingOnly) {
        // Only show pending block details if there are some
        const pendingBlocks = [];
        for (const [slug, s] of Object.entries(r.slugs)) {
          for (const b of s.blocks) {
            if (!b.translated) {
              pendingBlocks.push({ slug, seif: b.seif, marker: b.marker, hebSnip: b.hebSnip });
            }
          }
        }
        if (pendingBlocks.length > 0 && pendingBlocks.length <= 50) {
          lines.push('<details>');
          lines.push(`<summary>Pending blocks (${pendingBlocks.length})</summary>`);
          lines.push('');
          lines.push('| Commentary | Seif | Marker | Hebrew preview |');
          lines.push('|------------|------|--------|----------------|');
          for (const b of pendingBlocks) {
            const label = SLUG_LABELS[b.slug] || b.slug;
            lines.push(`| ${label} | ${b.seif} | ${b.marker} | ${b.hebSnip}… |`);
          }
          lines.push('');
          lines.push('</details>');
          lines.push('');
        }
      }
    }

    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

// ─── Build pending-only markdown ──────────────────────────────────────────────

function buildPendingMarkdown(results) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const lines = [
    '# Pending Translations — Work Queue',
    '',
    `Generated: ${now}`,
    '',
    '> This file lists only incomplete items. Use as a work queue for Cursor/Claude.',
    '',
  ];

  for (const r of results) {
    if (r.pending === 0) continue;
    const secLabel   = SECTION_LABELS[r.section] || r.section;
    const simanLabel = r.siman === 0 ? 'Introduction' : `Siman ${r.siman}`;

    lines.push(`## ${secLabel} — ${simanLabel}  (${r.pending} pending)`);
    lines.push('');

    for (const [slug, s] of Object.entries(r.slugs)) {
      if (s.pending === 0) continue;
      const label = SLUG_LABELS[slug] || slug;
      lines.push(`### ${label}  (${s.pending} / ${s.total} pending)`);
      lines.push('');
      lines.push('| Seif | Marker | Hebrew preview |');
      lines.push('|------|--------|----------------|');

      for (const b of s.blocks) {
        if (!b.translated) {
          lines.push(`| ${b.seif || b.para || '—'} | ${b.marker} | ${b.hebSnip}… |`);
        }
      }
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  if (lines.length <= 10) {
    lines.push('## 🎉 Everything is translated!');
    lines.push('');
  }

  return lines.join('\n');
}

// ─── Build CSV ────────────────────────────────────────────────────────────────

function buildCSV(results) {
  const rows = ['Section,Siman,Commentary,Total Blocks,Translated,Pending,Percent Complete'];

  for (const r of results) {
    const secLabel = SECTION_LABELS[r.section] || r.section;
    for (const [slug, s] of Object.entries(r.slugs)) {
      const label = SLUG_LABELS[slug] || slug;
      const pct   = s.total > 0 ? Math.round(s.translated / s.total * 100) : 0;
      rows.push(`"${secLabel}",${r.siman === 0 ? 'Intro' : r.siman},"${label}",${s.total},${s.translated},${s.pending},${pct}%`);
    }
  }

  return rows.join('\n');
}

// ─── Build JSON summary ───────────────────────────────────────────────────────

function buildJSON(results) {
  const grandTotal   = results.reduce((a, r) => a + r.total, 0);
  const grandDone    = results.reduce((a, r) => a + r.translated, 0);

  return JSON.stringify({
    generatedAt:      new Date().toISOString(),
    grandTotal,
    grandTranslated:  grandDone,
    grandPending:     grandTotal - grandDone,
    percentComplete:  grandTotal > 0 ? Math.round(grandDone / grandTotal * 100) : 0,
    sections: results.map(r => ({
      section:    r.section,
      siman:      r.siman,
      total:      r.total,
      translated: r.translated,
      pending:    r.pending,
      pct:        r.total > 0 ? Math.round(r.translated / r.total * 100) : 0,
      commentaries: Object.entries(r.slugs).map(([slug, s]) => ({
        slug,
        label:      SLUG_LABELS[slug] || slug,
        total:      s.total,
        translated: s.translated,
        pending:    s.pending,
      })),
    })),
  }, null, 2);
}

// ─── Console summary ──────────────────────────────────────────────────────────

function printConsoleSummary(results) {
  const grandTotal   = results.reduce((a, r) => a + r.total, 0);
  const grandDone    = results.reduce((a, r) => a + r.translated, 0);
  const grandPending = grandTotal - grandDone;
  const grandPct     = grandTotal > 0 ? Math.round(grandDone / grandTotal * 100) : 0;

  console.log('');
  console.log('  ╔══════════════════════════════════════════════════════╗');
  console.log('  ║  Translation Progress Summary                        ║');
  console.log('  ╚══════════════════════════════════════════════════════╝');
  console.log('');

  // Per-section summary
  const bySection = {};
  for (const r of results) {
    if (!bySection[r.section]) bySection[r.section] = { total: 0, done: 0, simanim: 0 };
    bySection[r.section].total  += r.total;
    bySection[r.section].done   += r.translated;
    bySection[r.section].simanim++;
  }

  console.log('  Section          Simanim   Blocks    Done      Pending   Progress');
  console.log('  ───────────────────────────────────────────────────────────────────');

  for (const [sec, s] of Object.entries(bySection)) {
    const label   = (SECTION_LABELS[sec] || sec).padEnd(16);
    const pct     = s.total > 0 ? Math.round(s.done / s.total * 100) : 0;
    const bar     = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
    const icon    = s.done === s.total ? '✅' : s.done === 0 ? '🔴' : s.done/s.total < 0.5 ? '🟡' : '🟢';
    console.log(`  ${icon} ${label} ${String(s.simanim).padStart(5)}   ${String(s.total).padStart(7)}   ${String(s.done).padStart(7)}   ${String(s.total-s.done).padStart(7)}   [${bar}] ${pct}%`);
  }

  console.log('  ───────────────────────────────────────────────────────────────────');
  const bar = '█'.repeat(Math.round(grandPct / 5)) + '░'.repeat(20 - Math.round(grandPct / 5));
  console.log(`  TOTAL                       ${String(grandTotal).padStart(7)}   ${String(grandDone).padStart(7)}   ${String(grandPending).padStart(7)}   [${bar}] ${grandPct}%`);
  console.log('');

  // Top pending simanim
  const pendingSimanim = results
    .filter(r => r.pending > 0)
    .sort((a, b) => b.pending - a.pending)
    .slice(0, 10);

  if (pendingSimanim.length > 0) {
    console.log('  Top pending (by block count):');
    for (const r of pendingSimanim) {
      const secLabel   = SECTION_LABELS[r.section] || r.section;
      const simanLabel = r.siman === 0 ? 'Intro' : `Siman ${r.siman}`;
      console.log(`    ${secLabel.padEnd(18)} ${simanLabel.padEnd(12)} ${r.pending} pending`);
    }
    console.log('');
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║  Shulchan Aruch — Checklist Builder  ║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
  console.log(`  Scanning: ${path.resolve(opts.outRoot)}`);

  if (!fs.existsSync(opts.outRoot)) {
    console.error(`\n  Error: output directory not found: ${opts.outRoot}`);
    console.error('  Run sa-preprocess.mjs first to generate the output directory.');
    process.exit(1);
  }

  // Scan
  console.log('  Reading translation files...');
  const results = scanOutputTree(opts);

  if (results.length === 0) {
    console.log('  No processed files found. Run sa-preprocess.mjs first.');
    process.exit(0);
  }

  // Console summary
  printConsoleSummary(results);

  // Write reports (default: checklist-output next to this script)
  const reportDir = opts.reportDir ?? path.join(SCRIPT_DIR, 'checklist-output');
  fs.mkdirSync(reportDir, { recursive: true });

  const written = [];

  // Always write full markdown
  const mdPath = path.join(reportDir, 'checklist.md');
  fs.writeFileSync(mdPath, buildMarkdown(results, { ...opts, pendingOnly: false }), 'utf8');
  written.push(mdPath);

  // Always write pending-only markdown
  const pendingPath = path.join(reportDir, 'checklist_pending.md');
  fs.writeFileSync(pendingPath, buildPendingMarkdown(results), 'utf8');
  written.push(pendingPath);

  // Always write JSON summary
  const jsonPath = path.join(reportDir, 'checklist.json');
  fs.writeFileSync(jsonPath, buildJSON(results), 'utf8');
  written.push(jsonPath);

  // Always write CSV
  const csvPath = path.join(reportDir, 'checklist.csv');
  fs.writeFileSync(csvPath, buildCSV(results), 'utf8');
  written.push(csvPath);

  console.log('  Reports written:');
  for (const p of written) console.log(`    ${p}`);
  console.log('');
  console.log('  checklist.md          — full report with progress bars');
  console.log('  checklist_pending.md  — work queue for Cursor/Claude');
  console.log('  checklist.json        — machine-readable for pipeline');
  console.log('  checklist.csv         — open in Excel/Sheets');
  console.log('');
}

main().catch(err => {
  console.error('\n  Fatal error:', err.message);
  process.exit(1);
});
