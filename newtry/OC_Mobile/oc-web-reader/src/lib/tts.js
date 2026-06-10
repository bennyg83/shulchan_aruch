import { useState, useRef, useCallback, useEffect } from "react";
import { noteVisibleForLanguages } from "./corpus.js";

export const DEFAULT_ENGLISH_ACCENT = "en-us";
export const DEFAULT_HEBREW_VOICE = "he-il";

/** @typedef {'en-us' | 'en-gb' | 'en-au'} EnglishAccent */
/** @typedef {'he-il'} HebrewVoicePreset */

export const ENGLISH_ACCENT_OPTIONS = [
  {
    id: "en-us",
    label: "American (male)",
    lang: "en-US",
    sample: "This is the American English reading voice.",
  },
  {
    id: "en-gb",
    label: "British (male)",
    lang: "en-GB",
    sample: "This is the British English reading voice.",
  },
  {
    id: "en-au",
    label: "Australian (male)",
    lang: "en-AU",
    sample: "This is the Australian English reading voice.",
  },
];

export const HEBREW_VOICE_OPTIONS = [
  {
    id: "he-il",
    label: "Israeli (male)",
    lang: "he-IL",
    sample: "זהו קול הקריאה בעברית.",
  },
];

const FEMALE_MARKERS =
  /\b(female|woman|girl|zira|hazel|susan|samantha|karen|victoria|fiona|tessa|serena|kate|moira|allison|ava|emma|sara|joanna|amy|nicole|linda|heather|sonia|veena|lekha|carmit|sandy|lisa|jenny|lucy|emily|sophie|olivia|mia|nicky|nora|ellen|helen|jill|mary|nancy|sarah|laura|michelle|melissa|stephanie|rachel|rebecca|claire|diana|donna|elizabeth|faye|grace|hannah|iris|jane|jessica|kim|lily|maya|natalie|penelope|queen|ruby|sally|tina|wendy|yuki)\b/i;

const MALE_MARKERS =
  /\b(male|man|boy|alex|fred|daniel|aaron|arthur|gordon|nigel|oliver|thomas|james|david|mark|paul|george|richard|lee|rishi|reed|liam|noah|ethan|mason|logan|jack|henry|william|benjamin|samuel|michael|andrew|brian|bruce|charles|chris|christopher|don|eric|frank|harry|ian|jason|john|jonathan|joseph|kevin|matthew|nathan|patrick|peter|philip|raymond|robert|roger|ronald|ryan|scott|sean|simon|stephen|steve|timothy|tony|victor|walter|will|yannick)\b/i;

/** Regional / non-standard voices to reject when picking English accents. */
const EXCLUDED_VOICE_MARKERS =
  /\b(welsh|cymru|cymraeg|cy-gb|cy_gb|gwyneth|geraint|dylan|sioned|aned|rhys|ioan|gwyb|scottish|gaelic|ga-ie|ga_ie|irish gaelic)\b/i;

const PRESET_MALE_HINTS = {
  "en-us": [
    "us english male",
    "google us english male",
    "en-us-x-sfg",
    "en-us-x-iom",
    "en-us-x-tpf",
    "aaron",
    "fred",
    "alex",
    "david",
    "james",
    "mark",
    "paul",
    "michael",
    "john",
    "male",
    "google us english",
  ],
  "en-gb": [
    "uk english male",
    "british english male",
    "google uk english male",
    "en-gb-x-gbd",
    "en-gb-x-gbg",
    "en-gb-x-rkd",
    "daniel",
    "arthur",
    "oliver",
    "thomas",
    "george",
    "nigel",
    "rishi",
    "male",
  ],
  "en-au": [
    "australian english male",
    "google australian english male",
    "en-au-x",
    "gordon",
    "lee",
    "james",
    "male",
    "google australian english",
  ],
  "he-il": ["hebrew male", "israeli male", "he-il-x", "lior", "avraham", "david", "male", "israel", "hebrew"],
};

export function stripForSpeech(html) {
  if (!html) return "";
  const d = document.createElement("div");
  d.innerHTML = html;
  return (d.textContent || "").replace(/\s+/g, " ").trim();
}

export function queueForSection(sectionId, text, lang) {
  return [{ id: sectionId, text, lang }];
}

export function queueInterwoven(
  seifNum,
  seifData,
  visibleCommentators,
  commentators,
  showHebrew = true,
  showEnglish = true
) {
  const p = `int-${seifNum}-`;
  const items = [];
  const mr = seifData.mechaber_rama;

  items.push({ id: `${p}mr`, text: `Seif ${seifNum}.`, lang: "en-US" });

  if (showHebrew) {
    const heText = stripForSpeech(mr?.hebrew || "");
    if (heText) items.push({ id: `${p}mr-he`, text: heText, lang: "he-IL" });
  }
  if (showEnglish) {
    const enText = stripForSpeech(mr?.english || "");
    if (enText) items.push({ id: `${p}mr-en`, text: enText, lang: "en-US" });
  }

  for (const c of commentators) {
    if (!visibleCommentators.find((v) => v.key === c.key)) continue;
    const notes = seifData[c.key];
    if (!notes || notes.length === 0) continue;

    items.push({ id: `${p}${c.key}-header`, text: `${c.label}.`, lang: "en-US" });

    notes.forEach((note, i) => {
      if (!noteVisibleForLanguages(showHebrew, showEnglish, note)) return;
      const he = stripForSpeech(note.hebrew);
      const en = stripForSpeech(note.english);
      if (showHebrew && he) items.push({ id: `${p}${c.key}-h-${i}`, text: he, lang: "he-IL" });
      if (showEnglish && en) items.push({ id: `${p}${c.key}-e-${i}`, text: en, lang: "en-US" });
    });
  }

  return items;
}

function normalizeLang(lang) {
  return (lang || "").toLowerCase().replace("_", "-");
}

function voiceHaystack(voice) {
  return `${voice.name} ${voice.voiceURI} ${voice.lang}`.toLowerCase();
}

/** @param {SpeechSynthesisVoice} voice */
export function isExcludedVoice(voice, presetId) {
  const h = voiceHaystack(voice);
  const lang = normalizeLang(voice.lang);
  if (EXCLUDED_VOICE_MARKERS.test(h)) return true;
  if (presetId === "en-gb" && (lang.startsWith("cy") || /\bcy[-_]gb\b/.test(h))) return true;
  if ((presetId === "en-us" || presetId === "en-gb" || presetId === "en-au") && lang.startsWith("cy")) {
    return true;
  }
  return false;
}

/** @param {SpeechSynthesisVoice} voice */
export function isLikelyFemaleVoice(voice) {
  const h = voiceHaystack(voice);
  if (/#female\b/i.test(h) || /\bfemale\b/i.test(h)) return true;
  if (/\bx-gbb\b|\bx-sfg-f\b|\bx-iob\b|\bx-tpc\b/.test(h)) return true;
  return FEMALE_MARKERS.test(h);
}

/** @param {SpeechSynthesisVoice} voice */
export function isLikelyMaleVoice(voice) {
  if (isLikelyFemaleVoice(voice)) return false;
  const h = voiceHaystack(voice);
  if (/#male\b/i.test(h) || /\bmale\b/i.test(h)) return true;
  if (/\bx-gbd\b|\bx-gbg\b|\bx-rkd\b|\bx-sfg-m\b|\bx-iom\b|\bx-tpf\b/.test(h)) return true;
  return MALE_MARKERS.test(h);
}

/** @param {SpeechSynthesisVoice} voice */
export function matchesVoicePreset(voice, presetId) {
  if (isExcludedVoice(voice, presetId)) return false;
  const lang = normalizeLang(voice.lang);
  const h = voiceHaystack(voice);

  switch (presetId) {
    case "en-us":
      return (
        lang === "en-us" ||
        lang.startsWith("en-us-") ||
        /en-us|en_us|united states|u\.s\.|american|lang-us-x|lang_us/.test(h)
      );
    case "en-gb":
      return (
        (lang === "en-gb" || lang.startsWith("en-gb-")) &&
        !lang.startsWith("cy") &&
        /en-gb|en_gb|united kingdom|british|\buk english|lang-gb-x|lang_gb/.test(h)
      );
    case "en-au":
      return (
        lang === "en-au" ||
        lang.startsWith("en-au-") ||
        /en-au|en_au|australia|australian|lang-au-x|lang_au/.test(h)
      );
    case "he-il":
      return lang.startsWith("he") || /hebrew|israel|he-il|he_il/.test(h);
    default:
      return false;
  }
}

function scoreVoice(voice, presetId) {
  const h = voiceHaystack(voice);
  let score = 0;
  if (isLikelyFemaleVoice(voice)) return -1000;
  if (isExcludedVoice(voice, presetId)) return -1000;
  if (!matchesVoicePreset(voice, presetId)) return -1000;

  if (isLikelyMaleVoice(voice)) score += 120;
  if (voice.localService) score += 10;

  const hints = PRESET_MALE_HINTS[presetId] || [];
  for (let i = 0; i < hints.length; i += 1) {
    if (h.includes(hints[i])) {
      score += 80 - i * 3;
      break;
    }
  }

  return score;
}

function pickBestMale(candidates, presetId) {
  let best = null;
  let bestScore = -Infinity;
  for (const voice of candidates) {
    const score = scoreVoice(voice, presetId);
    if (score > bestScore) {
      bestScore = score;
      best = voice;
    }
  }
  return bestScore > 0 ? best : null;
}

/**
 * Resolve a curated male voice preset to a device voice.
 * @param {SpeechSynthesisVoice[]} voices
 * @param {string} presetId
 * @returns {SpeechSynthesisVoice | null}
 */
export function resolvePresetVoice(voices, presetId) {
  if (!voices?.length || !presetId) return null;

  const eligible = voices.filter(
    (v) => matchesVoicePreset(v, presetId) && !isLikelyFemaleVoice(v) && !isExcludedVoice(v, presetId)
  );
  const explicitMales = eligible.filter(isLikelyMaleVoice);
  const best = pickBestMale(explicitMales.length ? explicitMales : eligible, presetId);
  if (best) return best;

  const family = presetId.startsWith("he") ? "he" : "en";
  const familyMales = voices.filter(
    (v) =>
      normalizeLang(v.lang).startsWith(family) &&
      isLikelyMaleVoice(v) &&
      !isLikelyFemaleVoice(v) &&
      !isExcludedVoice(v, presetId)
  );
  return pickBestMale(familyMales, presetId);
}

export function getPresetOption(presetId) {
  return (
    ENGLISH_ACCENT_OPTIONS.find((o) => o.id === presetId) ||
    HEBREW_VOICE_OPTIONS.find((o) => o.id === presetId) ||
    null
  );
}

/** Label for UI: which device voice matched this preset. */
export function describePresetMatch(voices, presetId) {
  const voice = resolvePresetVoice(voices, presetId);
  if (!voice) return "No matching male voice on this device";
  return voice.name;
}

export function previewPresetVoice(voices, presetId, sampleText) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const preset = getPresetOption(presetId);
  const utt = new SpeechSynthesisUtterance(sampleText || preset?.sample || "Preview.");
  utt.rate = 0.92;
  const voice = resolvePresetVoice(voices, presetId);
  if (voice) {
    utt.voice = voice;
    utt.lang = voice.lang || preset?.lang;
  } else if (preset?.lang) {
    utt.lang = preset.lang;
  }
  synth.speak(utt);
}

/** Load browser TTS voices (may populate asynchronously on mobile). */
export function useSpeechVoices() {
  const [voices, setVoices] = useState(() =>
    typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis.getVoices() : []
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const refresh = () => {
      const list = synth.getVoices();
      if (list.length) setVoices(list);
    };
    refresh();
    synth.addEventListener("voiceschanged", refresh);
    const t = window.setTimeout(refresh, 250);
    const t2 = window.setTimeout(refresh, 1000);
    return () => {
      synth.removeEventListener("voiceschanged", refresh);
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  return voices;
}

/**
 * @param {{ englishAccent?: string, hebrewVoice?: string }} ttsPrefs
 */
export function useTTS(ttsPrefs = {}) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const queueRef = useRef([]);
  const cursorRef = useRef(0);
  const pendingPlayRef = useRef(false);
  const voiceWaitRef = useRef(0);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const voicesRef = useRef(
    typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis.getVoices() : []
  );
  const prefsRef = useRef(ttsPrefs);
  prefsRef.current = ttsPrefs;

  const refreshVoices = useCallback(() => {
    const synth = synthRef.current;
    if (!synth) return [];
    const list = synth.getVoices();
    if (list.length) voicesRef.current = list;
    return voicesRef.current;
  }, []);

  const stop = useCallback(() => {
    pendingPlayRef.current = false;
    if (synthRef.current) synthRef.current.cancel();
    queueRef.current = [];
    cursorRef.current = 0;
    setSpeaking(false);
    setPaused(false);
    setActiveId(null);
  }, []);

  const speakNext = useCallback(() => {
    const synth = synthRef.current;
    if (!synth) return;
    if (cursorRef.current >= queueRef.current.length) {
      pendingPlayRef.current = false;
      setSpeaking(false);
      setPaused(false);
      setActiveId(null);
      return;
    }

    const voices = refreshVoices();
    if (!voices.length) {
      if (voiceWaitRef.current < 40) {
        voiceWaitRef.current += 1;
        pendingPlayRef.current = true;
        window.setTimeout(() => speakNext(), 120);
        return;
      }
    }
    voiceWaitRef.current = 0;
    pendingPlayRef.current = false;

    const { id, text, lang } = queueRef.current[cursorRef.current];
    setActiveId(id);
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92;
    utt.pitch = 1;

    const { englishAccent = DEFAULT_ENGLISH_ACCENT, hebrewVoice = DEFAULT_HEBREW_VOICE } = prefsRef.current;
    const isHebrew = normalizeLang(lang).startsWith("he");
    const presetId = isHebrew ? hebrewVoice : englishAccent;
    const preset = getPresetOption(presetId);
    const voice = resolvePresetVoice(voices, presetId);

    if (voice) {
      utt.voice = voice;
      utt.lang = voice.lang || preset?.lang || lang;
    } else if (preset?.lang) {
      utt.lang = preset.lang;
    } else {
      utt.lang = lang;
    }

    utt.onend = () => {
      cursorRef.current += 1;
      speakNext();
    };
    utt.onerror = () => {
      cursorRef.current += 1;
      speakNext();
    };
    synth.speak(utt);
  }, [refreshVoices]);

  const play = useCallback(
    (items) => {
      const synth = synthRef.current;
      if (!synth) return;
      synth.cancel();
      refreshVoices();
      queueRef.current = items;
      cursorRef.current = 0;
      voiceWaitRef.current = 0;
      pendingPlayRef.current = true;
      setSpeaking(true);
      setPaused(false);
      speakNext();
    },
    [refreshVoices, speakNext]
  );

  const togglePause = useCallback(() => {
    const synth = synthRef.current;
    if (!synth) return;
    if (synth.paused) {
      synth.resume();
      setPaused(false);
    } else {
      synth.pause();
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    const synth = synthRef.current;
    if (!synth) return undefined;
    const onVoicesChanged = () => {
      refreshVoices();
      if (pendingPlayRef.current && queueRef.current.length) speakNext();
    };
    refreshVoices();
    synth.addEventListener("voiceschanged", onVoicesChanged);
    const t = window.setTimeout(refreshVoices, 250);
    const t2 = window.setTimeout(refreshVoices, 1000);
    return () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      window.clearTimeout(t);
      window.clearTimeout(t2);
      synth.cancel();
    };
  }, [refreshVoices, speakNext]);

  return { speaking, paused, activeId, play, stop, togglePause };
}
