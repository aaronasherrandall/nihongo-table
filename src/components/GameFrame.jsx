import { useEffect, useRef, useState } from "react";

// Shared host chrome: title row, body, footer with Reveal / Next / timer.
// Space = reveal (or next once revealed). N = next. Esc = back (handled in App).
export default function GameFrame({ title, jp, hint, revealed, onReveal, onNext, nextLabel = "Next", children, timer = true, hideControls = false }) {
  useEffect(() => {
    const h = (e) => {
      if (hideControls) return;
      if (e.target.tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); if (!revealed && onReveal) onReveal(); else onNext(); }
      if (e.key.toLowerCase() === "n") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [revealed, onReveal, onNext, hideControls]);

  return (
    <section className="frame">
      <div className="frame-head">
        <div>
          <div className="frame-title">{title}</div>
          <div className="frame-jp">{jp}</div>
        </div>
        {hint && <div className="frame-hint">{hint}</div>}
      </div>
      <div className="frame-body">{children}</div>
      {!hideControls && (
        <div className="frame-foot">
          {timer && <Timer />}
          <div className="spacer" />
          {onReveal && !revealed && <button className="btn btn-gold" onClick={onReveal}>Reveal</button>}
          <button className={"btn " + (revealed || !onReveal ? "btn-primary" : "btn-ghost")} onClick={onNext}>{nextLabel}</button>
        </div>
      )}
    </section>
  );
}

export function Timer({ presets = [10, 30, 60] }) {
  const [left, setLeft] = useState(null);
  const ref = useRef(null);
  const stop = () => { clearInterval(ref.current); ref.current = null; setLeft(null); };
  const start = (s) => {
    stop();
    setLeft(s);
    ref.current = setInterval(() => {
      setLeft(v => {
        if (v <= 1) { clearInterval(ref.current); ref.current = null; return 0; }
        return v - 1;
      });
    }, 1000);
  };
  useEffect(() => () => clearInterval(ref.current), []);
  if (left !== null) {
    return (
      <button className={"timer " + (left === 0 ? "timer-done" : left <= 5 ? "timer-low" : "")} onClick={stop} title="Tap to clear">
        {left === 0 ? "時間です" : left}
      </button>
    );
  }
  return (
    <div className="timer-presets">
      {presets.map(p => <button key={p} className="btn btn-tiny" onClick={() => start(p)}>{p}s</button>)}
    </div>
  );
}

export function Reveal({ show, children, className = "" }) {
  return <div className={"reveal " + (show ? "reveal-on " : "") + className}>{children}</div>;
}
