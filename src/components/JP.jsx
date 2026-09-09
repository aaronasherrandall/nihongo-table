import { useReading, useReadingPrefs } from "../lib/reading.js";

// Japanese text with automatic furigana (ruby) and optional romaji line.
// quiz: the reading IS the question -> no furigana, no romaji.
// furigana / romaji: explicit overrides of the global prefs.
export default function JP({ text, quiz = false, furigana, romaji, className = "", as: Tag = "span" }) {
  const prefs = useReadingPrefs();
  const f = quiz ? false : (furigana ?? prefs.furigana);
  const r = quiz ? false : (romaji ?? prefs.romaji);
  const { furi, romaji: rom } = useReading(text, { furigana: f, romaji: r });
  return (
    <Tag className={"jp " + className}>
      {furi ? <span className="jp-text" dangerouslySetInnerHTML={{ __html: furi }} /> : <span className="jp-text">{text}</span>}
      {rom && <span className="romaji">{rom}</span>}
    </Tag>
  );
}

// Romaji-only line for text that is already shown elsewhere (e.g. a kana reading).
export function Romaji({ text, className = "" }) {
  const prefs = useReadingPrefs();
  const { romaji } = useReading(text, { furigana: false, romaji: prefs.romaji });
  return romaji ? <span className={"romaji " + className}>{romaji}</span> : null;
}
