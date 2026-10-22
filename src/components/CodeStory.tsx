"use client";

import { useState } from "react";
import { useStickyProgress } from "@/lib/gsap";

// Pinned scroll story: the code types itself, runs, then the quiz checks itself.
const code: [string, string][] = [
  ["let", "var(--code-key)"],
  [" name = ", "var(--ink)"],
  ['"World"', "var(--code-str)"],
  [";\n", "var(--ink)"],
  ["console", "var(--ink)"],
  [".", "var(--ink)"],
  ["log", "var(--code-fn)"],
  ["(", "var(--ink)"],
  ["`Hello, ${name}!`", "var(--code-str)"],
  [");", "var(--ink)"],
];
const total = code.reduce((n, [t]) => n + t.length, 0);

const steps = [
  ["Read", "A short explanation with an example."],
  ["Run", "Edit the code and press Run. See the answer instantly."],
  ["Check", "Three quick questions. Pass, and the lesson is done."],
];

export default function CodeStory() {
  const [p, setP] = useState(0);
  const ref = useStickyProgress<HTMLElement>(setP);

  const typed = Math.round(Math.min(p / 0.42, 1) * total);
  const ran = p > 0.5;
  const quiz = Math.min(Math.max((p - 0.58) / 0.12, 0), 1);
  const picked = p > 0.78;
  const step = p < 0.45 ? 0 : p < 0.6 ? 1 : 2;

  let left = typed;
  const shown = code.map(([t, c], i) => {
    const part = t.slice(0, Math.max(left, 0));
    left -= t.length;
    return (
      <span key={i} style={{ color: c }}>
        {part}
      </span>
    );
  });

  return (
    <section ref={ref} className="relative h-[340vh]" aria-labelledby="story" data-cube="0.62,-0.62,0.32" data-cube-m="0.55,-0.78,0">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="wrap mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="story" className="display metal text-[clamp(40px,5vw,76px)]">
              Watch a lesson happen
            </h2>
            <ol className="mt-8 hidden space-y-2 sm:block">
              {steps.map(([name, text], i) => (
                <li
                  key={name}
                  className={`rounded-[var(--radius)] p-4 transition-all duration-500 ${
                    i === step ? "glass translate-x-2" : "opacity-40"
                  }`}
                >
                  <p className={`text-lead font-semibold ${i === step ? "gold" : ""}`}>{name}</p>
                  <p className="mt-1 text-muted">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-lead sm:hidden">
              <span className="gold font-semibold">{steps[step][0]}.</span> {steps[step][1]}
            </p>
          </div>

          <div className="relative lg:col-span-7" style={{ perspective: "1400px" }}>
            <div
              className="glass relative overflow-hidden shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] transition-transform duration-700"
              style={{ transform: `rotateY(${-14 + p * 22}deg) rotateX(${8 - p * 10}deg)` }}
              data-ui
            >
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-small text-muted">hello.js</span>
              </div>
              <pre className="min-h-[7.5em] px-5 py-6 font-mono text-[clamp(14px,1.6vw,20px)] leading-[1.7]">
                <code className={typed < total ? "caret" : ""}>{shown}</code>
              </pre>
              <div className="flex items-center gap-3 border-t border-line px-5 py-3">
                <span className={`btn min-h-10 text-small ${ran ? "btn-primary scale-95" : "btn-ghost"}`}>Run</span>
                <span className="text-small text-muted">Ctrl + Enter</span>
              </div>
              <output
                className="block px-5 py-4 font-mono text-[clamp(14px,1.6vw,20px)] transition-all duration-500"
                style={{ opacity: ran ? 1 : 0, transform: `translateY(${ran ? 0 : 12}px)` }}
              >
                <span className="text-muted">› </span>Hello, World!
              </output>
            </div>

            <div
              className="glass absolute -bottom-10 left-4 w-[min(360px,85%)] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:-right-4 sm:left-auto"
              style={{ opacity: quiz, transform: `translate3d(0, ${(1 - quiz) * 60}px, ${(1 - quiz) * -200}px) rotateX(${(1 - quiz) * 30}deg)` }}
              aria-hidden={quiz === 0}
            >
              <p className="font-medium">What does console.log() do?</p>
              <div className="mt-3 grid gap-2 text-small">
                {["Saves a file", "Prints to the console", "Opens a page"].map((o, i) => (
                  <span
                    key={o}
                    className={`rounded-lg px-3 py-2 transition-colors duration-300 ${
                      picked && i === 1 ? "bg-accent font-medium text-accent-ink" : "bg-glass-strong"
                    }`}
                  >
                    {o}
                    {picked && i === 1 && " ✓"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
