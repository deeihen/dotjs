import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CodeRunner from "@/components/CodeRunner";
import LessonList from "@/components/LessonList";
import Quiz from "@/components/Quiz";
import LessonGate from "@/components/LessonGate";
import NextLesson from "@/components/NextLesson";
import Text from "@/components/Text";
import { getLesson, lessons } from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = getLesson((await params).slug);
  return found ? { title: found.lesson.title, description: found.lesson.summary } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = getLesson((await params).slug);
  if (!found) notFound();
  const { lesson, prev, next, index } = found;

  return (
    <>
      <Header />
      <div className="wrap mx-auto grid max-w-7xl gap-12 pt-28 pb-[clamp(96px,14vh,160px)] lg:grid-cols-12 lg:gap-8">
        <aside className="order-last lg:order-none lg:col-span-3">
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100svh-120px)] lg:overflow-y-auto lg:pr-2" data-lenis-prevent>
            <h2 className="mb-6 text-lead font-medium">
              <Link href="/lessons" className="link">
                All lessons
              </Link>
            </h2>
            <LessonList current={lesson.slug} compact />
          </div>
        </aside>

        <main className="min-w-0 lg:col-span-8 lg:col-start-5">
          <h1 className="display text-[clamp(40px,4.4vw,64px)]">{lesson.title}</h1>
          <p className="mt-5 max-w-[48ch] text-lead">{lesson.summary}</p>
          <p className="mt-3 text-muted">
            JavaScript lesson {index + 1} of {lessons.length} · {lesson.minutes} min
          </p>

          <LessonGate slug={lesson.slug}>
          {lesson.sections.map((s) => (
            <section key={s.heading} data-reveal className="mt-20 max-w-[72ch]">
              <h2 className="mb-5 text-[clamp(28px,2.6vw,40px)] font-medium leading-[1.1] tracking-[-0.03em]">{s.heading}</h2>
              {s.blocks.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i} className="my-4">
                    <Text>{b}</Text>
                  </p>
                ) : (
                  <CodeRunner key={i} code={b.code} html={b.html} />
                ),
              )}
            </section>
          ))}

          <section className="mt-20 max-w-[72ch] rounded-[var(--radius)] bg-accent p-6 text-accent-ink shadow-[0_30px_100px_-30px_var(--glow)] md:p-10">
            <h2 className="mb-5 text-[clamp(28px,2.6vw,40px)] font-medium leading-[1.1] tracking-[-0.03em]">Remember</h2>
            <ul className="space-y-3">
              {lesson.takeaways.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-full bg-accent-ink" />
                  <span>
                    <Text>{t}</Text>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20 max-w-[72ch]">
            <h2 className="mb-8 text-[clamp(28px,2.6vw,40px)] font-medium leading-[1.1] tracking-[-0.03em]">Check yourself</h2>
            <Quiz slug={lesson.slug} questions={lesson.quiz} />
          </section>
          </LessonGate>

          <nav className="mt-20 grid max-w-[72ch] gap-4 sm:grid-cols-2" aria-label="Lesson navigation">
            {prev ? (
              <Link href={`/lessons/${prev.slug}`} className="glass press block p-5 hover:bg-glass-strong">
                <span className="block text-small text-muted">Previous</span>
                <span className="text-lead">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            <NextLesson slug={lesson.slug} next={next} />
          </nav>
        </main>
      </div>
    </>
  );
}
