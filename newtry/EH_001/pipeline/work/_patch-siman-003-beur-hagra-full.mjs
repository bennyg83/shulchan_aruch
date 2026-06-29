#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_003/beur-hagra/part-001.txt", "beur-hagra", {
  "1#א": `One who comes nowadays, etc. The distinction between terumah nowadays and Torah terumah is as stated there (24): Tanna Rabbanan "I am a kohen," etc.; the conclusion there and Beit Yosef on elevating, etc. So Tanna Kamma and R' Yehuda dispute in the Mishnah, and the Rambam rules like R' Yehuda — even though Rabbanan disagree, because the anonymous tanna there (28) in the Mishnah is like his view, as stated "we learned like so-and-so says," etc. It is a dispute and afterward anonymous; so too dispute in a baraita and anonymous in the Mishnah; so too anonymous in Mishnah Yevamot (99); as stated "we learned like so-and-so says," etc. — all this for Torah terumah. But for rabbinic terumah even R' Yehuda agrees, as stated there (25a); and we conclude, etc. Terumah nowadays is rabbinic, as stated ch. 1 and ch. 3 of Pesachim and ch. 6 of Nazir; similarly for Rabbanan of R' Yehuda in chapter HaArel. Thus "nowadays." So too the Rambam distinguishes explicitly there between rabbinic terumah and Torah terumah throughout this siman.`,

  "1#ב": `And he said "I am a kohen," etc. The Mishnah there is for Tanna Kamma; the same applies for us with terumah nowadays. There (26a) — specifically when speaking casually (mesalechet). Therefore terumah nowadays, which is deoraita — he is not believed when mesalechet, as stated explicitly in Bava Kamma (114b).`,

  "1#ג": `And we do not elevate, etc. The language of the Mishnah there — R' Yosi says "there is no," etc.; and "believed / not believed" of Tanna Kamma.`,

  "1#ד": `And he may not be called, etc. For we elevate to kehunah through Torah reading, as stated there (25b); so too from Nevi'im, as stated (1a): "However, nevich..." etc.`,

  "1#ה": `Some say, etc. So too the Ran and Maggid Mishneh in the name of Remakh.`,

  "1#ו": `That there is no concern, etc. The need there for mesalechet was for terumah itself; but to be concerned as we are concerned for yichusin — since it is rabbinic we do not concern, like any rabbinic safek.`,

  "1#ז": `So too is the practice, etc. So the Ran and Maggid Mishneh — to uphold the custom; but they did not agree to this.`,

  "1#ח": `And he may not eat, etc. As above in the Mishnah and Gemara cited, and there (24a): Tanna Rabbanan "I am," etc.`,

  "1#ט": `Until, etc. As above — nowadays one witness is believed even for R' Yehuda.`,

  "1#כ": `If he married, etc. For all matters of being stringent upon himself he is believed more than a hundred witnesses, as stated in Keritot (12a) — because he does not want to bring chullin to the azara. So stated in Kiddushin ch. 1: "Was presumed... her husband," etc. There is no difficulty that she receives lashes — for regarding herself she does not need hazakah.`,

  "1#מ": `If he was, etc. As above; a fortiori for marriage, etc., as stated in the Mishnah: we elevate to kehunah, etc.`,

  "2#א": `And even his father, etc. There Beit HaBahir (2b) — like his fellow (R' Chanina).`,

  "2#ב": `And even from documents, etc. Since they only needed there for yichusin — the same applies for our case: there is reason to be concerned for yichusin like Torah terumah, unlike the present situation. Thus "nowadays" — we hold like those who say there we do not elevate, because it is deoraita; and further per their view like the latter wording; and per the view established last, as stated in ch. 15 of Sotah.`,

  "2#ג": `How so, etc. There it is brought, etc.`,

  "2#ד": `And so too, etc. There (25a): Tanna taught "hazakah," etc., and says "among kohanim," etc. — although there it says not eating challah, etc. (40) — also for Torah terumah we conclude; meaning per the view that we do not elevate from terumah to yichusin; but per the view that we elevate them — as stated (24b): "If not for that, since," etc., and another answer, etc.`,

  "2#ה": `And from reading, etc. (28b); also specifically nowadays, as stated there (24b): "Great is hazakah," etc.`,

  "2#ו": `Some say, etc. It does not detract from mesalechet — for on a document it is mesalechet.`,

  "3#_": `If, etc., and we are not concerned, etc. See Bahag; as stated in Yevamot (15b); a fortiori in such a case it is not known at all.`,

  "4#_": `Even if two come, etc. Mishnah of the Gemara and Rashi; not like R"Tam in Tosafot d"h bishkeli — to the conclusion even R' Yosi agrees; so too in Choshen Mishpat siman 37 seif 5.`,

  "5#_": `Like kohanim of this time, etc. Gemara there (2a); no need for an adult with him. But for deoraita, even an adult with him does not help, as Tosafot there d"h vehu, etc. Tzarich iyun why he omitted "came from school," etc.; tzarich iyun on Tur and Shulchan Aruch Choshen Mishpat siman 35 seif 6, which wrote "and he would share," etc. — nowadays it does not help, as stated "perhaps," etc.; even for R' Yosi.`,

  "6#א": `One who comes, etc. The text there (1a): R' Chanina — Beit Yosef: e.g., one witness came and testified about his father that this one is a kohen, and divided for him, etc.`,

  "6#ב": `But if his father was presumed, etc. There — only Beit Yosef, etc.; as stated in seif 67; a fortiori two witnesses, and even testimony that comes from the strength of, etc., there (25b).`,

  "6#ג": `And in every matter, etc. There (24b): "Great is," etc.`,

  "6#ד": `For behold, etc. Kiddushin ch. 1; R' Yosi Ish Mitzi — even for yichusin; and they agree, etc.`,

  "8#ב": `And there is no, etc. There on impurity; and the same for those.`,

  "9#א": `Although he is, etc. As stated — it is only rabbinic.`,

  "9#ב": `She committed znus, etc. Gemara there.`,

  "9#ג": `Kohen who comes, etc. Meaning: although we say in Ketubot (13b) — in what case is testimony, etc.; rather they silence, etc. — nevertheless such a case is not as stated (14a) "one," etc. Meaning: even for R' Yehoshua — although disqualified for R' Yosi — we consider as certain; a fortiori such a case, which is only elevation. Although presumably he had relations with a niddah, as stated above siman 26 seif 61 — we hold like Rabba bar Avuha in Yevamot (60a).`,
});

console.log("beur-hagra siman 003 full patch done");
