#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");
const rel = "siman_114/mishnah-berurah/part-001.txt";

function setEnglish(slug, seif, marker, newEn) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, "utf8");
  const parts = s.split("**** OC001 SOURCE BLOCK ****");
  let found = false;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const head = "**** OC001 SOURCE BLOCK ****";
    if (
      !slugM ||
      slugM[1].trim() !== slug ||
      !seifM ||
      String(seifM[1].trim()) !== String(seif) ||
      !markerM ||
      markerM[1].trim() !== marker
    ) {
      return head + block;
    }
    found = true;
    const enTag = "**** ENGLISH ****";
    const endTag = "**** END BLOCK ****";
    const enStart = block.indexOf(enTag);
    const enEnd = block.indexOf(endTag);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel}`);
    const before = block.slice(0, enStart + enTag.length + 1);
    const after = block.slice(enEnd);
    const nl = block[enEnd - 1] === "\n" ? "" : "\n";
    return head + before + newEn + nl + after;
  });
  if (!found) throw new Error(`Block not found: ${slug} seif=${seif} marker=${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK seif=${seif} marker=${marker}`);
}

const T = [
  [1, "ג", `(3) Until the Musaf prayer—the reason one does not cease from the evening is also as stated above, so there should not be confusion between them where this one mentions and this one does not mention. But now that they cease at Musaf, everyone knows via the shaliach tzibur or shamash who announces before the Musaf prayer morid ha-tal, for the announcement of mentioning dew is a sign for them to cease mentioning rain further. And this is for the Sephardic custom who practice saying morid ha-tal instead of morid ha-geshem in summer days. But in our countries where they do not practice saying morid ha-tal in summer days, and it is impossible to announce in this language, and to announce explicitly that they should cease saying morid ha-geshem also is not proper because it appears as if refusing rain, in the manner they said one does not pray for an abundance of goodness. Therefore Rama ruled in siman 113 that the practice is not to cease mentioning rain until the Minchah prayer, for they already heard from the shaliach tzibur who ceased in the Musaf prayer. But in the Musaf prayer the entire congregation and also the shaliach tzibur mention rain in the silent prayer so there should not be confusion among the congregation. And if he erred on the Maariv of Pesach or at Shacharit and Musaf and did not mention Mashiv ha-ruach and morid ha-geshem, according to everyone he does not repeat.`],
  [2, "א", `(4) It is forbidden to mention, etc.—meaning, even the congregation praying Musaf are forbidden to mention rain if the shaliach tzibur or shamash did not announce before the prayer, as Rama explains. And likewise the shaliach tzibur also should not mention except when praying aloud, but not in the silent prayer since it was not announced before the prayer. Nevertheless, after the fact, if one said aloud in his prayer morid ha-geshem, even though it is forbidden to do so since he did not hear from the shaliach tzibur, nevertheless the hearers are permitted to mention in their prayer, for this itself is considered like an announcement—so too Chayei Adam. And it seems to me that if they did not mention rain in this prayer they need not repeat, for there are authorities who hold that announcement is not called announcement unless it was announced before the prayer or they heard from the shaliach tzibur the repetition of the prayer where he mentioned rain; and Chayei Adam also only said they are permitted to mention but not that they are obligated.`],
  [2, "ב", `(5) And some say "before," etc.—It is a textual error and it should read the explanation "before," and there is no dispute at all here.`],
  [2, "ג", `(6) Mashiv ha-ruach, etc.—See in Chayei Adam who warned not to do as the practice that they announce only Mashiv ha-ruach, for this is not called an announcement, since in some places they say Mashiv ha-ruach even in summer; rather he should finish "and morid ha-geshem."`],
  [2, "ד", `(7) Even if he is—meaning, if he is not sick all year long he is forbidden to advance his prayer before the congregation, as written in siman 90.`],
  [2, "ה", `(8) He may not advance—and even if he prays in his house he is forbidden to mention before the congregation prays. Therefore residents of settlements, when they pray without a minyan, wait on Shemini Atzeret from praying Musaf until close to the end of six hours, for certainly the congregation will not delay more than to pray Musaf, and then they pray Musaf and say Mashiv ha-ruach.`],
  [2, "ו", `(9) Even though he is—for presumably they already announced.`],
  [3, "א", `(10) Mashiv ha-ruach—meaning Mashiv ha-ruach alone and he did not mention rain.`],
  [3, "ב", `(11) We do not make him repeat—for winds and likewise dew are not withheld anyway, and its mention does not raise or lower. Nevertheless ab initio they practice in all places to say Mashiv ha-ruach in the mention during rainy days, for it then helps to dry the moisture of the earth which is excessive.`],
  [3, "ג", `(12) That one—and even if he has not yet finished the blessing, since there is no obligation at all to mention wind and dew forever.`],
  [3, "ד", `(13) They did not mention—the Mechaber refers to the Sephardic custom who practice saying morid ha-tal ab initio in summer days; nevertheless we do not make him repeat since the Sages did not obligate this.`],
  [3, "ה", `(14) And not in yemot ha-geshem—and only in the request we practice to ask also for dew, and this is because we ask that it should be for blessing, for there is dew that is not for blessing. And in summer days even in the request we do not say dew. And after the fact, if he said in summer days whether in the mention or in the request [such as if he said "grant dew" and did not mention rain], according to everyone we do not make him repeat.`],
  [3, "ו", `(15) Until Minchah—for in Musaf there is still no indication for the congregation; and see above in Mishna Berurah note 3.`],
  [3, "ז", `(16) That they heard—and if an individual delayed his prayer until the shaliach tzibur began praying Musaf and ceased mentioning rain, he should again not say Mashiv ha-ruach. And an individual dwelling in a settlement should hurry then to pray Musaf before the communities pray [Peri Megadim]. And it seems to me that if he has doubt lest they already prayed, it is better that he not say, for in this he fulfills after the fact according to everyone, as stated above at the end of note 3.`],
  [4, "א", `(17) In summer days—that is, even on the first day when cessation was on it—meaning, in the Musaf of the first day of Pesach for the Mechaber and Rama specifically at Minchah, and for the shaliach tzibur according to everyone even in Musaf at the time when he repeats the prayer aloud.`],
  [4, "ב", `(18) That one—for rains are always severe in summer days.`],
  [4, "ג", `(19) To the beginning of the blessing—and after the fact, if he did not return to the beginning of the blessing but rather to "Ata gibor" and finished his blessing, we do not make him repeat.`],
  [4, "ד", `(20) And if he finished the blessing—see in Peri Megadim who wrote that this means after he said "Baruch Atah," but Sha'arei Teshuvah and Chayei Adam wrote specifically if he finished entirely; but if he remembered after the Name he should finish "velimdeini chukecha" so it should not be in vain, and if so he is as if still standing in the middle of the blessing and returns to "Atah gibor."`],
  [4, "ה", `(21) He returns to the beginning of the prayer—and the reason is that the first three blessings are considered as one, and he need not return and say the verse "Hashem, open my lips."`],
  [4, "ו", `(22) In a place—and even if the entire country was praying and fasting for rain; and see in Biur Halacha.`],
  [4, "ז", `(23) In place of tal—that is, per the Sephardic custom of saying in summer "morid ha-tal," he said this—rain in place of tal.`],
  [4, "ח", `(24) We make him repeat—and even though regarding she'eilah it is ruled below in siman 117 seif 2 that if he asked in this manner for rain in Birkat HaShanim in summer days we do not make him repeat—mention is different, for it is praise, and there is no way to mention praise in a matter that is a curse in other places.`],
  [5, "א", `(25) The rains—even in the first prayer, and this is in the Musaf of the last Yom Tov of the festival; for us who practice announcing Mashiv ha-ruach and morid ha-geshem before Musaf.`],
  [5, "ב", `(26) The rain—even if he said Mashiv ha-ruach.`],
  [5, "ג", `(27) He mentioned tal—that is, even if he said only morid ha-tal alone; and the reason is that although it is not withheld, nevertheless it is praise to the Holy One, blessed be He, in its mention, unlike in she'eilah where one must ask about something withheld—it does not help unless he asked for rain even though he asked for tal, as below in siman 117 seif 4.`],
  [6, "א", `(28) And he began—even the word "Atah" alone; and the same applies if he began to say "Nekadesh."`],
  [6, "ב", `(29) In whatever place he remembers—for the Sages did not fix a place within the blessing, but said generally one mentions the might of rains in techiyat ha-metim; only they practiced saying before "michalkel chayim," for that is sustenance and rains are also sustenance; therefore in whatever place he remembers it suffices. And it is simple that if he remembered after he said "vene'eman attah lehachayot metim," he must return and say "vene'eman attah lehachayot metim," for we require a subject resembling the closing near the closing.`],
  [6, "ג", `(30) And even if he finished—and likewise if he remembered after he said the Name, he should finish "mechayeh hametim" and immediately say Mashiv ha-ruach and morid ha-geshem.`],
];

for (const [seif, marker, en] of T) {
  setEnglish("mishnah-berurah", seif, marker, en);
}

console.log(`Patched ${T.length} blocks in ${rel}`);
