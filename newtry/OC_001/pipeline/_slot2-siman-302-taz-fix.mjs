#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`turei-zahav:2:א`, `Because of makeh bepatish — any completion of melacha is called makeh bepatish.`],
  [
    `turei-zahav:2:ב`,
    `And when he is particular about them — meaning he does not wish to wear it except with this removed; therefore he removes intentionally the tuft; but if he removed them in the manner of business — meaning he would wear it even without this and he does not remove with intent to repair the garment but merely occupies himself — exempt. According to this, "and he is particular" is the language of the Rambam, like "and he is particular" in seif 1, which is the Tur's language; Beit Yosef divided between them needlessly.`,
  ],
  [
    `turei-zahav:6:א`,
    `Or on his shoes — in Beit Yosef in the name of Mahari Abuhav he was in doubt about a shoe, because we say one may not scrape a shoe even if old; perhaps this is not scraping, requires study; Beit Yosef himself wrote: to me it appears this "one may not scrape" is because when scraping the shoe on the back of the knife or fingernail he is memachek; but in wiping on a wall or beam or ground he is not memachek, and even if he would be memachek it is not psik reisha etc. According to this, that which is in the courtyard before synagogue doors on one iron piece sharp above where they wipe shoes before entering — forbidden to do so on Shabbat, for this is similar to the back of the knife and forbidden to all; rather wipe on wall or ground; and even though there is a dispute also in this, one may rely on the lenient in a rabbinic matter as explained.`,
  ],
  [`turei-zahav:6:ב`, `Even on a wall — for it appears like building; and in our view one may wipe only on a beam.`],
  [`turei-zahav:6:ג`, `Fit to be moved — meaning it has enough to seal the mouth of a utensil.`],
  [
    `turei-zahav:7:_`,
    `That it is tochen — it appears this is specifically when there is actual substance of mud on the garment, and when he scrapes there then crumbs of mud fall — this is similar to tochen; but if there is only the appearance of mud and he scrapes to nullify the appearance, this is not similar to tochen; for this reason there is permission for one whose cloak is slightly soiled and there is no substance of excrement and it is dry — he may scrape with a fingernail and remove the appearance to pray in cleanliness. It appears to my humble opinion that according to the Ran and Shulchan Pesak that I mentioned in siman 300 regarding squeezing, liability is only in what he cares about in what is squeezed — likewise here in tochen it is so, and here where he does not care about what is ground, there is no issue of tochen.`,
  ],
]);

const f = "output/siman_302/turei-zahav/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
const missing = blocks.map((b) => `${b.slug}:${b.seif}:${b.marker}`).filter((k) => !fixes.has(k));
console.log("Taz 302:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
