#!/usr/bin/env node
/** EH001 siman 007 full redo part 1: baer-hetev (52 blocks). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_007/baer-hetev/part-001.txt", "baer-hetev", {
  "1#א": `Forbidden to a kohen. If she is married to a kohen she must leave him. Even though she prostituted and says to a kosher man I was lain with and married a kohen — we hold she does not leave even among mostly disqualified men; here even if she says I am pure she is not trusted as a zona, for we say a woman checks and prostitutes. Even though here it is only safek zona and we hold a woman is not forbidden to her husband except through kinuy and setirah or witnesses — whether a kohen's wife or an Israelite's wife — here because of the elevation of kehunah lineage she is forbidden. It is possible if a captive married an Israelite and was found a virgin — she is permitted after his death to a kohen — Beit Shmuel. Taz forbids lest we suspect the captor had initial contact with her; so too Maharam Alashkar siman 95. See Hardakhei Bayit 8 and Kenesset HaGedolah on Tur hagahah.`,

  "1#ב": `Regarding a Kuti. Per what is written above siman 6 seif 8: likewise one who had relations with an unmarried woman — even if she was a kedeshah who abandoned herself — she is not made a zona. The explanation is abandonment to Israelites; but if it is known she abandoned herself even to gentiles — she is forbidden to a kohen ab initio.`,

  "1#ג": `And if she has a witness. See Mishpetei Shmuel siman 85 and 108, and Kenesset HaGedolah on Tur hagahah.`,

  "1#ד": `And even women. See what Chelkat Mechokek wrote s.k. 2; and Chakham Tzvi in his responsum siman 141 settles it.`,

  "1#ה": `The incident reads (not "and an incident"). It is a separate law and does not refer to a minor — only to his son and daughter; even adults require mesich lefi tumo specifically. What is written nearby that a relative is trusted to testify — does not refer to his son and daughter — Beit Shmuel; see Choshen Mishpat.`,

  "1#ו": `My mother. This proves she must be with her from beginning to end; all the more regarding a gentile — mesich lefi tumo: some who are lenient require from beginning to end ab initio.`,

  "2#א": `Testifies for himself. Even mesich lefi tumo — specifically to testify he cannot; but if no man knew she was a captive except him and he was with her and it is known she was not defiled — she is permitted to him — Beit Shmuel; see s.k. 16.`,

  "2#ב": `Mesich lefi tumo. Rosh klal 32 siman 5 — his proof that a gentile mesich lefi tumo is not trusted; if so in the incident of Mar Shmuel why establish them outside to enter and speak ingenuously that they were not defiled. Chakham Tzvi in responsum siman 141 challenged him: perhaps they do not wish to stand in doubt through another and perhaps they will not speak ingenuously — see there.`,

  "2#ג": `And some are lenient regarding mesich lefi tumo. In responsum Kenesset Yechzekel question 58 he challenged this — see there.`,

  "2#ד": `The same applies to witness from mouth of witness. Meaning: this too depends on the dispute — for the Rosh who disqualifies a Kuti for a captive, witness from mouth of witness is also disqualified for a captive. Some are lenient regarding a Kuti — witness from mouth of witness also helps. But in responsum Rashash vol. 1 siman 6 he wrote the Rosh also permits witness from mouth of witness — see there; nevertheless in practice his words are not compelled — Beit Shmuel. In responsum Chakham Tzvi question 141 he permitted plainly witness from mouth of witness — see there. Woman from others' mouths or woman from another woman's mouth — Ranach vol. 1 siman 22 was uncertain whether it helps; in siman 23 he brought in the name of Maharash Attias that it helps — see there.`,

  "2#ה": `But not to be stringent. Meaning: a Kuti who testifies mesich lefi tumo that she was defiled does not help to be stringent to hold her certainly defiled — rather it is as if he did not testify at all and her law is like any other captive; see Beit Shmuel.`,

  "3#_": `He may marry her. But afterward his testimony helps; we do not say he testifies because he thinks he will marry her. All this deals when it is known she was in captivity; but if only he and he knows she was pure — permitted to marry her. If there are witnesses she was in captivity and he testifies about her but it is not known he is a kohen and he has a miggo that he would not say he is a kohen — he is trusted; see responsum Sha'ar Efraim siman 106 — Beit Shmuel.`,

  "4#_": `Captive. Even if one witness testifies she was defiled — we permit her — so Rashi Ketubot 23b s.v. thus we teach she, etc.`,

  "5#א": `That she was defiled. Even the first witness is a valid witness; afterward a woman came and said she is pure — we are lenient regarding a captive and she is permitted to a kohen even if the witness is valid who says she was defiled came first and the woman at the end — we do not say in such a case wherever we trusted one witness it is like two; also we do not say establish one against one and captive witnesses remain. Even though for testimony that her husband died such testimony does not help — here regarding a captive we are lenient. Even though regarding a Kuti and witness from mouth of witness some are more stringent than testimony that her husband died — we have only what the Sages said — Beit Shmuel.`,

  "5#ב": `Pure. Meaning: it is known she was taken captive; if she gave an excuse for her words why did she say I was defiled — she is trusted. What is written "but not against two witnesses" — meaning specifically a married woman cannot forbid herself to her husband; but an unmarried woman is trusted to forbid herself for kehunah. Chelkat Mechokek challenged: as long as she was under her husband and has one witness who permits her — why is she trusted to say she was defiled; unlike an ordinary woman who says I am defiled to you we suspect perhaps she set her eyes on another as below siman 115 and above siman 6 seif 12. One may say: since there are witnesses she was taken captive it is like presumptive evidence; and Rama wrote there specifically when there is no presumptive evidence — but if there is presumptive evidence she is trusted ab initio — Beit Shmuel.`,

  "6#א": `Bet din. So too in responsum Ridbaz Bayit 8 chamber Yoreh De'ah — see there: he brought if bet din did not know she was in captivity but one knew and she says to him I am pure — he may marry her; even if he is an Israelite that she was pure because he has a miggo she could have been taken by another. He wrote on this in Darkhei Moshe — uncertain. Beit Shmuel wrote: all the more a kohen's wife taken captive and it is known from this and an Israelite — if she is pure she is forbidden to him even though an Israelite to any man and she says I am pure. If he knows she is pure I wrote above s.k. 7 she is permitted to him. Regarding if they permitted her and afterward captive witnesses came — the law of a forbidden relative equals the law of an unmarried woman — Beit Shmuel.`,

  "6#ב": `That she was defiled. But one witness that she was defiled does not help at all — even if she did not marry she does not leave the permission; meaning there are captive witnesses therefore she does not leave the permission — but we do not permit her. But if there are no captive witnesses and one witness testifies she was defiled — we permit her as written in seif 4 — Beit Shmuel.`,

  "7#א": `Rumor. Even a rumor established in bet din — Beit Yosef in the name of Ritva. What Beit Shmuel wrote — nevertheless uncertain to settle the sugya accordingly; also Tosafot appear not to hold this explanation — end — I did not understand why. See Beit Yosef and Kenesset HaGedolah on Beit Yosef hagahah seif 13.`,

  "7#ב": `They were lenient. But regarding a forbidden relative we are not lenient in such a case — even if there are no witnesses only a rumor emerged that there are witnesses in a place that know she was a forbidden relative — she is not trusted; and even if the rumor was not established in bet din we are concerned regarding a forbidden relative ab initio — see there.`,

  "8#_": `To forbid her. Nevertheless she is like an ordinary single witness and joins with another to forbid her; we do not say here that to him alone the Torah did not give trustworthiness as it gave him for marriage — Choshen Mishpat. Beit Shmuel disagrees that to him even to join with one witness — see there. One asked: why is he trusted to say about his son he is a mamzer or son of a divorcee? One may say: any matter he says disqualifies from the presumption of his intercourse or marriage he is trusted — not another matter.`,

  "9#_": `In the courtyard. If she certainly prostituted — forbidden to dwell with her in a courtyard; even in an alley forbidden to dwell with her; see Beit Shmuel.`,

  "10#א": `Under siege. There are three views. Rashi and Ran: another kingdom — forbidden; same kingdom — permitted — meaning when there is guarding so no person can enter the city; but if one can enter the city it is included in a city conquered like Kerakhum and forbidden. Per Tosafot and Rambam: another kingdom that passed through and swept — permitted; same kingdom — more concern. If possible to flee from the city we lean leniently like a hiding place — and this is for kehunah; but regarding yayin nesek the wine is permitted even in that kingdom for libation they have no leisure as written Yoreh De'ah siman 129. Per Rif, Rosh, Rambam, and Rashba: for intercourse there is no distinction and she is forbidden forever whether same kingdom or another kingdom; wine is always permitted. Regarding if they can flee — appears included in hiding place and permitted; see Beit Shmuel.`,

  "10#ב": `That she said. It implies she must come to bet din to say I am pure — Ramban. Ran wrote even if she did not come to bet din we permit her for we claim for her she is presumed pure.`,

  "10#ג": `And swept. Likewise another kingdom if it was calm and secure and not hasty to flee — it is like that kingdom — Beit Yosef.`,

  "11#א": `For kehunah. Even unmarried — Bach, Beit Shmuel.`,

  "11#ב": `For kehunah. Specifically imprisoned many days; but one day or two days permitted — Mahari Mintz siman 6 — see there; see s.k. 39. Do not disqualify seed of a kohen — they said in his presence his wife was taken captive and he was silent — Ram Padua siman 14; Mishpat Tzedek vol. 2 siman 60. Maharam Alashkar siman 1 wrote: through danger to life forbidden — specifically imprisoned by law; but not by law — permitted. Baal Turei Zahav siman 241 wrote meaning specifically to her Israelite husband but not to her kohen husband; see Binyamin Zeev siman 432 and Kenesset HaGedolah on Tur hagahah.`,

  "11#ג": `Israelite. Per this wonder why captive and conquered city permitted to her Israelite husband — for in conquest there is danger to life; why not concerned perhaps she acquiesced to them; see Beit Shmuel in Beit Yosef.`,

  "11#ד": `To them. One said: behold we hold a woman is not forbidden to her husband except through two witnesses or kinuy and setirah. Meaning specifically regarding suspicion perhaps she prostituted with an Israelite; but with an idolater it is more severe; see Beit Shmuel. Above siman 6 s.k. 2 from what is written in the name of Shevut Yaakov.`,

  "11#ה": `Herself. This is adjacent regarding whether she would be forbidden to her Israelite husband; see Choshen Mishpat.`,

  "11#ו": `To death. Meaning specifically when the kingdom's way is to abandon their wives when their husbands' judgment is concluded — Rashi.`,

  "11#ז": `Ransom. Poskim did not wish to rely on this; nevertheless to her Israelite husband in any case we hold like the first view — Choshen Mishpat.`,

  "11#ח": `Great killing. Specifically when killing was great and her acquiescence to prostitution would not help; but where there is wrath and killing and they can save themselves through acquiescence to prostitution — forbidden to her husband ab initio; above siman 6 s.k. 20 from what is written in the name of Shevut Yaakov.`,

  "11#ט": `And per the first view. Because they were imprisoned before she apostatized there is no concern — for all who were not by law we are not concerned perhaps she acquiesced; and after she apostatized we do not say apostate to idolatry is apostate to entire Torah and prostituted — since under coercion apostatized not willingly we do not say she prostituted — Taz, Beit Shmuel.`,

  "11#י": `Permitted. Idolaters do not abandon their wives; but when she alone apostatized it is as if there are witnesses she prostituted — Maharik. So-and-so the kohen apostatized with a certain woman and lived several years in gentile courts by gentile kiddushin and she bore a daughter; afterward they returned and accepted repentance; now their daughter became engaged to a kohen before witnesses and father and mother said their daughter was born from them in fitness and her mother said she did not prostitute with any man except with him and he too said he guarded her properly as a man his wife; Kenesset Yechzekel ruled question 28 she is permitted bedi'eved since she became engaged — see there; above siman 6 s.k. 31 from Shevut Yaakov vol. 2 siman 113. See Ridbaz Bayit 8, Bnei Yaakov siman 10, Bnei Moshe siman 56: man and wife who apostatized and returned must separate three first months for distinction — Perach Mateh Aharon vol. 1 siman 76 — see there; uncertain.`,

  "11#כ": `She prostituted. Chelkat Mechokek and Beit Shmuel disagree: since she alone apostatized we say apostate to idolatry is apostate to entire Torah and it is as if there were witnesses she prostituted.`,

  "11#ל": `Kohanim. Chelkat Mechokek disagrees and wrote he permitted only to her Israelite husband; but to her kohen husband forbidden — for before she apostatized she was delivered to them and there is concern of rape; and not better than through danger to life that she is forbidden to kohen — see there. Beit Shmuel wrote it deals immediately at time of decree she apostatized; therefore no concern for afterward she apostatized — no concern hence permitted even to kohen; also no concern perhaps she prostituted willingly since apostatized under coercion — see there. A wicked man who apostatized and desired a beautiful woman and arranged with gentiles to frame her and apostatize her religion and marry her — likewise permitted to return to her Israelite husband — Rashdam EH siman 100 seif 8; see Maharam Alashkar siman 1.`,

  "11#מ": `To apostatize. Meaning when she was not forbidden because of seclusion — it deals with brief seclusion; rather because she said she would apostatize it is as if delivered to them — teaches she is permitted — Beit Shmuel.`,

  "11#נ": `Strong. Ridbaz chamber (10) [9] Bayit 8 brought in name of Hagahot Alfasi: nowadays when Israel does not judge and they are strict about prostitution — it is as if Israelite hand is strong over themselves. Ridbaz there rejects his words and says not to rely on this hagahah; so Kenesset HaGedolah and responsum Kenesset Yechzekel question 57 — otherwise Gemara would not challenge from Ketubot 26b and Ashkelon where Israelite hand is strong per Rashi there since Israel already exiled — see there; simple.`,

  "11#ס": `Delivered to them. Tosefta, Ran, Maggid Mishneh, and Semak imply no distinction whether she stayed long or not — all depends if delivered to them — forbidden; if not delivered — permitted. Mordechai distinguishes: if stayed long time — forbidden; if not long — permitted. Rosh implies forbidden only if stayed long time and delivered — then forbidden; but brief companionship — permitted — Beit Shmuel; above s.k. 26 from Mahari Mintz.`,

  "11#ע": `Kutim. Responsum Chavat Yair siman (15) [66] advocated for Israelite women going to gentiles' houses to hide and being secluded with them and going to fair without guard — established them in presumption of kosher Israelite daughters. Baal Mechaber Leket HaKemach wrote on him: I do not agree with the lenient one; one who guards his soul will distance himself. See responsum Perach Mateh Aharon vol. 2 siman 95 and Maharam Padua siman 26.`,

  "11#פ": `Prostitution. Even if the woman herself admits she was defiled — she is not trusted — Shevut Yaakov vol. 2 siman 123; see end siman 46 in hagahah there is none; however if she admits afterward she became engaged to the first — forbidden to her husband; Rama also brought from responsum Rosh — if so when she admits we are concerned for rumor; see that responsum and what Chelkat Mechokek and Beit Shmuel wrote there.`,

  "11#צ": `One should be stringent. Chelkat Mechokek wrote it refers to unmarried who speaks with a Kuti words of prayer and hid with intent of prostitution — we are concerned for her and she is forbidden to kohen lest lain with Kuti; does not refer to forbidden relative at all — for necessarily if Israelite's wife we hold we do not forbid seclusion and setirah without kinuy does not forbid to husband; if refers to kohen's wife and concerned for rape — what difference seclusion for prostitution — see there; Beit Shmuel wrote refers to kohen's wife — see there.`,

  "12#א": `Kehunah. Beit Shmuel challenged: why need "these" to exclude one who had relations with niddah — see there. I settled: needed "these" — a fortiori does not come per Torat Kohanim that Tosafot brought Yevamot 60a; on Tosafot's difficulty why widow herself desanctified — one may say Torah comes to exclude if had relations with yevamah while niddah; see uncertain. See seif 14; see Rambam chapter 19: if Kohen Gadol married bogeret or mukat ets — not made chalalah; likewise non-virgin without marriage; but divorcee, zona, and Kohen Gadol with widow — made chalalah through intercourse without marriage — Rambam there. See siman 4: if she prostituted under her husband — sons become chalalim because she becomes zona from first intercourse and forbidden to kohen husband; if pregnant afterward sons chalalim.`,

  "12#ב": `She was lain with. So Rambam — implies even if witnesses testify she was not lain with nevertheless presumed to have had intercourse. Taz wrote: if witnesses she was not lain with — sons she bears from another kohen are not certainly chalalim and forbidden corpse impurity; we go stringently here and there — she becomes chalalah even though witnesses she was not lain with and sons we also go stringently perhaps not chalalim necessarily. Chelkat Mechokek wrote plainly she is not made chalalah when witnesses she was not lain with — see there; so Rashdam EH siman 52; see Maharam Shashon siman 173.`,

  "14#א": `Forbidden relatives. Later authorities wrote no practical difference for us since child from all forbidden relatives is worse than chalal — only regarding warning and lashes if child female and kohen wants to marry her they warn him for mamzeret not chalalah.`,

  "14#ב": `Leshuk. Child not made mamzer through intercourse without marriage; through marriage mamzer rabbinically — see later authorities, Bach, and above s.k. 43 from Beit Shmuel.`,

  "17#_": `For kehunah. Meaning ab initio; bedi'eved she does not leave — later authorities.`,

  "19#_": `Chalutzah. Kohen who erred and married chalutzah and bore sons; after known forbidden to him — says after time wants to dwell with her and all forbidden women because now cannot divorce her due to her relatives who exaggerate to bring him to gentile courts to obligate money — these words have no substance; forbidden to use anything from Aharon's sanctity — responsum Ravan vol. 1 siman 59; above siman 7 s.k. 2 from Shevut Yaakov.`,

  "20#_": `Chalalah. Above siman wrote if transgressed and married safek chalutzah need not remove — Bach wrote above deals when married her Sages enacted they are kosher; not so when had relations in prostitution.`,

  "21#_": `She does not leave. Meaning when conception and birth in holiness; if one Israelite side we also require conception and birth in holiness — Beit Shmuel.`,

  "22#_": `Fitness. But where he is warned about her she is also warned not to marry him — women equal men in all punishments.`,

  "23#_": `Chalal. See Tur this siman and siman 2 — his words contradict: this siman wrote even Israelite with mixed safek issur forbidden to Israelite; siman 2 wrote only to kohen not Israelite; see Maharshal Maggid Mishnah siman 15; Kenesset HaGedolah answers siman 2 deals safek chalal and here safek kahal disqualifications like mamzer — see there; see Perishah and Bach.`,
});

console.log("siman 007 full part1 (baer-hetev) done");
