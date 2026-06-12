import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const VIEWER_ROOT = path.dirname(fileURLToPath(import.meta.url));

const LOW_CONFIDENCE = 0.75;
const SAFE_C = 0.75;
const SAFE_B = 0.75;
const RISKY_FLAGS = new Set(["possible meaning issue"]);

export function loadLlmConfig() {
  const cfgPath = path.join(VIEWER_ROOT, "llm-config.json");
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  const profileName = cfg.active_profile || "fast";
  const profile = cfg.profiles?.[profileName];
  if (profile) {
    return {
      ...cfg,
      ...profile,
      active_profile: profileName,
    };
  }
  return cfg;
}

export function loadSystemPrompt() {
  return fs.readFileSync(
    path.join(VIEWER_ROOT, "prompts", "validator_system_prompt.txt"),
    "utf8"
  );
}

export function blockId(siman, relPath, seif, marker) {
  return `YD:${relPath}#seif=${seif}#marker=${marker}`;
}

export function buildValidationItem({ siman, relPath, seif, marker, hePlain, enPlain }) {
  return {
    id: blockId(siman, relPath, seif, marker),
    source: hePlain,
    translation: enPlain,
    context: {
      work: "Yoreh De'ah",
      commentary: "Mechaber + Rema",
      siman: String(siman),
      seif: String(seif),
      marker: String(marker),
    },
  };
}

function stripThinking(text) {
  let t = String(text ?? "").trim();
  t = t.replace(/<think[\s\S]*?<\/think>/gi, "");
  t = t.replace(/<think>[\s\S]*?<\/redacted_thinking>/gi, "");
  t = t.replace(/<redacted_reasoning>[\s\S]*?<\/redacted_reasoning>/gi, "");
  return t.trim();
}

export function parseModelJson(rawText) {
  const text = stripThinking(rawText);
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error("Model response did not contain valid JSON.");
  }
}

export function normalizeFlags(flags, label = "", confidence = 0, reason = "") {
  if (!Array.isArray(flags)) return [];
  let raw = flags.map((f) => String(f).trim().toLowerCase()).filter(Boolean);
  const l = String(label).toUpperCase();
  const r = String(reason).toLowerCase();
  const meaningInReason = /inaccura|wrong meaning|distort|changed the meaning|may be wrong/.test(r);

  // Drop contradictory template dumps from small models.
  if (raw.length >= 4) {
    if ((l === "B" || l === "C") && confidence >= SAFE_B) {
      raw = raw.includes("good cleanup") ? ["good cleanup"] : [];
    } else if (l === "A") {
      raw = raw.filter((f) => f === "literal wording" || f === "awkward syntax");
    } else {
      raw = [];
    }
  }

  if (
    (l === "B" || l === "C") &&
    confidence >= SAFE_B &&
    raw.includes("good cleanup") &&
    raw.includes("possible meaning issue") &&
    !meaningInReason
  ) {
    raw = raw.filter((f) => f !== "possible meaning issue");
  }

  return raw;
}

export function shouldEscalate(label, confidence, flags, reason = "") {
  const flagSet = new Set(normalizeFlags(flags, label, confidence, reason));
  if (label === "A" || label === "D") return true;
  if (flagSet.has("possible meaning issue")) return true;
  if (label === "C" && confidence >= SAFE_C) return false;
  if (label === "B" && confidence >= SAFE_B) return false;
  if (confidence < LOW_CONFIDENCE) return true;
  return true;
}

export function isLlmClean(label, confidence, flags, escalate, reason = "") {
  if (escalate) return false;
  return label === "C" || (label === "B" && confidence >= SAFE_B);
}

export async function checkLlmServer(config = loadLlmConfig()) {
  const base = config.server_url.replace(/\/v1\/chat\/completions\/?$/, "");
  try {
    const res = await fetch(`${base}/health`, { signal: AbortSignal.timeout(4000) });
    if (res.ok) return { ok: true, url: config.server_url };
  } catch {
    /* llama.cpp may not expose /health on all builds */
  }
  try {
    const res = await fetch(config.server_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 8,
        messages: [{ role: "user", content: "Reply with OK" }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    return { ok: res.ok, url: config.server_url, status: res.status };
  } catch (err) {
    return { ok: false, url: config.server_url, error: String(err.message || err) };
  }
}

function truncField(text, max = 1800) {
  const s = String(text ?? "");
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
}

export async function callValidator(item, config = loadLlmConfig(), systemPrompt = loadSystemPrompt()) {
  const body = {
    model: config.model,
    temperature: config.temperature ?? 0,
    max_tokens: config.max_tokens ?? 180,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content:
          "/no_think\nReply with JSON only — no thinking tags or prose.\n\nReview this translation item:\n" +
          JSON.stringify(
            {
              id: item.id,
              source: truncField(item.source),
              translation: truncField(item.translation),
              context: item.context,
            },
            null,
            2
          ),
      },
    ],
  };

  if (config.disable_thinking) {
    body.chat_template_kwargs = { enable_thinking: false };
  }

  const res = await fetch(config.server_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout((config.timeout_seconds ?? 120) * 1000),
  });

  if (!res.ok) {
    const details = await res.text();
    throw new Error(`LLM HTTP ${res.status}: ${details.slice(0, 300)}`);
  }

  const responseJson = await res.json();
  const raw = responseJson.choices?.[0]?.message?.content ?? "";
  let parsed;
  try {
    parsed = parseModelJson(raw);
  } catch (err) {
    return {
      id: item.id,
      label: "D",
      confidence: 0,
      reason: `Parse error: ${err.message}`,
      flags: ["possible meaning issue"],
      escalate: true,
      raw_model_response: raw,
      validatedAt: new Date().toISOString(),
    };
  }

  const label = String(parsed.label ?? "").trim().toUpperCase();
  if (!parsed.label || !["A", "B", "C", "D"].includes(label)) {
    return {
      id: item.id,
      label: "D",
      confidence: 0,
      reason: "Parse error: model JSON missing label",
      flags: ["possible meaning issue"],
      escalate: true,
      raw_model_response: raw,
      validatedAt: new Date().toISOString(),
    };
  }
  const confidence = Number(parsed.confidence ?? 0);
  const reason = String(parsed.reason ?? "").trim();
  const flags = normalizeFlags(parsed.flags, label, confidence, reason);
  const escalate = shouldEscalate(label, confidence, flags, reason);

  return {
    id: item.id,
    label: ["A", "B", "C", "D"].includes(label) ? label : "D",
    confidence,
    reason,
    flags,
    escalate,
    clean: isLlmClean(label, confidence, flags, escalate, reason),
    raw_model_response: raw,
    validatedAt: new Date().toISOString(),
  };
}
