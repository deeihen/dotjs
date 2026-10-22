"use client";

import { useEffect, useState } from "react";
import { run } from "@/lib/run";

const presets = ["2 + 2", '"5" + 5', "10 % 3", "7 > 3", '"js".toUpperCase()', "typeof 42"];

// The page's live thing: type an expression, read JavaScript's answer at the same size.
export default function LiveExpression() {
  const [expr, setExpr] = useState("2 + 2");
  const [answer, setAnswer] = useState<{ text: string; error: boolean }>({ text: "4", error: false });

  useEffect(() => {
    if (!expr.trim()) return setAnswer({ text: "…", error: false });
    let live = true;
    const id = setTimeout(async () => {
      const { lines, result } = await run(expr, { expr: true, timeout: 1500 });
      const err = lines.find((l) => l.kind === "error");
      if (live) setAnswer(err ? { text: err.text.split(":")[0], error: true } : { text: result ?? "undefined", error: false });
    }, 250);
    return () => {
      live = false;
      clearTimeout(id);
    };
  }, [expr]);

  const size = (s: string) => ({ "--len": Math.max(s.length, 2) }) as React.CSSProperties;

  return (
    <div data-ui>
      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-8">
        <label className="glass block p-5 md:p-7">
          <span className="block text-small text-muted">You type</span>
          <code className="block">
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            maxLength={40}
            className="specimen mt-2 w-full bg-transparent font-mono text-ink outline-none"
            style={size(expr)}
            aria-label="A JavaScript expression"
          />
          </code>
        </label>
        <div className="rounded-[var(--radius)] bg-accent p-5 text-accent-ink shadow-[0_20px_80px_-20px_var(--glow)] md:p-7" aria-live="polite">
          <span className="block text-small">JavaScript answers</span>
          <output className={`specimen mt-2 block truncate ${answer.error ? "text-[#8a1c12]" : ""}`} style={size(answer.text)}>
            <code className="font-mono">{answer.text}</code>
          </output>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="self-center text-muted">Try:</span>
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setExpr(p)}
            className={`press min-h-11 cursor-pointer rounded-lg px-4 font-mono text-[15px] ${p === expr ? "bg-ink text-bg" : "glass"}`}
          >
            <code>{p}</code>
          </button>
        ))}
      </div>
    </div>
  );
}
