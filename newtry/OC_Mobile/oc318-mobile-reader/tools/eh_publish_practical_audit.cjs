const fs = require('fs');
const path = require('path');

const repoRoot = process.argv[2] || process.cwd();
const ehRoot = process.argv[3] || 'C:/Users/binya/Documents/Shulchan aruch/newtry/EH_001';
const corpusRoot = path.join(repoRoot, 'public', 'corpus', 'eh1');
const outputRoot = path.join(ehRoot, 'output');

const reportPath = path.join(repoRoot, 'eh_publish_practical_audit_report.json');
const csvPath = path.join(repoRoot, 'eh_publish_practical_audit_issues.csv');

function exists(file) {
  try {
    return fs.existsSync(file);
  } catch {
    return false;
  }
}

function read(file) {
  return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
}

function walk(dir, pred, out = []) {
  if (!exists(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, pred, out);
    else if (pred(p)) out.push(p);
  }
  return out;
}

function rel(base, file) {
  return path.relative(base, file).replace(/\//g, '\\');
}

function brSegs(html) {
  return html.split(/<br\s*\/?>/i).filter(s => s.trim());
}

function stripTags(s) {
  return s
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function compactLen(s) {
  return stripTags(s).replace(/\s+/g, '').length;
}

function csvEscape(s) {
  s = String(s ?? '');
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function sample(s) {
  return String(s || '').replace(/\s+/g, ' ').trim().slice(0, 300);
}

const garbagePatterns = [
  /\bKGB\b/i,
  /\bISIS\b/i,
  /\bterrorist\b/i,
  /Lord's Prayer/i,
  /Heaven's people/i,
  /\bM\.M\.M\./,
  /\bD\.D\.D\./,
  /starwork/i,
  /lycott/i,
  /hand recoils/i,
  /first dish/i,
  /Saturday used for Shabbat/i,
  /\bR English\b/i,
  /\bfurther further\b/i,
  /\bmeaning meaning\b/i,
  /\bthere is no is not\b/i,
  /\bsafek demon\b/i,
  /\bifwrote\b/i,
  /\bBible and the Bible\b/i,
  /\bThe Bible (?:says|wrote)\b/i,
  /\bNamed to\b/i,
  /\baccording to\. ketubah wrote/i,
  /\bdemon"?\s+Shach\b/i,
];

const placeholderPatterns = [
  /translation pending/i,
  /\bTODO\b/i,
  /\bPLACEHOLDER\b/i,
  /\[translation\]/i,
  /\[TODO\]/i,
  /\bneeds translation\b/i,
];

const mojibakePatterns = [
  /×[\x80-\xBF]/,
  /×[^\s]{1,2}×/,
  /�/,
  /Ã[\x80-\xBF]/,
];

const issues = [];

function add(scope, severity, type, file, detail = '', text = '') {
  issues.push({ scope, severity, type, file, detail, sample: sample(text) });
}

function checkEnglish(scope, file, en, he = '') {
  for (const re of garbagePatterns) {
    const m = en.match(re);
    if (m) add(scope, 'blocker', 'garbage_pattern', file, re.source, m[0]);
  }
  for (const re of placeholderPatterns) {
    const m = en.match(re);
    if (m) add(scope, 'blocker', 'placeholder', file, re.source, m[0]);
  }
  for (const re of mojibakePatterns) {
    const m = en.match(re);
    if (m) add(scope, 'blocker', 'mojibake_in_english', file, re.source, m[0]);
  }

  const enText = stripTags(en);
  const hebrewRuns = [...enText.matchAll(/[\u0590-\u05FF][\u0590-\u05FF\s"'.,:;()\-]{2,}/g)]
    .map(m => m[0].trim())
    .filter(s => s.replace(/\s+/g, '').length >= 4);
  if (hebrewRuns.length) {
    add(scope, 'review', 'hebrew_in_english', file, `count=${hebrewRuns.length}`, hebrewRuns.slice(0, 5).join(' | '));
  }

  if (he) {
    const heLen = compactLen(he);
    const enLen = compactLen(en);
    if (heLen > 120 && enLen > 0) {
      const ratio = enLen / heLen;
      if (ratio < 0.25) {
        add(scope, 'review', 'extreme_short_length_ratio', file, `ratio=${ratio.toFixed(2)}; heChars=${heLen}; enChars=${enLen}`, en);
      } else if (ratio > 10) {
        add(scope, 'review', 'extreme_long_length_ratio', file, `ratio=${ratio.toFixed(2)}; heChars=${heLen}; enChars=${enLen}`, en);
      }
    }
  }
}

const enFiles = walk(
  corpusRoot,
  p => path.basename(p).toLowerCase() === 'en.html' && !p.includes(`${path.sep}bundles${path.sep}`),
);
let corpusPairs = 0;
for (const enPath of enFiles) {
  const hePath = path.join(path.dirname(enPath), 'he.html');
  const r = rel(corpusRoot, enPath);
  if (!exists(hePath)) {
    add('corpus', 'blocker', 'missing_he', r);
    continue;
  }
  corpusPairs++;
  const en = read(enPath).trim();
  const he = read(hePath).trim();
  const enSegs = brSegs(en);
  const heSegs = brSegs(he);
  if (!en) add('corpus', 'blocker', 'empty_en', r);
  if (!he) add('corpus', 'blocker', 'empty_he', rel(corpusRoot, hePath));
  if (enSegs.length !== heSegs.length) {
    add('corpus', 'blocker', 'segment_mismatch', r, `he=${heSegs.length}; en=${enSegs.length}`);
  }
  checkEnglish('corpus', r, en, he);
}

const bundleFiles = walk(path.join(corpusRoot, 'bundles'), p => /\.json$/i.test(p));
for (const f of bundleFiles) {
  try {
    JSON.parse(read(f));
  } catch (e) {
    add('bundle', 'blocker', 'invalid_json', rel(corpusRoot, f), e.message);
  }
}

const txtFiles = walk(outputRoot, p => /part-\d+\.txt$/i.test(p));
let sourceBlocks = 0;
const blockMarker = '**** EH001 SOURCE BLOCK ****';
const heMarker = '**** HEBREW ****';
const enMarker = '**** ENGLISH ****';
const endMarker = '**** END BLOCK ****';
for (const file of txtFiles) {
  const raw = read(file);
  const blocks = raw.split(blockMarker).slice(1);
  if (!blocks.length) add('source', 'blocker', 'no_blocks', rel(outputRoot, file));
  blocks.forEach((b, index) => {
    sourceBlocks++;
    const heIdx = b.indexOf(heMarker);
    const enIdx = b.indexOf(enMarker);
    const endIdx = b.indexOf(endMarker);
    const r = `${rel(outputRoot, file)}#${index}`;
    if (heIdx < 0 || enIdx < 0 || endIdx < 0 || !(heIdx < enIdx && enIdx < endIdx)) {
      add('source', 'blocker', 'malformed_block', r);
      return;
    }
    const he = b.slice(heIdx + heMarker.length, enIdx).trim();
    const en = b.slice(enIdx + enMarker.length, endIdx).trim();
    if (!he) add('source', 'blocker', 'empty_he', r);
    if (!en) add('source', 'blocker', 'empty_en', r);
    checkEnglish('source', r, en, he);
  });
}

const bySeverity = {};
const byType = {};
for (const issue of issues) {
  bySeverity[issue.severity] = (bySeverity[issue.severity] || 0) + 1;
  const key = `${issue.scope}:${issue.type}`;
  byType[key] = (byType[key] || 0) + 1;
}

const report = {
  generatedAt: new Date().toISOString(),
  corpusRoot,
  outputRoot,
  corpusPairs,
  bundleFiles: bundleFiles.length,
  sourceTxtFiles: txtFiles.length,
  sourceBlocks,
  issueCount: issues.length,
  bySeverity,
  byType,
  issues,
};

fs.writeFileSync(`${reportPath}.tmp`, JSON.stringify(report, null, 2), 'utf8');
fs.renameSync(`${reportPath}.tmp`, reportPath);

const csv = [
  'scope,severity,type,file,detail,sample',
  ...issues.map(i => [i.scope, i.severity, i.type, i.file, i.detail, i.sample].map(csvEscape).join(',')),
].join('\n') + '\n';
fs.writeFileSync(`${csvPath}.tmp`, csv, 'utf8');
fs.renameSync(`${csvPath}.tmp`, csvPath);

console.log(JSON.stringify({
  issueCount: issues.length,
  bySeverity,
  byType,
  reportPath,
  csvPath,
  corpusPairs,
  bundleFiles: bundleFiles.length,
  sourceTxtFiles: txtFiles.length,
  sourceBlocks,
}, null, 2));
