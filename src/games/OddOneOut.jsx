import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import { useDeck } from "../lib/deck.js";

export default function OddOneOut({ data }) {
  const [set, next] = useDeck(data.oddOneOut);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Odd One Out" jp="仲間はずれ" hint="Which one doesn't belong — and why? Argue it out." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="grid4">
        {set.items.map((it, i) => (
          <div key={i} className={"tile " + (r && i === set.odd ? "tile-odd" : r ? "tile-dim" : "")}>{it}</div>
        ))}
      </div>
      <Reveal show={r} className="center"><div className="answer-en">{set.why}</div></Reveal>
    </GameFrame>
  );
}
