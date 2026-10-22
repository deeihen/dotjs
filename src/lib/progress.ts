"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { lessons } from "./lessons";

// Progress lives only in this browser's localStorage.
export type Progress = { done: string[]; quiz: Record<string, number> };

const KEY = "js-progress";
const EMPTY: Progress = { done: [], quiz: {} };
const listeners = new Set<() => void>();
let cache: Progress | null = null;

function read(): Progress {
  if (cache) return cache;
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "null");
    cache = p && Array.isArray(p.done) ? { done: p.done, quiz: p.quiz ?? {} } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(p: Progress) {
  cache = p;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

// False during server render and hydration, when progress still reads as empty.
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

// A lesson opens once the one before it is done (passed its quiz).
// shortcut: enforced in the browser only, since progress lives in localStorage; needs accounts to be tamper-proof.
export function isUnlocked(slug: string, done: string[]) {
  const i = lessons.findIndex((l) => l.slug === slug);
  return i <= 0 || done.includes(lessons[i - 1].slug);
}

export function setDone(slug: string, done: boolean) {
  const p = read();
  const set = new Set(p.done);
  if (done) set.add(slug);
  else set.delete(slug);
  write({ ...p, done: [...set] });
}

export function saveQuiz(slug: string, score: number) {
  const p = read();
  write({ ...p, quiz: { ...p.quiz, [slug]: Math.max(score, p.quiz[slug] ?? 0) } });
}

export function resetProgress() {
  write(EMPTY);
}
