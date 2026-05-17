/**
 * Normalize English: use transliteration yad soledet bo (per project convention), not "hand is scalded".
 * Fix known siman typos (Hebrew רמ״ז = 247).
 *
 * Usage: node scripts/normalize-yad-soledet-english.js [--input data/oc318.full.json]
 */
const fs = require("fs");
const path = require("path");

function normalizeEnglish(s) {
  let t = String(s);
  // Numbers: Hebrew in seif 1 points to סימן רמ״ז (= 247), not 307
  t = t.replace(/\bsiman 307\b/g, "siman 247");

  // Unify spelling (user preference: soledet)
  t = t.replace(/\byad soledes bo\b/gi, "yad soledet bo");

  // Phrase-level (longer first where needed)
  t = t.replace(
    /meaning a place where one's stomach would not be scalded by it/g,
    "meaning a place where it would not reach yad soledet bo (by the infant-belly standard)"
  );
  t = t.replace(
    /one should not place it so close to a fire where the hand is scalded/g,
    "one should not place it so close to a fire where it would be yad soledet bo"
  );
  t = t.replace(
    /\(49\) 'A hot thing where the hand is scalded, etc\.' — the Mechaber follows his view in seif 4 that if it cooled somewhat until the hand is no longer scalded in it/g,
    "(49) 'A hot thing that is yad soledet bo, etc.' — the Mechaber follows his view in seif 4 that if it cooled somewhat until it is no longer yad soledet bo"
  );
  t = t.replace(
    /this refers to a broth dish where there is cooking after cooking if the hand is no longer scalded from its heat/g,
    "this refers to a broth dish where there is cooking after cooking if it is no longer yad soledet bo"
  );
  t = t.replace(
    /on a hot vessel where the hand is scalded/g,
    "on a hot vessel where it is yad soledet bo"
  );
  t = t.replace(
    /\(9\) A kli rishon — meaning the vessel that was used on the fire — cooks even after it has been removed from the fire, as long as the hand is scalded in it/g,
    "(9) A kli rishon — meaning the vessel that was used on the fire — cooks even after it has been removed from the fire, as long as it is yad soledet bo"
  );
  t = t.replace(
    /\(28\) 'As long as the hand is scalded in it' — if it is not yad soledet bo, there is no concern of cooking\. This is why throughout this siman it states 'the hand is scalded,' and even a kli rishon that is not yad soledet bo is considered like a kli sheni\./g,
    "(28) 'As long as it is yad soledet bo' — if it is not yad soledet bo, there is no concern of cooking. This is why throughout this siman the phrase yad soledet bo is used, and even a kli rishon that is not yad soledet bo is considered like a kli sheni."
  );
  t = t.replace(
    /\(60\) 'The hand is scalded in it' — but if the hand is not scalded in it/g,
    "(60) 'It is yad soledet bo' — but if it is not yad soledet bo"
  );
  t = t.replace(
    /\(60\) 'The hand is scalded in it' — the reality/g,
    "(60) 'It is yad soledet bo' — the reality"
  );
  t = t.replace(
    /\(96\) 'In a place where the hand is scalded'/g,
    "(96) 'In a place where it is yad soledet bo'"
  );
  t = t.replace(
    /as long as the hand is scalded in it/g,
    "as long as it is yad soledet bo"
  );
  t = t.replace(
    /as long as the hand is scalded/g,
    "as long as it is yad soledet bo"
  );

  // Generic fallbacks
  t = t.replace(/the hand is no longer scalded in it/g, "it is no longer yad soledet bo");
  t = t.replace(/the hand is no longer scalded from its heat/g, "it is no longer yad soledet bo");
  t = t.replace(/if the hand is no longer scalded in it/g, "if it is no longer yad soledet bo");
  t = t.replace(/if the hand is not scalded in it/g, "if it is not yad soledet bo");
  t = t.replace(/where the hand is scalded/g, "where it is yad soledet bo");
  t = t.replace(/if the hand is scalded there/g, "if it is yad soledet bo there");
  t = t.replace(/the hand is scalded there/g, "it is yad soledet bo there");
  t = t.replace(/the hand is scalded in it/g, "it is yad soledet bo");
  // Last resort — avoid matching quoted fragments inside unrelated notes
  t = t.replace(/\bthe hand is scalded\b/g, "it is yad soledet bo");

  return t;
}

function walkSources(obj) {
  if (!obj || !Array.isArray(obj.seifim)) return;
  for (const seif of obj.seifim) {
    const sources = seif.sources || {};
    for (const block of Object.values(sources)) {
      if (!block || typeof block !== "object") continue;
      if (typeof block.english === "string") {
        block.english = normalizeEnglish(block.english);
      }
      if (Array.isArray(block.notes)) {
        for (const note of block.notes) {
          if (note && typeof note.english === "string") {
            note.english = normalizeEnglish(note.english);
          }
        }
      }
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  let input = "data/oc318.full.json";
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "--input") input = args[i + 1];
  }
  const inputPath = path.resolve(process.cwd(), input);
  const raw = fs.readFileSync(inputPath, "utf8");
  const obj = JSON.parse(raw);
  walkSources(obj);
  fs.writeFileSync(inputPath, JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log(`Normalized English in ${inputPath}`);
}

main();
