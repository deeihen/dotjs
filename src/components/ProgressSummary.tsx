"use client";

import { lessons } from "@/lib/lessons";
import { resetProgress, useProgress } from "@/lib/progress";
import ContinueButton from "./ContinueButton";

export default function ProgressSummary() {
  const { done } = useProgress();
  const n = done.filter((s) => lessons.some((l) => l.slug === s)).length;
  return (
    <div>
      <p className="display text-head tabular-nums">
        {n}
        <span className="text-muted"> / {lessons.length}</span>
      </p>
      <p className="mt-2">lessons done</p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={n} aria-label="Course progress">
        <div className="h-full rounded-full bg-accent shadow-[0_0_20px_var(--glow)] transition-[width] duration-700" style={{ width: `${(n / lessons.length) * 100}%` }} />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <ContinueButton className="btn btn-primary" />
        {n > 0 && (
          <button
            type="button"
            onClick={() => confirm("Reset all progress on this device?") && resetProgress()}
            className="link min-h-11 cursor-pointer text-muted"
          >
            Reset progress
          </button>
        )}
      </div>
    </div>
  );
}
