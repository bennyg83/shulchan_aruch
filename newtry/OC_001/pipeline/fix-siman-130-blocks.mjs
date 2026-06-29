#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_130/ateret-zekenim/part-001.txt": {
    "1:_":
      "And if not — one should not say thus adir bamarom, etc. — meaning they did not finish even after the shatz finished Ribono shel Olam; then he says adir bamarom, etc.; such is the Talmud's version. But Rif's version is: when the kohanim turn their faces, one should say thus adir, etc. — therefore it is correct to do both as mentioned. Some say Ribono shel Olam when the kohanim say v'yishmerecha, v'yichuneka, and shalom — he thinks well and listens to the blessing, showing himself as receiving the priestly blessing; therefore he says the priestly blessing should be fulfilled and his dream inverted — and it is reasonable to say also while the kohanim say those words (Beit Yosef in the name of Ashkenazim). Some add at the end: and may the priestly blessing come to me and satisfy me. Custom: for v'yishmerecha — u'shmorani; v'yichuneka — v'choneni; shalom — u'seratzani (Maharshal in glosses and Maharam of Padua). Correct per Kabbalah: when the shatz says Elokeinu — the twenty-two-letter name from the priestly blessing through mefalteinu; afterward when the chazzan says Sim Shalom he says Ribono shel Olam, etc. I heard from my teacher Mahar Yushiya of Krakow that he practiced thus, and so do I:",
  },
  "output/siman_130/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One who saw a dream, etc. — through the end of the siman, all in Berakhot 55b; Tur and Levush brought it. Hagah Maimoniy writes Maharam was accustomed to say when they say v'yishmerecha, v'yichuneka, shalom — Ribono shel Olam ani shelcha, etc.; Tanya Rabati siman 27: be careful to say it when they prolong on the kaf of v'yishmerecha and v'yichuneka — from Ve'elu Ne'emarin (Sota 40a): a servant whose master blesses him and he does not explain; although at shalom one cannot wait until the word finishes since they prolong before the mem, nevertheless what can be repaired we do; Beit Yosef, Levush 128:26, Orach Tzedek, Magen Avraham note 73. In Sha'ar HaKavanot 91b: when reaching v'yismech l'cha shalom the dreamer says Ribono shel Olam ani shelcha as in the siddur — can complete with finishing Birkat Kohanim so the congregation answers Amen; Bach siman 48; one should say it until v'yismech l'cha shalom, only once; see below note 4:",
  },
  "output/siman_130/baer-heitev/part-001.txt": {
    "1:א":
      "A dream — excluding those who say it daily. It only helps if said on the day he saw the dream. It does not appear that therefore all Israel say it on the festival because all saw a bad dream that day; rather about dreams on other days; nevertheless improper daily. Magen Avraham; Taz wrote not to say daily unless a dream the prior night; at festival when ascending the duchan he may say even without specification, for dreams in the interim; Peri Chadash:",
    "1:ג":
      "And if not — if he finished Ribono shel Olam before the kohanim finished, he says adir bamarom to finish with them; therefore no adir bamarom if finished with kohanim. They do not practice so; even if finished with kohanim they still say adir bamarom. Taz:",
  },
  "output/siman_130/magen-avraham/part-001.txt": {
    "1:ב":
      "And your dreams — between dreams I dreamed about others and dreams I dreamed about myself, etc., one must request for one's fellow first [Berakhot, Maharam]; and conclude: u'shmorani against v'yishmerecha, v'choneni against v'yichuneka, u'seratzeni meaning shalom [Mateh Moshe and so the custom, not like Maharshal]:",
  },
  "output/siman_130/mishnah-berurah/part-001.txt": {
    "1:ד":
      "(4) And your dreams, etc. — Magen Avraham wrote one should say: between dreams I dreamed about others and dreams about myself; but in our siddurim the text is reversed — between myself and between, etc.; Eliyah Rabbah agreed. Acharonim wrote: conclude in this prayer the first time u'shmorani when the kohanim finish v'yishmerecha, second v'choneni against v'yichuneka, third u'seratzeni against shalom; Maharshal adds good to say third time: and may the priestly blessing come upon me and satisfy me (Eliyah Rabbah, Magein Giborim, see there). When lifting hands on Yom Tov falling on Shabbat, do not say Ribono, for we do not say tachanun on Shabbat unless he dreamed a bad dream that night (Acharonim):",
  },
  "output/siman_131/ateret-zekenim/part-001.txt": {
    "2:_":
      "Some say one may not prostrate except where there is an ark and Torah scroll — R' Elazar ben Hyrcanus, in the golden chapter of Shemot, was there and presumably did not pray in the synagogue and fell on his face (see Yoreh De'ah siman 334 seif 2) — one must say he had an ark and Torah in a room, or that when the congregation prayed he fell prostrate while seated, as Beit Yosef per Kabbalists. But some say one need not be particular that prostration be seated; if he wishes to act, the choice is his (Shitat R' Yosef Taitazak, Rivash siman 412); and so Maharil — he fell standing if it happened he finished his prayer when the congregation began tachanun: he stood in his place and did not immediately return to his prayer place and fell on his face standing — therefore one need not be particular:",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map((b) => serializeBlock(b))
    .join("\n\n");
  if (n) {
    fs.writeFileSync(file, out, "utf8");
    console.log(file, n);
  }
}
