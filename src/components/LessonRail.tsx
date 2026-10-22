"use client";

import Link from "next/link";
import { useRef } from "react";
import { lessons } from "@/lib/lessons";
import { isUnlocked, useProgress } from "@/lib/progress";
import LockIcon from "./LockIcon";
import { useStickyProgress } from "@/lib/gsap";

// Vertical scroll drives a sideways rail of 3D lesson cards.
export default function LessonRail() {
  const track = useRef<HTMLDivElement>(null);
  const { done } = useProgress();

  // Card centres measured once per width (offsetLeft ignores transforms), so scrolling
  // only writes styles and never forces a layout read.
  const geo = useRef<{ w: number; max: number; cards: HTMLElement[]; centres: number[] } | null>(null);

  const ref = useStickyProgress<HTMLElement>((p) => {
    const t = track.current;
    if (!t) return;
    // Remeasure on resize, or when a card swapped between locked and open (new element).
    if (geo.current?.w !== innerWidth || geo.current.cards.some((c) => !c.isConnected)) {
      const cards = [...t.querySelectorAll<HTMLElement>("[data-card]")];
      geo.current = { w: innerWidth, max: Math.max(t.scrollWidth - innerWidth, 0), cards, centres: cards.map((c) => c.offsetLeft + c.offsetWidth / 2) };
    }
    const { max, cards, centres } = geo.current;
    const shift = -p * max;
    t.style.transform = `translate3d(${shift}px,0,0)`;
    // Each card turns toward the viewer as it nears the centre.
    const mid = innerWidth / 2;
    cards.forEach((c, i) => {
      const d = Math.max(-1, Math.min(1, (centres[i] + shift - mid) / mid));
      c.style.transform = `rotateY(${d * -28}deg) translateZ(${-Math.abs(d) * 140}px) scale(${1 - Math.abs(d) * 0.06})`;
      c.style.opacity = String(1 - Math.abs(d) * 0.45);
    });
  });

  return (
    <section ref={ref} className="relative h-[420vh]" aria-labelledby="lessons" data-cube="0.78,0.62,0.0">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="wrap mx-auto mb-10 flex w-full max-w-7xl flex-wrap items-end justify-between gap-6">
          <h2 id="lessons" className="display metal text-[clamp(40px,5vw,76px)]">
            {lessons.length} lessons, in order
          </h2>
          <p className="max-w-[34ch] text-muted">
            Keep scrolling to move through the course. Pass a lesson’s quiz to unlock the next one.
          </p>
        </div>
        <div style={{ perspective: "1600px" }}>
          <div
            ref={track}
            className="flex w-max gap-5 px-[var(--margin)] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {lessons.map((l, i) => {
              const isDone = done.includes(l.slug);
              const card = "glass group relative flex h-[min(56svh,420px)] w-[min(78vw,320px)] shrink-0 flex-col justify-between overflow-hidden p-6";
              if (!isUnlocked(l.slug, done))
                return (
                  <div key={l.slug} data-card className={`${card} cursor-not-allowed`} aria-label={`${l.title}, locked`}>
                    <span aria-hidden className="pointer-events-none absolute -top-8 -right-4 text-[160px] leading-none font-semibold tracking-tighter text-ink opacity-[0.04]">
                      {i + 1}
                    </span>
                    <span className="flex items-center gap-2 text-small text-muted">
                      <LockIcon /> {l.group} · {l.minutes} min · locked
                    </span>
                    <span className="opacity-50">
                      <span className="block text-[clamp(24px,2.2vw,32px)] leading-[1.1] font-semibold tracking-tight">{l.title}</span>
                      <span className="mt-3 block text-muted">{l.summary}</span>
                      <span className="mt-6 block text-small text-muted">Pass {lessons[i - 1].title} to unlock</span>
                    </span>
                  </div>
                );
              return (
                <Link
                  key={l.slug}
                  href={`/lessons/${l.slug}`}
                  data-card
                  className={`${card} transition-[background-color,border-color] duration-300 hover:border-accent hover:bg-glass-strong`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-8 -right-4 text-[160px] leading-none font-semibold tracking-tighter text-ink opacity-[0.06] transition-opacity group-hover:opacity-[0.12]"
                  >
                    {i + 1}
                  </span>
                  <span className="flex items-center gap-2 text-small text-muted">
                    <span className={`size-2.5 rounded-full ${isDone ? "bg-accent shadow-[0_0_12px_var(--glow)]" : "bg-surface-2"}`} />
                    {l.group} · {l.minutes} min{isDone && " · done"}
                  </span>
                  <span>
                    <span className="block text-[clamp(24px,2.2vw,32px)] leading-[1.1] font-semibold tracking-tight">{l.title}</span>
                    <span className="mt-3 block text-muted">{l.summary}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-medium text-accent">
                      Open lesson
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
