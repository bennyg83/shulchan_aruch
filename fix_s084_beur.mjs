import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_084/beur-hagra/part-001.txt';

let t = readFileSync(file, 'utf8');

const fixes = [
  // seif 1 א — "They do not come. What the individual is like:"
  ['They do not come. What the individual is like:', 'That they do not flow. Ibid., what is specified, etc.'],
  // seif 1 ב — Hebrew-only
  ['לפיכך כו\'. שם:', 'Therefore, etc. Ibid.'],
  // seif 1 ג — garbage
  [/But not so\. As a result of Hashem's presence.*?is the same as Hashem's people/s,
   "But it is forbidden, etc. — as stated there: we are concerned lest perhaps it separated, etc.; rather, etc.; unlike this case which is not its natural habitat — and that is what it says there: stooping and drinking specifically."],
  // seif 1 ד — garbage
  ['Like the back of the qua. Imagine the roof of Tamara and the tyrant that in the hole is in the tool.  ת:',
   'Such as behind, etc. — for it is similar to the roof of a date-palm and its pit, where inside the hole is like inside a vessel. Terumat HaDeshen.'],
  // seif 1 ו — Hebrew-only
  ['אבל אם כו\'. גמ\' הit appears to me:', 'But if, etc. — Gemara ibid.'],
  // seif 3 א — garbage
  ['Or the rest of the cell. A name that will be known:', 'Or other, etc. — ibid.: shikhra.'],
  // seif 3 ד — garbage
  ['But yes. And then, in the place:', "But, etc. — and that is what it says: b'tzaviyata."],
  // seif 3 ה — garbage
  [/And yes, they are allowed\. Madam was banned but to filter\..*?to the UN:/s,
   'And yes, they are permitted, etc. — from the fact that they only forbade filtering. And this means a kli sheni has the same law as a kli rishon, for otherwise we should be concerned lest perhaps they separated. And see Darkei Moshe.'],
  // seif 6 ג — garbage
  ["But they're just there. Just like a quaint. Name:", 'But those found, etc. — like a cucumber, etc. Ibid.'],
  // seif 6 ו — garbage
  [/Starting as a\. As an egg that is found in blood.*?Name:/s,
   'That it begins, etc. — like an egg in which blood is found in the yolk, which is forbidden; and like a mouse whose flesh is partly mixed with impure flesh — all the more so, for the purpose of the prohibition, as stated in chapter 1 of Yom Tov (7a): it proliferates, etc. Ibid.'],
  // seif 8 א — Hebrew-only
  ['כל כו\' מתetc.. דא"צ separated:', 'All, etc. from within it — it need not have separated.'],
  // seif 8 ב — garbage
  [/And if he was a quaint and even a quaint\..*?\(a\)/s,
   'And if he soaked, etc., and even, etc. — but to eat them without cooking is permitted, and we are not concerned that perhaps they separated and returned to their holes, for this is uncommon; as stated there: if they are in a vessel, etc.; and if so, we should be concerned lest they separated to the outer wall of the vessel and returned — but we are not concerned that something will separate from its place of growth and return. Terumat HaDeshen.'],
  // seif 8 ג — garbage
  ["And from above, we need to be. It is called the Qur'an:", 'Nevertheless he must, etc. — all this is the language of the Rosh and Tur.'],
  // seif 8 ד — Hebrew-only
  ['בחוץ. כיון שseparated:', 'Outside — since it separated.'],
  // seif 8 ה — Hebrew-only
  ['או כו\'. בעיא שם כit appears to me:', 'Or, etc. — a question ibid., as above.'],
  // seif 8 ו — garbage
  ['and run away. The same is the case:', 'And they stirred — he follows his method as above seif 6.'],
  // seif 8 ז — Hebrew-only
  ['או בדופני. כit appears to me seif 5:', 'Or on the walls — as above seif 5.'],
  // seif 8 ט — garbage
  ['Not from me as a. As the R&amp;D:', 'And it does not help, etc. — as stated above, beginning of siman 39.'],
  // seif 9 א — garbage
  [/It's past and in turn\..*?and a snail/s,
   'He transgressed and cooked, etc. — like Chullin 9b: a wolf came and took its intestines; and moreover, it is a double doubt: perhaps it was not there, and perhaps it dissolved and was nullified.'],
  // seif 9 ב — Hebrew-only
  ['כי אין כו\'. עש"ך:', 'For there is no, etc. — see Siftei Kohen.'],
  // seif 10 — garbage
  ['(Luke) vegetables, but k. סי . . . . .', '(Collection) Vegetables, etc., but, etc. — see siman 100 s.k. 4, what is written there. (end)'],
  // seif 13 — Hebrew-only
  ['דבש כו\'. עט"ז וש"ך:', 'Honey, etc. — Taz and Siftei Kohen.'],
];

for (const [from, to] of fixes) {
  const before = t;
  if (typeof from === 'string') {
    t = t.replace(from, to);
  } else {
    t = t.replace(from, to);
  }
  if (t === before) console.warn('NO MATCH:', typeof from === 'string' ? from.slice(0,50) : from.source?.slice(0,50));
}

writeFileSync(file, t, 'utf8');
console.log('Done');
