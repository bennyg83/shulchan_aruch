#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fp = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../output/siman_135/machatzit-hashekel/part-001.txt"
);

const fixes = {
  "1:א": `(Magen Avraham.) It appears in the Rif, etc.: Moshe enacted for Israel that they read Torah on Shabbatot, festivals, Rosh Chodesh, and Chol HaMoed, as it is said, "And Moshe spoke," etc. Ezra enacted for Israel that they read three [aliyot] in the Torah on Monday, Thursday, and Shabbat at Minchah — end of his words. And it requires investigation, for in Megillah it is as he wrote; and Magen Avraham questioned why he wrote that Ezra enacted the reading on Monday and Thursday. And in Megillah it appears that Monday and Thursday were enacted by the prophets in the days of Moshe, and Ezra added Shabbat at Minchah.`,
  "1:ב": `And Tosafos, etc.: they say Rabbi holds Kerias Shema must be recited in the holy tongue, as it is written, "and they shall be" — in their being they shall be; and the Gemara concludes that therefore Rabbi holds the entire Torah was stated in any language, for if only in the holy tongue, "and they shall be" would not be needed for Kerias Shema — is Kerias Shema inferior to the whole Torah? And Rashi explained "in any language was stated" — to read in the Torah; and Tosafos wrote it is not clear, for Ezra enacted Torah reading, and before Ezra came "and they shall be" would not have been needed — end of his words. And Bach challenged: how did he write Ezra enacted, when prophets in the days of Moshe enacted it? And the essence of their difficulty, etc.: if so it does not apply, etc., to exclude the words of Bach siman 285, that it is impossible that in the days of Moshe they enacted it, for it would have been d'oraisa and the verse "and they shall be" would have been required. And his words are astonishing, for they say prophets stood and enacted — behold it is only an enactment and not d'oraisa.`,
  "1:ג": `From where are the readers? As stated in the Gemara: also in Megillah he said Ezra's enactment was to read on Monday and Thursday and Shabbat at Minchah; and it challenges: but Monday and Thursday are from the enactment of the prophets in the days of Moshe; and it answers: initially they enacted one person three verses, etc.; Ezra came and enacted three people and ten verses, etc.`,
  "1:ד": `If so, from where did Moshe enact, etc.? Meaning the Rif considers Moshe's enactment and Ezra's enactment as comparable; and just as for Ezra it means from where are the readers, so too for Moshe's enactment.`,
  "2:_": `(Note 2) Permitted, etc. — and people do not practice thus. For the reason Taz wrote: for a groom it is a festival; nevertheless for the congregation, for whom it is not a festival, it is nullification of melacha.`,
  "5:_": `(Note 5) One word, etc. — and see there siman 139 as he wrote.`,
};

const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const out = blocks.map((b) => {
  const key = `${b.seif}:${b.marker}`;
  return fixes[key] ? { ...b, en: fixes[key] } : b;
});
fs.writeFileSync(fp, out.map(serializeBlock).join("\n\n") + "\n", "utf8");
console.log("fixed", Object.keys(fixes).length, "blocks");
