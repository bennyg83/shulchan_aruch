#!/usr/bin/env node
/** Apply siman 189 mt_garbage retranslations. Run from YD_001 root. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../output/siman_189");

/** key: relPath|seif|marker */
const T = {
  "baer-heitev/part-001.txt|4|_":
    'That its onah passed. Taz wrote: although in siman 186 he ruled that a woman without a veset needs checking before tashmish, here it deals with one who already has a veset but changed now to a new veset and has not established it three times (and Nekudot HaKesef writes that this is the implication — that it applies even at the beginning of establishment; but one can say that there it deals with one who has no veset at all and each time she is presumed to see, whereas here she has a veset but it is not established).',
  "baer-heitev/part-001.txt|6|_":
    'The month. Ra\'ah wrote: not for kiddush hachodesh and our shofar blowing, but for the molad halevanah; but Shach brought several poskim that the main thing depends on beit din\'s establishment — for whatever beit din below does, they agree with them above; Shach adopts this view as primary.',
  "baer-heitev/part-001.txt|7|א":
    'In Tammuz. And then she establishes a veset in months by skipping, and needs afterward to be concerned for the 19th of Av and the 20th of Elul, and so forever. Shach.',
  "baer-heitev/part-001.txt|7|ג":
    'And to be stringent. Taz wrote: it is surprising, for even according to the first opinion there is one stringency — if she has concern for two vesetot, neither of which is uprooted except if the second becomes established, as written in seif 13 at the beginning of the hagahah; and thus according to the latter opinion here, since she established in three times a veset of skipping, automatically the concern for the second veset is uprooted and she no longer concerns for it; but according to the first opinion it is not yet established and she still concerns for both. Therefore Bach wrote that for this matter we rule like the first reasoning — in both cases to be stringent — and this is correct. And I have room to examine the Tur on this, who wrote that Rosh ruled like Shmuel that this is the first reasoning here, and in perek Shor SheNagach Dalet VaChamishah Rosh wrote on daf 8 that we establish like Rav on this — let it be unresolved.',
  "baer-heitev/part-001.txt|8|_":
    'And she is concerned. Bach wrote: likewise in three times and two months, returning chalilah also becomes an established veset — for example, she saw on the 15th of Nisan and the 16th of Iyar and the 15th of Sivan and the 16th of Tammuz and the 15th of Av and the 16th of Elul — she established her veset by skipping chalilah, and afterward is concerned for the 15th of Tishrei and the 16th of Cheshvan and the 15th of Kislev and the 16th of Tevet, and so forever. Shach wrote: here, whether for Rav or Shmuel, three times suffice, for since she saw three times on the 15th and three times on the 16th and three times on the 17th, it is as if she saw three times on equal days of the month — and not like Derishah, who wrote that for Shmuel we require that she also see on the 18th of Tammuz and afterward in the three months following on the 16th, 17th, and 18th.',
  "baer-heitev/part-001.txt|11|_":
    'Once. Shach wrote: from the words of Derishah it appears that even if she has an established veset on the 15th of the month and afterward saw on the 16th and 17th, Rav holds that she established a veset for skipping; and only if she has a veset from the 20th to the 20th and changed by skipping does Rav hold that she did not establish a veset for skipping — but this is not so, for it is explicit in the Gemara that even if she has an established veset on the 16th of the month, we rule for the 16th like the veset that preceded it; and Rashi there explained this explicitly.',
  "baer-heitev/part-001.txt|12|א":
    'From the count. Shach explained: for example, she saw at first on Rosh Chodesh Adar and afterward on Rosh Chodesh Nisan — although now she saw from month to month, if she again saw on Rosh Chodesh Sivan and Av, she established for herself a veset for alternating months, for now we see that she alternated from two months to two months. Taz explained that this means she saw on Rosh Chodesh Nisan and Rosh Chodesh Sivan and Rosh Chodesh Av — she established for herself on Rosh Chodesh an alternating pattern, so that afterward she is concerned only for Rosh Chodesh Tishrei and not for Rosh Chodesh Elul, and so forever. Here Rosh Chodesh Nisan is from the count for everyone, for in it there is also relevance of veset from the side that it is Rosh Chodesh, and it is recognizable, etc.; see there. However, if she had a veset before then — for example, she saw on Rosh Chodesh Shevat and Rosh Chodesh Adar and Rosh Chodesh Nisan, and again alternated to see on Rosh Chodesh Sivan and Rosh Chodesh Av — then the seeing of Nisan is not from the count, for since she established a veset from Rosh Chodesh to Rosh Chodesh, on Rosh Chodesh Nisan she did not place an alternation upon it but rather an equal veset.',
  "baer-heitev/part-001.txt|13|ב":
    'She is concerned. Bach disagrees with Rav and holds that if she saw on Rosh Chodesh Iyar, she is no longer concerned for the 9th of it; and likewise Shach at length upholds his words in Nekudot HaKesef; see there. But Taz agreed with Rav\'s view that even if she saw on Rosh Chodesh she must be concerned for all the concerns, and concluded the matter clearly — Moshe is true and his Torah is true, and his words here are widespread halachah in Israel; see there.',
  "baer-heitev/part-001.txt|13|ד":
    'The 17th. Because of the veset of skipping she need not be concerned as above; and there is also no veset of interval, for Nisan is full and Iyar is deficient — thus the 16th of Iyar is an interval of 32 from the 15th of Nisan, and the 17th of Sivan is an interval of 31 from the 16th of Iyar; therefore she is also not concerned for the 18th of Tammuz, for it is not an interval of 31 but of 32 from the 17th of Sivan, and she must be concerned for the last interval, which is 31.',
  "baer-heitev/part-001.txt|14|ג":
    'To its place. Rosh wrote: even though three times she did not see on the 20th day (that is, twice she saw on the 30th day and the third time she saw after the 30th and again returned to see on the 20th day — so explained Nekudot HaKesef), the 20th day is not uprooted, since she did not see on the 30th day — for if a woman skips a veset once, twice, and three times and does not see in the interim at another time, and returns to see at the time of the veset, the veset is not uprooted. Nevertheless, he wrote that the Tur holds that it is not specifically when she did not see on the thirtieth the third time, but even if it has not yet arrived — nevertheless, whenever she returned and saw on the 20th, she returned to the first establishment and is not concerned for the 30th; and even though it is not yet uprooted by her not seeing on it, nevertheless this that she saw on the 20th, which is the day of the first establishment, counts for her as uprooting of two seeings of the 30th; and this law is unresolved, for it does not appear so in the Gemara — so concluded Shach. And Taz wrote to resolve that there is a difference between days of the month, which the Gemara deals with, but the Mechaber deals with an interval of days from the 30th day to the 20th day; therefore he wrote "after she changed once or twice," etc.; see there at length.',
  "baer-heitev/part-001.txt|15|ד":
    'The veset. Taz wrote: and it is difficult for me — since here it deals with an interval of days, as written above, how can you find here that she returned to see on the day of the veset? Behold, her veset is by an interval of a total number of days — one seeing combines with another, and here she did not see for a long time and you have no seeing from which to calculate an interval, etc.; and his conclusion is that in truth what the Shulchan Aruch wrote "on the day of the veset" is without precision. And Nekudot HaKesef explained that it means she should see one seeing and afterward a second seeing on the 20th day — then the first veset returns to its place for every matter, and she need not be concerned for the veset of the month; and it has the other laws of an established veset — and all this is clear.',
  "baer-heitev/part-001.txt|17|ג":
    'She is concerned. Since it happened so three times — so too in Hagahot Maimoniyot; and it appears to me that this comes only to exclude that she need not be concerned every time she jumps when it did not happen three times; but for the veset of the month and for the interval she must be concerned even once — for example, she jumped and saw, and after 20 days returned and jumped and saw — she must be concerned for the veset of the interval; and if afterward she jumps at the end of 20, she must be concerned for it the entire onah, lest she be one who sees from the 20th to the 20th without jumping; and shall it be diminished because she jumped at first? (Behold, now too she jumped.) And further, since through jumping to a known day three times she established a veset, as below in seif 18 — therefore even once she is concerned; and proof for this from siman 187 seif 11 regarding one who saw due to tashmish, etc.; see there. And even though regarding yawning we say below that she is concerned for the veset of the month even without yawning — there it is different, since at first she saw not due to coercion — so concluded Shach.',
};

function applyFile(relPath) {
  const abs = path.join(ROOT, relPath);
  let raw = fs.readFileSync(abs, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${relPath}|${b.seif}|${b.marker}`;
    if (T[key]) {
      b.en = T[key];
      n++;
    }
  }
  if (n) {
    fs.writeFileSync(abs, blocks.map(serializeBlock).join("\n"));
    console.log(`Applied ${n} to ${relPath}`);
  }
}

for (const rel of new Set(Object.keys(T).map((k) => k.split("|")[0]))) {
  applyFile(rel);
}

console.log("Total keys:", Object.keys(T).length);
