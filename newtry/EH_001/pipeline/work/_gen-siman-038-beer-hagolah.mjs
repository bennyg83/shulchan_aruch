#!/usr/bin/env node
/** Generate beer-hagolah translations from raw Hebrew (no partial phrase corruption). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { stripHtml } from "./_patch-siman-017-translate-engine.mjs";

const dump = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "_siman-038-hebrew-dump.json"), "utf8")
);

function tr(h) {
  h = stripHtml(h).trim();
  if (h === "שם") return "There.";
  if (/^ה"ה שם$/.test(h)) return "Likewise there.";
  if (/^ג"ז שם/.test(h)) return "Likewise there.";
  if (/^כמימרא/.test(h)) return "As the statement there; consensus of the poskim.";
  if (/^פשוט בגמ/.test(h)) return "Plain in the Gemara there 62b.";
  if (/^ל' הרמב"ם בפ"י מה' אישות/.test(h))
    return "In Rambam ch. 10 Laws of Marriage; his words are explained in Mishnah and Gemara Kiddushin 61a and 61b.";
  if (/^לשון הרמב"ם ריש פ"ז/.test(h))
    return "Rambam's language at the beginning of ch. 7 Laws of Marriage — from Mishnah and Gemara Kiddushin 63a; as our master explained: one who says on condition that he consent means on condition that he say yes explicitly; likewise Rashba and as required from Tosafot HaHeim there; likewise Ran.";
  if (/^טור וזה פשוט/.test(h))
    return "Tur — and this is plain: perforce he did not say R' Huna that kiddushin take effect retroactively except when he said on condition, which is as from now.";
  if (/^משנה שם וכר"מ וכפירש"י/.test(h))
    return "Mishnah there, and like R' Meir, and as Rashi explained, and likewise the Rif in his rulings, and so ruled all the poskim.";
  if (/^משנה ב"מ דף/.test(h))
    return "Mishnah Bava Metzia 24a; and they said there in the Gemara that it follows R' Meir, and as Rashi wrote there in Kiddushin in the mishnah of Bava Metzia; and baraita there in Gittin 75a and 75b.";
  if (/^משנה קידושין דף ס/.test(h)) return "Mishnah Kiddushin 60a, and as Rashi explained there.";
  if (/^משנה שם דף/.test(h)) return "Mishnah there " + h.match(/דף ([^ ]+)/)?.[1]?.replace(/ע"א/, "a").replace(/ע"ב/, "b") + ".";
  if (/^משנה/.test(h)) return "Mishnah " + h.replace(/^משנה\s*/, "").replace(/דף/g, "folio ").replace(/ע"א/g, "a").replace(/ע"ב/g, "b") + ".";
  if (/^ברייתא כתובות/.test(h)) return "Baraita Kesubos 27a, and like R' Yehuda.";
  if (/^בריי'/.test(h))
    return "Baraita, as established there in Gemara Gittin 75a and 75b; and that which he did not write that a condition on one matter and act on another — like that sugya in Gittin — one may say he holds like R' Eliezer who makes another establishment; likewise there.";
  if (/^הרמב"ם שם וכתב/.test(h))
    return "Rambam there; and he wrote likewise that this is the view of all the Geonim, and they derived this from the mishnah language that on condition is as from now and he did not mention doubling the condition — and such is essential.";
  if (/^טור בשם ר"ח/.test(h))
    return "Tur in name of R' Chananel, and as his father Rosh wrote there in his rulings, and likewise in responsum kelal 61 in name of R' Yonah and Rabbenu Tam, and likewise Ran.";
  if (/^ה"ה שם והר"ן בפ"ג/.test(h))
    return "Likewise there; and Ran in ch. 3 Kiddushin — per the Rif and some Acharonim who hold we do not rule like R' Meir; by law we do not require doubled condition anywhere; in gittin and kiddushin too if he did not double his condition and it was not fulfilled we are concerned for her — see siman 143 seif 12 where the reason is explained.";
  if (/^הראב"ד שם בהשגות/.test(h)) return "Ra'avad there in Hagahot to his final resolution of the sugya.";
  if (/^טור בשם אביו הרא"ש/.test(h)) return "Tur in name of his father Rosh, and likewise HaHeim in name of Ramban.";
  if (/^טור בשם הרמ"ה/.test(h))
    return "Tur in name of RaMAh, and likewise HaHeim in name of Ramban and Rashba — because any condition without a fixed time is presumed forever.";
  if (/^ה"ה שם בשם הרמב"ן/.test(h)) return "Likewise there in name of Ramban and Rashba.";
  if (/^ג"ז שם בשמם/.test(h)) return "Likewise there in their name.";
  if (/^משנה וגמ' שם/.test(h)) return "Mishnah and Gemara there.";
  if (/^כאוקמת' דגמ' שם דף ס/.test(h)) return "As the Gemara's establishment there Kiddushin 60b.";
  if (/^כתנא דמתני' דס"ל הכי/.test(h)) return "As the tanna of the mishnah who holds thus, and as Rava inferred there 63a.";
  if (/^הר"י בשם הר"מ הנרבוני/.test(h)) return "R' Yehuda in name of RaMAh of Narbonne.";
  if (/^כמימרא דר"ה שם הסכמת הפוסקים/.test(h)) return "As the statement of R' Huna there; consensus of the poskim.";
  if (/^שם במשנה$/.test(h)) return "There in the mishnah.";
  if (/^שם$/.test(h)) return "There.";
  if (/^שם בגמרא/.test(h)) return "There in the Gemara " + h.replace(/שם בגמרא\s*/, "").replace(/דף/g, "folio ").replace(/ע"א/g, "a").replace(/ע"ב/g, "b") + ".";
  if (/^הר"ן/.test(h)) return "Ran " + h.replace(/^הר"ן\s*/, "").replace(/בפ"/g, "ch. ").replace(/דף/g, "folio ").replace(/ע"א/g, "a").replace(/ע"ב/g, "b") + ".";
  if (/^ה"ה/.test(h)) return "Likewise " + h.replace(/^ה"ה\s*/, "") + ".";
  if (/^ג"ז/.test(h)) return "Likewise " + h.replace(/^ג"ז\s*/, "") + ".";
  if (/^פשוט/.test(h)) return "Plain " + h.replace(/^פשוט\s*/, "") + ".";
  if (/^כדמפר' לה ר"ל שם בגמ'/.test(h)) return "As R' Levi explained there in the Gemara.";
  if (/^כדדייק רבא שם/.test(h)) return "As Rava inferred there.";
  // generic source line
  return h
    .replace(/משנה/g, "Mishnah")
    .replace(/גמרא|גמ'/g, "Gemara")
    .replace(/ברייתא|בריי'/g, "Baraita")
    .replace(/קידושין/g, "Kiddushin")
    .replace(/גיטין/g, "Gittin")
    .replace(/כתובות/g, "Kesubos")
    .replace(/ב"מ/g, "Bava Metzia")
    .replace(/הרמב"ם/g, "Rambam")
    .replace(/הר"ן/g, "Ran")
    .replace(/הרשב"א/g, "Rashba")
    .replace(/הרמב"ן/g, "Ramban")
    .replace(/רש"י/g, "Rashi")
    .replace(/הרא"ש/g, "Rosh")
    .replace(/הטור|טור/g, "Tur")
    .replace(/שם/g, "there")
    .replace(/דף/g, "folio ")
    .replace(/ע"א/g, "a")
    .replace(/ע"ב/g, "b")
    .replace(/פ"/g, "ch. ")
    .replace(/וכ"כ/g, "and likewise")
    .replace(/וכן/g, "and so")
    .replace(/פסקו/g, "ruled")
    .replace(/בהלכות/g, "in his rulings")
    .replace(/[\u0590-\u05FF]+/g, (m) => "") // strip remaining Hebrew
    .replace(/\s+/g, " ")
    .replace(/\.+/g, ".")
    .trim() + ".";
}

const T = {};
for (const { key, he } of dump["beer-hagolah"]) {
  const k = key.replace(/#main$/, "#_");
  let en = tr(he);
  if (/[\u0590-\u05FF]{4,}/.test(en)) en = tr(he); // retry - strip should have worked
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  T[k] = en;
}

const lines = Object.entries(T).map(([k, v]) => `  "${k}": \`${v.replace(/`/g, "\\`")}\`,`);
fs.writeFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-038-data-beer-hagolah.mjs"),
  `export default {\n${lines.join("\n")}\n};\n`
);
console.log("beer-hagolah", Object.keys(T).length);
