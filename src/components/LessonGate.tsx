"use client";

import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { isUnlocked, useMounted, useProgress } from "@/lib/progress";
import LockIcon from "./LockIcon";

// Replaces a locked lesson's content with a pointer back to the lesson that unlocks it.
export default function LessonGate({ slug, children }: { slug: string; children: React.ReactNode }) {
  const { done } = useProgress();
  const mounted = useMounted();
  if (!mounted || isUnlocked(slug, done)) return children;

  const i = lessons.findIndex((l) => l.slug === slug);
  const prev = lessons[i - 1];
  return (
    <section className="glass mt-16 max-w-[72ch] p-8 md:p-12">
      <span className="grid size-14 place-items-center rounded-full bg-glass-strong text-accent">
        <LockIcon className="size-6" />
      </span>
      <h2 className="mt-6 text-[clamp(28px,2.6vw,40px)] leading-[1.1] font-medium tracking-[-0.03em]">This lesson is locked</h2>
      <p className="mt-4 max-w-[46ch] text-muted">
        Lessons build on each other. Pass the quiz in <span className="text-ink">{prev.title}</span> to unlock this one.
      </p>
      <Link href={`/lessons/${prev.slug}`} className="btn btn-primary mt-8">
        Go to {prev.title}
      </Link>
    </section>
  );
}
