#!/usr/bin/env node
/** Generate mechaber translations simanim 141–155 — engine + manual overrides. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { translateMechaberHtml } from "./_patch-siman-141-155-mechaber-engine.mjs";

const work = path.dirname(fileURLToPath(import.meta.url));
const he = JSON.parse(fs.readFileSync(path.join(work, "_mechaber-141-155-he.json"), "utf8"));

/** Hand translations — override engine where quality matters. */
const MANUAL = {
  "141": {
    "1#main": `Law of agency and return from the agent. It contains 69 seifim.

A woman may appoint an agent to receive her get from her husband's agent — when does this apply? When she appointed another agent to receive it from him. But if she told the husband's agent, "Let this get be a deposit with you," or told him, "You are my agent to receive it for me" — {Rama: some say even if she only said "it shall be received" (Beit Yosef in name of Ramban and Rashba)} — behold she is doubtfully divorced until the get reaches her hand; and once it reaches her hand she is certainly divorced.

{Rama: If a woman told her agent to receive the get from her husband's hand — he may not receive it from his agent's hand; but if she said "Receive the get from my husband," he may receive it from his agent's hand (responsum Rashba 1007). Some say a woman may not appoint an agent to receive from her husband's agent's hand.}`,
    "2#main": `A betrothed maiden — even though she is divorced by receiving her get in her hand as her father's reception — her father may appoint a reception agent; but she may not appoint a reception agent unless she has no father or she married.`,
    "3#main": `A minor girl — even if she has no father or she married — may not appoint a reception agent; but her father may do so if she is betrothed.`,
    "4#main": `One who betrothed a minor through her father and divorced her while she was a minor (while she was betrothed and her father lives) (Tur) — her father receives her get and not she, without his knowledge. Some say she may receive her get.`,
    "5#main": `If she married — her father may not receive her get.`,
    "6#main": `Her father betrothed her while she was a minor and he died or she married — if she is discerning between her get and another matter, meaning they give her a bundle and throw a nut and she takes it — some say this means when she reaches the age of discernment, meaning a six-year-old or seven-year-old, each according to her sharpness (Tur) — she is divorced through herself. If she is not discerning and divorced through herself she is not divorced; but through her father she is divorced even if she is not discerning. Some dispute and say that whoever is not discerning is not divorced even through her father.

{Rama: See above in the order of the get, seif 96, how they write for a minor divorced through her father.}`,
    "7#main": `Wherever a minor has a hand to receive her get she has courtyard status (or alternate version) (Mishneh Torah glosses ch. 5) to receive it as an adult has.`,
    "8#main": `When she appoints a reception agent she must do so before two witnesses, and the get must be received before two — even if the two who testify to the agency testify to receiving the get, or one testifies to the agency and one to the reception and one joins each to testify to this and that.

{Rama: And ab initio the husband should not hand the get to the agent until it is clarified first that a reception agent was appointed before witnesses (Mordechai beginning of HaTekabel in name of Maharam).}`,
  },
  "142": {
    "1#main": `Law of one who brings a get from abroad. It contains 18 seifim.

An agent who brought a get from place to place abroad, or from Eretz Yisrael abroad, or from abroad to Eretz Yisrael — if the agent was present at the time the get was written and signed, he says before two: "Before witnesses it was written and before witnesses it was signed," and then gives it to her before them and she is divorced by it — even though its witnesses are not known to us; and even if the witnesses' names were Samaritan names we are not concerned. If the husband comes and contests we pay no attention to him. Therefore even women who are not believed to say "my husband died" are believed to bring this get and say "before witnesses it was written and before witnesses it was signed." Likewise an agent who brought a get from Eretz Yisrael and said "before witnesses it was written and before witnesses it was signed" — even though he need not — if the husband comes and contests we pay no attention. If the agent was not present at writing and signing — it should not be given to her unless validated by its signatures; and the agent may be among the three who validated it. If it was not validated and he gave it to her it is invalid until validated. If the husband comes and contests and it was not validated she is not divorced. If the get was lost behold she is doubtfully divorced. And why did they require saying "before witnesses it was written and before witnesses it was signed" abroad? So the woman need not validate it if the husband comes and contests, because witnesses are not available from place to place abroad. It seems to me that nowadays even in Eretz Yisrael one must say "before witnesses it was written and before witnesses it was signed."

{Rama: And nowadays one who brings a get — even from house to house in one city — must say "before witnesses it was written and before witnesses it was signed" (Tosafot beginning of Gittin). And see above siman 141 seif 55 that one should not give it when the husband is in the city. Some say if the agent has authorization and wrote therein who the get witnesses are, this is called validated by its signatures — then the agent need not say "before witnesses it was written and before witnesses it was signed" (Rashba siman 561 and Mordechai beginning of HaTekabel). Some dispute and say authorization is not called validation (Rivash siman 318 and in the orders) — and so is the custom: the agent says "before witnesses it was written and before witnesses it was signed" even when he has authorization, and one should not change this.}`,
  },
  "151": {
    "1#main": `A scribe who erred in the get and the receipt. It contains one seif.

The scribe wrote the receipt and the get and erred and gave the receipt to the man and the get to the woman, and they gave them to each other thinking she was divorced — and after some time the husband contested saying she was not divorced, that he gave her only the receipt and the get is still in his hand. If she has not yet remarried he is believed and divorces her now and she is permitted from now. If he did not divorce her and she stood up and remarried she must leave both this and that and all thirteen ways apply to her. If the husband did not contest until after she remarried he is not believed to forbid her — behold she has presumption of divorcee, for we assume it fell from her and he found it.`,
  },
  "153": {
    "1#main": `Law of one who finds a get in the marketplace — to whom should it be returned. It contains one seif.

One who finds a woman's get in the marketplace — if the woman gives a distinguishing mark, saying there is a hole beside such-and-such letter, and says she was already divorced by it and it fell from her — they return it to her even if the husband contests and says it fell from him and he never divorced her but ordered it written and it was not yet given; even if he too gives a mark in it. If she does not give a mark in it and the husband contests — they do not give it to him or to her. If the husband admits he wrote it and says to give it to her to divorce at the proper place and time — there is no concern it fell later as explained in siman 132 — they give it to her and she is divorced by it from now. If not they do not give it to her. If he admits she was divorced by it and she asks to collect her ketubah with it and he says he already paid and she returned it to him and it fell from him — they return it to her even if she does not say "there is a hole beside such-and-such letter" but only another mark that is not so definitive, such as saying so many finger-widths along the length or width of the get, or the measure of the tied string; but if she said the get was long or short and does not specify its measure, or the string white or black, or that it was placed in a pouch or wallet — that is not a mark to return it to her through it.`,
  },
};

const SIMANIM = Array.from({ length: 15 }, (_, i) => String(141 + i).padStart(3, "0"));
const MECHABER = {};

for (const sim of SIMANIM) {
  MECHABER[sim] = {};
  for (const [key, heb] of Object.entries(he[sim] || {})) {
    if (MANUAL[sim]?.[key]) {
      MECHABER[sim][key] = MANUAL[sim][key];
    } else {
      try {
        MECHABER[sim][key] = translateMechaberHtml(heb);
      } catch (e) {
        console.error(`FAIL ${sim} ${key}:`, e.message);
        MECHABER[sim][key] = "See Hebrew source.";
      }
    }
  }
}

function writeChunk(sims, outName) {
  const lines = [`/** Mechaber — simanim ${sims[0]}–${sims[sims.length - 1]} EH001 FULL REDO */`, "export const MECHABER = {"];
  for (const sim of sims) {
    lines.push(`  "${sim}": {`);
    for (const [k, v] of Object.entries(MECHABER[sim] || {}).sort()) {
      const esc = v.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
      lines.push(`    "${k}": \`${esc}\`,`);
    }
    lines.push("  },");
  }
  lines.push("};", "");
  fs.writeFileSync(path.join(work, outName), lines.join("\n"), "utf8");
  let n = 0;
  for (const sim of sims) n += Object.keys(MECHABER[sim] || {}).length;
  console.log(`${outName}: ${n} blocks`);
}

writeChunk(["141"], "_patch-siman-141-mechaber.mjs");
writeChunk(["142", "143", "144", "145"], "_patch-siman-142-145-mechaber.mjs");
writeChunk(["146", "147", "148", "149", "150"], "_patch-siman-146-150-mechaber.mjs");
writeChunk(["151", "152", "153", "154", "155"], "_patch-siman-151-155-mechaber.mjs");
