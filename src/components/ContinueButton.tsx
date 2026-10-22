"use client";

import Link from "next/link";
import { lessons } from "@/lib/lessons";
import { useProgress } from "@/lib/progress";

// Points at the first unfinished lesson once the visitor has started.
export default function ContinueButton({ className = "" }: { className?: string }) {
  const { done } = useProgress();
  const next = lessons.find((l) => !done.includes(l.slug));
  const label = done.length === 0 ? "Start lesson 1" : next ? `Continue: ${next.title}` : "Review lesson 1";
  return (
    <Link href={`/lessons/${(next ?? lessons[0]).slug}`} className={className}>
      {label}
    </Link>
  );
}
