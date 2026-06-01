import { useEffect, useMemo, useState } from "react";
import { noteVisibleForLanguages } from "./lib/corpus.js";
import { formatGematria, numberToGematriaLetters } from "./lib/gematria.js";
import { loadReaderPrefs, saveReaderPrefs } from "./readerStorage.js";
import { useTTS, queueInterwoven, stripForSpeech } from "./lib/tts.js";

const PlayIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
);
const PauseIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);
const StopIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
);
const SpeakerIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

function Toggle({ on, onClick, children }) {
  return (
    <button type="button" className={`toggle ${on ? "toggle--on" : ""}`} onClick={onClick} aria-pressed={on}>
      {children}
    </button>
  );
}

function HtmlCol({ html, dir, className }) {
  if (!html?.trim()) return null;
  return <div className={className} dir={dir} dangerouslySetInnerHTML={{ __html: html }} />;
}

function BilingualRow({ note, showHebrew, showEnglish }) {
  if (!noteVisibleForLanguages(showHebrew, showEnglish, note)) return null;
  const both = showHebrew && showEnglish;
  return (
    <div className={`bilingual-row ${both ? "bilingual-row--split" : ""}`}>
      {note.label ? <div className="segment-label">{note.label}</div> : null}
      {showHebrew && <HtmlCol html={note.hebrew} dir="rtl" className="col-hebrew" />}
      {showEnglish && <HtmlCol html={note.english} dir="ltr" className="col-english" />}
    </div>
  );
}

function CommentaryPanel({ c, notes, showHebrew, showEnglish, open, onToggle, onPlay, isActive }) {
  const visible = (notes || []).filter((n) => noteVisibleForLanguages(showHebrew, showEnglish, n));
  if (!visible.length) return null;
  return (
    <article className="commentary-panel" style={{ "--accent": c.color, outline: isActive ? `2px solid ${c.color || "var(--accent)"}` : undefined }}>
      <header className="commentary-panel__head">
        <button type="button" className="commentary-panel__title" onClick={onToggle}>
          <span className="commentary-panel__dot" />
          {c.label}
          <span className="commentary-panel__count">{visible.length}</span>
        </button>
        {onPlay && (
          <button type="button" className="tts-speak-btn" onClick={onPlay} title={`Read ${c.label} aloud`} aria-label={`Read ${c.label}`}>
            <SpeakerIcon />
          </button>
        )}
      </header>
      {open && (
        <div className="commentary-panel__body">
          {visible.map((note, i) => (
            <BilingualRow key={i} note={note} showHebrew={showHebrew} showEnglish={showEnglish} />
          ))}
        </div>
      )}
    </article>
  );
}

/** null = all commentaries visible; Set = only listed keys */
function isCommentaryVisible(visibleKeys, key) {
  if (visibleKeys === null) return true;
  return visibleKeys.has(key);
}

function isChipActive(visibleKeys, key) {
  if (visibleKeys === null) return true;
  return visibleKeys.has(key);
}

export default function WebReaderLayout({
  volumes,
  volume,
  onSelectVolume,
  catalog,
  activeEntry,
  onSelectSiman,
  seifim,
  currentSeif,
  onSelectSeif,
  onPrevSeif,
  onNextSeif,
  seifData,
  commentators,
  corpusErr,
  commentaryVisibleKeys,
  onCommentaryVisibleKeysChange,
}) {
  const [simanQuery, setSimanQuery] = useState("");
  const prefsInit = useMemo(() => loadReaderPrefs(), []);
  const [showHebrew, setShowHebrew] = useState(prefsInit?.showHebrew !== false);
  const [showEnglish, setShowEnglish] = useState(prefsInit?.showEnglish !== false);
  const [theme, setTheme] = useState(() => {
    if (prefsInit?.theme === "dark") return "dark";
    try {
      return localStorage.getItem("oc_web_theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [openPanels, setOpenPanels] = useState(() => new Set());
  const { speaking, paused, activeId, play, stop, togglePause } = useTTS();

  const filteredCatalog = useMemo(() => {
    const q = simanQuery.trim().toLowerCase();
    if (!q) return catalog;
    const qBare = q.replace(/\u05F4/g, "").replace(/"/g, "");
    return catalog.filter((e) => {
      const n = String(e.siman);
      const title = (e.title || "").toLowerCase();
      const sub = (e.subtitle || "").toLowerCase();
      const gem = formatGematria(e.siman);
      const gemBare = numberToGematriaLetters(e.siman);
      return (
        n.includes(q) ||
        title.includes(q) ||
        sub.includes(q) ||
        gem.includes(q) ||
        gemBare.includes(qBare)
      );
    });
  }, [catalog, simanQuery]);

  useEffect(() => {
    saveReaderPrefs({
      volumeId: volume.id,
      showHebrew,
      showEnglish,
      commentaryKeys:
        commentaryVisibleKeys === null ? null : commentaryVisibleKeys.size ? [...commentaryVisibleKeys] : [],
      theme,
    });
  }, [volume.id, showHebrew, showEnglish, commentaryVisibleKeys, theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("oc_web_theme", next);
    } catch {
      /* ignore */
    }
  };

  /** First click: only that commentary; further clicks: add; click active to remove (last → all). */
  const onCommentaryChipClick = (key) => {
    if (commentaryVisibleKeys === null) {
      onCommentaryVisibleKeysChange(new Set([key]));
      return;
    }
    if (commentaryVisibleKeys.has(key)) {
      const next = new Set(commentaryVisibleKeys);
      next.delete(key);
      onCommentaryVisibleKeysChange(next.size === 0 ? null : next);
      return;
    }
    onCommentaryVisibleKeysChange(new Set([...commentaryVisibleKeys, key]));
  };

  const showAllCommentaries = () => onCommentaryVisibleKeysChange(null);

  const togglePanelOpen = (key) => {
    setOpenPanels((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  const visibleCommentators = commentators.filter((c) => isCommentaryVisible(commentaryVisibleKeys, c.key));
  const mr = seifData?.mechaber_rama;
  const simanGem = formatGematria(activeEntry.siman);
  const seifGem = formatGematria(currentSeif);
  const selectionIsSubset = commentaryVisibleKeys !== null;

  return (
    <div className={`web-reader theme-${theme}`} data-theme={theme}>
      <aside className="sidebar sidebar--simanim">
        <div className="sidebar__brand">
          <label className="volume-select">
            <span className="volume-select__label">Section</span>
            <select
              className="volume-select__input"
              value={volume.id}
              onChange={(e) => onSelectVolume(e.target.value)}
              aria-label="Shulchan Aruch section"
            >
              {volumes.map((v) => (
                <option key={v.id} value={v.id} disabled={!v.enabled}>
                  {v.short} — {v.label}
                  {!v.enabled ? " (soon)" : ""}
                </option>
              ))}
            </select>
          </label>
          <h1>{volume.label}</h1>
          <p className="sidebar__sub">Web reader</p>
          <a
            className="android-download-btn"
            href="https://github.com/bennyg83/shulchan_aruch/releases/download/android-apk/ShulchanAruch.apk"
            download="ShulchanAruch.apk"
            title="Download Android app for offline use"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.36 14c.08-.34.14-.7.14-1.06 0-.36-.06-.72-.14-1.06l2.26-1.74c.2-.16.26-.44.12-.68l-2.14-3.74c-.14-.24-.42-.32-.66-.24l-2.66 1.08c-.56-.42-1.16-.78-1.82-1.02L11.1 3.14C11.06 2.88 10.84 2.68 10.58 2.68H6.42c-.26 0-.48.2-.52.46l-.38 2.5c-.66.24-1.26.6-1.82 1.02L1.04 5.58c-.24-.1-.52 0-.66.24L.24 9.56c-.14.24-.08.52.12.68L2.62 11.96c-.08.34-.14.7-.14 1.06 0 .36.06.72.14 1.06L.36 15.82c-.2.16-.26.44-.12.68l2.14 3.74c.14.24.42.32.66.24l2.66-1.08c.56.42 1.16.78 1.82 1.02l.38 2.5c.04.26.26.46.52.46h4.16c.26 0 .48-.2.52-.46l.38-2.5c.66-.24 1.26-.6 1.82-1.02l2.66 1.08c.24.1.52 0 .66-.24l2.14-3.74c.14-.24.08-.52-.12-.68L16.36 14zM8.5 15.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
            </svg>
            Download for Android
          </a>
        </div>
        <input
          type="search"
          className="sidebar__search"
          placeholder="Search siman or גימטריה…"
          value={simanQuery}
          onChange={(e) => setSimanQuery(e.target.value)}
          aria-label="Search simanim"
        />
        <nav className="siman-list" aria-label="Simanim">
          {filteredCatalog.map((e) => (
            <button
              key={e.siman}
              type="button"
              className={`siman-list__item ${e.siman === activeEntry.siman ? "siman-list__item--active" : ""}`}
              onClick={() => onSelectSiman(e)}
            >
              <span className="siman-list__num">
                <span className="siman-list__num-arabic">{e.siman}</span>
                <span className="siman-list__num-gematria" dir="rtl" lang="he">
                  {formatGematria(e.siman)}
                </span>
              </span>
              <span className="siman-list__meta">
                <span className="siman-list__title">{e.title || `Siman ${e.siman}`}</span>
                {e.subtitle ? <span className="siman-list__subtitle">{e.subtitle}</span> : null}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <aside className="sidebar sidebar--seifim">
        <h2 className="sidebar__heading">
          Seifim
          <span className="sidebar__badge" dir="rtl" lang="he">
            {simanGem ? (
              <>
                סימן <span className="sidebar__badge-gematria">{simanGem}</span>
                <span className="sidebar__badge-arabic"> ({activeEntry.siman})</span>
              </>
            ) : (
              <>Siman {activeEntry.siman}</>
            )}
          </span>
        </h2>
        <nav className="seif-list" aria-label="Seifim">
          {seifim.map((n) => (
            <button
              key={n}
              type="button"
              className={`seif-list__item ${n === currentSeif ? "seif-list__item--active" : ""}`}
              onClick={() => onSelectSeif(n)}
            >
              <span className="seif-list__arabic">Seif {n}</span>
              <span className="seif-list__gematria" dir="rtl" lang="he">
                {formatGematria(n)}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="reader-main">
        <header className="reader-toolbar">
          <div className="reader-toolbar__title">
            <h2>{activeEntry.title || `Siman ${activeEntry.siman}`}</h2>
            {activeEntry.subtitle ? <p>{activeEntry.subtitle}</p> : null}
          </div>
          <div className="reader-toolbar__seif-nav">
            <button type="button" className="btn btn--ghost" disabled={!onPrevSeif} onClick={onPrevSeif}>
              ← Prev seif
            </button>
            <span className="reader-toolbar__seif-label">
              Seif {currentSeif}
              {seifGem ? (
                <span className="reader-toolbar__seif-gematria" dir="rtl" lang="he">
                  {" "}
                  ({seifGem})
                </span>
              ) : null}
            </span>
            <button type="button" className="btn btn--ghost" disabled={!onNextSeif} onClick={onNextSeif}>
              Next seif →
            </button>
          </div>
          <div className="reader-toolbar__controls">
            <Toggle on={showHebrew} onClick={() => setShowHebrew((v) => !v)}>
              א Hebrew
            </Toggle>
            <Toggle on={showEnglish} onClick={() => setShowEnglish((v) => !v)}>
              A English
            </Toggle>
            <button type="button" className="btn btn--ghost" onClick={toggleTheme} title="Toggle theme">
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </header>

        {commentators.length > 0 && (
          <div className="filter-bar">
            <span className="filter-bar__label">Commentaries</span>
            {selectionIsSubset && (
              <button type="button" className="filter-chip filter-chip--all" onClick={showAllCommentaries}>
                Show all
              </button>
            )}
            {commentators.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`filter-chip ${isChipActive(commentaryVisibleKeys, c.key) ? "filter-chip--on" : ""}`}
                style={{ "--chip-color": c.color }}
                onClick={() => onCommentaryChipClick(c.key)}
                title={
                  commentaryVisibleKeys === null
                    ? "Click to show only this commentary"
                    : commentaryVisibleKeys.has(c.key)
                      ? "Click to hide this commentary"
                      : "Click to add this commentary"
                }
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <div className="reader-scroll">
          {corpusErr && <p className="reader-error">Could not load seif: {corpusErr}</p>}
          {!seifData && !corpusErr && <p className="reader-loading">Loading seif {currentSeif}…</p>}

          {seifData && mr && (
            <section className="mechaber-section">
              <h3 className="section-heading" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span>Mechaber &amp; Rama</span>
                <button
                  type="button"
                  className="tts-speak-btn"
                  title="Read Mechaber & Rama aloud"
                  onClick={() => {
                    const items = [
                      ...(showHebrew && mr.hebrew ? [{ id: "mr-he", text: stripForSpeech(mr.hebrew), lang: "he-IL" }] : []),
                      ...(showEnglish && mr.english ? [{ id: "mr-en", text: stripForSpeech(mr.english), lang: "en-US" }] : []),
                    ];
                    if (items.length) play(items);
                  }}
                >
                  <SpeakerIcon />
                </button>
                <button
                  type="button"
                  className="tts-play-all-btn"
                  title="Play all — Mechaber, Rama, and all visible commentaries"
                  onClick={() => {
                    if (!seifData || currentSeif == null) return;
                    const items = queueInterwoven(
                      currentSeif,
                      seifData,
                      visibleCommentators,
                      commentators,
                      showHebrew,
                      showEnglish
                    );
                    if (items.length) play(items);
                  }}
                >
                  <PlayIcon size={13} /> Play all
                </button>
              </h3>
              <div className={`mechaber-grid ${showHebrew && showEnglish ? "mechaber-grid--split" : ""}`}>
                {showHebrew && <HtmlCol html={mr.hebrew} dir="rtl" className="col-hebrew mechaber-he" />}
                {showEnglish && <HtmlCol html={mr.english} dir="ltr" className="col-english mechaber-en" />}
              </div>
            </section>
          )}

          {seifData && visibleCommentators.length > 0 && (
            <section className="commentaries-section">
              <h3 className="section-heading">Commentaries</h3>
              <div className="commentaries-grid">
                {visibleCommentators.map((c) => {
                  const notes = seifData[c.key];
                  const isOpen = !openPanels.has(c.key);
                  const panelId = `int-${currentSeif}-${c.key}`;
                  const isActive = activeId && activeId.startsWith(panelId);
                  return (
                    <CommentaryPanel
                      key={c.key}
                      c={c}
                      notes={notes}
                      showHebrew={showHebrew}
                      showEnglish={showEnglish}
                      open={isOpen}
                      onToggle={() => togglePanelOpen(c.key)}
                      isActive={!!isActive}
                      onPlay={() => {
                        const items = [];
                        (notes || []).forEach((note, i) => {
                          if (!noteVisibleForLanguages(showHebrew, showEnglish, note)) return;
                          if (showHebrew && note.hebrew) items.push({ id: `${panelId}-h-${i}`, text: stripForSpeech(note.hebrew), lang: "he-IL" });
                          if (showEnglish && note.english) items.push({ id: `${panelId}-e-${i}`, text: stripForSpeech(note.english), lang: "en-US" });
                        });
                        if (items.length) play(items);
                      }}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {seifData && visibleCommentators.length === 0 && commentators.length > 0 && (
            <p className="reader-hint">
              No commentaries selected — click chips above to add one (first click shows only that commentary).
            </p>
          )}
        </div>
      </main>

      <div className="tts-playback-bar">
        {speaking ? (
          <>
            <span className="tts-playback-bar__label">
              {paused ? "⏸ Paused" : "▶ Playing…"}
            </span>
            <button type="button" className="tts-playback-btn" onClick={togglePause} title={paused ? "Resume" : "Pause"}>
              {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
            </button>
            <button type="button" className="tts-playback-btn" onClick={stop} title="Stop">
              <StopIcon size={16} />
            </button>
          </>
        ) : (
          <>
            <span className="tts-playback-bar__label">
              {seifData
                ? `Seif ${currentSeif} — ${activeEntry?.title || `Siman ${activeEntry?.siman}`}`
                : "Audio"}
            </span>
            <button
              type="button"
              className="tts-playback-btn tts-playback-btn--play"
              disabled={!seifData}
              title="Play all — Mechaber, Rama, and all visible commentaries"
              onClick={() => {
                if (!seifData || currentSeif == null) return;
                const items = queueInterwoven(
                  currentSeif,
                  seifData,
                  visibleCommentators,
                  commentators,
                  showHebrew,
                  showEnglish
                );
                if (items.length) play(items);
              }}
            >
              <PlayIcon size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
