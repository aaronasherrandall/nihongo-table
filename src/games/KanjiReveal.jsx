import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import { useDeck } from "../lib/deck.js";

export default function KanjiReveal({ data }) {
  const [k, next] = useDeck(data.kanji);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Kanji Reveal" jp="漢字" hint="Shout the reading, then the meaning." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="hero-jp">{k[0]}</div>
      <Reveal show={r} className="center">
        <div className="answer-jp">{k[1]}</div>
        <div className="answer-en">{k[2]}</div>
      </Reveal>
    </GameFrame>
  );
}
