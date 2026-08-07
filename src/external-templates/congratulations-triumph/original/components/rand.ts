export function lcg(seed: number) {
  let state = (seed >>> 0) || 1
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}
export function series<T>(seed: number, count: number, make: (rand: () => number, index: number) => T): T[] {
  const rand = lcg(seed)
  const out: T[] = []
  for (let i = 0; i < count; i++) out.push(make(rand, i))
  return out
}
export function between(rand: () => number, min: number, max: number) {
  return min + rand() * (max - min)
}
export function pick<T>(rand: () => number, items: readonly T[]): T {
  return items[Math.floor(rand() * items.length) % items.length] as T
}
