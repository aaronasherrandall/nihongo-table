import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import { useDeck } from "../lib/deck.js";

export default function TwoTruths({ data }) {
  const [t, next] = useDeck(data.twoTruths);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Two Truths and a Lie" jp="嘘はどれ" hint="Find the false statement and explain why in Japanese." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="topic">{t.topic}</div>
      <div className="list">
        {t.statements.map((s, i) => (
          <div key={i} className={"row " + (r && i === t.lie ? "row-lie" : r ? "row-true" : "")}>{s}</div>
        ))}
      </div>
      <Reveal show={r} className="center"><div className="answer-en">{t.why}</div></Reveal>
    </GameFrame>
  );
}
