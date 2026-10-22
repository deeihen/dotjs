"use client";

import Link from "next/link";
import type { Lesson } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";
import LockIcon from "./LockIcon";

const open = "press block rounded-[var(--radius)] bg-accent p-5 text-right text-accent-ink shadow-[0_20px_60px_-20px_var(--glow)]";

// The forward button opens only after this lesson's quiz is passed.
export default function NextLesson({ slug, next }: { slug: string; next?: Lesson }) {
  const passed = useProgress().done.includes(slug);
  if (!passed)
    return (
      <div className="glass block p-5 text-right text-muted" aria-disabled>
        <span className="flex items-center justify-end gap-2 text-small">
          <LockIcon /> {next ? "Next" : "Last lesson"}
        </span>
        <span className="text-lead">Pass the quiz to continue</span>
      </div>
    );
  return next ? (
    <Link href={`/lessons/${next.slug}`} className={open}>
      <span className="block text-small">Next</span>
      <span className="text-lead font-medium">{next.title}</span>
    </Link>
  ) : (
    <Link href="/lessons" className={open}>
      <span className="block text-small">You finished the course</span>
      <span className="text-lead font-medium">See all lessons</span>
    </Link>
  );
}
