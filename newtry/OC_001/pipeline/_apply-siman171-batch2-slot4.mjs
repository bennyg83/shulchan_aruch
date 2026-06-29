#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const files = {
  "machatzit-hashekel/part-001.txt": {
    "1:ה": `(5) It says in Shabbat daf 50 that it is forbidden to split olives, and Rashi explained to strike it on the rock to sweeten its bitterness, and it is forbidden for he destroys the liquid emerging from them; and therefore one must distinguish between wine—for sprinkling and marinade and pickling are permitted, for these differ, for a person benefits from wine he sprinkled or made marinade—unlike there where he does not benefit at all from liquids going to waste through striking; although the olive becomes sweet, it is not through loss of liquid but through striking, and therefore forbidden.`,
    "2:א": `(2) (s.k. 2) He shall not sit etc.—even if sefarim were inside, and this is when they are covered and he sits on the cover. And in Yoreh Deah etc. permitted, see there in book Nehar Shalom.`,
  },
  "magen-avraham/part-001.txt": {
    "1:_": `It says in Shabbat daf 108: soak bread in wine and place on the eye—from which we learn even something repugnant, if he does for healing it is permitted. And proven in gemara in several places that one may sprinkle ground with wine and make from it marinade and pickling and anoint body with wine even not for healing; and reason as Rambam wrote: one does not destroy food through contempt and kicking—thus implies something needed by man has no contempt and kicking. And so in Shabbat daf 53, reason is loss of food; and if so wherever he does for his need there is no loss; and therefore they take for hands with liquids if no water, as written siman 160 seif 12, see there; and with this no need for Bach's words. And one does not throw bread—even if not repugnant thereby (Bach, Beit Yosef); when one sees food placed on ground, forbidden to walk and leave them but must raise them unless place where concern for sorcery such as whole loaf (Eruvin daf 64). It says in Shabbat daf 50 forbidden to split olives even if his intent to sweeten fruit, for they become repugnant thereby; and Rif explained it speaks when he wants to take hands with it and therefore repugnant and forbidden, for he can take with thick lye; and in Yoreh Deah end siman 116 forbidden to cause food to become forbidden in benefit. In Taanit daf 20: human food one does not feed to animal—Rashi: because of contempt of food, and appears as kicking the good the Holy One blessed be He bestowed on the world.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:ז": `(7) Full etc.—but when not full permitted to lean even though he uses bread, for a person does all his needs with bread, and similarly; and likewise permitted to cover vessel with it [Tur].`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `Even per Taz—all for need permitted to destroy food, for no contempt; Magen Avraham 1. And siman 181 seif 9; and siman 160 seif 12 for netilat yadayim in wine—some permit, and this is when he has no water, for otherwise there is contempt and loss. That which Mechaber wrote one does not place on it raw meat—two reasons: repugnant, or needs rinsing because of blood; and even roasted meat on mohel forbidden for repugnant.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "3:_": `Box. Baer Heitev, and see Yoreh Deah in beit haknesset there; and also I found in beit haknesset in Eruvin daf 34 challenged Taz from Rashi Gitin daf 5 and Tosafot Chagigah daf 25, see there he wrote one who relies on Bach's view did not lose even one sitting in wagon and small chest—only they are not vessels; and all the more when chest has other things with sefarim, then chest is not batel to sefarim, similar to Rashi Berakhot daf 23a s.v. rather in sefer Torah one should be stringent, end of his words. And that which he wrote in teshuvat Ohel Yaakov I brought above in responsa siman 40, see there.`,
  },
};

const base = "output/siman_171";
let total = 0;
for (const [rel, fixes] of Object.entries(files)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) return { ...b, en: fixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(fixes).length;
}
console.log("fixed", total);
