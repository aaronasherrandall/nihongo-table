import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function CounterChaos({ data }) {
  const [c, next] = useDeck(data.counters);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Counter Chaos" jp="助数詞" hint="Say the number with the right counter." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="stack">
        <div className="hero-num">{c[1]}</div>
        <JP as="div" className="answer-jp" text={c[0]} />
        <Reveal show={r} className="center">
          <JP as="div" className="answer-jp accent" text={c[2]} />
          <div className="answer-en">{c[3]}</div>
        </Reveal>
      </div>
    </GameFrame>
  );
}
