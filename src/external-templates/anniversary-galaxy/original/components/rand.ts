/** Deterministic pseudo-random so SSR and client markup match. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function series<T>(seed: number, count: number, make: (r: () => number, i: number) => T): T[] {
  const r = seeded(seed);
  return Array.from({ length: count }, (_, i) => make(r, i));
}
