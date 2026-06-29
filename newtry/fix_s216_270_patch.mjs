// Patch script for lines that startsWith failed on (curly quote or multiline issues)
import { readFileSync, writeFileSync } from 'fs';

function fixByIncludes(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  let count = 0;
  const result = lines.map(line => {
    for (const [fragment, replacement] of fixes) {
      if (line.includes(fragment)) { count++; return replacement; }
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-3).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

// siman_221/beer-hagolah — M.M.M. line (startsWith worked but curly-quote in pattern)
fixByIncludes(`${base}/siman_221/beer-hagolah/part-001.txt`, [
  ['M.M.M. Darbpa has a page called', 'The statement of Rav Pappa there, folio 33a:'],
]);

// siman_228/beur-hagra — starts with curly left-quote
fixByIncludes(`${base}/siman_228/beur-hagra/part-001.txt`, [
  ['Isn', '"The fact that there is no, etc." Rambam and other decisors. And Beit Yosef wrote that he wishes to resolve thereby the difficulty of Tosafot in Ketubot 63a s.v. "ada\'ata" etc., and they further adduced proof from what was permitted in the case of "kado tahit" and similar — for he is not considering whether one regrets on account of an unforeseen circumstance:'],
]);

// siman_242/pitchei-teshuva — starts with 'Every wise man.'
fixByIncludes(`${base}/siman_242/pitchei-teshuva/part-001.txt`, [
  ['Every wise man.', '"Every wise man, etc." See Maharsha in his Chiddushei Aggadot, chapter 3 of Sotah, who wrote: and in these generations, those who issue rulings from the Shulchan Aruch — they do not know the rationale of each matter unless they first carefully study it from the Talmud, which is the service of Torah scholars — an error has entered their rulings, and they are among those who destroy the world; therefore they must be reproved — see there. And it is possible that this applied specifically in the era of the Maharsha, when there was not yet any commentary on the Shulchan Aruch; but nowadays that Turei Zahav, Siftei Kohen, Magen Avraham, and other later authorities have been composed and every law\'s rationale is explained in its place — it is entirely proper to rule from the Shulchan Aruch and the later authorities:'],
]);

// siman_242/rabbi-akiva-eiger-yd — starts with '(Psalm) but in the midst'
fixByIncludes(`${base}/siman_242/rabbi-akiva-eiger-yd/part-001.txt`, [
  ['(Psalm) but in the midst', '(Se\'if 17 in the gloss) but at an entrance requiring a mezuzah. And included in this are a synagogue and a house of study:'],
]);

// siman_254/siftei-kohen — starts with curly-quote "And given to the people of the stars."
fixByIncludes(`${base}/siman_254/siftei-kohen/part-001.txt`, [
  ['And given to the people of the stars', '"And it shall be given to the poor of non-Jews." But not to the poor of Israel — for it is written "when its harvest dries up it shall be broken" — meaning when the merit in the hands of non-Jews is exhausted and the moisture of their charitable deeds dries up, then they shall be broken:'],
]);

// siman_261/beur-hagra — 'If not so.' ends with curly-quote, pattern in startsWith used '.'
fixByIncludes(`${base}/siman_261/beur-hagra/part-001.txt`, [
  ['If not so.', 'If not so, etc. Specifically regarding himself — and as written in Shabbat 133b:'],
]);

// siman_262/beur-hagra — 'But his pain is so. As a Starworker'
fixByIncludes(`${base}/siman_262/beur-hagra/part-001.txt`, [
  ['But his pain is so. As a Starworker', 'But his pain is so. As written in tractate Avodah Zarah 28b:'],
]);

// siman_269/beer-hagolah — 'The words of the column from M.M.M.'
fixByIncludes(`${base}/siman_269/beer-hagolah/part-001.txt`, [
  ['The words of the column from M.M.M.', 'The language of Tur — from the statement of Ameimar in Yevamot folio 22a — and it implies that Rav Nachman there, when he heard this statement of Ameimar, became silent and conceded to him. And we are not concerned about confusion with an Israelite, since testimony is accepted only in a court and they are expert in the matter:'],
]);

// siman_269/beur-hagra — 'Star workers are not called.'
fixByIncludes(`${base}/siman_269/beur-hagra/part-001.txt`, [
  ['Star workers are not called.', 'A non-Jew is forbidden in the relatives of his mother, etc. As Rava said there: this that the Sages said, etc. — whether in relatives on his own side and whether in relatives of his wife\'s side — and as he will write:'],
]);

// Also fix the two remaining siman_229/baer-heitev that missed (both use 'Third:' ending with curly quote)
// Check if they were fixed already
import { existsSync } from 'fs';
function checkLine(file, frag) {
  const t = readFileSync(file, 'utf8');
  return t.includes(frag);
}

// siman_229/baer-heitev line with 'Buried.' - check if still has Lord's Prayer
if (checkLine(`${base}/siman_229/baer-heitev/part-001.txt`, "Lord's Prayer") ||
    checkLine(`${base}/siman_229/baer-heitev/part-001.txt`, "Lord’s Word")) {
  fixByIncludes(`${base}/siman_229/baer-heitev/part-001.txt`, [
    ["Lord’s Word is a sign", "his fellow. And see below siman 234 se’if 21 — regarding a woman who vowed and another attached himself to her vow, and then the husband annulled her vow — she is permitted and the one who attached himself is forbidden. Siftei Kohen:"],
  ]);
}

console.log('\nPatch complete.');
