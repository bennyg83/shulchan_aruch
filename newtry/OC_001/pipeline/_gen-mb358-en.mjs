#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const he = JSON.parse(fs.readFileSync(path.join(dir, "_mishnah_berurah358-he.json"), "utf8"));

const gem = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10,
  יא: 11, יב: 12, יג: 13, יד: 14, טו: 15, טז: 16, יז: 17, יח: 18, יט: 19, כ: 20,
  כא: 21, כב: 22, כג: 23, כד: 24, כה: 25, כו: 26, כז: 27, כח: 28, כט: 29, ל: 30,
  לא: 31, לב: 32, לג: 33, לד: 34, לה: 35, לו: 36, לז: 37, לח: 38, לט: 39, מ: 40,
  מא: 41, מב: 42, מג: 43, מד: 44, מה: 45, מו: 46, מז: 47, מח: 48, מט: 49, נ: 50,
  נא: 51, נב: 52, נג: 53, נד: 54, נה: 55, נו: 56, נז: 57, נח: 58, נט: 59, ס: 60,
  סא: 61, סב: 62, סג: 63, סד: 64, סה: 65, סו: 66, סז: 67, סח: 68, סט: 69, ע: 70,
  עא: 71, עב: 72, עג: 73, עד: 74, עה: 75, עו: 76, עז: 77, עח: 78, עט: 79, פ: 80,
  פא: 81, פב: 82, פג: 83, פד: 84, פה: 85, פו: 86, פז: 87, פח: 88, פט: 89, צ: 90,
  צא: 91, צב: 92, צג: 93, צד: 94, צה: 95, צו: 96, צז: 97, צח: 98, צט: 99, ק: 100, קא: 101,
};

function noteNum(h) {
  const m = h.match(/^\(([א-ת]+)\)/);
  return m ? gem[m[1]] : null;
}

const en = {
  "1:א": `For residence — a person's residence and its utensils:`,
  "1:ב": `Such as gardens and orchards — that they surround them only to guard the fruits and seeds within them; and the same is a karpef, which is a large enclosure outside the city to bring wood there for storage:`,
  "1:ג": `And burginim — a booth of field guards:`,
  "1:ד": `That are not made, etc. — meaning, even though this sukkah is made for the guard to sit, nevertheless since their dwelling there is not for its own sake but to guard the air before them — this is not a residence considered for its own sake, and behold this is like the enclosure of gardens and orchards; and even if it is roofed with a roof it is also not considered a residence; and see Biur Halacha in siman 362 what he wrote in this:`,
  "1:ה": `The Sages forbade, etc. — for even though by Torah law every place enclosed by partitions ten high — even if it is as wide as several korim — is complete reshut ha-yachid and it is permitted to carry in all of it — nevertheless the Sages forbade in an enclosure larger than beit se'ah that was not enclosed for residence, because it is somewhat similar to reshut ha-rabbim and karmelit — not to carry in it more than four amot, like in reshut ha-rabbim and karmelit:`,
  "1:ו": `That its measure is 70, etc. — for beit se'ah is fifty by fifty — that is, in total one thousand five hundred amot in amot width; and beit se'atim is five thousand amot in amot width; and when you make from this a square field it is approximately the measure of 70 amot and 4 tefachim length by 70 amot and 4 tefachim width:`,
  "1:ז": `And 4 tefachim — and a little more like the measure of a finger approximately; and they did not care to mention it because it is small; and nevertheless one can include it in the calculation; and everything that has more than 70 amot and 4 tefachim — that small amount is permitted to carry; and see in Kitzur Shulchan Aruch that he wrote that according to our amot which are large it is 53 by 53:`,
  "1:ח": `Permitted to carry in all of it — and the Sages relied on this measure on the measure of the Tabernacle courtyard that was beit se'ah in all of it and they carried in it:`,
  "1:ט": `Whether it is square — and the rule in this is that everything that does not have more than five thousand in broken pieces we do not care whether the place is round or square or other shapes, as below:`,
  "1:י": `Or long and narrow — such as when it was one hundred long and fifty wide, which comes to a square of 70 and 4 tefachim:`,
  "1:כ": `And provided its length not be, etc. — that is, that in any case its length not be more than one hundred amot, for every large area — even in length alone — is exchanged for reshut ha-rabbim and karmelit; and in one hundred amot they did not want to decree, because we find in the Tabernacle courtyard that its length was one hundred and its width fifty:`,
  "1:ל": `One amah — but in less than an amah they did not decree; and all this specifically if there was at least beit se'atim in total; but if in total there is not beit se'ah — we are not strict in this; and even if its length was much more than one hundred amot — also permitted to carry in all of it, as long as it is enclosed by partitions:`,
  "1:מ": `If enclosed — meaning where there is a wall around the city; and it is explained there that from stam we say it was enclosed for residence, for there is no way to enclose except after the houses were built first and it is built, and at the end enclosed — which helps, as below:`,
  "1:נ": `That ordinary karpefim, etc. — meaning, and the doorway of the house is open to them:`,
  "1:ס": `That are customary — the intent of the Rama in a place where a person does not remember whether the karpefim were built before the houses or after the houses and for residence use; and in this he wrote that most of our karpefim were enclosed after building the houses for the uses of the houses; and it is a simple matter that this is not a universal rule in every place; and nevertheless one should look at this in our time according to the custom of the places:`,
  "1:ע": `Adjacent to his house — and everything that is adjacent to the city is called adjacent to his house according to this view:`,
  "1:פ": `His mind is on it — and it is simple that even according to this view specifically when he built the house and afterward enclosed; and it teaches us that even though he did not open to it — nevertheless since it is adjacent to the city his mind is on it to use it constantly, and presumably it was enclosed for residence:`,
  "1:צ": `And there is disagreement in this — and according to this view even adjacent literally to his house — as long as he did not open and afterward enclose — it does not help; and the later authorities agreed to rule like this view:`,
  "2:א": `And afterward they enclosed — this refers also to "and he built a residence house in it" at the beginning; and meaning that whether he built a house in that place and afterward enclosed that place and the house is in the middle, or whether he built a house adjacent to that place and opened a doorway for it and afterward enclosed — in all of these it is considered enclosed for residence, for they enclosed for residence use; but where they enclosed first and afterward built a house in it, or even he built first and afterward enclosed behind the house but there was no doorway in the house to go out from there to the enclosed place — it is called enclosed not for residence, for it is proven he did not make it for constant use of the house. And know that if he thought explicitly at the time he enclosed this place that he would build a house in it afterward and this karpef would be like a courtyard, or on Shabbat he built first and afterward enclosed at the end of the house and thought at the time of the enclosure that he would afterward open a doorway in the house to that side so that he could use the enclosure for the needs of the house — it is possible to be lenient and say it is called enclosed for residence, for behold he enclosed it for residence:`,
  "2:ב": `And if it was enclosed, etc. — and he wants to enclose it for residence, as should be read; and so is in the Mechaber in Olas Shabbat and so in the Tur; and the intent is that he wants to use this enclosure now permanently, except it does not help, for we require that the partitions be made for this:`,
  "2:ג": `He should breach in it — and he need not breach the entire height of the wall down; rather as long as there does not remain ten tefachim in height it suffices, for less than ten tefachim in height is not called a partition:`,
  "2:ד": `More than ten — and if it was already breached ten it suffices that he breach a little more:`,
  "2:ה": `And the house is found open — for since he breached so much all the partitions were nullified, and even what still stands is as if it were removed:`,
  "2:ו": `And he should return and fence — for the intent of residence:`,
  "2:ז": `The entire breach — and the same if he makes tzurat ha-petach, for then it is no longer a breach:`,
  "2:ח": `Or the extra amah — and if he did not breach an amah but only a little, he needs to fence that little and it suffices:`,
  "2:ט": `Until he completes — to more than ten, as should be read:`,
  "2:י": `Permitted — and we do not say that since he did not breach ten at once and did not fence at once it is not enclosure for residence; rather since now in any case there is the novelty of enclosure of more than ten — it is considered enclosure for residence:`,
  "2:כ": `Some say that he can, etc. — and he deals when the wall is less than twenty tefachim in height, for in a wall of twenty or more this remedy does not help, as will be explained below:`,
  "2:ל": `From two sides — in order that the partition be nullified, for there is treading of feet from the ground of the karpef to outside the karpef:`,
  "2:מ": `Until it is reduced, etc. — and it is like a breach in this place; and if so he can now build a residence house there or open a doorway from his residence if there was not already open to the karpef; and afterward when he clears the earth it is like enclosing after opening first:`,
  "2:נ": `Width — it should read width of four; and the reason is that in less than four it is not fit to stand on and linger:`,
  "2:ס": `In the length of the wall — it should read in a length of more than ten; for then it is not considered a doorway but a breach, as above:`,
  "2:ע": `And if not in height — meaning that all this remedy is only when the entire height of the wall is less than twenty tefachim; for then he can make a mound on two of its sides in a height of less than ten tefachim, for in such a measure it is still possible to tread and walk on it; and from now one must consider the height of the wall only from the mound upward, for the mound is considered like the ground of the karpef; and since there did not remain in the wall from the end of the mound upward ten tefachim — it is a wall as breached from two sides, for there are not ten in it neither from outside nor from inside:`,
  "2:פ": `And even if he returns, etc. — the language is confused, for necessarily he must take it in order that the partitions return to their place [for otherwise it is forbidden to carry in it even in less than beit se'atim]; and see in Avodat HaRav in the name of Meleveshei Yom Tov that he wrote it should read "and even though he returns," etc. — meaning: and even though he returns and takes the earth so that the partitions are revealed anew for residence — nevertheless we do not say because of this that the earth was never nullified at all because his intent was to return and clear them, since in any case he nullified them for one Shabbat:`,
  "2:צ": `Since they nullified there one Shabbat — that is, with intent [the Gra in his explanation]:`,
  "2:ק": `For earth is not nullification — meaning in such a manner that his intent is to clear it:`,
  "2:ר": `Unless he is not going to — and he must nullify it explicitly forever; and see in the later authorities that their view is to rule like the first reason to be lenient; and see in Biur Halacha that the Gra disagrees on the essence of this law; and according to what is explained in seif 6 there is a device that he need not breach the wall — that is, he should make a partition that is nineteen high in a length of more than ten amot and distant from it three tefachim; however all this also helps only while the partition stands, but not after it fell — it returns to its prohibition, for the first wall was not enclosed for residence, as below seif 14:`,
  "3:א": `A mound ten high — tefachim; and even if it is not upright in great height, but every place that ten tefachim accumulate within four amot — it is a complete partition:`,
  "3:ב": `Its law is like a karpef — for up to two se'ah it is permitted to carry in all of it, for it is as if enclosed by partitions; and in more than two se'ah it is forbidden to carry, for it is a partition made by itself and not enclosed for residence:`,
  "4:א": `To reduce its air — that its area not be more than two se'ah and it will be permitted to carry in it:`,
  "4:ב": `It is not a reduction — for it is customary to do so in karpefim to enjoy them and sit under them in shade; and it is impossible to reduce and permit except with things that are not the way of karpefim in this:`,
  "4:ג": `Even if there is in them ten high, etc. — for they divide a domain for themselves everywhere and become reshut ha-yachid — nevertheless it does not reduce, since it is from the uses of the karpef:`,
  "4:ד": `To dig in it a pit — of water, and even ten tefachim deep and four wide; and even though the place of its hollow is not a place of walking — nevertheless it is measured in the measure of two se'ah, for it is also from the uses of the karpef, like trees; and likewise if he made a pit in a garden — also it does not reduce, for the use of the garden is to water it; and something else that is not needed for the garden — reduces it; and it is simple that a movable object never reduces:`,
  "5:א": `A pillar — whether in the middle or adjacent to the walls of the karpef:`,
  "5:ב": `Three tefachim wide — and ten high:`,
  "5:ג": `It is a reduction — but in less than ten and three wide it is not considered and is as if it is not:`,
  "6:א": `In length — more than ten, as should be read; and he deals when its height was also ten:`,
  "6:ב": `Before a partition — inside the karpef:`,
  "6:ג": `That it should be as if it is not — and it is as if he breached in the old partition this entire length, that all the partitions are nullified because of this breach, as above in seif 2:`,
  "6:ד": `And it will be enclosed for residence — and he deals when he opened a doorway for it before he built the new partition:`,
  "6:ה": `Three tefachim — permitted — for it is a new enclosure for residence; but if he brought the new wall within three to the old wall — it does not help, for then it is not considered a new wall but like adding in building to the first wall for residence, which does not help; and all this when the karpef was not reduced from the measure of more than beit se'atim by the new wall; but if the karpef was reduced from its measure — certainly permitted even if he brought it within three tefachim, for even smearing clay on the wall helps, as explained in seif 7:`,
  "7:א": `To reduce its air — that its area not be more than beit se'atim and it will be permitted to carry in it:`,
  "7:ב": `It is a reduction — and even if he smeared only on one of the walls of the karpef, and even in part of it suffices; and nevertheless it appears there should at least be a height of smearing of ten from the ground upward and a width of three; and if not — it is not considered, like that of a pillar in seif 5; and see in Biur Halacha:`,
  "7:ג": `It is not a reduction — for it is like as if it is not; and there are those who disagree on this that everything that can stand with the wall reduces; and one may be lenient in a time of need; and all this if the measure was reduced through this from inside; but if the measure was not reduced — certainly forbidden; and even if he intended this smearing for residence, even if he made it so thick that it can stand independently — for it is like a partition on a partition, as explained in seif 6:`,
  "8:א": `It does not help — for it does not help the karpef at all, for behold without this it is already enclosed:`,
  "8:ב": `And if the lower ones were swallowed — that the earth was soft and yielding and the wall was beaten until there did not remain in it ten tefachim in height:`,
  "8:ג": `Permitted through them — for behold they were made for residence from their beginning, except they could not permit until now because they were not for the purpose; but now that without them there are not ten in height — the old partition properly helps the karpef:`,
  "8:ד": `And he made partitions — to dwell and use on the mound:`,
  "8:ה": `Even on its edge — meaning, it goes without saying if he distanced from the edge of the mound three tefachim — certainly it helps, as explained in seif 6:`,
  "8:ו": `It helps — and even though without these partitions behold there is in the height of the mound ten and more and behold it is enclosed by itself — nevertheless permitted, for since he does not dwell below in the valley but on the mound in height above — behold on the contrary only upper partitions help him and lower ones do not help him at all, as he concludes "for behold he dwells," etc.:`,
  "8:ז": `In the air of partitions — and we do not require that he make several partitions; rather since he built one partition for residence it suffices, and the other three partitions are considered through the mound itself that is ten tefachim high, as above in seif 39; and even that partition we do not require that he make it along the entire width of the mound, but since he made it in a length of ten and a little more for residence it suffices, as above in seif 16:`,
  "9:א": `And he planted most of it — the same is all of it:`,
  "9:ב": `Rows upon rows — but mixed:`,
  "9:ג": `They do not nullify the residence — for people are accustomed to plant trees in courtyards in order to take shade under them:`,
  "9:ד": `Seeds nullify the residence — for in seeds people do not dwell and it becomes a garden, and it is forbidden to carry even in what is not sown, for it is nullified to its majority and is like all seed:`,
  "9:ה": `Even if there is not in them, etc. — meaning in the area of the place of sowing; and beit se'ah does not require enclosure for residence — nevertheless forbidden, for since the minority is nullified to the majority it is as if all of it was sown, and in all of it there is more than beit se'atim:`,
  "9:ו": `Except two se'ah — and the same is less, since they are the majority; and together with the minority there is more than beit se'atim:`,
  "9:ז": `Minority was sown — it appears the same is half and half:`,
  "9:ח": `If there is not in it — meaning in the sown place:`,
  "9:ט": `Permitted — for the minority has no power to nullify the majority that was enclosed for residence; and the minority itself is also permitted, for if relative to itself the partitions enclosed for residence were nullified — it is nothing, for beit se'atim does not require enclosure for residence:`,
  "9:י": `More than two se'ah — forbidden to carry in all of it, for the minority is forbidden since there is in it more than beit se'atim — it is not permitted without enclosure for residence; and seeds nullify a partition of residence; and the majority of the karpef is also forbidden because it is open and breached to the seeds, which is a forbidden place:`,
  "10:א": `One who has a garden, etc. — even though all this was already explained in the previous seif regarding a karpef — nevertheless the Mechaber returned and repeated this law regarding a courtyard to teach us that just as seeds nullify partitions of a karpef that were enclosed for residence — so too they nullify partitions of a courtyard; and we do not say a courtyard is more important and is not nullified because of seeds; and he further added to explain in this seif regarding carrying from the courtyard to the house, as we will explain:`,
  "10:ב": `Even if there is not in it — meaning in the entire courtyard:`,
  "10:ג": `Except beit se'atim — and the same is less:`,
  "10:ד": `He should not carry, etc. — for in the courtyard itself certainly permitted to carry in all of it, even in the place of the seeds, for even though seeds nullify partitions of residence — in this that there is in it only two se'ah — behold we do not require enclosure for residence:`,
  "10:ה": `From it and from the courtyard — for since enclosure of residence was nullified — behold the entire courtyard is like an ordinary karpef that it is forbidden to carry from it to the house, and likewise from the house into it; and even in a karpef less than beit se'atim, and even if they belong to one person:`,
  "10:ו": `And if it is more, etc. — meaning the entire courtyard:`,
  "10:ז": `Except four amot — like the law of karmelit, since in all of it there is more than beit se'atim and the majority of the seeds nullified residence from the courtyard, as above in seif 69:`,
  "10:ח": `What there is, etc. — meaning if there is in the sown place:`,
  "10:ט": `It forbids the entire courtyard — even though the courtyard is a majority relative to the garden and residence was not nullified from it because of the seeds — nevertheless in any case enclosure of residence was nullified relative to the seeds themselves, and it is forbidden to carry there since they are more than beit se'atim; and because of this it is also forbidden in the rest of the courtyard, for it is breached to the place of the seeds which is a forbidden place:`,
  "10:י": `Forbidden to take out, etc. — for in the place of the seeds itself it is permitted to carry, as we wrote in seif 69; except that in any case it is forbidden to take out from it to the house, like the law of a karpef not enclosed for residence that one does not carry from it to the house:`,
  "10:כ": `From it — and it is implied from this that in any case part of the courtyard is permitted to carry to the house even when there is the measure of beit se'atim, like the law of every courtyard from which one takes out to the house; and there are those who forbid in this to take out even from courtyard to house, for even though in courtyard and garden it is permitted to carry — nevertheless regarding house utensils the garden is called the forbidden place, for behold it is forbidden to take out from it to the house, and automatically the courtyard is also forbidden regarding this because it is breached and open to the garden. And when the seeds are less than beit se'ah — certainly one should not be stringent to carry from the courtyard to the house; and there are those who are lenient in such a case to carry even from the part of the garden itself to the house, and the same from house to garden; and one may rely on this in a place of need. And everything mentioned here is when there is no partition between the courtyard and the place of the seeds; and if there is a partition — one part is not related to the other at all; and if so the part of the courtyard — its law is like a courtyard and permitted to carry in all of it and from it to the house; and the sown place is judged independently; and if the sown part is more than beit se'atim — its law is like karmelit and forbidden to carry even within it, and all the more to take out from it to the courtyard or the reverse, for the courtyard — its law is complete reshut ha-yachid; and if it is only beit se'ah or less — permitted to carry in all of it and likewise from it to the courtyard and from courtyard to it; except house utensils that rested in the house — forbidden to take out from the courtyard to the garden; end — it is fit not to eat or drink in the garden on Shabbat, for it is impossible to be careful in this; and all the more if it is more than beit se'ah that it is forbidden in carrying more than four amot:`,
  "11:א": `And water entered into it — and he deals when the water collected and stands within the karpef:`,
  "11:ב": `If fit for drinking — meaning for a person to drink; and there are those who are lenient even when fit for laundry and the like:`,
  "11:ג": `They do not nullify the residence — for there is no residence superior to this:`,
  "11:ד": `More than two se'ah — and we do not say that such a large pit is not customary to make, for it is common that a person makes a large pool of water for his use; and it is explained in the Tur that it is not specifically more than two se'ah but even if the entire courtyard was filled — also permitted:`,
  "11:ה": `And if they are not fit for drinking — and for the other reason above — specifically when they are not fit neither for drinking nor for laundry, such as when they were very murky:`,
  "11:ו": `Their law is like seeds — it is implied from this language that it is exactly like seeds; and therefore if they spread in its majority — all of it is forbidden even if there are not two se'ah in them; and if in its minority — if there is in them more than beit se'ah — all of it is forbidden, as above with seeds; and the later authorities wrote that all this is specifically when there is not ten deep at its edge and also ten does not accumulate within four amot of walking; but if ten deep at its edge or at least ten accumulates within four amot of walking — the walls of the water themselves become a partition between the place of the water and the rest of the courtyard, and only the place of the water itself is forbidden; and see in Biur Halacha:`,
  "11:ז": `And it is that their depth is ten — for less than ten is like mere mud and mire that do not divide a domain for themselves:`,
  "12:א": `Permitted — for peh ha-tekarah descends and closes, and it is as if a partition separates between the se'ah that is roofed and beit se'atim that is not roofed, and there is found only beit se'atim:`,
  "12:ב": `And even if the roofing is sloped — like our roofs whose mouth is diagonal; and it teaches us that also in such a peh ha-tekarah it descends and closes; and even though below in siman 361 seif 2 the Mechaber ruled in stam that where the mouth of the roofing is sloped we do not say peh ha-tekarah descends and closes — the later authorities divided that here it is different, for by Torah law it is complete reshut ha-yachid according to all, for behold it is enclosed by four partitions, except the Sages decreed in a karpef more than beit se'atim; and therefore they were lenient in peh ha-tekarah even though its mouth is sloped; not so there where a partition was breached — we do not say it descends and closes unless its mouth is even:`,
  "13:א": `Narrow — and it was not enclosed for residence:`,
  "13:ב": `That they breached fully one to the other, etc. — the language is confused, for in truth if both breached fully — the courtyard is also forbidden, for it is open and breached to the karpef that was forbidden; rather he deals when the courtyard was wider than the karpef and remnants remained from the sides; end — the courtyard is permitted, for it did not breach fully to the karpef; and also he deals when the breach of the courtyard was not more than ten amot, for in more than ten even if remnants remained — both are forbidden, for it is no longer called a doorway but a breach:`,
  "13:ג": `That the place of the partition adds to it — for the air of the courtyard does not make it more than beit se'atim because it is permitted air; only the place where the partition was that is not included in the courtyard joined now with the karpef and makes it more than beit se'atim:`,
  "13:ד": `And it became more than two se'ah — and he deals when the walls of the karpef enter inside the space of the courtyard from inside, or the walls of the courtyard on this side and that side were extra beyond the width of the karpef four amot; and if not — this is not called fully breached:`,
  "14:א": `And he opened in it a doorway, etc. — the language is somewhat confused; and in the source of the matter it is explained more — that he attached three walls at the end of his house wall and his house wall was the fourth wall and in it he made a doorway; and this is what the Mechaber wrote "and he opened in it a doorway" — except he did not open the doorway until after the enclosure of the walls, which does not help as explained above; and therefore he made in the karpef a new partition — for now the enclosure is after the opening; and it is explained there further that also in the new partition he made a doorway so that he could go and use inside the karpef; and so is also the intent of the Mechaber:`,
  "14:ב": `And he made a partition before it — inside; and he distanced at least three tefachim from the wall of the house, as above in seif 6:`,
  "14:ג": `More than ten — and like the view of the Mechaber in seif 6 that it helps in this measure; and see there what we wrote in Biur Halacha:`,
  "14:ד": `And afterward it fell — and the same if he knocked it down by hand in order to rely on the first partition — also does not help:`,
  "14:ה": `Returns to its prohibition — and we do not say that since the karpef was permitted once it does not return to its prohibition. The poskim wrote that if one side of the karpef is a wall of a house and there was opening and afterward enclosure and the wall fell — even though inner walls of the house remained in the house and they close the karpef — nevertheless the karpef is forbidden, for behold the inner partitions to the inner rooms were made and not to be made as a wall for the karpef; and it is not comparable to outer partitions that were made for this and for that:`,
};

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

const lines = ["export const t = {"];
for (const [k, h] of Object.entries(he)) {
  let t = en[k];
  if (!t) throw new Error(`missing translation for ${k}`);
  const n = noteNum(h);
  if (n && !t.startsWith(`(${n})`)) {
    t = t.replace(/^\([א-ת]+\)\s*/, "");
    t = `(${n}) ${t}`;
  }
  lines.push(`  ${JSON.stringify(k)}: \`${esc(t)}\`,`);
}
lines.push("};");
lines.push("");
fs.writeFileSync(path.join(dir, "mb358-en.mjs"), lines.join("\n"), "utf8");
console.log("wrote mb358-en.mjs", Object.keys(he).length, "entries");
