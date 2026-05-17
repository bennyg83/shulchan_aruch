/**
 * Apply pinpoint English fixes from OC318_final_human_cleanup_handoff.md
 * to data/oc318.full.json. Hebrew and structure unchanged.
 *
 * Seif 2: `Shulchan Aruch K'pshuto` is empty in JSON; handoff paragraphs for
 * K'pshuto notes 8–16 are applied to the matching `Tur` note indices (24+ and
 * the second cluster 16–23).
 *
 * One-off fixes applied directly to JSON (not replayed by this script):
 * - Biur Halacha (hard item / soaking): replaced corrupted “Bible / Mordechai” paragraph.
 * - Tur note (ס): removed repeated “the ” before “Gra” via regex.
 * - `toldos ha'or` wording for “history of fire is like fire”.
 *
 * Usage: node scripts/apply-oc318-final-human-cleanup.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const JSON_PATH = path.join(ROOT, "data", "oc318.full.json");

/** @typedef {{ seif: number, source: string, noteIndex: number | null, english: string }} Patch */

/** @type {Patch[]} */
const PATCHES = [
  {
    seif: 1,
    source: "Mechaber and Rama",
    noteIndex: null,
    english:
      "(a) One who cooks on Shabbos, or performs one of the other melachos, intentionally, is forbidden to benefit from it forever, while others may benefit from it immediately after Shabbos. If he did so unintentionally, it is forbidden that day even for others, but after Shabbos it is permitted immediately even for him. {Rama: If he told a non-Jew to perform melacha on Shabbos, see above, siman 247, seif 20.}",
  },
  {
    seif: 1,
    source: "Magen Avraham",
    noteIndex: 1,
    english:
      "(c) And unintentionally. If he acted according to the ruling of a halachic authority, it is considered unintentional. The same applies if he forgot. So writes the Knesset HaGedolah in the name of the Radbach.",
  },
  {
    seif: 1,
    source: "Biur Halacha",
    noteIndex: 0,
    english:
      "One of the other melachos: The Chayei Adam, rule 9, writes that this applies specifically where an action was done to the object itself, changing it from its previous state, such as cooking and the like. But one who carries an item from one domain to another, where the item itself was not changed, if he did so unintentionally, it is permitted even to him and even on that same day. If he did so intentionally, it is forbidden even to others until immediately after Shabbos. Nevertheless, one should be stringent with all Torah prohibitions, as with cooking. Know also that according to the Shulchan Aruch, which rules like R. Yehuda that when done unintentionally one may benefit from it after Shabbos, this applies to all melachos where the penalty imposed by Chazal is recognizable, namely that one may not benefit from it that day until after Shabbos. But with planting on Shabbos, and likewise sowing, where in any case one cannot benefit from it immediately, the unintentional case is the same as the intentional case, and in both cases one must uproot what was planted. This is explicit in Gittin 54b according to R. Yehuda.",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 0,
    english:
      "(a) Introduction to the seif. The Torah forbids performing melacha on Shabbos. One who performs melacha intentionally is liable for death or kares, and one who does so unintentionally is liable to bring a chatat. The Torah prohibition applies to the person, not to the object that was affected by the forbidden act. However, the Sages penalized one who performed melacha on Shabbos and also prohibited the item on which the melacha was performed, so that people would not treat the prohibitions of Shabbos lightly. The laws of this penalty are explained in this seif.",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 2,
    english:
      "(c) Forever — meaning that the Sages imposed their penalty upon him [regarding the item].",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 3,
    english:
      "(d) After Shabbos. Even if the forbidden act was done for others, the Sages did not prohibit the item forever except to the person who desecrated Shabbos himself. The utensils in which the food was cooked in violation of Shabbos do not become forbidden.",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 4,
    english:
      "(e) Immediately. There is no need to wait bichdei sheyeasu, meaning one does not need to wait after Shabbos for the amount of time that would have been needed to perform this melacha after Shabbos began, as the Rama explains later in the seif.",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 5,
    english:
      "(f) Immediately. This means that when the act was done unintentionally, the Sages prohibited benefit from it on Shabbos itself so that people would not treat Shabbos prohibitions lightly. However, they did not distinguish in this case between the one who acted unintentionally and others.",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 6,
    english:
      "All this applies to a Torah-level melacha. With a rabbinic prohibition, if it was violated intentionally, the result is forbidden like a Torah-level melacha. But if one violated a rabbinic prohibition unintentionally, one may benefit from it even on Shabbos itself.",
  },
  {
    seif: 1,
    source: "Shulchan Aruch K'pshuto",
    noteIndex: 7,
    english:
      "(g) Siman 307, seif 20. There it is explained that regarding the prohibition of asking a non-Jew to perform melacha, the Sages were more stringent and prohibited benefit from that Shabbos melacha until after Shabbos, after waiting bichdei sheyeasu. The reason they were more stringent with the lighter prohibition of asking a non-Jew is that they were especially concerned people might come to treat it lightly.",
  },
  // Seif 2 Tur: handoff "Tur note N" follows Tur marginal numbering; JSON order differs.
  {
    seif: 2,
    source: "Tur",
    noteIndex: 0,
    english:
      "(d) That he became ill today. Even though the animal was muktzeh because of the prohibition of slaughtering, nevertheless it is permitted, because we rule like R. Shimon that there is no muktzeh because of a prohibition unless he actively set it aside, such as a lamp that he lit for that Shabbos. This is from the Maggid Mishneh, chapter 2. One may ask: if so, something attached to the ground should also be permitted once the fruits fall off. One can answer that there the reason is lest he climb up and detach it, as stated at the beginning of Beitzah. See there, and see another reason in the Beit Yosef.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 1,
    english:
      "(e) Raw on Shabbos. This means without salting, as the Tur writes. See Yoreh Deah 67:2, that rinsing is still required. See also what I wrote in siman 325:11.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 9,
    english:
      "(f) Or for a sick person. The Rashba writes that this too follows the same reason, since with melacha performed by a Jew there is no distinction between the sick person and a healthy person for this purpose.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 11,
    english:
      "(h) On Shabbos. This excludes Motzei Shabbos. There is also no issue of bishul akum here, because since this case is uncommon, there is no concern of intermarriage.",
  },
  // Second Tur cluster (indices 16–23): same handoff texts as K'pshuto notes 9–12 and continuation; JSON order differs from Tur marginal numbers.
  {
    seif: 2,
    source: "Tur",
    noteIndex: 16,
    english:
      "(9) A healthy person is permitted, etc. The reason is that since the primary slaughtering is for the sick person, and it is impossible to obtain even an olive-sized piece of meat without slaughtering, the concern of increasing for the healthy person does not apply here.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 17,
    english:
      "(10) It may be eaten raw on Shabbos. This is without salting, since salting is forbidden on Shabbos. Rinsing is required because of visible blood, but blood absorbed within the meat is not forbidden as long as it has not separated.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 18,
    english:
      "(11) It is forbidden for the sick person. But on Motzei Shabbos it is permitted immediately, and one does not need to wait bichdei sheyeasu. Tasting whether the food is good for the sick person is permitted even on Shabbos.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 19,
    english:
      "(12) Whose life is not in danger. Such a person is considered like a healthy person for this matter, since it is forbidden by Torah law for a Jew to cook for him. Therefore, if we were to permit him to eat from it, we are concerned lest one increase for him.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 20,
    english:
      "(13) It is forbidden on Shabbos. If a non-Jew cooked for the sick person, there is no concern that the Jew will increase the amount, since the non-Jew is permitted to cook for the sick person. The prohibition of benefiting from the non-Jew’s cooking is only rabbinic. Nevertheless, the Sages did not distinguish in this case and forbade it even when the non-Jew cooked. In such a case, however, the food is permitted immediately after Shabbos.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 21,
    english:
      "(14) It is forbidden on Shabbos for a healthy person to benefit from it, but on Motzei Shabbos it is permitted immediately, because since the non-Jew cooked permissibly, one does not need to wait bichdei sheyeasu, and the Sages did not decree in this case regarding bishul akum [Gra].",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 22,
    english:
      "(15) If he was sick before Shabbos. In that case, there may have been intent before Shabbos to detach the fruit for him if needed, and therefore the issue is not exactly the same as when the illness began on Shabbos itself.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 23,
    english:
      "(16) And there is an issue of muktzeh. The later authorities ask on these words of the Rama: why should the small amount that grew on Shabbos not be nullified to the fruit itself? It appears that the case is one of vegetables that grow quickly, such as gourds, where the amount added on Shabbos is significant, and therefore the fruit is muktzeh. But if, for example, an orange was picked on Shabbos for a dangerously ill person, and the sick person ate one segment from it, a healthy person may eat the rest of the fruit.",
  },
  // Handoff "Seif 2, Shulchan Aruch K'pshuto" paragraphs — JSON has empty K'pshuto; text lives under Tur.
  {
    seif: 2,
    source: "Tur",
    noteIndex: 24,
    english:
      "(h) One who slaughters on Shabbos for a sick person. After the previous seif discussed food cooked on Shabbos in violation of Shabbos, this seif discusses food prepared on Shabbos permissibly because of pikuach nefesh, meaning for a dangerously ill person who may die if he does not eat fresh meat even on Shabbos.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 25,
    english:
      "(i) Whether he became ill that day. One might have thought that if a sick person was already present before Shabbos, we knew before Shabbos that we would need to slaughter for him the next day. But if he became ill on Shabbos, we did not know this when Shabbos began, so perhaps the meat should be muktzeh. The halacha is that an animal designated for slaughter loses its muktzeh status when it is slaughtered for a permitted need.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 26,
    english:
      "(j) To eat from it raw. Since no prohibition was done here, because it is permitted to slaughter for a dangerously ill person, and this one act of slaughter can provide meat for many people without adding any forbidden melacha.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 27,
    english:
      "(11) Another melacha. The Rama notes that the law is not limited to cooking. It applies to any melacha similar to cooking, where doing it for more than one person requires increasing the act.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 28,
    english:
      "(12) Lest he increase for him. Meaning, lest he intentionally put more into the pot than is needed for the sick person so that healthy people can also eat from the leftovers.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 29,
    english:
      "(13) It is forbidden on Shabbos. If a non-Jew cooked for the sick person, there is no concern that the Jew will increase the amount, since the non-Jew is permitted to cook for the sick person. The prohibition of benefiting from the non-Jew’s cooking is only rabbinic. Nevertheless, the Sages did not distinguish in this case and forbade it even when the non-Jew cooked. In such a case, however, the food is permitted immediately after Shabbos.",
  },
  {
    seif: 2,
    source: "Tur",
    noteIndex: 32,
    english:
      "(16) And there is an issue of muktzeh. The later authorities ask on these words of the Rama: why should the small amount that grew on Shabbos not be nullified to the fruit itself? It appears that the case is one of vegetables that grow quickly, such as gourds, where the amount added on Shabbos is significant, and therefore the fruit is muktzeh. But if, for example, an orange was picked on Shabbos for a dangerously ill person, and the sick person ate one segment from it, a healthy person may eat the rest of the fruit.",
  },
  {
    seif: 3,
    source: "Tur",
    noteIndex: 1,
    english:
      "(11) Or to break it, etc. There are three distinctions regarding an egg in Beitzah 2b. See Rashi there.",
  },
  {
    seif: 3,
    source: "Tur",
    noteIndex: 3,
    english:
      "(17) With derivatives of fire. One who cooks with them is liable. Therefore, one who places fruit or water on an oven or inside the oven chamber after the oven was heated, and they cook there, is liable. Rabbinically, it is forbidden to place them there even before the oven is heated, as explained below. All the laws of cooking mentioned in this siman also apply to something cooked by means of derivatives of fire.",
  },
  {
    seif: 3,
    source: "Tur",
    noteIndex: 4,
    english:
      "(18) And even with derivatives of the sun. Even after the fact it is forbidden, though it is possible that after Shabbos it is permitted even for the one who cooked it. See the glosses of Rabbi Akiva Eiger.",
  },
  {
    seif: 3,
    source: "Tur",
    noteIndex: 7,
    english:
      "(21) But in the sun itself. The Sages did not decree because of fire, since people do not confuse cooking in the sun with cooking by fire.",
  },
];

function setEnglish(data, seifNum, source, noteIndex, english) {
  const seif = (data.seifim || []).find((s) => s.number === seifNum);
  if (!seif) throw new Error(`Seif ${seifNum} not found`);
  const src = seif.sources || {};
  if (source === "Mechaber and Rama") {
    if (!src["Mechaber and Rama"]) throw new Error("Mechaber missing");
    src["Mechaber and Rama"].english = english;
    return;
  }
  const block = src[source];
  if (!block || !Array.isArray(block.notes)) {
    throw new Error(`Source ${source} missing or has no notes in seif ${seifNum}`);
  }
  if (noteIndex < 0 || noteIndex >= block.notes.length) {
    throw new Error(
      `Bad note index ${noteIndex} for seif ${seifNum} ${source} (len=${block.notes.length})`
    );
  }
  block.notes[noteIndex].english = english;
}

function main() {
  const dry = process.argv.includes("--dry-run");
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

  for (const p of PATCHES) {
    const label = `Seif ${p.seif} ${p.source} idx=${p.noteIndex ?? "MR"}`;
    if (dry) {
      console.log(`[dry] ${label} → ${p.english.slice(0, 60)}...`);
      continue;
    }
    setEnglish(data, p.seif, p.source, p.noteIndex, p.english);
    console.log(`Applied ${label}`);
  }

  if (!dry) {
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
    console.log(`Wrote ${JSON_PATH}`);
  }
}

main();
