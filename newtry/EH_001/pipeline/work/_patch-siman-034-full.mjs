#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

let n = 0;
const p = (rel, slug, T) => { n += patchFile(rel, slug, T); };

p("siman_034/mechaber/part-001.txt", "mechaber", {
  "1#main": `The blessing of erusin and whether ten are required. It contains 4 seifim.

Whoever betroths a woman — whether by himself or via a messenger — blesses (he or the messenger) (Tur). Some say another blesses (Semag and Hagahot Maimoniyot). Such is the custom. Baruch Atah Hashem Elokeinu Melech haOlam asher kideshanu bemitzvotav vetzivanu al ha'arayot ve'asar lanu ha'arosot vehitir lanu haneshu'ot al yedei chuppah bekiddushin. Baruch Atah Hashem mekadesh Yisrael. (Some say the text of the blessing is different, saying vehitir lanu haneshu'ot al yedei chuppah vekiddushin (Tur), and conclude Baruch Atah Hashem mekadesh amo Yisrael al yedei chuppah vekiddushin (so wrote the Rosh), and such is the custom in these lands.) After he finishes the blessing, he betroths.`,
  "2#main": `They are accustomed to arrange this blessing over a cup of wine and to bless on it first, and afterward bless this blessing. If there is no wine or beer there, they bless it by itself.`,
  "3#main": `If he did not bless the erusin blessing at the time he betrothed, he does not bless it at the time of nissuin.

{Rama: Some say they bless it at the time of nissuin (Mordechai first chapter of Ketubot), and such is the custom. Even if he betrothed a woman long ago, they bless the erusin blessing under the chuppah. Some say he repeats and betroths her under the chuppah so that the kiddushin are adjacent to the blessing (Rivash siman 82). See above siman 36. If he already blessed the erusin blessing at the time of the first kiddushin, some say they repeat and bless under the chuppah without mentioning the Name because of onlookers (there in Rivash regarding one who betroths via messenger), and such seems correct to me.}`,
  "4#main": `The erusin blessing requires ten lechat'chila.`,
});

p("siman_034/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Ramban chapter 3 Laws of Marriage from a baraita as Ravin explains, etc. Ketubot 7b.`,
  "1#ב": `From tractate Kallah: from "and they blessed Rebecca," and so too Tosafot there.`,
  "1#ג": `Rashi explains there: rabbinically they decreed seclusion with an unmarried woman, and even with a betrothed woman they said it is forbidden until she enters the chuppah; and in the blessing — a bride without blessing is forbidden to her husband like a niddah.`,
  "1#ד": `Ran wrote in name of Rabbenu Tam who emended the text of the blessing "vehitir lanu et haneshu'ot lanu," and so I saw practiced.`,
  "1#ה": `Per the Rif and Rambam there, and the Rosh in a responsum beginning of kelal 26.`,
  "2#_": `Rambam there chapter 3.`,
  "3#_": `Tur in name of Rav Sherira Gaon and Beit Yosef per Rambam and Rosh.`,
  "4#_": `There in name of Rav Hai from words of his father the Rosh in his rulings end of first chapter of Ketubot; and there he wrote in name of Rav Achai and agreed to this.`,
});

p("siman_034/beit-shmuel/part-001.txt", "beit-shmuel", {
  "1#א": `Via a messenger. As it is written "and they blessed Rebecca," and Eliezer was a messenger — Tosafot.`,
  "1#ב": `That another blesses. So as not to embarrass one who does not know how to bless; and if there is no other, the groom blesses — Perishah.`,
  "1#ג": `And permitted us the married women to us. So all the later authorities.`,
  "1#ד": `And after he finishes. Per several poskim he betroths before the blessing, lest she retract and not wish to accept the kiddushin; but we hold lechat'chila he blesses before kiddushin so it precedes the act. Bedi'eved he may bless after kiddushin.`,
  "3#א": `That he repeats and betroths. See siman 36 seif 6 where he ruled the sender does not betroth her after the messenger betrothed, lest they say kiddushin of a messenger are not kiddushin; yet here he wrote he repeats and betroths and is not concerned lest they say the first kiddushin were not kiddushin. Possibly kiddushin via messenger we are more concerned they will say kiddushin via messenger are not kiddushin.`,
  "3#ב": `Without mentioning the Name. In Rivash it says he should not say "Baruch Atah Hashem" but "Baruch Atah haShem." Chelkat Mechokek wrote it implies he mentions malchut; elsewhere we say it is better to bless without Name and malchut.`,
  "4#א": `Requires ten lechat'chila. If there are not ten there is no impediment; but the nissuin blessing is an impediment. See Beit Yosef siman 42/62 what he wrote in name of Rashba; see Piskei Mahari'a siman 101; and see Mahari'l whether we say at an erusin meal "sameach bema'ono." See Beit Chadash.`,
  "4#ב": `Ten. Meaning for testimony to kiddushin two are required; for the blessing, ten. See customs of Maharam Mintz.`,
});

p("siman_034/baer-hetev/part-001.txt", "baer-hetev", {
  "1#א": `Messenger. As it is written "and they blessed Rebecca," and Eliezer was a messenger — Tosafot Ketubot 7b.`,
  "1#ב": `Blesses. So as not to embarrass one who does not know how to bless; and if there is no other, the groom blesses — Perishah.`,
  "1#ג": `And permitted us the married women. It should read "haneshu'ot lanu" — so all the later authorities.`,
  "1#ד": `Chuppah and kiddushin. See Chelkat Mechokek what he brings in name of the Ittur; and so in Hagahot Isserles there.`,
  "1#ה": `He betroths. Per several poskim he betroths before the blessing, lest she retract and not wish to accept the kiddushin; but we hold lechat'chila he blesses before kiddushin so it precedes the act. Bedi'eved he may bless after kiddushin — Beit Shmuel.`,
  "2#_": `Wine. In Sefer Be'er Sheva he wrote the groom should be careful to drink a revi'it to bless the final blessing; Kenesset HaGedolah wrote on this and I have not seen in our time people careful about this — rather any taste is sufficient — see there.`,
  "3#א": `Long. Meaning she did not bless then at the time of kiddushin.`,
  "3#ב": `And betroths her. See siman 36 seif 6 where he ruled the sender does not betroth her after the messenger betrothed, lest they say kiddushin of a messenger are not kiddushin — see there and Beit Shmuel.`,
  "3#ג": `Name. In Rivash it says he should not say "Baruch Atah Hashem" but "Baruch Atah haShem." Chelkat Mechokek wrote it implies he mentions malchut; elsewhere we say it is better to bless without Name and malchut — see Hagahot Isserles what he wrote. A minor under thirteen who betrothed or married a woman — whether we bless erusin and nissuin blessings; and if they blessed, whether he must repeat kiddushin after he grows up — depends on the dispute of these poskim who hold it is forbidden to marry off a woman to a minor as it is like prostitution — likewise one should not bless erusin and nissuin blessings. If they blessed, he repeats and blesses when he grows up. Per those who hold there is a mitzvah, he may bless on kiddushin of a minor and need not repeat when he grows up. Maharam Mintz wrote: nevertheless my heart wavers even per those who hold there is a mitzvah, since at that hour he is exempt from the mitzvah and has not yet come to obligation of mitzvah — perhaps one should not bless. Kenesset HaGedolah wrote on this: the doubt is specifically regarding a minor who betrothed a minor girl, since both are not bar mitzvah; but a minor who betrothed an adult woman — it is fine to bless for her obligation; and likewise if he is adult and she minor — see siman 62 s.k. 1 from Beit Shmuel in name of Kenesset HaGedolah there; and above siman 1 from Beit Shmuel. Kiddushin done by mistake that did not take effect and require other kiddushin — no other blessing is required. And in all doubtful kiddushin requiring complete kiddushin to be repeated — one need not repeat the blessing — Kenesset HaGedolah 62b.`,
  "4#_": `Ten. Meaning for testimony to kiddushin two are required; for the blessing, ten. Even relatives may be counted — see customs of Maharam Mintz. If there are not ten there is no impediment; but the nissuin blessing is an impediment — see Beit Shmuel and Beit Chadash.`,
});

p("siman_034/beur-hagra/part-001.txt", "beur-hagra", {
  "1#א": `Whether, etc. Tosafot there s.v. ne'emar, etc.`,
  "1#ב": `He or the messenger. Meaning: when he betroths himself he blesses himself; via messenger the messenger blesses — so Rambam and Tur; as written regarding the groom's house; and so "and they blessed Rebecca."`,
  "1#ג": `Some say, etc. And as written "and they blessed Rebecca."`,
  "1#ד": `Baruch Atah, etc. Such is the text of the Rif and Rambam; and so Ran in name of Rav Hai Gaon and Ramban that chuppah is not now.`,
  "1#ה": `Some say, etc. He disputes on two points: to conclude Baruch Atah chuppah vekiddushin as our custom in the Gemara; as written in the Rosh and Tur; and also to say vekiddushin with a vav, as written in the Gemara, Rif, Rosh, and Shulchan Arukh; as written Maharam Metiktin.`,
  "1#ו": `Chuppah bekiddushin. So Ran in name of Ba'al HaMaor, for kiddushin precede chuppah.`,
  "1#ז": `And after, etc. As written in first chapter of Pesachim that all mitzvot, etc.`,
  "2#_": `They are accustomed, etc. So the Rosh there in name of Rabbenu Nissim Gaon; as written chapter 6 of Berakhot that one fixes a blessing for himself. And it is written additionally there that it comes on mitzvot like circumcision and pidyon haben and similar; nevertheless the main obligation is with wine at the nissuin blessing and erusin.`,
  "3#א": `If he did not, etc. and some say, etc. There in the Rosh siman 17; he agreed to the last opinion and brought proof from one who ate and forgot and did not bless — he blesses until digested, etc.; and likewise until chuppah when it finishes. This is his view that he wrote one need not precede the act here; therefore he compares to birkat hamazon. But per what he wrote in a responsum and as above siman 61 that he blesses preceding the act — one should compare to hamotzi, where they said in chapter 4 of Berakhot one should not bless after eating; rather one should say as Tosafot wrote chapter 3 of Sukkah regarding lulav — since shaking is part of the mitzvah, etc.`,
  "3#ב": `And such is the custom even, etc. Meaning even lechat'chila. Mordechai there what he wrote; and the main reason is because they are accustomed to betroth under the chuppah — therefore they do not distinguish, as written regarding netilat yadayim and immersion.`,
  "4#_": `Erusin blessing, etc. For we derive from Boaz; and likewise from Rebecca — all erusin blessing and erusin.`,
});

p("siman_034/beit-meir/part-001.txt", "beit-meir", {
  "1#_": `If there is no wine or beer there. And in siman 62 it says in name of the Rosh and Ran in the Tur: for erusin blessings, if there is no wine he does not bless on beer — Beit Yosef brings them in this siman.`,
  "2#_": `And Beit Chadash there wrote that our custom is even bedi'eved to bless on beer if there is no wine, per the Rambam and Shulchan Arukh here.`,
});

p("siman_034/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo", {
  "1#_": `Seif 1 — whoever betroths a woman, etc., blesses, etc. NB: see what is disputed in Rambam chapter 3 Laws of Marriage regarding the law of erusin blessing in his dispute with Ra'avad and words of Hagahot Maimoniyot there; and several matters we wrote on this in a responsum in Yoreh De'ah siman 28 in Mahadura Tinyana — what I expanded on this, with God's help, examine well. And see Hagahot Alfasi first chapter of Berakhot regarding preceding the act — what he distinguishes between kiddushei kesef and shtar versus bi'ah for blessing; and see what Be'er Yitzchak wrote incidentally in responsum to Shadnov kanah mekomah Laws of Gittin siman 141 in my seventh edition siman 99, with God's help examine.`,
});

p("siman_034/ezer-mikodesh/part-001.txt", "ezer-mikodesh", {
  "1#_": `Seif 2 (cup of wine). It is customary that groom and bride also drink from the cup of erusin and nissuin blessings; since such is the custom, automatically the intent of the blessers is as though explicit that they fulfill their obligation of drinking through hearing; and likewise automatically the intent of groom and bride as though they intended to fulfill their obligation through hearing. This is not benefiting — only like creating fruit of the vine of kiddush where they fulfill through hearing, as written in siman 141. But since they are embarrassed to drink and only taste — one should give a child to drink a full large gulp and give to the child immediately, and afterward to groom and bride; this is preferable, for thereby there is no interruption between blessing and drinking, since for a taste there is no blessing — it would be an interruption. Today I say there should be a designated minor for the above — well.`,
});

p("siman_034/pitchei-teshuva/part-001.txt", "pitchei-teshuva", {
  "1#_": `That another blesses. See responsum Noda BiYehudah Tinyana siman 1 regarding an androgynus who may marry a woman, as Rambam ruled chapter 1 Laws of Forbidden Relations law 15 — however he is not commanded to marry, only permitted; and he wrote they do not bless the blessings here since one cannot bless — the blessings are not impediments. He also wrote: regarding marriage of a deaf-mute I am in doubt about blessings, for erusin blessing is on the groom to bless; and what is customary that the kiddushin officiant blesses is so as not to embarrass the ignoramus; in any case the main blessing is to discharge the groom — and since he is deaf and does not hear, he is not discharged through this blessing — how can the officiant bless? If there were room to say the bride is also included in erusin blessing and the officiant discharges the bride — nevertheless a deaf-mute who married a deaf-mute woman — certainly in my opinion there is no blessing here; nevertheless it is called nissuin as explained in chapter Cheresh. Therefore this androgynus may marry a woman and betroth her with chuppah and kiddushin but without erusin blessing; and it is good to arrange her chuppah together with another groom and his bride so she hears that groom's blessings — end quote there; and see Mahadura Sheniya siman 62 seif 3.`,
  "2#_": `Chuppah and kiddushin. See responsum Beit Efrayim in introduction to Even HaEzer section — correct reason why they changed the order and put chuppah before kiddushin — see there.`,
  "3#_": `And concludes, etc. See responsum Noda BiYehudah Tinyana siman 80 what he wrote on this.`,
  "4#_": `He betroths. Avnei HaTzedek; and see Mishneh LaMelech chapter 3 Laws of Marriage law 23; and see Shakh Yoreh De'ah siman 19 what he wrote there.`,
});

p("siman_034/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger", {
  "1#_": `Siman 34 seif 1 — and after he finishes the blessing. NB: if the betrother is from a place whose custom is to bless first, and the betrothed is from a place whose custom is to bless after kiddushin — or the reverse — we follow the betrother who performs the mitzvah upon whom it is to betroth — responsum Mekor Baruch siman 22.`,
  "2#_": `Beit Shmuel note 2 — that another blesses. NB: a deaf-mute who marries a deaf-mute woman who does not hear — one does not bless at all — responsum Noda BiYehudah Even HaEzer siman 1.`,
  "3#_": `Beit Shmuel note 4 — lest she retract. See responsum Rashbash siman 185.`,
});

p("siman_034/turei-zahav/part-001.txt", "turei-zahav", {
  "1#_": `And such is the custom — Rashba'l wrote the reason the groom does not bless is so as not to embarrass one who does not know; and likewise at Torah reading the oleh does not read but the shaliach tzibbur — for this reason, end quote.`,
  "2#_": `And commanded us regarding forbidden relations — Beit Yosef in name of Ran challenged: how do we find such a blessing that we bless on prohibition? For we do not bless "who forbade us nevelah and permitted us shechutah," etc. He answered: this blessing is not literally a mitzvah blessing, etc., for one does not bless and command us regarding kiddushin since there is no completion of the mitzvah here — for she still lacks entering chuppah; and at time of chuppah one does not bless since he already betrothed; and when he comes to betroth and enter at once, it is not fit to fix a separate blessing for him — rather the blessing is on sanctity of Israel, etc., and he expanded on this see there. It seems to me another way: after we examined further the text "vehitir lanu haneshu'ot" — why praise on the heter? If so we would need praise on everything permitted! And from where derive prohibition of a man with his wife? It seems to answer thus: we find Chazal expounded on the verse "blessing to his families" — on matters of his families, meaning forbidden relations that were forbidden to them; and to teach we are not like them to be pained by this prohibition — rather we thank and praise that we merited this sanctity and are not pained by it. He then said another way: not only we are not pained by prohibition of forbidden relations — for even nations hold prohibition among them — but even our betrothed women He forbade us; nevertheless we are not pained. And not only that — even our married women who are permitted only via chuppah and kiddushin — two sanctities — but one alone does not suffice; this would be considered (God forbid) greater pain; and we are not pained — rather we praise You for sanctifying us in this. Thus what they say "vehitir lanu," etc. — the intent is not on the heter but on the precision that it was permitted only specifically via two kiddushin; and incidentally we mention the reason — truly "blessing to his families" and on prohibition of forbidden relations more than other prohibitions. It seems since they were accustomed to them — Yaakov our father married two sisters; presumably many in Israel did so — separation from a woman one married was difficult for them, great pain, as we find in days of Ezra when he separated Israel from foreign daughters they had married.`,
  "3#_": `Haneshu'ot via chuppah — Ran wrote in first chapter Rabbenu Tam emended "vehitir lanu haneshu'ot lanu"; Rashba'l wrote and so I practice. Per my humble opinion the main reason is that "lanu" a second time — lest it be heard that all marriages are permitted to everyone; this was not fixed by saying "lanu" a second time. I found Maharal of Prague said "et haneshu'ot al yedei chuppah vekiddushin" in one breath without interrupting between them. It also seems there is no concern saying "lanu" once, for the verse says "and their daughters we will take for ourselves as wives" — certainly each will marry one; automatically it will be via chuppah, etc. Attached to haneshu'ot — the intent is marriages are not permitted except via chuppah — for one who had chuppah with her and not another; as above.`,
  "4#_": `Chuppah vekiddushin — in the Ittur he wrote the main text in kiddushin is with yud-tav; but the precise readers read that yud-tav as rafeh like vav adjacent to beged kefet; listeners erred and thought they said vekiddushin with vav; and he was forced to this since chuppah is mentioned before kiddushin; but truly kiddushin came first. If he says bekiddushin it works — meaning chuppah via kiddushin that came first; and automatically now that kiddushin is under chuppah, this is not needed.`,
});

console.log(`siman_034: ${n} blocks patched`);
