#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { preflightFail } from "./_slot5-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");

const PATCH224 = {
  "beer-hagolah/part-001.txt": {
    "1:א": "Berakhot 57",
    "1:ב": "Rabbenu Yonah, citing R' Yitzchak Migash, there",
    "6:_": "See there",
    "7:א": "See there",
    "7:ב": "Semag",
    "8:_": "See there, Berakhot 58",
    "9:_": "See there",
    "10:א": "See there",
    "10:ב": "Rashi there",
    "1:ג": "From that which Rish perek HaRo'eh",
    "2:א": "See there, Berakhot 54",
    "2:ב": "Yerushalmi there",
    "2:ג": "There, and Rashba",
    "3:_": "See there",
    "4:א": "See there, Berakhot 54",
    "4:ב": "Tur",
    "5:א": "See there",
    "6:א": "See there, Berakhot 54",
    "6:ב": "Tur",
    "7:א": "See there",
    "7:ב": "(ב) Tur, as cited",
    "9:_": "See there",
    "11:_": "See there",
    "12:_": "See there",
  },
};

const PATCH223 = {
  "eliyah-rabbah/part-001.txt": {
    "2:_":
      "[ב] [Levush] To rov hahoda'ot, etc. I wonder what he saw to change the formula from Shulchan Aruch's wording to rov hahoda'ot; and in truth R' Zalman Halevi brought it — Ran at the beginning of Taanit ruled thus and explained the Gemara: let us say it to both — R' Yehuda said, and R' Yochanan said — see there; however since Beit Yosef did not bring it, it is certainly rejected as Ran rejected it in the name of Ramban there; and so it is explicit in our Gemara daf 59 and in Taanit daf 7, and so from Rashi and Tosafot there, and so I saw in Baal Halachot Gedolot, Rif, Rambam, Rosh, Rashba, and Tosafot of Rabbenu Yonah; and the reason is rov is a title like rav; and also that every drop requires praise requires mentioning in the conclusion language of abundance like the opening:",
  },
};

const PATCH224_ELIAH = {
  "eliyah-rabbah/part-001.txt": {
    "1:_":
      "[א] <b>And nowadays, etc.</b> So wrote Tosafot at the beginning of perek HaRo'eh, and Levush explained the Gemara teaches us even a minor who grew up does not bless. In my humble opinion the Gemara teaches us that even one who did not see within thirty days does not bless, since most of the world sees — and so Piskei Tosafot imply, unlike Olat Tamid. These distinctions — see Bach and Acharonim; they wrote it is forbidden to see graves of the public domain and cemeteries:",
    "2:_":
      "[ב] <b>[Levush] To our forefathers, etc.</b> Malbushei Yom Tov wrote this is the version of our Gemara; but Rif, Rosh, and Shulchan Aruch read leTzadikim instead of leAvoteinu, which is more correct — until here; and so in Baal Halachot Gedolot and all poskim, and in Levush itself above siman 218 seif 7 — requires study:",
    "5:_":
      "[ה] <b>Sixty myriads, etc.</b> It implies he holds like Rambam that one does not bless chacham haRazim on a greater sage; Beit Yosef, Bach, and Lechem Chamudot labored on the reason and rejected them. One may wonder, for I found explicitly in Milchamot Hashem of Ramban this law and both reasons; if so it appears specifically in Eretz Yisrael one blesses sixty myriads — requires study, for I abbreviated:",
    "7:_":
      "[ז] <b>Houses of Israel, etc.</b> It appears to me the main ruling is Rif — specifically regarding synagogues, and likewise regarding Samaritan houses — and so Rashal wrote, and so Kolbo siman 87 and Sefer Zikaron imply, and so Yerushalmi implies. And that above we bless on Samaritans — one must say it deals with idolatry itself standing openly as Beit Yosef wrote; from Kolbo it appears there is a dispute, and whoever said this did not say that — requires study whether this Mishnah is a place that was uprooted, etc. It appears to me from the poskim there is no distinction between Eretz Yisrael and abroad, nor between Temple times and not — and so Avudraham implies, unlike Beit Yosef and Chiddushei Aggadot; regarding Samaritan houses all agree there is no distinction. Malbushei Yom Tov wrote Tur also omitted it, and one knows from Sefer Kolbo the law; but Rif, Rosh, and Remazim wrote it — until here; and so Baal Halachot Gedolot, Rokeach, Avudraham, Sefer Zikaron, Rabbeinu Yerucham, and Kolbo imply. Maharash wrote in derashot: when walking on a grave he would say: may it be His will that the rest of so-and-so buried there be in honor and his merit stand for me. He also wrote: plucking grass from a grave or taking a stone and placing it on the monument is only to show honor to the deceased that someone was at his grave. One should not visit one grave twice in one day — R' Yitzchak wrote. In Likutim end of Maaneh Lashon he wrote on the monument it is hard to forget, and one may say great love until passionate love is very conducive to forgetting. Custom not to erect a monument until after twelve months, because the monument shows importance and within twelve months there is pain; or the reason of the monument is so they not forget him from heart, and the deceased is not forgotten until after twelve months. Custom not to take any item from a mourner's house all seven days of mourning because impure spirit dwells there seven days. Some custom not to measure the cemetery within seven days of burial. Ancients excommunicated taking from the river after a funeral, for once Samaritans made a pretext and killed many Jews. They are careful not to take a shovel or pickaxe directly from another's hand when burying, but throw to the ground and then take. When washing hands they are careful not to take the vessel from the washer's hand immediately. He also wrote they distance at least four amot to say tziduk hadin and kaddish — see Yoreh De'ah siman 376; requires study; see end of siman 581:",
  },
};

Object.assign(PATCH224, PATCH224_ELIAH);

function patch(siman, PATCH) {
  const p = path.join(WORK, `hand-slot5-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const en = PATCH[it.rel]?.[it.key];
    if (en) {
      it.en = en;
      n++;
    }
  }
  fs.writeFileSync(p, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const pf = hand.items.filter((x) => preflightFail(x.en));
  console.log("siman", siman, "patched", n, "preflight-fail", pf.length);
  if (pf.length) {
    for (const x of pf.slice(0, 10)) console.log(" ", x.rel, x.key, preflightFail(x.en));
    process.exit(1);
  }
}

patch(224, PATCH224);
patch(223, PATCH223);
