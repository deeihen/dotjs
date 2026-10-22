"use client";

import { setDone, useProgress } from "@/lib/progress";

export default function DoneToggle({ slug }: { slug: string }) {
  const done = useProgress().done.includes(slug);
  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-3">
      <input type="checkbox" checked={done} onChange={(e) => setDone(slug, e.target.checked)} className="size-5 accent-[var(--accent)]" />
      Mark this lesson as done
    </label>
  );
}
