import { useSyncExternalStore } from "react";

export type JournalEntry = { id: string; text: string; date: string };

export type LumiState = {
  coins: number;
  owned: string[];
  equipped: { hat?: string; face?: string; scene?: string };
  feed: JournalEntry[];
  nights: JournalEntry[];
  released: number;
  lastVisit: string | null;
};

const KEY = "lumi-state-v1";

const initial: LumiState = {
  coins: 0,
  owned: [],
  equipped: {},
  feed: [],
  nights: [],
  released: 0,
  lastVisit: null,
};

let state: LumiState = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load(): LumiState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...(JSON.parse(raw) as Partial<LumiState>) };
  } catch {
    return initial;
  }
}

function ensure() {
  if (!loaded && typeof window !== "undefined") {
    state = load();
    loaded = true;
  }
}

function emit() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }
  listeners.forEach((l) => l());
}

export function setState(update: (s: LumiState) => LumiState) {
  ensure();
  state = update(state);
  emit();
}

function subscribe(cb: () => void) {
  ensure();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useLumi(): LumiState {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensure();
      return state;
    },
    () => initial,
  );
}

export function addCoins(n: number) {
  setState((s) => ({ ...s, coins: s.coins + n }));
}

const id = () => Math.random().toString(36).slice(2);

export function addFeedEntry(text: string) {
  setState((s) => ({
    ...s,
    coins: s.coins + 5,
    feed: [{ id: id(), text, date: new Date().toISOString() }, ...s.feed].slice(0, 200),
  }));
}

export function addNightEntry(text: string) {
  setState((s) => ({
    ...s,
    coins: s.coins + 5,
    nights: [{ id: id(), text, date: new Date().toISOString() }, ...s.nights].slice(0, 200),
  }));
}

export function registerRelease() {
  setState((s) => ({ ...s, coins: s.coins + 3, released: s.released + 1 }));
}

export function buyItem(itemId: string, price: number, slot: "hat" | "face" | "scene") {
  setState((s) =>
    s.owned.includes(itemId) || s.coins < price
      ? s
      : {
          ...s,
          coins: s.coins - price,
          owned: [...s.owned, itemId],
          equipped: { ...s.equipped, [slot]: itemId },
        },
  );
}

export function toggleEquip(itemId: string, slot: "hat" | "face" | "scene") {
  setState((s) => ({
    ...s,
    equipped: { ...s.equipped, [slot]: s.equipped[slot] === itemId ? undefined : itemId },
  }));
}

export function markVisit() {
  setState((s) => ({ ...s, lastVisit: new Date().toISOString() }));
}

export function daysSince(iso: string | null): number | null {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / 86400000);
}

export function buzz(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* not supported */
    }
  }
}
