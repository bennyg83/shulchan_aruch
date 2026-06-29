#!/usr/bin/env node
/** EH001 siman 002 — beer-hagolah editorial (21 blocks — source references). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_002/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#_": `Statement of Rav Nachman bar Chisda, Kiddushin 81a, per Rashi there.`,
  "2#א": `Rambam's words, chapter 19 Issurei Bi'ah, from statement of R' Yehuda, etc., according to the Sages there 76b.`,
  "2#ב": `Statement of R' Yehuda, etc., and Ribbi Levi, etc., 81b — and they say there an aspersion of disqualification is in one of them and they do not let her associate with her friend.`,
  "2#ג": `From statement of Rav — silence in Babylonia means lineage — and other amoraim there.`,
  "2#ד": `Baraita and statement of Shmuel there 81a.`,
  "2#ה": `From what is stated in Yevamot 78b regarding Gibeonites — three signs are in this nation: merciful, bashful, performers of kindness.`,
  "3#א": `There — mishnah Kiddushin 76a, and as R' Chiya bar Gurya said, etc., there 76b.`,
  "3#ב": `From what they say: no objection with fewer than two — Ketubot 56a, and in several places, per his explanation that they testify explicitly.`,
  "3#ג": `There — mishnah of Kiddushin, and in explanation of what we learned "one who marries a kohenet."`,
  "3#ד": `There in the name of Rav.`,
  "4#א": `Baraita Ketubot 14b, and Tanna Kamma.`,
  "4#ב": `Our teacher learned this from the law that they called objection against him.`,
  "5#א": `Mishnah chapter 8 of Eduyot, and per Rabban Gamliel there, as established in Ketubot 14a — almanat Issah is like two doubts.`,
  "5#ב": `From mishnah "one who marries a kohenet," per explanation — and I cited it above seif 4.`,
  "5#ג": `It is straightforward that mamzer is forbidden to enter the congregation and chalal is forbidden to kehunah — all are chalalim and they are equal.`,
  "6#_": `Tur's words from baraitot Pesachim 49b.`,
  "8#א": `Rambam's words chapter 21 Issurei Bi'ah from statement of Rava, Yevamot 64b.`,
  "8#ב": `Statement of amoraim Pesachim 49a.`,
  "9#_": `From what they said: they marry him off with advice suitable for him — mishnah Yevamot 106b; and from what they expound "do not profane your daughter to harlotry" — Sanhedrin 76b.`,
  "10#_": `Baraita Yevamot 37b.`,
  "11#_": `Baraita there.`,
});

console.log("siman_002 beer-hagolah editorial patch applied");
