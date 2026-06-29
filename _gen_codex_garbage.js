const fs = require('fs'), path = require('path');
function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function strip(h) { return h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
const GARBAGE = /terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

const entries = [];
for (const si of fs.readdirSync(base).filter(d => d.startsWith('siman'))) {
  const siPath = path.join(base, si);
  for (const se of fs.readdirSync(siPath).filter(d => { try { return d.startsWith('seif-') && fs.statSync(path.join(siPath, d)).isDirectory(); } catch { return false; } })) {
    const seifPath = path.join(siPath, se);
    for (const slug of fs.readdirSync(seifPath).filter(s => { try { return fs.statSync(path.join(seifPath, s)).isDirectory(); } catch { return false; } })) {
      const ep = path.join(seifPath, slug, 'en.html');
      const hp = path.join(seifPath, slug, 'he.html');
      if (!fs.existsSync(ep) || !fs.existsSync(hp)) continue;
      const en = fs.readFileSync(ep, 'utf8');
      const he = fs.readFileSync(hp, 'utf8');
      const heS = brSegs(he), enS = brSegs(en);
      if (heS.length && enS.length && GARBAGE.test(strip(en))) {
        entries.push({
          slug, si, se,
          heN: heS.length, enN: enS.length,
          hePath: hp.replace(/\//g, '\\'),
          enPath: ep.replace(/\//g, '\\'),
          he: heS.map(s => strip(s).slice(0, 100)).join(' | '),
          en: enS.map(s => strip(s).slice(0, 80)).join(' | '),
        });
      }
    }
  }
}

const lines = [];
lines.push('## Codex Prompt C — OC Corpus Garbage EN Retranslation (68 entries)');
lines.push('');
lines.push('### Background');
lines.push('These corpus en.html files contain garbage machine-translation (KGB, Lord\'s Prayer, Bible and the Bible, Starwork, etc.).');
lines.push('The he.html is correct. Retranslate each en.html from its he.html.');
lines.push('');
lines.push('### Task per entry');
lines.push('1. Read he.html — count `<br />` segments → N');
lines.push('2. Translate each HE segment into clean academic English → N EN segments');
lines.push('3. Join with `<br />\\n` and write en.html (UTF-8, no BOM)');
lines.push('4. Verify: en segment count === he segment count; no garbage patterns remain');
lines.push('');
lines.push('### Garbage patterns to avoid');
lines.push('- KGB, terrorist, Lord\'s Prayer, Lord\'s word, heaven\'s people');
lines.push('- Starwork, star work, Lycott, Bible and the Bible');
lines.push('- hand recoils, first dish, Saturday (for Shabbat), her age, the craft');
lines.push('- M.M.M., D.D.D., muktzeh as "allocated"');
lines.push('- Random transliterations (Daha, Dramaa, Abai, etc.) instead of real translations');
lines.push('');
lines.push('### Translation rules');
lines.push('- Keep halachic terms: Magen Avraham, Taz, Bach, Gra, Rama, seif katan (sk), Mishna Berurah, etc.');
lines.push('- Expand abbreviations in context: sk = seif katan, MA = Magen Avraham, BH = Bach, MB = Mishna Berurah');
lines.push('- Match segment count exactly to HE');
lines.push('');
lines.push('### File write');
lines.push('`fs.writeFileSync(path, content, {encoding: "utf8"})` — plain UTF-8, no BOM');
lines.push('');
lines.push('### Also fix source TXT');
lines.push('For each corpus entry below, the source TXT file also has garbage. After fixing en.html,');
lines.push('find the corresponding TXT block in:');
lines.push('`C:\\Users\\binya\\Documents\\Shulchan aruch\\newtry\\OC_001\\output\\siman_NNN\\<slug>\\part-001.txt`');
lines.push('Find the block with matching seif number and replace its ENGLISH section with your clean translation.');
lines.push('TXT block format: `**** ENGLISH ****` ... `**** END BLOCK ****`');
lines.push('');
lines.push('### Entry List');
lines.push('');

entries.forEach((e, i) => {
  lines.push('---');
  lines.push(`**#${i+1} ${e.slug}  ${e.si}/${e.se}  (HE:${e.heN} segs)**`);
  lines.push(`- he.html: \`${e.hePath}\``);
  lines.push(`- en.html: \`${e.enPath}\``);
  lines.push(`- HE: ${e.he.slice(0, 250)}`);
  lines.push(`- EN (garbage): ${e.en.slice(0, 150)}`);
  lines.push('');
});

lines.push('---');
lines.push('');
lines.push('### Verification');
lines.push('After all entries: report `Fixed corpus: N | Fixed TXT: M | Failed: K`');
lines.push('For each fixed file confirm: en.html segment count === he.html segment count, no garbage patterns in en.html.');

const out = lines.join('\n');
fs.writeFileSync('C:/Users/binya/Documents/Shulchan aruch/_codex_prompt_C.md', out, 'utf8');
console.log('Written. Entries:', entries.length);
// Also save just the paths for reference
const pathList = entries.map(e => e.enPath).join('\n');
fs.writeFileSync('C:/Users/binya/Documents/Shulchan aruch/_garbage_corpus_paths.txt', pathList, 'utf8');
