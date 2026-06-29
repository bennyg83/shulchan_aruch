import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const corpusRoot = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function stripTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

// Find runs of 5+ consecutive Latin letters (indicates real English words, not lone abbreviations)
function findLatinRuns(text) {
  return text.match(/[A-Za-z]{5,}/g) || [];
}

const results = [];

function walkDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkDir(full);
    else if (entry === 'he.html') {
      const content = readFileSync(full, 'utf8');
      const visible = stripTags(content);
      const runs = findLatinRuns(visible);
      if (runs.length > 0) {
        const parts = full.split(/[\\/]/);
        const simanIdx = parts.findIndex(p => /^siman\d+$/.test(p));
        const siman = parts[simanIdx] || '?';
        const slug = parts[simanIdx + 2] || '?';
        results.push({ siman, slug, runs });
      }
    }
  }
}

walkDir(corpusRoot);
results.sort((a, b) => b.runs.length - a.runs.length);

console.log('CHECK 2: he.html files with English text (5+ consecutive Latin letters) outside HTML tags: ' + results.length);
console.log('');
for (const r of results.slice(0, 60)) {
  console.log(r.siman + '/' + r.slug + ' (' + r.runs.length + ' runs): ' + r.runs.slice(0, 6).join(' | '));
}
if (results.length > 60) console.log('... and ' + (results.length - 60) + ' more');
