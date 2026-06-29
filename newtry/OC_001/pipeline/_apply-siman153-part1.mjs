#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_153/beur-hagra/part-001.txt": {
    "21:ב": "Forbidden, etc. — as is written in Temurah 30: that even beaten sheets are forbidden.",
    "21:ג":
      "And specifically, etc. — as is written in the mishnah there: he gave her money, etc., and it is not called, etc.; Gemara there; and as is written in the chapter HaBa BeYad Rava that we do not hold like Rabbi Elazar; and so Rambam wrote: all who are liable for negative commandments are called zona; but specifically when the payment came through the transgression. But Tosafot do not hold thus in Temurah 30; and it implies only that whatever was already called zona — even if she was now permitted to her — and he wrote that the same applies to mufkeret; see there at length; and see Choshen Mishpat and Magen Avraham; and his words are not necessary.",
    "22:א":
      "If at the time, etc. — waiver does not require a kinyan, and even in his presence; and if he was silent, it is chazaka, as is written in chapter 173 of Bava Batra; and to seal immediately, etc., that there is no, etc.; and at the end, siman 155.",
    "22:ב":
      "But if, etc. — Tosafot in Sanhedrin 91b, s.v. halachta; and Yoma 13a, s.v. halachah; and one may say, etc.; and even Rabbi Yehudah, who argues in chapter 9 of Makkot 13a — on account of what is written in the verse.",
    "3:_":
      "A sefer Torah, etc. — for the degradation of a chumash is that one does not read in them; and the same applies to a chumash.",
    "4:א":
      "Some forbid — as is stated, 27a: they asked regarding this; one said: since, etc.; forty — in other cases, since there is another upper one, it is certainly forbidden.",
    "4:ב":
      "And some say, etc. — from that source there is no proof, for there it is l'chatchila, as the mishnah stated b'dieved, etc.; and at first glance forty — b'dieved is permitted in all of them, for the precision of the end is specifically from the answer of the tanna kamma; but \"if they sold,\" etc., and it did not challenge: say the beginning — books buy Torah, but Torah with Torah no; since books and Torah buy Torah. And what Bach and Magen Avraham wrote: Ran and Mahari a — explain that Ran deals with l'chatchila; they did not examine Ran, who wrote, and wrote in Sefer HaMeor, etc.: behold the mishnah is difficult — beginning and end, etc.; rather, since it did not benefit him, it is forbidden, etc.; and certainly from the Gemara forty holds thus: even b'dieved he holds it is forbidden; and he holds: since in the Gemara it is stated plainly \"since it did not benefit him, it is forbidden\" — learn that the precision of the end is not precise; for otherwise, from where is it forbidden; but l'chatchila it is certainly forbidden for everyone; and even regarding a sefer Torah the poskim are stringent; but b'dieved regarding a sefer Torah it is certainly permitted, as is written there in the Gemara.",
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
