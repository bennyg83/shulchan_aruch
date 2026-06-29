import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_124/baer-heitev/part-001.txt';
let t = readFileSync(file, 'utf8');

// Find and show all remaining garbage patterns for inspection
const lines = t.split('\n');
const inEn = [];
let english = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('**** ENGLISH ****')) { english = true; continue; }
  if (lines[i].includes('**** END BLOCK ****')) { english = false; continue; }
  if (english && lines[i].trim()) {
    const l = lines[i];
    if (l.includes('star worker') || l.includes('Starwork') || l.includes('snail and') ||
        l.includes('quaint') || l.includes('sweaters') || l.includes('Third:') ||
        l.includes('star labor') || l.includes('Damon Shari') || l.includes('KGB') ||
        l.includes('Barzallah') || l.includes('Daws Affi') || l.includes('Damned.') ||
        l.includes('Papa') || (l.includes('Bible') && l.includes('Bible'))) {
      console.log(`L${i+1}: ${l.slice(0,100)}`);
    }
  }
}

// Targeted replacements using actual file content
const fixes = [
  // Find by unique substring then replace whole line
];

// Instead do targeted line replacements
const result = lines.map((line, i) => {
  // seif 12 α - "with pleasure"
  if (line.includes('with pleasure. And a friend is allowed')) {
    return 'For benefit — and for us it is permitted for benefit in a place of loss. Siftei Kohen.';
  }
  // seif 12 β - "The rest."
  if (line.includes('The rest. It will be sold to a Star worker')) {
    return 'The rest — he shall sell it to a non-Jew, minus the value of the yayin nesech in it, as below seif 23 in the gloss; and if there is sixty, it is permitted even for drinking — end of Siftei Kohen\'s words.';
  }
  // seif 12 γ - "allowed. The book..." line 1
  if (line.includes('allowed. The book of the Bible and Damon Shari')) {
    return 'Permitted — Siftei Kohen wrote: and for us it is permitted even for drinking in a place of loss, and one should not publicize the matter; and so too the law below regarding extending his hand to take something from the barrels. [Take this as a general rule in all the laws of yayin nesech: wherever the law permits for benefit, for us it is permitted even for drinking in a place of loss. And what is forbidden for benefit — for us it is permitted for benefit in a place of loss. And even if yayin nesech mixed in, for us we estimate sixty and it is permitted even for drinking. Similarly where there is a doubt whether the non-Jew touched intentionally or not, we lean leniently, since this is a rabbinic decree.';
  }
  // seif 12 γ - line 2 continuation
  if (line.includes('The Bible was based on a lot of gold and a half value')) {
    return 'Baer Heitev wrote: a place of loss means according to the monetary value of one and a half gold pieces, and even if he can sell it to a non-Jew it is called a place of loss. And see siman 35 what was written there in the name of Noda BeYehudah.]';
  }
  return line;
});

const out = result.join('\n');
writeFileSync(file, out, 'utf8');
console.log('Done');
