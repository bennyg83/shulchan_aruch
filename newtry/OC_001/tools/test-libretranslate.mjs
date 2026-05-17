#!/usr/bin/env node
/**
 * Quick check that LibreTranslate is reachable and Hebrew→English works.
 *
 *   set LIBRE_URL=http://localhost:5000
 *   node tools/test-libretranslate.mjs
 */
const base = (process.env.LIBRE_URL?.trim() || "http://localhost:5000").replace(/\/$/, "");
const apiKey = process.env.LIBRE_API_KEY?.trim();

async function main() {
  console.log("LIBRE_URL:", base);

  const langRes = await fetch(`${base}/languages`);
  if (!langRes.ok) throw new Error(`GET /languages → ${langRes.status}`);
  const langs = await langRes.json();
  const codes = langs.map((l) => l.code);
  console.log("Languages loaded:", codes.join(", "));
  if (!codes.includes("he") && !codes.includes("iw")) {
    console.warn("Warning: Hebrew (he) not in language list — check LT_LOAD_ONLY=en,he");
  }

  const payload = {
    q: "שבת",
    source: "he",
    target: "en",
    format: "text",
  };
  if (apiKey) payload.api_key = apiKey;

  const trRes = await fetch(`${base}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await trRes.text();
  if (!trRes.ok) throw new Error(`POST /translate → ${trRes.status}: ${body.slice(0, 200)}`);
  const j = JSON.parse(body);
  console.log("Sample translation:", JSON.stringify(j.translatedText));
  console.log("OK — LibreTranslate is ready for OC001 (--backend libre or auto chain).");
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  console.error("Start server: cd newtry/OC_001 && npm run libre:up");
  process.exit(1);
});
