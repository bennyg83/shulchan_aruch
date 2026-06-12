#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
}

// --- mechaber (2) ---
patchFile('siman_012/mechaber/part-001.txt', 'mechaber', {
  '1#main': `Not to slaughter into a pit. In it are 2 seifim. One may not slaughter into the pit even at home; and if he did not want to soil his house with blood he should make a sloped place outside the pit and slaughter there, and the blood pours and goes down into the pit; and in the market he should not do so.`,
  '2#main': `Some say that if he slaughtered into a pit in the market it is forbidden to eat from his slaughter until they inspect him afterward—perhaps he is an apikores. (Rambam chapter 2 of laws of shechitah and Ittur.) And some say that b'dieved it is permitted and there is no need for inspection. (Rashba and Mordechai in the name of R' Avraham.) {Rama: And in our time, since the way of idolaters is not thus, there is reason to permit b'dieved (A"Z and in slaughter practices of R' Moshe of Mödlingen).}`,
});

// --- siftei-kohen (5) ---
patchFile('siman_012/siftei-kohen/part-001.txt', 'siftei-kohen', {
  '1#א': `<b>Into the pit.</b> And even if it is not clean from dust it is forbidden—as many poskim wrote—and the Rashba wrote the reason: for thus is the way of apikorsim to gather at the pit and eat upon it.`,
  '1#ב': `<b>He makes a place, etc.</b> For then it is recognizable to all that he intends to clean his house—Tur; and in the market it is forbidden because he need not clean the market, and therefore even if no one sees him it is forbidden—similar to a house.`,
  '2#א': `<b>Forbidden to eat from his slaughter.</b> Meaning also this slaughter that he slaughtered into the pit; and it appears from the Rashba's words that according to this view the same applies if he slaughtered into seas and vessels—that it is forbidden to eat from his slaughter; and the nafka mina is even for those who say as the Mechaber wrote regarding needing inspection afterward from here onward—as written in s.k. afterward—that similarly for water and vessels the law is thus.`,
  '2#ב': `<b>And there is no need for inspection.</b> After him in order to validate that slaughter—for even without inspection we do not remove a person from the presumption of reliability, and what he slaughtered is kosher; and that which is in the Gemara "needs inspection afterward" means in order to disqualify him from here onward—if they find he is an apikores we say everything he slaughtered retroactively into the pit was for avodah zarah and all is forbidden in benefit—as Maharshal wrote in chapter HaShochet siman 23; and the same for seas and vessels, as in s.k. before this.`,
  '2#ג': `<b>And in our time, etc.</b> This refers also to the above siman 11, and so is explicit in A"Z that he brought in Darkei Moshe siman 11.`,
});

// --- turei-zahav (3) ---
patchFile('siman_012/turei-zahav/part-001.txt', 'turei-zahav', {
  '1#_': `<b>Into the pit.</b> Even if it is not clean—for it appears as one collecting blood there, for such is the way of Kutim.`,
  '2#א': `<b>And no need for inspection.</b> Maharshal wrote; nevertheless if they inspected him and found him a heretic (min) we forbid retroactively what he slaughtered into the pit and forbid even in benefit.`,
  '2#ב': `<b>And in our time, etc.</b> This refers also to seas and rivers and into the vessel in siman 11, as Maharshal translated in the name of A"Z.`,
});

// --- baer-heitev (4) ---
patchFile('siman_012/baer-heitev/part-001.txt', 'baer-heitev', {
  '1#א': `<b>The pit.</b> And the Shach wrote: even though it is not clean from dust it is forbidden—and the reason is such is the way of apikorsim.`,
  '1#ב': `<b>Thus.</b> And the reason is because he need not clean the market, and even if no person is there it is forbidden—unlike in his house where it is recognizable to all that he intends to clean his house.`,
  '2#א': `<b>Inspection.</b> And the Shach wrote: this is specifically for that slaughter he just slaughtered; but from here onward inspection is needed—and the same for one who slaughters into seas and vessels, the law is thus.`,
  '2#ב': `<b>B'dieved.</b> And the Shach wrote: this Rama gloss refers also to the above siman 11.`,
});

// --- beer-hagolah (4) ---
patchFile('siman_012/beer-hagolah/part-001.txt', 'beer-hagolah', {
  '1#א': `Mishnah Chullin daf 41, and as Rava explains there.`,
  '1#ב': `Rambam chapter 2 of laws of shechitah from the baraita there, and so appears from Ba'al HaItur in the name of Geonim.`,
  '1#ג': `Rashba in Teshuvot and Mordechai in the name of Ra'avan.`,
  '2#_': `(°) Explanation: to validate that slaughter—not only to disqualify him from here onward.`,
});

// --- beur-hagra (3) ---
patchFile('siman_012/beur-hagra/part-001.txt', 'beur-hagra', {
  '1#_': `<b>Even at home.</b> Rashi s.v. kol ikar.`,
  '2#א': `<b>(Seif 2) Some say, etc.</b> Rambam, and as said in the Gemara there "and if he did so," etc.`,
  '2#ב': `<b>And some say, etc.</b> From what is taught in the mishnah at the beginning "one who slaughters for the sake of mountains," etc.—disqualified; and at the end "one who slaughters for the sake of an offering," etc.—disqualified; and in the middle it teaches "one may not slaughter," etc.; and there is no difficulty—"disqualified" means l'chatchila only. And Rashi s.v. bedikah acherav, etc., explains that inspection is not to validate him but to disqualify him from here onward after inspection. Rashba (and in Beit HaGadol s.k. 23 it is cited in error).`,
});

// --- kereti (9) ---
patchFile('siman_012/kereti/part-001.txt', 'kereti', {
  '1#א': `Into the pit—for thus did ancient idolaters: they collected blood into the pit and there they sat and performed sorcery and divination with it.`,
  '1#ב': `A pit—and even if it is not clean—nevertheless there is marit ayin.`,
  '1#ג': `A sloped place—and even if there is a garbage dump there, so that he could slaughter there—nevertheless the Sages permitted it.`,
  '1#ד': `A slope and to slaughter toward a vessel and from there the blood goes down into the pit—one should not permit, for they only permitted on a ship where it is impossible otherwise.`,
  '1#ה': `And in the market—it appears in a place where the city's ministers are strict and fine if they make a garbage dump in the market; certainly even in the market it is permitted when there is no marit ayin at all.`,
  '2#א': `Until they inspect—and the same applies to the above in siman 11 regarding one who slaughters into seas and the like; and see Peleti what I wrote that in the Gemara this was said only regarding one who slaughters toward a pit—and one can distinguish; see there.`,
  '2#ב': `That it is permitted, etc.—and if they inspected and found a heretic (min)—the view of Maharshal and later authorities is to forbid the slaughter retroactively; and see Peleti what I wrote that there is no concern for avodah zarah, only perhaps he is of the class of diviners and sorcerers, and one should disqualify him from here onward.`,
  '2#ג': `And in our time—see Peleti what I wrote that this is a matter forbidden by vote, etc.—see there.`,
  '2#ד': `There is reason to permit—and the view of the later authorities is the same for all mentioned in the siman before this: one who slaughters into seas and vessels—the law is thus. And see Peleti what I wrote that we have only this law of one who slaughters toward a pit, and not those above.`,
});

// --- peleti (2) ---
patchFile('siman_012/peleti/part-001.txt', 'peleti', {
  '1#_': `And no need for inspection—for we establish a person in the presumption of reliability; and if a heretic (min) is found we say everything he slaughtered retroactively into the pit was for idolaters and all is forbidden in benefit—as Maharshal wrote extensively, and the later authorities translated his words; but his words are not so—for what he decided regarding one who slaughters toward a pit that it was for idolaters is not so, for those who slaughter into a pit do not intend in slaughter for avodah zarah at all; and for what is he suspected? Only perhaps he is of the class of diviners and sorcerers with blood collected into the pit. And in their view sorcery happens to them that they prophesy futures—and see Ramban in the Torah in the portion "you shall not eat upon the blood," and Israel in the time of Saul who ate upon the blood did so in this manner too and were not suspected for avodah zarah on account of this—only he is in the category of diviner and sorcerer and similar of the abominations that the Place forbade. And if we come to disqualify slaughter because he is a heretic (min)—it is no worse than a mumar for avodah zarah, that for that matter his slaughter is not disqualified retroactively, only from here onward. And so Rashi wrote "and they separated from his table"—meaning from eating with him, but not to forbid his slaughter. And it suffices that we hold him retroactively suspect since we saw him make a pit and slaughter—but not to rule his slaughter retroactively forbidden; and with this it works out that one who slaughters toward a pit needs inspection and not one who slaughters for mountains and the like—and the later authorities learned this from that; and in the Gemara only this is mentioned—but it is the matter that there concern for avodah zarah was not suspected of Israel, therefore to serve avodah zarah; and it is only marit ayin—but to slaughter toward a pit to gather demons in his view so that he prophesy within the house and tell futures—this was common until the holy people of God in the days of Samuel and Saul did so; therefore inspection is needed—and it is simple and clear.`,
  '2#_': `And in our time, etc.—I wonder: behold this is a matter forbidden by vote—even if the reason was nullified, another vote is needed to permit it; and the view of the Rambam in laws of mamrim: the greater is greater in wisdom and vote—and see below siman 116 regarding revelation that they stood on this and wrote that even then the head did not decree; and see there in Peri Chadash who extended—and this is not relevant here, for at that time there was a general decree; if so, what of it that the reason was nullified—a matter that was forbidden remains, and it requires further study. And what appears to me: those rabbis hold that what we learned "and in the market he should not do so"—the reason is not that in the market it is not relevant to dig his courtyard. Rather in the market, in a place where many people are common, they should not do so because of marit ayin—for the majority will judge that he does so to strengthen ways of heresy, for thus they did in their times; but in a place where there are not many people it is permitted and they did not decree at all. If so, in our time when gentiles do not do so and no person raises to his heart such abomination and foolishness to connect with demons and the like—the market has returned to a secluded place, for even if many people are there no person raises in his heart that he does so for a strange intent and will perform an abomination—and it is in seclusion; and even at that time they only decreed in the market. And this is what appears to me in its settlement; but according to this there must be a recognizable marker like a slope—for otherwise even in a courtyard it is forbidden. And the later authorities also sought to explain in those laws above—slaughtering into a river and vessels—that nowadays it is not relevant; and this is not so—for the language of the Rama implies explicitly only regarding one who slaughters toward a pit. And he is according to what is written correctly: that in this the Gemara conditioned specifically in a place where many people are common; but in those above where it was not conditioned—if so they revert to the general rule of a matter forbidden by vote and are forbidden—and so is correct.`,
});

// --- rabbi-akiva-eiger-yd (1) ---
patchFile('siman_012/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd', {
  '1#_': `(Siman 12 Shach s.k. 5) <b>that he brought in Darkei Moshe siman 11.</b> See below siman 28 in Shach s.k. 10.`,
});

// --- kaf-hachayim (2) ---
patchFile('siman_012/kaf-hachayim/part-001.txt', 'kaf-hachayim', {
  '1#_': `<b>(a) [Seif 1] One may not slaughter into a pit, etc.</b> Because it is a statute and custom of heretics to slaughter in it for avodah zarah, and it is written "you shall not walk in their statutes." Levush. Zivchei Tzedek note 1.`,
  '2#_': `<b>(b) There. One may not slaughter into a pit, etc.</b> And even in a pit that is not cleaned from dust it is forbidden. Beit Yosef in the name of Semag. Levush. Bach. Taz s.k. 1. Shach s.k. 1. Peri Chadash note 1; Perat note 1; and he wrote unlike Rashbatz who only forbade in a pit that is clean. Likutei Piskei note 1; Beit Lechem Yehuda note 1; Kereti note 2; Shem Chayim note 3; Mesharet Tzaddik note 1; Kometz Klal note 5 note 12. Shulchan Gavoah note 1; Zivchei Tzedek there. And even if there is water in it it is forbidden—Shem Chayim there; Kometz there; Zivchei Tzadik note 1. But if it is full of earth or water it is permitted—Shem Chayim there. And this means if the water is not clear it is permitted—Minhagim in Kometz note 13; Minchat Yosef note 1.`,
});

console.log('siman 012 done');
