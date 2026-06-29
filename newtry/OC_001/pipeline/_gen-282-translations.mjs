#!/usr/bin/env node
/** Generate and inject all siman 282 hand translations from embedded map */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot6-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot6-siman-282.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

// key: "rel\tkey" -> English translation
const T = {
  "biur-halacha/part-001.txt\t6:_":
    "For we rule the maftir counts, etc. — and even though the Gemara deals with where he left verses for the maftir that he did not read at first, and therefore he counts in the minyan — here he already read them at first, and the maftir only reads the haftarah; nevertheless, since we rule the maftir counts in the minyan, and the law is that the maftir must read at least three verses in the Torah, therefore he must repeat what the seventh read; and so is proven from Magen Avraham and Mishna Berurah, see there:",
  "chatam-sofer/part-001.txt\t1:_":
    "In Magen Avraham s.k. 1 and it implies. NB: see responsa part 2 Orach Chayyim siman 171 and siman 170, [regarding words of dispute that arose in one congregation regarding adding an eighth every Shabbat, see there]:",
  "chatam-sofer/part-001.txt\t2:_":
    "For siman 288 in Magen Avraham s.k. 16 \"and he should not say.\" NB: and in Sefer Even HaEzer he ruled that one should say Kaddish after the seventh and afterward read maftir; and so is the custom on Tishah BeAv when they say Kaddish between the sections, see there:",
  "chatam-sofer/part-001.txt\t3:_":
    "There in Magen Avraham s.v. \"the groom who was,\" etc., \"he is last for him,\" etc. NB: and even on the day of the circumcision itself, so too Levush — for the reason that he will eventually go up to the Torah on the day the mother goes to synagogue; and therefore even though he is last for the groom, he is not last for the circumcision, see there:",
  "chokhmat-shlomo/part-001.txt\t1:_":
    "Seif 5 — this one who wishes to read maftir must return and read, etc. NB: see in Magen Avraham and Taz who wrote that since they said Kaddish there is concern that people enter and do not know he already read; it appears to me that this is only when he did not read at all in the seven; but if he read as seventh and wishes to be maftir, since he already read there is no concern, see there:",
  "eliyah-rabbah/part-001.txt\t1:_":
    "(1) [Levush] And on Yom Tov, etc. — for there is a melacha prohibition; and on Yom Kippur there is karet punishment; and on Shabbat stoning (Gemara) — a hint to this is that Shema has three letters: Yisrael, Shamayim, Olam:",
  "eliyah-rabbah/part-001.txt\t2:_":
    "(2) [Levush] And on Shabbat, etc. — and furthermore, if a person has any unavoidable circumstance and did not come to the synagogue all seven weekdays and did not hear Barchu, he listens on Shabbat from the mouth of the reader to seven Barchu and fulfills his obligation:",
  "eliyah-rabbah/part-001.txt\t3:_":
    "(3) [Levush] But they add, etc. — and Rashbatz wrote that nowadays when everyone recites blessings, one should not add because of a blessing in vain, and so it is fit to conduct, except at a wedding or milah when there is need; and Maharash enacted in Prague not to read more than ten besides maftir:",
  "eliyah-rabbah/part-001.txt\t4:_":
    "(4) [Levush] The permission, etc. — requires study, for Rama wrote above \"and there are those who forbid\" and so practiced, except on Simchat Torah, until here; and similarly Levush himself in siman 669 wrote at length, see there:",
  "eliyah-rabbah/part-001.txt\t5:_":
    "(5) [Levush] And similarly the custom. Not in every place, etc. (Malbush Yom Tov); and similarly here in Prague they add on Yom Tov and Yom Kippur; and so it appears to me proper, see there:",
  "eliyah-rabbah/part-001.txt\t6:_":
    "(6) And a minor. Nowadays they are not accustomed to call a minor at all except for maftir; and the reason Perishah wrote — specifically in their days when the kohen would bless first and the last would bless at the end of the blessings; but nowadays when each one blesses before and after his aliyah, a minor also counts:",
  "eliyah-rabbah/part-001.txt\t7:_":
    "(7) [Levush] That there is no honor, etc. — language of Beit Yosef in the name of Ran: since they are not obligated, they do not discharge others entirely, until here. And he means they cannot discharge the congregation's obligation in the reading, but for the minyan of seven they count, as is explained in the poskim:",
  "eshel-avraham/part-001.txt\t1:_":
    "And if he wished. See responsum Beit Yehuda siman 60 at length — section of builder and destroyer; and see Ba'er Heitev s.k. 3:",
  "eshel-avraham/part-001.txt\t3:_":
    "Permitted. A Levi who is a mamzer — the sanctity of Levi is impaired — Dvar Moshe siman 15 and Yoreh De'ah siman 105; and see Bach:",
  "eshel-avraham/part-001.txt\t4:_":
    "And a minor. See responsum Dvar Moshe siman 20 in Mahariv; and see in responsum of Rivash and Knesset HaGedolah:",
};

// For remaining blocks, use hePlain-based translation via enBad cleanup + manual overrides
// Load additional translations from batch files if they exist
for (const f of ["_hand282-b1-en.mjs", "_hand282-b2-en.mjs", "_hand282-b3-en.mjs", "_hand282-b4-en.mjs"]) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  const { FIXES } = await import(new URL(f, import.meta.url).href);
  for (const [rel, blocks] of Object.entries(FIXES)) {
    for (const [key, en] of Object.entries(blocks)) {
      T[`${rel}\t${key}`] = en;
    }
  }
}

let n = 0;
const fails = [];
for (const it of hand.items) {
  const k = `${it.rel}\t${it.key}`;
  let en = T[k];
  if (!en) {
  }
  if (!en) en = autoFix(it.enBad || "", it.marker, it.he || "");
  en = autoFix(en, it.marker, it.he || "");
  it.en = en;
  n++;
  const pf = preflightFail(en);
  if (pf) fails.push({ k, pf, en: en.slice(0, 80) });
}

fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("set en on", n, "blocks; preflight fails:", fails.length);
if (fails.length) {
  console.log(fails.slice(0, 20).map((x) => `${x.k}: ${x.pf}`).join("\n"));
  process.exit(1);
}
