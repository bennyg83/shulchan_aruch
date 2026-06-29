const fs = require('fs');
const items = JSON.parse(fs.readFileSync('C:/Users/binya/Documents/Shulchan aruch/_codex_mismatches.json', 'utf8'));

const lines = [];
lines.push('## Codex Prompt B — OC Corpus Segment Mismatch Fixes (156 entries)');
lines.push('');
lines.push('### Task');
lines.push('For each entry below, ensure en.html has exactly the same number of <br /> segments as he.html.');
lines.push('');
lines.push('**Algorithm per entry:**');
lines.push('1. Read he.html — split on `/<br\\s*\\/?>/ ` and filter non-empty → heSegs array (N segments)');
lines.push('2. Read en.html — split same way → enSegs array (M segments)');
lines.push('3. If N === M: skip (already aligned)');
lines.push('4. If N !== M: retranslate from Hebrew — produce exactly N English segments, one per Hebrew segment');
lines.push('5. Join with `<br />\\n` and write back to en.html (UTF-8, no BOM)');
lines.push('');
lines.push('**Translation rules:**');
lines.push('- Halachic/Rabbinic terms stay in Hebrew or transliterated: Magen Avraham, Taz, Bach, Gra, Rama, seif katan (sk), Mishna Berurah, etc.');
lines.push('- Abbreviations: expand contextually — sk = seif katan, MA = Magen Avraham, BH = Bach, RL = meaning/i.e., MB = Mishna Berurah');
lines.push('- Do not add content not in the Hebrew');
lines.push('- Segment N in EN must correspond to segment N in HE (same topical unit)');
lines.push('- If HE has fewer segs than EN: consolidate EN segments to match HE count');
lines.push('- If HE has more segs than EN: split/expand EN to match HE count');
lines.push('');
lines.push('**File write:** `fs.writeFileSync(path, content, {encoding:"utf8"})` — plain UTF-8, no BOM');
lines.push('');
lines.push('### Entry List (156 entries)');
lines.push('');
lines.push('Base path: `C:\\Users\\binya\\Documents\\Shulchan aruch\\newtry\\OC_Mobile\\oc318-mobile-reader\\public\\corpus\\oc1\\`');
lines.push('');

items.forEach((item, i) => {
  lines.push('---');
  lines.push(`**#${i+1} ${item.slug}  ${item.si}/${item.se}  (HE:${item.heN} → need EN:${item.heN}, currently EN:${item.enN})**`);
  lines.push(`- he.html: \`${item.hePath}\``);
  lines.push(`- en.html: \`${item.enPath}\``);
  lines.push(`- HE: ${item.he.slice(0, 200)}`);
  lines.push(`- EN: ${item.en.slice(0, 120)}`);
  lines.push('');
});

lines.push('---');
lines.push('');
lines.push('### After all fixes');
lines.push('Re-read each modified en.html and confirm its segment count matches he.html.');
lines.push('Report: `Fixed: N | Already OK: M | Failed: K`');

const out = lines.join('\n');
fs.writeFileSync('C:/Users/binya/Documents/Shulchan aruch/_codex_prompt_B.md', out, 'utf8');
console.log('Written. Entries:', items.length);
