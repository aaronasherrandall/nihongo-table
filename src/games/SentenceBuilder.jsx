import { useEffect, useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP from "../components/JP.jsx";
import { useDeck } from "../lib/deck.js";

const KANA = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

function SlotCard({ word, reading, meaning, tone, label, spinKey }) {
  const [shown, setShown] = useState("　");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDone(false);
    let n = 0;
    const id = setInterval(() => {
      setShown(word.split("").map(() => KANA[Math.floor(Math.random() * KANA.length)]).join(""));
      if (++n >= 10) { clearInterval(id); setShown(word); setDone(true); }
    }, 55);
    return () => clearInterval(id);
  }, [spinKey, word]);
  return (
    <div className={"slot slot-" + tone}>
      <div className="slot-label">{label}</div>
      <div className={"slot-word " + (done ? "slot-done" : "")}>{done ? <JP text={word} romaji={false} /> : shown}</div>
      <div className="slot-sub" style={{ opacity: done ? 1 : 0 }}><JP text={reading} /></div>
      <div className="slot-en" style={{ opacity: done ? 1 : 0 }}>{meaning}</div>
    </div>
  );
}

export default function SentenceBuilder({ data }) {
  const [noun, nextNoun] = useDeck(data.nouns);
  const [verb, nextVerb] = useDeck(data.verbs);
  const [bonus, nextBonus] = useDeck(data.grammar);
  const [revealed, setRevealed] = useState(false);
  const [spin, setSpin] = useState(0);
  const next = () => { nextNoun(); nextVerb(); nextBonus(); setRevealed(false); setSpin(k => k + 1); };
  return (
    <GameFrame title="Sentence Builder" jp="文を作ろう" hint="Everyone makes a sentence using both words. Reveal adds a bonus pattern to work in."
      revealed={revealed} onReveal={() => setRevealed(true)} onNext={next} nextLabel="New words">
      <div className="slots">
        <SlotCard word={noun[0]} reading={noun[1]} meaning={noun[2]} tone="noun" label="noun　名詞" spinKey={spin} />
        <SlotCard word={verb[0]} reading={verb[1]} meaning={verb[2]} tone="verb" label="verb　動詞" spinKey={spin} />
      </div>
      <Reveal show={revealed}>
        <div className="bonus">
          <div className="bonus-label">bonus challenge</div>
          <JP as="div" className="bonus-jp" text={bonus[0]} />
          <div className="bonus-en">{bonus[1]}</div>
        </div>
      </Reveal>
    </GameFrame>
  );
}
