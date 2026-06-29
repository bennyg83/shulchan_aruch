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
  console.log(`Fixed ${count}:`, file.split('/').slice(-3).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_132/';

// turei-zahav/part-001.txt
// Line 8: "You can take a fee from the same star worker..." — seif 1 marker א
// Hebrew: מותר ליקח דמיו מאותו עובד כוכבים. דלאו מכר הוא אלא אומר לו שפכת ייני ואבדת ממוני...
fixLines(base + 'turei-zahav/part-001.txt', [
  [
    'You can take a fee from the same star worker.',
    'It is permitted to take payment from that non-Jew. For it is not a sale; rather he says to him: you spilled my wine and caused me financial loss — and he takes the value of kosher wine; and even though the non-Jew would not pay unless the Jew gave him wine, nevertheless it is not forbidden — for he owes him as restitution for damage, and not as payment for a sale; so Beit Yosef wrote in the name of the Ran.'
  ],
  [
    'And your service bought. Dov is a star worker buying a attraction or money, and "You have to take the blood from then buying money:',
    'And upon his drawing he acquires. For a non-Jew acquires through drawing or through money; therefore one must take the money — for then he acquires through money.'
  ],
  [
    'It is allowed. The columnist and the Damer are the work of the stars in the hand of a Star worker is forbidden when he is sold to buy the needs of the work of the stars, which then remain the blood of the prohibition against his tongue and that of a sustainable Hashem to invite him to an order that he is "assuming that I am a man who came from a Starworker and there will return and is a sign of the Chaldean al-Damory" that he may feel that he may have a work of the purpose of the purpose of the purpose of the purpose of the purpose of the purpose of the purpose of the purpose of the purpose of the purpose of the purpose of the creation of the Lord\'s',
    'It is permitted. Tur wrote: the rule that money of idolatry in the hand of a non-Jew is forbidden — that applies specifically when he sells it to purchase idolatry needs, for then the money retains its forbidden status; so is his language; and even though generally we hold that intention alone does not effect a prohibition, here it is different — since the money came from the non-Jew and will return there; and it is explained in siman 144 that even if in doubt one must be concerned that he sold it to purchase idolatry.'
  ],
]);

// baer-heitev/part-001.txt
// Line 137: "Make sure. Those who are at first should be careful as a sign of the KGB..." — seif 2 marker ט
// Hebrew: מיהו לכתחילה יש ליזהר כמ"ש בסימן קכ"ד סכ"ד דבמקום שאין הפסד אף בזה"ז אין להתיר בהנאה. ש"ך
// Line 159: "Chery. It is permissible for pleasure in place of loss..." — seif 3 marker ב
// Hebrew: דסתם יינם בזה"ז מותר בהנאה במקום הפסד ואם כן הכא נמי שרי. ש"ך
fixLines(base + 'baer-heitev/part-001.txt', [
  [
    'Make sure. Those who are at first should be careful as a sign of the KGB instead of having no loss at all. “Third:',
    'However, le-chatchilah one should be careful, as stated in siman 124 se\'if 24, that where there is no financial loss even nowadays one may not permit benefit. Siftei Kohen.'
  ],
  [
    'Chery. It is permissible for pleasure in place of loss, and if so, the right of Sri Lanka. “Third:',
    'Permitted. For stam yeinam in our times is permitted for benefit in a case of financial loss, and therefore here too it is permitted. Siftei Kohen.'
  ],
]);

// beer-hagolah/part-001.txt
// Line 84: "There is a lot of shit there:" — seif 4 marker ב
// Hebrew: כדמפרש רב פפא שם
// Line 95: "The Bible and the Bible said..." — seif 4 marker ג
// Hebrew: טור וכ"כ הרשב"א וכתב הב"י שיותר נכון לפרש דברי הרמב"ם שגם דעתו כן
fixLines(base + 'beer-hagolah/part-001.txt', [
  [
    'There is a lot of shit there:',
    'As Rav Papa explains there.'
  ],
  [
    'The Bible and the Bible said that it is possible to interpret the words of the Rambam, which also means:',
    'Tur, and likewise Rashba; and Beit Yosef wrote that it is more correct to interpret the words of Rambam as meaning the same.'
  ],
]);

// beur-hagra/part-001.txt
// Line 29: "If he gave him a quaint..." — seif 1 marker ג
// Hebrew: דהוי כמו נתן לה ואח"כ בא עליה דפרכינן שם ליחול עליה איסור כו'
// Line 227: "A friend who came here. See the Bible and the Bible:" — seif 2 marker ע
// Hebrew: עיין ט"ז וש"ך
fixLines(base + 'beur-hagra/part-001.txt', [
  [
    'If he gave him a quaint. It is as if he has given her, and then he has to do so with her',
    '(Likut) If he gave to him, etc. For it is like one who gave her the hire and afterward came upon her — where they challenged there: let the prohibition take effect upon it, etc. (end).'
  ],
  [
    'A friend who came here. See the Bible and the Bible:',
    'From the moment it entered, etc. See Taz and Siftei Kohen.'
  ],
]);

console.log('Done.');
