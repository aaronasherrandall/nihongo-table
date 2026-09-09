import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function TwoTruths({ data }) {
  const [t, next] = useDeck(data.twoTruths);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Two Truths and a Lie" jp="嘘はどれ" hint="Find the false statement and explain why in Japanese." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <JP as="div" className="topic" text={t.topic} />
      <div className="list">
        {t.statements.map((s, i) => (
          <JP key={i} as="div" className={"row " + (r && i === t.lie ? "row-lie" : r ? "row-true" : "")} text={s} />
        ))}
      </div>
      <Reveal show={r} className="center"><JP as="div" className="answer-jp" text={t.why} /></Reveal>
    </GameFrame>
  );
}
