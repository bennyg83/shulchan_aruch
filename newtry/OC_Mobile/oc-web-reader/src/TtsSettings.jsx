import { useEffect, useMemo } from "react";
import { filterVoicesForLang, formatVoiceLabel, previewVoice, useSpeechVoices } from "./lib/tts.js";

/**
 * In-app TTS voice picker — uses voices exposed by the browser/OS (Web Speech API).
 */
export default function TtsSettings({ open, onClose, prefs, onChange }) {
  const voices = useSpeechVoices();

  const englishVoices = useMemo(() => filterVoicesForLang(voices, "en"), [voices]);
  const hebrewVoices = useMemo(() => filterVoicesForLang(voices, "he"), [voices]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const setVoiceEn = (voiceURI) => onChange({ ...prefs, voiceEn: voiceURI || null });
  const setVoiceHe = (voiceURI) => onChange({ ...prefs, voiceHe: voiceURI || null });

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
            Choose English and Hebrew voices for read-aloud. Options come from your device — pick a male or female
            voice here without opening system settings.
          </p>

          <label className="settings-field">
            <span className="settings-field__label">English voice</span>
            <div className="settings-field__row">
              <select
                className="settings-field__select"
                value={prefs.voiceEn ?? ""}
                onChange={(e) => setVoiceEn(e.target.value)}
              >
                <option value="">System default</option>
                {englishVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {formatVoiceLabel(v)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="settings-field__preview"
                onClick={() => previewVoice(prefs.voiceEn, "en-US", "This is the English reading voice.")}
                disabled={!englishVoices.length}
              >
                Preview
              </button>
            </div>
          </label>

          <label className="settings-field">
            <span className="settings-field__label">Hebrew voice</span>
            <div className="settings-field__row">
              <select
                className="settings-field__select"
                value={prefs.voiceHe ?? ""}
                onChange={(e) => setVoiceHe(e.target.value)}
              >
                <option value="">System default</option>
                {hebrewVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {formatVoiceLabel(v)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="settings-field__preview"
                onClick={() => previewVoice(prefs.voiceHe, "he-IL", "זהו קול הקריאה בעברית.")}
                disabled={!hebrewVoices.length}
              >
                Preview
              </button>
            </div>
          </label>

          {!voices.length ? (
            <p className="settings-section__note settings-section__note--warn">
              Loading voices… If the lists stay empty, try closing and reopening this panel, or reload the app once
              while online.
            </p>
          ) : null}

          {voices.length > 0 && !englishVoices.length && !hebrewVoices.length ? (
            <p className="settings-section__note settings-section__note--warn">
              No English or Hebrew voices were reported by this browser. Install a TTS language pack on your device,
              then reload the app and open Settings again.
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
