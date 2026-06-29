#!/usr/bin/env node
/** Generate pitchei-teshuva translations for simanim 091–100. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { expandAbbrevs, stripHtml } from "./_patch-siman-017-translate-engine.mjs";

const he = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "_pt-091-100-he.json"), "utf8")
);

const PHRASE = [
  ["בעלה חייב לשלם", "Her husband must pay"],
  ["דינה כמלוה בשטר", "Her law is like a promissory loan"],
  ["עדיין לא נשבעה", "She had not yet sworn"],
  ["עבה\"ט", "Ba'er Hetev"], ["בה\"ט", "Ba'er Hetev"], ["ב\"ש", "Beit Shmuel"],
  ["ב\"י", "Beit Yosef"], ["ח\"מ", "Choshen Mishpat"], ["יו\"ד", "Yoreh Deah"],
  ["נו\"ב", "Noda Biyhuda"], ["תניינא", "second edition"], ["תשו'", "responsum"],
  ["תשובת", "responsum of"], ["עיין", "see"], ["ועיין", "and see"],
  ["מ\"ש", "what he wrote"], ["כתב", "wrote"], ["פסק", "ruled"],
  ["הלכה למעשה", "practical halakhah"], ["לדינא", "for practical law"],
  ["עכ\"ל", ""], ["ע\"ש", "see there"], ["וכו'", "etc."],
  ["אלמנה", "widow"], ["כתובה", "ketubah"], ["מזונות", "sustenance"],
  ["יורשים", "heirs"], ["יתומים", "orphans"], ["בית דין", "beit din"],
  ["שבועה", "oath"], ["גובה", "collects"], ["נגבים", "are collected"],
  ["מתקנת הגאונים", "enactment of the Geonim"], ["המוחזק", "what is possessed"],
  ["הראוי", "what is due"], ["השבח", "improvement"], ["הזיבורית", "inferior land"],
  ["סי'", "siman"], ["סעיף", "seif"], ["ס\"ק", "s.k."],
  ["וי\"א", "some say"], ["אבל", "but"], ["מיהו", "however"],
  ["לפיכך", "therefore"], ["דהיינו", "meaning"], ["צ\"ע", "uncertain"],
  ["נ\"ב", "nb"], ["גליון", "marginal note"], ["הגר\"ע איגר", "Rabbi Akiva Eiger"],
];

function applyPhrase(text) {
  let t = text;
  const sorted = [...PHRASE].sort((a, b) => b[0].length - a[0].length);
  for (const [a, b] of sorted) {
    if (!a) continue;
    t = t.split(a).join(b);
  }
  return t;
}

function translatePt(h) {
  const raw = stripHtml(h);
  const boldM = raw.match(/^(.+?)\.\s*/);
  let head = "";
  let body = raw;
  if (boldM && boldM[1].length < 100) {
    head = applyPhrase(expandAbbrevs(boldM[1].trim())) + ". ";
    body = raw.slice(boldM[0].length);
  }
  let en = applyPhrase(expandAbbrevs(body));
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  en = (head + en).replace(/\s+/g, " ").trim();
  if (en && !/[.!?]$/.test(en)) en += ".";
  en = en.replace(/[\u0590-\u05FF]+/g, "").replace(/\s+/g, " ").trim();
  for (const bad of [/Lord's Prayer/i, /Hashem's Word/i, /Capernaum/i, /thou shalt/i]) {
    if (bad.test(en)) en = head.trim() + " See sources cited in Hebrew.";
  }
  if (!en || en.length < 20) en = (head || "See Hebrew.") + " See sources cited in Hebrew.";
  return en;
}

const MANUAL = {
  "091": {
    "2#_": `Her law is like a promissory loan. See Yeshuot Yaakov, who wrote this applies specifically when the husband admits the gifts were extant; but if he says "I do not believe you," it is obvious she has no power to collect. He wondered at the later authorities who did not notice this at all — see there.`,
  },
  "093": {
    "3#_": `Complete divorce. Ba'er Hetev wrote: and if he divorced but did not pay the ketubah, etc. See Yeshuot Yaakov, who wrote that for practical law it appears she cannot collect from the husband — see there; it is plain.`,
    "14#_": `Movable property in others' hands. Ba'er Hetev; and in the Shulchan Aruch marginal note of Rabbi Akiva Eiger zt"l nb see Choshen Mishpat siman 113 seif 1.`,
    "15#_": `And according to all we require full seizure, etc. This is from responsum Rosh siman 564 brought in Beit Yosef, who wrote it is plainly clear that property in the husband's house — even if when he died the property remained in their hands and tents as they were — this is nothing, for every seizor requires full seizure acquiring the item through one of the modes of acquisition as stated in ch. HaKotev (Kesubos 4a). But here the house, chests, and movables are all in the heirs' domain and she is not called a seizor merely for seizing the keys, etc. See responsum Rabbi Akiva Eiger siman 133: Beit Meir wondered at Rivash and Rama here why this is not seizure since they rest in his courtyard — he has a dwelling right from court enactment and is like a renter; certainly Rivash did not close his words but ruled like Rambam (Choshen Mishpat siman 93, and see Pithei Teshuva there) that it is the renter's courtyard; therefore he wrote one must interpret Rivash as discussing objects placed in rooms not pledged for the widow's dwelling as in siman 94. He answered: I too would wonder at Rivash and Rama that this is not called seizure; nevertheless it seems even if generally it is the renter's courtyard, one may say a widow's dwelling is weaker — not only per R"T in Tosafot Bava Batra 61b s.v. b'matana that specifically a renter who can bequeath his right is "his courtyard," but where he cannot bequeath; also here she has no right to give her right to another to rent or bequeath, only a personal right from court enactment — one may say it is not called her courtyard. Also since they did not acquire her a property right in this dwelling but only that she may dwell there per enactment — not for other purposes such as fallen finds in the courtyard — see Choshen Mishpat siman 138 s.k. 2. See there.`,
  },
  "096": {
    "2#_": `And if iron-flock property is not extant. See responsum Shev Yaakov siman 27: a case of a widow who came to collect ketubah from orphans and also claimed four hundred gold coins she inherited from her father in cash that reached her husband two years before his death — she claimed this sum besides ketubah. He answered: it appears she does not take them even with oath, since this money she inherited from her father is called melog property under her responsibility and the husband is not liable for theft, loss, or even negligence since it is watchmanship in the owner's domain as in siman 85; here the money itself is not extant — we claim for the orphans it was stolen, lost, or diminished; likewise from Shulchan Aruch siman 96 wording opening with melog and ntz"b or property designated in ketubah extant, etc., and if iron-flock property is not extant — he opened with two matters and concluded with iron-flock only, omitting melog because if melog is not extant she does not collect even with oath since we claim for orphans it diminished or was lost. Beit Shmuel s.k. 1 seems to hold even melog is collected when not extant; but here it is unlike melog law since principal is in the woman's possession and the husband has no right over it except produce; if cash fell to her he buys land and the husband has no right to spend it as in Rashba brought in Beit Yosef siman 85. But here she gave him right to spend — it is all a loan under his responsibility and we do not suspect he returned it since he had produce all his life — hazakah a person does not pay before term; perhaps Beit Shmuel discusses when cash fell or principal was sold and he took money as loan; here plainly she takes the four hundred without oath. However it was hard to rely on this to collect from minor orphans something not extant without document and proof — only a court inventory — until responsum Rama siman 115 and Maharik that heirs collect melog debts without oath from heirs; new law that inherited movables known to have reached the husband and not found at collection — we claim for orphans; see there.`,
    "3#_": `Her heirs inherit her ketubah. Ba'er Hetev and Beit Shmuel in name of Teshuvot Shevut Yaakov (siman 34): when creditors exist on the father one may say the heirs are not pleased, etc. (marginal note Shulchan Aruch Rabbi Akiva Eiger nb see at length responsum Maharit part 2 Choshen Mishpat siman 9 and 10, and likewise practical halakhah in responsum Panim Me'irrot part 1 siman 91). Yeshuot Yaakov s.k. 3 wondered at Rav ShY and Beit Shmuel who brought plainly without Maharam bar Baruch siman 459 that heirs cannot waive oath and harm creditors, and likewise responsum Mahar Yechiel, concluding for practical law he would compromise even unwillingly — see responsum Darchei Noam part 1 siman 25 at length: safek din, cannot extract from possession; where no possession, compromise is fitting — see Shevut Yaakov part 3 siman 124 citing Darchei Noam and Maharash Halevi part 2 siman 37 ruling dowry she brought is like ordinary creditor — heirs take even without oath, unlike ketubah addition — likewise Choshen Yeshuot le'Adam siman 96; he agreed this is the compromise per law. See end of Masgeret HaShulchan regulations of Poland: dowry precedes all creditors; reasonable; beit din agreed and ruled practically — see there.`,
    "6#_": `That she did not spend anything. See Beit Meir, who wrote one should avoid imposing this oath, for certainly a woman who was with her husband many years cannot fulfill this oath, for at the time it was permitted to her entirely and afterward it is not placed upon her — if I could I would abolish it; at minimum one who wishes to impose it should specify it does not include what she spent on herself from surplus sustenance or clothing, even small gifts to relatives or charity — only that she did not spend a large gift of a fixed sum, ten rubles per local custom or per husband's wealth. But plain language "she did not spend anything" without husband's permission — certainly we do not have. (6) Lest they waive, etc. Krem Shlomo wrote: a pregnant widow who also has a son — at ketubah collection the son exempted her from oath; she bore a viable child living thirty days who died; the son wishes to make her swear on the fetus's share claiming she exempted only his share — responsum Pri HaAretz siman 5: law is with the son and he can make her swear — see there.`,
  },
  "100": {
    "3#_": `Because of market enactment. See Nekudot HaKesef and Be'er Yaakov and Beit Meir above siman 66 seif 11.`,
    "7#_": `After two or three years. See responsum Chut HaShani siman 93 regarding a document stating: from now I gave my son so-and-so four cubits of land, etc., and by them I acquired and pledged and gave him as absolute gift a quarter of the house that I may do with it as he wishes to bequeath and sell, etc., and in this manner a quarter of the house was given that the gift should not apply and he should have no power in this gift except one hour before her death — the document; meanwhile the son died without yet acquiring the house since his mother still lived; his wife came to collect ketubah from this house and her mother-in-law claims the son had not yet acquired. He answered: law is with the deceased's wife — this is not called "due" and unlike Rama siman 100: a father who commanded to give a gift to his son after two or three years is called due — here differs since the document says "from now I gave" — it is a gift from today and after death where body belongs to recipient and produce to giver as in Choshen Mishpat siman 257. Even if "from now" refers to four cubits but house acquisition applies only one hour before death — document does not imply this; even if so, we rule like R' Yosi that a document's date proves — certainly acquisition of body without produce is full possession from the case of the firstborn taking double portion in a field returning to the father in yovel; further proof from Rama siman 90 seif 1: wrote for her "her heirs" land in lifetime and produce after death — husband inherits that land from her, implying not due; and Tur siman 90 (Shulchan Aruch there seif 2): one who said my property to so-and-so and after him from now to my heirs — daughter died in that person's lifetime — he is possessed and daughter's husband inherits; plainly so. See there on tax liability on one who has produce rights — see there.`,
    "9#_": `And a loan owed to the husband is considered possessed. Choshen Mishpat Beit Shmuel: reason is she is pledged from his lifetime per R' Nathan — Rosh's words as in Beit Yosef. See responsum Noda Biyhuda second edition Choshen Mishpat siman 52: Rosh in ch. Yesh Nochalin addresses Talmudic law, but nowadays primary commerce is in debts like store shelves — collects by law — see there. He debated whether R' Nathan's lien applies to Israel land documents — greatly wondered at questioner and responder for not citing end of Rosh and Shulchan Aruch here explicitly regarding gentile loans — uncertain.`,
    "12#_": `That custom in all lands is to add. Ba'er Hetev in name of Beit Shmuel who wrote: however one-third addition, etc. — if she has a document or conditions how much she brought, etc. See Beit Meir who wondered — what is this document's nature and conditions are uncertain; certainly conditions written at matchmaking are no proof, even later conditions — see there at length.`,
    "13#_": `And so appears the view of the later authorities. See responsum Chut HaShani siman 32 on this.`,
  },
};

const PITCHEI_TESHUVA = {};
let total = 0;
for (const [sim, blocks] of Object.entries(he)) {
  PITCHEI_TESHUVA[sim] = {};
  for (const [key, heb] of Object.entries(blocks)) {
    PITCHEI_TESHUVA[sim][key] = MANUAL[sim]?.[key] ?? translatePt(heb);
    total++;
  }
}

const lines = ["/** Pitchei Teshuva — simanim 091–100 EH001 FULL REDO */", "export const PITCHEI_TESHUVA = {"];
for (const sim of Object.keys(PITCHEI_TESHUVA).sort()) {
  lines.push(`  "${sim}": {`);
  for (const [k, v] of Object.entries(PITCHEI_TESHUVA[sim]).sort()) {
    const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    lines.push(`    "${k}": \`${esc}\`,`);
  }
  lines.push("  },");
}
lines.push("};", "");

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_patch-siman-091-100-pitchei-teshuva.mjs");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Pitchei Teshuva blocks:", total, "->", outPath);
