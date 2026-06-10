import { useState, useRef, useCallback, useEffect } from "react";
import { noteVisibleForLanguages } from "./corpus.js";

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

/** Voices matching a language prefix (e.g. en, he). */
export function filterVoicesForLang(voices, langPrefix) {
  const prefix = normalizeLang(langPrefix);
  return voices
    .filter((v) => normalizeLang(v.lang).startsWith(prefix))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Human-readable label — name often includes Male/Female on mobile engines. */
export function formatVoiceLabel(voice) {
  const lang = voice.lang ? ` · ${voice.lang}` : "";
  return `${voice.name}${lang}`;
}

export function findVoiceByUri(voices, voiceURI) {
  if (!voiceURI) return null;
  return voices.find((v) => v.voiceURI === voiceURI) ?? null;
}

export function resolveVoiceForLang(voices, lang, voiceEnUri, voiceHeUri) {
  const isHebrew = normalizeLang(lang).startsWith("he");
  const pref = isHebrew ? voiceHeUri : voiceEnUri;
  const match = findVoiceByUri(voices, pref);
  if (match) return match;
  const pool = filterVoicesForLang(voices, isHebrew ? "he" : "en");
  return pool[0] ?? null;
}

export function previewVoice(voiceURI, lang, sampleText) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const utt = new SpeechSynthesisUtterance(sampleText);
  utt.lang = lang;
  utt.rate = 0.92;
  const voice = findVoiceByUri(synth.getVoices(), voiceURI);
  if (voice) utt.voice = voice;
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
    return () => {
      synth.removeEventListener("voiceschanged", refresh);
      window.clearTimeout(t);
    };
  }, []);

  return voices;
}

/**
 * @param {{ voiceEn?: string | null, voiceHe?: string | null }} ttsPrefs
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
    if (lang) utt.lang = lang;

    const { voiceEn, voiceHe } = prefsRef.current;
    const voice = resolveVoiceForLang(synth.getVoices(), lang, voiceEn, voiceHe);
    if (voice) utt.voice = voice;

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
