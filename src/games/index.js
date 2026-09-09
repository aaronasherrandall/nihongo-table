import SentenceBuilder from "./SentenceBuilder.jsx";
import KanjiReveal from "./KanjiReveal.jsx";
import OddOneOut from "./OddOneOut.jsx";
import ParticleGap from "./ParticleGap.jsx";
import ConjugationLadder from "./ConjugationLadder.jsx";
import FakeWord from "./FakeWord.jsx";
import CounterChaos from "./CounterChaos.jsx";
import TwoTruths from "./TwoTruths.jsx";
import KeigoSwitch from "./KeigoSwitch.jsx";
import Onomatopoeia from "./Onomatopoeia.jsx";
import SentenceAuction from "./SentenceAuction.jsx";
import ReverseTranslation from "./ReverseTranslation.jsx";
import Lightning from "./Lightning.jsx";

export const GROUPS = [
  { id: "speak", jp: "話そう", title: "Speak up" },
  { id: "words", jp: "言葉", title: "Words & kanji" },
  { id: "grammar", jp: "文法", title: "Grammar" },
];

export const GAMES = [
  { id: "sentence", group: "speak", color: "#ff6b6b", emoji: "🎰", title: "Sentence Builder", jp: "文を作ろう", blurb: "Noun + verb. Make a sentence out loud.", C: SentenceBuilder },
  { id: "reverse", group: "speak", color: "#ffa94d", emoji: "🔁", title: "Reverse Translation", jp: "和訳", blurb: "English in, Japanese out.", C: ReverseTranslation },
  { id: "auction", group: "speak", color: "#ffd43b", emoji: "🔨", title: "Sentence Auction", jp: "正しい？", blurb: "Correct or broken? Bet, then find it.", C: SentenceAuction },
  { id: "truths", group: "speak", color: "#69db7c", emoji: "🤥", title: "Two Truths and a Lie", jp: "嘘はどれ", blurb: "Spot the false statement.", C: TwoTruths },

  { id: "kanji", group: "words", color: "#f06595", emoji: "🀄", title: "Kanji Reveal", jp: "漢字", blurb: "Reading, then meaning.", C: KanjiReveal },
  { id: "lightning", group: "words", color: "#cc5de8", emoji: "⚡", title: "Lightning Round", jp: "早押し", blurb: "10 kanji, a few seconds each.", C: Lightning },
  { id: "odd", group: "words", color: "#4dabf7", emoji: "🕵️", title: "Odd One Out", jp: "仲間はずれ", blurb: "Four words, one impostor.", C: OddOneOut },
  { id: "fake", group: "words", color: "#38d9a9", emoji: "🎭", title: "Fake Word", jp: "偽物", blurb: "Three real, one invented.", C: FakeWord },
  { id: "ono", group: "words", color: "#a9e34b", emoji: "💥", title: "Onomatopoeia", jp: "擬態語", blurb: "Act it or explain it.", C: Onomatopoeia },

  { id: "particle", group: "grammar", color: "#22b8cf", emoji: "🧩", title: "Particle Gap", jp: "助詞", blurb: "Fill the blank.", C: ParticleGap },
  { id: "conj", group: "grammar", color: "#845ef7", emoji: "🪜", title: "Conjugation Ladder", jp: "活用", blurb: "Verb into the requested form.", C: ConjugationLadder },
  { id: "counter", group: "grammar", color: "#ff922b", emoji: "🔢", title: "Counter Chaos", jp: "助数詞", blurb: "Number + thing → right counter.", C: CounterChaos },
  { id: "keigo", group: "grammar", color: "#20c997", emoji: "🎩", title: "Keigo Switch", jp: "敬語", blurb: "Casual → polite / honorific / humble.", C: KeigoSwitch },
];
