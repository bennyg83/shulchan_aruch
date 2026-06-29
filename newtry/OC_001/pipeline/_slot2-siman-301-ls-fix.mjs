#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [`levushei-serad:1:_`, `Taz s.k. 1 — to see afterward something pleasurable — as Bach explained, brought Magen Avraham s.k. 4: permitted run to see thing he will enjoy afterward even if running itself not for pleasure; explained thus because they relied on this law regarding running.`],
  [`levushei-serad:2:_`, `Magen Avraham s.k. 1 — even on weekdays. Rama: forbidden stride on Shabbat — on weekday only danger to eyesight; on Shabbat prohibition also exists.`],
  [
    `levushei-serad:3:_`,
    `s.k. 5 (Beit Yosef in name Tosefta), brought Taz s.k. 1: Taz explained reason — since pleasure only afterward; stroll permitted even though pleasure comes later, for stroll itself has no prohibition. Magen Avraham per his view in s.k. 4 Bach's words: permitted run for pleasure that follows — therefore challenged; answer: for healing as siman 328; therefore stroll permitted, not evident done for healing; running evident for healing forbidden. Similar Magen Avraham there s.k. 37.`,
  ],
  [`levushei-serad:4:_`, `s.k. 6 — in place where permitted — for mitzvah matter they did not decree squeezing; therefore preferable pass through water than go around; here for optional matter, passing through is worse.`],
  [`levushei-serad:5:_`, `Taz responsum 2 — or face of one greater — appears if goes to his student as stated.`],
  [`levushei-serad:6:_`, `s.k. 3 — specifically going permitted — guarding money not fully optional matter as stated; but mitzvah too not called to permit return as well.`],
  [
    `levushei-serad:7:_`,
    `Magen Avraham s.k. 9 (and siman 334 s.k. 26 in gloss) — intends resolve Gemara question: what practical difference if Shulchan Aruch writes liable or not — no difference now. Therefore answered: practical difference for what Rama wrote there in gloss — one liable for chatas gives eighteen plain coins to charity — see there.`,
  ],
  [`levushei-serad:8:_`, `s.k. 12 — Shabbat not time for tefillin, forbidden lay them; Gemara did not need this reason except per view Shabbat not time for tefillin.`],
  [`levushei-serad:9:_`, `There siman 308 s.k. 64 in Magen Avraham s.k. 11: although Shabbat not time for tefillin, nevertheless not forbidden lay them.`],
  [`levushei-serad:10:_`, `Taz responsum 5 — unpierced needle and ring without seal — if went out not liable chatas as stated — ornaments for woman, rabbinic prohibition lest remove and show.`],
  [`levushei-serad:11:_`, `There — if went out liable — these not ornaments for woman.`],
  [`levushei-serad:12:_`, `There — placed in her hand — on her finger; therefore always way of carrying out thus.`],
  [`levushei-serad:13:_`, `There — how is man liable for needle etc. — meaning on needle Gemara difficulty remains.`],
  [`levushei-serad:14:_`, `There — is burden for man — no way man uses them at all; if liable in this liable in that; nevertheless exempt — not way of carrying out.`],
  [`levushei-serad:15:_`, `There — since not his way, no obligation etc. — as any matter in world: burden for him, woman liable etc. as stated.`],
  [`levushei-serad:16:_`, `There — as any matter in world, even thing not his way carry at all, even ornament.`],
  [`levushei-serad:17:_`, `There — for so is always her way etc.; since her way thus with unpierced, therefore pierced is in any case way of carrying and liable.`],
  [`levushei-serad:18:_`, `There — no way carry needle; implies from wording exempt even if carried in hand.`],
  [`levushei-serad:19:_`, `There — but surely as stated exempt as long as did not carry in hand as stated.`],
  [`levushei-serad:20:_`, `Shulchan Aruch seif 9 — not ornament — for man did not decree lest remove and show because not his way; but thing that is ornament for man and woman — Rabbanan did not distinguish, forbade man too.`],
  [
    `levushei-serad:21:_`,
    `There Taz — Geonim wrote like Rashi here etc. as stated; Geonim, Ramban, Rashba explained like Rashi z"l: Ulla only on ring, not needle; disputed Rosh on needle: Rosh holds Rashi exempts man pierced and unpierced; they hold per Rashi man and woman equal on needle.`,
  ],
  [
    `levushei-serad:22:_`,
    `Magen Avraham s.k. 17 — if knife inside — law of eyeglass case in gloss: if eyeglasses inside case forbidden; case alone permitted. Appears: even if case and sheath covered all sides, unknown if utensil inside permitted — case made for ornament and use; permitted as attached in binding. Therefore Rama wrote nevertheless etc. — therefore forbade only if eyeglasses inside — requires study.`,
  ],
  [`levushei-serad:23:_`, `Gloss seif 11 — forbidden go out with case — silver case fixed on silver chain hung as ornament; so Beit Yosef — those going in hand forbidden anyway; as I wrote in letter 16.`],
  [
    `levushei-serad:24:_`,
    `Taz s.k. 6 — and some hold thus — they explained Yerushalmi regarding made for man and woman; as I wrote letter 21; for ornament and use not concerned viewer says etc.; therefore key permitted man and woman since fixed, not easy to remove — explained Beit Yosef from poskim. Question: Taz conclusion "for man did not decree" — key is ornament for women too, should forbid man; if not fixed, woman too permitted? Perhaps Taz conclusion not on key but teaches: thing made for man alone for ornament and use permitted even if not fixed.`,
  ],
  [`levushei-serad:25:_`, `s.k. 7 — because ornament — even if say not batel to belt, nevertheless key itself if silver ornament; not concerned lest remove entire belt — as previous letter.`],
  [`levushei-serad:26:_`, `There second — because batel — even if key itself ornament, can say batel.`],
  [`levushei-serad:27:_`, `There — permission with silver chain — iron and copper not called ornament, forbidden.`],
  [`levushei-serad:28:_`, `There — zankeil in woven belt — explained woven in belt like ring for ornament, key fixed there; Taz s.k. 6.`],
  [`levushei-serad:29:_`, `There — as ornament etc. — iron key Beit Yosef in name Rosh: women hang on neck as ornament.`],
  [
    `levushei-serad:30:_`,
    `There Rama here on iron — language of question; Rama forbids one view even full attachment that is ornament; other view permits if batel to belt or permanent knot on long belt as Taz note 14; see there.`,
  ],
  [`levushei-serad:31:_`, `There — fixed in middle of belt — not permitted unless silver as ornament; requires permanent knot as Taz note 14.`],
  [`levushei-serad:32:_`, `There — or colored threads — manner no concern lest remove as letter 24.`],
  [`levushei-serad:33:_`, `Magen Avraham s.k. 29 — not way of carrying out — challenged from seif 8: pierced liable.`],
  [`levushei-serad:34:_`, `Shulchan Aruch seif 13 — lest soil — we hold all soiling is burden, permitted only as garment-wearing as siman 302.`],
  [`levushei-serad:35:_`, `Magen Avraham s.k. 20 — ties with straps — such not called garment.`],
  [`levushei-serad:36:_`, `Shulchan Aruch seif 13 — she not distress — since intent for distress, even saved from soiling permitted; so Magen Avraham s.k. 20.`],
  [`levushei-serad:37:_`, `Taz s.k. 9 — to proclaim himself — and less than that case where woman gives husband etc. — Magen Avraham s.k. 16.`],
  [`levushei-serad:38:_`, `s.k. 21 — not established — but even without tying permitted as siman 303.`],
  [`levushei-serad:39:_`, `Magen Avraham s.k. 23 — and so seif 13 — as letter 36.`],
  [`levushei-serad:40:_`, `Shulchan Aruch seif 16 — not need his walking — forbidden since not need his walking, not his shoe.`],
  [`levushei-serad:41:_`, `seif 16 — on his feet somewhat — like his shoe since leans on feet somewhat; forbidden only if no need walking.`],
  [`levushei-serad:42:_`, `There — on chair and small stools in hand permitted as stated — since need walking permitted like staff seif 17.`],
  [`levushei-serad:43:_`, `There — may go out with them — ornament since need his walking.`],
  [`levushei-serad:44:_`, `There — wooden shoe — this law in Beit Yosef end siman — unlike R' Yehudai ben Nuri Shabbat 66.`],
  [
    `levushei-serad:45:_`,
    `There — also pantofles — our language fantofil; though slip quickly (Darkhei Moshe: no concern fall and carry d'oraisa reshut ha-rabbim) — permitted as Taz s.k. 27 end.`,
  ],
  [`levushei-serad:46:_`, `Taz s.k. 10 — garment that absorbs — can bring via garment; see this law Taz s.k. 23.`],
  [`levushei-serad:47:_`, `Shulchan Aruch seif 17 — without staff permitted — cannot walk at all without staff — like his shoe; Rosh responsum 22:1.`],
  [`levushei-serad:48:_`, `Taz s.k. 12 — regarding carrying on shoulder — this law siman 522 Magen Avraham see there.`],
  [`levushei-serad:49:_`, `Magen Avraham s.k. 27 — to be ornament — difficult: he wrote himself s.k. 14 liable in hand even woman unpierced.`],
  [`levushei-serad:50:_`, `There — also implied Tosafot 62 — Gemara: expert amulet should forbid lest need bathroom; Rashi: ornament since heals.`],
  [`levushei-serad:51:_`, `There — key in hand — gold key in hand, colleagues rebuked; Beit Yosef: not hung on neck — maris ayin.`],
]);

const f = "output/siman_301/levushei-serad/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(f, "utf8"));
const out = blocks
  .map((b) => {
    const key = `${b.slug}:${b.seif}:${b.marker}`;
    const en = fixes.get(key);
    return en ? { ...b, en } : b;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(f, out);
const missing = blocks.map((b) => `${b.slug}:${b.seif}:${b.marker}`).filter((k) => !fixes.has(k));
console.log("Levushei Serad:", fixes.size, "missing:", missing.length);
if (missing.length) process.exit(1);
