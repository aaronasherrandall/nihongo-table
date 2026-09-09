import { useMemo, useState } from "react";
import GameFrame from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck, shuffle } from "../lib/deck.js";

export default function FakeWord({ data }) {
  const [set, next] = useDeck(data.fake);
  const [r, setR] = useState(false);
  const cards = useMemo(() => shuffle([
    ...set.real.map(([w, rd, m]) => ({ w, rd, m, fake: false })),
    { w: set.fake[0], rd: set.fake[1], m: set.fake[2], fake: true },
  ]), [set]);
  return (
    <GameFrame title="Fake Word" jp="偽物" hint="Three are real. One is invented. Which?" revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setR(false); }}>
      <div className="grid4">
        {cards.map((c, i) => (
          <div key={i} className={"tile tile-tall " + (r && c.fake ? "tile-odd" : r ? "tile-real" : "")}>
            <JP as="div" text={c.w} />
            {r && <div className="tile-sub">{c.rd && <span>{c.rd}　</span>}{c.m}</div>}
          </div>
        ))}
      </div>
    </GameFrame>
  );
}
