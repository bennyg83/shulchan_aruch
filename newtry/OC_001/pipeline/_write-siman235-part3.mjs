import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const T = {
  "mishnah-berurah/part-001.txt|2:א":
    "(16) It is forbidden to begin, etc. — and the reason is lest he prolong his meal and sometimes through this he also fall into sleep and forget to read Shema; and even to eat a little is forbidden; nevertheless a mere taste of fruits or even bread less than a kezayit is permitted.",

  "mishnah-berurah/part-001.txt|2:ב":
    "(17) To eat — and likewise to sleep, even if his intention is only to sleep a little [Gemara]; and the same law applies that it is then forbidden to do all the labors explained above in siman 232 seif 2, which are things that lead to negligence; and all the more so when the time of Keriat Shema has arrived it is certainly forbidden to begin them [Levush and Peri Megadim in 232 and Derech HaChaim]; and R' Meir inclined to permit them before the time of Keriat Shema has arrived. However, to learn — according to all it is permitted close to it [and on the contrary it is a mitzvah, as they said in the Talmud: a person comes from the field in the evening, enters the synagogue — if he is accustomed to read he reads, to learn he learns, and reads Keriat Shema and prays]; but once the time of Keriat Shema has arrived it is forbidden even to learn when he is praying at home alone; and if he told his fellow that he is not learning so that he remind him to pray — it is permitted [achronim].",

  "mishnah-berurah/part-001.txt|2:ג":
    "(18) Half an hour — the Taz's view is to be lenient in this and he requires only a small measure; and the achronim agree with the Shulchan Aruch's ruling that whenever there is not except half an hour it is forbidden to begin eating; and if he asked someone to remind him to pray — there is no prohibition to begin eating even when the time of Keriat Shema has already arrived.",

  "mishnah-berurah/part-001.txt|2:ד":
    "(19) Close to the time of Keriat Shema — that is, close to the emergence of the stars; and it is implied from Magen Avraham that even on Motzei Shabbat one must be careful not to begin the meal then; and see in Mishna Berurah 299 seif katan 1 what he wrote on this. The achronim wrote: those who read and pray while it is still day — even though they must return and read again at the emergence of the stars, and as explained in seif 1 — nevertheless it is permitted for them to eat before reading again, for in any event they have already read; nevertheless, when the time of the emergence of the stars actually arrives it is proper to be careful also in this.",

  "mishnah-berurah/part-001.txt|2:ה":
    "(20) If he began to eat after, etc. — and also within half an hour close to the emergence of the stars it is likewise as one for whom the time has arrived.",

  "mishnah-berurah/part-001.txt|2:ו":
    "(21) He interrupts — immediately, since Keriat Shema is d'oraisa and he began in a forbidden state; and if he began in a permitted state — that is, before the half hour close to the emergence of the stars — even for Keriat Shema he does not interrupt as long as he has time to read after finishing his meal; and as explained in siman 70 in Mishna Berurah seif katan 23, 24.",

  "mishnah-berurah/part-001.txt|2:ז":
    "(22) Without its blessings — because blessings are only d'rabbanan they did not burden him to interrupt on their account.",

  "mishnah-berurah/part-001.txt|2:ח":
    "(23) But he need not, etc. — as the Mechaber wrote that he interrupts only to read Keriat Shema alone without blessings and without Shemoneh Esrei; and because they are only d'rabbanan; and this that the Rama returned and repeated it is because he wanted to finish the 'but', etc.",

  "mishnah-berurah/part-001.txt|2:ט":
    "(24) Even though he washed his hands — that is, even though there remains much time to pray they are strict with him that he interrupt. And it is not comparable to beginning close to Minchah, for in b'dieved he does not interrupt if he already washed his hands, as explained above in siman 232; for at Minchah, since its time is short, one is cautious and does not come to be negligent — which is not so at Ma'ariv, for its time b'dieved is the entire night; they decreed lest he come to be negligent and rely on the length of the night; therefore as long as he did not begin the eating itself they burden him to interrupt even though he washed his hands; and specifically when he has not yet recited netilat yadayim; but if he already recited netilat yadayim it is proper that he not interrupt but rather recite HaMotzi and eat a kezayit and interrupt his meal; and even though if he began eating he need not interrupt — here it is different because he did not begin to eat only so there not be an interruption between netilat yadayim and HaMotzi, which is not proper l'chatchila, as explained above in siman 166.",

  "mishnah-berurah/part-001.txt|2:י":
    "(25) And if there is no time — meaning whether he is standing close to dawn or even standing at the beginning of the night only that this meal will last until dawn, such as large meals in summer days when the nights are short — he must interrupt immediately at the emergence of the stars; and even if he began in a permitted state while it was still day, the law is likewise.",

  "mishnah-berurah/part-001.txt|3:א":
    "(26) Immediately at the emergence of the stars — for the diligent precede to mitzvot.",

  "mishnah-berurah/part-001.txt|3:ב":
    "(27) Until half the night — meaning the Rabbis fenced that it is forbidden to delay Keriat Shema more than midnight lest one come to stumble; and if he delays he is called one who transgresses the words of the Sages; but until midnight there is no prohibition if he delays — only that he is not called diligent, and as explained; and this is when sitting and not engaged in eating or distracting labor — but one who eats or is engaged in distracting labor like that in siman 232 seif 2 — by law it is forbidden once the time of Keriat Shema has arrived, and as explained in seif 2.",

  "mishnah-berurah/part-001.txt|3:ג":
    "(28) And if he transgressed and delayed, etc. — for from the Torah according to all its time is the entire night, for 'when you lie down' — as long as people lie down — implies.",

  "mishnah-berurah/part-001.txt|3:ד":
    "(29) Until dawn has not risen, etc. — because it deals with one who transgressed — that is, through negligence — it stated 'until dawn has not risen'; but if he was compelled, even after dawn has risen only that it is before sunrise — he also reads and fulfills, as below in seif 4.",

  "mishnah-berurah/part-001.txt|4:א":
    "(30) He does not fulfill, etc. — for even though from the Torah we read 'when you lie down' until sunrise — because there are still some people sleeping at that hour — nevertheless where he was not compelled the Sages nullified from him the mitzvah of Keriat Shema for having delayed so much and he no longer fulfills his obligation by reading it.",

  "mishnah-berurah/part-001.txt|4:ב":
    "(31) Such as one who is drunk, etc. — and even if he became drunk after the time of Keriat Shema arrived — that is, from the emergence of the stars onward — he is also not in the category of intentional, for he thinks there is still time and within that his wine will wear off; but one who became drunk a short time before dawn, for it is impossible in such a short hour to remove his drunkenness — it is not considered compelled and he does not fulfill his obligation.",

  "mishnah-berurah/part-001.txt|4:ג":
    "(32) He should not say Hashkiveinu — it is explained in the poskim that even if he wishes to skip the word Hashkiveinu and begin from 'and You fixed counsel', etc. — it is also not proper.",

  "mishnah-berurah/part-001.txt|4:ד":
    "(33) It is not the time of lying down — meaning it is not the time when people go to lie down that it would be appropriate to say Hashkiveinu on this; but nevertheless it is called the time of lying down for the matter of the positive mitzvah of Keriat Shema, for it is written therein 'when you lie down' — the intent is: all the time that people lie down, and there are still some people lying down, and as explained.",

  "mishnah-berurah/part-001.txt|4:ה":
    "(34) Until Hashkiveinu he says — and he should not say Baruch Hashem l'olam, etc.; and also he should not pray Shemoneh Esrei, for the Ma'ariv prayer was enacted only for the sake of night; and since dawn has risen it is day for every matter.",

  "yad-ephraim/part-001.txt|1:_":
    "<b>In Magen Avraham seif katan 4</b> and as written in siman 231 regarding a taste, etc.; and see siman 452 (and that which is in 492 he already hinted above).",

  "yad-ephraim/part-001.txt|2:_":
    "<b>In Taz seif katan 3</b> — why did he write that half an hour close, etc.; for even before it becomes dark it is called, etc.; so it should read.",
};

const out = `/** siman 235 slot5 translations part 3 (remaining blocks) */\nexport const TRANSLATIONS = {\n` +
  Object.entries(T).map(([k, v]) => `  ${JSON.stringify(k)}:\n    ${JSON.stringify(v)},`).join("\n\n") +
  `\n};\n`;

fs.writeFileSync(path.join(__dirname, "_siman235-translations-part3.mjs"), out, "utf8");
console.log("wrote", Object.keys(T).length, "keys to part3");
