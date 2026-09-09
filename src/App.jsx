import { useEffect, useState } from "react";
import { DATA, LEVELS } from "./data/index.js";
import { GAMES, GROUPS } from "./games/index.js";
import { ReadingCtx, loadReader } from "./lib/reading.js";

const LS = "nihongo-table:level";
const LS_F = "nihongo-table:furigana";
const LS_R = "nihongo-table:romaji";

export default function App() {
  const [level, setLevel] = useState(() => localStorage.getItem(LS) || "N5");
  const [gameId, setGameId] = useState(() => new URLSearchParams(location.search).get("game"));
  // ?furigana=0/1 and ?romaji=0/1 override the saved preference (handy for sharing a link).
  const q = new URLSearchParams(location.search);
  const [furigana, setFurigana] = useState(() => (q.has("furigana") ? q.get("furigana") === "1" : localStorage.getItem(LS_F) !== "0"));
  const [romaji, setRomaji] = useState(() => (q.has("romaji") ? q.get("romaji") === "1" : localStorage.getItem(LS_R) === "1"));
  const [dict, setDict] = useState("loading"); // loading | ready | error
  useEffect(() => localStorage.setItem(LS, level), [level]);
  useEffect(() => localStorage.setItem(LS_F, furigana ? "1" : "0"), [furigana]);
  useEffect(() => localStorage.setItem(LS_R, romaji ? "1" : "0"), [romaji]);
  useEffect(() => { loadReader().then(() => setDict("ready")).catch(() => setDict("error")); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setGameId(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const game = GAMES.find(g => g.id === gameId);
  const data = DATA[level];

  return (
    <ReadingCtx.Provider value={{ furigana, romaji }}>
      <div className="app">
        <header className="top">
          <button className="brand" onClick={() => setGameId(null)}>
            <span className="brand-jp">日本語テーブル</span>
            <span className="brand-en">Nihongo Table</span>
          </button>
          <div className="toggles">
            <button className={"tog " + (furigana ? "tog-on" : "")} aria-pressed={furigana} onClick={() => setFurigana(v => !v)} title="Furigana over kanji">
              <span className="tog-ruby"><ruby>漢<rt>かん</rt></ruby></span> ふりがな
            </button>
            <button className={"tog " + (romaji ? "tog-on" : "")} aria-pressed={romaji} onClick={() => setRomaji(v => !v)} title="Romaji under Japanese">
              <span className="tog-a">A</span> Romaji
            </button>
            {dict === "loading" && <span className="dict-status">loading dictionary…</span>}
            {dict === "error" && <span className="dict-status dict-err">readings unavailable</span>}
          </div>
          <div className="levels" role="radiogroup" aria-label="JLPT level">
            {LEVELS.map(l => (
              <button key={l} role="radio" aria-checked={level === l} className={"lvl " + (level === l ? "lvl-on" : "")} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
          {game && <button className="btn btn-ghost" onClick={() => setGameId(null)}>All games</button>}
        </header>

        {game
          ? <game.C key={level + gameId} data={data} />
          : (
            <main className="picker">
              {GROUPS.map(gr => (
                <section key={gr.id} className="group">
                  <h2 className="group-title"><span className="group-jp">{gr.jp}</span>{gr.title}</h2>
                  <div className="cards">
                    {GAMES.filter(g => g.group === gr.id).map((g, i) => (
                      <button key={g.id} className="pick" style={{ "--c": g.color, "--i": i }} onClick={() => setGameId(g.id)}>
                        <span className="pick-emoji" aria-hidden="true">{g.emoji}</span>
                        <span className="pick-jp">{g.jp}</span>
                        <span className="pick-title">{g.title}</span>
                        <span className="pick-blurb">{g.blurb}</span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </main>
          )}
      </div>
    </ReadingCtx.Provider>
  );
}
