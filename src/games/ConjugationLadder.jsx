import { useMemo, useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
import JP, { Romaji } from "../components/JP.jsx";
import { useDeck, pick } from "../lib/deck.js";
import { conjugate, FORMS } from "../lib/conjugate.js";

export default function ConjugationLadder({ data }) {
  const [v, next] = useDeck(data.verbs);
  const [n, setN] = useState(0);
  const [r, setR] = useState(false);
  const form = useMemo(() => pick(data.conjForms), [v, n, data]);
  const answer = conjugate(v[0], v[3], form);
  return (
    <GameFrame title="Conjugation Ladder" jp="活用" hint="Say the verb in the requested form." revealed={r} onReveal={() => setR(true)} onNext={() => { next(); setN(k => k + 1); setR(false); }}>
      <div className="stack">
        <JP as="div" className="hero-jp hero-md" text={v[0]} romaji={false} />
        <div className="answer-sub">{v[1]}　·　{v[2]} <Romaji text={v[1]} className="romaji-inline" /></div>
        <div className="form-ask">{FORMS[form]}</div>
        <Reveal show={r} className="center"><JP as="div" className="answer-jp" text={answer} /></Reveal>
      </div>
    </GameFrame>
  );
}
