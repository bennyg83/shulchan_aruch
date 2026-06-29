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
  console.log(`Fixed ${count}:`, file.split(/[\\/]/).slice(-3).join('/'));
}

const BASE = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

// ============================================================
// SIMAN 143
// ============================================================

// siman_143 / baer-heitev
fixLines(`${BASE}/siman_143/baer-heitev/part-001.txt`, [
  [
    'his. And his part shows him that if he were the father of his mother',
    'his. And his portion is counted for him — that if the wall\'s thickness was two cubits he counts his one cubit and enters another three cubits within his own. Rashi and the Ran. And Tosafot wrote: even according to the one who says one does not worship fragments — it deals here where the idolatry was of Israel or of a gentile and Israel bowed down to it; and in the Jerusalem Talmud it establishes it as one who bowed to every stone — end.',
  ],
  [
    'rented. For it is not called the work of the stars, but in the last crater',
    'rented. For it is not called idolatry except with the last blow struck with the hammer; and the last blow has not a perutah\'s worth; and the rental is continuous from beginning to end; and every small part he does — he is permitted to take his wage.',
  ],
  [
    'The lounge. It is not to be permitted, but rather a way of helping a friend who is building with them',
    'The lounge. It appears there is no permission except through mere assistance alone — that he be building together with them; but to build it alone is forbidden for everyone. And all this for the halacha; but in practice it is certainly proper to be stringent and to distance from the ugliness and the like, to forbid even assisting them. And Beit Yosef wrote in Bedek HaBayit: one who sells his house willingly for idolatry — the money is forbidden and he brings it to the Dead Sea; but if under compulsion the money is permitted.',
  ],
  [
    'Goodly. The Bible and the Bible are not allowed to hide and burn away from it',
    'Goodly. Turei Zahav wrote: therefore it is forbidden to grind and bake in mills and ovens of idolatry. And Rashba wrote: "without benefit" means the whole world benefits from it without any favor; but if they waive for an individual — it is forbidden, for on the contrary he benefits from idolatry that benefits him, as below siman 149 regarding tax. The Perishah challenged: what is different from wax candles in siman 139 — if they were extinguished and sold they are nullified, yet he benefits the priests? The answer: they decreed only when they made a rule for their priests that it will always be so; not so regarding a candle — on the contrary their rule is that all of it goes to the idol; only this person sells it occasionally, it is as if he sells other movable things that do not belong to the idol at all, and it is permitted. And Shach wrote: regarding a verbal favor — if others had a share in it, it is permitted, since a verbal favor is only rabbinic and we rule leniently.',
  ],
  [
    'ease. And the Bible ceased to make the oppressor worse it would have come to the bees if not by Israel',
    'ease. And the Bach ruled stringently where this profit would not reach the priests if not through this Israelite who gives it; but if he would not buy those fruits or bathe in the bathhouse, gentiles would come and buy fruits or bathe in the bathhouse — it is permitted; and see below end of siman 148 and 149.',
  ],
  [
    'for her employees. The crowds with the servants of the idol are cavalry and the radar:',
    'for her employees. Meaning: the common folk who worship that idol — so explained Rashi and the Ran.',
  ],
]);

// siman_143 / beer-hagolah
fixLines(`${BASE}/siman_143/beer-hagolah/part-001.txt`, [
  [
    'Changing the Starwork page from "Z:',
    'Mishnah Avodah Zarah 47a.',
  ],
  [
    'Name in G-d:',
    'There in the Gemara.',
  ],
  [
    'There is a name in the Torah, and as is the case of the Holy One, it is divided into the midst of a rocky musician and trees, and as a result of the Rambam and as such, it is in their name:',
    'There in the mishnah; and as the Jerusalem Talmud explains — half and half applies to stones and wood; and so the Rambam chapter 8, and so the Ran in their name.',
  ],
  [
    'Change the name of the page:',
    'Mishnah there 16a.',
  ],
  [
    'M.M. Darabi is there:',
    'Statement of R. Yirmiyah there.',
  ],
]);

// siman_143 / beur-hagra
fixLines(`${BASE}/siman_143/beur-hagra/part-001.txt`, [
  [
    'If he does not know. Thor and R. D. D.C. certainly have no choice in D.D.',
    'If he does not know. Tur and Ran — certainly here there is no determination, for we rule in Torah matters there is no determination; but where he recognizes, even though in a shared wall both their hands are equal — this partnership was presumably entered into on such terms; and Ran there; and the Mishnah at the beginning of the last chapter of Bava Metzia "if it was, etc."',
  ],
  [
    'Oh, yes. There is a name from Dr. B. N. A.D.:',
    'And some say, etc. Tosafot there 44b s.v. nehenim, etc.',
  ],
  [
    'Co-shops and shops are called Hou. In addition to the Lord\'s name, he brought an apostles in the Old Testament:',
    'Flutes, etc.; shops, etc.; tax collectors, etc. Tosefta and Jerusalem Talmud there, brought by Tosafot in the above s.v.',
  ],
  [
    'They buy a kno. Yes, the columnist and the crossing of the Jerusalem Strip, is very difficult there:',
    'And they buy, etc. So the Tur explains; and the Ran who extended in explaining the Jerusalem Talmud and found it very difficult there.',
  ],
  [
    'And yes, in here. Here and there, and as the columnist',
    'And so here, etc. There and there, and as the Tur; and as above.',
  ],
]);

// siman_143 / turei-zahav
fixLines(`${BASE}/siman_143/turei-zahav/part-001.txt`, [
  [
    'And the idols are forbidden. The additions were written, and even to Man Dermer, there is no work for the martyrs of the oppressor',
    'And idols are forbidden. Tosafot wrote: even according to the one who says one does not worship fragments — it deals here where the idolatry was of Israel or of a gentile and Israel bowed to it; and in the Jerusalem Talmud it establishes it as one who bowed to every stone — end.',
  ],
  [
    'A dome that is waiting for her. From here, windows must not be made to the Starwork House',
    'A dome in which idolatry is placed. From here it is proven that it is forbidden to make windows for a house of idolatry — meaning for the room in which the idolatry is inside — and one may not permit because of enmity, for one can excuse himself saying it is forbidden for us to do; as Tosafot wrote in the first chapter of Avodah Zarah (page 19) regarding ornaments of idols.',
  ],
  [
    'The Starwork itself. The taste in the Talmud is not called Ellie, but in the last verse of the Starworker',
    'The idolatry itself. The reason in the Gemara: even according to the one who says an idol of a gentile is forbidden immediately — as ruled at the beginning of siman 139 — nevertheless it is not called an idol except with the last blow struck with the hammer; and the last blow has not a perutah\'s worth; and the rental is continuous from beginning to end; and every small part he does — he is permitted to take his wage. So wrote all the poskim; only the Rif, Tur, and Shulchan Aruch did not bring this stringency that even the idol itself — its hire is permitted after the fact. It appears their reason: they did not wish to reveal this leniency in order to distance a person from the ugliness of this transgression; as they said in the chapter "one whose Shabbat was overtaken by dark": they said another and did not wish to reveal it.',
  ],
  [
    'You should not enjoy them in good. Hashem\'s promise is that Hashem\'s promise is not to be given',
    'And it is forbidden to benefit from them by a favor. Rashi: meaning they pay them wages; and therefore it is forbidden to grind and bake in mills and ovens of an idol. And Rabbenu Tam explained: by a favor means one who holds a favor to them is forbidden; but one who does not hold a favor to them is permitted even if he pays wages. So the Tur. And he then wrote: it is not comparable to the fair of gentiles where it is forbidden to pay tax to idolatry — there it deals where the tax is for the idol itself and its adornment; but when it is only a rule for priests it is permitted. This refers to Rabbenu Tam\'s explanation that paying wages is permitted here since it is not for the idol itself. And apparently one can challenge: what difficulty is it from the tax — there the idol benefits greatly from the Jew who gives it money for free, unlike here when one buys from it even a gentile could have sold it — one can say this distinction is proven anyway from the case in seif 5: "shops of idolatry are forbidden to rent" — from this Rabbenu Tam is challenged; rather one must distinguish that there the wage goes to the idol itself — so he also explains the tax similarly, for both are in the Jerusalem Talmud. And Rashba wrote: "without benefit" means the whole world benefits from it without any favor; but if they waive for an individual — it is forbidden, for on the contrary he benefits from idolatry that benefits him, as below siman 149 regarding tax. And the Rambam wrote that paying wages is worse; and it appears this is our ruling — all that is forbidden by a verbal favor is forbidden whether by paying wages or by holding a favor. The Perishah challenged: what is different from wax candles siman 139 — if they were extinguished and sold they are nullified, yet he benefits the priests? He answered: the candle was originally permitted and something was made of it as adornment for the idol, and it is permitted when one nullifies the adornment; but a garden and bathhouse were designated from the start for this — and I do not know what he means, for the candle too was originally designated for the idol. And the initial difficulty does not exist: they decreed only when they made a rule for their priests that it will always be so; not so regarding the candle — on the contrary their rule is to make it all for the idol; only this person sells it occasionally — it is as if he sells other movable things that do not belong to the idol at all, and it is permitted.',
  ],
  [
    'But for her employees. It means that the crowd works with the idol:',
    'But to its worshippers. Meaning: the common folk who worship that idol.',
  ],
]);

// ============================================================
// SIMAN 144
// ============================================================

fixLines(`${BASE}/siman_144/beur-hagra/part-001.txt`, [
  [
    'His blood is . . The work of the stars is forbidden:',
    'His proceeds, etc. Avodah Zarah 54b and Kiddushin 58 — that exchanges of idolatry are forbidden.',
  ],
  [
    'But if he\'s called. The Starwork S. A:',
    'But if, etc. Avodah Zarah 64a.',
  ],
]);

// ============================================================
// SIMAN 145
// ============================================================

// siman_145 / baer-heitev
fixLines(`${BASE}/siman_145/baer-heitev/part-001.txt`, [
  [
    'in his speech. It is written that in the speech of a Star worker, but in the speech of Israel',
    'in what he built. Turei Zahav and Shach wrote: that is when a gentile built it; but if Israel built it, it is not forbidden until one bows to it; and in the Perishah\'s glosses he wrote that an apostate Jew\'s law is like a gentile\'s; and the Taz disagrees and writes his law is like a full Jew in this, and for all punishments in the Torah, as written at the beginning of siman 139. (And in the above siman I wrote in the name of Nekudot HaKesef that he agrees with the Perishah\'s gloss — see there.)',
  ],
  [
    'Taking. P. Israel takes what has been renewed but works stars in every deo that has taken Sega',
    'Takes what was renewed. Meaning: Israel takes what was renewed; but for a gentile, any small amount suffices to constitute nullification. And this is specifically idolatry of a gentile; but idolatry of Israel has no nullification — and he removes everything that was renewed. Rashi and the Ran.',
  ],
  [
    'to his slave. The Bible and the renewal has no global cancellation if it is Israel\'s',
    'to worship it. Shach wrote: the renewal has no nullification at all if it is Israel\'s; and if it is a gentile\'s — until the gentile nullifies it.',
  ],
  [
    'Cancellation. He wrote in "Justly, that is to say, when Lincoln works stars',
    'Nullification. He wrote: it is simple that this is specifically when a gentile brought it out; but if Israel brought it out, it does not help to nullify from this house the status of accessories of idolatry — end. And what the Rav wrote "and in Israel" means: if the house is accessories of idolatry of Israel, nullification does not help forever, as above beginning of siman 139. Shach.',
  ],
  [
    'painted. Only a little bit of what he painted in the matter of his or her work. "Third:',
    'painted. Only a little of what he painted — such that it constitutes a defect — is nullification. Shach.',
  ],
]);

// siman_145 / beer-hagolah
fixLines(`${BASE}/siman_145/beer-hagolah/part-001.txt`, [
  [
    'Change the Starwork page from:',
    'Mishnah Avodah Zarah 45a.',
  ],
  [
    'There is a name from the Lord:',
    'Statement of Shmuel there 48a.',
  ],
  [
    'The name of the second:',
    'There in the mishnah.',
  ],
  [
    'It changes a page from "And as is written there:',
    'Mishnah there 46a, as Rashi explains there.',
  ],
  [
    'Mara Darb there:',
    'Statement of Rav there.',
  ],
  [
    'Change there:',
    'Mishnah there.',
  ],
  [
    'There\'s a page from here:',
    'Mishnah there 48a.',
  ],
  [
    'And he said, "Damn."',
    'From the school of R. Yannai there.',
  ],
  [
    'M.M. Darabi John is the name of N.D.:',
    'Statement of R. Yochanan there 54a.',
  ],
  [
    'Change the page as an "',
    'Mishnah Temurah 28a.',
  ],
  [
    'M.M. Darabi John is the work of the stars of the N.D.:',
    'Statement of R. Yochanan, Avodah Zarah 54a.',
  ],
  [
    'M.M. Dr. M. M.D.:',
    'Statement of Rav Huna, Chullin 41a.',
  ],
  [
    'I mentioned above:',
    'I cited it above siman 4.',
  ],
  [
    'The G-d\'s conclusion in Berlin is that it allowed itself to her death you have no greater gamble than that:',
    'The Gemara\'s conclusion there in Chullin: since he exposed himself to death, there is no greater apostate than this.',
  ],
  [
    'M.M. Derby John\'s work of stars on the N.D. page:',
    'Statement of R. Yochanan, Avodah Zarah 54a.',
  ],
  [
    'The Company of Dachie there and the Order of the column as a Dradi:',
    'Dispute of the tannaim there; and the Tur ruled like the one who permits.',
  ],
]);

// siman_145 / beur-hagra
fixLines(`${BASE}/siman_145/beur-hagra/part-001.txt`, [
  [
    'And from the ISA. There is a lot of fire in my name:',
    'And nevertheless, etc. Like Rav Ashi there, for Shmuel follows the Rabbis.',
  ],
  [
    'Just a word." My son and daughter are there:',
    'A thing, etc. Mishnah and Gemara there 45a.',
  ],
  [
    'She is the house as well. Dr. Hosss is there:',
    'That the house should be, etc. Tosafot there s.v. bayit, etc.',
  ],
  [
    'Slavery. R&D and NAME:',
    'To worship it. Rashi and Tosafot; and as above.',
  ],
  [
    'Even as a. Jim is there:',
    'Even, etc. Gemara there.',
  ],
  [
    'And in the work of stars as well. There is only something from there, and there is nothing to do with it',
    'And regarding idolatry, etc. One must take only a little from it; and so in the Ran there; and so Rashi there s.v. this is forbidden, etc.; and to remove a little from it; and the Ran wrote as stated in the mishnah on "in any case, etc., how, etc., even, etc."',
  ],
  [
    'She took under him. As the columnist there, Wig and Ottawa took place and was not named after the G-d, and as "Ge" and "Geze," and "No."',
    'She was taken from under it. As the Tur\'s version there: "she was taken"; and another reads "she was nullified"; and Tosafot there s.v. "thus he reads: he stood her up, etc."; and so the Shulchan Aruch\'s version; and there is no practical difference.',
  ],
  [
    'His daughter. He said, "And this is what is Caesar\'s, and that it is Hashem\'s glory',
    'His animal. Tosafot 46a s.v. behemah, etc.; and so we say in chapter 6 of Temurah "and this and that, etc."; and therefore specifically his own, for another\'s — even for raising it is permitted, as stated in Avodah Zarah 54a "it was taught: it was worshipped, etc." — and it deals with raising, as Rashi wrote there since it challenges "and let them raise a difficulty, etc."',
  ],
  [
    'Do a quaint even. He said, "And he shall not know thee, and he shall not',
    'He did so, etc., even, etc. Statement of Ulla and Rav Huna; and even Rav Nachman and Rav Yochanan do not argue except regarding another\'s; and as we wrote; and specifically, etc.; and see above siman 4 what was said.',
  ],
  [
    'such as replaced in the IDF. And because of this, it is forbidden to do so:',
    'such as he exchanged with a living creature. Living creatures are not specifically meant; and because of "some say" it was stated.',
  ],
  [
    'And there\'s a h. He has been called the Lord of David recently, and without the permission to make it worse because of the Torah, which is not called by the Bible',
    'And there are those, etc. According to his method, like the one who says it was stated last; and without this — to be stringent in a Torah matter, which is derived from Scripture (unlike the Beit Yosef — see there).',
  ],
]);

// siman_145 / pitchei-teshuva
fixLines(`${BASE}/siman_145/pitchei-teshuva/part-001.txt`, [
  [
    'A house in his speech is running. See the lights and seals of a small section J.F. in this:',
    'A house built from the outset. See Urim VeTumim siman 95 s.k. 3 for a discussion.',
  ],
  [
    'sign. And he is the words of the Lord, and the words of the Lord, which he does not believe in the work of the stars',
    'sign. Baer Heitev; and it is from the Shach\'s and Taz\'s words above siman 2 s.k. 14 that his opinion is not so — he holds one who slaughters for idolatry is forbidden only when he slaughters something of the gullet or most of the windpipe. And Nekudot HaKesef already challenged him there and agreed with the Bach\'s resolution that siman 2 does not deal with a thorough adherent; and see in the book Bechor Shor in his novellae on Chullin 40a who wrote it appears one can further resolve: even if even a small act for idolatry forbids it for benefit — nevertheless specifically when he explicitly stated he does so for idolatry; but regarding anonymous intent for idolatry one does not say so except in full slaughter — see there.',
  ],
]);

// siman_145 / turei-zahav
fixLines(`${BASE}/siman_145/turei-zahav/part-001.txt`, [
  [
    'He has no right hand. It is written by their gods on the mountains, not the mountains of Hashem:',
    'Anything that has no human handiwork, etc. For it is written "their gods upon the mountains" — and not "the mountains their gods."',
  ],
  [
    'And he is the mountain stones that have been paved. P. and did not go completely',
    'And even mountain stones that became dislodged. Meaning: they were not completely uprooted, for no person lifted them — so wrote the Kesef Mishneh; and in my humble opinion it appears they were completely uprooted, only not done by a person — for in chapter R. Yishmael at 59a he compares to this: water detached from its source by a wave.',
  ],
  [
    'His coating is prohibited. It is said that you will not steal money and gold that they are:',
    'Its plating is forbidden. For it is said "you shall not covet the silver and gold upon them."',
  ],
  [
    'and thanks. It means narrow in it forms:',
    'and he designated it. Meaning: he drew images on it.',
  ],
  [
    'Take what has been renewed. According to Israel, but Starworker should not take everything but in all deo Segy. In the name of the mountain:',
    'He removes what was renewed. Meaning: Israel removes; but a gentile does not need to remove everything — any small amount suffices. In the name of the Ran.',
  ],
]);

// ============================================================
// SIMAN 146
// ============================================================

// siman_146 / baer-heitev
fixLines(`${BASE}/siman_146/baer-heitev/part-001.txt`, [
  [
    'part. And the taste of Darmerin Israel will be known for the soul of Kaphra and I will not know that a Star worker cancels his part. TJ:',
    'his portion. And the reason: we say an Israelite worships with his own mind and not with the gentile\'s mind; therefore when the gentile nullifies he nullifies only his portion. Turei Zahav.',
  ],
  [
    'Israel. And the U.S. as Dham won them, Israel Affiya has no cancellation only if it has not been found in such a way as it has previously been found to be saved or implanted in it there is a disconnect between the work of stars itself and its sun:',
    'Israel. And the Bach wrote: if the Jew has won them — even their accessories have no nullification; only if he has not won it, such as finding it before despair or stealing it — in this there is a distinction between idolatry itself and its accessories.',
  ],
  [
    'return them. And he did not say that the work of the stars of Da\'all knew that we did not give him a fortune that did not last. "Third:',
    'return them. And we do not say it appears as if he is buying idolatry — for all know they were not acquired by him since he did not pull them. Shach.',
  ],
  [
    'The farms. A.A. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .',
    'Money. Even though he agreed on a price — in such a case pulling acquires, as above siman 132 and siman 138 — nevertheless the pulling was in error, for he did not know there was an idol among them.',
  ],
  [
    'No. In the Bible, he was called to be hungry and floated and stared, and to the land of Yusuf, who was recovering from his starwork, then returning to her:',
    'No. In the Gemara it is derived from the verse "and when he is hungry he will be enraged and will curse his king and his God, and will look upward" — even though he initially despises his idolatry, he then looks back to it.',
  ],
  [
    'by saying. And to Hashem\'s mercy, and to Hashem\'s mercy, and to Hashem\'s mercy, Hashem\'s mercy, and His mercy, and the Lord\'s promise that He will not be forgiven, but that Hashem\'s people will not be forgiven',
    'by verbal statement. And it is not comparable to selling or pledging it as below — there it is the money that compels him; Bach. And Darkei Moshe wrote: there it is different for we do not know for certain it was nullified; but here it deals where he says he wishes to nullify by cutting its ear or nose and the like; but there he does not nullify it and also thinks the buyer will not nullify it.',
  ],
  [
    'working stars. That is to say, D.C. is not allowed to work the stars that have been given for granted. B:',
    'a gentile. That is to say — otherwise it is forbidden like the law of idolatry that broke by itself. Beit Yosef.',
  ],
  [
    'The sea. We were for the rest of the rivers, but the Dead Sea did not erosion',
    'into the sea. That is into other rivers (where grinding is required — for ships pass there and may encounter it and take it); but to the Dead Sea, grinding is not required. Beit Yosef and Darkei Moshe; and so below siman 294 seif 6. And the Bach wrote that even to the Dead Sea grinding is required; and see Orach Chaim siman 445. Shach.',
  ],
]);

// siman_146 / beer-hagolah
fixLines(`${BASE}/siman_146/beer-hagolah/part-001.txt`, [
  [
    'Changing the Starwork Page:',
    'Mishnah Avodah Zarah 53a.',
  ],
  [
    'There\'s a page in G-d:',
    'There in the Gemara 53a.',
  ],
  [
    'There\'s a page here:',
    'Baraita there 64a.',
  ],
  [
    'A column called Rabbi R. Eliezer, who does not make it worse as a starwork itself:',
    'Tur in the name of R. Eliezer, who is not as stringent regarding it as idolatry itself.',
  ],
  [
    'There is a page here:',
    'Baraita there 71a.',
  ],
  [
    'And from the name of the IAG, a mistake is from "because the Druze and Shekel are reptiles as a man who steals Starwork for a Starworker."',
    'And Rava explains there: even though it is a mistaken purchase, nevertheless when he goes back and takes the money it appears as one selling idolatry to a gentile.',
  ],
  [
    'A year from May 10:',
    'Mishnah Demai chapter 6 mishnah 10.',
  ],
  [
    'Changing the work of the stars, page 2, and there is a paragraph:',
    'Mishnah Avodah Zarah 52a; and baraita there 64a.',
  ],
  [
    'As a metaphor, Darb was buried there and was exalted there in G-d and the barbarian:',
    'As the straightforward meaning of Rav Nachman there; and as explained in the Gemara and the baraita.',
  ],
  [
    'Change the name of a page:',
    'Mishnah there 49a.',
  ],
  [
    'There and as a man of religious worship',
    'There; and like the one who permits, for the baraita rules like him.',
  ],
  [
    'Change the name of the NG page:',
    'Mishnah there 53a.',
  ],
  [
    'And he would call her in the Talmud, and he would be hungry and swayed and cursed in his heart and his Gods, and so on',
    'And he derives it there in the Gemara from the verse "and when he is hungry he will be enraged and will curse his king and his God," etc. — even though he cursed his king and his God.',
  ],
  [
    'This is the name and the wise:',
    'There in the mishnah; and like the Sages.',
  ],
  [
    'The Rambam said at the time that I did not bring you from here until the day of June, it is yours, and it is time not over:',
    'Rambam in chapter 8; and it deals where he said at the time of the pledge: "If I have not brought you from here until such and such a day it is yours" — and the time arrived and he did not redeem it.',
  ],
  [
    'There:',
    'Baraita there.',
  ],
  [
    'Change there:',
    'Mishnah there.',
  ],
  [
    'My father\'s father and so on',
    'Statement of R. Yirmiyah bar Abba, etc., there.',
  ],
  [
    'The Rambam in the Bible of the Work of the Stars as it means in the G-d in the Penalty Darb',
    'Rambam chapter 8 of Laws of Avodah Zarah as it means in the Gemara in the dispute of Rav and Shmuel there 49a; and like Rav; and according to this explanation it follows also like R. Yochanan there 41a, whom the poskim ruled like.',
  ],
  [
    'There\'s a page here:',
    'Baraita there 53a.',
  ],
  [
    'Change the name of the page:',
    'Mishnah there 55a.',
  ],
  [
    'There\'s a page from ":',
    'Baraita there 45a.',
  ],
  [
    'The name of the page:',
    'There 47a.',
  ],
]);

// siman_146 / beur-hagra
fixLines(`${BASE}/siman_146/beur-hagra/part-001.txt`, [
  [
    '(Lycott) who takes him. P. D. D. D. D. D.D. is not given or circumcised as a Starworker where he did not mention but will be brought alone',
    '(Collected) One who takes it, etc. Meaning: unlike the sugya in Bekhorot chapter 2, where Ravina answers "he did not give and did not pull," etc. — rather like the sugya in Avodah Zarah there, which mentioned only Rava\'s resolution alone (end).',
  ],
  [
    '(Lycott) A.D. that continues to be. In the words of the Ramban, he also stumbles on the work of the stars, and he eats to the Rambam as a result of the Holy One',
    '(Collected) Even though pulling, etc. The Rambam\'s language; and it is wondrous — for also money acquires from a gentile according to the Rambam, as stated in chapter 1 of Laws of Zechiyah; and as said above siman 132 seif 2; and if so why did he introduce this here and not at the beginning with money? — and see Lechem Mishneh who strained greatly in this (end).',
  ],
  [
    '(Luck) to eat. "And thou shalt be with me."',
    '(Collected) For his need, etc. Rashi there in the mishnah; and as stated there with "shefa\'in" (end).',
  ],
  [
    'to her. I\'ll cry like him. Jim is there:',
    'in her presence. Like "miyeachah, etc." — Gemara there.',
  ],
  [
    'Oh, yes. As the S.C., its employees were laid down by Alma even with an empty thought',
    'And some permit, etc. As the sugya there, the second version — it supports him; and unlike Tosafot there s.v. de\'i, etc., who wrote "I saw like Rabbi."',
  ],
  [
    'And there\'s a quaint. It is written in the name of the Lord and his wife, and he has been called, and has not been named after the Lord, and he has written his name:',
    'And there are those who permit, etc. As the sugya there, the second version — it supports him; and unlike Tosafot there s.v. de\'i, etc., who wrote "I saw like Rabbi."',
  ],
  [
    'And I used as a. A light sign:',
    'And its accessories, etc. See above siman 139.',
  ],
  [
    'They are even qua. According to the report:',
    'They are even, etc. See above seif 2 what was said.',
  ],
  [
    'And how is he? A.M. B. D. D. D. D.C. is named after her:',
    'And how, etc. Like R. Yosi 43b; and it is ruled there 49a like him.',
  ],
  [
    'Or cast a kn. A sign of the Holy One:',
    'Or cast, etc. See above siman 294 seif 6.',
  ],
  [
    'If there was a quaint. There are a few passages of Hashem\'s covenants, and there are several passages of Hashem\'s judgments',
    'If it was broken, etc. There are a few readings of His method; there are several readings of His judgments; and how many will be done; and His people will not be given to them; but His people will be blessed with them. This is the version of the Rambam here — it deals with other fragments; and he means: whether all fragments are nullified by nullifying one of them. (Collected) If it was broken, etc. This is according to the Rambam\'s version; but according to Rashi\'s version the distinction is between fragments and fragments of fragments — fragments are forbidden for everyone; fragments of fragments: if a layman cannot restore them they are permitted [and so the Raavad in glosses]; and so the Ran wrote; and he wrote there is yet another version: "alternatively — all agree they do not worship fragments, and here, etc." — and even though we rule idolatry that broke by itself is forbidden — there, since the main idolatry exists they do not worship its fragments; and with fragments the distinction is between a layman, etc.; and regarding the main idolatry existing — see the Ran chapter 3 at length (end).',
  ],
]);

// siman_146 / turei-zahav
fixLines(`${BASE}/siman_146/turei-zahav/part-001.txt`, [
  [
    'The Beatles are working stars. She tells her of the goddess of Hashem who works in the stars of his god:',
    'One nullified by a gentile is permitted. For we derive from "you shall destroy their carved gods" — a gentile invalidates his god.',
  ],
  [
    'Partners in it. The taste of Dr. Ramban is Israel, I will know that the soul is flawed, and I will not know that a Star worker is cancelled, but his part:',
    'Partners in it. The reason: we say an Israelite worships with his own mind and not with the gentile\'s mind; therefore when the gentile nullifies he nullifies only his portion.',
  ],
  [
    'Live and work stars and so on. In the Talmud of Prie and the Grad wants Ellie\'s existence until he takes his blood from the star worker and a great deal of fruit that I am the heir to the Dakilo Gra, in which he will not return to his voice:',
    'Alive and idolatry, etc. In the Talmud of the Perishah and the Gra: he wants the idol\'s existence until he takes his money from the gentile — and a great deal of profit is in this for the Gra\'s method, by which he will not return to his vow.',
  ],
]);

// ============================================================
// SIMAN 148
// ============================================================

// siman_148 / baer-heitev
fixLines(`${BASE}/siman_148/baer-heitev/part-001.txt`, [
  [
    'The man. It is not a regular day for all. "Third:',
    'The man. Since it is not a fixed day for everyone. Shach.',
  ],
  [
    'Existing. The reason is not to sell them anything that exists is a gift that he has on the day of Idaho',
    'Existing. The reason it is forbidden to sell them something permanent is that he rejoices that he has it on his festival day; and it is forbidden to buy from them even though it pains him that a permanent item goes out of his hands — nevertheless the money is in his hand; therefore it is permitted to sell them something non-permanent, for on his festival day he will have neither money nor a permanent object. Turei Zahav.',
  ],
  [
    'and their funerals. A question belongs to the recurring eye such as an object. And the Levia who will be in the lows gave:',
    'and to lend to them. Lending applies to something that returns in kind, such as an object; and a loan applies to money, which is given for expenditure.',
  ],
]);

// siman_148 / beer-hagolah
fixLines(`${BASE}/siman_148/beer-hagolah/part-001.txt`, [
  [
    'Changing Starwork:',
    'Mishnah at the beginning of Avodah Zarah.',
  ],
  [
    'There is a page and:',
    'Baraita there 6a.',
  ],
  [
    'The name of the second:',
    'There in the mishnah.',
  ],
  [
    'Rabbi Joshua is an exaggeration in the Bible, where he says:',
    'Like R. Yehoshua ben Karchah in the baraita there 6a.',
  ],
  [
    'Adding a page in the name of Jerusalem:',
    'Tosafot there 2a in the name of the Jerusalem Talmud.',
  ],
  [
    'A column called his father Rashi:',
    'Tur in the name of his father the Rosh.',
  ],
  [
    'There is a shark in the name of the Judenya and its ancients there:',
    'Like Resh Lakish there, for the baraita rules like him — the Rif and Rambam there.',
  ],
  [
    'The G-d is there:',
    'Conclusion of the Gemara there.',
  ],
  [
    'He was appointed to the Lord of Judah by the name of the Holy One:',
    'From the incident of the heretic (min) to R. Yehudah the Prince, there 7a.',
  ],
  [
    'The name of the second:',
    'There in the mishnah.',
  ],
  [
    'There is a name in the Talmud and as the Rebbe of John the Church of Scientology:',
    'There in the Gemara; and like R. Yochanan, for a baraita rules like him.',
  ],
  [
    'B.B.B.:',
    'Baraita, Gittin 62a.',
  ],
  [
    'Named by M.D.:',
    'There — statement of Rav Dimi.',
  ],
  [
    'Change the Starwork page as "T:',
    'Mishnah Avodah Zarah 29a.',
  ],
  [
    'Ukia Darish has a page name for G:',
    'Establishment of Resh Lakish there 33a.',
  ],
]);

// siman_148 / turei-zahav
fixLines(`${BASE}/siman_148/turei-zahav/part-001.txt`, [
  [
    'In other countries and so on. According to the fact that the Starworkers who are outside the country are only the custom of their ancestors in their hands:',
    'In other countries, etc. Because the gentiles outside the land are not true worshippers of idolatry — they merely follow the customs of their ancestors.',
  ],
]);

// ============================================================
// SIMAN 149
// ============================================================

// siman_149 / beur-hagra
fixLines(`${BASE}/siman_149/beur-hagra/part-001.txt`, [
  [
    'Instead of a quaint, but a h. A.J.A.:',
    'In the place of, etc., but, etc. Tosafot 13a s.v. kal vachomer, etc.',
  ],
  [
    'But they can be called. G-d is there and the Bible:',
    'But it is permitted, etc. Gemara there; and Shach.',
  ],
]);

// siman_149 / turei-zahav
fixLines(`${BASE}/siman_149/turei-zahav/part-001.txt`, [
  [
    'Just fair and so on. We simply don\'t have it at all, where the star workers gather a lot and say that the name is applied to them, that it is certainly for Ellie, and that they must not be held there:',
    'An anonymous fair, etc. It appears simple that not included in this is a place where many gentiles gather and say that their sins are forgiven there — that is certainly for an idol and it is forbidden to trade with them there.',
  ],
  [
    'From the arch and below. Pirshaw Hossedi in this way and may be permitted in the pleasure and pleasure of honeyforth things are forbidden in the enjoyment of the M.M. in this sizzard and should not be more colder and if you want to lie more and not as necessary, which should not cause any freshness to the stage:',
    'From the knee and below. Tosafot explained: this suffices; and it may be permitted for benefit — even though other things that are forbidden for benefit, nevertheless for an animal this penalty suffices and it is not necessary to mutilate more; and if one wishes to mutilate more he may. And not like Rashi\'s explanation that it is forbidden to cause an animal to become a treifah.',
  ],
  [
    'And more just for god. In a column written to his divinity and he drew my mother to the work of his planets',
    'And further: it is obvious it is for the deity. In the Tur it is written "for his deity" — and this is wondrous, since because he said "his" it is certainly for his idolatry; and the Rama acted properly in not copying this word "his"; and so Mahari Chalav wrote that one should delete the word "his" in the Tur. And it is written in the Derishah: from here it appears that all the more so it is permitted to give to their poor generally when they go from door to door, without needing to say he is giving for the sake of our living God.',
  ],
  [
    'We say the goddess of mine. Madazil was there, and nothing else sold was to sell us, but the work of stars was kept immediately after he sold there:',
    'We say it is idolatry he sold. Since he went there, and if it were something else he had sold he could have sold it to us; but it is idolatry — one can say he sold something else there.',
  ],
]);

// ============================================================
// SIMAN 150
// ============================================================

// siman_150 / beur-hagra
fixLines(`${BASE}/siman_150/beur-hagra/part-001.txt`, [
  [
    'A quaint. A:',
    'A mitzvah, etc. 17a.',
  ],
]);

// ============================================================
// SIMAN 151
// ============================================================

// siman_151 / baer-heitev
fixLines(`${BASE}/siman_151/baer-heitev/part-001.txt`, [
  [
    'Special. This means that it does not belong to the work of stars or to another esnail to the cable. TJ. And the Bible must not sell to the world even though not on the day of their blood',
    'Designated. It means that if the matter is in doubt whether it belongs to idolatry or to something else, we rule leniently. Turei Zahav. And Shach wrote: it is forbidden to sell forever, even not on their festival day and even in our times. And the Bach wrote: forbidden to all gentiles, even one who is not a priest — since they designate it for idolatry, certainly they want it for idolatry.',
  ],
  [
    'won. The Bible and the working-star ideology do not make it clear',
    'won. Bach wrote: and nowadays gentiles are not particular about this — therefore even if it is not pure it is forbidden; however if it is evident he is buying for trade, it is obvious that even frankincense is permitted, as above — end.',
  ],
  [
    'The rest. The taste of the D\'N stands for the experimental ideology that we do not have in existence at the ballot box and have no way to borrow and hire a star worker',
    'permitted. The reason in Semag: nowadays "trying out" does not apply, for we are not so expert with its voice; and we are not in the habit of lending and renting to a gentile. And the Ran wrote: therefore they are lenient even to buy in order to profit by selling; and nevertheless a pious person should be cautious and minimize; but regarding lending and renting one should protest against those who are lenient. And all this regarding an impure animal; but regarding a pure animal the book of Terumot and the poskim wrote one need not do all this, for one can say he takes it for slaughter, as Rashi wrote.',
  ],
  [
    'and jump. It means that the star worker is cut off after the sale and I will be cut off at the time of sale. "Third:',
    'and cuts. Meaning: the gentile cuts after the sale; and need not cut at the time of sale. Shach.',
  ],
  [
    'sold. It means even outside the country. "Third:',
    'he shall sell. Meaning: even outside the land. Shach.',
  ],
  [
    'to the apartment. He wrote: "And it seems that Del addict even to the apartment of Sharison who was jealous of the Star worker, and Israel has no right in which the Starworker puts him in',
    'for a dwelling. Beit Yosef wrote: and it appears that selling even for a dwelling is permitted since the gentile bought it and Israel has no right in it — even though the gentile places idolatry in it, it is of no concern to us.',
  ],
  [
    'Driving. The manuscript of the Bible was hardened by Dahan, who brought the work of stars in their homes',
    'customary. Shach wrote: this is difficult — for we see that they bring idolatry into their houses; and perhaps in the Rav\'s time they were not accustomed to bring idolatry permanently into their homes; or as the Raavan wrote: even if they bring idolatry into their houses it is permitted, since those Israelites pay land taxes to the gentile — the house is not designated specifically for an Israelite.',
  ],
  [
    'poor. It means that even without Hashem\'s mercy, Hashem\'s mercy, and that Hashem\'s mercy is the same',
    'their poor. It means even without Israel\'s poor. Shach; and so Bach; and so Turei Zahav.',
  ],
]);

// siman_151 / beer-hagolah
fixLines(`${BASE}/siman_151/beer-hagolah/part-001.txt`, [
  [
    'Changing the Starwork Page:',
    'Mishnah Avodah Zarah 13a.',
  ],
  [
    'There is a page here:',
    'Baraita there 14a.',
  ],
  [
    'The name of the second:',
    'There in the mishnah.',
  ],
  [
    'I will not be there, nor am I going to say:',
    'Question of Rav Ashi there; and it was not resolved — therefore rule stringently.',
  ],
  [
    'Change the name of the page:',
    'Mishnah there 14a.',
  ],
  [
    'The G-d\'s conclusion in the employee is marked there:',
    'Conclusion of the Gemara in the incident of Rabbah there.',
  ],
  [
    'A ring that would not be trained or arranged for a star worker and passed through the night of the Torah shall not do any work, and so on, and all that you shall be sold, and because of my experience, you shall be sold near the Shabbat and try to the worker of the stars, when she is tortured, and she hears his voice and curses, and is entitled to Hashem\'s mercy',
    'A decree lest he lend it or rent it to a gentile and transgress the negative commandment "you shall not do any work" etc. "and all your livestock" — and because of "trying out," for sometimes he sells it to him close to sunset on erev Shabbat and says "come try it out," and it hears his voice and goes on his account — and there is an opinion in chapter 24 of Shabbat that he is liable for a sin-offering; not so through a broker, for he does not lend it to him since it is not his, and regarding "trying out" — it does not know his voice.',
  ],
  [
    'It\'s a matter of the work of the stars, and it\'s the same:',
    'Mishnah Avodah Zarah 15a. [Also Gemara there 15b.]',
  ],
  [
    'There\'s a page here:',
    'Baraita there 15a.',
  ],
]);

// siman_151 / beur-hagra
fixLines(`${BASE}/siman_151/beur-hagra/part-001.txt`, [
  [
    'If you buy a kno. Tor and FIFA. The Holy One, the Holy One:',
    'If one buys, etc. Tur and R. Pinchas. The Holy One, the Holy One.',
  ],
  [
    'And even if they are. They are the author\'s words, and it seems that he has issued a real estate and even said a chicken is a star worker who has done so:',
    'And even if they are, etc. These are the author\'s words; and it appears he issued a clear ruling and even said "a chicken — like a gentile who has done so."',
  ],
  [
    'Or a star worker. R:',
    'Or a gentile. R.',
  ],
]);

// siman_151 / pitchei-teshuva
fixLines(`${BASE}/siman_151/pitchei-teshuva/part-001.txt`, [
  [
    'to trade. The thick Dr. Dalait is a widower and see the response of Yair\'s sign in the matter of what a little cliché has when they have a trial with one in a Star worker\'s judge gives or from Paris to give him a gift',
    'for trade. See Baer Heitev — we are not commanded regarding lifnei de-lifnei. And see responsum Chavat Yair siman 136 regarding what some light-minded people do when they have a lawsuit with someone before a gentile judge — they give or inflate giving him a gift; and seemingly there is a prohibition there regarding lifnei iver. Since Bnei Noach are warned regarding laws — see there. And in my humble opinion it appears: if one does not give the gift into the judge\'s own hand but to his servant who will give it to his master, or to intercede for him — it is certainly permitted if it is in a manner that there is no concern of theft; for it is lifnei de-lifnei; and if because he is his agent and it is as though he gives it himself — this is not so, for there is no agency for a gentile; see below siman 169 seif 9 in the gloss. I again found that the author of Chavat Yair himself in siman 185 raised this regarding another matter; only he holds simply like the one who holds there is agency for a gentile for stringency; and I will bring it below on the words of the gloss.',
  ],
  [
    'If he gives himself a mission to a Star worker, see C. X.C. in the Bible. Again, I found that L.J. himself in the City of K.C. in this regard only he has raids as Mandals has a mission for a star worker to hardware and Aviano to write about the words of the G-d:',
    '',
  ],
  [
    'There is aggravated. A thick man named after Hashem\'s people, and he said, "He who is called by the Lord\'s name is in the end of the earth',
    'There are those who are stringent. Baer Heitev in the name of the Shach — they do not dispute, etc. And in my humble opinion it appears a proof to his words from the mishnah of Demai chapter 3, cited in the Gemara of Chullin 6a: "one who gives his mother-in-law tithe," etc. — see there and investigate.',
  ],
]);

// siman_151 / turei-zahav
fixLines(`${BASE}/siman_151/turei-zahav/part-001.txt`, [
  [
    'Things that are special. It means that if this is provided by a non-illude or something else from Azlin to Coel',
    'Things that are designated, etc. It means: if the matter is in doubt whether it belongs to an idol or to something else, we rule leniently; and so we say below regarding selling large livestock, in the Tur.',
  ],
  [
    'Don\'t sell a kno. In the column, it is written to the world, and in the words of the Lord, even though not on the day of blood and even at this time:',
    'It is forbidden to sell, etc. In the Tur it is written "forever"; and Beit Yosef explained: meaning even not on their festival day and even in our times.',
  ],
  [
    'And if you buy a lot. And it is not my opinion that it would be sold to others, but rather than before skin',
    'And if he buys a lot, etc. And we are not concerned perhaps he will sell to others — for we are particular only about lifnei iver and not about lifnei de-lifnei; and if there is concern that a Jew will stumble, we say lifnei de-lifnei, as we find regarding wheat that fell into water — forbidden to sell to a gentile on Pesach lest he return and sell to Israel. So wrote the Rosh.',
  ],
  [
    'The rest were used in all. The taste in the name of S. D. D.D. is not the case of Hashem\'s people, and we have no way to borrow and hire a Starworker',
    'The custom was to be lenient in all. The reason in Beit Yosef in the name of Semag: nowadays "trying out" does not apply, for we are not so expert with its voice; and we are not in the habit of lending and renting to a gentile. And the Ran wrote: therefore they are lenient even to buy in order to profit by selling; and nevertheless a pious person should be cautious and minimize; but regarding lending and renting one should protest against those who are lenient.',
  ],
  [
    'The Starworkers together. Hashem\'s promise to Israel is to be brought to Israel',
    'Three gentiles together. For perhaps danger will come to Israel thereby, Heaven forbid.',
  ],
  [
    'They do not sell houses. It is said that you will not give them parking in the land and rents does not belong to the purchase of a "mitted" in a field that is extracted from ten:',
    'They do not sell houses to them. For it is said "you shall not grant them a holding in the land"; and in rental there is no acquisition; nevertheless it is forbidden in a field, for it removes it from the obligation of tithes.',
  ],
  [
    'He does not know. This model is included without their resurrection, but if they know not a gift, but as a sale, they will pay their reward or have already paid it:',
    'he does not know him. For this too is included in "you shall not grant them" — "you shall not give them a free gift"; but if he knows him, it is not called a gift but like a sale — for he will repay his kindness or has already paid him.',
  ],
]);

// ============================================================
// SIMAN 152
// ============================================================

// siman_152 / baer-heitev
fixLines(`${BASE}/siman_152/baer-heitev/part-001.txt`, [
  [
    'his own. [This is because of an invitation] that the High Court of Israel has a ban when it is sent to many of them some food or food that will be collected and eaten or eaten by the IDF by ordering it to eat there',
    'his own. [This is because of an invitation] Turei Zahav wrote: it appears that even in a Jew\'s house there is a prohibition when he sends to many of them some food or drink that they should gather and drink or eat there — for nevertheless through his invitation they eat there and it is like a gentile\'s house. They did not permit sending to a Jew\'s house unless he does not say they should gather together in this meal; but if he mentions they should gather together it is an actual invitation and there is prohibition if they gather together; rather each takes his portion home.',
  ],
  [
    'Important. "The Lord of this language means that careful man is of appeasement',
    'Important. Turei Zahav: from this language it implies that what a distinguished person takes care of is from the side of piety; but the truth is not so — it is forbidden from the law; see there where he brings proof.',
  ],
]);

// siman_152 / beer-hagolah
fixLines(`${BASE}/siman_152/beer-hagolah/part-001.txt`, [
  [
    'Memera Drifpa there:',
    'Statement of Rav Pappa there.',
  ],
]);

// siman_152 / turei-zahav
fixLines(`${BASE}/siman_152/turei-zahav/part-001.txt`, [
  [
    'Israel should not eat there. For the sake of Hashem\'s people, Hashem\'s promise is that Hashem\'s people will be blessed with Him',
    'A Jew is forbidden to eat there. In the Derishah he was uncertain whether there is permission here because of enmity as in siman 148 — for one rejoices with them because it is as though he exchanges with them. And I wonder at such a great man that he should be uncertain about this: for it is explicit in the verse from which it was derived — "and he will call you and you will eat of his sacrifice"; and it is explicit at the beginning of that verse: "lest you make a covenant with the inhabitants of the land and they go astray after their daughters." Behold the Torah commanded that we have enmity with them because of distancing their daughters — so how can we permit because of enmity?',
  ],
  [
    'The above is the sign of an equator that no god forbids eating his body is because we do not have any love with her and will be deprived of her body because of hostility',
    'And this is self-evident: we do not find permission because of enmity except where the mitzvah is because of something else — such as above siman 148, where the prohibition is because of idolatry and they permitted certain things because of enmity with them; not so here, where the principal mitzvah of the prohibition of eating itself is so that we should have no love with them — how can we nullify this very thing because of enmity? And so even regarding a rabbinic prohibition, such as not eating the cooking of gentiles — where the matter is so that we have no proximity with them because of their daughters — it is obvious there is no permission because of enmity at all. All this is self-evident to me.',
  ],
]);

console.log('\nDone. Run with: node fix_s143_152.mjs');
