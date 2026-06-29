import { readFileSync, writeFileSync } from 'fs';

function fixLines(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) return replacement;
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log('Fixed:', file.split('/').slice(-2).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/';

// siman 123 baer-heitev
fixLines(base + 'siman_123/baer-heitev/part-001.txt', [
  ['They released. It has a wine and a nebula',
   'That they were removed — lest there is moist wine that forbids; the Rashba; and it implies there that if they were stopped by the wheel and beam there is no concern of touch of a non-Jew in such a case. Siftei Kohen.'],
  ['Their blood. But in the most part, two are not allowed.',
   "Their measure — but more than their measure, even a second time it is forbidden. Siftei Kohen."],
  ['marginally. If you don\'t just get up here, there\'s no blanket under the wine.',
   'The bottom — excluding if he did not clear it only from above, there is no drawing since there are grapes beneath the wine. Siftei Kohen.'],
]);

// siman 123 pitchei-teshuva
fixLines(base + 'siman_123/pitchei-teshuva/part-001.txt', [
  ['Must be prohibited. See the answer of the verses of Yair, the sign of the KGB',
   'There is reason to forbid — see responsum Chavot Yair siman 114, and responsum Tzemach Tzedek siman 12, what he wrote on this matter.'],
]);

// siman 124 pitchei-teshuva (the line that didn't match before due to curly quote)
fixLines(base + 'siman_124/pitchei-teshuva/part-001.txt', [
  ['Instead of losing.',
   'In a place of loss — see Dagul Merevavah, who wrote that the Rama here deals with a place where it is known they are actual idolaters; but otherwise for us it is permitted in a place of loss even if they lifted and swirled it, for certainly this is no worse than touch of a non-Jew through something else, below seif 24 in the gloss — see there. And so he wrote in his book Noda BeYehudah second series YD siman 69; and see there siman 70 where he wrote that all this is if the vessel was less than full, but if it was full one must be concerned for Rashi\'s words that in a full vessel we are concerned lest he touched when the Jew is not intending to watch and guard it. And it is explained there that if it was wine vinegar, even though we are strict with vinegar as long as it does not bubble as in siman 123 seif 6, at any rate it does not leave the status of doubtful vinegar and one may be lenient even if it was full — see there.'],
]);

// siman 124 turei-zahav part-002
fixLines(base + 'siman_124/turei-zahav/part-002.txt', [
  ['But in the veins that prove.',
   'But through indicative inferences that prove — meaning, like the incident in Terumat HaDeshen where non-Jews walked before the vat of fresh wine and whispered to each other; afterward one dipped his finger in the wine and sucked from it with his mouth, and they walked away with mouths full of laughter. Jews ran after them and said "why did you ruin our wine?" — they replied "we did not know this would be forbidden because of this." And the Jews sensed from the whispering that their intention had been to pour a libation, to ruin it; and he permitted there, for it is like "to provoke" here.'],
]);

console.log('All done');
