import { useState, useEffect, useRef, useCallback } from "react";
import { noteVisibleForLanguages } from "./corpus.js";

/** Plain text for speech (strip HTML tags). */
export function stripForSpeech(html) {
  if (!html) return "";
  const d = document.createElement("div");
  d.innerHTML = html;
  return (d.textContent || "").replace(/\s+/g, " ").trim();
}

export function queueForSection(sectionId, text) {
  return [{ id: sectionId, text }];
}

/** IDs prefixed with `int-` so the interwoven “Play all” control does not light up during single-source TTS. */
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
  items.push({
    id: `${p}mr`,
    text: `Seif ${seifNum}. Mechaber and Rama. ${stripForSpeech(mr?.english || "")}`,
  });
  for (const c of commentators) {
    if (!visibleCommentators[c.key]) continue;
    const notes = seifData[c.key];
    if (!notes || notes.length === 0) continue;
    items.push({ id: `${p}${c.key}-header`, text: `${c.label}.` });
    notes.forEach((note, i) => {
      if (!noteVisibleForLanguages(showHebrew, showEnglish, note)) return;
      const he = stripForSpeech(note.hebrew);
      const en = stripForSpeech(note.english);
      if (showHebrew && he) {
        items.push({
          id: `${p}${c.key}-h-${i}`,
          text: `${c.label}. ${he}`,
        });
      }
      if (showEnglish && en) {
        items.push({
          id: `${p}${c.key}-e-${i}`,
          text: en,
        });
      }
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
    const { id, text } = queueRef.current[cursorRef.current];
    setActiveId(id);
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92;
    utt.pitch = 1;
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

  useEffect(
    () => () => {
      if (synthRef.current) synthRef.current.cancel();
    },
    []
  );

  return { speaking, paused, activeId, play, stop, togglePause };
}
