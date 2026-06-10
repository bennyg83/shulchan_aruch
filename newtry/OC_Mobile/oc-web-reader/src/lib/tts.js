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

const PRESET_MALE_HINTS = {
  "en-us": [
    "male",
    "us english male",
    "google us english",
    "aaron",
    "fred",
    "alex",
    "david",
    "james",
    "mark",
    "paul",
    "michael",
    "john",
  ],
  "en-gb": [
    "male",
    "uk english male",
    "british english male",
    "google uk english male",
    "daniel",
    "arthur",
    "oliver",
    "thomas",
    "george",
    "nigel",
    "rishi",
  ],
  "en-au": [
    "male",
    "australian english male",
    "google australian english",
    "gordon",
    "lee",
    "james",
  ],
  "he-il": ["male", "hebrew male", "israeli male", "israel", "hebrew", "lior", "avraham", "david"],
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
export function isLikelyFemaleVoice(voice) {
  const h = voiceHaystack(voice);
  if (/#female\b/i.test(h) || /\bfemale\b/i.test(h)) return true;
  return FEMALE_MARKERS.test(h);
}

/** @param {SpeechSynthesisVoice} voice */
export function isLikelyMaleVoice(voice) {
  if (isLikelyFemaleVoice(voice)) return false;
  const h = voiceHaystack(voice);
  if (/#male\b/i.test(h) || /\bmale\b/i.test(h)) return true;
  return MALE_MARKERS.test(h);
}

/** @param {SpeechSynthesisVoice} voice */
export function matchesVoicePreset(voice, presetId) {
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
        lang === "en-gb" ||
        lang.startsWith("en-gb-") ||
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

function pickBestMale(candidates, presetId) {
  const hints = PRESET_MALE_HINTS[presetId] || [];
  for (const hint of hints) {
    const found = candidates.find((v) => voiceHaystack(v).includes(hint));
    if (found) return found;
  }
  return candidates[0] ?? null;
}

/**
 * Resolve a curated male voice preset to a device voice.
 * @param {SpeechSynthesisVoice[]} voices
 * @param {string} presetId
 * @returns {SpeechSynthesisVoice | null}
 */
export function resolvePresetVoice(voices, presetId) {
  if (!voices?.length || !presetId) return null;

  const accentMatches = voices.filter((v) => matchesVoicePreset(v, presetId) && !isLikelyFemaleVoice(v));
  const explicitMales = accentMatches.filter(isLikelyMaleVoice);
  if (explicitMales.length) return pickBestMale(explicitMales, presetId);
  if (accentMatches.length) return pickBestMale(accentMatches, presetId);

  const family = presetId.startsWith("he") ? "he" : "en";
  const familyMales = voices.filter(
    (v) => normalizeLang(v.lang).startsWith(family) && isLikelyMaleVoice(v) && !isLikelyFemaleVoice(v)
  );
  if (familyMales.length) return pickBestMale(familyMales, presetId);

  return null;
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
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const prefsRef = useRef(ttsPrefs);
  prefsRef.current = ttsPrefs;

  const stop = useCallback(() => {
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
      setSpeaking(false);
      setPaused(false);
      setActiveId(null);
      return;
    }
    const { id, text, lang } = queueRef.current[cursorRef.current];
    setActiveId(id);
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92;
    utt.pitch = 1;

    const { englishAccent = DEFAULT_ENGLISH_ACCENT, hebrewVoice = DEFAULT_HEBREW_VOICE } = prefsRef.current;
    const isHebrew = normalizeLang(lang).startsWith("he");
    const presetId = isHebrew ? hebrewVoice : englishAccent;
    const preset = getPresetOption(presetId);
    const voice = resolvePresetVoice(synth.getVoices(), presetId);

    if (voice) {
      utt.voice = voice;
      utt.lang = voice.lang || preset?.lang || lang;
    } else {
      utt.lang = preset?.lang || lang;
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
  }, []);

  const play = useCallback(
    (items) => {
      const synth = synthRef.current;
      if (!synth) return;
      synth.cancel();
      queueRef.current = items;
      cursorRef.current = 0;
      setSpeaking(true);
      setPaused(false);
      speakNext();
    },
    [speakNext]
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

  useEffect(() => () => { if (synthRef.current) synthRef.current.cancel(); }, []);

  return { speaking, paused, activeId, play, stop, togglePause };
}
