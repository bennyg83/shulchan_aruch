#!/usr/bin/env node
/**
 * Audit Mechaber English across a siman range.
 *   node pipeline/work/_scan-mechaber-range.mjs --from 100 --to 299
 *   node pipeline/work/_scan-mechaber-range.mjs --from 100 --to 299 --write-json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlocksInFile } from '../../yd001_block_lib.mjs';
import { runBlockQualityChecks, plainFromHtml } from '../lib/quality-checks.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');

const GREP = [
  [/Lord['\u2019]s Prayer/i, 'grep_lords_prayer'],
  [/Hashem['\u2019]s promise/i, 'grep_hashem_promise'],
  [/Hashem['\u2019]s Word/i, 'grep_hashem_word'],
  [/\bArab people\b/i, 'grep_arab_people'],
  [/\bSaturday\b/i, 'grep_saturday'],
  [/MYMEMORY/i, 'grep_mymemory'],
  [/\bhand recoils\b/i, 'grep_hand_recoils'],
  [/\bher age\b/i, 'grep_her_age'],
  [/\bthe craft\b/i, 'grep_the_craft'],
  [/\bCapernaum\b/i, 'grep_capernaum'],
  [/\bISIS\b/i, 'grep_isis'],
  [/\bthe psalmist\b/i, 'grep_psalmist'],
  [/\bHoly Qur/i, 'grep_quran'],
  [/\bwriter begins\b/i, 'grep_writer_begins'],
  [/\bnear the suns\b/i, 'grep_near_suns'],
  [/\bthe suns of\b/i, 'grep_suns_of'],
  [/\brebellious tongue\b/i, 'grep_rebellious'],
  [/\bIAEA\b/i, 'grep_iaea'],
  [/\bthe pronunciation\b/i, 'grep_pronunciation_hagah'],
  [/\bin a ovary\b/i, 'grep_ovary'],
];

/** Extra heuristics for English-only garbage that slips past mt_garbage regex. */
const SUSPICIOUS_RE = [
  [/\bchecker to crawl\b/i, 'suspicious_checker_crawl'],
  [/\bpartition examined\b/i, 'suspicious_partition'],
  [/\bthe thorn\b/i, 'suspicious_thorn_tahara'],
  [/\bcounties between\b/i, 'suspicious_counties'],
  [/\bcigarette\b/i, 'suspicious_cigarette'],
  [/\bthe gardener\b/i, 'suspicious_gardener'],
  [/\bthe sun should wait\b/i, 'suspicious_sun_wait'],
  [/\bwas sung and saw\b/i, 'suspicious_sung'],
  [/\bWomen's Duchy\b/i, 'suspicious_duchy'],
  [/\bfall Arab\b/i, 'suspicious_fall_arab'],
];

function parseArgs() {
  let from = 100, to = 299, writeJson = false, minLevel = 'warn';
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--from') from = +args[++i];
    else if (args[i] === '--to') to = +args[++i];
    else if (args[i] === '--write-json') writeJson = true;
    else if (args[i] === '--min-level') minLevel = args[++i];
  }
  return { from, to, writeJson, minLevel };
}

const opts = parseArgs();
const SEV = { error: 3, warn: 2, info: 1 };
const minSev = SEV[opts.minLevel] ?? 2;

const failing = [];
let totalBlocks = 0;
let simanimWithMechaber = 0;

for (let s = opts.from; s <= opts.to; s++) {
  const simDir = path.join(OUT, `siman_${String(s).padStart(3, '0')}`, 'mechaber');
  if (!fs.existsSync(simDir)) continue;
  simanimWithMechaber++;
  for (const f of fs.readdirSync(simDir).filter((x) => x.endsWith('.txt'))) {
    const rel = `siman_${String(s).padStart(3, '0')}/mechaber/${f}`;
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(simDir, f), 'utf8'))) {
      const he = String(b.he ?? '').trim();
      if (!he) continue;
      totalBlocks++;
      const enPlain = plainFromHtml(b.en);
      const issues = runBlockQualityChecks(b).filter((i) => (SEV[i.severity] ?? 0) >= minSev);
      const grep = [];
      for (const [re, id] of GREP) {
        if (re.test(enPlain)) grep.push(id);
      }
      const suspicious = [];
      for (const [re, id] of SUSPICIOUS_RE) {
        if (re.test(enPlain)) suspicious.push(id);
      }
      if (!issues.length && !grep.length && !suspicious.length) continue;
      const key = `${b.seif}#${b.marker || 'main'}`;
      failing.push({
        siman: s,
        key,
        rel,
        seif: b.seif,
        marker: b.marker || 'main',
        codes: [...issues.map((i) => i.code), ...grep, ...suspicious],
        hePreview: plainFromHtml(b.he).slice(0, 120),
        enPreview: enPlain.slice(0, 160),
      });
    }
  }
}

const bySiman = {};
for (const b of failing) {
  bySiman[b.siman] = (bySiman[b.siman] || 0) + 1;
}

console.log(`Mechaber audit ${opts.from}–${opts.to}: ${simanimWithMechaber} simanim, ${totalBlocks} blocks`);
console.log(`Flagged: ${failing.length} blocks in ${Object.keys(bySiman).length} simanim`);
const sorted = Object.entries(bySiman).sort((a, b) => b[1] - a[1]);
for (const [s, n] of sorted.slice(0, 40)) console.log(`  siman_${s}: ${n}`);
if (sorted.length > 40) console.log(`  ... +${sorted.length - 40} more simanim`);

if (opts.writeJson) {
  const outPath = path.join(ROOT, 'pipeline/work', `_mechaber-audit-${opts.from}-${opts.to}.json`);
  fs.writeFileSync(outPath, JSON.stringify(failing, null, 2), 'utf8');
  console.log(`Wrote ${outPath}`);
}
