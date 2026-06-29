#!/usr/bin/env node
/** EH001 siman 001 — beur-hagra full editorial (garbage MT blocks). */
import { patchFile } from "./_patch-siman-utils.mjs";

const REL = "siman_001/beur-hagra/part-001.txt";

const n = patchFile(REL, "beur-hagra", {
  "1#א": `**He is obligated, etc.** Mishnah in chapter haBa al Yevimto 61: "a common kohen," etc.; and as explained in the Gemara there — and there in the mishnah "do not let Torah be idle," etc.; and as stated in the Gemara there "I have no one," etc.; and he said "sufficient," etc. — meaning his intent should be for children, for we stated at the end of Taanit: "Rabbis taught — beautiful," etc., "provided you adorn me," etc., i.e. with ornaments — for a woman's beauty depends on her ornaments, as written in the first chapter of Megillah; "provided she comes bare" — for a woman is only for ornaments. And this is what is written in Ketubot 59b: "Rav Chisda does not," etc.; and Rabbi Chisda taught, etc.; and these are the three things stated here. But the tanna in the mishnah had no need except "set your eyes on the family" — and that a woman is only for children. False is grace — it is ornaments, for grace is from another matter, as stated "Esther was greenish," etc. — "and Esther obtained," etc.; "and vanity is beauty," etc.`,

  "1#ב": `**And he causes, etc.** Chapter 4 — Others say, etc.`,

  "1#ג": `**And every, etc.** — joy, blessing, good Torah, a complete wall.`,

  "1#ד": `**And he is not called, etc.** Chapter 63:1.`,

  "1#ה": `**And since, etc.** There 2.`,

  "3#א": `**And one who precedes, etc. — but, etc. Tur.** As written in chapter haBa al Yevimto. And in chapter haNisrafim "they marry them off near her maturity"; and Tur explains near after her maturity — not like Rashi and Tosafot's explanation near before her maturity. And this is what is stated in the first chapter of Kiddushin: "and if we married at fourteen," etc. — i.e. in the fourteenth year, and he would be thirteen years old; see there siman 285 seif 8; and in BeHag there — for otherwise let us say "if we married at thirteen," for whoever is closer to her maturity is better, as above; but before thirteen he does not say — learn from this that it is forbidden; and as written there "one who marries a woman to his minor son." And it appears that even after thirteen it is also called such; and as written in chapters 7, 8, and 14 of Yevamot — for a minor they did not enact marriage for him.`,

  "3#ב": `**And one over whom, etc.** As written at end of chapter haMedir and Rav Techalifa, etc.; and all the more so this and this regarding a fool who never married at all.`,

  "3#ג": `**However, if, etc.** — Rambam's words up to siman 8 of Kiddushin there: "Rabbis taught — to learn," etc.; Rabbi Yosi says, etc.; Rabbi Yishmael, etc.; and he explained, etc.; and some Rashi and Ran wrote — and others explained that in Babylonia their wives engaged in commerce and labor, but in Eretz Yisrael their wives were pampered and ate and did not work — and this is their view.`,

  "3#ד": `**Such as a barren woman, etc.** Even though according to law, etc. — as written there 65:1 regarding a third wife "she shall not marry," etc.; and all the more certainly a barren woman, for it is possible she will bear — as written there "she married a fourth," etc.; and so too an elderly woman, as written 61:2 "he has no children and marries," etc.; and so too a minor, as written in chapter 2 of Niddah "those who play in minority," etc.; and bet din compels because of nullification of peru u-revu, as written at end of chapter haMedir as above — even if he married, etc. there. And it is stated in Tosefta chapter 8 of Yevamot: forbidden to remain without a wife; and forbidden to marry a barren woman, a minor, an aylonit, and one unfit to bear — and as written in chapter haBa al Yevimto regarding aylonit; and the same applies to these.`,

  "3#ו": `**Provided, etc.** — for in this Rav agrees; and so all the above does not apply.`,

  "5#א": `**And that is when he is not, etc.** Kiddushin there: "and if he cannot without," etc.; and Shmuel and Rabbi Yosi argue on the first part of the baraita, as written there "the law is — one who marries," etc. — i.e. not like the baraita; and Rabbi Yosi upholds the baraita — apparently the baraita speaks where his Torah study would be interrupted if he marries; nevertheless if he cannot without a woman, etc. — apparently he must interrupt his study in such a case.`,

  "5#ב": `**Or the female, etc.** Yerushalmi; and see Maggid Mishnah in BeHag.`,

  "6#א": `**In what case, etc.** There: "son for son," etc. — for all require two, etc.; and since it says "son for daughter" it implies specifically that they come one male and one female; and the plain sense of the sugya implies even when both one's sons are males; and according to Rava even when both are females; and see Tosafot there s.v. vekhol sheken, etc. — but one must strain that this is what it says: "all the more son for daughter and the son of the elder survives," and so "daughter for son and the daughter survives"; but it is difficult to distinguish between one's own son or his son; and also Rambam did not mention it (and the main text of Rambam). Rava said to him: we require shevet yetzera — and we do not emend; and there is, and they argue — why did Abaye say "all the more son for daughter"? For the reason of the mishnah is that there should be male and female in the world — and this is shevet yetzera for the tanna of the mishnah; and the main text of Rambam is according to Abaye; but "son for daughter" and "daughter for son" — Rava did not say to him we require shevet yetzera — and there is.`,

  "6#ב": `**But if, etc.** There.`,

  "6#ג": `**The son was, etc.** Yerushalmi chapter 2 of the mishnah: "and his son" — on lekhatchilah even for peru u-revu; and all the more for "from him shall your seed be called," for they are included in "one who has a son." Nevertheless the Gemara does not require citing this from a generality, for this is not an extension; and as written "except from the maidservant," etc.`,

  "8#א": `**Even though, etc., and it is necessary, etc.** There: "he has no one," etc.; practical difference to sell, etc. — from what is said "how much," etc.; is it not so — there is no distinction? Tosafot there s.v. nafka mina; and further Or Zarua, etc.`,

  "8#ג": `**However, if, etc.** There: "he is not," and the Sages said to Rabbi Shimon: marry, etc.`,

  "8#ד": `**He shall marry, etc.** — for without a woman it is forbidden to remain, as Ran wrote there; and as written "one who marries a woman" — who is not capable of bearing children.`,

  "8#ה": `**And so if, etc.** As written mishnah 4:1 Ketubot 101b: "it teaches that they marry him off," etc. — apparently even a Torah mitzvah is overridden because of quarrel, as written there 21:1: "chalitzah in place of yibbum," etc.; and we rule that we rule like Rabbi Levi, as written in Menachot and several places; and we also rule "if they acquired they acquired"; and all the more in this case where it is only rabbinic, as Rif and Rosh wrote there until "that of Rabbi Yehoshua"; and this matter is rabbinic — but regarding Torah law, since he has male and female, etc.`,

  "8#ו": `**But forbidden, etc.** — to commit a transgression for this, as written that Rabbi Levi said "even though," etc.; and there "he is not called a man," etc. "go to one like you" — for apparently this is superfluous in their words.`,

  "9#א": `**And he, etc.** There; and there mishnah 4:1 — we leave him, etc.`,

  "9#ב": `**And in a place, etc.** — like a donkey that becomes a camel in chapter af-al-pi; and this is Ritva's words in the first chapter of Kiddushin 7a, where we stated there "this is what he says: if I wish," etc.; and although without this condition we stated "a man may marry several," etc. — in a place where the custom is to marry two, with intent of the custom she is married to him and it is as if they stipulated thus; therefore she stipulates with him, etc. — see there.`,

  "10#א": `**But regarding a yevamah, etc.** — for in a place of mitzvah he did not enact.`,

  "10#ב": `**And so regarding betrothed — if, etc.** — for he is not obligated to consummate with her, as written in Ketubot 109a: "or consummate," etc.; and this is what is meant "if, etc. — but," etc.; and see BeHag.`,

  "10#ג": `**However, eighteen, etc.** As written in chapter haBa al Yevimto 65:1: "he said I will go," etc.; Rabbi Ami said, etc. — apparently even in a place of mitzvah it is forbidden; and Shulhan haTahor explained "Rabbi Ami"; and even for us who rule like Rava — nevertheless because of Rabbenu Gershom's decree, for us as for them regarding Rabbi Ami; and this is what is meant "even in a place of mitzvah" — i.e. as stated above; and the same in every place where there is, etc.; and this is Rabbi Ami's language.`,

  "10#ד": `**And even in a place of yibbum** — for Rabbenu Gershom's decree was enacted because of quarrel; and this is so even in a place of yibbum, as above.`,

  "10#ה": `**And she must perform chalitzah** — i.e. we compel him, as written Ketubot 111b: "those who vow," etc. "during her husband's lifetime," etc. — even though she caused it, since she did not intend thus; all the more here where she did not cause it. And see Rabbi Shmelke Mintz siman 10.`,

  "10#ו": `**Nevertheless, etc.** Because of "things permitted," etc. practical difference; and this is what is meant "and some say," etc. — that for this reason we do not compel him.`,

  "10#ז": `**And there is no, etc.** As above seif 9; and in a place where they practiced, etc. — and she can protest in his hand, as written siman 46 seif 8.`,

  "10#ח": `**She grants him, etc.** As written Ketubot 118b: "one who feeds a get," etc.; and in such a case certainly it is pleasing to her not to transgress the prohibition of yichud; and as written in Ketubot 11a: "a convert minor," and they said to him, as written there regarding a slave; and the same for a kohen because of "stolen waters" — we do not say thus, as written at end of Nedarim.`,

  "11#_": `**Good, etc.** — because of quarrel as above, and agunah; and also because of what we stated in chapter haCholeitz: "one shall not marry a woman in this province," etc. — there.`,

  "13#_": `**Nevertheless, etc.** According to Bava Metzia 41a.`,
});

console.log(`siman_001 beur-hagra full patch applied (${n} blocks)`);
