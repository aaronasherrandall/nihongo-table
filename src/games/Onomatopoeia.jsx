import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import { useDeck } from "../lib/deck.js";

export default function Onomatopoeia({ data }) {
  const [o, next] = useDeck(data.ono);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Onomatopoeia" jp="擬音語・擬態語" hint="Act it out or describe a situation for it." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="hero-jp hero-md">{o[0]}</div>
      <Reveal show={r} className="center">
        <div className="answer-en">{o[1]}</div>
        <div className="answer-jp">{o[2]}</div>
      </Reveal>
    </GameFrame>
  );
}
