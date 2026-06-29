#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

let n = 0;
const p = (rel, slug, T) => { n += patchFile(rel, slug, T); };

p("siman_032/mechaber/part-001.txt", "mechaber", {
  "1#main": `How a woman is betrothed through a document. It contains 4 seifim.

Through a document how? He writes for her on paper or on a pottery shard — even though it is not worth a perutah — "Behold you are betrothed to me" and he gives it to her before witnesses. And he must write it for the sake of the woman being betrothed, as with a get; and if he wrote it not for her name she is not betrothed. And he writes it only with her consent; and if he wrote it against her will — she is doubtfully betrothed.`,
  "2#main": `Even though the document is invalid to betroth with — they appraise the paper; if it is worth a perutah she is betrothed, and if not — she is doubtfully betrothed.`,
  "3#main": `If she is a minor or a na'arah and he betroths her through her father with a document — he writes "Your daughter is betrothed to me."`,
  "4#main": `There are those who say that he must mention the names of the man and woman in the document of kiddushin as he must mention them in a get.

{Rama: If he wrote it on something attached to the ground or on benefit prohibitions — some say it is invalid (Maggid Mishneh chapter 3 Laws of Marriage), and some permit (Rashba siman 703). He need not write the date in a document of kiddushin (Rabeinu Yerucham). If he wrote it in his own handwriting and there are no witnesses on it — she is doubtfully betrothed (Nimmukei Yosef chapter Four Brothers). If he gave her a document and said on condition that the paper remains mine — she is not betrothed (Ran first chapter of Kiddushin).}`,
});

p("siman_032/baer-hetev/part-001.txt", "baer-hetev", {
  "1#_": `Betrothed. Without this she is doubtfully betrothed on account of the paper as written in the next seif — perhaps worth a perutah; only the difference is if he stipulated that he does not betroth with paper but only with a valid document — nevertheless it is doubtful kiddushin — Chelkat Mechokek; also a difference in this doubt whether the child is a doubtful mamzer. And in the concern that perhaps the paper is worth a perutah — it is only a rabbinic concern — Beit Shmuel.`,
  "2#_": `Invalid. Meaning even if he wrote it not for her name and gave it to her as a document which is invalid — nevertheless they appraise the paper; they said invalid only when he says explicitly that he does not betroth her as money even if the paper is worth much. And Beit Yosef was uncertain whether it discusses even when he betrothed with it as a document — nevertheless they appraise, etc. — see there. And in truth it is explained explicitly in the Gemara 48 and Bach and Nachalat Tzvi.`,
  "4#א": `To the ground. But one who betroths with something attached to the ground as money — she is betrothed — Bach in name of Rashba; and likewise Hagahot Isserles; see Chelkat Mechokek.`,
  "4#ב": `Benefit. Rashba in responsum siman 703 concludes per Yerushalmi that with a Torah benefit prohibition she is not betrothed, and with a rabbinic benefit prohibition she is betrothed — brought above siman 28; and wonder on Rama that he did not mention this distinction.`,
  "4#ג": `And some permit. See Chelkat Mechokek who disagrees and wrote there are no "some permit" here — see there.`,
});

p("siman_032/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Baraita and statement Kiddushin 9a.`,
  "1#ב": `Question and resolution there 9b — we compare being to leaving and require for her sake.`,
  "1#ג": `Dispute of amoraim there and dispute of rabbis — "which halakhah do we follow" — and Rosh wrote we act stringently as Tur wrote in their names.`,
  "2#_": `Tur in name of RaMHaH.`,
  "3#_": `Baraita and statement of Rava and R' Nachman there 9a.`,
  "4#_": `Rashba in responsum siman 420.`,
});

p("siman_032/beit-meir/part-001.txt", "beit-meir", {
  "1#_": `Beit Shmuel wrote in name of Shakh — and a fortiori "behold you are betrothed to me" means in speech a fortiori; rather this is to betroth you since their essence is in writing. And see siman 136 from there it seems likewise here lekhatchilah he should say "this is for your betrothal"; and there Shakh wrote afterward and it seems to me that even in kiddushin of money if he said "this is for your betrothal" she is betrothed, etc. — see there.`,
});

p("siman_032/beit-shmuel/part-001.txt", "beit-shmuel", {
  "1#א": `On pottery. It is something that can be forged; they write on it when handing it before witnesses of transfer specifically. And Ran wrote specifically when witnesses do not sign on it; but if witnesses signed on it we are concerned he may rely on the signature — see more on this siman 124.`,
  "1#ב": `And he gives it to her before witnesses. Below siman 133 regarding a get — if witnesses signed on the get and handed it between them it is valid, and some say invalid; and this dispute applies here also in kiddushin — Chelkat Mechokek.`,
  "1#ג": `For the sake of the woman. See Shakh at beginning of 425 that he must write the name of his city and the name of her city as in a get; and a fortiori "behold you are betrothed to me" — rather he says "this is for your betrothal."`,
  "1#ד": `Doubtfully betrothed. Without this she is doubtfully betrothed on account of the paper as written nearby; only the difference is if he stipulated that he does not betroth with paper — so too Chelkat Mechokek; also a difference in this doubt whether the child is a doubtful mamzer; and in the concern that perhaps the paper is worth a perutah — it is only a rabbinic concern.`,
  "2#_": `They appraise the paper. Beit Yosef wrote in language of possibility — even if he betrothed as a document and the document is invalid, nevertheless she is betrothed if the paper is worth a perutah; and in truth so is explained in the Gemara 48; again I saw in Beit HaGadol that he wrote so himself; see siman 28 what is written.`,
  "3#_": `Your daughter, etc. See siman 37 — many details of law on this.`,
  "4#א": `Attached to the ground. I already wrote siman 27 — if he betroths as money he can betroth even with something attached; and a document attached — Rashi at beginning of Gittin 8 and Rashba responsum siman 1221 and Ran that it is invalid; and what Rashba wrote responsum siman 420 that it is valid he did not decide; and wonder on Rama that he wrote "and some permit" — meaning Rashba siman 420 — Chelkat Mechokek; and if worth a perutah she is betrothed as money as written seif 2.`,
  "4#ב": `Or on benefit prohibitions. What Maggid points out — invalid — is not so; rather we find a dispute on this in Yerushalmi and so in Darkei Moshe; and in responsum Rashba siman 703 he brought Yerushalmi — the main view is like rabbis who say they do not dispute; and what says she is betrothed — that is if it is a rabbinic benefit prohibition; and what says she is not betrothed — that is with a Torah benefit prohibition. And wonder on Rama that he did not mention this distinction that Chelkat Mechokek distinguished; and what Maggid points out here refers to something attached — see siman 28 where he wrote regarding a vow of benefit it is kiddushin.`,
  "4#ג": `And there is no witness on it. Nimmukei Yosef chapter Four Brothers brought dispute in Kiddushin — if written in his handwriting we rule in Gittin it is valid from Torah — do we say in kiddushin too she is betrothed from Torah or perhaps only a get where it is written "and he wrote for her" and behold he wrote for her; but in kiddushin one can say matters of intimacy require two witnesses. And some wrote in Gittin too we say matters of intimacy require two and the Merciful One validated handwriting because it is considered as though two signed on it — if so in kiddushin too it is valid. And siman 133 there is explained dispute in a get whether there is signature without witnesses of transfer — for several poskim the get is void; if so in kiddushin too if there is no signature the kiddushin are void; and if there is signature and no witnesses of transfer — valid from Torah; and the aforementioned dispute in Nimmukei Yosef therefore comes per those who hold signature without stipulation helps — so too Chelkat Mechokek; for otherwise difficult either way: if there is no stipulation even if handwriting it is like signature — nevertheless the get and kiddushin are void; and if there is stipulation — why are kiddushin void? Therefore it comes per those who hold signature without stipulation is valid; if so for us if there is no stipulation it is doubtful kiddushin without the dispute Nimmukei Yosef brought — rather from doubt whether signature helps without stipulation; therefore it is a double doubt to permit: one — whether signature helps without stipulation; and if you say it helps — doubt whether handwriting is like witnesses of signature; and if a document of kiddushin comes before us written in handwriting and we do not know if there was a stipulation — I wrote below siman 130 — in all such cases we do not say certainly there was a stipulation, also we do not say certainly there was no stipulation, and the kiddushin are rabbinically invalid until it is clarified that there was a stipulation.`,
  "4#ד": `He gave her a document and betrothed as a document and said on condition the paper is mine. The words fly in the air; but if he said on condition you return the paper — she is betrothed, for a gift on condition to return helps if he betroths as a document; and if he betroths with paper as money and says on condition you return the paper — then it is a gift on condition to return and it is not kiddushin — Chelkat Mechokek; see siman 38 where this law is explained on its basis; also there I wrote regarding whether it is stipulation and act in one matter.`,
});

p("siman_032/beur-hagra/part-001.txt", "beur-hagra", {
  "1#א": `He writes, etc. And he did not mention witnesses for he need not witnesses of signature at all since necessarily witnesses of transfer are required as written "and he gives," etc.; see in this siman in hagahah.`,
  "1#ב": `Before witnesses. As above in the preceding siman and what is written there "and R' Elazar per his view," etc.; witnesses of transfer we necessarily require.`,
  "1#ג": `And if, etc. For the question was bedi'eved; and further there it is stated "they wrote for her sake and not," etc.`,
  "1#ד": `This is, etc. For Rif chapter 4 like R' Chaim and Rosh that she is not betrothed — they seated Rava there "there is no," etc.; and even though we do not rely on the second version of R' Ashi who is later — they established it in Kesubos 102b regarding documents of betrothal; and Razah wrote on the contrary from what is written Kesubos there "the rabbis taught we do not write," etc.`,
  "2#א": `Even though the document, etc. Kiddushin 48a Beit Yosef such as, etc.; and if you say, etc.; and if you say, etc.; and what is written Yerushalmi and Rif brought at beginning of Kiddushin "in a document" — this that you might say in a document that has no perutah; but if it has perutah worth of money — the difference is in an invalid document — Ran there.`,
  "2#ב": `Doubt, etc. As above siman 31.`,
  "3#_": `And he betroths her through her father. And through herself will be explained siman 37 seif 7 in hagahah.`,
  "4#א": `There are those who say, etc. And likewise Rashba in his novellae — what wrote "your daughter," etc. — used abbreviated language since we challenge on divorce for all matters as stated; writing names in a get from Torah because scroll of severance cuts between him and her explicitly between so-and-so and so-and-so — likewise Ran; nevertheless (and so Yerushalmi) chapter 1 beginning law 2 order of sale thus I so-and-so sold my field to so-and-so; order of kiddushin thus I so-and-so betrothed my daughter to so-and-so — R' Chagai asked before R' Yosef if he substituted and said I so-and-so took daughter of so-and-so I so-and-so betrothed daughter of so-and-so — told him what about your son; but if substituted language of sale for language of betrothal or language of betrothal for language of sale — did nothing. Error in Kiddushin should read in beginning I so-and-so took daughter of so-and-so as baraita brought in Bavli 9a taught with document how, etc. and Ran, etc. and said there this does not resemble, etc. there, etc. and in question should read I so-and-so betrothed my daughter to so-and-so — therefore substituted, etc. meaning of sale for betrothal; but if substituted and said but if substituted, etc. nevertheless in our Gemara 5b gave is not anything even bedi'eved as stated there; all the more in a document.`,
  "4#ב": `If he wrote, etc. Gittin 10a; and Rashi there s.v. hagah ella, etc.; and likewise in Beit Yosef and several poskim.`,
  "4#ג": `Or, etc. With Torah benefit prohibition specifically — and such is view of Rashba; see siman 28 s.k. 21 in hagahah.`,
  "4#ד": `And some permit. With something attached it is view of Rashba siman 420; and he wrote specifically in Gittin because it is written "and he gave"; and in Yerushalmi because it is written "document" — Yere'im from what is written in Tosefta one who betroths in a condemned city and with its inhabitants in dimum and on a ship that ascended — she is not betrothed — forty specifically because it is prohibition, etc.`,
  "4#ה": `And he need not, etc. Yevamot 31b.`,
  "4#ו": `If he wrote, etc. Tosafot there s.v. leMi'ut, etc.; and Nimmukei Yosef wrote on this several views; and the main point is as view of Rashba who wrote without stipulation it does not help even handwriting as written Kiddushin 65a; but with witnesses of transfer it suffices even without witnesses at all — as written 48a Beit Shmuel.`,
  "4#ז": `He gave her, etc. From what is written in Yerushalmi and Rif and Rosh brought the case in a document that has no perutah, etc. — evidently he must give the document to her; and Ran there. And likewise in divorce Gittin 2 and 85a; and what is written Kiddushin 48a Beit Yosef such as, etc. and they appraise the paper — evidently he gives it to her.`,
});

p("siman_032/pitchei-teshuva/part-001.txt", "pitchei-teshuva", {
  "1#_": `Before witnesses. See Chelkat Mechokek and Beit Shmuel; and see in Maggid Mishneh chapter 3 Laws of Marriage law 3.`,
  "2#_": `That the document is invalid. Ba'er Heitev; and see in Maggid Mishneh chapter 7 law 19 and in Sha'arei HaMelekh chapter 5 Laws of Marriage end of law 26 what is written on this; and above siman 61.`,
  "3#_": `Attached to the ground. Ba'er Heitev what is written; but one who betroths, etc.; see in Sha'arei HaMelekh chapter 3 law 3 and in Get Mekushar in Kuntras Aleph letter yod.`,
  "4#_": `And some permit. Ba'er Heitev; and see in Get Mekushar Kuntras Aleph letter yod that he wrote to resolve words of Rama on this.`,
});

p("siman_032/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger", {
  "1#_": `Siman 32 seif 1 — through a document how. NB Ritva in novellae first chapter of Kiddushin 6 wrote likewise the law when betrothing with a document requires language of the husband and to write "and I," etc. — it seems in a document of kiddushin he must write "and I," etc. as in a get.`,
});

console.log(`siman_032: ${n} blocks patched`);
