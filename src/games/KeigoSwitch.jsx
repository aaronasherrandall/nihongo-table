import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function KeigoSwitch({ data }) {
  const [k, next] = useDeck(data.keigo);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Keigo Switch" jp="敬語" hint="Convert to the requested register." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="stack">
        <JP as="div" className="sentence-jp" text={k[0]} />
        <div className="form-ask">→ {k[1]}</div>
        <Reveal show={r} className="center"><JP as="div" className="answer-jp accent" text={k[2]} /></Reveal>
      </div>
    </GameFrame>
  );
}
