import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useTTS, queueForSection, queueInterwoven, stripForSpeech } from "./tts.js";
import { htmlIsVisuallyEmpty, noteVisibleForLanguages } from "./corpus.js";

const PlayIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const PauseIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);
const StopIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);
const SpeakerIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const BookStackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h6" />
  </svg>
);

function AudioBtn({ id, tts, onPlay, size = "sm" }) {
  const isActive = tts.activeId === id || (tts.activeId && tts.activeId.startsWith(id + "-"));
  const isSpeaking = tts.speaking && isActive;
  const small = size === "sm";
  return (
    <button
      type="button"
      onClick={isSpeaking ? tts.stop : onPlay}
      title={isSpeaking ? "Stop" : "Read aloud"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: small ? 28 : 32,
        height: small ? 28 : 32,
        borderRadius: 8,
        border: `1.5px solid ${isSpeaking ? "var(--accent)" : "var(--border)"}`,
        background: isSpeaking ? "var(--accent)" : "transparent",
        color: isSpeaking ? "white" : "var(--text-muted)",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.15s",
        animation: isSpeaking && !tts.paused ? "pulse 1.4s ease-in-out infinite" : "none",
      }}
    >
      {isSpeaking ? <StopIcon size={small ? 12 : 14} /> : <SpeakerIcon size={small ? 12 : 14} />}
    </button>
  );
}

function PlaybackBar({ tts, currentSeif, commentators }) {
  if (!tts.speaking) return null;
  let label = "Reading…";
  const aid = tts.activeId;
  if (aid) {
    const intP = `int-${currentSeif}-`;
    const secP = `s${currentSeif}-`;
    if (aid.endsWith("-mr") || aid === `${intP}mr` || aid === `${secP}mr`) label = `Seif ${currentSeif} · Mechaber & Rama`;
    else {
      for (const c of commentators) {
        const pInt = `${intP}${c.key}`;
        const pSec = `${secP}${c.key}`;
        if (aid.startsWith(pInt) || aid.startsWith(pSec)) {
          label = `Seif ${currentSeif} · ${c.label}`;
          break;
        }
      }
    }
  }
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        background: "var(--playbar-bg)",
        borderTop: "1px solid var(--border)",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
        {[0.6, 1, 0.7, 1, 0.5].map((h, i) => (
          <div
            key={i}
            style={{
              width: 3,
              borderRadius: 2,
              background: "var(--accent)",
              height: tts.paused ? 4 : undefined,
              animation: tts.paused ? "none" : `wave ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
              minHeight: 4,
              maxHeight: 18,
            }}
          />
        ))}
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-secondary)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        <button
          type="button"
          onClick={tts.togglePause}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1.5px solid var(--border)",
            background: "var(--card-bg)",
            color: "var(--text-primary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tts.paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
        </button>
        <button
          type="button"
          onClick={tts.stop}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1.5px solid var(--border)",
            background: "var(--card-bg)",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StopIcon size={14} />
        </button>
      </div>
    </div>
  );
}

function IconBtn({ onClick, active, children, title, disabled = false }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      title={title}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
        background: active ? "var(--accent)" : "var(--card-bg)",
        color: active ? "white" : "var(--text-muted)",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        flexShrink: 0,
        opacity: disabled ? 0.55 : 1,
      }}
    >
      {children}
    </button>
  );
}

function PillBtn({ on, onClick, children, accentColor, disabled = false }) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        padding: "5px 11px",
        borderRadius: 20,
        border: `1.5px solid ${on ? accentColor || "var(--accent)" : "var(--border)"}`,
        background: on ? accentColor || "var(--accent)" : "transparent",
        color: on ? "white" : "var(--text-muted)",
        fontSize: 12,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      {children}
    </button>
  );
}

function CommentaryBlock({ seifNum, cKey, label, notes, showHebrew, showEnglish, color, tts }) {
  const [open, setOpen] = useState(true);
  if (!notes || notes.length === 0) return null;
  const visibleRows = notes
    .map((note, i) => ({ note, i }))
    .filter(({ note }) => noteVisibleForLanguages(showHebrew, showEnglish, note));
  if (visibleRows.length === 0) return null;
  const sectionId = `s${seifNum}-${cKey}`;
  const isActive = tts.speaking && tts.activeId && tts.activeId.startsWith(sectionId);
  const handlePlay = () => {
    const chunks = [];
    visibleRows.forEach(({ note, i }) => {
      const he = stripForSpeech(note.hebrew);
      const en = stripForSpeech(note.english);
      if (showHebrew && he) chunks.push({ id: `${sectionId}-h-${i}`, text: `${label}. ${he}` });
      if (showEnglish && en) chunks.push({ id: `${sectionId}-e-${i}`, text: en });
    });
    if (chunks.length === 0) return;
    tts.play(chunks);
  };
  return (
    <div
      style={{
        borderRadius: 10,
        border: `1.5px solid ${isActive ? color : "var(--border)"}`,
        overflow: "hidden",
        marginBottom: 10,
        transition: "border-color 0.2s",
        boxShadow: isActive ? `0 0 0 3px ${color}22` : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "9px 13px",
          background: "var(--source-header)",
          borderBottom: open ? "1px solid var(--border)" : "none",
          gap: 8,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
        >
          <div style={{ width: 3, height: 14, borderRadius: 2, background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", color, textTransform: "uppercase" }}>{label}</span>
          <span
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              background: "var(--badge-bg)",
              borderRadius: 20,
              padding: "1px 7px",
              fontWeight: 600,
            }}
          >
            {visibleRows.length}
          </span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", marginLeft: "auto" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <AudioBtn id={sectionId} tts={tts} onPlay={handlePlay} size="sm" />
      </div>
      {open &&
        visibleRows.map(({ note, i }, j) => {
          const hasHebrewBody = showHebrew && !htmlIsVisuallyEmpty(note.hebrew);
          const hasEnglishBody = showEnglish && !htmlIsVisuallyEmpty(note.english);
          return (
            <div
              key={i}
              style={{
                padding: "11px 14px",
                borderBottom: j < visibleRows.length - 1 ? "1px solid var(--border-light)" : "none",
                background:
                  tts.activeId === `${sectionId}-h-${i}` || tts.activeId === `${sectionId}-e-${i}` ? "var(--highlight-bg)" : "transparent",
                transition: "background 0.3s",
              }}
            >
              {note.label ? (
                <div style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: "0.08em", marginBottom: 5 }}>{note.label}</div>
              ) : null}
              {hasHebrewBody ? (
                <div
                  style={{
                    direction: "rtl",
                    textAlign: "right",
                    fontFamily: "'Frank Ruhl Libre','David','Times New Roman',serif",
                    fontSize: 14.5,
                    lineHeight: 1.85,
                    color: "var(--text-primary)",
                    marginBottom: hasEnglishBody ? 10 : 0,
                  }}
                  dangerouslySetInnerHTML={{ __html: note.hebrew }}
                />
              ) : null}
              {hasEnglishBody ? (
                <div
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    paddingTop: hasHebrewBody ? 10 : 0,
                    borderTop: hasHebrewBody ? "1px dashed var(--border-light)" : "none",
                  }}
                  dangerouslySetInnerHTML={{ __html: note.english }}
                />
              ) : null}
            </div>
          );
        })}
    </div>
  );
}

function ReferenceBar({ seifData, showHebrew, showEnglish, tts, dark }) {
  const [expanded, setExpanded] = useState(false);
  const mrId = `s${seifData.seif}-mr`;
  const mr = seifData.mechaber_rama;
  const preview = showHebrew ? stripForSpeech(mr.hebrew).slice(0, 140) : stripForSpeech(mr.english).slice(0, 140);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: dark ? "rgba(18,21,38,0.97)" : "rgba(236,232,225,0.97)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px" }}>
        <div
          style={{
            minWidth: 22,
            height: 22,
            borderRadius: 6,
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: 11,
            marginTop: 1,
            flexShrink: 0,
          }}
        >
          {seifData.seif}
        </div>
        <button type="button" onClick={() => setExpanded((e) => !e)} style={{ flex: 1, minWidth: 0, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Mechaber &amp; Rama</div>
          {!expanded && (
            <div
              style={{
                fontSize: showHebrew ? 13 : 12.5,
                color: "var(--text-secondary)",
                direction: showHebrew ? "rtl" : "ltr",
                textAlign: showHebrew ? "right" : "left",
                fontFamily: showHebrew ? "'Frank Ruhl Libre','David',serif" : "inherit",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {preview}
              …
            </div>
          )}
        </button>
        <AudioBtn id={mrId} tts={tts} onPlay={() => tts.play(queueForSection(mrId, stripForSpeech(mr.english)))} size="sm" />
        <button type="button" onClick={() => setExpanded((e) => !e)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", marginTop: 2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      {expanded && (
        <div style={{ padding: "0 14px 12px", borderTop: "1px dashed var(--border-light)" }}>
          {showHebrew && (
            <div
              style={{
                direction: "rtl",
                textAlign: "right",
                fontFamily: "'Frank Ruhl Libre','David','Times New Roman',serif",
                fontSize: 15,
                lineHeight: 2,
                color: "var(--text-primary)",
                marginTop: 10,
              }}
              dangerouslySetInnerHTML={{ __html: mr.hebrew }}
            />
          )}
          {showEnglish && (
            <div
              style={{
                fontSize: 13.5,
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                marginTop: showHebrew ? 10 : 10,
                paddingTop: showHebrew ? 8 : 0,
                borderTop: showHebrew ? "1px dashed var(--border-light)" : "none",
              }}
              dangerouslySetInnerHTML={{ __html: mr.english }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function InterwovenBtn({ seifData, visibleCommentators, commentators, showHebrew, showEnglish, tts }) {
  const intPrefix = `int-${seifData.seif}-`;
  const isActive = tts.speaking && tts.activeId && tts.activeId.startsWith(intPrefix);
  const handlePlay = () => {
    if (isActive) {
      tts.stop();
      return;
    }
    tts.play(queueInterwoven(seifData.seif, seifData, visibleCommentators, commentators, showHebrew, showEnglish));
  };
  return (
    <button type="button" onClick={handlePlay} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 20, border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border)"}`, background: isActive ? "var(--accent)" : "var(--card-bg)", color: isActive ? "white" : "var(--text-secondary)", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", animation: isActive && !tts.paused ? "pulse 1.4s ease-in-out infinite" : "none" }}>
      {isActive ? <StopIcon size={13} /> : <PlayIcon size={13} />}
      {isActive ? "Stop" : "Play all (interwoven)"}
    </button>
  );
}

function SeifView({ seifData, commentators, showHebrew, showEnglish, showMR, visibleCommentators, tts, dark }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <ReferenceBar seifData={seifData} showHebrew={showHebrew} showEnglish={showEnglish} tts={tts} dark={dark} />
      </div>
      <div style={{ padding: "12px 14px 0" }}>
        {showMR && (
          <div
            style={{
              background: "var(--mechaber-bg)",
              borderRadius: 10,
              border: `1.5px solid ${tts.activeId === `s${seifData.seif}-mr` ? "var(--accent)" : "var(--accent-light)"}`,
              padding: "12px 14px",
              marginBottom: 14,
              transition: "border-color 0.2s",
              boxShadow: tts.activeId === `s${seifData.seif}-mr` ? "0 0 0 3px var(--accent-glow)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.09em", color: "var(--accent)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 3, height: 14, background: "var(--accent)", borderRadius: 2 }} />
                Mechaber and Rama
              </div>
              <AudioBtn id={`s${seifData.seif}-mr`} tts={tts} onPlay={() => tts.play(queueForSection(`s${seifData.seif}-mr`, stripForSpeech(seifData.mechaber_rama.english)))} />
            </div>
            {showHebrew && (
              <div style={{ direction: "rtl", textAlign: "right", fontFamily: "'Frank Ruhl Libre','David','Times New Roman',serif", fontSize: 16, lineHeight: 2, color: "var(--text-primary)", marginBottom: showEnglish ? 10 : 0 }} dangerouslySetInnerHTML={{ __html: seifData.mechaber_rama.hebrew }} />
            )}
            {showEnglish && (
              <div style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)", paddingTop: showHebrew ? 10 : 0, borderTop: showHebrew ? "1px dashed var(--accent-light)" : "none" }} dangerouslySetInnerHTML={{ __html: seifData.mechaber_rama.english }} />
            )}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <InterwovenBtn
            seifData={seifData}
            visibleCommentators={visibleCommentators}
            commentators={commentators}
            showHebrew={showHebrew}
            showEnglish={showEnglish}
            tts={tts}
          />
        </div>
        {commentators.map((c) => {
          if (!visibleCommentators[c.key]) return null;
          return (
            <CommentaryBlock
              key={c.key}
              seifNum={seifData.seif}
              cKey={c.key}
              label={c.label}
              notes={seifData[c.key]}
              showHebrew={showHebrew}
              showEnglish={showEnglish}
              color={c.color}
              tts={tts}
            />
          );
        })}
        <div style={{ height: 88 }} />
      </div>
    </div>
  );
}

function SimanPickerDrawer({ catalog, activeSimanEntry, onSelect, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "var(--card-bg)",
        borderTop: "1px solid var(--border)",
        borderRadius: "16px 16px 0 0",
        padding: "16px 16px 36px",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.18)",
        maxHeight: "72vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border)", margin: "0 auto 12px" }} />
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>Jump to siman</div>
      <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {(catalog || []).map((e) => {
          const active = activeSimanEntry && e.corpusPath === activeSimanEntry.corpusPath;
          return (
            <button
              key={e.corpusPath}
              type="button"
              onClick={() => {
                if (!active) onSelect(e);
                onClose();
              }}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: 10,
                border: `1.5px solid ${active ? "var(--accent)" : "var(--border)"}`,
                background: active ? "var(--mechaber-bg)" : "var(--source-header)",
                cursor: active ? "default" : "pointer",
                color: "var(--text-primary)",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700 }}>Siman {e.siman}</div>
              {e.title ? <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{e.title}</div> : null}
              {e.subtitle ? <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{e.subtitle}</div> : null}
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, fontFamily: "ui-monospace, monospace" }}>{e.corpusPath}</div>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onClose}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 10,
          border: "none",
          background: "var(--accent)",
          color: "white",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          marginTop: 14,
        }}
      >
        Close
      </button>
    </div>
  );
}

function FilterDrawer({
  showHebrew,
  setShowHebrew,
  showEnglish,
  setShowEnglish,
  showMR,
  setShowMR,
  onlyMR,
  setOnlyMR,
  visibleCommentators,
  onCommentaryPillClick,
  onResetCommentators,
  commentators,
  onClose,
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "var(--card-bg)",
        borderTop: "1px solid var(--border)",
        borderRadius: "16px 16px 0 0",
        padding: "16px 16px 36px",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.18)",
      }}
    >
      <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border)", margin: "0 auto 16px" }} />
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14 }}>Display settings</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Language</div>
        <div style={{ display: "flex", gap: 8 }}>
          <PillBtn on={showHebrew} onClick={() => setShowHebrew((h) => !h)}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>עברית</span>
          </PillBtn>
          <PillBtn on={showEnglish} onClick={() => setShowEnglish((e) => !e)}>
            English
          </PillBtn>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Core text</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <PillBtn on={showMR} onClick={() => setShowMR((m) => !m)}>
            Mechaber &amp; Rama
          </PillBtn>
          <PillBtn on={onlyMR} onClick={() => setOnlyMR((v) => !v)} accentColor="var(--accent)">
            Only Mechaber &amp; Rama
          </PillBtn>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Commentaries</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.35, marginBottom: 10 }}>
          First tap selects only that commentary. After that, each tap adds or removes a commentary. Use reset to show all again.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {commentators.map((c) => (
            <PillBtn
              key={c.key}
              on={visibleCommentators[c.key]}
              onClick={() => onCommentaryPillClick(c.key)}
              accentColor={c.color}
              disabled={onlyMR}
            >
              {c.label}
            </PillBtn>
          ))}
          <button
            type="button"
            onClick={onResetCommentators}
            disabled={onlyMR}
            style={{
              padding: "5px 11px",
              borderRadius: 20,
              border: "1.5px dashed var(--border)",
              background: "transparent",
              color: "var(--text-muted)",
              fontSize: 11,
              fontWeight: 700,
              cursor: onlyMR ? "not-allowed" : "pointer",
              opacity: onlyMR ? 0.55 : 1,
            }}
          >
            Reset commentaries
          </button>
        </div>
        {onlyMR && (
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.35 }}>
            Commentaries are hidden while “Only Mechaber &amp; Rama” is on.
          </div>
        )}
      </div>
      <button type="button" onClick={onClose} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "var(--accent)", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 6 }}>
        Done
      </button>
    </div>
  );
}

export default function ReaderFlow({ seifData, commentators, bootErr, catalog, activeSimanEntry, onSelectSiman, seifim, onPrev, onNext }) {
  /** New sessions default to night mode; toggle does not persist (each load starts dark). */
  const [dark, setDark] = useState(true);
  const [showSimanPicker, setShowSimanPicker] = useState(false);
  const [showHebrew, setShowHebrew] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [showMR, setShowMR] = useState(true);
  const [onlyMR, setOnlyMR] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  /** `null` = show every commentary in `commentatorsForLang`; otherwise explicit per-key booleans. */
  const [visibilityOverride, setVisibilityOverride] = useState(null);
  const lastVisibleCommentatorsRef = useRef(undefined);
  const prevOnlyMrRef = useRef(onlyMR);
  /** After opening the filter drawer, first commentary tap replaces the set with that one only; later taps toggle add/remove. */
  const commentaryPickFreshRef = useRef(true);

  const tts = useTTS();

  const commentatorsForLang = useMemo(() => {
    if (!seifData) return commentators;
    return commentators.filter((c) => {
      const notes = seifData[c.key];
      return Array.isArray(notes) && notes.some((n) => noteVisibleForLanguages(showHebrew, showEnglish, n));
    });
  }, [commentators, seifData, showHebrew, showEnglish]);

  const visibleCommentators = useMemo(
    () => visibilityOverride ?? Object.fromEntries(commentatorsForLang.map((c) => [c.key, true])),
    [visibilityOverride, commentatorsForLang]
  );

  useEffect(() => {
    setVisibilityOverride(null);
    commentaryPickFreshRef.current = true;
  }, [commentatorsForLang]);

  useEffect(() => {
    if (showFilter) commentaryPickFreshRef.current = true;
  }, [showFilter]);

  useEffect(() => {
    if (onlyMR && !prevOnlyMrRef.current) {
      lastVisibleCommentatorsRef.current = visibilityOverride;
      setShowMR(true);
      setVisibilityOverride(Object.fromEntries(commentatorsForLang.map((c) => [c.key, false])));
    } else if (!onlyMR && prevOnlyMrRef.current) {
      if (lastVisibleCommentatorsRef.current !== undefined) {
        setVisibilityOverride(lastVisibleCommentatorsRef.current);
        lastVisibleCommentatorsRef.current = undefined;
      }
    }
    prevOnlyMrRef.current = onlyMR;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyMR]);

  const onCommentaryPillClick = useCallback(
    (key) => {
      if (onlyMR) return;
      if (commentaryPickFreshRef.current) {
        commentaryPickFreshRef.current = false;
        setVisibilityOverride(Object.fromEntries(commentatorsForLang.map((c) => [c.key, c.key === key])));
        return;
      }
      setVisibilityOverride((prev) => {
        const base = prev ?? Object.fromEntries(commentatorsForLang.map((c) => [c.key, true]));
        const next = { ...base, [key]: !base[key] };
        if (!Object.values(next).some(Boolean)) {
          commentaryPickFreshRef.current = true;
          return null;
        }
        return next;
      });
    },
    [commentatorsForLang, onlyMR]
  );

  const onResetCommentators = useCallback(() => {
    if (onlyMR) return;
    commentaryPickFreshRef.current = true;
    setVisibilityOverride(null);
  }, [commentatorsForLang, onlyMR]);

  const theme = dark
    ? {
        "--bg": "#0e1120",
        "--card-bg": "#161929",
        "--source-header": "#161929",
        "--mechaber-bg": "#1a2040",
        "--text-primary": "#e6e9f5",
        "--text-secondary": "#9ba3c4",
        "--text-muted": "#6b7494",
        "--border": "#252a3e",
        "--border-light": "#1e2236",
        "--accent": "#7c9ef0",
        "--accent-light": "#253068",
        "--accent-glow": "#7c9ef022",
        "--badge-bg": "#1e2236",
        "--highlight-bg": "#1e2840",
        "--playbar-bg": "rgba(14,17,32,0.97)",
        "--nav-bg": "rgba(14,17,32,0.97)",
      }
    : {
        "--bg": "#f0ece4",
        "--card-bg": "#ffffff",
        "--source-header": "#fafaf8",
        "--mechaber-bg": "#eef2ff",
        "--text-primary": "#18192e",
        "--text-secondary": "#434660",
        "--text-muted": "#7a7d96",
        "--border": "#ddd9d0",
        "--border-light": "#eae6df",
        "--accent": "#3a58a0",
        "--accent-light": "#c0ccf0",
        "--accent-glow": "#3a58a022",
        "--badge-bg": "#f0eee8",
        "--highlight-bg": "#f0f4ff",
        "--playbar-bg": "rgba(240,236,228,0.97)",
        "--nav-bg": "rgba(240,236,228,0.97)",
      };

  if (bootErr) {
    return (
      <div className="boot-screen" style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ color: "#f0a4a4" }}>{bootErr}</p>
        <p style={{ fontSize: 14, color: "#9ba3c4" }}>
          Run <code>npm run sync:oc1-siman1</code> (or your siman sync script), then reload.
        </p>
      </div>
    );
  }

  if (!seifData) {
    return (
      <div className="boot-screen">
        <p style={{ fontSize: 16, margin: 0 }}>Loading corpus…</p>
        <p style={{ fontSize: 13, color: "#9ba3c4", marginTop: 12, maxWidth: 440 }}>
          Downloading Hebrew and English for this seif (many small files). On a slow connection this can take up to a minute.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.65; } }
        @keyframes wave { from { height: 4px; } to { height: 18px; } }
      `}</style>
      <div
        style={{
          ...Object.fromEntries(Object.entries(theme)),
          height: "100vh",
          maxHeight: "100vh",
          maxWidth: 480,
          margin: "0 auto",
          background: "var(--bg)",
          fontFamily: "'Lora', Georgia, serif",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          color: "var(--text-primary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", background: "var(--nav-bg)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", flexShrink: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconBtn onClick={onPrev || (() => {})} active={false} title="Previous seif" disabled={!onPrev}>
              <ChevronLeft />
            </IconBtn>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: "var(--accent)", textTransform: "uppercase" }}>
                OC · Siman {activeSimanEntry?.siman ?? "—"}
                {Array.isArray(seifim) && seifim.length ? ` · ${seifim.length} se’ifim` : ""}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1 }}>Seif {seifData.seif}</div>
            </div>
            <IconBtn onClick={onNext || (() => {})} active={false} title="Next seif" disabled={!onNext}>
              <ChevronRight />
            </IconBtn>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconBtn onClick={() => setShowSimanPicker(true)} active={showSimanPicker} title="Choose siman">
              <BookStackIcon />
            </IconBtn>
            <IconBtn onClick={() => setShowHebrew((h) => !h)} active={showHebrew} title="Hebrew">
              <span style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 800, fontSize: 14 }}>א</span>
            </IconBtn>
            <IconBtn onClick={() => setShowEnglish((e) => !e)} active={showEnglish} title="English">
              <span style={{ fontWeight: 800, fontSize: 12 }}>A</span>
            </IconBtn>
            <IconBtn onClick={() => setDark((d) => !d)} title={dark ? "Day" : "Night"}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </IconBtn>
            <IconBtn onClick={() => setShowFilter((f) => !f)} active={showFilter} title="Filters">
              <FilterIcon />
            </IconBtn>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "7px 12px", background: "var(--card-bg)", borderBottom: "1px solid var(--border)", flexShrink: 0, fontSize: 12, color: "var(--text-muted)", gap: 8, flexWrap: "wrap" }}>
          <span>Manifest-driven · {commentatorsForLang.length} commentaries</span>
          <span style={{ opacity: 0.85 }}>·</span>
          <span title="Last siman and seif are saved on this device">Position saved on device</span>
        </div>

        <SeifView
          seifData={seifData}
          commentators={commentatorsForLang}
          showHebrew={showHebrew}
          showEnglish={showEnglish}
          showMR={showMR}
          visibleCommentators={visibleCommentators}
          tts={tts}
          dark={dark}
        />

        <PlaybackBar tts={tts} currentSeif={seifData.seif} commentators={commentatorsForLang} />

        {showSimanPicker && (
          <>
            <div
              onClick={() => setShowSimanPicker(false)}
              style={{ position: "absolute", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            />
            <SimanPickerDrawer
              catalog={catalog}
              activeSimanEntry={activeSimanEntry}
              onSelect={onSelectSiman}
              onClose={() => setShowSimanPicker(false)}
            />
          </>
        )}

        {showFilter && (
          <>
            <div onClick={() => setShowFilter(false)} style={{ position: "absolute", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }} />
            <FilterDrawer
              showHebrew={showHebrew}
              setShowHebrew={setShowHebrew}
              showEnglish={showEnglish}
              setShowEnglish={setShowEnglish}
              showMR={showMR}
              setShowMR={setShowMR}
              onlyMR={onlyMR}
              setOnlyMR={setOnlyMR}
              visibleCommentators={visibleCommentators}
              onCommentaryPillClick={onCommentaryPillClick}
              onResetCommentators={onResetCommentators}
              commentators={commentatorsForLang}
              onClose={() => setShowFilter(false)}
            />
          </>
        )}

        {!showHebrew && !showEnglish && (
          <div
            style={{
              position: "absolute",
              bottom: tts.speaking ? 60 : 16,
              left: 16,
              right: 16,
              zIndex: 300,
              background: dark ? "#3a1a1a" : "#fff0f0",
              border: "1px solid #d06060",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              color: dark ? "#e08080" : "#b03030",
            }}
          >
            Both languages hidden. Tap א or A to show text.
          </div>
        )}
      </div>
    </>
  );
}
