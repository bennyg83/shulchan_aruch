import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { err: null };

  static getDerivedStateFromError(err) {
    return { err };
  }

  render() {
    if (this.state.err) {
      return (
        <div className="boot-screen" style={{ textAlign: "left", maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Something broke in the reader UI.</p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.9 }}>{String(this.state.err?.message || this.state.err)}</pre>
          <p style={{ fontSize: 14, marginTop: 16 }}>Reload the page. If this persists, open DevTools (F12) and check the Console tab.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
