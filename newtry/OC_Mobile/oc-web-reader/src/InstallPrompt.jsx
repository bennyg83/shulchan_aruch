import { useState, useEffect, useCallback } from "react";

/**
 * PWA install / offline-save UI.
 *
 * - iOS: Safari → Share → Add to Home Screen (no install API).
 * - Android: beforeinstallprompt when available, else manual Chrome steps.
 * - Desktop: browser install icon in address bar.
 */

export function isStandalone() {
  try {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  } catch {
    return false;
  }
}

export function detectPlatform() {
  const ua = navigator.userAgent || "";
  const isIos = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isMobile = isIos || isAndroid;
  const isIosSafari = isIos && /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
  const isIosNonSafari = isIos && !isIosSafari;
  const isDesktop = !isMobile;
  let kind = "desktop";
  if (isIosSafari) kind = "ios-safari";
  else if (isIosNonSafari) kind = "ios-other";
  else if (isAndroid) kind = "android";
  return { isIos, isAndroid, isMobile, isIosSafari, isIosNonSafari, isDesktop, kind };
}

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    try {
      if (localStorage.getItem("oc_install_dismissed_v") !== "3") {
        localStorage.removeItem("oc_install_dismissed");
        localStorage.setItem("oc_install_dismissed_v", "3");
      }
      return !!localStorage.getItem("oc_install_dismissed");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true);
      return;
    }
    setPlatform(detectPlatform());

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true);
    try {
      localStorage.setItem("oc_install_dismissed", "1");
    } catch {
      /* ignore */
    }
  }, []);

  const openGuide = useCallback(() => setGuideOpen(true), []);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  const triggerInstall = useCallback(async () => {
    if (!deferredPrompt) {
      setGuideOpen(true);
      return false;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      dismissBanner();
    }
    setDeferredPrompt(null);
    return outcome === "accepted";
  }, [deferredPrompt, dismissBanner]);

  return {
    platform,
    installed,
    deferredPrompt,
    bannerDismissed,
    guideOpen,
    dismissBanner,
    openGuide,
    closeGuide,
    triggerInstall,
  };
}

function GuideSteps({ platform, onInstall, canNativeInstall }) {
  const kind = platform?.kind ?? "desktop";

  if (kind === "ios-other") {
    return (
      <div className="install-guide__body">
        <p className="install-guide__lead install-guide__lead--warn">
          You are not in Safari. On iPhone and iPad, offline install only works in <strong>Safari</strong>.
        </p>
        <ol className="install-guide__steps">
          <li>Copy this page address or open Safari manually.</li>
          <li>
            In <strong>Safari</strong>, go to{" "}
            <strong className="install-guide__url">bennyg83.github.io/shulchan_aruch</strong>
          </li>
          <li>
            Tap <strong>Share ↑</strong> at the bottom of Safari (not the address bar).
          </li>
          <li>
            Scroll down and tap <strong>Add to Home Screen</strong>.
          </li>
          <li>
            Tap <strong>Add</strong>, then open the app from your Home Screen.
          </li>
          <li>
            Keep the app open until the top banner shows <strong>“Ready for offline use”</strong> (697 simanim saved).
          </li>
        </ol>
      </div>
    );
  }

  if (kind === "ios-safari") {
    return (
      <div className="install-guide__body">
        <p className="install-guide__lead">
          Install this reader to your Home Screen. All 697 simanim of Orach Chayim will save for offline use.
        </p>
        <ol className="install-guide__steps">
          <li>
            Tap <strong>Share ↑</strong> at the <em>bottom</em> of Safari (square with arrow pointing up).
          </li>
          <li>
            Scroll the menu and tap <strong>Add to Home Screen</strong>.
          </li>
          <li>
            Confirm the name <strong>Shulchan Aruch</strong> and tap <strong>Add</strong>.
          </li>
          <li>
            Go to your Home Screen and open the new <strong>Shulchan Aruch</strong> icon — not a Safari bookmark.
          </li>
          <li>
            On first launch, stay in the app while the banner counts up{" "}
            <strong>Saving for offline… 697/697</strong>.
          </li>
          <li>When it says <strong>Ready for offline use</strong>, airplane mode works.</li>
        </ol>
        <p className="install-guide__note">
          Tip: Use Wi‑Fi for the first download (~90 MB of text). After that, no internet is needed.
        </p>
      </div>
    );
  }

  if (kind === "android") {
    return (
      <div className="install-guide__body">
        <p className="install-guide__lead">
          Install as an app so all 697 simanim download automatically for offline reading.
        </p>
        {canNativeInstall ? (
          <>
            <p className="install-guide__note install-guide__note--action">
              Your browser supports one-tap install:
            </p>
            <button type="button" className="install-guide__install-btn" onClick={onInstall}>
              Install app now
            </button>
            <p className="install-guide__note">Or follow the manual steps below.</p>
          </>
        ) : null}
        <ol className="install-guide__steps">
          <li>
            Use <strong>Chrome</strong> (recommended). Delete any old home-screen shortcut for this site first.
          </li>
          <li>
            Tap the <strong>⋮ menu</strong> (top-right) → <strong>Install app</strong> or{" "}
            <strong>Add to Home screen</strong>.
          </li>
          <li>
            The dialog must say <strong>Install</strong> with an app icon — not “Add shortcut”. If you only see
            shortcut, close all Chrome tabs, reopen this site, and try again.
          </li>
          <li>Open the app from your home screen (not the browser tab).</li>
          <li>
            Wait for <strong>Saving for offline…</strong> to reach 697/697 before going offline.
          </li>
        </ol>
        <p className="install-guide__note">
          Prefer a file download? You can also install the{" "}
          <a
            className="install-guide__link"
            href="https://github.com/bennyg83/shulchan_aruch/releases/download/android-standalone/ShulchanAruch-Standalone.apk"
          >
            standalone Android APK
          </a>{" "}
          (works offline immediately, no first-visit download).
        </p>
      </div>
    );
  }

  return (
    <div className="install-guide__body">
      <p className="install-guide__lead">
        Install this site as a desktop app. All 697 simanim will cache for offline reading.
      </p>
      {canNativeInstall ? (
        <>
          <p className="install-guide__note install-guide__note--action">One-tap install:</p>
          <button type="button" className="install-guide__install-btn" onClick={onInstall}>
            Install app now
          </button>
          <p className="install-guide__note">Or use your browser’s install control:</p>
        </>
      ) : null}
      <ol className="install-guide__steps">
        <li>
          In <strong>Chrome</strong> or <strong>Edge</strong>, look for the install icon in the address bar (⊕ or
          monitor symbol).
        </li>
        <li>
          Click <strong>Install</strong> and confirm.
        </li>
        <li>
          Open the installed app from your applications menu or desktop shortcut.
        </li>
        <li>
          On first run, wait until the banner shows <strong>Ready for offline use</strong> (697 simanim).
        </li>
      </ol>
      <p className="install-guide__note">
        Offline mode requires a network connection once to download the corpus. After that, the reader works without
        internet.
      </p>
    </div>
  );
}

/** Full-screen modal with platform-specific install instructions. */
export function InstallGuide({
  open,
  onClose,
  platform,
  deferredPrompt,
  triggerInstall,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const title =
    platform?.kind === "ios-safari" || platform?.kind === "ios-other"
      ? "Install on iPhone / iPad"
      : platform?.kind === "android"
        ? "Install on Android"
        : "Install for offline use";

  return (
    <div className="install-guide-overlay" onClick={onClose} role="presentation">
      <div
        className="install-guide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-guide-title"
      >
        <header className="install-guide__header">
          <h2 id="install-guide-title" className="install-guide__title">
            {title}
          </h2>
          <button type="button" className="install-guide__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <GuideSteps
          platform={platform}
          onInstall={triggerInstall}
          canNativeInstall={!!deferredPrompt}
        />
        <footer className="install-guide__footer">
          <button type="button" className="install-guide__done-btn" onClick={onClose}>
            Got it
          </button>
        </footer>
      </div>
    </div>
  );
}

/** Floating banner — first visit on mobile until dismissed. */
export function InstallBanner({
  platform,
  installed,
  deferredPrompt,
  bannerDismissed,
  dismissBanner,
  triggerInstall,
  openGuide,
}) {
  if (import.meta.env.VITE_STANDALONE) return null;
  if (!platform?.isMobile) return null;
  if (installed) return null;
  if (bannerDismissed) return null;

  const isIos = platform.isIos;

  return (
    <div className="install-banner">
      <div className="install-banner__inner">
        <div className="install-banner__icon" aria-hidden="true">
          📖
        </div>
        <div className="install-banner__content">
          <div className="install-banner__heading">Save for offline reading</div>
          {isIos ? (
            <p className="install-banner__text">
              {platform.kind === "ios-other"
                ? "Open in Safari to install — other browsers on iPhone cannot save offline."
                : "Add to Home Screen — all 697 simanim available offline after first download."}
            </p>
          ) : (
            <p className="install-banner__text">
              Install the app — all 697 simanim of Orach Chayim available offline.
            </p>
          )}
          <div className="install-banner__actions">
            {deferredPrompt && !isIos ? (
              <button type="button" className="install-banner__primary" onClick={triggerInstall}>
                Install now
              </button>
            ) : null}
            <button type="button" className="install-banner__secondary" onClick={openGuide}>
              {isIos ? "Show steps" : "How to install"}
            </button>
          </div>
        </div>
        <button type="button" className="install-banner__dismiss" onClick={dismissBanner} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  );
}

/** Sidebar panel — always available until installed. */
export function OfflineInstallPanel({
  platform,
  installed,
  deferredPrompt,
  openGuide,
  triggerInstall,
}) {
  if (import.meta.env.VITE_STANDALONE) return null;

  if (installed) {
    return (
      <div className="offline-install offline-install--done">
        <span className="offline-install__status">✓ Installed for offline</span>
      </div>
    );
  }

  const label =
    platform?.kind === "ios-safari" || platform?.kind === "ios-other"
      ? "Install on iPhone / iPad"
      : platform?.kind === "android"
        ? "Install on Android"
        : "Install for offline";

  return (
    <details className="offline-install-details">
      <summary className="offline-install-details__summary">Offline install</summary>
      <div className="offline-install">
        <p className="offline-install__blurb">
          Save all 697 simanim. One online visit, then no internet needed.
        </p>
        <div className="offline-install__actions">
          {deferredPrompt && !platform?.isIos ? (
            <button type="button" className="offline-install__btn offline-install__btn--primary" onClick={triggerInstall}>
              Install now
            </button>
          ) : null}
          <button type="button" className="offline-install__btn" onClick={openGuide}>
            {label} — steps
          </button>
        </div>
        {platform?.kind === "ios-other" ? (
          <p className="offline-install__warn">Use Safari — Chrome on iOS cannot install offline.</p>
        ) : null}
      </div>
    </details>
  );
}
