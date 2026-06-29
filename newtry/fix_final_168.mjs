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

// siman_168/beur-hagra remaining 3 lines
const f168bg = `${base}/siman_168/beur-hagra/part-001.txt`;

patchLine(f168bg, 307,
  'If the non-Jew is coercive. For then he is like a thief who took from one and gave to another — as long as the first has not despaired he must return it to him; and as stated in Bava Batra: Talmud says "the thief," etc., "granted," etc.; and see Tosafot there. Mordechai.');

patchLine(f168bg, 477,
  'And moreover, lekhatchilah, etc. I think this is very close to fixed ribbit. There is no name in the Tosafeta and Yerushalmi except that of non-Jewish money deposited with a Jew — it is forbidden to lend it to Jews at interest. And this means the money is with him as a loan, as stated in Sefer HaTerumah; and likewise in reverse, from a Jew to a non-Jew, as stated.');

patchLine(f168bg, 855,
  'Collateral, etc. That its responsibility be upon the collateral; and as stated above seif 17; and see Siftei Kohen.');

// siman_168/pitchei-teshuva line 28
patchLine(`${base}/siman_168/pitchei-teshuva/part-001.txt`, 28,
  'To your first words I believe. See in responsum Radbaz HaChadashot siman 305 who wrote that even if the collaterals were books and the like, where it is clear they belong to the Jew, his oral admission obligates him — for we say the Jew transferred them to the non-Jew in order to pledge them for the non-Jew\'s sake. And another writer: even if he did not say to him explicitly from the outset that the collaterals belong to the non-Jew, but said to him "it is for the non-Jew\'s sake" — while giving the collaterals to him without specification — we say he transferred them to the non-Jew in order for him to pledge them, even though it is known they belong to the Jew.');

// siman_168/turei-zahav remaining 9 lines
const f168tz = `${base}/siman_168/turei-zahav/part-001.txt`;

patchLine(f168tz, 7,
  'I will raise it for him, etc. For he is acting as his agent to give the non-Jew interest, and it is analogous to one who says to his fellow "I will lend you on condition that you give the interest to the non-Jew" — which is obviously forbidden; and even if the lender owes the non-Jew nothing at all, since he gives the non-Jew interest by way of the loan payment at the lender\'s direction, it is fixed ribbit. So wrote Tur.');

patchLine(f168tz, 18,
  'Give me principal and interest is forbidden. For since he received it directly from the Jew, it appears as if he is giving ribbit to the non-Jew through the non-Jew\'s agency. So wrote Tur. And the fundamental principle here is that there is no agency for a non-Jew — whether from non-Jew to Jew or vice versa.');

patchLine(f168tz, 176,
  'And if the non-Jew were to compel Reuven, etc. In Beit Yosef in the name of a responsum of Rosh: the reason is that since the non-Jew is present at the time the money is lent, the lender has no dealings at all with Reuven — end quote. And it seems that even if that collateral was not worth the full amount, the interest accruing after the sale is also excluded; and it is unlike the case in siman 170 where Rama wrote "but not the interest that accrues from this point forward" — for there the Jew pays the interest to the non-Jew on behalf of the other Jew, whereas here the non-Jew pays. [Nekudot HaKesef] And I find it puzzling that this contradicts what Rama wrote in seif 4 — that the Jew compels the non-Jew to give interest to him, knowing the non-Jew will compel the Jew, etc. And it is an a-fortiori argument: here the Jew ultimately has dealings with the lender, taking the collateral and selling it and retaining the money, and everything he gives for that delay is delay payment (agar natar), making it fixed ribbit for a Jew — yet it is permitted since it began in a permitted manner, and we do not say it appears like ribbit. How much more so above, where ultimately the lending Jew has no dealings at all with the borrowing Jew, and the beginning was permitted — for there is no agency for a non-Jew even to be stringent, so we are not concerned with what the non-Jew compels the Jew, and it does not appear like ribbit. And it seems clear that Rosh follows his own reasoning that disagrees with Rama\'s ruling in seif 5 where he distinguishes between credit and collateral, as I wrote there; and likewise the other poskim disagree as I noted there. If so there is a contradiction in Rama\'s rulings here, and Levush who follows him. It appears to me that the main halachah is the ruling here, since the ruling above is the view of Maharam, who is alone against the many I cited there; and the prohibition in seif 5 is only due to the non-Jew\'s agency being stringent; and where the custom is to be lenient as stated in seif 7, there is no prohibition. So it appears to me.');

patchLine(f168tz, 177,
  'And if the non-Jew were to compel Reuven, etc. [Second block continues:] And it appears that even if the collateral was not worth the additional interest accruing after the sale — it is unlike the case in siman 170 where the Jew pays the non-Jew\'s interest; whereas here the non-Jew pays. And this requires investigation.');

patchLine(f168tz, 190,
  'A non-Jew who said yes, etc. For the Jew is the agent of his fellow Jew even if the collateral\'s responsibility was on the agent. Derishah ruled thus, unlike Beit Yosef who forbids it — for there is no logical reason that the lender needs responsibility except after the loan. And what Tur wrote, that the agent must say "you shall be my agent to bring the collateral from the non-Jew" — this is after he gave the money to the agent; or alternatively, since the Jew sent him to lend to the non-Jew and bring the collateral, he became his agent immediately; and therefore the lender must accept responsibility. Unlike when the broker brings the collateral before the lender sent him — then he need not return it to the non-Jew and take it back on the lender\'s responsibility. "But I am concerned about your words" — meaning Maharshal: that you should not give me a bad name saying I took ribbit from you. Or: even though I do not believe you when you say it is yours, I do believe you came on your own to redeem it and not at the non-Jew\'s behest; and therefore if the non-Jew does not come I will keep them for myself.');

patchLine(f168tz, 233,
  'They are permitted to borrow from the non-Jew) Although the trustees are like guardians over the community, it is nevertheless forbidden — for it is also forbidden regarding a guardian of orphans; and so wrote Beit Yosef in the name of Rashba at the end of this siman, concluding: behold this is like one who says to his fellow "the hundred zuz you owe so-and-so, lend it to me and I will give a hundred per year to your creditor" — and I see fixed ribbit here. Rama\'s reason to permit here is that he does not consider it fixed ribbit; and since it is for a mitzvah purpose it is like a guardian of orphans; and furthermore it appears that the non-Jew who lends knows the loan is for the community\'s need, and his guarantee is on the entire community if there is no one among them to pay.');

patchLine(f168tz, 328,
  'The non-Jew\'s responsibility. Meaning: for the purpose of paying if the debts are lost — he pays Israel as the law of any borrower; but it does not suffice to accept responsibility as a guardian, even as a borrower, since he was not made a borrower on them. Beit Yosef in the name of Sefer HaTerumah.');

patchLine(f168tz, 350,
  'If they are on Israel\'s responsibility. Here too, the responsibility must be in the manner stated above — that if the debt is lost, he pays it; and if there is no responsibility except as a guardian, it is permitted. And Beit Yosef wrote in the name of Sefer HaTerumah: if he said to the non-Jew "lend money to such-and-such Jew at interest, and if you find no assets to collect from him I will pay you" — it is permitted as the law of a guarantor.');

patchLine(f168tz, 361,
  'Guardian over his property. Meaning: over all his assets — we say by default that the money he lends also belongs to the non-Jew; and there is no concern of appearance.');

// Also check siman_170/turei-zahav for remaining garbage
const f170tz = `${base}/siman_170/turei-zahav/part-001.txt`;
const t170 = readFileSync(f170tz, 'utf8');
const l170 = t170.split('\n');
for(let i=0;i<l170.length;i++){
  if(/star worker|Starwork|quaint/i.test(l170[i])) console.log('170/tz still:', i, JSON.stringify(l170[i].slice(0,60)));
}

// check 177/turei-zahav
const f177tz = `${base}/siman_177/turei-zahav/part-001.txt`;
const t177 = readFileSync(f177tz, 'utf8');
const l177 = t177.split('\n');
for(let i=0;i<l177.length;i++){
  if(/star worker|Starwork|quaint/i.test(l177[i])) console.log('177/tz still:', i, JSON.stringify(l177[i].slice(0,60)));
}

console.log('Done.');
