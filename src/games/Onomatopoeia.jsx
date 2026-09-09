import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function Onomatopoeia({ data }) {
  const [o, next] = useDeck(data.ono);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Onomatopoeia" jp="擬音語・擬態語" hint="Act it out or describe a situation for it." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <JP as="div" className="hero-jp hero-md" text={o[0]} />
      <Reveal show={r} className="center">
        <div className="answer-en">{o[1]}</div>
        <JP as="div" className="answer-jp" text={o[2]} />
      </Reveal>
    </GameFrame>
  );
}
