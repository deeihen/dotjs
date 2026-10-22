"use client";

import Link from "next/link";
import { groups, lessons } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

// Two-ended rows: done marker and title on the left, minutes on the right.
export default function LessonList({ current, compact = false }: { current?: string; compact?: boolean }) {
  const { done } = useProgress();
  return (
    <div className={compact ? "space-y-6" : "space-y-10"}>
      {groups.map((g) => (
        <div key={g}>
          <p className="mb-2 text-muted">{g}</p>
          <ul>
            {lessons
              .filter((l) => l.group === g)
              .map((l) => {
                const isDone = done.includes(l.slug);
                const here = l.slug === current;
                return (
                  <li key={l.slug}>
                    <Link
                      href={`/lessons/${l.slug}`}
                      aria-current={here ? "page" : undefined}
                      className={`group -mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 transition-colors hover:bg-glass-strong ${
                        here ? "bg-glass-strong font-medium" : ""
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`size-3.5 shrink-0 rounded-full ${isDone ? "bg-accent" : "bg-surface-2"}`}
                      />
                      <span className="flex-1">
                        {l.title}
                        {isDone && <span className="sr-only"> (done)</span>}
                      </span>
                      <span className="text-small tabular-nums text-muted">{l.minutes} min</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
