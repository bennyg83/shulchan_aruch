import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const mb = "output/siman_208/mishnah-berurah/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  5,
  "ב",
  `(20) He blesses on it shehakol — for even though he ate the wheat while it was whole, its blessing is borei peri haAdamah as stated there in seif 13; here, since the wheat changed — that it was ground — it stands to be elevated and made into bread from it, and before this it left the category of fruit and it did not come in its manner of eating.`,
);
patch(
  mb,
  "mishnah-berurah",
  5,
  "ג",
  `(21) "Very fine" — meaning that this flour is not fit for eating at all when it is raw, and certainly one blesses only shehakol [because of some pleasure he has in this]; and even if it was ground only a little, etc., nevertheless its blessing is only shehakol.`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "א",
  `(22) "And to chew it" — not literally [that it must be thick], for even if it is not so thick, since it is not soft so that it is fit only for drinking, one blesses on it borei minei mezonot [Acharonim].`,
);
patch(
  mb,
  "mishnah-berurah",
  6,
  "ב",
  `(23) Shehakol — for since the water is so abundant that it is not fit for eating but only for drinking, it is not in the category of food at all and one blesses shehakol as for water. And all this applies specifically to flour whose substance is not discernible and is nullified in the abundance of water; but one who makes a dish from groats made from the five species of grain [such as those made in our country from barley and oats where each kernel is split in two] and adds much water until it is fit only for zuppa, the groats are not nullified relative to the water since they remain whole and the five species of grain are not nullified, and one must bless on the groats borei minei mezonot; and nevertheless it is possible that the water is also not nullified relative to them since their main purpose is only for drinking and not eating, and one must bless also on the water shehakol, and therefore one blesses first on the water and then on the groats [as explained from the words of Magen Avraham in this siman and in siman 205]; and Chayei Adam wrote that it is better in this case to bless shehakol on something else and thereby exempt the liquid. And all this applies specifically to the five species of grain which are not nullified; but for other species such as legume groats made with abundant water that are not fit for eating but only for zuppa, one blesses one shehakol since the groats are nullified relative to the water.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "א",
  `(24) "The one who nibbles" — meaning he ate it while raw.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ב",
  `(25) Rice — some hold it is millet/dochan and some hold the opposite [Beit Yosef and Levush], and there are those who interpret the reverse; and therefore some are stringent not to eat them when crushed except during the meal or to bless on them shehakol out of doubt; and in Lechem Chamudos he wrote that the common custom is that rice is millet/dochan, and so is proven in Birkei Yosef and Mateh Yehudah, and so I found in Ma'aseh Rav from the practices of the Gra that rice is millet and one blesses on them borei minei mezonot.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ג",
  `(26) Until it was crushed — meaning even if it was crushed somewhat through cooking; but when they are still whole one blesses borei peri haAdamah; and it is possible that even if only the rice husk was removed as in our cooking, it is also not called whole and one blesses on them borei minei mezonot [Peri Megadim]; and nevertheless if one blessed borei peri haAdamah it appears there that he has fulfilled; see there.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ד",
  `(27) Bread — and the same applies to a cooked dish.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ה",
  `(28) One blesses on it borei minei mezonot — for its bread or its dish satiates and feeds the heart like the five species of grain and is preferable to other legume species; and nevertheless its bread is not considered full bread of the five species of grain to bless haMotzi.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ו",
  `(29) Borei nefashot — for borei minei mezonot or the me'ein shalosh blessing apply only to the five species because of their importance.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ז",
  `(30) "And provided that it not be," etc. — meaning that even though for the five species of grain we hold above in seif 2 that if one mixed them with other species, even if they are the minority, we follow them; rice is not so important, and therefore if one made a dish or bread and the flour of other species are the majority, one blesses on it as for those species.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ח",
  `(31) "Alone" — the same applies if it is the majority; and [the text] mentions "alone" to teach us a novelty — that even so one does not bless a final blessing except borei nefashot.`,
);
patch(
  mb,
  "mishnah-berurah",
  7,
  "ט",
  `(32) He is the majority, etc. — and so ruled many Acharonim.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "א",
  `(33) On bread of dochan, etc. — for even though they are peri haAdamah, and through making bread it changed for the better, nevertheless since through this it left the category of fruit one cannot say borei peri haAdamah, and haMotzi one blesses only on the five species; and therefore one blesses shehakol. It is possible to say another reason: because it is not its manner of eating thus — for there is no way to make bread from this — therefore one blesses shehakol. And behold, according to this reason, in countries where their custom is to make bread from t'erkeshti and vitz, l'chatchila their blessing is borei peri haAdamah since their custom is thus [Peri Megadim]; but in responsum Chacham Tzvi siman 56 he concludes that everywhere one does not bless borei peri haAdamah, because they were not planted with this intent but rather for birds and fattened geese, and through necessity people make bread from them, and this is not their primary fruit and one does not bless on them borei peri haAdamah; see there. However, he is doubtful there whether perhaps it is in the category of rice whose blessing on bread and dish is borei minei mezonot, and therefore l'chatchila one should not eat them except during the meal.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "ב",
  `(34) And polizo — in Targum it is written panitso and it is all one, and it is a species that is more important than other legume species, and it teaches us that nevertheless one blesses on its bread shehakol like other legumes.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "ג",
  `(35) He blesses shehakol, etc. — and the same applies to a dish made from their flour, as below.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "ד",
  `(36) From other legume species — and the same applies to dochan according to what the Mechaber ruled earlier that dochan is equivalent to legumes.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "ה",
  `(37) They remained whole — not literally whole, but anything that was not completely crushed so that some of their form and appearance is still discernible — their blessing is borei peri haAdamah; and therefore what we call (ratzkin'e kasha) we bless borei peri haAdamah [Acharonim].`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "ו",
  `(38) They were completely crushed — meaning specifically that one made a dish from legume flour where it is not their manner of eating thus, or one crushed them through a perforated utensil so that they are very fine like flour (or what is made from oats that we call melech groats); but when one cooked whole legumes and crushed them in a spoon, their primary manner of eating is thus, and furthermore their substance remains intact, and one blesses borei peri haAdamah.`,
);
patch(
  mb,
  "mishnah-berurah",
  8,
  "ז",
  `(39) Or they are not, etc. — as stated in siman 205, seif 61.`,
);

const PATCH_COUNT = 20;
console.log(`ok siman 208 part7of11 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-208-part7of11.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
