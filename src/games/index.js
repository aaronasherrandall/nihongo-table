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

export const GAMES = [
  { id: "sentence", title: "Sentence Builder", jp: "文を作ろう", blurb: "Noun + verb. Make a sentence out loud.", C: SentenceBuilder },
  { id: "kanji", title: "Kanji Reveal", jp: "漢字", blurb: "Reading, then meaning.", C: KanjiReveal },
  { id: "odd", title: "Odd One Out", jp: "仲間はずれ", blurb: "Four words, one impostor.", C: OddOneOut },
  { id: "particle", title: "Particle Gap", jp: "助詞", blurb: "Fill the blank.", C: ParticleGap },
  { id: "conj", title: "Conjugation Ladder", jp: "活用", blurb: "Verb into the requested form.", C: ConjugationLadder },
  { id: "fake", title: "Fake Word", jp: "偽物", blurb: "Three real, one invented.", C: FakeWord },
  { id: "counter", title: "Counter Chaos", jp: "助数詞", blurb: "Number + thing → right counter.", C: CounterChaos },
  { id: "truths", title: "Two Truths and a Lie", jp: "嘘はどれ", blurb: "Spot the false statement.", C: TwoTruths },
  { id: "keigo", title: "Keigo Switch", jp: "敬語", blurb: "Casual → polite / honorific / humble.", C: KeigoSwitch },
  { id: "ono", title: "Onomatopoeia", jp: "擬態語", blurb: "Act it or explain it.", C: Onomatopoeia },
  { id: "auction", title: "Sentence Auction", jp: "正しい？", blurb: "Correct or broken? Bet, then find it.", C: SentenceAuction },
  { id: "reverse", title: "Reverse Translation", jp: "和訳", blurb: "English in, Japanese out.", C: ReverseTranslation },
  { id: "lightning", title: "Lightning Round", jp: "早押し", blurb: "10 kanji, a few seconds each.", C: Lightning },
];
