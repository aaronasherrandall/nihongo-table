import { useEffect, useState } from "react";
import { DATA, LEVELS } from "./data/index.js";
import { GAMES } from "./games/index.js";

const LS = "nihongo-table:level";

export default function App() {
  const [level, setLevel] = useState(() => localStorage.getItem(LS) || "N5");
  const [gameId, setGameId] = useState(null);
  useEffect(() => localStorage.setItem(LS, level), [level]);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setGameId(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const game = GAMES.find(g => g.id === gameId);
  const data = DATA[level];

  return (
    <div className="app">
      <header className="top">
        <button className="brand" onClick={() => setGameId(null)}>
          <span className="brand-jp">日本語テーブル</span>
          <span className="brand-en">Nihongo Table</span>
        </button>
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
            {GAMES.map(g => (
              <button key={g.id} className="pick" onClick={() => setGameId(g.id)}>
                <span className="pick-jp">{g.jp}</span>
                <span className="pick-title">{g.title}</span>
                <span className="pick-blurb">{g.blurb}</span>
              </button>
            ))}
          </main>
        )}
    </div>
  );
}
