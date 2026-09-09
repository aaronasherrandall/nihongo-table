import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function ReverseTranslation({ data }) {
  const [s, next] = useDeck(data.reverse);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Reverse Translation" jp="和訳" hint="Everyone says their Japanese version. Then compare with two model answers." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="stack">
        <div className="sentence-en">{s[0]}</div>
        <Reveal show={r} className="center">
          <JP as="div" className="answer-jp" text={s[1]} />
          <JP as="div" className="answer-jp dim" text={s[2]} />
        </Reveal>
      </div>
    </GameFrame>
  );
}
