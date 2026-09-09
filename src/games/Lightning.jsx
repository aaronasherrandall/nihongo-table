import { useEffect, useRef, useState } from "react";
import GameFrame from "../components/GameFrame.jsx";
import { shuffle } from "../lib/deck.js";

const ROUNDS = 10;

export default function Lightning({ data }) {
  const [secs, setSecs] = useState(5);
  const [items, setItems] = useState([]);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | q | a | done
  const [t, setT] = useState(0);
  const timer = useRef(null);

  const clear = () => { clearInterval(timer.current); timer.current = null; };
  useEffect(() => clear, []);

  const start = () => {
    setItems(shuffle(data.kanji).slice(0, ROUNDS));
    setI(0);
    ask(0);
  };
  const ask = (idx) => {
    clear();
    setI(idx); setPhase("q"); setT(secs);
    timer.current = setInterval(() => {
      setT(v => {
        if (v <= 1) { clear(); show(idx); return 0; }
        return v - 1;
      });
    }, 1000);
  };
  const show = (idx) => {
    setPhase("a");
    timer.current = setTimeout(() => {
      if (idx + 1 >= ROUNDS) { setPhase("done"); }
      else ask(idx + 1);
    }, 1800);
  };
  const stop = () => { clear(); setPhase("idle"); };

  const cur = items[i];
  return (
    <GameFrame title="Lightning Round" jp="早押し" hint={`${ROUNDS} kanji, ${secs}s each. Whole table shouts the reading.`} onNext={phase === "idle" ? start : stop} nextLabel={phase === "idle" ? "Start" : "Stop"} timer={false}>
      {phase === "idle" && (
        <div className="stack">
          <div className="answer-en">Seconds per kanji</div>
          <div className="row-btns">{[3, 5, 8].map(s => <button key={s} className={"btn " + (secs === s ? "btn-gold" : "btn-ghost")} onClick={() => setSecs(s)}>{s}s</button>)}</div>
        </div>
      )}
      {(phase === "q" || phase === "a") && cur && (
        <div className="stack">
          <div className="progress">{i + 1} / {ROUNDS}</div>
          <div className="hero-jp">{cur[0]}</div>
          {phase === "q" ? <div className={"lightning-t " + (t <= 2 ? "timer-low" : "")}>{t}</div>
            : <div className="answer-jp accent">{cur[1]}　<span className="answer-en">{cur[2]}</span></div>}
        </div>
      )}
      {phase === "done" && (
        <div className="stack">
          <div className="answer-en">Round complete — recap</div>
          <div className="recap">
            {items.map((k, idx) => <div key={idx} className="recap-row"><span>{k[0]}</span><span className="dim">{k[1]}</span><span className="dim">{k[2]}</span></div>)}
          </div>
        </div>
      )}
    </GameFrame>
  );
}
