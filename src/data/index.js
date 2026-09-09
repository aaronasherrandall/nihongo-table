// Seed data, one module per JLPT level.
//
// nouns / kanji:   [word, reading, meaning]
// verbs:           [word, reading, meaning, group]  group = ichi | go | suru | kuru
// grammar:         [pattern, meaning]                       (Sentence Builder bonus challenges)
// particles:       [sentence with ＿, answer, translation]
// auction:         [sentence, isCorrect, note, fixedVersion]
// fake:            {real:[[word,reading,meaning]x3], fake:[word,reading,why]}
// counters:        [thing, number, answer, note]
// keigo:           [casual, targetRegister, answer]
// ono:             [word, meaning, example]
// twoTruths:       {topic, statements[3], lie:index, why}
// reverse:         [english, model1, model2]
// oddOneOut:       {items[4], odd:index, why}
// conjForms:       which forms Conjugation Ladder may ask at this level
import n5 from "./n5.js";
import n4 from "./n4.js";
import n3 from "./n3.js";
import n2 from "./n2.js";
import n1 from "./n1.js";

export const LEVELS = ["N5","N4","N3","N2","N1"];
export const DATA = { N5: n5, N4: n4, N3: n3, N2: n2, N1: n1 };
