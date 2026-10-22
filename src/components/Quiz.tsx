"use client";

import { useState } from "react";
import type { Question } from "@/lib/lessons";
import { saveQuiz, setDone, useProgress } from "@/lib/progress";

export default function Quiz({ slug, questions }: { slug: string; questions: Question[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const best = useProgress().quiz[slug];
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const pass = Math.ceil(questions.length * 0.66);

  const check = () => {
    setChecked(true);
    saveQuiz(slug, score);
    if (score >= pass) setDone(slug, true);
  };

  return (
    <div>
      <ol className="space-y-10">
        {questions.map((q, qi) => (
          <li key={qi}>
            <fieldset>
              <legend className="mb-4 text-lead font-medium">{q.q}</legend>
              <div className="flex flex-wrap gap-3">
                {q.options.map((o, oi) => {
                  const on = picked[qi] === oi;
                  const right = checked && oi === q.answer;
                  const wrong = checked && on && oi !== q.answer;
                  return (
                    <label
                      key={oi}
                      className={`press flex min-h-11 cursor-pointer items-center rounded-lg px-4 ${
                        right ? "bg-accent text-accent-ink" : wrong ? "bg-error text-bg" : on ? "bg-ink text-bg" : "glass"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${slug}-${qi}`}
                        className="sr-only"
                        checked={on}
                        onChange={() => {
                          setChecked(false);
                          setPicked((p) => p.map((v, i) => (i === qi ? oi : v)));
                        }}
                      />
                      {o}
                    </label>
                  );
                })}
              </div>
              {checked && <p className="mt-3 text-muted">{q.why}</p>}
            </fieldset>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={check}
          disabled={picked.includes(null)}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check answers
        </button>
        <p aria-live="polite">
          {checked
            ? score >= pass
              ? `${score} of ${questions.length}. Lesson marked as done.`
              : `${score} of ${questions.length}. Read the notes and try again.`
            : best !== undefined
              ? `Best so far: ${best} of ${questions.length}.`
              : `Answer all ${questions.length} to check.`}
        </p>
      </div>
    </div>
  );
}
