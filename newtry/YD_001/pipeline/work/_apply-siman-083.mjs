#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { patchBlockFile } from "../lib/patch-one-block.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");

const TRANSLATIONS = [
  {
    file: "siman_083/beur-hagra/part-001.txt", slug: "beur-hagra", seif: "6", marker: "ג",
    en: `And there is one who, etc.—he explains from above: no difficulty here, etc., to permit the other barrels; and "two" means in two barrels; and what the gentile wrote, etc.—only in one of them, only in one of them. And so says the Rif; and therefore he omitted that of Rav and Shmuel and R' Yehuda. Ran; nevertheless see in Maggid Mishneh that the girsa in the Rif must be the opposite of what is written here, and it must read "open one," etc.`,
  },
  {
    file: "siman_083/beur-hagra/part-001.txt", slug: "beur-hagra", seif: "8", marker: "א",
    en: `(Likut) Eggs of fish, etc.—according to the view of R' Yehuda and Rashi Pesachim that signs of fish are also not d'oraita; and so wrote the gemara in Chullin there, and so too in Yerushalmi—they brought Tosafot there, d"h amar, etc.; and in Chullin there, d"h simanim, etc. But the Raavad explained according to the words of R' Tam, and likewise R' Chananel; and the Rashba wrote that so appears from Rashi in Chullin there, d"h Hag, etc.—those signs of eggs, etc., meaning specifically in eggs. And the Rashba wrote that the Rif holds that in fish eggs no sign is needed at all, for certainly they are pure—as written there "remove from here fetuses"; therefore he wrote in Chullin and Avodah Zarah thus: signs of fish innards (end quote).`,
  },
  {
    file: "siman_083/kereti/part-001.txt", slug: "kereti", seif: "1", marker: "_",
    en: `One scale—it must be in any place on the body, only that it is recognizable that it is fixed in it with strong permanence and not stuck to this one—inspection is required, unless it has many scales; in such a case we are not concerned that all of them stuck—Pri Chadash.`,
  },
  {
    file: "siman_083/kereti/part-001.txt", slug: "kereti", seif: "4", marker: "ד",
    en: `It had scales, etc.—and the Mechaber omitted this, even though it is mentioned in the gemara—for those who hold the main signs are to help recognize by the imprint of the eye that it is from pure fish; but everything depends on imprint—and see Peleti; and also the Rambam's view is thus, and I proved not like the Shach, who holds a different explanation in the Rambam—and see there at length.`,
  },
];

for (const t of TRANSLATIONS) {
  patchBlockFile(path.join(OUT, t.file), { slug: t.slug, seif: t.seif, marker: t.marker }, t.en);
  console.log("patched", t.file, t.slug, t.seif, t.marker);
}
