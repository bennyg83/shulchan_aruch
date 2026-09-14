import { useEffect, useMemo, useState } from "react";
import { OfflineInstallPanel } from "./InstallPrompt.jsx";
import SimanPicker from "./SimanPicker.jsx";
import SeifPicker from "./SeifPicker.jsx";
import VolumePicker from "./VolumePicker.jsx";
import MobileChrome from "./MobileChrome.jsx";
import { noteVisibleForLanguages } from "./lib/corpus.js";
import { formatGematria, numberToGematriaLetters } from "./lib/gematria.js";
import { loadReaderPrefs, saveReaderPrefs, loadTtsPrefs, saveTtsPrefs } from "./readerStorage.js";
import TtsSettings from "./TtsSettings.jsx";
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
    <div className={`bilingual-row ${both ? "bilingual-row--stack" : ""}`}>
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

function PlaybackStepRow({ kind, value, gem, onPrev, onNext, onOpen }) {
  return (
    <div className="tts-playback-bar__step">
      <button
        type="button"
        className="tts-playback-bar__arrow"
        disabled={!onPrev}
        onClick={onPrev}
        aria-label={`Previous ${kind}`}
      >
        ←
      </button>
      <button type="button" className="tts-playback-bar__place" onClick={onOpen}>
        <span className="tts-playback-bar__kind">{kind}</span>
        <span className="tts-playback-bar__value">
          {value}
          {gem ? (
            <span dir="rtl" lang="he">
              {" "}
              {gem}
            </span>
          ) : null}
        </span>
      </button>
      <button
        type="button"
        className="tts-playback-bar__arrow"
        disabled={!onNext}
        onClick={onNext}
        aria-label={`Next ${kind}`}
      >
        →
      </button>
    </div>
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

function commentarySelectionSummary(visibleKeys, commentators) {
  if (!commentators.length) return "";
  if (visibleKeys === null) return "All";
  if (visibleKeys.size === 0) return "None";
  const labels = [...visibleKeys]
    .map((k) => commentators.find((c) => c.key === k)?.label)
    .filter(Boolean);
  if (labels.length <= 2) return labels.join(", ");
  return `${labels.length} selected`;
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
  install,
}) {
  const [simanQuery, setSimanQuery] = useState("");
  const [simanPickerOpen, setSimanPickerOpen] = useState(false);
  const [seifPickerOpen, setSeifPickerOpen] = useState(false);
  const [volumePickerOpen, setVolumePickerOpen] = useState(false);
  const [chromeExpanded, setChromeExpanded] = useState(false);
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
  const [commentaryFilterExpanded, setCommentaryFilterExpanded] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(max-width: 960px)").matches;
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ttsPrefs, setTtsPrefs] = useState(() => loadTtsPrefs());
  const { speaking, paused, activeId, play, stop, togglePause } = useTTS(ttsPrefs);

  const updateTtsPrefs = (next) => {
    setTtsPrefs(next);
    saveTtsPrefs(next);
  };

  const seifNavKey = `${activeEntry?.siman ?? ""}-${currentSeif ?? ""}`;

  /** Collapse commentary panels when changing seif (mobile: all; desktop: all open). */
  useEffect(() => {
    if (!commentators.length) return;
    const mobile = window.matchMedia("(max-width: 960px)").matches;
    setOpenPanels(mobile ? new Set(commentators.map((c) => c.key)) : new Set());
  }, [seifNavKey, commentators]);

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

  const openCommentaryPanel = (key) => {
    setOpenPanels((prev) => {
      const n = new Set(prev);
      n.delete(key);
      return n;
    });
  };

  /** First click: only that commentary; further clicks: add; click active to remove (last → all). */
  const onCommentaryChipClick = (key) => {
    setCommentaryFilterExpanded(true);
    openCommentaryPanel(key);

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

  const showAllCommentaries = () => {
    setCommentaryFilterExpanded(true);
    onCommentaryVisibleKeysChange(null);
  };

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
  const commentarySummary = commentarySelectionSummary(commentaryVisibleKeys, commentators);
  const catalogIdx = catalog.findIndex((e) => e.siman === activeEntry.siman);
  const prevSimanEntry = catalogIdx > 0 ? catalog[catalogIdx - 1] : null;
  const nextSimanEntry = catalogIdx >= 0 && catalogIdx < catalog.length - 1 ? catalog[catalogIdx + 1] : null;

  const handleSelectSiman = (entry) => {
    onSelectSiman(entry);
    setSimanPickerOpen(false);
  };

  const handleSelectSeif = (n) => {
    onSelectSeif(n);
    setSeifPickerOpen(false);
  };

  const handleSelectVolume = (id) => {
    onSelectVolume(id);
    setVolumePickerOpen(false);
  };

  return (
    <div className={`web-reader theme-${theme}`} data-theme={theme}>
      <VolumePicker
        open={volumePickerOpen}
        onClose={() => setVolumePickerOpen(false)}
        volumes={volumes}
        volume={volume}
        onSelectVolume={handleSelectVolume}
      />
      <SimanPicker
        open={simanPickerOpen}
        onClose={() => setSimanPickerOpen(false)}
        catalog={catalog}
        activeEntry={activeEntry}
        onSelectSiman={handleSelectSiman}
        onPrevSiman={prevSimanEntry ? () => onSelectSiman(prevSimanEntry) : null}
        onNextSiman={nextSimanEntry ? () => onSelectSiman(nextSimanEntry) : null}
      />
      <SeifPicker
        open={seifPickerOpen}
        onClose={() => setSeifPickerOpen(false)}
        seifim={seifim}
        currentSeif={currentSeif}
        onSelectSeif={handleSelectSeif}
        onPrevSeif={onPrevSeif}
        onNextSeif={onNextSeif}
        simanGem={simanGem}
        simanNum={activeEntry.siman}
      />
      <TtsSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        prefs={ttsPrefs}
        onChange={updateTtsPrefs}
      />
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
          <OfflineInstallPanel
            platform={install.platform}
            installed={install.installed}
            deferredPrompt={install.deferredPrompt}
            openGuide={install.openGuide}
            triggerInstall={install.triggerInstall}
          />
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
        <MobileChrome
          expanded={chromeExpanded}
          onExpandedChange={setChromeExpanded}
          volume={volume}
          activeEntry={activeEntry}
          simanGem={simanGem}
          seifGem={seifGem}
          currentSeif={currentSeif}
          onOpenVolumePicker={() => setVolumePickerOpen(true)}
          onOpenSimanPicker={() => setSimanPickerOpen(true)}
          onOpenSeifPicker={() => setSeifPickerOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          showHebrew={showHebrew}
          showEnglish={showEnglish}
          onToggleHebrew={() => setShowHebrew((v) => !v)}
          onToggleEnglish={() => setShowEnglish((v) => !v)}
          theme={theme}
          onToggleTheme={toggleTheme}
          commentators={commentators}
          commentaryVisibleKeys={commentaryVisibleKeys}
          commentarySummary={commentarySummary}
          commentaryFilterExpanded={commentaryFilterExpanded}
          setCommentaryFilterExpanded={setCommentaryFilterExpanded}
          selectionIsSubset={selectionIsSubset}
          onCommentaryChipClick={onCommentaryChipClick}
          onShowAllCommentaries={showAllCommentaries}
          isChipActive={isChipActive}
        />

        <header className="reader-toolbar reader-toolbar--desktop">
          <div className="reader-toolbar__title">
            <h2>{activeEntry.title || `Siman ${activeEntry.siman}`}</h2>
            {activeEntry.subtitle ? <p>{activeEntry.subtitle}</p> : null}
          </div>
          <div className="reader-toolbar__nav">
            <div className="reader-toolbar__step-nav">
              <button
                type="button"
                className="btn btn--ghost"
                disabled={!prevSimanEntry}
                onClick={() => prevSimanEntry && onSelectSiman(prevSimanEntry)}
              >
                ← Prev siman
              </button>
              <span className="reader-toolbar__step-label">
                Siman {activeEntry.siman}
                {simanGem ? (
                  <span className="reader-toolbar__seif-gematria" dir="rtl" lang="he">
                    {" "}
                    ({simanGem})
                  </span>
                ) : null}
              </span>
              <button
                type="button"
                className="btn btn--ghost"
                disabled={!nextSimanEntry}
                onClick={() => nextSimanEntry && onSelectSiman(nextSimanEntry)}
              >
                Next siman →
              </button>
            </div>
            <div className="reader-toolbar__step-nav">
              <button type="button" className="btn btn--ghost" disabled={!onPrevSeif} onClick={onPrevSeif}>
                ← Prev seif
              </button>
              <span className="reader-toolbar__step-label">
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
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setSettingsOpen(true)}
              title="Reader settings"
              aria-label="Reader settings"
            >
              ⚙ Settings
            </button>
          </div>
        </header>

        {commentators.length > 0 && (
          <div className={`filter-bar filter-bar--desktop filter-bar--collapsible ${commentaryFilterExpanded ? "filter-bar--expanded" : ""}`}>
            <button
              type="button"
              className="filter-bar__toggle"
              onClick={() => setCommentaryFilterExpanded((v) => !v)}
              aria-expanded={commentaryFilterExpanded}
            >
              <span className="filter-bar__label">Commentaries</span>
              <span className="filter-bar__summary">{commentarySummary}</span>
              <span className="filter-bar__chevron" aria-hidden="true">
                {commentaryFilterExpanded ? "▲" : "▼"}
              </span>
            </button>
            {commentaryFilterExpanded && (
              <div className="filter-bar__chips">
                {selectionIsSubset && (
                  <button
                    type="button"
                    className="filter-chip filter-chip--all"
                    onClick={(e) => {
                      e.stopPropagation();
                      showAllCommentaries();
                    }}
                  >
                    Show all
                  </button>
                )}
                {commentators.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`filter-chip ${isChipActive(commentaryVisibleKeys, c.key) ? "filter-chip--on" : ""}`}
                    style={{ "--chip-color": c.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCommentaryChipClick(c.key);
                    }}
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
                    const segs = mr.segments?.length
                      ? mr.segments
                      : [{ hebrew: mr.hebrew, english: mr.english }];
                    const items = [];
                    segs.forEach((note, i) => {
                      if (showHebrew && note.hebrew) {
                        items.push({ id: `mr-he-${i}`, text: stripForSpeech(note.hebrew), lang: "he-IL" });
                      }
                      if (showEnglish && note.english) {
                        items.push({ id: `mr-en-${i}`, text: stripForSpeech(note.english), lang: "en-US" });
                      }
                    });
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
              <div className={`mechaber-grid ${showHebrew && showEnglish ? "mechaber-grid--stack" : ""}`}>
                {(mr.segments?.length
                  ? mr.segments
                  : [{ label: "", hebrew: mr.hebrew, english: mr.english }]
                ).map((note, i) => (
                  <BilingualRow
                    key={i}
                    note={note}
                    showHebrew={showHebrew}
                    showEnglish={showEnglish}
                  />
                ))}
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
              No commentaries selected — expand Commentaries above and tap a name to show one (first tap shows only
              that commentary).
            </p>
          )}
        </div>
        <div className="tts-playback-bar">
          <div className="tts-playback-bar__nav">
            <PlaybackStepRow
              kind="Siman"
              value={activeEntry?.siman}
              gem={simanGem}
              onPrev={prevSimanEntry ? () => onSelectSiman(prevSimanEntry) : null}
              onNext={nextSimanEntry ? () => onSelectSiman(nextSimanEntry) : null}
              onOpen={() => setSimanPickerOpen(true)}
            />
            <PlaybackStepRow
              kind="Seif"
              value={currentSeif}
              gem={seifGem}
              onPrev={onPrevSeif}
              onNext={onNextSeif}
              onOpen={() => setSeifPickerOpen(true)}
            />
          </div>
          <div className="tts-playback-bar__audio">
            <span className="tts-playback-bar__status" aria-live="polite">
              {speaking ? (paused ? "Paused" : "Playing") : "\u00a0"}
            </span>
            <button
              type="button"
              className={`tts-playback-btn${speaking ? "" : " tts-playback-btn--play"}`}
              disabled={!speaking && !seifData}
              title={
                speaking
                  ? paused
                    ? "Resume"
                    : "Pause"
                  : "Play all — Mechaber, Rama, and all visible commentaries"
              }
              aria-label={speaking ? (paused ? "Resume" : "Pause") : "Play all"}
              onClick={() => {
                if (speaking) {
                  togglePause();
                  return;
                }
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
              {speaking && !paused ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            </button>
            <button
              type="button"
              className="tts-playback-btn"
              disabled={!speaking}
              onClick={stop}
              title="Stop"
              aria-label="Stop"
            >
              <StopIcon size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
