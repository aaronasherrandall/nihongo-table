import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP, { Romaji } from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function ParticleGap({ data }) {
  const [p, next] = useDeck(data.particles);
  const [r, setR] = useState(false);
  const [a, b] = p[0].split("＿");
  const full = a + (r ? p[1] : "＿") + b;
  return (
    <GameFrame title="Particle Gap" jp="助詞" hint="What goes in the blank?" revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="sentence-jp">
        <JP text={a} romaji={false} /><span className={"gap " + (r ? "gap-filled" : "")}>{r ? p[1] : "＿"}</span><JP text={b} romaji={false} />
        <Romaji text={full} />
      </div>
      <Reveal show={r} className="center"><div className="answer-en">{p[2]}</div></Reveal>
    </GameFrame>
  );
}
