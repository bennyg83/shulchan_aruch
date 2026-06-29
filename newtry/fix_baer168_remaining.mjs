// Fix remaining 13 garbage lines in siman_168/baer-heitev and other leftover files
import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

function patchLine(file, lineIndex, newContent) {
  const t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  const old = lines[lineIndex];
  const cr = old.endsWith('\r') ? '\r' : '';
  lines[lineIndex] = newContent + cr;
  writeFileSync(file, lines.join('\n'), 'utf8');
  console.log(`Patched ${file.split('/').slice(-3).join('/')} line ${lineIndex}`);
}

const f168bh = `${base}/siman_168/baer-heitev/part-001.txt`;

patchLine(f168bh, 7,
  'him. Tur wrote: and all the more if he said "I will raise it for you." The reason is that he gives interest to the non-Jew through his agency, and it is analogous to saying to his fellow "I will lend you on condition that you give the interest to the non-Jew" — which is obviously forbidden; and even if the lender owes the non-Jew nothing at all, since he gives the interest to the non-Jew on account of the loan at the lender\'s direction, it is fixed ribbit.');

patchLine(f168bh, 72,
  'Appearance. And even so it is forbidden only when he lent through the agency of the first Jew; but otherwise it does not appear as ribbit, for the non-Jew borrowed from the outset for his own sake. Siftei Kohen.');

patchLine(f168bh, 126,
  'Believe it. And it is permitted for him to take principal and interest from the Jew, since the lender did not know at first; and even though it is now known to him that the collateral belonged to the Jew, we say by default he did not abandon a permitted path and eat forbidden matter, and he transferred the collateral to the non-Jew, and the non-Jew acquired it by pulling, and everything he now gives Israel is given on account of the non-Jew. Tur. But if the lender knows of this, he should be concerned lest he did not transfer the collateral to the non-Jew — therefore it is forbidden. Siftei Kohen.');

patchLine(f168bh, 159,
  'to take. However, according to those who are lenient cited above, it is permitted. Siftei Kohen.');

patchLine(f168bh, 193,
  'allowed. Even if the lender knows it belongs to Israel, for he transferred it to the non-Jew and the non-Jew acquired it by pulling. Siftei Kohen.');

patchLine(f168bh, 293,
  'He believes you. Even an oath is not needed. Siftei Kohen.');

patchLine(f168bh, 315,
  'known. That is to say, if the lender knows clearly that the truth is that the court cannot compel him, and he says "I do not believe any person except the borrower\'s own words" — nevertheless it is forbidden for him to take interest, since he knows it belongs to the Jew. Siftei Kohen.');

patchLine(f168bh, 337,
  'The collateral. And likewise "unless" — it is known if he accompanied a non-Jew; and if it is not known but the lender claims with certainty that he knows he accompanied them to a non-Jew who is a litigant who receives the collateral and keeps it for a week — he swears a heses oath and is exempt. Siftei Kohen.');

patchLine(f168bh, 457,
  'Returning. And if afterward the first says it is not true but it is mine and return it to me for free — the second swears as his first words and will never return the collateral to him. Tur from Rosh\'s responsum. And Beit Yosef wrote: specifically here where he contradicts him saying "I did not say to you it belongs to the non-Jew" — the second must swear, unlike above seif 13.');

patchLine(f168bh, 500,
  'Credit debt. Meaning a promissory note he has from a non-Jew; and likewise if the non-Jew owes him orally or in any other obligation. Siftei Kohen.');

patchLine(f168bh, 543,
  'From Israel. Unlike above seif 6, where if a Jew redeems it is forbidden — for there, from the moment the Jew gives him collateral and borrows on it, it appears he is borrowing for the Jew\'s need; or there since he pledged it against his will, certainly he did not transfer it to him. But here one can say he transferred it to him. Siftei Kohen.');

patchLine(f168bh, 566,
  'Appearance. Siftei Kohen.');

patchLine(f168bh, 599,
  'non-Jew. In a way that is not prohibited according to the above method or the other methods, he is trusted without an oath because "he does not abandon a permitted path," etc.; and certainly by default he did everything he could to act permissibly. Siftei Kohen.');

// siman_168/beur-hagra remaining
const f168bg = `${base}/siman_168/beur-hagra/part-001.txt`;
const bgText = readFileSync(f168bg, 'utf8');
const bgLines = bgText.split('\n');
// Find remaining garbage lines
for(let i=0;i<bgLines.length;i++){
  if(/star worker|Starwork|quaint|working stars/i.test(bgLines[i])){
    console.log('beur-hagra still garbage line', i, JSON.stringify(bgLines[i].slice(0,60)));
  }
}

// siman_168/pitchei-teshuva remaining
const f168pt = `${base}/siman_168/pitchei-teshuva/part-001.txt`;
const ptText = readFileSync(f168pt, 'utf8');
const ptLines = ptText.split('\n');
for(let i=0;i<ptLines.length;i++){
  if(/star worker|Starwork|quaint/i.test(ptLines[i])){
    console.log('pitchei-teshuva still garbage line', i, JSON.stringify(ptLines[i].slice(0,60)));
  }
}

// siman_168/turei-zahav - this was not in original fix script, check it
const f168tz = `${base}/siman_168/turei-zahav/part-001.txt`;
const tzText = readFileSync(f168tz, 'utf8');
const tzLines = tzText.split('\n');
for(let i=0;i<tzLines.length;i++){
  if(/star worker|Starwork|quaint/i.test(tzLines[i])){
    console.log('turei-zahav garbage line', i, JSON.stringify(tzLines[i].slice(0,60)));
  }
}

// siman_170/beur-hagra remaining
const f170bg = `${base}/siman_170/beur-hagra/part-001.txt`;
patchLine(f170bg, 112,
  'And specifically, etc., but, etc. Same as above siman 169 seif 1; and even if he presented him, etc.; and the non-Jew said to him, etc.; and as Tosafot wrote there.');

// siman_175/baer-heitev remaining
const f175bh = `${base}/siman_175/baer-heitev/part-001.txt`;
patchLine(f175bh, 29,
  'According to the law. That is to say that a sage is nothing but an idler. Siftei Kohen.');

console.log('Done.');
