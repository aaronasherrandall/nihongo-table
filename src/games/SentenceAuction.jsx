import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

export default function SentenceAuction({ data }) {
  const [s, next] = useDeck(data.auction);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Sentence Auction" jp="正しい？" hint="Correct or broken? Place your bets, then find the error." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="stack">
        <JP as="div" className="sentence-jp" text={s[0]} />
        <Reveal show={r} className="center">
          <JP as="div" className={"verdict " + (s[1] ? "verdict-ok" : "verdict-bad")} text={s[1] ? "正しい" : "間違い"} />
          <div className="answer-en">{s[2]}</div>
          {!s[1] && <JP as="div" className="answer-jp accent" text={s[3]} />}
        </Reveal>
      </div>
    </GameFrame>
  );
}
