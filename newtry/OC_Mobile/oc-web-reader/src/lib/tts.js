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

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const queueRef = useRef([]);
  const cursorRef = useRef(0);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);

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
    utt.onend = () => { cursorRef.current += 1; speakNext(); };
    utt.onerror = () => { cursorRef.current += 1; speakNext(); };
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
