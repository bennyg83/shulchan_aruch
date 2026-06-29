#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "mechaber/part-001.txt": {
    "1:main": `Bread exempts the parperet. And in it one seif: If one blessed on bread, it exempts the parperet, meaning very fine bread crumbs (1) that stuck with soup or honey (2). If one blessed on the parperet, it does not exempt the bread (3). {Rama: If one blessed on the parperet it exempts maaseh kedeirah such as porridge and the like, and similarly if one blessed on maaseh kedeirah it exempts the parperet (Gemara chapter Keitzad Mevarkhin, and Rambam in his commentary on the Mishnah).}`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Blessings, Mishnah Berurah.`,
    "1:ב": `R' Yonah.`,
    "1:ג": `As stated in the Gemara.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `Siman 1, that is, etc. See Tosafot there s.v. birkh, etc., and it appears per Rabbenu Chananel, etc.; Terumat Hadeshen contradicts the explanations; see Rosh siman 10, not like Rabbenu Chananel but it is habitzah there, as written siman 168 s.y. Beit Yosef.`,
    "1:ב": `s.v. birkh, incident, etc. Gemara there: Rabbi Dimi on the end, etc., and halacha is like the first tanna, and the same applies in reverse, as we wrote.`,
  },
  "baer-heitev/part-001.txt": {
    "1:_": `Fine. And they do not have the quality of bread to require blessing borei minei mezonot, and bread exempts them for they come to continue appetite for the food. Bach; see siman 168 seif 8 and seif 13 that even if they do not come to continue, bread exempts them since they themselves are food. Magen Avraham.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `(1) [Levush] did not draw him, etc. Meleches Yom Tov wrote per his words in siman 177 seif 2 he should have written in Tur's language that parperet after the meal before birkat hamazon does not exempt, until here. In my humble opinion he wrote per our custom that we do not bless even at large meals as explained below siman 177; indeed per what I wrote below that the fearful and meticulous should be careful to bless—the same applies here; and so say above siman 174 s.k. 4.`,
  },
  "magen-avraham/part-001.txt": {
    "1:_": `Bread crumbs. For they do not have the quality of bread to require blessing borei minei mezonot, and bread exempts them for they come to continue appetite for the food (Bach); and siman 168 seif 8 and seif 13 that even if they do not come to continue, bread exempts them since they themselves are food; see siman 174 seif 7.`,
  },
  "turei-zahav/part-001.txt": {
    "1:_": `That stuck with, etc. For then his blessing is borei minei mezonot like maaseh kedeirah.`,
  },
  "levushei-serad/part-001.txt": {
    "1:_": `Shulchan Aruch: what stuck with soup is habitzah explained in siman 168 s.y. that one blesses borei minei mezonot if it has no bread quality, see there.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:א": `(1) Very fine—that they do not have a kezayit and also lost bread quality so their blessing is borei minei mezonot as explained in siman 168 s.y.; nevertheless bread exempts them because they are secondary to it and are considered like maaseh kedeirah which bread exempts.`,
    "1:ב": `(2) If one blessed on the parperet—for it is customary to bring them before the meal for pleasure or to stimulate appetite for eating, and it does not exempt bread since their blessing is borei minei mezonot. Shitah Mekubetzet wrote even if he explicitly intended to exempt it does not help. Regarding birkat acharonah: if he ate them only for pleasure or to satisfy slightly, he must bless borei minei mezonot before the meal; if he did not bless until he blessed birkat hamazon, b'dieved birkat hamazon exempts all kinds of foods as we wrote below siman 208 s.y. 17 in Mishna Berurah, see there; some say if his intent is to eat kinds of mezonot also within the meal it is considered one eating and he may even l'chatchila rely on birkat hamazon at the end; nevertheless it appears even per this view he should explicitly intend in birkat hamazon to exempt what he ate before (see Even HaEzer siman 208 s.y. 17). See in Biur Halacha where we explained regarding what we eat after kiddush in the morning—eggs and cakes and the like—it is more correct that even per the first view he should not bless birkat acharonah before the meal but they are exempted by birkat hamazon; and all the more if he eats pat haba'ah b'kisanin also within the meal, and with blessing borei minei mezonot before the meal he exempts them too—per all views all are exempted by birkat hamazon because all this pertains to the meal. Incidentally I will cite from later poskim several laws pertaining to this matter. Until here we wrote regarding eating kinds of mezonot before the meal; now we explain eating other things. (a) One who wants to eat before netilat yadayim for the meal things that require blessing within the meal, such as fruits, and intends to eat fruits also within the meal and now intends with this blessing to exempt also what he will eat within the meal—then all is for the meal's sake and he need not bless after them for birkat hamazon will exempt all as it exempts what one eats within the meal; if he will not eat fruits within the meal he must bless borei pri ha'etzah on them, for since he ate them before the meal they do not pertain to the meal at all; and even if he did not bless borei pri ha'etzah before netilat yadayim he must bless within the meal. (b) All this when eating fruits as above; but if he ate before the meal things that need no blessing when eaten within the meal [such as types of relish and vegetables called arad per Yeshu'ot Yaakov, or bulbes, and the like]—then even if he intends to eat them also within the meal the first blessing does not help them at all for in any case they are exempted by birkat hamotzi, and therefore what he eats before the meal does not pertain to the meal at all and he must bless on them birkat acharonah borei nefashot. Regarding wine and other beverages it is explained in siman 174 seifim 6–7. (c) But if he ate before netilah parperet to stimulate appetite and open the intestines [such as types of sweets called ein gimatz or something salty, and the like]—he does not bless birkat acharonah on them for they pertain to the meal and are exempted by birkat hamazon. (d) Know that the permission to eat before hamotzi things needing no blessing within the meal as explained in seif 2 applies only when he does not intend to eat immediately; but if the table is set and bread before him, it is forbidden to cause an unnecessary blessing—rather he should bless hamotzi on bread and it will exempt the rest (Chayei Adam); some say if he prefers eating them before the meal more than within the meal, there is no issue of causing an unnecessary blessing. If they are things that draw the heart to appetite for food, certainly one may rely to be lenient to eat them before the meal.`,
    "1:ג": `(3) Exempts maaseh kedeirah—for their blessing is also borei minei mezonot.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `That stuck. Taz deduced presumably they have no bread quality like ground matzah stuck in honey that one blesses borei minei mezonot—Magen Avraham 1. If not that I fear the authors and all the more my teachers, I would forbid habitzah of bread crumbs by soup, and all the more knaidlach and charimzelach explained in siman 168 seif 10; Magen Avraham 28: although one blesses on them the equivalent of three, if he blessed hamazon he fulfilled b'dieved as in siman 208 s.y. regarding wine and dates that one fulfills with hamazon; Magen Avraham 25: porridge has another superiority in bread, unlike habitzah where bread is primary. Magen Avraham 176 note 5. Again I saw I acted well that I fear Tosafot Berakhot 41a s.v. birkh on bread—from their wording things after the meal require blessing before and after, even if they explained parperet as dry bread crumbs in a bowl; and this will be explained in 177 in Magen Avraham 6 and Rabbenu Chananel on this.`,
  },
  "biur-halacha/part-001.txt": {
    "1:_": `If one blessed on the parperet—see in Mishna Berurah what we wrote regarding birkat acharonah; all this applies also to pat haba'ah b'kisanin whose blessing is borei minei mezonot as explained in siman 168—must bless borei minei mezonot before the meal; per some views if he had mezonot within the meal he may l'chatchila rely on birkat hamazon after the meal, and also then at birkat hamazon he should explicitly intend to exempt them as above (and if he intends to eat pat haba'ah b'kisanin also within the meal, by law he should bless on pat haba'ah b'kisanin borei minei mezonot even within the meal as explained above in siman 168; but since he blesses before the meal he exempts from the first blessing also what he eats of them within the meal—then certainly birkat hamazon exempts all of them even per the first view, as we hold regarding wine in siman 299 s. 8, see there). However regarding our practice to eat eggs and cakes and the like on Shabbat morning after kiddush—requires study in practice how to conduct, for although seemingly all are pat haba'ah b'kisanin as explained above in siman 168, in truth we give them only the law of pat haba'ah b'kisanin out of doubt, as explained in the Mechaber's language there s. 7, namely because doubt in blessings is to be lenient; therefore we bless only the equivalent of three, unlike in our case if they are full bread they are certainly exempted by birkat hamazon alone and need not bless the equivalent of three—then certainly it is more correct that even if he has none of this within the meal, and even per the first view, he should not bless on them the equivalent of three but rely on birkat hamazon he will bless at the end, for b'dieved he fulfills per all views even on full pat haba'ah b'kisanin, as explained in Chiddushei R' Akiva Eiger siman 208 s.y. 17, see there (and although initially he blessed on them borei minei mezonot there is no concern, as explained there in seif 6 regarding if initially he intended to eat only a little and afterward ate a kevi'ut, see there); and good that he intend at birkat hamazon to exempt them—see there in Even HaOzer. And although in Chayei Adam general 41 I saw he wrote that even when eating eggs before the meal one must bless borei pri ha'etzah—it is not clear, as above.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] that is, bread crumbs, etc.—that they do not have a kezayit and also no bread quality so their blessing is borei minei mezonot as written in siman 168 seif 10, see there. The reason bread exempts them: Bach wrote because they come to continue appetite for the food; but Magen Avraham s.k. 1 wrote that even if they do not come to continue, bread exempts them since they themselves are food, see there.`,
  },
};

const base = "output/siman_176";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total, "blocks");
