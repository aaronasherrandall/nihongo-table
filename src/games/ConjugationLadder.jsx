import { useMemo, useState } from "react";
import GameFrame, { Reveal } from "../components/GameFrame.jsx";
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
        <div className="hero-jp hero-md">{v[0]}</div>
        <div className="answer-sub">{v[1]}　·　{v[2]}</div>
        <div className="form-ask">{FORMS[form]}</div>
        <Reveal show={r} className="center"><div className="answer-jp">{answer}</div></Reveal>
      </div>
    </GameFrame>
  );
}
