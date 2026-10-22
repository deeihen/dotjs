"use client";

import Image from "next/image";
import { useState } from "react";
import { useStickyProgress } from "@/lib/gsap";
import eniac from "@/img/two-women-operating-eniac-full-resolution.jpg";

// The ENIAC photo opens from a small framed card to the whole screen.
export default function HistoryZoom() {
  const [p, setP] = useState(0);
  // Quantised so React re-renders on visible changes only, not every scroll tick.
  const ref = useStickyProgress<HTMLElement>((v) => setP(Math.round(v * 200) / 200));
  const open = Math.min(p / 0.6, 1);
  const inset = (1 - open) * 22;
  const radius = (1 - open) * 18;
  const late = Math.min(Math.max((p - 0.55) / 0.3, 0), 1);

  return (
    <section ref={ref} className="relative h-[260vh]" aria-labelledby="then" data-cube="0,0,0">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden will-change-[clip-path]"
          style={{ clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)` }}
        >
          <Image
            src={eniac}
            alt="Two programmers setting switches and cables on the ENIAC computer in 1946"
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
            style={{ transform: `scale(${1.35 - open * 0.25})` }}
          />
          <div className="absolute inset-0 bg-black/45" style={{ opacity: late }} />
        </div>
        <div className="wrap relative mx-auto flex h-full max-w-7xl flex-col justify-end pb-[12svh] text-white">
          <h2
            id="then"
            className="display max-w-[14ch] text-[clamp(40px,6vw,96px)]"
            style={{ opacity: late, transform: `translateY(${(1 - late) * 40}px)` }}
          >
            Programming used to look like this.
          </h2>
          <p className="mt-6 max-w-[46ch] text-lead text-white/80" style={{ opacity: Math.min(Math.max((p - 0.75) / 0.2, 0), 1) }}>
            ENIAC, 1946. Its first programmers wired every program by hand. Today it is one line, in a browser tab.
          </p>
        </div>
      </div>
    </section>
  );
}
