export const APK_DOWNLOAD_URL =
  "https://github.com/bennyg83/shulchan_aruch/releases/download/android-standalone/ShulchanAruch-Standalone.apk";
const RELEASE_API =
  "https://api.github.com/repos/bennyg83/shulchan_aruch/releases/tags/android-standalone";

export const UPDATE_EVENT = "oc-check-updates";

export function isNativeStandalone() {
  return import.meta.env.VITE_STANDALONE === "true";
}

export function localBuildId() {
  return String(import.meta.env.VITE_APP_BUILD || "dev").toLowerCase();
}

export function isAndroidUa() {
  try {
    return /android/i.test(navigator.userAgent || "");
  } catch {
    return false;
  }
}

export function isOnline() {
  try {
    return navigator.onLine !== false;
  } catch {
    return true;
  }
}

export function requestAppUpdateCheck() {
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

function shasMatch(local, remote) {
  if (!local || !remote || local === "dev") return false;
  const a = local.toLowerCase();
  const b = remote.toLowerCase();
  return a === b || a.startsWith(b) || b.startsWith(a);
}

export async function checkStandaloneApk() {
  const res = await fetch(RELEASE_API, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error("Could not reach GitHub");
  const data = await res.json();
  const match = String(data.body || "").match(/Built from commit `([0-9a-f]{7,40})`/i);
  const remoteSha = match ? match[1].toLowerCase() : "";
  const local = localBuildId();
  const upToDate = shasMatch(local, remoteSha);
  return {
    upToDate,
    remoteSha,
    local,
    publishedAt: data.published_at,
    downloadUrl:
      data.assets?.find((a) => /\.apk$/i.test(a.name))?.browser_download_url || APK_DOWNLOAD_URL,
  };
}

export function startApkDownload(url = APK_DOWNLOAD_URL) {
  window.location.assign(url);
}

export async function checkPwaUpdate() {
  const api = window.__appUpdate;
  if (typeof api?.checkPwa === "function") return api.checkPwa();
  if (!("serviceWorker" in navigator)) return { kind: "no-sw" };
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return { kind: "no-sw" };
  await reg.update();
  await new Promise((r) => setTimeout(r, 900));
  if (reg.waiting) {
    return {
      kind: "pwa-ready",
      apply() {
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
        setTimeout(() => window.location.reload(), 400);
      },
    };
  }
  return { kind: "pwa-current" };
}
