"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotion = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// Calls cb(0..1) as the element scrolls from its top hitting the viewport top
// to its bottom hitting the viewport bottom: the range of a tall section with a sticky child.
export function useStickyProgress<T extends HTMLElement>(cb: (p: number) => void) {
  const ref = useRef<T>(null);
  const fn = useRef(cb);
  fn.current = cb;
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => fn.current(s.progress),
      onRefresh: (s) => fn.current(s.progress),
    });
    return () => st.kill();
  }, []);
  return ref;
}
