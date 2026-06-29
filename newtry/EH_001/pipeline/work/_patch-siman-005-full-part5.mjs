#!/usr/bin/env node
/** EH001 siman 005 — full editorial redo part 5: ezer-mikodesh + chokhmat-shlomo + rabbi-akiva-eiger. */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_005/ezer-mikodesh/part-001.txt", "ezer-mikodesh", {
  "1#_": `Seif 14 in Hagahah (feathers from live geese): Custom of the world to pluck feathers from geese before giving them to their pen to fatten, saying thereby they become fattier — call them drying feathers. I haven't heard if nations of world practice thus — not so common that they fatten geese; I already wrote elsewhere regarding their statutes "you shall not walk" — when safek it becomes double safek for leniency: perhaps benefit here and perhaps not statute of idol worshippers — same here; and regarding tzaar baalei chayim though we hold from Torah as explained everywhere — nevertheless since permitted for any human need to fulfill his will on some side as I wrote elsewhere — can say here too since in any event women are uncertain perhaps benefit (also take number that moves from each side and place feathers each side whereby tilts like divination style) — nevertheless since already possible per simple intellect to attribute side of benefit — say it is segulah through some excuse; their loss of mind through plucking so they won't suffer concerns of insufficient fattening and similar — becomes definite human need; today I warned in my house not to do so; seems no deficiency in fattening thereby — so on better side; nevertheless can say as above to vindicate.`,
  "2#_": `(Also found) what I wrote above regarding tzaar baalei chayim: one who travels with wagon driver and tells him to hurry travel even if no need and no benefit at all in any manner — nevertheless no concern since already possible wagon driver will hurry travel through shouting and voice and similar — then not psik reisheih; also no agency here so much; also always possible side of benefit.`,
});

patchFile("siman_005/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo", {
  "1#_": `B'diavad. Atarah itself pierced — here is what poskim omitted law of examination and change between Tur's language and poskim' language — see what I wrote in my composition Yoreh De'ah siman 190 in responsum there — examine.`,
  "2#_": `Seif 9. Pierced one cord from testicular cords, etc. — he is kosher — appears even if emits seed from both these places also kosher — otherwise wouldn't state anonymously in Gemara and poskim to explain this requires examination to see if discharges seed from two places or not; or in any event kosher — so implied from Gemara and poskim above regarding closed semen duct returned to see through urine duct, etc. — implies specifically when closed entirely then disqualified — if not in its place at all then doesn't cook; but if partially in its place doesn't require all seed in place — only that part of it exits in its place also cooks — kosher — so per my view clear and correct.`,
  "3#_": `Seif 14 in Hagahah: permitted to give animal to gentile — see Beit Shmuel s.k. 18 what one can say will castrate all of them; here is what one young scholar challenged me from Shtamak beginning Bava Metzia regarding that cow whose words prove opposite — see there; however asker didn't notice Beit Shmuel's words — from his reasoning challenged Shtamak and wrote his reasoning like Beit Shmuel here; I answered him that so explained in Beit Shmuel but I in responsum settled Beit Shmuel's words in two answers not contradicting Shtamak's words — see there and examine.`,
});

patchFile("siman_005/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger", {
  "1#_": `Siman 8 seif 2 — all whose testicles were wounded. See Sotah 26 Tosafot on "wife of a saris."`,
  "2#_": `Seif 7 Hagahah — to be concerned for Torah prohibition. See Teshuvat Pnei Yehoshua part Even HaEzer siman 15 on "another question"; see Teshuvat Maharival part 3 siman 32.`,
  "3#_": `Seif 14 but to our minor son. Not adult and minor literally — rather all not nearby this is adult; all nearby this is minor; some explained literally adult and minor depends the matter; so Gaonim's view — Ritva.`,
});

console.log("siman_005 full part5 applied");
