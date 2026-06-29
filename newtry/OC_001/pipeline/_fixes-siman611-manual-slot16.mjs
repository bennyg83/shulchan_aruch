/** worker-slot-16 — siman 611 manual fixes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chokhmatEn = fs
  .readFileSync(path.join(__dirname, "work", "chokhmat611-en.txt"), "utf8")
  .trim();

export const FIXES = {
  "mechaber/part-001.txt": {
    "2:main": "Every melacha for which one is liable on Shabbat one is liable on Yom Kippur; and everything exempt on Shabbat but forbidden is likewise on Yom Kippur — except on Shabbat intentional is stoning and Yom Kippur intentional is karet. Whatever is forbidden to move on Shabbat is forbidden on Yom Kippur. They permitted trimming vegetables and cracking nuts from minchah onward when it falls on a weekday; nowadays they are stringent. {Rama: If a fire broke out in the synagogue on Yom Kippur one may save one meal for the night as on Shabbat for minchah meal (Ran end of Kol Kitvei); already explained siman 334 how we act now for fire on Shabbat, and the same on Yom Kippur. They are accustomed for children to play with nuts (Agudah and Maharil) and one does not protest even if they do so not for need of the day.}"
  },
  "turei-zahav/part-001.txt": {
    "1:_":
      "And they permitted trimming vegetables. Rashi: to detach leaves from stalks so they are ready to cut — permitted because of affliction, seeing prepared food and not eating, end of his words; Ran and Magen Avraham ch. 1 laws of Shabbat explain due to distress so food is easy at mealtime, like having bread in one's basket; from Tur siman 249 it appears second explanation — if per Rashi why question there on insulating hot food? Rather per second explanation only from minchah onward when affliction is greater; before minchah not permitted as not yet affliction and forbidden as preparing for weekday need.",
  },
  "beur-hagra/part-001.txt": {
    "2:ב":
      '(ב) To trim. Rashi and Ran and Maharam explain to detach; nevertheless Ran and Maharam explain distress; Yerushalmi when Yom Kippur falls on erev Shabbat they do not blow from minchah onward — detach from stalks and crack pomegranates and rinse with water from minchah onward with darkening, not concern preparing holy to profane; Rashi before this on splitting nuts and scraping pomegranates and cutting on Shabbat for that Shabbat only.',
  },
  "chokhmat-shlomo/part-001.txt": {
    "1:_": chokhmatEn,
  },
  "levushei-serad/part-001.txt": {
    "2:_":
      "There — not affliction as it should be 'not affliction' but from minchah onward when one hopes and anticipates eating time — Rashi; Ran and Magen Avraham explain simply not affliction until minchah when fasting pain is greater.",
  },
  "machatzit-hashekel/part-001.txt": {
    "2:ח":
      "(ח) And Ran wrote they permitted so, etc. — as it should be. See siman 612. Raw vegetables — Rama siman 612 permits touching food without decree lest he eat; Ran needed reason before minchah forbidden as appears preparing for that day; raw not fit for eating — see siman 612; Machatzit HaShekel reconciles with Rama there.",
    "2:ט":
      "(ט) And see siman 308 — raw meat detached is permitted to move though not alive-looking; but not alive-looking though fit for dogs — since on motzaei Shabbat fit for humans by cooking, intent not for dogs; therefore forbidden to move.",
  },
  "peri-megadim/part-001.txt": {
    "1:_":
      "And they permitted — Taz: Rashi Shabbat 114 and 115 — distress from minchah anticipating night eating; they did not permit before minchah as no distress yet; forbidden as preparing weekday need. Taz: not change, etc., means per Rashi; Ran and Maharam: permitted to repair so not distressed and food ready at motzaei — unlike Rashi; when Yom Kippur erev Shabbat permitted insulating so not distressed — per Ran; per Rashi forbidden. See Pri Megadim letter 2.",
  },
};
