import { useCallback, useEffect, useState } from "react";
import {
  UPDATE_EVENT,
  checkPwaUpdate,
  checkStandaloneApk,
  isAndroidUa,
  isNativeStandalone,
  isOnline,
  startApkDownload,
} from "./lib/appUpdate.js";

const SNOOZE_KEY = "oc_update_snooze_until";
const SESSION_KEY = "oc_update_asked";
const SNOOZE_MS = 24 * 60 * 60 * 1000;

function snoozed() {
  try {
    const until = Number(localStorage.getItem(SNOOZE_KEY) || 0);
    return Date.now() < until;
  } catch {
    return false;
  }
}

function setSnooze() {
  try {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS));
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

function askedThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export default function AppUpdatePrompt() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("ask");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    setMode("ask");
    setMessage("");
  }, []);

  const runCheck = useCallback(async () => {
    setOpen(true);
    setMode("checking");
    setMessage("");
    try {
      if (!isOnline()) {
        setMode("error");
        setMessage("You are offline. Connect to the internet to check for updates.");
        return;
      }
      if (isNativeStandalone()) {
        const result = await checkStandaloneApk();
        if (result.upToDate) {
          setMode("uptodate");
          return;
        }
        setDownloadUrl(result.downloadUrl);
        setMode("available");
        return;
      }
      const pwa = await checkPwaUpdate();
      if (pwa.kind === "pwa-ready") {
        setMode("applying");
        pwa.apply?.();
        return;
      }
      if (pwa.kind === "pwa-current" || pwa.kind === "no-sw") {
        setMode("uptodate");
        return;
      }
      setMode("uptodate");
    } catch (err) {
      setMode("error");
      setMessage(err?.message || "Could not check for updates.");
    }
  }, []);

  useEffect(() => {
    const onAsk = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      runCheck();
    };
    window.addEventListener(UPDATE_EVENT, onAsk);
    return () => window.removeEventListener(UPDATE_EVENT, onAsk);
  }, [runCheck]);

  useEffect(() => {
    if (!isAndroidUa()) return;
    if (!isOnline()) return;
    if (snoozed() || askedThisSession()) return;
    const t = setTimeout(() => {
      setOpen(true);
      setMode("ask");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  const title =
    mode === "ask"
      ? "Check for updates?"
      : mode === "checking"
        ? "Checking for updates"
        : mode === "available"
          ? "Update available"
          : mode === "applying"
            ? "Updating"
            : mode === "uptodate"
              ? "Up to date"
              : "Update check";

  const body =
    mode === "ask"
      ? "You are online. Check GitHub for a newer version of this app?"
      : mode === "checking"
        ? "Looking for a newer build…"
        : mode === "available"
          ? "A newer app is on GitHub. Download it now? Android will install over this one; keep your reader data."
          : mode === "applying"
            ? "Downloading the update. The reader will reload when it is ready."
            : mode === "uptodate"
              ? "This app already has the latest version."
              : message || "Could not check for updates.";

  return (
    <div className="settings-overlay" onClick={mode === "checking" || mode === "applying" ? undefined : close} role="presentation">
      <div
        className="settings-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-prompt-title"
      >
        <header className="settings-panel__header">
          <h2 id="update-prompt-title" className="settings-panel__title">
            {title}
          </h2>
          {mode !== "checking" && mode !== "applying" ? (
            <button type="button" className="settings-panel__close" onClick={close} aria-label="Close">
              ×
            </button>
          ) : null}
        </header>
        <section className="settings-section">
          <p className="settings-section__hint" style={{ marginBottom: 0 }}>
            {body}
          </p>
        </section>
        <footer className="settings-panel__footer update-prompt__actions">
          {mode === "ask" ? (
            <>
              <button
                type="button"
                className="settings-panel__done settings-panel__done--ghost"
                onClick={() => {
                  setSnooze();
                  close();
                }}
              >
                Not now
              </button>
              <button
                type="button"
                className="settings-panel__done"
                onClick={() => {
                  try {
                    sessionStorage.setItem(SESSION_KEY, "1");
                  } catch {
                    /* ignore */
                  }
                  runCheck();
                }}
              >
                Check
              </button>
            </>
          ) : null}
          {mode === "available" ? (
            <>
              <button type="button" className="settings-panel__done settings-panel__done--ghost" onClick={close}>
                Later
              </button>
              <button
                type="button"
                className="settings-panel__done"
                onClick={() => {
                  startApkDownload(downloadUrl);
                  close();
                }}
              >
                Download update
              </button>
            </>
          ) : null}
          {mode === "uptodate" || mode === "error" ? (
            <button type="button" className="settings-panel__done" onClick={close}>
              OK
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
