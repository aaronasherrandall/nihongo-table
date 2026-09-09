# Nihongo Table — 日本語テーブル

iPad "big screen" party console for a Japanese meetup. 13 games, five JLPT levels (N5–N1), all seed data, no API.

## Run
```
npm install
npm run dev        # http://localhost:5173
```

## Deploy
```
npx vercel         # or drag the repo onto Vercel / Netlify
```
Then on the iPad: open the URL in Safari → Share → **Add to Home Screen**. Launches fullscreen, works offline after first load.

## Host controls
- Level toggle top-right (N5 → N1) — remembered between sessions
- **Reveal** / **Next** buttons, or **Space** (reveal → next) and **N** (next), **Esc** back to games
- Timer presets (10 / 30 / 60s) bottom-left of every game; tap the running timer to clear

## Games
| Game | What the table does |
|---|---|
| Sentence Builder 文を作ろう | Noun + verb spin; everyone makes a sentence. Reveal = bonus grammar pattern |
| Kanji Reveal 漢字 | Shout reading, then meaning |
| Odd One Out 仲間はずれ | Four words, one impostor, argue why |
| Particle Gap 助詞 | Fill the blank |
| Conjugation Ladder 活用 | Verb → requested form (computed, forms scale by level) |
| Fake Word 偽物 | Three real, one invented |
| Counter Chaos 助数詞 | Number + thing → right counter |
| Two Truths and a Lie 嘘はどれ | Spot the false statement, explain in Japanese |
| Keigo Switch 敬語 | Casual → polite / honorific / humble |
| Onomatopoeia 擬態語 | Act it out or describe it |
| Sentence Auction 正しい？ | Correct or broken? Bet, then find the error |
| Reverse Translation 和訳 | English in, two model Japanese answers out |
| Lightning Round 早押し | 10 kanji, 3/5/8s each, auto-advance, recap |

## Adding data
Everything lives in `src/data/n5.js` … `n1.js`. Formats are documented at the top of `src/data/index.js`. Append rows; no code changes needed. Each game draws from a no-repeat deck that reshuffles when exhausted.

Current seed per level: 30 nouns · 24 verbs · 24 kanji · 10–12 grammar patterns · 12 particle gaps · 10 auction sentences · 6 fake-word sets · 8 counters · 6 keigo · 10 onomatopoeia · 5 two-truths sets · 10 reverse translations · 8 odd-one-out sets.
