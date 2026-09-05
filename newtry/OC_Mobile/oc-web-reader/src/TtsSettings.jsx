import { useEffect } from "react";
import {
  DEFAULT_ENGLISH_ACCENT,
  DEFAULT_HEBREW_VOICE,
  ENGLISH_ACCENT_OPTIONS,
  HEBREW_VOICE_OPTIONS,
  describePresetMatch,
  previewPresetVoice,
  useSpeechVoices,
} from "./lib/tts.js";

/**
 * Curated male TTS voices — American, British, Australian English; Israeli Hebrew.
 */
export default function TtsSettings({ open, onClose, prefs, onChange }) {
  const voices = useSpeechVoices();
  const englishAccent = prefs.englishAccent ?? DEFAULT_ENGLISH_ACCENT;
  const hebrewVoice = prefs.hebrewVoice ?? DEFAULT_HEBREW_VOICE;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const setEnglishAccent = (accent) => onChange({ ...prefs, englishAccent: accent });
  const setHebrewVoice = (voice) => onChange({ ...prefs, hebrewVoice: voice });

  return (
    <div className="settings-overlay" onClick={onClose} role="presentation">
      <div
        className="settings-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <header className="settings-panel__header">
          <h2 id="settings-title" className="settings-panel__title">
            Settings
          </h2>
          <button type="button" className="settings-panel__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="settings-section">
          <h3 className="settings-section__heading">Text-to-speech voices</h3>
          <p className="settings-section__hint">
            Male voices only. The app picks the best matching male voice on your device for each accent.
          </p>

          <label className="settings-field">
            <span className="settings-field__label">English accent</span>
            <div className="settings-field__row">
              <select
                className="settings-field__select"
                value={englishAccent}
                onChange={(e) => setEnglishAccent(e.target.value)}
              >
                {ENGLISH_ACCENT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="settings-field__preview"
                onClick={() => {
                  const opt = ENGLISH_ACCENT_OPTIONS.find((o) => o.id === englishAccent);
                  previewPresetVoice(voices, englishAccent, opt?.sample);
                }}
              >
                Preview
              </button>
            </div>
            <span className="settings-field__match">Device voice: {describePresetMatch(voices, englishAccent)}</span>
          </label>

          <label className="settings-field">
            <span className="settings-field__label">Hebrew voice</span>
            <div className="settings-field__row">
              <select
                className="settings-field__select"
                value={hebrewVoice}
                onChange={(e) => setHebrewVoice(e.target.value)}
              >
                {HEBREW_VOICE_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="settings-field__preview"
                onClick={() => {
                  const opt = HEBREW_VOICE_OPTIONS.find((o) => o.id === hebrewVoice);
                  previewPresetVoice(voices, hebrewVoice, opt?.sample);
                }}
              >
                Preview
              </button>
            </div>
            <span className="settings-field__match">Device voice: {describePresetMatch(voices, hebrewVoice)}</span>
          </label>

          {!voices.length ? (
            <p className="settings-section__note settings-section__note--warn">
              Loading voices… If previews stay silent, reload the app once while online.
            </p>
          ) : null}
        </section>

        <footer className="settings-panel__footer">
          <button type="button" className="settings-panel__done" onClick={onClose}>
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}
