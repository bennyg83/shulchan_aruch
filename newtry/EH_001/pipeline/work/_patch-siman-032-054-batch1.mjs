#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_032/beer-hagolah/part-001.txt", "beer-hagolah", {
  "4#_": `Rashba responsum siman 420.`,
});

patchFile("siman_032/beur-hagra/part-001.txt", "beur-hagra", {
  "4#א": `Some say, etc. Likewise Rashba in his novellae what wrote "your daughter," etc. — used abbreviated language since we challenge on divorce for all matters as stated; writing names in get from Torah because scroll of severance cuts between him and her explicitly between so-and-so and so-and-so — likewise Ran; nevertheless (and so Yerushalmi) chapter 1 beginning law 2 order sale thus I so-and-so sold my field to so-and-so; order kiddushin thus I so-and-so betrothed my daughter to so-and-so — R' Chagai asked before R' Yosef if he substituted and said I so-and-so took daughter of so-and-so I so-and-so betrothed daughter of so-and-so — told him what about your son; but if substituted language of sale for language of betrothal or language of betrothal for language of sale — did nothing. Error in Kiddushin should read in beginning I so-and-so took daughter of so-and-so as baraita brought in Bavli 9a taught with document how, etc. and Ran, etc. and said there this does not resemble, etc. there, etc. and in question should read I so-and-so betrothed my daughter to so-and-so — therefore substituted, etc. meaning of sale for betrothal; but if substituted and said but if substituted, etc. nevertheless in our Gemara 5b gave is not anything even bedi'eved as stated there; all the more in document.`,
});

patchFile("siman_034/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Language of Ramban chapter 3 laws marriage from baraita as Ravin explains, etc. Ketubot 7b.`,
  "1#ד": `Ran wrote in name Rabbenu Tam who emended blessing text and permitted marriages for us — likewise I saw practiced.`,
});

patchFile("siman_034/pitchei-teshuva/part-001.txt", "pitchei-teshuva", {
  "3#_": `And seal, etc. See Noda BiYehudah tinyana siman 80 what wrote on this.`,
});

patchFile("siman_049/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#ג": `Like R' Akiva there in mishnah — halakhah like R' Akiva from his colleagues and R' Tarfon his colleague.`,
});

patchFile("siman_049/beur-hagra/part-001.txt", "beur-hagra", {
  "1#_": `And if he betrothed, etc. Gemara there — Rashba established mishnah per him like R' Akiva of R' Tarfon his colleague and halakhah like R' Akiva from his colleagues — Rosh and as stated Ketubot chapter 4 2 in conclusion; Abaye all agree his colleague, etc. and dispute R' Yosi holds matin specifically and even so halakhah like R' Elazar for he acted and R' Yosi his counterpart, etc. likewise there Rav Avahu sat, etc. and law, etc. likewise Rava there chapter 5 1 came before Rava, etc. and Rif and Rosh there — from this emerged principle they said in Eruvin halakhah, etc. and we rule all that principle for halakhah even though they dispute there whether halakhah or matin or nireh — because Ketubot sugya holds like R' Elazar who said halakhah.`,
});

patchFile("siman_054/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#ב": `Tosafot and likewise Rosh there and Ran and Rambam chapter 20 laws agents — mitzvah to fulfill words of deceased even when healthy.`,
});

patchFile("siman_054/beit-meir/part-001.txt", "beit-meir", {
  "1#_": `And if she is still betrothed the third party shall act, etc. Chelkat Mechokek wrote and if she, etc. Ran said R' Yosi and is she not, etc. therefore listen to her — possible R' Yosi's reason does not hold mitzvah to fulfill words of deceased; or he holds and both here because of reasons he said; Tosafot s.v. and is wrote Rambam holds cannot sell — in s.v. this is wrote plainly R' Yosi does not hold mitzvah; what says and is she not — meaning per Rambam's words; Gemara implies whose view R' Yosi does not hold mitzvah — rather says even per your view you hold mitzvah on third party but she can sell — therefore even on third party no mitzvah; Ran z"l does not explicitly dispute Tosafot in explaining Rambam — only doubtful in R' Yosi — wrote possible R' Yosi does not hold at all and his reason only per Rambam's reasons as above all per Tosafot; or he holds mitzvah and therefore because of his reason — R' Yosi holds mitzvah not so strong only on third party but she can sell — therefore here even third party acts per her will; but Rambam mitzvah strong until through it even she cannot sell — therefore Gemara seizes Rambam for whom mitzvah is strong; but at least per us who rule like Rambam appears even she cannot sell as I see.`,
});

console.log("siman 032-054 batch 1 patches applied");
