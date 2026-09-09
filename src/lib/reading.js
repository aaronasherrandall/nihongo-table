// Furigana + romaji via kuroshiro (kuromoji analyzer, dictionary self-hosted in /public/dict).
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import { createContext, useContext, useEffect, useState } from "react";

const K = Kuroshiro.default || Kuroshiro;
const A = KuromojiAnalyzer.default || KuromojiAnalyzer;

// kuromoji hard-codes "*.dat.gz" file names. Static hosts (Vercel, the Vite dev server) then send
// Content-Encoding: gzip, the browser inflates once, and kuromoji's own inflate fails.
// So the files live in /public/dict as *.bin and we rewrite the request URL.
let patched = false;
function patchXhr() {
  if (patched) return;
  patched = true;
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    if (typeof url === "string" && url.startsWith("/dict/") && url.endsWith(".dat.gz")) url = url.replace(/\.dat\.gz$/, ".bin");
    return open.call(this, method, url, ...rest);
  };
}

let instance = null;
let ready = null;
export function loadReader() {
  if (!ready) {
    patchXhr();
    instance = new K();
    ready = instance.init(new A({ dictPath: "/dict/" })).then(() => instance).catch(e => { console.error("kuroshiro init failed", e); ready = null; throw e; });
  }
  return ready;
}

const cache = new Map();
async function convert(text, opts) {
  const key = JSON.stringify(opts) + "|" + text;
  if (cache.has(key)) return cache.get(key);
  const k = await loadReader();
  const out = await k.convert(text, opts);
  cache.set(key, out);
  return out;
}

export const hasKanji = (s) => /[一-龯㐀-䶿]/.test(s || "");
export const hasJapanese = (s) => /[぀-ヿ一-龯㐀-䶿]/.test(s || "");

// Returns { furi: html string with <ruby> | null, romaji: string | null }
export function useReading(text, { furigana, romaji }) {
  const [furi, setFuri] = useState(null);
  const [rom, setRom] = useState(null);
  useEffect(() => {
    let live = true;
    setFuri(null); setRom(null);
    if (!text || !hasJapanese(text)) return;
    if (furigana && hasKanji(text)) {
      convert(text, { to: "hiragana", mode: "furigana" }).then(h => live && setFuri(h)).catch(() => {});
    }
    if (romaji) {
      // Kana-only text: direct conversion (the tokenizer splits lone kana words into syllables).
      if (!hasKanji(text)) setRom(K.Util.kanaToRomaji(text, "hepburn"));
      else convert(text, { to: "romaji", mode: "spaced", romajiSystem: "hepburn" }).then(r => live && setRom(r)).catch(() => {});
    }
    return () => { live = false; };
  }, [text, furigana, romaji]);
  return { furi, romaji: rom };
}

export const ReadingCtx = createContext({ furigana: true, romaji: false });
export const useReadingPrefs = () => useContext(ReadingCtx);
