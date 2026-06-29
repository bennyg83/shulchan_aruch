import fs from "fs";
import { FIXES as PART } from "./_fixes-siman651-manual-part.mjs";

const long = {
  "chokhmat-shlomo/part-001.txt": {
    "1:_":
      "Seif 1: mitzvah of four species — each takes one lulav, two aravot, three hadasim. Note: source Sukkah 34b; dispute R' Yehuda, Tanna Kamma, R' Akiva. Difficulty: why challenge to expound like R' Akiva who is lenient? If we require two willows or R' Akiva one, it depends on hadas dispute; perhaps did not expound R' Akiva lest aravah sellers lose price; a fortiori on aravah would be absurd; therefore expounded R' Tanna Kamma only — requires study.",
    "2:_":
      "(Seif 2) Take the binding in the right hand, heads upward, etc. See Magen Avraham: why teach these three mitzvot separately — everything one blesses on one takes in the right. For those who hold an ambidextrous person also takes in the right — from the blessing one takes in the right of the world; good reason for these three mitzvot. For those who follow his right side: etrog is written first in \"fruit of a beautiful tree\"; Berakhot — earlier in the verse is earlier in blessing; etrog has precedence; nevertheless one blesses on the lulav because blessing on lulav is d'oraisa and on etrog d'rabbanan; therefore need a reason for three — also one blesses on it and it is three mitzvot — lulav is preferable to verse precedence. If he took lulav in the left and etrog in the right he would bless on the etrog since it is in the right and earlier in the verse; but because lulav has three mitzvot it is rightfully in the right, then one blesses on it. Gemara: because it is tall among the species — for the other species on the lulav, since they are also in the right one could bless on them; therefore needed the reason that it is tallest; Rashi's language of \"binding\" shows the reason is only why not bless on the two species bound with the lulav, not the etrog. Gemara still challenges tallness for etrog; without the other species, lulav still precedes them and is earlier in the verse. Therefore the reason of tallness is only against etrog's precedence in the verse for the lulav. Difficulty: why challenge tallness for etrog — for hadas and aravah do not say the same, since lulav is three mitzvot and etrog one, more worthy to bless on lulav. Among the three species lulav is first since tallest. Per my view, if only one reason for both — right and blessing — all from three mitzvot, still etrog should precede as earlier in the verse; needed reason in its species it is tallest. Gemara: since one can elevate and bless, only reason of three mitzvot remains — should precede etrog by verse; or even in the left, verse precedence is rejected for lulav in the right. Therefore in its species tallest — with all reasons together, verse precedence of etrog is rejected; take lulav in the right and bless. Torah preceded etrog — see derush Sukkot 588 in Aggadah. Shulchan Aruch: take binding in right — how if reversed? Acharonim expanded; Gemara Lulav haGazul 41b: Rabbah — lulav right etrog left, sometimes they switch and invalidate. Why \"come to switch\" — implies by itself; actually one must switch — Rashi: must switch. Here, large etrog — fear switching will invalidate; b'dieved as law not to switch; fear lest it switch by itself — proves b'dieved; time of need is b'dieved. Can reject: could give to another or place on ground — fear he will switch in hands — no proof — requires study.",
    "4:_":
      "(Seif 7) If one made a handle and placed the lulav in it, it is valid, etc. See Magen Avraham: if the entire lulav is outside the hand it is invalid through interposition; if fixed with nails there is no interposition — Tosafot Yoma 44b in name of Yerushalmi: with nails fixed, no interposition — the same for lulav. Need not say entire lulav outside hand — case: lulav in hand, handle fixed, no interposition. Shulchan Aruch: if wrapped cloth — see Magen Avraham, Levush, Rambam dispute — see my Chidushei OC on 639.",
    "5:_":
      "(Seif 10) Circle via the right when shaking east, south, west, north. Wonder: all poskim imply every direction only via right, even in the hand; so too Chanukah. Overlooked Yoma 59a: inquiry whether circling with feet — we learn \"faces\" from outside; dispute hand vs foot circling — for foot, not hand — Rambam holds like stam Gemara. Gemara concludes dispute hand or foot; stam inquiry whether all mitzvot need intent — lulav needs intent since ulekachtem — remains inquiry; stam must bless again. Shechitah: vazavacht — need intent for action; Yoma: intent for taking; lulav ulekachtem — intent for taking; mitzvah intent depends on dispute. If took without intent — depends on Yoma inquiry; for us, stam must bless. No proof lulav needs no intent — challenge from tall resolves Yoma. Yoma: intent for taking, not mitzvah. Difficulty why Yoma remains in inquiry — shechitah clearly without action intent is invalid. Yoma: frequent entry between fingers even without intent is like intended — psik reisha lemavet. Lulav needs taking intent; mitzvah intent not required. Difficulty Avuhah diShmuel — matzah; see Sefer Chayim 589; my Chidushei OC 641. Rambam did not copy Gemara on reversed — see 639. Bless on taking lulav and shehecheyanu before etrog — see Tosafot, Taz; words of poskim difficult — report on Magen Avraham and Matmonot vs Dagul Merevavah; custom of Israel is Torah; fulfill both. Waving like Shema — below then above; lulav alludes victory on Rosh Hashanah — therefore bless on it — see my derush Sukkot.",
    "7:_":
      "(Seif 15) If leaves fell within the binding in a way that interrupts — no concern. See Tosefot Menachot 89: partners and kohen — interposition; in my view partners are interposition; kohen and owner are min b'mino since they need each other — see Tosefot Beitzah, Kelim 8:1 — requires study.",
  },
  "peri-megadim/part-001.txt": {
    "5:_":
      "Before — Tosafot Sukkah 39a; Levush: intend not to fulfill; Taz will forget. Magen Avraham 62:4 — Raah, Rashba; Beit Yosef 589 intent required; matzah different. See siman 656.",
    "10:א":
      "The shaking — Ran on Yerushalmi: three times per item; R' Zeira's inquiry; Ritz Giat; Rava up down bring take; three motions not four; going and bringing may count one; need two goings, two bringings, up down — three; no spine and leaves shaking per Rashi Menachot 62a and Iyun Tov.",
    "10:ב":
      "What Tur wrote — Taz: summary of Rosh; Beit Yosef: Rosh third view in Ran; small pairs in going and bringing; Ra\"sh six motions; Ran three or six per R' Zeira.",
    "15:_":
      "Take — Taz: Rosh on prayer leader shaking; at blessing before Hallel; without etrog shake at Hallel only — see Maharil responsa.",
  },
  "turei-zahav/part-001.txt": {
    "14:_":
      "Do not add — Tur and Beit Yosef on imprecise language; Gemara teaches we do not add even without binding; even after fulfilling, holding lulav later for love of mitzvah — do not diminish by taking three alone.",
    "7:א":
      "If wrapped cloth — Tosafot 37b Rabbah and Rava; wrapping on hand not interposition; handle from cloth valid; vessel case: hand under edges.",
    "9:ב":
      "Shaking lulav — Ran vs Ra\"sh; Tur mixed; Beit Yosef answered; Rama within Ra\"sh; Rosh stringent in responsa.",
    "9:ג":
      "Some say not to invert — learn from two loaves on lambs: lower like raise; diagonal lowering; only up down after sides — better not invert.",
  },
};

const fixes = { ...PART, ...long };
fs.writeFileSync(
  path.join("pipeline", "_fixes-siman651-manual-slot17.mjs"),
  "export const FIXES = " + JSON.stringify(fixes, null, 2) + ";\n"
);
console.log("wrote", Object.values(fixes).reduce((n, o) => n + Object.keys(o).length, 0), "keys");
