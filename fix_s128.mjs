import { readFileSync, writeFileSync } from 'fs';

function fixLines(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  let count = 0;
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) { count++; return replacement; }
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-2).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_128/';

fixLines(base + 'baer-heitev/part-001.txt', [
  ['in drinking. A.A. who is not seen as a thief',
   'For drinking — and although he is not caught as a thief for entering since he fears lest a Jew come and see him touch. Rosh. And this is specifically when the non-Jew knows that touch of a non-Jew is forbidden to a Jew and that his wine will be lost thereby — but if not so, the fear does not apply. And see above beginning of siman 115. Siftei Kohen.'],
]);

fixLines(base + 'beer-hagolah/part-001.txt', [
  ['Marbria Doo lives a resident of Starwork Page S. and how much I have done there in the Bible:',
   'From the baraita: who is a ger toshav — idolatry, folio 64, and in several places there in the baraita.'],
  ['There is a name in the book called Rashi, whose interpretations and it is in our books, and writes that it does not allow him to touch any other Starworker',
   "There it is in Tosafot in the name of Rabbenu Tam in the name of Rashi, who emended his commentary, and so it is in our books; and he writes that we are not concerned about touch of another non-Jew, since he has no benefit in it and will not let him touch; but not for a long time, for then there is concern of substitution with his own wine."],
  ['Change the name S:', 'Mishna there, folio 60.'],
]);

fixLines(base + 'turei-zahav/part-001.txt', [
  ['Wine in it. Rava Kamir also spoke to a star worker named his wine or has a wine partnership with Israel',
   'Wine in it — a novel ruling: even though the non-Jew also has wine of his own there, or has a wine partnership with the Jew, nevertheless there is sometimes a dispensation as he goes on to explain.'],
]);

console.log('Done siman 128');
