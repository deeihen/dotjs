"use client";

import { useSyncExternalStore } from "react";

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
