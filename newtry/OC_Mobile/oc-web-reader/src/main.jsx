import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./lib/ErrorBoundary.jsx";
import "./web.css";

function showBootError(rootEl, err) {
  const msg = err?.message || String(err);
  rootEl.innerHTML =
    `<div style="margin:2rem;font-family:Georgia,serif;max-width:40rem">` +
    `<p style="color:#a63d3d;font-weight:700">React failed to start</p>` +
    `<pre style="white-space:pre-wrap;font-size:13px">${msg.replace(/</g, "&lt;")}</pre></div>`;
  console.error("[oc-web-reader]", err);
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<p style='margin:2rem'>Missing #root element.</p>";
} else {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (err) {
    showBootError(rootEl, err);
  }
}
