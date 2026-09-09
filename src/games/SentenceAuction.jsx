import { useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import { useDeck } from "../lib/deck.js";

export default function SentenceAuction({ data }) {
  const [s, next] = useDeck(data.auction);
  const [r, setR] = useState(false);
  return (
    <GameFrame title="Sentence Auction" jp="正しい？" hint="Correct or broken? Place your bets, then find the error." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="stack">
        <div className="sentence-jp">{s[0]}</div>
        <Reveal show={r} className="center">
          <div className={"verdict " + (s[1] ? "verdict-ok" : "verdict-bad")}>{s[1] ? "正しい" : "間違い"}</div>
          <div className="answer-en">{s[2]}</div>
          {!s[1] && <div className="answer-jp accent">{s[3]}</div>}
        </Reveal>
      </div>
    </GameFrame>
  );
}
