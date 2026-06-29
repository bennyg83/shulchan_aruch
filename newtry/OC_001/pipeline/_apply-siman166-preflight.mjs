#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_166/baer-heitev/part-001.txt": {
    "1:א":
      "To be careful. He wrote in Zohar, Parashat Beshalach, that one should pray before netilah for his sustenance; and if he forgot to pray until after netilah, it is permitted to interrupt for this. And the world is accustomed to say Mizmor leDavid Hashem ro'i between netilah and hamotzi. Magen Avraham.",
  },
  "output/siman_166/beer-hagolah/part-001.txt": {
    "1:ב": "Tur from Rif, chapter 6 of Berachot (and in my view it is also in the Bavli, daf 22b).",
  },
  "output/siman_166/beur-hagra/part-001.txt": {
    "1:ב":
      "And some say, etc.—as is clear in Yerushalmi, chapter 1 of Berachot: three immediacies, etc.; R' Yosei bar Avin: whoever presses semichah to slaughtering, no disqualification affects that offering; and whoever presses netilah to berachah, the Satan does not prosecute at that meal, etc.; and if with mayim acharonim, what was was; and the gemara is arranged in Berachot 52b, and Tosafot there, s.v. immediately, etc.; and see what I wrote in Rashi, siman 179, and Rabbenu Tam's answer that only these derived from verses in Yerushalmi are counted; and the first version holds that Yerushalmi too is with mayim acharonim, and Rashi means the Satan does not prosecute at that meal; and so Tosafot in Sotah 39a, s.v. all Yerushalmi is with mayim acharonim; and that in chapter 8 of Berachot is explained as Tosafot wrote in Pesachim 106b, s.v. times, etc.",
    "1:ג":
      "And if he delayed, etc.—Tosafot in Sotah, s.v. all, from gemara in Zevachim 33a, and Rashi there, s.v. from afar, etc.; and Magen Avraham questioned per the settled view there that it comes like Rabbi—if so, even if he stood at the entrance, behold there are not twenty-two amot; and it seems that certainly l'chatchila the immediacy applies even to one step (one step is an interruption), but regarding causing delay Tosafot explained; and Tosafot learned from what is written, what does he hold, etc.; therefore he asked after establishing it like R' Yosef bar Yakar specifically; and see Hagahot Maimoniyot there; nevertheless for the law, Magen Avraham's words are correct.",
  },
  "output/siman_166/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] The measure of walking twenty-two, etc.—meaning: even without speech, and with speech it is an interruption, even a little, even in words of Torah; and so is implied in Magen Avraham at the beginning of siman 179, and not as he himself wrote at the end of siman 165; and so agreed Bach and Taz. Perishah wrote that Tosafot were not precise except that one should not say the measure of twenty-two is not an interruption—we learn that this in any case is an interruption; but less than this one could also say it is an interruption; he also proved this at length from chapter Kol HaPesulin, daf 33, and Rambam, chapter 3 and chapter 5 of Laws of Avodah. With this is resolved Magen Avraham's difficulty; see there. However, from Rashal and his supporters that I brought in the previous siman it is clear that even the measure of walking twenty-two amot is permitted since he does not speak and does not do an act; and so is implied in Taz. What Taz and Acharonim elaborated from sugya in chapter Elu Devarim—see there—they did not examine Berachot Avraham, daf 197. However, b'dieved it is implied one need not return and wash even when walking twenty-two amot, provided he did not divert his attention; and so is implied in Keneset HaGedolah and Olat Tamid. It is written in Hilkhot Maharam: as one must say on Shabbat eve with darkening, vesartem, etc., so one must say before netilat yadayim, if everything is ready for kiddush and hamotzi, so he need not interrupt—until here. Shelah wrote, daf 85: it is good and proper to say Mizmor leDavid Hashem ro'i, etc., immediately after eating hamotzi, because it speaks of trust in Hashem for sustenance and other matters all the days of his life and after his death, that he not go to Gehinnom.",
  },
  "output/siman_166/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] Some say one need not be careful, etc., and some say one must be careful, etc. That which some say one need not and some say one must is because in Berachot, daf 42a, it states: immediately to netilah berachah; and Rashi and Tosafot there explain it refers to mayim acharonim; see there. And similarly explain it Rambam, chapter 6 of Laws of Berachot, and Rabbenu Yoel, and Beit Din, Tur, and Beit Yosef. But from Yerushalmi, chapter 6 of Berachot, it is implied that that which states immediately to netilah berachah refers to mayim rishonim—for it states there: one who presses berachah to netilah is not harmed for that entire meal. And similarly the Tur; and similarly in Hagahot Maimoniyot, chapter 7 of Berachot, and Beit Din, Beit Yosef, who wrote: and so it is proper to act—to be careful also with mayim rishonim; end of his words. And such are his words here in Shulchan Aruch. And such is the view of Rosh, Tur, and R' Yeshayah HaRishon in his rulings, siman 10, and Rama in Alfasi Zuta, chapter Keitzad Mevarchin, as Machatzit HaShekel wrote in Sha'ar HaTziyun, note (1); see there. And similarly Levush, Peri Chadash, Eliyah Rabbah, Maamar Mordechai, note (1); and see below, note (6).",
  },
  "output/siman_166/magen-avraham/part-001.txt": {
    "1:ג":
      "Twenty-two amot. Tosafot in Sotah proved thus from what we say regarding a metzora: it was not immediately to semichah and slaughtering, for he was not permitted to enter the azarah, and he would lean on the offering before the gate of Nikanor, and afterward they would bring the offering to the altar; and from the gate to the altar was twenty-two amot—we learn that this is called an interruption. And it is difficult for me: in Zevachim 33 they ask from this baraita for one who holds partial entry is not called entry—to insert his hand and lean and slaughter there at the entrance, for the settled view is like Rabbi who holds the entire azarah is valid for slaughtering; and they answer we hold like R' Yosi who forbids slaughtering except at the side of the altar. And now it is difficult: per what was settled like Rabbi, if so, even for one who holds standing at the entrance is called entry—to lean before the opening and insert and slaughter at the entrance from inside—rather, perforce when going from place to place it is considered interruption, even a small walk; and so is clear in mishnah, second chapter of Middot, in the place where they lean they slaughter—for immediately to semichah slaughtering. And it requires study; and siman 8, seif 13, and siman 181, seif 6, what he wrote that in kedei one may not interrupt at all; and it requires study in Yoreh Deah siman 19, who ruled one should bless at a distance of four amot before entering the bathhouse—for even berachah acharonah, where one may interrupt between it and eating, requires specifically in its place, as written siman 184, 106, berachah rishonah. And I examined the source of the law in Agudah, Chullin siman 9—it is implied everything is in one house; and similarly Shabbat siman 6: one who wishes to drink in the bathhouse blesses in the outer house with intent to drink in the inner, for it is like from corner to corner; see there. But Tosafot wrote in Pesachim 101a, s.v. veR' Yochanan, etc., that it is interruption—it implies even from corner to corner; and such is the main view, for it is no worse than ordinary speech; and Rama's words in Yoreh Deah require study.",
  },
  "output/siman_166/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) That one need not be careful, etc.—for what we say in the Talmud [Berachot 51a], immediately to netilah of a meal—we hold this means he should not occupy himself in the meantime with any business or act until he diverts his attention, or with much conversation that leads to diversion of attention [even if in words of Torah]; but if he sits idle and does not do any act in the meantime, even if he waits a long time, or even speaks a little, there is no concern, since the table is set before him and his mind is to eat immediately—he does not divert his attention.",
    "1:ה":
      "(5) The measure of walking twenty-two amot—for at this measure it is called interruption even when sitting in his place [and if he goes from his house to another house, some are stringent even for a small walk]; and it is implied from Acharonim that without need one should not wait at all in the meantime, but rather bless hamotzi immediately after drying.",
  },
  "output/siman_166/peri-megadim/part-001.txt": {
    "1:_":
      "(11)—Taz (and similarly Beer HaGolah (2) from Berachot 22b, etc.), and Taz's answer: that which they said in Berachot 42a—three immediacies: immediately to semichah slaughtering, immediately to redemption prayer, immediately to netilah berachah—with mayim acharonim (for he said the halacha is not like all these teachings; see there in Rashi); and even when sitting, any time it is twenty-two amot it is interruption—unlike between netilah and hamotzi, which is specifically an act and business (or speech is forbidden, as written in siman 165 that Rosh was careful not to speak, also not to interrupt more than twenty-two amot—Magen Avraham (4) there); and siman 179 in Taz and Magen Avraham (1). And it is possible twenty-two amot is certainly forbidden during hamotzi, for it is not immediately; see there. And in the gloss on Shulchan Aruch it is copied siman 174, seif 7 in Magen Avraham there, note 14, that he holds it is forbidden to interrupt between netilah and hamotzi; and here he wrote only good (for more would have been concern for the lenient view before netilah, not exempt)—but there it is different, for interrupting with business and speech is interruption, and here it deals with silence.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
