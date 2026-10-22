"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  // "depth": letters fly in from far away (hero). "rise": words flip up on scroll.
  mode?: "depth" | "rise";
  lineBreak?: string;
  // Applied to each animated piece, e.g. a gradient fill that must sit on the moving span.
  partClass?: string;
};

export default function SplitText({ text, as: Tag = "h2", className = "", id, mode = "rise", lineBreak, partClass = "" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (reducedMotion()) return;
    const parts = el.querySelectorAll<HTMLElement>("[data-part]");
    const ctx = gsap.context(() => {
      if (mode === "depth") {
        gsap.from(parts, {
          z: () => gsap.utils.random(-1400, -600),
          y: () => gsap.utils.random(-120, 120),
          rotationX: () => gsap.utils.random(-90, 90),
          rotationY: () => gsap.utils.random(-60, 60),
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
          stagger: { each: 0.05, from: "random" },
          delay: 0.15,
        });
      } else {
        gsap.from(parts, {
          yPercent: 110,
          rotationX: -75,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [mode]);

  const lines = lineBreak ? text.split(lineBreak) : [text];
  return (
    <Tag ref={ref} id={id} className={className} style={{ perspective: "900px" }} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className="block" style={{ transformStyle: "preserve-3d" }}>
          {mode === "depth"
            ? [...line].map((ch, i) => (
                <span key={i} data-part className={`inline-block whitespace-pre will-change-transform ${partClass}`}>
                  {ch}
                </span>
              ))
            : line.split(" ").map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-part className={`inline-block origin-bottom will-change-transform ${partClass}`}>
                    {w}
                    {" "}
                  </span>
                </span>
              ))}
        </span>
      ))}
    </Tag>
  );
}
