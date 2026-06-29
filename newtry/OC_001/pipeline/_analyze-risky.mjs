#!/usr/bin/env node
import fs from "fs";
import { translateCite443 } from "./lib/translate-cite-443.mjs";
import { translateCite446 } from "./lib/translate-cite-446.mjs";

const PREFLIGHT = [
  /Lord'?s Prayer/i,
  /Hashem'?s Word/i,
  /\bHashem\b/i,
  /strike in/i,
  /Capernaum/i,
  /&quot;/,
  /\bthere in the\b/i,
  /According to the/i,
  /\bin me\b/i,
  /Darbanan/i,
  /hand recoils/i,
  /first dish/i,
  /allocated/i,
  /Shield of Abraham/i,
  /Saturday/i,
  /\bgentiles\b/i,
  /proscri/i,
  /Holy Spirit/i,
  /Holy Qur/i,
  /FIFA/i,
  /KGB/i,
  /\bIDF\b/i,
  /\bUN\b/i,
];

function cleanEn(s) {
  return s
    .replace(/\bgentiles\b/gi, "non-Jews")
    .replace(/\bGentiles\b/g, "Non-Jews")
    .replace(/proscribed/gi, "forbade")
    .replace(/proscription/gi, "prohibition")
    .replace(/permissable/gi, "permitted")
    .replace(/Status of/g, "The law of")
    .replace(/Contain /g, "Contains ")
    .replace(/&quot;/g, '"');
}

function needsRetranslate(en) {
  return PREFLIGHT.some((r) => r.test(en)) || (en || "").length < 8;
}

for (const [n, citeFn] of [
  [443, translateCite443],
  [446, translateCite446],
]) {
  const o = JSON.parse(fs.readFileSync(`pipeline/he${n}-export.json`, "utf8"));
  const risky = [];
  for (const [k, v] of Object.entries(o)) {
    const slug = k.split("/")[0];
    let en = v.en;
    if (slug === "beer-hagolah") en = citeFn(v.he);
    else if (!needsRetranslate(en)) en = cleanEn(en);
    else risky.push(k);
  }
  console.log("siman", n, "risky", risky.length);
  fs.writeFileSync(`pipeline/risky${n}.txt`, risky.join("\n") + "\n");
}
