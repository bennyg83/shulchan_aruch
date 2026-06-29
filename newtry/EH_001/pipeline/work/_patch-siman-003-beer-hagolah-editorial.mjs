#!/usr/bin/env node
/** EH001 siman 003 — beer-hagolah editorial (17 blocks). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_003/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Rambam's words in chapter 20 of Even HaEzer from mishnah Ketubot that a person is not believed about himself.`,
  "1#ב": `From the incident of one who came before R' Yehoshua ben Levi, etc., there 25b; to this agreed Hagaon and Ran.`,
  "1#ג": `There in the words of Hagaon and Ran.`,
  "1#ד": `From the incident of Rabbi there 25b; and per Ramban's view there — the incident was when it was unknown he is his father; believed through migo that if he wanted he could say "another is my father" and would testify. Hagaon wrote: because we made all pesulei and prohibitions of kehunah upon himself as one matter — and believed about himself to be stringent.`,
  "1#ה": `From the incident of Rabbi there 26a.`,
  "2#א": `Incident of Rabbi there. (And see Bach.)`,
  "2#ב": `Tur from Gemara's implication there; and therefore not per amoraim there except for lineage; but for terumah — their words elevate.`,
  "2#ג": `Baraita there as established in Gemara there 25a.`,
  "3#_": `R' Shlomo son of Rashbatz and commentator there; not concerned lest mother gentile — all compelled witnesses are careful not to intermarry with gentiles; not concerned for minority — whoever separates separates from majority.`,
  "4#_": `Mishnah Ketubot 23b.`,
  "5#_": `There mishnah 28a.`,
  "6#_": `Rambam's language there chapter 2; Hagaon wrote this law emerged from Gemara sugya from "maaser rishon presumption for kehunah," etc., there 26a.`,
  "7#_": `There from mishnah 23b and establishment of R' Yochanan and Rav Ashi there 26a and 26b; and per Rashbi.`,
  "8#א": `There from mishnah Yevamot 100a.`,
  "8#ב": `There; Hagaon wrote it is straightforward and explained similarly in Gemara there.`,
  "9#א": `There in mishnah.`,
  "9#ב": `From Shmuel's statement there — because written "and it shall be for him and his seed after him" — we require his seed attributed after him; rabbinic decree they decreed regarding zenut.`,
});

console.log("siman_003 beer-hagolah editorial patch applied");
