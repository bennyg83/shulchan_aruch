#!/usr/bin/env node
/** EH001 siman 001 — beer-hagolah full editorial (source citations). */
import { patchFile } from "./_patch-siman-utils.mjs";

const n = patchFile("siman_001/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Baraita, Yevamot 63b.`,
  "1#ב": `Baraita there, 64a.`,
  "1#ג": `Statements of the amoraim there, 63b.`,
  "2#_": `Statement of Rabbi Yochanan, etc., Megillah 27a.`,
  "3#א": `Mishnah at end of chapter 5 of Avot; and Rambam in ch. 15 of Hilchot Ishut wrote from age 17; and Hagahot Maimoniyot wrote there in explanation of the mishnah that age 18 when entering the category of 18.`,
  "3#ב": `Baraita there 62b; Sanhedrin 76b; statement of Rav Chisda, Kiddushin 29b.`,
  "3#ג": `As Rambam's words in ch. 21 of Hilchot Ishut 1:1 from statement of Rav Yehuda, etc., there in Sanhedrin; and from what we say: a minor — the Sages did not enact marriage for him — Yevamot 112b — it appears to him that his intercourse is intercourse of prostitution.`,
  "3#ד": `Statement of Rav Huna; and Tanna of the school of Rabbi Yishmael, Kiddushin 29b.`,
  "3#ה": `Tur citing his father the Rosh there in Yevamot.`,
  "3#ו": `Rambam's wording in ch. 15 of Hilchot Ishut from baraita and statement of Rabbi Yochanan there in Kiddushin.`,
  "4#א": `There, from incident of ben Azzai, Yevamot 63b.`,
  "4#ב": `From this that sinful thoughts are harder than sin, Yoma 29a.`,
  "5#א": `Mishnah Yevamot 61b, Beit Hillel.`,
  "5#ב": `There in baraita; and the same for aylonit; and both are explained in Yerushalmi.`,
  "6#א": `Gemara's conclusion there, 62b.`,
  "6#ב": `This too is explained there in the sugya.`,
  "7#א": `As Rabbi Yochanan there, 61a.`,
  "7#ב": `In Rambam's explanation that regarding sons — according to him Rabbi Yochanan does not say it suffices for him.`,
  "7#ג": `Statement of Rav there; and he explains there: because a slave has no lineage, being like a donkey.`,
  "8#א": `Statement of Rav Nachman, etc., there 61b.`,
  "8#ב": `Baraita there, 62b.`,
  "8#ג": `Gemara's establishment in the latter wording there, 61b.`,
  "8#ד": `Tur from words of his father the Rosh there, for the version that they teach the mishnah not according to Rabbi Yehoshua; and so too Tosafot Chiddushei HaRitva.`,
  "9#א": `Statement of Rava there, 65a.`,
  "9#ב": `Gemara's conclusion there, 61a.`,
  "9#ג": `Tur, and it is straightforward.`,
  "10#א": `Nekudot HaKesef citing Ritva.`,
  "10#ב": `Mahari Cologne in responsum root 101; and he wrote there the reason: who will compel us to write her a ketubah against her will and obligate ourselves to her in the rest — for this Rabbenu Gershom did not enact; and they permit only with consent of 100 rabbis, as Maharam wrote at end of his responsa and as the Bach also wrote.`,
  "10#ד": `In responsum of Maharik there.`,
  "13#_": `Mishnah Yevamot 65b; and Tosafot Kiddushin.`,
});

console.log(`done (${n} blocks patched)`);
