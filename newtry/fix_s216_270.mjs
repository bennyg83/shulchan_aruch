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

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

// ── siman_216/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_216/baer-heitev/part-001.txt`, [
  [
    'Growing up. For there is no seed, and the Bible does not prohibit crops',
    'In their growth. Bach wrote: Rambam, Rosh, and Tur forbid growth-of-growth only in a case of "konam, that which I eat or taste of them" — and thus we rule — end quote. But Turei Zahav and Siftei Kohen disagree with him and ruled like the Mechaber:'
  ],
  [
    'forbidden. (It is not written in my life and my death is forbidden.) It seems that Dama fell',
    'forbidden. (It is implied that even if he did not say "in my life and in my death" it is forbidden.) And it appears that if it fell and he rebuilt it, it is permitted — as above se\'if 5. And likewise if he said "konam, when it leaves my possession" — he cannot impose the prohibition, since the prohibition must begin while it is still in his possession. Siftei Kohen:'
  ],
]);

// ── siman_220/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_220/baer-heitev/part-001.txt`, [
  [
    'From time. That is, seven days above the hour of Henderson.',
    'From the time. That is, seven full days — twenty-four hours — from the hour he vowed. Siftei Kohen:'
  ],
  [
    'in tongue. The Bible and the Bible wrote if it had been the first Bible',
    'in language. Siftei Kohen wrote: accordingly, if he was standing on the first Rosh Chodesh and said "this month" — the prohibition applies from the first Rosh Chodesh onward as well:'
  ],
]);

// ── siman_220/pitchei-teshuva ────────────────────────────────────────────────
fixLines(`${base}/siman_220/pitchei-teshuva/part-001.txt`, [
  [
    'First Ed. See the answer of the new Radb of the KGB',
    'First Adar. See the responsum of the new Radbaz siman 103 who wrote that one who vowed or swore to do a certain thing in the leap-month is obligated to do it in Adar I, as Adar I is what is called the leap-month — see there:'
  ],
]);

// ── siman_221/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_221/baer-heitev/part-001.txt`, [
  [
    'Moving. It is written that the Bible and the Bible, even if it is not shortened',
    'To pass through. Turei Zahav and Siftei Kohen wrote: even if it does not shorten his route — it is nonetheless forbidden in any case; and this is unlike the Bach:'
  ],
  [
    'Warming. The Bible and the Bible will be forbidden here and in the clothing',
    'To warm himself. Turei Zahav and Siftei Kohen puzzled over this — why should it be forbidden here? And Levush wrote that it refers back to the earlier case of "the benefit of your food upon me" — and so it is correct:'
  ],
  [
    'Goon. I would like to give them the pleasure of this kind of food',
    'To feed them. Even though the one under the vow benefits incidentally — since he need not provide their sustenance — that benefit comes about of itself; moreover, they could manage by living frugally from their own labor or by going from door to door. Siftei Kohen:'
  ],
  [
    'his death. Even in nutritious foods to nipple it is forbidden',
    'his animal. Even extra fodder to fatten it is forbidden, since it raises its value — and that is a complete benefit. Siftei Kohen wrote: Ran says even if he feeds it more than is needed to fatten it — which in fact harms it, since it is kept for work rather than slaughter — and by overfeeding it works poorly, and thus he derives no benefit — it is nonetheless forbidden:'
  ],
  [
    'in their heart. If the husband does not want to receive their affection',
    'for free. And if the owner of the lost object does not wish to receive it for free, the benefit shall fall to hekdesh. Siftei Kohen:'
  ],
  [
    'sold. The sages will not buy that S and P.S. is not even fun at the sale',
    'sell. For the Sages decreed against this lest he come to buy the Talmud; and accordingly even if he derives no benefit from the sale it is forbidden as a rabbinic decree. And likewise lending it — a decree lest he come to lend or borrow. Siftei Kohen:'
  ],
]);

// ── siman_221/beer-hagolah ───────────────────────────────────────────────────
fixLines(`${base}/siman_221/beer-hagolah/part-001.txt`, [
  [
    'M.M.M. Darbpa has a page called "G":',
    'The statement of Rav Pappa there, folio 33a:'
  ],
]);

// ── siman_221/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_221/beur-hagra/part-001.txt`, [
  [
    'It is possible to swipe . As a result of the Starwork:',
    'It is permitted to slaughter, etc. As written in chapter 1 of Chullin (8a) regarding a knife of idolatry:'
  ],
]);

// ── siman_224/turei-zahav ────────────────────────────────────────────────────
fixLines(`${base}/siman_224/turei-zahav/part-001.txt`, [
  [
    'He is not allowed to be. See the KGB sign from this:',
    'He is not permitted to do so. See Siftei Kohen on this siman:'
  ],
]);

// ── siman_228/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_228/baer-heitev/part-001.txt`, [
  [
    'delayed. Whether he is delayed to a contractor or not to which he is exempted.',
    'delayed. Whether he is delayed lawfully or unlawfully — his fellow is exempt. Siftei Kohen:'
  ],
  [
    'A.D. If vowing to be tortured and deprived of his studies',
    'a mitzvah. And if he vowed to fast and thereby neglects his Torah study, it is permitted to release that vow — since Torah study is equal in weight to all else — so wrote Bach. However, one for whom the fast does not harm him or cause him to neglect study — it is obvious that one cannot release it. Siftei Kohen:'
  ],
]);

// ── siman_228/beer-hagolah ───────────────────────────────────────────────────
fixLines(`${base}/siman_228/beer-hagolah/part-001.txt`, [
  [
    'There are answers to the Bible and the Bible:',
    'There in the responsa of Ramban — see there:'
  ],
]);

// ── siman_228/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_228/beur-hagra/part-001.txt`, [
  [
    '"Isn\'t there?" The Bible and the Bible said',
    '"The fact that there is no, etc." Rambam and other decisors. And Beit Yosef wrote that he wishes to resolve thereby the difficulty of Tosafot in Ketubot 63a s.v. "ada\'ata" etc., and they further adduced proof from what was permitted in the case of "kado tahit" and similar — for he is not considering whether one regrets on account of an unforeseen circumstance:'
  ],
]);

// ── siman_228/pitchei-teshuva ────────────────────────────────────────────────
fixLines(`${base}/siman_228/pitchei-teshuva/part-001.txt`, [
  [
    'Peace between man and his wife. See the answer of the oil of the KGB and the G-d there:',
    'Peace between a man and his wife. See the responsum of the oil of anointing and the commentary there:'
  ],
]);

// ── siman_228/turei-zahav ────────────────────────────────────────────────────
fixLines(`${base}/siman_228/turei-zahav/part-001.txt`, [
  [
    'There will be no backs in him. In the Bible called Rashi',
    'That there be no overseers over him. In Beit Yosef in the name of Rashba it is explained that this matter is a benefit, since this appointment is disqualifying for a non-Jew and a ger toshav, and it is considered a position of authority for him — and in the previous se\'if we wrote of this. {Nekudot HaKesef: But in truth this requires investigation, to understand the matter in Beit Yosef which cited this in the name of Rashba — that by forbidding himself the role of overseer, he forbids this benefit to himself and to the people of his town. And he concluded: since he benefits, he may not be asked of the scholar of the town — but this is difficult, for even though he forbade himself from them in this particular benefit — namely the overseership — he did not forbid himself from all other benefits. Is this not analogous to one who forbids himself from the wine of the people of his town — would he thereby be forbidden to be asked of the scholar of the town? Evidently the same applies here. And if one were to say that he may not be asked of the local scholar because the vow contains a prohibition of benefit for them, and the scholar would be an interested party in the release — as I wrote above in explaining Tur — this is difficult, since Beit Yosef does not hold that view; and moreover, why did Rashba conclude "since he benefits" — he should have said "since they benefit." And it seems to me that there is a scribal error in Rashba\'s words and it should read "since they benefit." Requires investigation. Furthermore, this requires investigation — for accordingly the rabbi of the town would be forbidden to release any vow pertaining to all communal appointments, if one swore he would not accept it — and I believe this is not the practice; see what I wrote in this siman se\'if 33.}'
  ],
]);

// ── siman_229/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_229/baer-heitev/part-001.txt`, [
  [
    'Everyone. Epic said a few days later on another person would be multiplications',
    'all of them. Even if he said so several days later regarding another person — "let it be like so-and-so" — and likewise a vow from meat, and he attached bread to the meat. But when his fellow said "and I" — each one must say it within the time it takes to say a greeting, as above siman 204. Siftei Kohen:'
  ],
  [
    'Buried. And the Lord\'s Word is a sign of Hashem\'s covenant',
    'his fellow. And see below siman 234 se\'if 21 — regarding a woman who vowed and another attached himself to her vow, and then the husband annulled her vow — she is permitted and the one who attached himself is forbidden. Siftei Kohen:'
  ],
]);

// ── siman_229/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_229/beur-hagra/part-001.txt`, [
  [
    'Who\'s called and Duke Cho. The Bible and the Bible:',
    'Who is called, etc., and specifically, etc. See Turei Zahav and Siftei Kohen:'
  ],
]);

// ── siman_232/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_232/baer-heitev/part-001.txt`, [
  [
    'I did. And if he says that in his mind he was on a day or day-to-day faithful',
    'I did. And if he says that in his mind it was for a day or two — he is believed, since we have circumstantial testimony that such was certainly his intent, given that it is impossible to fulfill his vow otherwise. But if he forbade himself only a few fruits — he is not believed unless he was under duress, as below se\'if 14. Siftei Kohen:'
  ],
  [
    'in the world. We were when Bell said there were no fruits of the world at all',
    'in the world. That is, when he used language that would include no fruits of the world at all — since otherwise the vow would not take effect at all, as above se\'if 5 — except that he forbids himself fruits of trees and fruits of the ground. Siftei Kohen:'
  ],
  [
    'Today. And if the governor interprets him, he will never think of all the time',
    'today. And if the ruler makes explicit to him the word "forever" — he should understand it as: all the time I am in fear of you — unless some need arises or another condition presents itself. Siftei Kohen:'
  ],
  [
    'forbidden. He wrote from the PA and from abroad that if he had issued a condition',
    'forbidden. Maharshal wrote: nevertheless it appears that if he articulated the condition in a whisper — it is permitted; for even though there is still some desecration of God\'s name, we do not impose the stringency to that extent given that he faces great duress and is compelled. End quote. However, verbal retraction in a whisper only helps if done within the time it takes to say a greeting. Siftei Kohen:'
  ],
]);

// ── siman_234/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_234/baer-heitev/part-001.txt`, [
  [
    'to break. Affith died from the father after her death the most so-called Stu.',
    'to annul. And even if the father died after she became betrothed — the law is as stated, as below se\'if 15. Siftei Kohen:'
  ],
  [
    'can. There is no husband who can break vows that have been previously vowed',
    'can. For the husband cannot annul vows she vowed beforehand. Even though a betrothed man annuls vows she vowed beforehand — as above se\'if 5 — that is because they annul together in partnership; but the husband, since she has already left her father\'s authority, means the husband cannot annul alone. Siftei Kohen:'
  ],
  [
    'Father. Dham did not violate the father\'s authority at the time of John defer',
    'the father. For even though if the father did not annul at all she returns to the father\'s authority — nonetheless, since he annulled during the lifetime of the betrothed man it is worse, because the betrothed man\'s portion has been weakened and there is no power to transfer it to the father. Siftei Kohen:'
  ],
  [
    'The first. And so that the husband\'s wife before us should be allowed by the diagnostics.',
    'the first. And therefore, where the husband is not before us, she may be released by three laymen. Siftei Kohen:'
  ],
  [
    'divided. Eat a word Kai.',
    'they disagree. This refers to the entire matter. Siftei Kohen:'
  ],
  [
    'The feast. According to C. R. R. R. R. R. D.C., D.C. is a mental torturer.',
    'the feast. See above siman 235 se\'if 3 which implies it is not a vow of self-affliction. Siftei Kohen:'
  ],
]);

// ── siman_234/beer-hagolah ───────────────────────────────────────────────────
fixLines(`${base}/siman_234/beer-hagolah/part-001.txt`, [
  [
    'The Bible and the Bible, called the Ramban, did not break down from it, and it was agreed:',
    'Rosh and Tur and Ran in the name of Ramban, that the first tanna also does not disagree regarding the specific case — and to this they agreed:'
  ],
]);

// ── siman_236/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_236/baer-heitev/part-001.txt`, [
  [
    'offence. And this is an oath.',
    'transgression. And lashes also apply — and this is a false oath. Siftei Kohen:'
  ],
  [
    'called. We follow the language of human beings, and we do not intend to fly a camel',
    'calls it. For we follow the language of ordinary people — and ordinary people do not call a bird a camel — and his view is nullified before all people. Siftei Kohen:'
  ],
]);

// ── siman_236/rabbi-akiva-eiger-yd ──────────────────────────────────────────
fixLines(`${base}/siman_236/rabbi-akiva-eiger-yd/part-001.txt`, [
  [
    '(Section V) years that a sword from the Al-Fanders of G-d in his book of Religious Fire',
    '(Se\'if 6) two who took an oath. Rabbi Chaim Alfandari of blessed memory in his book Esh Dat al HaTorah wrote in Parashat Korach that it appears that likewise if a Jew swore to do something with a non-Jew — since a non-Jew is not subject to the law of oaths, the Jew is exempt from that oath — end quote. As regards the halacha, the matter requires investigation:'
  ],
]);

// ── siman_237/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_237/baer-heitev/part-001.txt`, [
  [
    'Written. And he said, "And I will tell you what is written in them',
    'written in them. And it is written in the responsa of Maharam Mintz that if he opened them and swore by them — it is as if he said "by what is written in them." And even though the case there concerns the Ten Commandments, it appears the same applies to all holy books — for they share the same rationale. Siftei Kohen:'
  ],
  [
    'Fuck. That is to say, they have been sworn in on the right and left',
    'that he intends. That is to say, his intention is to swear by the right and left hand of the Holy Blessed One — and then it constitutes an oath, even though he mentioned neither a Name nor an epithet. This is unlike the view of Bach. Siftei Kohen:'
  ],
]);

// ── siman_237/turei-zahav ────────────────────────────────────────────────────
fixLines(`${base}/siman_237/turei-zahav/part-001.txt`, [
  [
    'Working stars or small. And a prophetic mirror that he swore to her righteousness',
    'a non-Jew or a minor. A proof from Nebuchadnezzar who made Zedekiah swear, and from Jethro who made Moses swear — and a minor is no less than a non-Jew:'
  ],
]);

// ── siman_239/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_239/baer-heitev/part-001.txt`, [
  [
    'Probably. For example, in the mouth of a man who does not intend to be baptized on the road',
    'certainly. For example, if he states explicitly that he does not intend it as exaggeration or hyperbole — but that he certainly saw the loaf then — it is forbidden. Siftei Kohen:'
  ],
]);

// ── siman_239/rabbi-akiva-eiger-yd ──────────────────────────────────────────
fixLines(`${base}/siman_239/rabbi-akiva-eiger-yd/part-001.txt`, [
  [
    'And the Bible and the Bible have stopped. In the book of the sons of Jacob',
    '(Siftei Kohen se\'if katan 20) and Maharshal and Bach ruled. And in the book Benei Yaakov on the Itur at the end of the work in responsa (siman 1):'
  ],
]);

// ── siman_240/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_240/baer-heitev/part-001.txt`, [
  [
    'his clothes. Who is allowed to sue the sentence as follows in the G-d.',
    'his garments. However, he is permitted to take him to court, as below se\'if 8 in the gloss. Siftei Kohen:'
  ],
  [
    'enslaved. It seems that her husband doesn\'t need anything like the man.',
    'obligated. And it appears that if her husband does not insist, she is obligated in all matters that are possible — the same as a man. Siftei Kohen:'
  ],
]);

// ── siman_240/turei-zahav ────────────────────────────────────────────────────
fixLines(`${base}/siman_240/turei-zahav/part-001.txt`, [
  [
    'The smell of thirst. And that was the act of star worker in Ashkelon',
    'mere profit. And this refers to the incident of the non-Jew in Ashkelon who forfeited profit for the sake of honoring his father:'
  ],
]);

// ── siman_242/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_242/baer-heitev/part-001.txt`, [
  [
    'Really. The island is not really Kai Arbo, but to his face',
    'literally. This word "literally" does not refer to his teacher, but to "in his presence" — meaning in his literal presence even a peer-student is forbidden. Siftei Kohen:'
  ],
  [
    'Ordinaryly. We were in B&D or on the market day of each week',
    'routinely. That is, on Mondays and Thursdays or on the weekly market day — but the annual market day, such as a fair, is not called routine. Siftei Kohen:'
  ],
  [
    'Act. But if a teacher of an act that came before him even asked',
    'a case. But if a ruling on a case came before him — even if asked whose ruling to follow — he is forbidden to say "as so-and-so ruled." Siftei Kohen:'
  ],
  [
    'Yes, me. And it is written after a month to write as well as in his father above C.C. in the Bible.',
    'I hereby commit. And even in written form that takes effect after twelve months — he must write it similarly, as with his father above siman 240 se\'if 9 in the gloss. Siftei Kohen:'
  ],
  [
    'and wrong. We were a rupture that fell apart, and not a clear enough.',
    'and tears his garment. That is, a tear that is stitchable — not the full tearing required for a distinguished teacher. Turei Zahav. And two Torah scholars who study together and challenge and resolve each other\'s questions — some rule that their status is like that of one\'s distinguished teacher regarding standing and tearing, and some disagree. And see below siman 340 se\'if 8. Siftei Kohen:'
  ],
]);

// ── siman_242/beer-hagolah ───────────────────────────────────────────────────
fixLines(`${base}/siman_242/beer-hagolah/part-001.txt`, [
  [
    'M.M.M. M.M.M.R.D.:',
    'The statement of Rava there, in Eruvin folio 63a:'
  ],
]);

// ── siman_242/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_242/beur-hagra/part-001.txt`, [
  [
    '"And he was eaten." The Bible and the Bible are there.',
    '"And some say the same applies to all, etc." Rambam — and likewise wrote Rashi in Eruvin there. But it is difficult from the case of Reish Lakish who ruled in the presence of Rabbi Yochanan in chapter 4 of Ketubot — and Rabbi Yochanan said: what shall I do, etc. — and a student is forbidden to disagree with his teacher. Granted, according to Tosafot (Bava Metzia 84a and elsewhere) who hold that he was initially a great man, it is understandable — but according to Rashi it is difficult. See also Maharik. And it appears that with permission it is permitted in this case too — see below se\'if 32:'
  ],
  [
    'And if he was a . He also learned from the A. D.M. in the Bible that I should not enter with Starworkers',
    'And if he was, etc. This he also derived there from what Pirkei d\'Rabbi Eliezer states — that it is forbidden to enter a bathhouse with non-Jews. And Mordechai wrote that if he entered first, he need not leave — see Rabban Gamliel in chapter 4 of Tractate Avodah Zarah, and as above siman 153 se\'if 3 in the gloss:'
  ],
]);

// ── siman_242/pitchei-teshuva ────────────────────────────────────────────────
fixLines(`${base}/siman_242/pitchei-teshuva/part-001.txt`, [
  [
    'Every wise man." See the Bible as it is written and in these generations',
    '"Every wise man, etc." See Maharsha in his Chiddushei Aggadot, chapter 3 of Sotah, who wrote: and in these generations, those who issue rulings from the Shulchan Aruch — they do not know the rationale of each matter unless they first carefully study it from the Talmud, which is the service of Torah scholars — an error has entered their rulings, and they are among those who destroy the world; therefore they must be reproved — see there. And it is possible that this applied specifically in the era of the Maharsha, when there was not yet any commentary on the Shulchan Aruch; but nowadays that Turei Zahav, Siftei Kohen, Magen Avraham, and other later authorities have been composed and every law\'s rationale is explained in its place — it is entirely proper to rule from the Shulchan Aruch and the later authorities:'
  ],
]);

// ── siman_242/rabbi-akiva-eiger-yd ──────────────────────────────────────────
fixLines(`${base}/siman_242/rabbi-akiva-eiger-yd/part-001.txt`, [
  [
    '(Psalm) but in the midst of Hashem\'s glory. This includes the Bible and the Bible:',
    '(Se\'if 17 in the gloss) but at an entrance requiring a mezuzah. And included in this are a synagogue and a house of study:'
  ],
]);

// ── siman_246/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_246/baer-heitev/part-001.txt`, [
  [
    'sleeping. In the Bible, I was told that I did not sleep in the Bible',
    'sleeping. Beit Yosef cites what is said in the Talmud about Rabbi Zeira who said he never slept in the synagogue — neither fixed sleep nor incidental sleep. And one must say that incidental sleep he avoided as a matter of piety, but by strict law it is permitted — as written in Orach Chaim siman 151 se\'if 3 — end quote, Siftei Kohen:'
  ],
]);

// ── siman_248/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_248/beur-hagra/part-001.txt`, [
  [
    '"He\'s a son." In addition, the PA brought the Bible to the Bible from the Bible',
    '(Anthology) "a son, etc." Tosefta, cited by Rashbam in Bava Batra 43b s.v. "zeh sheyyakh" and Mordechai in chapter 1 of Bava Batra and other decisors (end):'
  ],
]);

// ── siman_251/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_251/baer-heitev/part-001.txt`, [
  [
    'with. To Al-Aqsa, it is not even the poor of star workers to the rider',
    'together with. Not specifically together with — but even the poor of non-Jews alone we support for the sake of the ways of peace. Ran:'
  ],
  [
    'to his cows. And it is written that Hashem forbids us and His people.',
    'to redeem him. And it is implied that likewise it is forbidden to feed him and support him. Siftei Kohen:'
  ],
  [
    'Otherwise. This means even another city of Israel. The Bible and the Bible:',
    'another. This implies even another city within the Land of Israel. Siftei Kohen, and likewise wrote Bach:'
  ],
  [
    'to his relatives. In the name of Mordechai, the rich can give us poor relatives',
    'to his relatives. As in Beit Yosef in the name of Mordechai — that the tithe may be given to poor relatives; but if he pledged charity together with the townspeople, he may not give it to his relatives. Siftei Kohen:'
  ],
]);

// ── siman_252/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_252/baer-heitev/part-001.txt`, [
  [
    'his father. And if his father is even wise, his father is not considered',
    'his father. And if his father is a Torah scholar — even if he is not on a par with his teacher — his father takes precedence, as above siman 242 se\'if 34. Siftei Kohen:'
  ],
  [
    'Immediately. In this case, the chief of young orphanages',
    'immediately. And one collects for this even from the assets of minor orphans. Even though the rule is that we do not take proceedings from the assets of minor orphans — as written in Choshen Mishpat siman 110 — there the reason is that testimony is not received except in the presence of the parties, and minor orphans are considered as if absent. But here no reception of testimony is needed, since by Torah law one is obligated to save him; and moreover, if one had to wait until the orphan grew up, no person would ever redeem any orphan with his funds — so wrote Mahariv at the end of siman 148. (He also wrote that a wife is not obligated to redeem her husband from her dowry assets.) One who owes money to a non-Jew or capitation tax — he is in the category of redeeming captives and the community is obligated to pay on his behalf; but one must know with certainty that he cannot afford it himself. However, if he is a swindler or accustomed to borrowing from non-Jews so that others will redeem him — one does not redeem him. Radbaz part 2 siman 163. (Maharam of Lublin siman 15 wrote regarding one who was imprisoned on a claim that he fornicated with a prostitute — even though by strict law the community need not redeem him, since the Name of Heaven must not be desecrated, one should redeem him; specifically when they did not seek to kill him — but if they sought to kill him, they are obligated by law to redeem him. And likewise in Yad Eliyahu — see there):'
  ],
]);

// ── siman_253/pitchei-teshuva ────────────────────────────────────────────────
fixLines(`${base}/siman_253/pitchei-teshuva/part-001.txt`, [
  [
    'There can be no escape. See the Lord in the heavens as the head of the KGB',
    'Creditors cannot collect. See the responsum Beshamin Rosh siman 93 and the gloss of Kesav Dayan there, what they wrote on this:'
  ],
]);

// ── siman_254/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_254/baer-heitev/part-001.txt`, [
  [
    'Received. And the taste is like a victim who receives from them',
    'accept. And the rationale is that it is like a sacrifice which one accepts from them; and since charity atones — therefore one does not accept from them. But vow-offerings and freewill-offerings do not come to atone. Siftei Kohen:'
  ],
]);

// ── siman_254/siftei-kohen ───────────────────────────────────────────────────
fixLines(`${base}/siman_254/siftei-kohen/part-001.txt`, [
  [
    '"And given to the people of the stars." But not for Israel\'s affairs because of the fact that Bush had been harvesting',
    '"And it shall be given to the poor of non-Jews." But not to the poor of Israel — for it is written "when its harvest dries up it shall be broken" — meaning when the merit in the hands of non-Jews is exhausted and the moisture of their charitable deeds dries up, then they shall be broken:'
  ],
]);

// ── siman_258/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_258/baer-heitev/part-001.txt`, [
  [
    'Nothing. For he is not in his possession, and if he says that I am familiar',
    'anything. Since it is not in his possession. But if he said "this field which I am selling you — when I buy it back from you it shall be consecrated" — it is consecrated when he buys it back from him, since it was within his power to consecrate it from that moment. But if he already sold it and told him "this field that I sold you — when I buy it back from you it shall be consecrated" — and he subsequently bought it back — it is not consecrated, since at that time it was not within his power to consecrate it. And even if he said "this field which I mortgaged to you for ten years — when I redeem it from you it shall be consecrated" — it is consecrated when he redeems it, since it is within his power to redeem it. But if he said "it shall be consecrated from now" — it is not consecrated, since it is mortgaged to the creditor. All this is derived from the Talmud Ketubot. Siftei Kohen:'
  ],
  [
    'When they come. And the "Eth" says so, "This is what the Almighty must do',
    'when it comes. And likewise even if he says this regarding a thing not yet in existence, he is obligated to fulfill it — as written in Choshen Mishpat siman 217 se\'if 7 in the gloss. Siftei Kohen:'
  ],
]);

// ── siman_261/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_261/beur-hagra/part-001.txt`, [
  [
    'If not so." On the other hand, on the Shabbat, KGB:',
    'If not so, etc. Specifically regarding himself — and as written in Shabbat 133b:'
  ],
]);

// ── siman_262/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_262/beur-hagra/part-001.txt`, [
  [
    'But his pain is so. As a Starworker as a "B":',
    'But his pain is so. As written in tractate Avodah Zarah 28b:'
  ],
]);

// ── siman_264/yad-avraham ────────────────────────────────────────────────────
fixLines(`${base}/siman_264/yad-avraham/part-001.txt`, [
  [
    '(J.S.A.) is converted to the Bible or so on to its own as a star worker.',
    '(Siman 264 se\'if 1 in the gloss) an apostate regarding the entire Torah, or etc., or regarding uncircumcision — his law is like a non-Jew. In the book Even HaEzer, [the author] disagrees with the gloss. And in my novellae on Orach Chaim siman 189, I wrote to reconcile and uphold the ruling of the gloss:'
  ],
]);

// ── siman_265/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_265/baer-heitev/part-001.txt`, [
  [
    'Congratulations. It means that Hashem is blessed to bring him into his covenant',
    'blessing. This implies that no blessing is needed at all — not even the blessing "to bring him into His covenant" which the father also need not recite. Siftei Kohen:'
  ],
]);

// ── siman_266/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_266/baer-heitev/part-001.txt`, [
  [
    'A lot. D.D. D. D.C., the parts of Milin earlier tonight are between the suns',
    'like Rabbah. For his view is that walking three parts of a mil before nightfall constitutes twilight; therefore one circumcises on the ninth and not on Shabbat. Siftei Kohen:'
  ],
]);

// ── siman_266/beer-hagolah ───────────────────────────────────────────────────
fixLines(`${base}/siman_266/beer-hagolah/part-001.txt`, [
  [
    'It changes the name of the KGB:',
    'It changes the name — see Siftei Kohen:'
  ],
]);

// ── siman_266/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_266/beur-hagra/part-001.txt`, [
  [
    'Androgenus. The Bible and the Bible:',
    'And an androgynos. Like the first tanna, and as written at the end of chapter 8 of Yevamot:'
  ],
]);

// ── siman_266/rabbi-akiva-eiger-yd ──────────────────────────────────────────
fixLines(`${base}/siman_266/rabbi-akiva-eiger-yd/part-001.txt`, [
  [
    '(P.g.,) He is cursed on the Shabbat. It is also alleged that in a star worker',
    '(Se\'if 12) one circumcises him on Shabbat. At first glance, one would also circumcise on Shabbat a non-Jew born of a Jewish woman; however, according to what Maharsha wrote in Kiddushin (folio 75b) in the Tosafot there — that he holds that regarding a non-Jew who had relations with a Jewish woman, the offspring is a non-Jew and requires conversion — accordingly one does not circumcise him on Shabbat. And see the book Atzei Arazim in Even HaEzer (siman 4 se\'if katan 4):'
  ],
]);

// ── siman_267/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_267/baer-heitev/part-001.txt`, [
  [
    'intentionally. The opinion of the D.C. is intended and the opinion of the IDF',
    'intentionally. The view of Tosafot is that intention is not required, and likewise appears the view of Rosh, and this is the conclusion of Tur. Siftei Kohen:'
  ],
  [
    'fine. And the taste has already been explained in the Bible, the sign A. D. D. D.',
    'a fine. And the rationale is that it has already been explained in Choshen Mishpat siman 1: if one seized the fine, we do not take it from him — and the slave seizes himself, since his body is with him. Siftei Kohen:'
  ],
  [
    'Her brain. And for the money above, D. D. D. D. D. D. D. D. D. D. A. D. D. A.D.',
    'objects. And it is not analogous to money above se\'if 26, where some say he goes free even against the slave\'s will — for there the master is content to receive the money and conveys the slave\'s freedom willingly. Not so in the case of a document. Siftei Kohen:'
  ],
  [
    'The stamps. But if we know that we are not told before the witnesses',
    'the marks. But if we know that the witnesses before whom the document was not given did not see the marks, they are not able to verify the document — and see this in accordance with Shulchan Aruch and Siftei Kohen on this siman:'
  ],
  [
    'And even. And the knowledge of Hashem\'s people, and the glory of Hashem\'s people',
    'And even. The view of Tosafot and Rosh is that in such a case he goes free; and see in Even HaEzer where both views are explained. Siftei Kohen:'
  ],
  [
    'Nothing. Devi when Thor de Ashire in which he was half and that Don\'t be released',
    'nothing. For it is like a reservation — since he reserved half of him; and since he did not go fully free, he also does not acquire the assets. Siftei Kohen:'
  ],
  [
    'slave. And we were just, but if it were to say that it had come about for the sake of the men',
    'a slave. That is, when it was unspecified. But if his actions imply that he had relations with her for the sake of marriage — the offspring is a free person, since he certainly intended to free her; for had he not, he would have been engaging in a prohibited union. As implied by Maggid Mishneh. Siftei Kohen:'
  ],
  [
    'in debt. In the midst of Mr. or his wife, Ans raped him to kill',
    'toward a debt. Against the master\'s will — or if a violent person rose against him to kill him and he bribed him with the slave — he does not go free, for no penalty applies since it was done under duress. Siftei Kohen:'
  ],
  [
    'allowed. For he is an abominator and the book of the Davidi does not have any charge for his worship because he himself has been knocked by a star worker',
    'permitted. For it is as if one saves him from their hands. And Turei Zahav wrote: there is certainly no obligation upon his master to redeem him, since he himself threw himself into the hands of a non-Jew — but if his master can redeem him for less than his value, he is permitted to take his worth from the non-Jew and write a deed of sale on him — end quote:'
  ],
]);

// ── siman_267/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_267/beur-hagra/part-001.txt`, [
  [
    'And yes, a star worker. Name of "Va":',
    'And likewise a non-Jew, etc. There, folio 46a:'
  ],
  [
    'And so it\'s the same. The name of R.A. said Rabbi Abda, who was married as a slave',
    'And they compel, etc. There, Rabbi Elazar said in the name of Rav Avda: a slave who married, etc. — he goes free; and not only that, but his master is compelled and writes him a bill of manumission. This is the reading of Rif, Rosh, and Rambam:'
  ],
]);

// ── siman_267/siftei-kohen part-001 ─────────────────────────────────────────
fixLines(`${base}/siman_267/siftei-kohen/part-001.txt`, [
  [
    '[And he was driving in a slave. For example, Kanau was a rabbi from Israel or was jealous of a Starwork worker',
    '[And he conducted himself in the commandments of a slave. For example, his master purchased him from an Israelite, or purchased him from a non-Jew and immersed him for the purpose of slavery, and he served as a slave in his home. Tur:'
  ],
  [
    'He worked from a star worker. "No matter how we bought them."',
    'One who purchases a slave from a non-Jew. Even though he acquired him through the modes by which a slave is acquired:'
  ],
  [
    '[If they say yes. To know Rashi and the column of the Lord if he did not enter the authority of the Star worker',
    '[If he handed him over, etc. According to Rashi and Tur, the same applies if he did not transfer him into the non-Jew\'s possession, but borrowed against him on condition that when that time comes the lender may take the slave — and the time passed and he did not give the money, even though he was not actually seized and still remains in his master\'s possession: he is penalized and the slave goes free:'
  ],
]);

// ── siman_267/siftei-kohen part-002 ─────────────────────────────────────────
fixLines(`${base}/siman_267/siftei-kohen/part-002.txt`, [
  [
    'You can take a qua. It is not because a seller worked for a star worker, because he is as a guide to them:',
    'It is permitted to take, etc. And there is no issue of selling one\'s slave to a non-Jew here, since it is as if one saves him from their hands:'
  ],
]);

// ── siman_267/turei-zahav ────────────────────────────────────────────────────
fixLines(`${base}/siman_267/turei-zahav/part-001.txt`, [
  [
    'The body does not buy it. It is written and the people who live with you from whom you buy',
    'The body is not acquired by him. For it is written: "And also from the children of the residents who sojourn among you, from them you may buy" — and the Sages expounded: you may buy from them, but they may not buy from you, nor may they buy from one another — meaning ownership of the body, only ownership of his labor. Therefore when the Israelite took him back from the non-Jew, he did not acquire from him the body, only his right — that is, his labor:'
  ],
  [
    'There is no rabbi to work. D.A. that can enslave him as a G-d who sold a star worker',
    'His master cannot subjugate him. For one might have thought he could subjugate him even though he sold him — since the non-Jew acquired not the body but only his labor:'
  ],
  [
    'Confused him. According to the fact that he is investing in selling him to a star worker:',
    'He is penalized. Because he has removed him from the commandments by selling him to a non-Jew:'
  ],
  [
    'And there is no gun to get it out. In the column he wrote and does not seem to be able to make a deed',
    'And his master cannot redeem him. In Tur it writes that the master cannot redeem him — implying at first glance that there is an obligation to redeem him if possible. But this is puzzling — for he himself threw himself into the hands of the non-Jew. Rather one must say that the Tur is speaking in the normal manner, and the meaning is: if the Israelite cannot profit from this and give some money on his behalf — for he would certainly not give his full value, as he can buy another in the market — but only something less than his value; and then certainly the Israelite does willingly what he does here. When it is not possible for him in this way and he therefore wants to take his full value — it is permitted:'
  ],
]);

// ── siman_268/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_268/baer-heitev/part-001.txt`, [
  [
    'Dless. This should be done and immersed in another damn.',
    'since not. Therefore one should circumcise him and immerse him afterward. Siftei Kohen:'
  ],
  [
    'Distance. And he said, "Anything that is in the midst of a baptism is buffered',
    'interposition. For we say in the Talmud: anything that interposes in immersion interposes for a convert. And see below siman 198 what constitutes an interposition in immersion — and likewise a valid mikveh is required as for the immersion of a niddah. Siftei Kohen:'
  ],
  [
    'Right. And he does not listen to him, but if he does not want to live even when Israel is attacked.',
    'a merit. And even though he lacks understanding, we act on his behalf — for we may act in a person\'s interest without his knowledge. But if he does not wish to convert — he is not a convert, even when the hand of Israel is strong. So wrote Bach and Siftei Kohen:'
  ],
]);

// ── siman_268/siftei-kohen ───────────────────────────────────────────────────
fixLines(`${base}/siman_268/siftei-kohen/part-001.txt`, [
  [
    '(But before years. For a few years, but to one another, and it is proven in the ethos',
    '(But before two. Not specifically two, but even before one — and this is proven in Tosafot in chapter HaCholets s.v. "yesh lecha edim" (folio 44). However, one may say it states two, since if those who know him are the same person who was the non-Jew — he is not believed to say "I converted myself" as below — and therefore there must be at least two who know he converted properly. And regarding a woman, it appears that at the time she immersed herself, there needed to be men who saw her immerse in order to serve as witnesses in the matter. Perishah:'
  ],
  [
    'Israel should not be signed. The Starworker does not raise them out of her hands',
    'an Israelite is forbidden to cut it off. For a non-Jew — we neither raise them from a mortal danger nor lower them into it. But if there is no cure in the matter, it is permitted. And likewise where it is permitted to heal them — such as because of enmity or for payment — it is permitted. And see below at the end of siman 263:'
  ],
  [
    '"But who comes here." In other words, in those who were held by a star worker',
    '"But one who comes, etc." That is, specifically one who was established as a non-Jew and said "I converted" — these things were said. But one who was not established as a non-Jew and said he is a non-Jew who converted in a proper court — he is believed through a miggo, since if he wished he could have said he is an Israelite:'
  ],
]);

// ── siman_268/turei-zahav ────────────────────────────────────────────────────
fixLines(`${base}/siman_268/turei-zahav/part-001.txt`, [
  [
    'Not a statue of Leah. In the Talmud, he said that Rabbi Lira Bar Armithha',
    'We do not disqualify him. In the Talmud: a certain man called another "son of an Aramean woman" — because his mother had not immersed for the purpose of conversion — as Ran explained. Rav Assi said: did she not immerse for her niddah status? Rashi and Ran explained: and that immersion serves as her immersion for conversion, since a non-Jewish woman does not immerse for niddah status; and similarly for a man — immersion for seminal emission. And Rif wrote regarding this: this applies after the fact — that if he fathered a son from a Jewish woman, we do not disqualify him — meaning, we do not refer to him as "son of a non-Jew," since distinguished members of Israel will not intermarry with him even though he is fit — for even regarding a non-Jew or slave who had relations with a Jewish woman, whose offspring is fit, distinguished families nonetheless do not intermarry with him — as in the case in chapter HaCholets where Rav approved the man and wished to give him his daughter, and Rav punished him so that he became a heap of bones. And regarding this, Rif writes here that there is no disqualification of non-Jewish ancestry at all; and likewise is the intent of Rabbenu Chananel in Tur at the beginning of this siman, who wrote that the sons enter the congregation:'
  ],
  [
    'But as a star worker. It means that there are no holy saints:',
    'But as a non-Jew. Meaning, regarding the fact that his betrothal is not valid:'
  ],
]);

// ── siman_269/baer-heitev ────────────────────────────────────────────────────
fixLines(`${base}/siman_269/baer-heitev/part-001.txt`, [
  [
    'and a place. Dea Kiddushin took him in a place that was not close to a tyrant',
    'and divorces her. For betrothal takes effect for him with her, since they are not relatives — as every female convert is like a newborn child. So wrote Levush. But sisters who converted from the same father — one may marry even ab initio. And as has been explained, he is not forbidden in the relatives of the father. Siftei Kohen:'
  ],
  [
    'in their life. And there is a stop even after her death is forbidden',
    'during their lifetime. And some rule that even after their death it is forbidden — and this appears to be Tur\'s view, to be stringent. Siftei Kohen:'
  ],
]);

// ── siman_269/beer-hagolah ───────────────────────────────────────────────────
fixLines(`${base}/siman_269/beer-hagolah/part-001.txt`, [
  [
    'The words of the column from M.M.M. Darmmar will read a page like "A.A."',
    'The language of Tur — from the statement of Ameimar in Yevamot folio 22a — and it implies that Rav Nachman there, when he heard this statement of Ameimar, became silent and conceded to him. And we are not concerned about confusion with an Israelite, since testimony is accepted only in a court and they are expert in the matter:'
  ],
]);

// ── siman_269/beur-hagra ─────────────────────────────────────────────────────
fixLines(`${base}/siman_269/beur-hagra/part-001.txt`, [
  [
    'Star workers are not called. It is the name of Hashem\'s people',
    'A non-Jew is forbidden in the relatives of his mother, etc. As Rava said there: this that the Sages said, etc. — whether in relatives on his own side and whether in relatives of his wife\'s side — and as he will write:'
  ],
]);

// ── siman_269/siftei-kohen ───────────────────────────────────────────────────
fixLines(`${base}/siman_269/siftei-kohen/part-001.txt`, [
  [
    '"A Star worker is forbidden in the rest of his mother." That is to say',
    '"A non-Jew is forbidden in the relatives of his mother." That is to say, if he was not yet married to a relative of his mother and he converted — he is forbidden to marry any relative of his mother. And as will be explained. And Etz Tzunim wrote: in this case it appears to me that even if he married he must divorce, since he married under a prohibition — for the law of Judaism is more stringent. End quote. And see below se\'if 5:'
  ],
  [
    '"But if he married his brother when he was a star worker, he was allowed.',
    '"But if his brother married her when he was a non-Jew — she is permitted. She is not the wife of his brother, since the brother had no valid betrothal with her, having married her while a non-Jew:'
  ],
]);

console.log('\nAll files processed.');
