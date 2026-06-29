#!/usr/bin/env node
/** EH001 siman 004 — beur-hagra full editorial redo (~101 blocks). */
import { patchFile } from "./_patch-siman-utils.mjs";

const n = patchFile("siman_004/beur-hagra/part-001.txt", "beur-hagra", {
  "1#א": `Mamzerim, etc. Mishnah Yevamot 78b.`,

  "1#ב": `(Collection) And Netinim, etc. See in Bahag's hagahah — it is Rambam's view that all nations are equal and "you shall not intermarry" refers to their gentility; but once they converted, even the seven nations are permitted — only Yehoshua and David decreed on them. But Tosafot hold they are forbidden from Torah even after conversion; and on this "you shall not intermarry" refers to the seven nations who converted, and they are the Netinim; so Rashi wrote in ch. 8 of Makkot and Nimukei Yosef wrote that even their children until the end of all generations are forbidden from Torah; but Maggid Mishneh and Ran ch. 8 of Ketubot wrote that their children are not forbidden except from Yehoshua and David's decree, etc.`,

  "1#ג": `Until the end. Meaning: even though it is written "tenth generation" as stated in Sifrei there — tenth generation is stated here and tenth generation is stated below; as the tenth generation stated below is forever, so too the generation here.`,

  "3#א": `Egyptian, etc. Mishnah there; and as Tanna Kamma, and the entire sugya in our passage is as Tanna Kamma.`,

  "3#ב": `That after, etc. 71a page 1: "to them," etc.`,

  "5#א": `Israel, etc. and one, etc. Meaning in their gentility.`,

  "5#ב": `And one of these, etc. Even though in their conversion we follow the disqualification — but in their gentility the Merciful One made their seed ownerless; proof from what is written Kiddushin 68b: "grandson of your daughter," etc.; and there regarding Netinim as stated "that one with seven," etc.; and Yevamot 76a: "when they were gentiles," etc.`,

  "5#ג": `Except that damaged, etc. 45a page 1: all the amoraim who validate, etc.; and in Kiddushin there — though fit, etc.`,

  "6#א": `She converted, etc. — or, etc. 71a page 1: "to them," etc.; and Rashi there and it was necessary, etc.`,

  "6#ב": `Therefore, etc. 77a page 1 as R' Yochanan.`,

  "6#ג": `But Egyptian, etc. 78a page 1 as Rav Dimi.`,

  "6#ד": `Some say, etc. As stated there we judge after her mother; and Rashi s.v. beledah, etc.; and there in conclusion because Scripture tied them to birth — all the more for us who hold fetus is thigh of its mother, no need for this as stated there; and see Tosafot there s.v. ella, etc.`,

  "6#ה": `And for Rambam, etc. For otherwise still a difficulty on Minyamin — why did he not marry an Egyptian second wife and permit his son to enter the congregation; and Rashi in Sotah 9a s.v. Mitzri rishon, etc. — "if I had been," etc.; but what Rashi wrote "follows," etc. — tzarich iyun: for perforce not like Yevamot there except if we judge after him or her — but we do not say after his disqualification; and this is the reason of the first version — since we say there, clearly we judge after the mother. And further Rambam wrote: since we say there "two converted," follows the damaged; and so Rashi there 76b s.v. ashiya, etc.; but in Kiddushin 27a s.v. b'neha, etc.; and Tosafot there s.v. b'nehah explain specifically with two nations — and likewise Rav Dimi, who does not challenge except because of Scripture, etc. — and this is primary. For Rambam, certainly Rav Dimi holds like the earlier view as above; and Minyamin who married first — the case was so that the Gemara only challenges from "I will marry my son," etc. for the future; and Rambam's reason from what is stated there "when Ravin came," R' Yosi: "in nations," etc. "converted" — for ostensibly "when came" has no meaning since it is a matter by itself — "when came" is not applicable, implying he came to dispute; rather in a statement that he came to dispute, we do not judge after father and after mother but after the disqualifier; and what is stated there "in what is stronger," etc. — needs to establish with three nations like the first clause and not like Tosafot Kiddushin 67a s.v. b'neha who strained to distinguish between two nations and one nation — and Rambam's words are very correct. And likewise implied in Yerushalmi ch. HaOrel and ch. 10 Yuchasin: R' Yosi — Minyamin the Egyptian convert was among students of R' Akiva; he said: I, an Egyptian convert, married an Egyptian convertess; my son is son of an Egyptian convert and I marry him to an Egyptian convertess — behold my grandson is fit to enter the congregation; R' Akiva said to him: no — rather you also married him to a daughter of an Egyptian convertess so that there be three generations from here and three generations from here — implies from both sides three generations are needed.`,

  "7#א": `Ammonite, etc. in nations, etc. Meaning like this when afterward it says "converted," etc.; and he brings proof as the tannaitic source, etc.`,

  "7#ב": `The daughter is permitted — should read thus (Taz Magen Avraham).`,

  "9#_": `All other, etc. As stated in this siman.`,

  "10#א": `Therefore, etc. for Rambam, etc. Tosefta ch. 5 of Kiddushin — R' Yosi: Minyamin the Egyptian convert, etc.; R' Akiva said to him: you erred in the law — from when Sennacherib ascended and mixed all the nations, there are no Ammonites and Moabites in their places nor Egyptians and Edomites in their places — rather an Ammonite marries an Egyptian woman and an Egyptian marries an Ammonite woman, and one of these, etc.`,

  "10#ב": `And for Rosh, etc. So in Tosefta end of Yadayim: on that day Judah the Ammonite convert stood, etc.; R' Gamliel said to him: also an Egyptian convert likewise; he said to him: for Egyptians Scripture gave a limit — "at the end of forty years I will gather Egypt," etc.; see Tosafot there 76b s.v. minayim, etc.; and Sotah 9a; and Rashi in Yadayim there. Also implied in that Yerushalmi that even R' Akiva so holds; and this is what is written Yevamot 76b "and Tosafot went incidentally," etc. — meaning in the days of Sennacherib; and tannaitic source "R' Binyamin — therefore they returned to their places" as there in their Tosefta; and Rashi's words there s.v. halakh, etc. — Rashba already refuted them, for they did not drown in the sea except men of war; so agreed Ramban and Rashba and brought several geonim like Tosafot and Rosh; nevertheless Rashi's words can be explained as in aggadah — as many who fell in the sea, so fell the remainder in Egypt.`,

  "11#_": `Slave, etc. Gittin 40a and "who is there," etc. and other places; and for all poskim it is deoraita as stated in the parsha "there shall be no kedeshah," etc.; and as stated in Torah Or there; but Rambam wrote it is derabbanan; and the parsha above refers from the parsha of one who has relations with a betrothed maiden, as stated ch. 1 of the five passages of Ishut and as Maggid Mishneh in siman 61 in the hagahah; and see ch. 12 of Even HaBachur simanim 11, 12, 13.`,

  "12#א": `After, etc. Gittin there and in several places — meaning after they immersed; but before then likewise as a slave, as Yevamot 45b: "that one they called him," etc.; and there 46a on their sons that they are mamzerim — R' Yosi per his reason, etc.; and likewise regarding a slave as 47b: "one convert," etc.; and Tosafot there s.v. sham, etc.`,

  "12#ב": `His master freed him. Gittin 38b, 39a; and there that a get of manumission is required.`,

  "12#ג": `Or left him, etc. There 45a.`,

  "12#ד": `Or was, etc. Ketubot 28b — there he is called, etc.`,

  "12#ה": `Or, etc. Gittin there.`,

  "12#ו": `He is not, etc. As the girsa of Rif and Rosh there — a slave who married, etc. — went out to freedom; and not only that, but we compel his master to write him a bill of manumission.`,

  "12#ז": `And even though, etc. As stated 31a: R' Yosi — "you have in your hand," etc. — meaning in such a case she is betrothed; but there is a difficulty — we say a get of manumission is required; therefore Rema explained and brought in Tur YD siman 264 that she is betrothed from safek — because of assessment of his mind we remove monetary claims, but for prohibition we do not follow assessment, etc.; and Rosh disagrees and wrote we follow assessment of his mind — he certainly already freed him and is permitted with a free woman even per R"Tam, and the kiddushin are certain — only we compel his master, etc. so he should not say "you are my slave," as stated there page 2; unlike marrying his maidservant where this does not apply; therefore Rama said she is betrothed and did not teach that a get of manumission is required; and so Tur there in his name; and Tur wrote here and in the hagahah YD there 258:1; and all this regarding "left him," etc.; but regarding "freed him" without a get of manumission — per his view he is entirely like a slave and permitted with a maidservant, and his kiddushin are nothing; as Tosafot there s.v. ocheiz, etc. — see there; and there 42b s.v. me'ukav, etc.`,

  "12#ח": `And there is one who, etc. So Tur wrote here, and his words are astonishing — and he himself did not rule so in Yoreh Deah there, nor in Shulchan Aruch there seif 70 in the hagahah and Avnei Choshen — and his words are strained.`,

  "12#ט": `And all the more, etc. Gemara there; and per Rema that it is only safek.`,

  "13#א": `Who is, etc. As Shimon HaTemani — the anonymous mishnah ch. 3 of Kiddushin is like him, and halakhah is decided "I" there; and as stated ch. 1 of Avodah Zarah and ch. 6 of Bava Kamma; and Gemara sugyot are also like him in several places; and Tosafot in Yevamot there.`,

  "13#ב": `That even though he is damaged — does not mean disqualified from kehunah as above s.k. 65 — for we say there 60 "one of these," etc.; rather means damaged and defective, as stated in tractate Kallah ch. 1: R' Abba said mamzer; R' Yishmael son of niddah, etc.`,

  "14#א": `And there is one who, etc. So Bahag and haRif explained — they say Gittin 89a: with a mamzeret we are not concerned in such a case; and the deed of lost property of Shmuel who came secretly and served — they challenged him from above that it must say "she tarried"; they also challenged from Kiddushin 73a and the minority whose husbands went to sea 40 — if there is no leaning except on those, he is certainly a mamzer; and the answer — we only lean when she says so; and Tosafot and Rosh there.`,

  "14#ב": `But within, etc. Yevamot there as above.`,

  "14#ג": `And specifically, etc. — we only lean to establish her on a presumption of fitness.`,

  "14#ד": `A woman who became pregnant, etc. As Niddah 38a regarding shifra converts; and Tosafot there s.v. shifra; and it appears for R' Yosi shifra, etc.; and Ramban explained; and even for Rambam who ruled like Shmuel there — nevertheless here Shmuel admits, as stated, even per one who says, etc.`,

  "14#ה": `And even if she miscarried, etc. As stated ch. 19 of Shabbat and ch. 8 of Yevamot: an eight-month child, etc.; but his mother drinks, etc.; and he can live up to thirty days and forty — even at the beginning of the eighth month; though we hold that nine-month births do not give birth to premature fragments — and it is two months before the time — so too a seven-month child.`,

  "15#א": `And kohen, etc. and Israel, etc. So Maggid Mishneh explained.`,

  "15#ב": `And if her husband is a kohen, etc. — here there is no need for majority of relations, etc. — for with one act of relations she became a zona.`,

  "15#ג": `And nevertheless, etc. Tosafot there s.v. rov; and e.g. when there is not, etc.`,

  "16#א": `The woman, etc. Yevamot 89b — said to him: "you too are not," etc.`,

  "16#ב": `Before he divorced her, etc. — it is a penalty and they made it like one who returns his divorcee after she remarried, as stated ch. 9 page 1 beginning, etc.; and as Rosh explained there — and not less than one who returns his divorcee after remarriage, who is not a mamzer nevertheless; and proof that this is the subject from what is stated "granted, the second," etc. and before divorce discusses — likewise the first; and see siman 17 s.k. 166.`,

  "16#ג": `But, etc. Tosefta 2:2 s.v. sotah pratz, etc.; and no proof, etc.`,

  "19#_": `Gentile, etc. Kiddushin 69a: mamzeret too, etc.; and likewise a gentile, for no lineage is attributed after him — behold the child is fit.`,

  "20#א": `Mamzer, etc. Per Bahag — meaning we learn from family.`,

  "20#ב": `And if he comes, etc. There page 5 as R"Tam.`,

  "20#ג": `Therefore, etc. Gemara there asks — it was answered.`,

  "21#_": `A gentile who comes, etc. — there is no mamzerut in a gentile; and Rashi there 68b s.v. u'mishna, etc.; and Tosafot Bekhorot 47a s.v. velo, etc.`,

  "22#א": `Convert, etc. and likewise, etc. Mishnah ch. 4 69a and Gemara 73a and halakhah, etc.`,

  "22#ב": `And the child is a mamzer. 67a — and likewise a slave; and so in Tosefta: a convert freed slave is permitted with a mamzeret and the child is a mamzer per R' Yosi.`,

  "22#ג": `And even, etc. And specifically, etc. 75a page 1 as Tanna Kamma.`,

  "22#ד": `And for Rambam, etc. Ch. 11 there; and he explains that the gentile is absorbed there.`,

  "22#ה": `And one converts, etc. Several places there in the mishnah 76a: we judge one law for them.`,

  "23#_": `A convert who married, etc. — even for kehunah he is fit, as the mishnah there; and they say there 75b and in Yevamot ch. HaChalutz and ch. Mitzvat Chalitzah: "his mother from Israel from among your brethren," etc.; and so Tosefta there 102a; all the more his father from Israel, as Kiddushin 74a: Israel who married, etc. chalal, etc.`,

  "24#א": `In another matter, etc. As Rav in the parsha, as R' Elazar, etc. — Rava holds in Yevamot 37a.`,

  "24#ב": `Such as, etc. Yevamot there as stated s.k. 24.`,

  "26#א": `Available maiden, etc. This is shetuki of ch. 4 of Kiddushin; and in Yerushalmi ch. 1 of Ketubot end of halakhah 9: R' Shimon bar R' Yosi asked — now there is no shetuki per R' Gamliel and R' Elazar except per R' Yehoshua; he returned and said there is shetuki per R' Elazar and R' Gamliel in a silent woman; and even so in a speaking woman when she says "I do not know."`,

  "26#ב": `And even if she says, etc. Mishnah 78b; and R' Yosi explained only regarding the father, as in the Gemara and as 74a: "his father forever," etc.; and why not challenge the mother every seven days — except regarding bekhor; and Rashi there.`,

  "26#ג": `Even if, etc. From ch. 1 of Chullin: whence that we go, etc. from striking his father, etc.; and if so — perhaps when he and she say about him that he is his son, but they are not believed and we do not lean except because of majority of relations — rather they are only believed to establish him in fitness; and as Maggid Mishneh wrote — since shetuki from Torah is fit — see there.`,

  "26#ד": `And if that one, etc. Per Bahag and Ketubot 13a as R' Gamliel — halakhah is decided like him.`,

  "26#ה": `And nevertheless, etc. There page 2: "in another matter regarding testimony," etc. — Alima, etc.`,

  "26#ו": `And even 71a, etc. Kiddushin 65b and tisbara, etc.`,

  "26#ז": `But we are concerned, etc. Rambam: "and it appears to me," etc.`,

  "27#א": `If he is, etc. There.`,

  "27#ב": `Or that he is not, etc. There and Kiddushin 65a as Shmuel in the latter wording, which we rule like — as stated 74a.`,

  "27#ג": `And if he is not, etc. Per Bahag and as stated s.k. 29; and they say there 16a — perforce not like R' Gamliel there except in a case of certainty, etc. as stated there.`,

  "27#ד": `And if she is not, etc. Kiddushin 75a in the first wording as Rav, which we rule like — as stated above s.k. 24.`,

  "27#ה": `And the woman, etc. Mishnah Ketubot 13a; and we rule like R' Gamliel as above.`,

  "27#ו": `Even he contradicts her — nevertheless, as many times from Rambam's words — this is unlike Rosh above; rather it can be explained specifically regarding his son for whom there is no presumption — Rosh explained that R' Gamliel admits in certainty and certainty; and holds that only to extract money do they say there only certainty and uncertainty; and holds the case there is with a fiancé and fiancée regarding validating the woman herself — and it fits well; and in this, when he does not admit, etc., even contradicting her — not as Maggid Mishneh and Rosh explained; nevertheless regarding the child Rambam admits, as stated, that even if he was in presumption as his son — he is believed regarding him, as stated s.k. 29.`,

  "27#ז": `And this is, etc. There 14a; and Rashi s.v. di'avad.`,

  "27#ח": `But for a fiancé, etc. Nevertheless he wrote — behold there is only one safek — perhaps by force; and safek deoraita lechumra; and meaning as stated there 9a: "opened," etc.; and Rashi s.v. ne'eman and there; and R' Akiva, etc. — meaning from here.`,

  "28#א": `Were, etc. Language of Rambam as Rava in the first version. Nevertheless tzarich iyun — for his method is to rule like the latter version everywhere; and witness this sugya Kiddushin 75a in the latter version. But for Rambam it was difficult that Rava said reasonable are Rav's words and does not challenge Shmuel too — learn shetuki for all through the elevation they made in lineage — only to establish him as a definite mamzer does he divide and bring proof from the mishnah; but for us who hold it is shetuki there is no distinction; and meaning: reasonable, etc.; but, etc. — meaning he admits to Shmuel and is like Rava in the latter version; and he wrote even though he came, etc. as Tosafot there s.v. aval — that Rava also discusses when he came, from proof of the mishnah, and nevertheless says reasonable are Rav's words that he admits to Shmuel; nevertheless the plain wording of Rav stam attributes from him; and this that he began "the people were," etc. even though.`,

  "28#ב": `And with, etc. Should read "or with men," etc.; and though one can explain "and with" or "with" — nevertheless more correct is the emendation "or with"; and "and with" cannot mean otherwise, for then what does he conclude "as she made herself available," etc. — in the Gemara there is no question; rather she attributes to him alone — why we say from her making herself available, etc.; implies in Rava's matter where she also attributes from elsewhere though the fiancé had relations — this reason is unnecessary; and several other difficulties; the sugya there — the dispute of Rava and Abaye is only definite mamzer or shetuki; for Rav therefore Shmuel is not cited; but shetuki for all is; and Tosafot there s.v. amar deba ba, etc. — child not mamzer means only shetuki; three ways: attributes from her and not elsewhere, from him and elsewhere, from elsewhere and not him; in the first version Rav holds from him and not elsewhere — Rav admits shetuki; in the latter version Rav holds even from him and elsewhere — Rav admits and disputes only elsewhere and not him; Shmuel holds in all shetuki and there is no difference between the versions except for Rav when she attributes from him and elsewhere; but when she attributes from him and not elsewhere, even the latter version is shetuki; as amar deba ba alav all agree, etc.; as Tosafot there; likewise Shmuel; if so for us who rule like Shmuel as Kiddushin — like all shetuki; and this is "with fiancé or with," etc. — to include even from him alone, nevertheless shetuki; and even from elsewhere alone, nevertheless not mamzer; also trusted as Kiddushin there: shetuki with examination, etc.; and he said even if came, etc. — first version unlike latter for shetuki; first version only for certainty; all the more Shmuel; and applies to both that even attributes from him alone; and on this he said as she made herself available, etc.; though Abaye does not challenge this except to make him certain — nevertheless Rava who says shetuki — from this reason; Abaye who says this reason suffices to make certain and for the latter version Abaye admits this reason only makes them shetuki; Rambam began the latter version per his method which is primary and ended the first version — the latter admits to him as above.`,

  "28#ג": `And if examined, etc. Kiddushin there in the latter version aliba deShmuel; and such is the subject as Rava establishes here.`,

  "28#ד": `And likewise if, etc. There Abaye said, etc. and mishnah in a case of not, etc. from amar deba ba alav all agree explained, etc.; and Rav explained admits to Shmuel that shetuki; and establishes Rava attributes from elsewhere; and see siman 124 seif 10. And it is per Tosefta's explanation there s.v. aval, etc. — attributes from him means he had relations with her — and this is attributes from him alone as stated there amar deba ba alav as above; and Rambam should have written "and likewise," etc. that she fornicated entirely — but followed the author's language who wrote "with other men"; but I already wrote it should read "or with men," and his words — Rambam and Mechaber wrote — except need to erase the word "others" in the hagahah — and this that he added.`,

  "29#א": `Married woman, etc. As above from mishnah Kiddushin 78b; and R' Yosi explained only regarding the father.`,

  "29#ב": `And some say, etc. Last version as Ketubot 14a: "one," etc. 40 — even for R' Yosi she is not believed — rely on his words; first version holds different there because she does not contradict him; and Noda BiYehudah ch. 7 of Yevamot at length — and does not hold she is not believed to disqualify as above s.k. 26; and Taz Magen Avraham.`,

  "29#ג": `Or on, etc. And Tosafot Yevamot there s.v. kach and some say, etc.; and Tosafot there s.v. vehalakhta, etc.; so Bava Batra there.`,

  "29#ד": `And if, etc. And Tosafot there s.v. ve'ein, etc.`,

  "29#ה": `And if she, etc. As Kiddushin 74a, 75a — even with majority unfit she is believed.`,

  "29#ו": `And that father, etc. As Bava Batra there: said "he is my son," etc.; and see Rashbam there s.v. vechazar ve'amar avdi, etc.; and since he testified, etc.; and specifically his presumption according to the father — but presumption not according to the father not as stated s.v. hayu muchzakin; and there 1: they sent to him, etc.; and as Ramban there and Tur in his name CM 277 and Shulchan Aruch there 12.`,

  "29#ז": `Father who said, etc. There: "he is my servant" and returned, etc.`,

  "29#ח": `That Rav, etc. — for therefore he is not his father and the Torah did not make him believed except that he is not from him — and perforce he is a mamzer; and as stated above; and if she says "from my striking," etc. — fit.`,

  "30#א": `One who had relations with, etc. Yevamot there: Ravina said this is the meaning, etc.; and there he disqualified himself; and even though they say there page 5 as Nachmani — because per his words he is a gentile; and as Tosafot s.v. vehalakhta.`,

  "30#ב": `To prohibit, etc. and prohibited, etc. And Tosafot there s.v. ne'eman: meaning, etc. — for a person is close to himself; and as Tosefta there 25b s.v. ve'ein s.v. leima, etc.`,

  "31#א": `Foundling, etc. Until it reaches there the language of Tur.`,

  "31#ב": `Such as, etc. Rashi s.v. tali.`,

  "31#ג": `But, etc. There s.v. ein bo, etc. — for she took cover, etc.`,

  "31#ד": `Or his limbs, etc. Per the first explanation of Rashi.`,

  "31#ה": `In a place where many, etc. There: charifot of the river.`,

  "31#ו": `And was near, etc. All language of Rambam, except Rambam, etc. or found under a tangled tree in a place no animal enters, and was near a city, etc. In the Gemara: zardas — near a corpse — not as foundling; they said to him there is as foundling; explained zardas is tangled and no animal reaches underneath; and explanation: found underneath; therefore the Gemara did not distinguish if it reached, etc.; and this is the meaning of zardas — because it is tangled; and wrote there: or far from the city, even under the tree, etc.; or found hanging on a tree in a place where an animal reaches; and also a variant in the Gemara: but B"H and many frequent there.`,

  "33#א": `They immersed him, etc. or, etc. As stated 11a page 1: R' Huna, etc. — that place is great, etc.`,

  "33#ב": `Likewise regarding the matter, etc. Per what is written for lineage — not for kiddushin; but to marry him off, even to a definite Israelite — no, for he is a foundling; nevertheless the plain sense of our passage 40 speaks of marrying off and for kehunah; and as stated; and for lineage he does not need, etc. — rather one can say e.g. he has a mark that he is not a foundling, as Rashi there; as stated s.k. 31 and per Maggid Mishneh there.`,

  "34#א": `And some say even, etc. There in the Gemara: if majority gentiles, etc. and lefakach, etc.; and Rambam holds R' Yosi Yoma 4:2 disputes Shmuel and holds explicitly all do not inspect, as stated "whoever separated," etc.; and likewise this one who explained from a city whose majority are gentiles — so in a responsum; and even though the Gemara establishes there not like — according to the setimah; but to the conclusion there it says velefakach et hagel — not so; perforce he disputes R' Yosi and holds even if all separated, all inspect per his explanation; and what it challenges "did Shmuel say," etc. — from half to half it challenges, for it thought specifically majority Israel he speaks, as Rashi s.v. uShmuel, etc.; nevertheless Rashi's method and Tosefta and hagahah agree more.`,

  "34#ב": `And they are not commanded, etc. Rashi there and s.v. lashon, etc.; and Tosefta Ketubot s.v. im and Yoma s.v. leha'achilo; and in several places the Gemara says for lineage it is not needed; and if it refers above — it is not a challenge; and Rambam holds since the mishnah concludes with "peace of mind Israel" — "speak," etc. 40 — refers to both, as stated "Israel" "speak" only to sustain him.`,

  "36#א": `Safekot, etc. As stated above s.k. 24.`,

  "36#ב": `And if they married, etc. Though forbidden only rabbinically as written above seif 3 letter 1 — nevertheless he removes her; as all rabbinic prohibitions chapter 3 of Yevamot; and if they preceded, etc.; and pregnant with another's child, etc.`,

  "36#ג": `And safekot have no, etc. — certainly permitted with a maidservant; and Rashi 69a s.v. lechatachila, etc. — unlike safek.`,

  "36#ד": `Rather, etc. and child, etc. How, etc. as stated above s.k. 23.`,

  "37#א": `Every province, etc. Raavad challenged — for R' Yosi said this; and meaning in Tosefta Demai ch. 1: found a thrown infant half idolater half Israel — cast on him two stringencies; R' Yosi: if one gentile woman or one maidservant was there — she is suspected of casting; and Maggid Mishneh already wrote it is impossible to rule like R' Yosi, for then all the above laws are nullified — for he holds R' Yosi disputes on all; but Rambam follows his method, explaining lashon, etc., but for lineage not for kiddushin as above seif 33; and if so for lineage Tanna Kamma admits to R' Yosi; and what Raavad challenged — that we follow majority in monetary cases — is not relevant here; not because of safek nefashot but because for lineage we do not follow majority, as above.`,

  "37#ב": `And likewise shetuki, etc. As Yevamot 37b: "here that came," etc.; and though from Torah permitted since it says "found," etc. — if forbidden you would not find it as Rambam there — nevertheless rabbinically forbidden because of this decree; as Nazir 12a: "if so I say," etc.`,

  "37#ג": `And which, etc. As stated; and R' Yosi admits, etc.`,

  "37#ד": `Karaites, etc. As Kiddushin 75a tannaitic source; and R' Elazar ben Antignos: Samaritan, etc.; and there 76a: because not expert, etc.; likewise Sadducee as Rambam and Shulchan Aruch YD siman 267 s.k. 67 that Sadducees, etc.; and Rashi 71a chapter 7 letter 2 s.v. kutim; and we rule like R' Elazar — R' Elazar follows his method forbidding safekot mutually; and this is "and R' Elazar," etc.; and Rashi Yevamot 37a s.v. kutim — likewise Sadducees as above.`,
});

console.log(`beur-hagra siman 004 full patch done (${n} blocks)`);
