"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

// Words light up one by one as the paragraph scrolls through the viewport.
export default function WordFill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (reducedMotion()) return;
    // Wrap every word of the text nodes once, keeping inline elements intact.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    nodes.forEach((n) => {
      const frag = document.createDocumentFragment();
      n.textContent!.split(/(\s+)/).forEach((w) => {
        if (!w.trim()) return frag.append(w);
        const s = document.createElement("span");
        s.textContent = w;
        s.dataset.w = "";
        frag.append(s);
      });
      n.replaceWith(frag);
    });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-w], mark"),
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
