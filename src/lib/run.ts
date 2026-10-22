// Runs untrusted learner code in a throwaway Web Worker: no DOM access,
// and terminate() stops infinite loops without freezing the page.

export type Line = { kind: "log" | "error" | "info"; text: string };

const WORKER = `
const show = (v, top) => {
  if (typeof v === "string") return top ? v : JSON.stringify(v);
  if (typeof v === "function") return "function " + (v.name || "anonymous");
  if (v === undefined) return "undefined";
  if (Array.isArray(v)) return "[" + v.map((x) => show(x)).join(", ") + "]";
  if (v && typeof v === "object") {
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
};
let count = 0;
const send = (kind) => (...a) => {
  // Throwing here also ends a runaway loop that logs on every pass.
  if (++count > 500) throw new Error("Stopped after 500 lines of output. Is there a loop that never ends?");
  postMessage({ kind, text: a.map((x) => show(x, true)).join(" ") });
};
console.log = console.info = console.debug = send("log");
console.warn = console.error = send("error");
onmessage = (e) => {
  try {
    const result = (0, eval)(e.data.code);
    if (e.data.expr) postMessage({ kind: "result", text: show(result) });
  } catch (err) {
    postMessage({ kind: "error", text: err.name + ": " + err.message });
  }
  postMessage({ kind: "done" });
};
`;

let url: string | null = null;

export function run(code: string, { expr = false, timeout = 2000 } = {}) {
  url ??= URL.createObjectURL(new Blob([WORKER], { type: "text/javascript" }));
  const worker = new Worker(url);
  const lines: Line[] = [];
  let result: string | undefined;

  return new Promise<{ lines: Line[]; result?: string }>((resolve) => {
    const finish = () => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ lines, result });
    };
    const timer = setTimeout(() => {
      lines.push({ kind: "error", text: `Stopped after ${timeout / 1000} seconds. Is there a loop that never ends?` });
      finish();
    }, timeout);
    worker.onmessage = (e) => {
      const { kind, text } = e.data;
      if (kind === "done") finish();
      else if (kind === "result") result = text;
      else lines.push({ kind, text });
    };
    worker.postMessage({ code, expr });
  });
}
