import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_124/beur-hagra/part-001.txt';
let t = readFileSync(file, 'utf8');

const fixes = [
  ['He does not mention K. A large sum of all the sweaters and mentions the name of Starwork and its service:',
   'That he does not mention, etc. — in the Tosefta: who is a gadol? Anyone who vows and mentions the name of idolatry and its appurtenances.'],
  ['Every star worker is the same. A.D.:',
   'Every non-Jew, etc. — as stated above seif 1.'],
  ['But if he\'s called. It is like a sarcer named S. A. and I will be excavated in the name of B and the G.C. in the D.C. works stars. A Starworker who was given as:',
   'But if, etc. — like a wineskin there seif 1, and a barrel that burst at its width there seif 2; and see Hagahot Ashiri siman 12, s.v. ovedes kochavim. A female non-Jew who gave, etc.'],
  ['A star worker who is the way. This is the name of Hashem\'s people, and the people of Hashem\'s people, and they are called to worship Hashem',
   'A non-Jew who treaded, etc. — ibid. in the Rosh, from the incident of the child and the incident of Nehardea, ibid. 56b; and he compares there to "they measured," etc.'],
  ['I was wearing a quarry, but a quaint. Jim there:',
   'A barrel, etc., but, etc. — Gemara ibid.'],
  ['And as a quaint. Same as C:',
   'And all this, etc. — as above seif 14.'],
  ['If not so." Matthews S. A. in the D.R. But he touched a quaint. This is where he said to him. And then, we will be saved."',
   'And if not, etc. — see Tosafot seif 1, s.v. Rav Pappa. But he touched the stream, etc. — ibid. 72b, beginning of s.v. amar lehu. And a stream that is forbidden, etc.'],
  ['And the "Son." Same as C. The Bible and the Bible:',
   'And the same, etc. — as above seif 7. Darkei Moshe and Taz and Siftei Kohen.'],
  ['Wine that was a quaint. It is because of Hashem\'s mercy and mercy:',
   'Wine that was, etc. — because of his force; and as above; and as stated above, beginning of siman 125.'],
];

for (const [from, to] of fixes) {
  if (!t.includes(from)) { console.warn('NO MATCH:', from.slice(0,60)); continue; }
  t = t.replace(from, to);
}

writeFileSync(file, t, 'utf8');
console.log('Done');
