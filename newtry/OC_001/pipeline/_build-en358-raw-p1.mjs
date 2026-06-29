import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const dir = path.dirname(fileURLToPath(import.meta.url));

export const p1 = {
  "baer-heitev:1:א": `Beit se'ah — for then it is called karmelit; but if it is beit se'ah it is called karpef and it is one domain with the courtyard for objects that rested within it, and not for objects that rested inside the house, as written siman 372:`,
  "baer-heitev:1:ב": `And narrow — such as if it is one hundred amot long and fifty amot wide, which amounts to the square of seventy amot:`,
  "baer-heitev:1:ג": `One amah — like the courtyard of the Tabernacle that was one hundred amot long and fifty wide; but less than one amah is permitted. Magen Avraham:`,
  "baer-heitev:1:ד": `Adjacent to his house — that is, within two thousand amot that he can walk in it; and the same if there is a watchmen's booth where one dwells day and night, or a dwelling house even if one does not dwell there permanently (Hagahot Maimoniyot); and see Magen Avraham:`,
  "baer-heitev:2:א": `Dwelling house — before it was enclosed; see Magen Avraham:`,
  "baer-heitev:2:ב": `Ten — for if there are ten in height it is permitted in any case, as written seif 66 if he distanced three tefachim:`,
  "baer-heitev:4:_": `Reduction — because it is customary to plant trees in it; and the same for a pit, for the use of a garden is to water it; and see Beit Yosef, for it is implied that something else not needed for the garden does reduce it:`,
  "baer-heitev:9:א": `Beit se'ah — and the same for less, for the minority is nullified to the majority and it is as if all was sown and forbidden; see Magen Avraham and Taz; and in responsa of Chacham Tzvi siman 59 and siman 57; and see Yad Aharon:`,
  "baer-heitev:9:ב": `Forbidden — for it is like karmelit, as written siman 372 seif 2; and what was not sown is like a courtyard breached fully into a forbidden place, for there is no partition between them, and it is as if breached fully to the forbidden place:`,
  "baer-heitev:10:א": `Garden — meaning there is no fence between the courtyard and the garden; and if there is a fence between them, the difference is this: in the garden itself, if the garden is more than beit se'ah it is forbidden to move objects from the courtyard into it in every case; and if it is beit se'ah or less it is permitted to move objects within it entirely and from the courtyard into it for objects that rested in the courtyard, but not for objects that rested in the house; therefore it is fitting not to eat or drink in the garden on Shabbat, for one cannot be careful in this; and Rama already mentioned siman 336 seif 3 for another reason; and even to move knives or a key on one's belt from courtyard to garden is forbidden, for they are objects that rested in the house, and here enclosure for dwelling does not apply, for seeds cancel the dwelling, and many err in this. Taz:`,
  "baer-heitev:10:ב": `To the house — lest seeds cancel the dwelling of the courtyard and it is all karpef, and even of one person it is forbidden to move objects to the house (Beit Yosef, Ritva); the garden and courtyard combine (Beit Yosef, Mordechai):`,
  "baer-heitev:10:ג": `The courtyard — for it is like karmelit and a courtyard breached fully:`,
  "baer-heitev:10:ד": `From it — it implies; but from the courtyard to the house is permitted even though the courtyard is forbidden in itself — it does not forbid the courtyard to forbid it for the house, and we do not say it is breached fully to the forbidden place except where forbidden on its own; but Tur wrote forbidden to remove from it to the house, that also from the courtyard is forbidden; and Magen Avraham wrote; however, if the garden is less than beit se'ah it is permitted to move objects from garden to house, for it is nullified to the courtyard which is not considered independently — see there:`,
  "baer-heitev:11:_": `Tefachim — for less than ten tefachim it is like mud and mire that do not divide a domain for themselves; and see Magen Avraham:`,
  "baer-heitev:13:_": `The karpef — and it deals when the courtyard has projections and breached less than ten, for otherwise even the courtyard is forbidden, for it is breached fully (Hagahot Ashiri); and see siman 370:`,

  "beer-hagolah:1:א": `Mishnah Eruvin 22, and Rabbi Eliezer there`,
  "beer-hagolah:1:ב": `In the Mishnah, and Rabbi Yosi`,
  "beer-hagolah:1:ג": `There`,
  "beer-hagolah:1:ד": `There in the Mishnah`,
  "beer-hagolah:2:א": `There`,
  "beer-hagolah:2:ב": `In the Gemara 24, and Rav Nachman there in the name of Shmuel`,
  "beer-hagolah:2:ג": `There, Rabbi Yonatan`,
  "beer-hagolah:2:ד": `There in the Gemara 24, the question and resolution`,
  "beer-hagolah:3:_": `From the implication of the Gemara from that of Rav Chisda there 35`,
  "beer-hagolah:4:_": `Plain`,
  "beer-hagolah:5:_": `There in the Gemara`,
  "beer-hagolah:6:_": `There, in the first version, and Rava`,
  "beer-hagolah:7:_": `There 25, and Rava, Raavad, and Razah`,
  "beer-hagolah:8:א": `There, and Rabbi Sheshet; Rosh and Rambam chapter 66`,
  "beer-hagolah:8:ב": `There, a question and resolution`,
  "beer-hagolah:9:א": `There 14, Rabbi Nachman; and so Rosh; and so appears from Rambam chapter 15`,
  "beer-hagolah:9:ב": `There, in the latter version leniently; Rosh and Rambam chapter 15`,
  "beer-hagolah:10:_": `Tur, according to Rambam`,
  "beer-hagolah:11:א": `There, Rava`,
  "beer-hagolah:11:ב": `There, Ameimar`,
  "beer-hagolah:11:ג": `There in Rashi's explanation`,
  "beer-hagolah:12:א": `There 25, Rava, and Rambam's version chapter 15, and as Rosh wrote according to Or Zarua`,
  "beer-hagolah:12:ב": `There, the version "arzila," and Rashi's explanation`,
  "beer-hagolah:13:_": `There, and Rashi's explanation`,
  "beer-hagolah:14:_": `There, that incident of the orchard, per Rabeinu Chananel's explanation`,

  "turei-zahav:1:א": `If it is more than beit se'ah — for then it is called karmelit; but if it is beit se'ah it is called karpef and it is one domain with the courtyard for objects that rested within them, and not for objects that rested inside the house, as written siman 372:`,
  "turei-zahav:1:ב": `Provided its length is not more than twice its width — like the courtyard of the Tabernacle that was one hundred amot long and fifty wide:`,
  "turei-zahav:4:_": `It is not a reduction — for thus is the way of a karpef to have trees in it:`,
  "turei-zahav:9:_": `If there is only beit se'ah in it, permitted — since without dwelling it is permitted by itself, so too here it is permitted; and even though a place of sowing is called karpef and what is not sown is like a courtyard breached to each other without a partition between them — nevertheless they did not forbid each other, since it is one person, for we rule like Rabbi Shimon who said courtyard and karpef do not forbid each other regarding objects that rested in the courtyard, but not for objects that rested inside the house — end of Rashi; and it appears there is a textual error and it should read: even though not one person, etc. — see Rashi there; and it is implied that in a minority sown, at least the sown place is forbidden, for there is no dwelling upon it; but in more than beit se'ah it is like karmelit and there is no permission from courtyard to karmelit in any view; and it is clear from Tur's words that beit se'ah and less than beit se'ah are the same; therefore what Shulchan Aruch wrote here "even if there is only beit se'ah" means the same for less than beit se'ah:`,
  "turei-zahav:10:א": `One who has a garden, etc. — meaning there is no fence between the courtyard and the garden; and if there is a fence between them, the difference is: in the garden itself, if the garden is more than beit se'ah it is forbidden to move objects from the courtyard into it in every case; and if it is beit se'ah or less it is permitted to move objects within it entirely and from the courtyard into it for objects that rested in the courtyard, but not for objects that rested in the house; therefore it is fitting not to eat or drink in the garden on Shabbat, for one cannot be careful in this; and Rama already mentioned this siman 336 for another reason; and even to move knives or a key on one's belt from courtyard to garden is forbidden, for they are objects that rested in the house, and here enclosure for dwelling does not apply, for seeds cancel the dwelling, and many err in this:`,
  "turei-zahav:10:ב": `Forbidden to remove from it to the house — it implies; but from courtyard to house is permitted even though the garden forbids it in itself — from it to house — nevertheless it does not forbid the courtyard to forbid it for the house, and we do not say it is breached fully to the forbidden place except where forbidden on its own:`,
  "turei-zahav:12:_": `Tur wrote: even if the roofing is slanted we consider it as if a partition, etc. — see there siman 361:`,

  "eshel-avraham:10:_": `To the house — and even though Beit Yosef has many proofs for this law from great poskim — see there; nevertheless Shevut Yaakov concluded in Sefer Tuv Taam that one who wishes to combine these leniencies in eruvin, which is rabbinic, certainly should not protest; and such is the practice of poskim who are lenient to rely on them in time of need — see there:`,

  "shaarei-teshuvah:8:_": `Beit se'ah (Ba'er Hetev); and see responsa of Chacham Tzvi siman 59; his view: if planted in beds row by row, since in combination of beds the majority is sown, the minority not sown is nullified to it, for majority is d'oraisa whether from another place or two places; but if the sown is a minority and if all the sown were combined it would be more than beit se'ah, but there is not beit se'ah in one place — even if there are not three tefachim between them — there is room to be lenient, for we do not say lavud, for the boundary between bed and bed for walking is level; therefore we do not say lavud; and see what he wrote on the words of Devar Shmuel siman 259:`,

  "netiv-chayim:1:_": `(Magen Avraham s.k. 4.) And it appears to me that Tosafos also did not write thus; it is not so, for if so for Rabbi Yehuda too we could say this, for he requires only a pit, ditch, and cave, and Rabbi Yehuda permitted only in what was enclosed for dwelling, as the Mishnah teaches at the chapter's start; but watchman's booth and dwelling house do not help. Also per Magen Avraham's words it would not be for Rabbi Yehuda to be terse but to explain; and so I found in Agudah explaining that per Tosafos watchman's booth and dwelling house do not help — see there:`,

  "yad-ephraim:1:_": `In Shulchan Aruch seif 9 "more than beit se'ah forbidden" — here one must note what Magen Avraham wrote s.k. 18 "more than beit se'ah":`,
  "yad-ephraim:2:_": `In Taz s.k. 7 "and even though the courtyard is breached to the garden" — it should read thus, meaning: since the garden itself is not forbidden with the courtyard and it is permitted to move objects between them, even though from garden to house is forbidden — nevertheless it does not forbid the courtyard to forbid it for the house; and see below siman 373 in Taz there; however there it is explained further — see there:`,
  "yad-ephraim:3:_": `In Magen Avraham s.k. 11 "more than beit se'ah forbidden" — this is a reference to below "more than beit se'ah forbidden":`,
  "yad-ephraim:4:_": `(There s.k. 14) Forbidden to remove from it to the house — meaning in Shulchan Aruch it wrote "from it" with hei at the end, referring to the garden; unlike Tur, which has "from it" with vav, implying from the courtyard:`,
};

const existing = fs.existsSync(path.join(dir, "_en358-small-raw.json"))
  ? JSON.parse(fs.readFileSync(path.join(dir, "_en358-small-raw.json"), "utf8"))
  : {};
fs.writeFileSync(path.join(dir, "_en358-small-raw.json"), JSON.stringify({ ...existing, ...p1 }, null, 2));
console.log("p1", Object.keys(p1).length, "total", Object.keys({ ...existing, ...p1 }).length);
