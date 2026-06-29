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

// siman_187/baer-heitev/part-001.txt line 92
fixLines(`${base}/siman_187/baer-heitev/part-001.txt`, [
  ['The Authority. Who is in the first minute', 'The choice is hers. However, if she examined for the first [husband] and blood was found on the cloth, she is forbidden to all. Siftei Kohen.'],
]);

// siman_187/beur-hagra/part-001.txt line 39
fixLines(`${base}/siman_187/beur-hagra/part-001.txt`, [
  ['These are the P. K. A. And if she has a quaint', 'These are the three times, etc. Gemara there 66a: and if she has a veset, etc. See Rashi there and below s.k. 11; and all the more so if she has not established a veset, she need only be concerned as for a non-fixed veset, and as written in s.k. 11 and Rashba simanim 838–839.'],
]);

// siman_187/torat-hashlamim/part-001.txt line 28
fixLines(`${base}/siman_187/torat-hashlamim/part-001.txt`, [
  ['JF is straight. A. Without a stop,', 'Three consecutive times. Without an interruption of a permitted act of relations in between; but three consecutive nights are not required. Siftei Kohen.'],
  ['for his witness. Effi found another time', "On his own cloth. Even if she found it a considerable time after relations, since it was found on his cloth, it must necessarily be due to the relations. Siftei Kohen."],
  ['D.C. will never thirst. But if it is now exciting', 'For otherwise she would never become impure. But if she now senses that this blood comes from the wound, even at the time of her veset she is pure and impure only if she does not sense that this blood comes from the wound. Siftei Kohen.'],
  ['She is the same as women. And the baby', 'She is like all other women. And it is explained in the Talmud tractate Niddah, ch. Ha-Tinokot, that there is a distinction between a minor girl or a young girl and a mature woman, between whether her time to see has arrived or not, and these distinctions are explained in responsum Magen Binyamin siman 47; see there and below siman 133.'],
]);

// siman_188/baer-heitev/part-001.txt line 18
fixLines(`${base}/siman_188/baer-heitev/part-001.txt`, [
  ['Trusted. And yes, this woman who is in her blood, she has no confidence', 'Rely. And similarly, a woman who is uncertain about her blood should not rely on her friend who showed her blood and said: "blood like this I also showed to such-and-such a sage and he declared it pure." (However, if she says this stain or this blood was declared pure by the sage, she is believed — see below siman 185 s.3 in the Hagahah.) The Tosafot wrote that a sage may examine the blood of his wife and bring it before the authorities; Maharshal.'],
]);

// siman_188/beer-hagolah/part-001.txt line 30
fixLines(`${base}/siman_188/beer-hagolah/part-001.txt`, [
  ['The Bible and the Bible:', 'Tur, and so too Rambam in ch. 5.'],
]);

// siman_188/beur-hagra/part-001.txt
fixLines(`${base}/siman_188/beur-hagra/part-001.txt`, [
  ['Even as a mirror, and as a quaint. Dr. Matthews B.C.,', 'Even like the appearance of, etc., and all the more so, etc. See Tosafot 19b s.v. ha-yarok etc., and Sukkah 31b s.v. ha-yarok etc., and Hullin 47b.'],
  ['If you are like me." Even to the KGB and to the Bible:', 'And if they delay, etc. Even according to Rabban Shimon ben Gamliel, and all the more so according to the first Tanna.'],
]);

// siman_188/yad-avraham/part-001.txt line 8
fixLines(`${base}/siman_188/yad-avraham/part-001.txt`, [
  ['(This is the sign of the KGB and that a woman whose source is named.', '(Siman 188 seif 3 in Shulchan Aruch) And a woman whose uterus has been detached, etc. In the work Tiferet Yisrael he permits a woman who sees blood from a uterus that has fallen and spread downward outside the outer chamber where seeing in this manner is not the usual way of seeing, and she should be permitted when she sees without sensation and the like; and similarly Sefer Torat Yekutiel at the end of the matter regarding a uterus that has been detached — to permit stains by rabbinic law because they are attributed to blood that comes from the crevices; but the actual blood she sees he does not permit.'],
]);

// siman_189/baer-heitev/part-001.txt
fixLines(`${base}/siman_189/baer-heitev/part-001.txt`, [
  ['The first. And we were also the first dice with the rest', 'The first. That is, the first skip itself was uniform with the remaining skips — for example, she was accustomed to see on the twentieth day and changed to see on the 21st, 22nd, and 23rd: the sighting on the 21st also counts from the reckoning, since it too was a uniform skip like the others. This is contrary to the Drisha who wrote that the first skip need not be uniform with the remaining skips, which is entirely incorrect. So wrote Taz and Siftei Kohen.'],
  ['Otherwise, it is not possible to feel here on the day of Air Air,', 'To one. Taz wrote that Bach wrote here that she is not concerned for the first day of Rosh Chodesh — and I do not know why he contradicts his own words, since he wrote above in s.k. 12 that she is concerned for Rosh Chodesh Iyar, i.e., for both days of Rosh Chodesh. And Siftei Kohen elaborated on this and concludes that the average interval means from month to month — that on the same day of the month on which she saw, she must be concerned for the following month whether that month is full or deficient; and what the Talmud says that the average interval is thirty days, etc.'],
]);

// siman_189/beur-hagra/part-001.txt
fixLines(`${base}/siman_189/beur-hagra/part-001.txt`, [
  ['And even as a. The name of the R.C. is not the same as May Kamal', 'And even so, etc. Gemara there: Rav Pappa said, What does this teach us, etc. — and the Mishnah deals with the interval veset, as stated there 39a–b; and the same applies to all other vestot, as stated there; and likewise a sighting, etc., except for a veset, etc. See Tosafot there s.v. ve-einah, etc.'],
  ['and moderate season. Indeed, he who came as a widower,', 'And the average interval. From what is stated there: 15, and the rule is that only once she has passed her time do we consider it — if she saw; but a non-fixed veset she need not fear, from what is stated: and he came and found her, etc., but not for her sighting, since she has no fixed veset.'],
  ['And the "Son." The Bible and the Bible:', 'And the same applies, etc. Also from the foregoing, and see Taz.'],
  ['And they are all called. There was a quaint and a lawyer:', 'And all of them, etc. Mishnah there: she had, etc. See below s.k. 3.'],
]);

// siman_189/nekudot-hakesef/part-001.txt line 8
fixLines(`${base}/siman_189/nekudot-hakesef/part-001.txt`, [
  ['(P.C.C.) Here is a shot that has already and a quaint.', '(Siman 189 in Taz s.k. 5) Here the discussion is of one who already has a veset, etc. This is incorrect, for it implies that the discussion is even at the beginning of establishing a veset; rather one must say that there the discussion is of one who has no veset at all and is always presumed to be a woman who sees; but here she does have a veset, only it is not fixed.'],
]);

// siman_189/siftei-kohen/part-002.txt line 41
fixLines(`${base}/siman_189/siftei-kohen/part-002.txt`, [
  ['[It is old and old. This will be explained above the letter of KGB', '[A minor girl and an elderly woman, etc. This was explained above siman 184 s.k. 3 and is also included in the words of Rashba and Tur in s.k. 27 and this seif. Know that in every place throughout this siman where it says she has established her veset, if it is to be lenient it specifically means not during the days of niddah and the days of zivah, as stated in Rashba, Tur, and other decisors.'],
]);

// siman_189/torat-hashlamim/part-001.txt
fixLines(`${base}/siman_189/torat-hashlamim/part-001.txt`, [
  ['And who if she had a jaw. The Bible and the Bible wrote', 'However, if she had a veset. Bach, Taz, and Siftei Kohen wrote that this deals with a veset that is equivalent to the skip — for example, her established veset was on the 14th — and it teaches us not to say we count the first sighting together with the sightings that preceded it so that it is still only three sightings; rather even so there are three sightings in the skip pattern. This is unlike the decisors who rule like Rav, that three sightings suffice — if she originally had a fixed veset on the 15th, two sightings of the skip pattern do not suffice.'],
  ['He did not set up and stopped. It is because I am not afraid', 'She did not establish a veset. Since she was interrupted, even according to those who are strict in seif 7; nevertheless she is concerned for the 19th of Tammuz because there are two equal intervals: from the 15th of Nisan to the 16th of Iyar is 32 days, and likewise from Iyar to the 18th of Sivan — Nisan being full and Iyar deficient — and when she sees on the 19th of Tammuz, that too is an interval of 32 from the 18th of Sivan; thus she has established a veset of interval through four sightings with three intervals. So wrote Bach and Siftei Kohen.'],
  ['Even without days. And let', 'Even without equal days. One should be concerned for the words of both to be strict; and see above end of siman 184 where there is a further practical difference between the two opinions regarding the average interval, and see what I wrote there.'],
  ['By the end of one season. "Look at what you want in this case,', 'Until the end of one interval. See in Beit Yosef what he resolves here so that there is no contradiction from above siman 184; and see in Bach and Siftei Kohen what they resolved there.'],
]);

// siman_189/turei-zahav/part-001.txt lines 420-421
fixLines(`${base}/siman_189/turei-zahav/part-001.txt`, [
  ['It should not be used until you check. It is hard to see that the D. B.D.', 'She is forbidden to have relations until she examines herself. It is difficult: for it is stated in this siman seif 4 that if she did not establish it three times and did not examine and did not see, once the time has passed she is permitted — and one cannot say that there it is after the fact whereas here it is at the outset, for there in a fixed veset the opening also says "she is forbidden to have relations until she examines herself," the very same language as here; and yet even so it says there that for a non-fixed veset she is permitted — implying even at the outset. And it appears that here, regarding yawning, it is more stringent, since it is the natural way of a woman to yawn at the time of her seeing or near it, so that there is a defect before us indicating she is impure; therefore it is stricter than other non-fixed vestot.'],
  ['A constant and comprehensive section of the "Just as the permanent period', 'And as for what is stated in seif 26 — just as a fixed veset of days requires uprooting three times and examination, so too a body veset, etc. — this implies that a non-fixed one does not require examination for this body veset: this is not so; rather, examination is mentioned there to emphasize that even though she uprooted it, examination is still required for a fixed one, and there was no intent there for a precise inference.'],
]);

// siman_190/baer-heitev/part-001.txt
fixLines(`${base}/siman_190/baer-heitev/part-001.txt`, [
  ['Pure. The Bible and the Bible received a deal in less than the Sea of Grace,', 'Pure. Taz and Siftei Kohen disputed this and ruled that if she was occupied with less than the size of a gris and found upon her an amount like two grisi, she is impure — (for even though we say the occupying amount came here, the stain amount still remains) — and even Ramban himself only declared pure where she was occupied with a gris and found upon her two grisi. End quote.'],
]);

// siman_190/beer-hagolah/part-001.txt line 327
fixLines(`${base}/siman_190/beer-hagolah/part-001.txt`, [
  ['Thor and as such, the Bible and the Bible said,', 'Tur, and so too Rashba in Torat HaBayit and Rambam in ch. 9, according to the second explanation — from the waist upward, and specifically where she crouched down, as stated in the Gemara there.'],
]);

// siman_190/beur-hagra/part-001.txt
fixLines(`${base}/siman_190/beur-hagra/part-001.txt`, [
  ['In the D.C. A rabbit and a quaint as a quaint and a quaint', 'In what case, etc. From what is stated there: Rav Nachman bar Yitzchak said — and as for the case of the dark-colored woman, etc. — and so too the explanation, like a peeled garlic.'],
  ['Who is a quaint? Madphagi in "Sch and" in the South Alma Red Sea', "In fenugreek water, etc. From the fact that Beit Shammai and Beit Hillel disagree at the end of ch. 2, it follows that it is red, and one attributes it, as with eye salve. Ra'avad and Rashba."],
]);

// siman_190/pitchei-teshuva/part-001.txt line 32
fixLines(`${base}/siman_190/pitchei-teshuva/part-001.txt`, [
  ["His disciple connected to the march of Wanda in C. K. K.", "She felt it. See responsum Shev Yaakov siman 45 regarding a woman who was sneezing with great force and due to the great force of the sneeze, urine came out downward in her estimation, since at that time she was in the women's section of the synagogue and could not examine herself and was not aware of it at all until the night when she lay down and saw below on her garment a small stain less than the measure of a gris — and she asked whether one must be concerned even below the measure since she had sensed it."],
]);

// siman_190/siftei-kohen/part-001.txt line 525
fixLines(`${base}/siman_190/siftei-kohen/part-001.txt`, [
  ['[Ade. Indeed, Miranda and Starworker because he has broken down', '[Niddah. Specifically a niddah and a non-Jewish woman — because we attribute the contamination to the one who is already in a compromised state — which is not the case if he lent it to a pure woman, for both of them are impure, as stated below; Semag. And so too interpreted Rashi in the Mishnah, and it is straightforward.'],
]);

// siman_190/turei-zahav/part-001.txt line 277
fixLines(`${base}/siman_190/turei-zahav/part-001.txt`, [
  ['And it\'s for medium-sized. The long-standing daughter brought him up', 'And specifically with a medium-grade cloth, etc. In Torat HaBayit HaAroch, brought by Beit Yosef, it is explained that the one called "unexamined" is one she takes from a concealed place, for it is the women\'s practice to conceal and prepare cloths for themselves and not to carry them in the marketplace nor to handle them with stains. But when she took a garment from the marketplace and does not know from whom she took it — whether from a non-Jewish woman, or from an Israelite woman who was a niddah, or pure, or wiped with whatever cloth was at hand in the house.'],
]);

// siman_192/torat-hashlamim/part-001.txt line 93
fixLines(`${base}/siman_192/torat-hashlamim/part-001.txt`, [
  ['His divorce should be returned. And it seems that if she is removed', 'He who remarries his divorcee must have her sit seven clean days. And it seems that the same applies if he divorced her while she was pregnant and remarried her — she must also sit seven clean days, for even though a pregnant woman is presumed to have her blood withdrawn, nevertheless we are concerned lest out of longing she saw, as with a minor at the beginning of this siman; and it is explained above at the end of siman 189 that a minor is even more stringent than a pregnant woman. And if he transgressed and married her within the time, Taz wrote that she does not require separation since he already had relations with her.'],
]);

// siman_194/beur-hagra/part-001.txt line 72
fixLines(`${base}/siman_194/beur-hagra/part-001.txt`, [
  ['And after that, who is called. The Bible and the Bible:', 'And afterward, etc., however, etc. See Taz and Siftei Kohen.'],
]);

// siman_197/turei-zahav/part-001.txt line 8
fixLines(`${base}/siman_197/turei-zahav/part-001.txt`, [
  ['properly swallowed. Without a quaint, we had a name from Seine:', 'They immersed properly. Without an interposition, and a valid mikveh — that is, one that contains forty se\'ah.'],
]);

// siman_198/beur-hagra/part-001.txt
fixLines(`${base}/siman_198/beur-hagra/part-001.txt`, [
  ['Great Jewish as well. Dodddge is not even faithful in the small,', 'A mature Jewess as well. For in a matter where a prohibition is established, a minor is not trusted even in rabbinic matters, as stated above siman 127 end of s.k. 3; and certainly a non-Jew is not trusted at all.'],
  ['In the quaint or k. D.C. and S.:', 'Regarding threads, etc., or, etc. See above s.k. 2 and s.k. 3.'],
  ['If there is a quaint. Our sages were full of dust', 'And if she immersed there is, etc. According to our version of the Tosefta, beginning of ch. 8: if his feet were full of dust and he descended and immersed in a mikveh that has forty se\'ah — pure; if he scrubbed or if he fell into hot water — impure. But this is puzzling, for the opposite should be the question; and so too it says in the final clause: a flask that was full of coals and he immersed it — impure; if he scrubbed them or immersed it in hot water — pure. And so it should be stated in the opening clause; and so too copied Rishon le-Zion in ch. 10 Mishnah 4; and so too he compares them both in the Mishnah.'],
]);

// siman_198/nekudot-hakesef/part-001.txt line 29
fixLines(`${base}/siman_198/nekudot-hakesef/part-001.txt`, [
  ['(T.S.C.) K.C.: Why do you go wrong?', '(In Taz s.k. 38) It is difficult: why should it be invalid, etc. There is no difficulty, for the explanation there is as Rosh wrote and Beit Yosef brings it, and this is its language: because the water advances — meaning that when she inserted her feet into the mud, the water had already advanced and touched her feet before they reached the mud, and those waters are connected to the mikveh, etc. Therefore it is not an interposition, since in any case the water on her feet is connected to the mikveh, as her feet touch the bottom of the vault.'],
]);

// siman_198/turei-zahav/part-001.txt
fixLines(`${base}/siman_198/turei-zahav/part-001.txt`, [
  ['The horns of quaint. According to a vampire to remove them during a diaspora', 'Wool threads, etc. Because she is particular about removing them at the time of combing or washing so that water should enter there — since there is a time when she is particular, they interpose forever; therefore it is not necessary here that this be so over the majority of her body.'],
  ['There is someone who says she didn\'t get baptized. Q. Why is it in retrospect of May', "There is one who says her immersion was not valid. It is difficult: why should it be invalid after the fact? What is different from seif 30, where we say because the water advances — here too let us say the same, for the water advanced to those folds before they adhered through erection or extensive swimming. And it is even more difficult according to the Tur's view, that even in mud on her feet, etc."],
  ['And there\'s a quaint. But if I try her and her friend,', "And there are those who are strict, etc. But if her friend compelled her and she immersed, the immersion is valid in all opinions, for her friend's intent is fully considered intent."],
]);

// siman_199/beer-hagolah/part-001.txt
fixLines(`${base}/siman_199/beer-hagolah/part-001.txt`, [
  ['M.M.M. Darvada is a page of S.A. and the Rebbe', "Dictum of Rava, Niddah 66b: like the principle of Rabbi Zeira — anything fit for mixing [batter], etc."],
  ['M.M.M. M.M. D.B.A. B. A.D. is on the ground', 'Dictum of Rava ibid., Niddah 66b: if close to the combing, etc.'],
]);

// siman_199/beur-hagra/part-001.txt line 29
fixLines(`${base}/siman_199/beur-hagra/part-001.txt`, [
  ['Not a quaint. Jim is there:', 'Without, etc. Gemara there.'],
]);

// siman_200/turei-zahav/part-001.txt line 19
fixLines(`${base}/siman_200/turei-zahav/part-001.txt`, [
  ['to another baptism. For its tastes, the Dobbled Dutbil does not belong', "Until after the immersion. Their reason is that since for a convert's immersion one cannot recite the blessing before the immersion — as he is still a non-Jew — the sages did not distinguish between the immersions."],
]);

// siman_201/siftei-kohen/part-002.txt
fixLines(`${base}/siman_201/siftei-kohen/part-002.txt`, [
  ['[And if the Wall broke up. "And the Lord has not been hacked,', '[And if the wall was breached above, etc. The same applies where it was not breached but the water flows from one to the other above the wall and sees the air — it requires the thickness of a garlic peel, and it is not sufficient to have enough moisture to wet another surface, as Rivash wrote in the name of Ramah and the Book of Commandments and Rambam; and so ruled Beit Yosef and Bach.'],
  ['Even red. The water of kosher and the breadth of the dog who were white. The Bible and the Bible:', 'Even red. The water of the valid mikveh, and the drawn water that whitened them was white. Rishon; and the matter requires investigation vis-à-vis seif 55.'],
]);

// siman_204/rabbi-akiva-eiger-yd/part-001.txt line 8
fixLines(`${base}/siman_204/rabbi-akiva-eiger-yd/part-001.txt`, [
  ['(C.R. A.) On one day you will be satisfied.', '(Siman 204 seif 1) On one day to fast on it. Even if that day was the Fast of Gedaliah — for a vow takes effect upon rabbinic obligations; and likewise one who vows from cheeses of non-Jews and afterward says: "this is like this" — as stated below (end of siman 215).'],
]);

// siman_205/beur-hagra/part-001.txt line 62
fixLines(`${base}/siman_205/beur-hagra/part-001.txt`, [
  ['There is a quaint, and there is a quaint and ap. A.C.:', 'There is one who says, etc., and there is one who says, etc., and even so, etc. See Siftei Kohen s.k. 8, 9, 10.'],
]);

console.log('Done.');
