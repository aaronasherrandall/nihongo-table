import { useState, useCallback } from "react";

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// No-repeat deck: walks a shuffled copy, reshuffles when exhausted.
export function useDeck(items) {
  const [state, setState] = useState(() => ({ q: shuffle(items), i: 0 }));
  const item = state.q[state.i];
  const next = useCallback(() => {
    setState(s => {
      if (s.i + 1 >= s.q.length) {
        // reshuffle, but avoid repeating the last item first
        let q = shuffle(items);
        if (q.length > 1 && q[0] === s.q[s.i]) q = [...q.slice(1), q[0]];
        return { q, i: 0 };
      }
      return { ...s, i: s.i + 1 };
    });
  }, [items]);
  return [item, next];
}
