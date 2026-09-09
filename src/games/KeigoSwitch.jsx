import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import { useDeck } from "../lib/deck.js";

export default function KeigoSwitch({ data }) {
  const [k, next] = useDeck(data.keigo);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Keigo Switch" jp="敬語" hint="Convert to the requested register." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="stack">
        <div className="sentence-jp">{k[0]}</div>
        <div className="form-ask">→ {k[1]}</div>
        <Reveal show={r} className="center"><div className="answer-jp accent">{k[2]}</div></Reveal>
      </div>
    </GameFrame>
  );
}
