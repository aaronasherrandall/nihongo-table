// Deterministic conjugator for the four verb groups used in the data.
// Godan columns: [i, a, onbin, e, o]
const GODAN = {
  う: ["い","わ","っ","え","お"], く: ["き","か","い","け","こ"], ぐ: ["ぎ","が","い","げ","ご"],
  す: ["し","さ","し","せ","そ"], つ: ["ち","た","っ","て","と"], ぬ: ["に","な","ん","ね","の"],
  ぶ: ["び","ば","ん","べ","ぼ"], む: ["み","ま","ん","め","も"], る: ["り","ら","っ","れ","ろ"],
};

export const FORMS = {
  masu:            "ます form (polite)",
  nai:             "ない form (negative)",
  te:              "て form",
  ta:              "た form (plain past)",
  nakatta:         "なかった (past negative)",
  tai:             "たい form (want to)",
  potential:       "potential (can)",
  volitional:      "volitional (let's / shall)",
  ba:              "ば conditional",
  tara:            "たら conditional",
  passive:         "passive (られる)",
  causative:       "causative (させる)",
  imperative:      "imperative (command)",
  causativePassive:"causative-passive (させられる)",
};

function godanTe(base, last, dictWord) {
  if (dictWord.endsWith("行く")) return base + "って";
  if (last === "く") return base + "いて";
  if (last === "ぐ") return base + "いで";
  if (last === "す") return base + "して";
  if ("うつる".includes(last)) return base + "って";
  return base + "んで"; // ぬ ぶ む
}

export function conjugate(word, group, form) {
  if (group === "ichi") {
    const s = word.slice(0, -1);
    return {
      masu: s+"ます", nai: s+"ない", te: s+"て", ta: s+"た", nakatta: s+"なかった", tai: s+"たい",
      potential: s+"られる", volitional: s+"よう", ba: s+"れば", tara: s+"たら",
      passive: s+"られる", causative: s+"させる", imperative: s+"ろ", causativePassive: s+"させられる",
    }[form];
  }
  if (group === "suru") {
    const p = word.slice(0, -2);
    return {
      masu: p+"します", nai: p+"しない", te: p+"して", ta: p+"した", nakatta: p+"しなかった", tai: p+"したい",
      potential: p+"できる", volitional: p+"しよう", ba: p+"すれば", tara: p+"したら",
      passive: p+"される", causative: p+"させる", imperative: p+"しろ", causativePassive: p+"させられる",
    }[form];
  }
  if (group === "kuru") {
    const p = word.slice(0, -2);
    return {
      masu: p+"来ます", nai: p+"来ない", te: p+"来て", ta: p+"来た", nakatta: p+"来なかった", tai: p+"来たい",
      potential: p+"来られる", volitional: p+"来よう", ba: p+"来れば", tara: p+"来たら",
      passive: p+"来られる", causative: p+"来させる", imperative: p+"来い", causativePassive: p+"来させられる",
    }[form];
  }
  // godan
  const last = word.slice(-1);
  const base = word.slice(0, -1);
  const c = GODAN[last];
  if (!c) return word;
  const te = godanTe(base, last, word);
  const ta = te.slice(0, -1) + (te.endsWith("で") ? "だ" : "た");
  return {
    masu: base+c[0]+"ます", nai: base+c[1]+"ない", te, ta, nakatta: base+c[1]+"なかった", tai: base+c[0]+"たい",
    potential: base+c[3]+"る", volitional: base+c[4]+"う", ba: base+c[3]+"ば", tara: ta+"ら",
    passive: base+c[1]+"れる", causative: base+c[1]+"せる", imperative: base+c[3], causativePassive: base+c[1]+"せられる",
  }[form];
}
