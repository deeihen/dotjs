"use client";

import Link from "next/link";
import { useRef } from "react";
import { lessons } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import { useStickyProgress } from "@/lib/gsap";

// Vertical scroll drives a sideways rail of 3D lesson cards.
export default function LessonRail() {
  const track = useRef<HTMLDivElement>(null);
  const { done } = useProgress();

  const ref = useStickyProgress<HTMLElement>((p) => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - innerWidth;
    t.style.transform = `translate3d(${-p * Math.max(max, 0)}px,0,0)`;
    // Each card turns toward the viewer as it nears the centre.
    const mid = innerWidth / 2;
    t.querySelectorAll<HTMLElement>("[data-card]").forEach((c) => {
      const r = c.getBoundingClientRect();
      const d = Math.max(-1, Math.min(1, (r.left + r.width / 2 - mid) / mid));
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
            Keep scrolling to move through the course. A yellow dot means you have finished that lesson.
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
              return (
                <Link
                  key={l.slug}
                  href={`/lessons/${l.slug}`}
                  data-card
                  className="glass group relative flex h-[min(56svh,420px)] w-[min(78vw,320px)] shrink-0 flex-col justify-between overflow-hidden p-6 transition-[background-color,border-color] duration-300 hover:border-accent hover:bg-glass-strong"
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
