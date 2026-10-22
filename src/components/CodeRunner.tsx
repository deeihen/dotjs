"use client";

import { useEffect, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, keymap } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { run, type Line } from "@/lib/run";

const theme = EditorView.theme({
  "&": { backgroundColor: "transparent", color: "var(--ink)", fontSize: "15px" },
  ".cm-content": { fontFamily: "var(--font-jetbrains), monospace" /* taste-skill-ignore: real code editor */, padding: "16px 0", caretColor: "var(--accent)" },
  ".cm-gutters": { backgroundColor: "transparent", color: "var(--muted)", border: "none" },
  ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "var(--surface-2)" },
  ".cm-cursor": { borderLeftColor: "var(--accent)", borderLeftWidth: "2px" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": { backgroundColor: "var(--surface-2) !important" },
  "&.cm-focused": { outline: "none" },
});

const colours = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.keyword, t.operatorKeyword, t.definitionKeyword, t.controlKeyword], color: "var(--code-key)" },
    { tag: [t.string, t.special(t.string)], color: "var(--code-str)" },
    { tag: [t.number, t.bool, t.null], color: "var(--code-num)" },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "var(--code-fn)" },
    { tag: t.comment, color: "var(--code-com)", fontStyle: "italic" },
  ]),
);

export default function CodeRunner({ code, html = false }: { code: string; html?: boolean }) {
  const [src, setSrc] = useState(code);
  const [out, setOut] = useState<Line[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const go = async (code: string) => {
    setBusy(true);
    const { lines } = await run(code);
    setOut(lines.length ? lines : [{ kind: "info", text: "Ran with no output. Add a console.log() to see something." }]);
    setBusy(false);
  };
  // go only uses state setters, so the extensions can be built once.
  const extensions = useMemo(
    () => [javascript(), colours, keymap.of([{ key: "Mod-Enter", run: (v) => (go(v.state.doc.toString()), true) }])],
    [],
  );

  const pre = (
    <pre className="overflow-x-auto px-4 py-4 font-mono text-[15px] leading-[1.4]">
      <code>{src}</code>
    </pre>
  );

  if (html)
    return (
      <figure className="glass my-6 overflow-hidden" data-ui>
        <figcaption className="px-4 pt-3 text-small text-muted">HTML</figcaption>
        {pre}
      </figure>
    );

  return (
    <figure className="glass my-6 overflow-hidden" data-ui>
      {ready ? (
        <CodeMirror
          value={src}
          onChange={setSrc}
          theme={theme}
          extensions={extensions}
          basicSetup={{ foldGutter: false, highlightActiveLine: true, autocompletion: false }}
          aria-label="Code editor"
        />
      ) : (
        pre
      )}
      <div className="flex flex-wrap items-center gap-3 border-t border-line px-4 py-3">
        <button
          type="button"
          onClick={() => go(src)}
          disabled={busy}
          className="btn btn-primary min-h-10 disabled:opacity-60"
        >
          {busy ? "Running…" : "Run"}
        </button>
        {src !== code && (
          <button type="button" onClick={() => (setSrc(code), setOut(null))} className="link min-h-11 cursor-pointer">
            Reset
          </button>
        )}
        <span className="ml-auto hidden text-small text-muted sm:inline">Ctrl + Enter runs it</span>
      </div>
      {out && (
        <output className="block border-t border-line bg-black/20 px-4 py-4 font-mono text-[15px] leading-[1.5]" aria-live="polite">
          {out.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${l.kind === "error" ? "text-error" : l.kind === "info" ? "text-muted" : ""}`}
            >
              {l.text}
            </div>
          ))}
        </output>
      )}
    </figure>
  );
}
