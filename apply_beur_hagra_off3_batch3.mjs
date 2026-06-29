import fs from 'fs';
import path from 'path';

const DRY = process.argv.includes('--dry');
const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(h){ return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function loc(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'en.html'); }
function hep(siman, seif){ return path.join(base, siman, seif, 'beur-hagra', 'he.html'); }
function join(segs){ return segs.join('<br />\n'); }
function getENsegs(siman, seif){
  return brSegs(fs.readFileSync(loc(siman,seif),'utf8').replace(/^﻿/,'').trim());
}

// Off-by-3 batch 3 (cases 11–15). Append HE[N-2], HE[N-1], HE[N].
const APPEND_3 = [

  // siman177/seif-001 (he=5, en=2)
  { siman:'siman177', seif:'seif-001',
    n2:`And all this not, etc. As written in the Yerushalmi: "one who carries a bundle from place to place — he said to him: give it to me and I will pay you the way you would receive in such-and-such a place" — if at the risk of the giver, it is forbidden; the buyer is permitted; "but porters who receive from householders set up produce for them at the expensive market at the cheap price" — R' Huna said: he becomes his agent; and this challenges R' Huna: an agent who suffers loss is exempt from losses — "does it not sometimes happen that a watchman stipulates to be like a borrower" — meaning, unlike one who carries a bundle, since he also acts for his own benefit; unlike with porters; and one need not say what is written in the Gemara "it is agreeable to them that [the load] is revealed," etc. (and as written above in siman 173 paragraph 34); and there in the mishnah "one may not accept iron sheep [investments]," etc. — "what are iron sheep," etc. — R' Yirmiyah asked: "there you say a paid watchman obligated for losses — [that] is forbidden; and here you say a paid watchman obligated for losses — [that] is permitted" — meaning here in a fixed investment he said: since he accepts liability upon himself, it is forbidden; and there among porters you said: even though he accepts liability upon himself, it is permitted; and the language of the Yerushalmi is the reverse, as is known in many places — and as the Rosh wrote at the end of chapter HaDayanim; and it answers: "does it not sometimes happen that a watchman stipulates to be like a borrower" — therefore there [with porters] it is permitted since they have no benefit at all; unlike here where he takes wages and acts for his own benefit — it is forbidden when he accepts liability upon himself; and this is what is written "and even if he accepted," etc.`,
    n1:`(Supplement) And all this not, etc. As written there 70a: the Sages taught, etc. — "close to loss and far from profit — a pious person"; meaning that he takes no wages at all; and see Rashi there s.v. "close to profit," etc. (end).`,
    n:`(Supplement) And all this, etc. And likewise Rashi at the end of 72b s.v. "give me," etc.; and Tosafot 73a beginning of s.v. "the porters": "but it appears," etc.; "and the porters would profit," etc. (end).` },

  // siman271/seif-001 (he=5, en=2)
  { siman:'siman271', seif:'seif-001',
    n2:`(Supplement) That he should say, etc. Sefer HaTerumah siman 192 is uncertain about this — because regarding terumah, thought suffices, as written in chapter 3 of Shevuot and chapter 2 of Kiddushin; and we say in chapter 1 of Terumot: "five," etc. — "the mute," etc.; and the Yerushalmi says: "because of the blessing — otherwise thought suffices"; but regarding piggul specifically speech is required, as written in Pesachim 63a; and see Tosafot there s.v. "R' Meir holds," etc. (end).`,
    n1:`And if they are processed, etc. See what I wrote there, seif 2.`,
    n:`And he should mark, etc. — and not, etc. See Shach.` },

  // siman276/seif-009 (he=5, en=2)
  { siman:'siman276', seif:'seif-009',
    n2:`And some have the version, etc. This is like the last version that Kesef Mishneh wrote in Rambam; and it is the correct one, for the Gemara listed it; and it is certainly a sacred name; and likewise the Yerushalmi listed it in chapter 1 of Megillah; and even though the Gemara and Yerushalmi enumerate many including them, they are only seven; and so it is in Masekhet Soferim chapter 4 halachah 1 — except that the name Elohim was omitted there; and halachah 2: "one who writes aleph-lamed from the four letters," etc.`,
    n1:`(Supplement) And some have the version, etc. Meaning the version "Elok" is not read separately since it is included in "Elohim" — rather this is singular and that is plural, like "Adon" and "Adonim"; and the distinction between them is providence and governance — in general or in particular. And the name Y-K was not counted since it too is included in the essential name, even though the name aleph-lamed was counted — because it is one root meaning strength and power, as we find used elsewhere: "there is power in my hand" (Genesis 31:29); "the mighty ones of the land" (Ezekiel 17:13); but the name Y-K is also from the essential name, denoting existence and perpetuity — therefore we do not find it used independently elsewhere; and likewise in the Gemara, Yerushalmi, and Masekhet Soferim it was not counted separately; and so all seven names are arranged in the Gemara — only one should consider each "Elok" name as one. But according to its Aramaic translation, Y-K is the name of awe; and it seems that this is the dispute of Rashbam and R' Elazar in the Yerushalmi (chapter 2 of Chagigah) and in the Midrash (parashat Bereishit 12); and in our Gemara we hold like R' Elazar, as written in chapter 3 of Menachot (29b): "what is written 'ki v'Y-K,'" etc. (end).`,
    n:`"Asher Ehyeh." The same applies to the third Ehyeh — but he states the greater novelty, that even "Asher Ehyeh" is sacred; and it is not like "Elokei HaElohim" where the second is non-sacred — as written there, halachah 4; and they are only three.` },

  // siman297/seif-051 (he=5, en=2)
  { siman:'siman297', seif:'seif-051',
    n2:`(Supplement) For in all prohibitions, etc. As written in chapter 9 and we learn: "sellers," etc. (end).`,
    n1:`(Supplement) For in all prohibitions, etc. For we rule the halachah follows R' Shimon — as written in chapter 10 of Shabbat (95a) and chapter 10 of Eruvin; and nowadays, etc.; and we learn many [cases]; and likewise in all prohibitions; and as written in Bekhorot 34a: "until now," etc.; and see above siman 301 seif 6 in the gloss and siman 313 seif 6 (end).`,
    n:`Seif-marker 25. And if it is not, etc. See Rashi in Zevachim there s.v. "but R' Shimon," etc.; and Tosafot in Shabbat 103a s.v. "there is no need," etc.
Seif-marker 26. And some say it is not, etc. The Rosh in the name of Ravyah — from what is written in the mishnah there: "one may not tie," etc.
Seif-marker 27. And some disagree. There in the name of R' Efraim — from what is written in the Yerushalmi and the Tosefta aforementioned: "Issi ben Akavya," etc.; "and if regarding garments," etc. — "an animal," etc. — "and garments — only without tying," as written in Shabbat 54a; and likewise implied in the Gemara there: "if you say kil'ayim of a person," etc. — "rather," etc. — hence kil'ayim of a person raises no [objection] from tying, etc.; and in the Sifrei it expounds "together" — kil'ayim of garments [applies] to tucking; and "together" in plowing — to include threshing and leading, etc. — and does not say likewise "to include tucking"; and his proofs are compelling; and see Rosh there, where Ravyah resolved some of them [but only] with difficulty. And likewise they dispute whether a labor [specifically associated with Shabbat] is required — for in Shabbat there it implies it is not required; and Ravyah proved that a labor is required from the Yerushalmi of Kil'ayim there on the mishnah "one may not tie the horse," etc.: "Tanna: R' Meir exempts if he was assisting — whether going up or whether," etc.; and R' Shimshon cited it; and R' Efraim refuted this because they are not driving together — for one is in front of the wagon, etc.; and the view of Rashi there s.v. "if we say," etc. is like Ravyah; and likewise Tosafot there s.v. "but the mishnah," etc., and the Rosh there; and in the Yerushalmi there it implies like Ravyah, who said: "R' Yirmiyah asked: if they tied them by their hair — what is the law? In what case are we dealing — if they tied them by their hair, so we say it is forbidden to ride an animal atop its fellow; if they tied the rope by their hair — we say because they carry the rope between them" — hence specifically during the performance of the labor; and when tied [by their hair] — they are both together.` },

  // siman389/seif-005 (he=7, en=4)
  { siman:'siman389', seif:'seif-005',
    n2:`And even it is, etc. — laundering — some say, etc. — there are those who say, etc. See all of this in Orach Chaim siman 551, what is written there.`,
    n1:`(Supplement) And even it is, etc. For what is written [in Ta'anit 29b]: "linen garments are not subject to the prohibition of laundering" — they said this of old ones, since sweat and dirt do not come out of them fully; unlike here regarding new ones; and in the Yerushalmi (chapter 3 of Mo'ed Katan): "what is laundering? New wool garments and ironed white linen garments" — we learn that even linen garments are subject to the prohibition of laundering; and likewise we say in chapter Erev Pesach (109a) regarding ironed linen garments; however, we hold according to our Gemara that even wool garments [are forbidden] specifically when white (end).`,
    n:`And for his father, etc. For even though the Yerushalmi (end of Mo'ed Katan) says twelve months — we rely on what is written in Alfasi (chapter 9): "until the pilgrimage arrives and his companions rebuke him," etc.; and as written in the Gemara (22b) regarding haircut — and they follow one law; except that regarding laundering without a pilgrimage his companions do not notice [so as] to rebuke him, unlike with a haircut. Torat Ha'Adam — unlike Rambam who ruled according to the unattributed Gemara: regarding laundering they made no distinction at all, and he ruled that even for one's father and mother [the prohibition is] until thirty days — see there (end).` },

];

let ok = 0, fail = 0;
for (const { siman, seif, n2, n1, n } of APPEND_3) {
  const ep = loc(siman, seif);
  const hp = hep(siman, seif);
  try {
    const heS = brSegs(fs.readFileSync(hp,'utf8').replace(/^﻿/,'').trim());
    const enS = getENsegs(siman, seif);
    const diff = heS.length - enS.length;
    if (diff !== 3) {
      console.log(`SKIP ${siman}/${seif}: diff=${diff} (expected 3, he=${heS.length} en=${enS.length})`);
      fail++; continue;
    }
    const newSegs = [...enS, n2, n1, n];
    if (DRY) {
      console.log(`DRY ${siman}/${seif}: he=${heS.length} en=${enS.length} → ${newSegs.length}`);
    } else {
      fs.writeFileSync(ep, join(newSegs), { encoding:'utf8', flag:'w' });
      console.log(`OK ${siman}/${seif}: ${enS.length}+3 → ${newSegs.length} segs`);
    }
    ok++;
  } catch(e) {
    console.log(`ERROR ${siman}/${seif}: ${e.message}`);
    fail++;
  }
}
console.log(`\nDone. ok=${ok} fail=${fail}`);
