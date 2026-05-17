/**
 * One-time fix: remove repeated (maliach hayashan) glitches and set correct English
 * for three Tur / K'pshuto notes (OC318).
 */
const fs = require("fs");
const path = require("path");

const JSON_PATH = path.join(__dirname, "..", "data", "oc318.full.json");

const REPLACEMENTS = [
  {
    hebrewPrefix: "(ה) חוץ מן המליח הישן כו׳",
    english:
      "(e) Except for old salted fish (malich yashan), etc. — This implies that with cold water it is permitted; therefore one may rinse herring (hering) on Shabbos in cold water, even when it is very salty. The Beit Yosef likewise writes in this siman, in the name of Pardes, regarding a fish called tunina.",
  },
  {
    hebrewPrefix: "(לו) חוץ מן המליח הישן",
    english:
      "(36) Except for old salted fish (malich yashan): salted fish from the previous year, and kuleis ha'ispanin is the name of a fish that people eat only after rinsing it in hot water because of its saltiness; therefore even rinsing is problematic, for that completes the processing of such items and constitutes cooking. The Gemara states that if one rinsed them in hot water he is liable for a chatat. Many Acharonim write that the nature of these foods is that they cannot be eaten unless rinsed in hot water, so rinsing them is treated as cooking, because it makes them edible. The same applies to other salty items that cannot be eaten at all without rinsing. But items that can be made edible by rinsing in cold water may be rinsed in hot water poured from a kli sheni. Accordingly, salted fish in our regions called herring, which can be eaten after rinsing in cold water and sometimes even without rinsing, may be rinsed even in hot water; yet the Taz implies that one should be careful not to rinse it in hot water, and Shulchan Atzei Shitim and Chayei Adam write similarly — that is the appropriate practice. See Biur Halacha.",
  },
  {
    hebrewPrefix: "(לג) המליח הישן",
    english:
      "(Lg) Old salted fish (malich yashan): a fish that was salted to preserve it, which cannot be eaten as is because of its saltiness.",
  },
];

function collapseMaliachRepeats(s) {
  return s.replace(/(\s*\(maliach hayashan\))+/gi, " (malich yashan)");
}

function walk(data) {
  for (const seif of data.seifim || []) {
    const sources = seif.sources || {};
    for (const block of Object.values(sources)) {
      if (!block) continue;
      if (typeof block.english === "string" && block.english.includes("maliach hayashan")) {
        for (const r of REPLACEMENTS) {
          if (block.hebrew && block.hebrew.startsWith(r.hebrewPrefix)) {
            block.english = r.english;
            break;
          }
        }
        if (typeof block.english === "string" && block.english.includes("maliach hayashan")) {
          block.english = collapseMaliachRepeats(block.english);
        }
      }
      if (Array.isArray(block.notes)) {
        for (const note of block.notes) {
          if (!note || typeof note.english !== "string") continue;
          if (!note.english.includes("maliach hayashan")) continue;
          let set = false;
          for (const r of REPLACEMENTS) {
            if (note.hebrew && note.hebrew.startsWith(r.hebrewPrefix)) {
              note.english = r.english;
              set = true;
              break;
            }
          }
          if (!set) note.english = collapseMaliachRepeats(note.english);
        }
      }
    }
  }
}

function main() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  walk(data);
  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), "utf8");
  console.log("Updated", JSON_PATH);
}

main();
