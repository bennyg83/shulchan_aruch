// Patch script for lines that failed due to long/complex pattern strings
// Uses short, unique line-start prefixes only

import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

function patchFile(file, lineIndex, newContent) {
  const t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  const old = lines[lineIndex];
  // Verify it still contains garbage
  if (!old || (!old.includes('star worker') && !old.includes('Starwork') && !old.includes('quaint') && !old.includes('Lycott') && !old.includes('D.D.D') && !old.includes('Third:') && !old.includes('bubbles') && !old.includes('tongue') && !old.includes('Dachron') && !old.includes('Fuelman') && !old.includes('six.') && !old.includes('eye.'))) {
    console.log(`SKIP (already clean or not found): ${file}:${lineIndex}`);
    return;
  }
  // Preserve \r if original line has it
  const cr = old.endsWith('\r') ? '\r' : '';
  lines[lineIndex] = newContent + cr;
  writeFileSync(file, lines.join('\n'), 'utf8');
  console.log(`Patched line ${lineIndex}: ${file.split('/').slice(-3).join('/')}`);
}

// siman_165/turei-zahav line 28 - starts with curly-quote char
patchFile(`${base}/siman_165/turei-zahav/part-001.txt`, 28,
  'And likewise the lender, etc. The Tur concludes: and likewise is the law if they deal in commerce, etc. — meaning not specifically by way of loan but likewise by way of commerce. And he includes in this two matters: the one, if they added or diminished in weight, i.e., the denomination was added or reduced; and the second, that a change was made in the matter of mixing with copper. In all cases, if no change was made regarding fruits or other things given for it, he deducts only up to its fifth.');

// siman_170/baer-heitev line 49
patchFile(`${base}/siman_170/baer-heitev/part-001.txt`, 49,
  'Guarantor. For under their law, the lender can demand from whomever he wishes — whether borrower or guarantor — and if a Jew becomes guarantor for a non-Jew for a Jew, he may be held liable; therefore it appears like ribbit and is forbidden. Siftei Kohen.');

// siman_173/baer-heitev line 72
patchFile(`${base}/siman_173/baer-heitev/part-001.txt`, 72,
  'In the manner. Tur wrote regarding his words: but in my opinion it is forbidden in any case where it is outright sold and sold, and the Rashiel is not the most significant. Siftei Kohen.');

// siman_173/baer-heitev line 103
patchFile(`${base}/siman_173/baer-heitev/part-001.txt`, 103,
  'in a sale. There is no prohibition of "you shall not lend at interest" but only of evasion — where he intends through a sale to circumvent. And if both transactions are of the same species and fruit for fruit — in the half they are not permitted to give, nor to take. But on the contrary it is permitted. But if he explicitly said he is going through a sale in the fruits of the species — it is not permitted to accompany him even as a "go-ahead" — it is not permitted. Siftei Kohen.');

// siman_173/baer-heitev line 256
patchFile(`${base}/siman_173/baer-heitev/part-001.txt`, 256,
  'Responsibility. It seems that even without responsibility he gives him a fee for bringing; and an important person who accepts responsibility and gives him a fee — it is permitted. Siftei Kohen.');

// siman_173/beur-hagra line 91 - starts with It's (curly apostrophe)
patchFile(`${base}/siman_173/beur-hagra/part-001.txt`, 91,
  "It is just like a turning, but a turning. For the island is close to the principal; and see above.");

// siman_175/beur-hagra line 38 - (Lycott) was a.
patchFile(`${base}/siman_175/beur-hagra/part-001.txt`, 38,
  '(Likkut) They were, etc. As our version in the Gemara; but Rashi there wrote: the correct version is in the Tosafeta, etc. — "they do not fix a price on new produce," etc. But according to our version, they do not fix a price at all, whether for new or old, since there is no established market price. Mishneh LaMelech (end quote). (Likkut) They were, etc. As our version and the version of Rif and others; and it implies that even to give him new produce afterward — like the fourth view — and unlike Rashi, for according to his view it is permitted in such a case. Mishneh LaMelech, Sefer HaTerumah, and others. Beit Yosef (end quote).');

// siman_177/baer-heitev line 43
patchFile(`${base}/siman_177/baer-heitev/part-001.txt`, 43,
  'He is. Even a dinar to a thousand; and even another type of business is not of this type of business that separates a person from his business against his fellow. Siftei Kohen.');

// siman_177/baer-heitev line 78
patchFile(`${base}/siman_177/baer-heitev/part-001.txt`, 78,
  'as a partnership. And they may divide into whatever type of goods they choose, and need not be concerned. Siftei Kohen.');

// siman_177/baer-heitev line 241
patchFile(`${base}/siman_177/baer-heitev/part-001.txt`, 241,
  'divided. The first part is as explained by Siftei Kohen. Siftei Kohen.');

// siman_177/baer-heitev line 412
patchFile(`${base}/siman_177/baer-heitev/part-001.txt`, 412,
  'Siftei Kohen.');

// siman_177/baer-heitev line 478
patchFile(`${base}/siman_177/baer-heitev/part-001.txt`, 478,
  'announced. That is to say that I will not deal with the loss, and I will not deal with you until you receive an exemption from the present day; nor will there be an obligation, for the authority is in his hand. Siftei Kohen.');

// siman_177/baer-heitev line 511
patchFile(`${base}/siman_177/baer-heitev/part-001.txt`, 511,
  'Due to him. That is to say, in some of the principals and parts of the increase — all the other two species are forbidden but will all be counted. Siftei Kohen.');

// siman_177/beur-hagra line 220 - It's not a quaint (curly apos)
patchFile(`${base}/siman_177/beur-hagra/part-001.txt`, 220,
  "It is not evasion and not evasion. And seemingly the blood-payment was not the name of the wage for the mediator and the broker.");

// siman_177/beur-hagra line 512 - (Lycott) is the gift
patchFile(`${base}/siman_177/beur-hagra/part-001.txt`, 512,
  '(Likkut) is the gift. The first as in Beit Yosef; and "our version and the Rif\'s version."');

// siman_178/beer-hagolah line 18
patchFile(`${base}/siman_178/beer-hagolah/part-001.txt`, 18,
  "Maggid: a non-Jew who acted as a non-Jew, etc., on a folio marked 'T'; and Rambam wrote that this is called a lion.");

// siman_179/turei-zahav line 50
patchFile(`${base}/siman_179/turei-zahav/part-001.txt`, 50,
  'And then he calls him. The reasoning of the later authorities is that it reminds one of lightning; and therefore there is no difficulty in what was used regarding lightning before; and we are compelled by the fact that it is known that lightning is the practice of astrologers, and it is the honor of Heaven that this reminds us of. Indeed, yes.');

// siman_180/baer-heitev line 18
patchFile(`${base}/siman_180/baer-heitev/part-001.txt`, 18,
  'exempt. He wrote in a responsum, Noda BeYehudah, by the leading authorities — Chatam Sofer, Kaf HaChayyim, and Peri Chadash — that they were placed under a ban by the rabbinic court, and this did not help to save him from death. Siftei Kohen.');

// siman_180/beur-hagra line 166
patchFile(`${base}/siman_180/beur-hagra/part-001.txt`, 166,
  'And as Siftei Kohen. Meaning Siftei Kohen admits that it is nothing but an evasion, and is not a gift.');

// siman_181/baer-heitev line 18
patchFile(`${base}/siman_181/baer-heitev/part-001.txt`, 18,
  'as an eye. Mentioned in counting near the flesh as an eye. Siftei Kohen.');

// siman_172/baer-heitev line 50 - the dots line
patchFile(`${base}/siman_172/baer-heitev/part-001.txt`, 50,
  'When responsibility. Siftei Kohen.');

// siman_172/baer-heitev line 91
patchFile(`${base}/siman_172/baer-heitev/part-001.txt`, 91,
  'removed. The above is because he accepts responsibility from the lender and the responsibility here is not by force; and the reason of the Mechaber is either because he is written into it in such urgency or because there is no power in the borrower\'s hand to collect his debt. Siftei Kohen.');

console.log('Patch done.');
