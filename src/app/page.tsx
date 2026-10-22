import Image from "next/image";
import Header from "@/components/Header";
import Scene3D from "@/components/Scene3D";
import SmoothScroll from "@/components/SmoothScroll";
import SplitText from "@/components/SplitText";
import CodeStory from "@/components/CodeStory";
import LiveExpression from "@/components/LiveExpression";
import HistoryZoom from "@/components/HistoryZoom";
import LessonRail from "@/components/LessonRail";
import WordFill from "@/components/WordFill";
import ContinueButton from "@/components/ContinueButton";
import Footer from "@/components/Footer";
import { lessons } from "@/lib/lessons";
import jennings from "@/img/betty-jennings-mrs-bartik.jpg";
import cards from "@/img/ibm-card-storage-nara.jpg";

const total = lessons.reduce((n, l) => n + l.minutes, 0);

const faq = [
  ["Do I need to install anything?", "No. Every example runs in the page itself. A current browser on a laptop, tablet or phone is enough."],
  ["Is it really free?", "Yes. There is no account, no ads and no paywall. It is a student project made to help other beginners."],
  ["Where is my progress saved?", "In this browser’s local storage, on your own device. Nothing is sent anywhere. Clearing your browser’s site data resets it, and so does the reset link on the lessons page."],
  ["How long does the course take?", `${lessons.length} lessons of five to eight minutes each: about ${Math.round(total / 60)} hours in total. Do one a day, or all of them in a weekend.`],
  ["What should I learn after lesson 21?", ""],
  ["I found a mistake. How do I report it?", "Email markdennisconcha14@gmail.com or open an issue on GitHub. Say which lesson, and what confused you."],
];

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Scene3D />
      <Header />

      <main className="relative z-10">
        {/* Hero: letters fly in from depth beside the 3D cube. */}
        <section className="relative flex min-h-svh items-center pt-24" data-cube="0.5,-0.02,1.05" data-cube-m="0.05,-0.42,0.85">
          <div className="glow -top-40 -left-40 size-[620px] opacity-60" />
          <div className="wrap mx-auto w-full max-w-7xl">
            <div className="max-w-[640px] pt-[34svh] md:pt-0">
              <SplitText
                as="h1"
                mode="depth"
                text="Hello,|World!"
                lineBreak="|"
                className="display text-[clamp(64px,10.5vw,168px)]"
                partClass="metal"
              />
              <p data-reveal style={d(6)} className="mt-8 max-w-[34ch] text-lead text-muted">
                <span className="text-ink">.Js is a free JavaScript course</span> for complete beginners. {lessons.length}{" "}
                short lessons you read, run and check right in your browser.
              </p>
              <div data-reveal style={d(8)} className="mt-10 flex flex-wrap gap-3">
                <ContinueButton className="btn btn-primary min-h-14 px-7 text-lead" />
                <a href="#lessons" className="btn btn-ghost min-h-14 px-7">
                  See all {lessons.length} lessons
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-6 hidden justify-center text-small text-muted md:flex" aria-hidden>
            <span className="animate-bounce">Scroll</span>
          </div>
        </section>

        <CodeStory />

        {/* Live thing: type an expression, read the answer. */}
        <section className="relative py-[clamp(120px,18vh,220px)]" aria-labelledby="try" data-cube="-0.72,-0.5,0.42" data-cube-m="0.6,-0.8,0">
          <div className="glow top-20 right-0 size-[520px] opacity-40" />
          <div className="wrap relative mx-auto max-w-7xl">
            <div className="mb-14 grid gap-6 md:grid-cols-12">
              <SplitText id="try" text="Code in, answer out" className="display metal text-head md:col-span-6" />
              <p data-reveal className="max-w-[48ch] text-muted md:col-span-5 md:col-start-8 md:self-end">
                JavaScript reads what you type and answers instantly. Change the left side, or tap an example. Some answers
                will surprise you; lesson 10 explains the strange one.
              </p>
            </div>
            <div data-reveal style={d(1)}>
              <LiveExpression />
            </div>
          </div>
        </section>

        <HistoryZoom />

        <section className="py-[clamp(100px,14vh,180px)]" aria-labelledby="pioneers" data-cube="-0.7,0.1,0.55" data-cube-m="0.6,-0.8,0">
          <div className="wrap mx-auto grid max-w-7xl gap-8 md:grid-cols-12">
            <div className="md:col-span-5 md:self-center">
              <SplitText id="pioneers" text="From cables to one line of code" className="display metal text-[clamp(36px,4vw,64px)]" />
              <p data-reveal className="mt-6 max-w-[42ch] text-muted">
                The first programmers were mathematicians who learned a brand-new machine with no manual. You have it easier: a
                browser, an editor on the page, and lessons that fit on one screen.
              </p>
            </div>
            <figure data-reveal style={d(1)} className="md:col-span-3 md:col-start-7">
              <Image src={jennings} alt="Betty Jennings at an ENIAC control panel" className="aspect-[3/4] h-auto w-full rounded-[var(--radius)] object-cover object-top" sizes="(min-width: 768px) 25vw, 100vw" placeholder="blur" />
              <figcaption className="mt-3 text-small text-muted">Betty Jennings, one of ENIAC’s six original programmers.</figcaption>
            </figure>
            <figure data-reveal style={d(2)} className="md:col-span-3 md:mt-24">
              <Image src={cards} alt="Rows of shelves holding boxes of IBM punched cards, 1959" className="aspect-[3/4] h-auto w-full rounded-[var(--radius)] object-cover" sizes="(min-width: 768px) 25vw, 100vw" placeholder="blur" />
              <figcaption className="mt-3 text-small text-muted">Programs stored on punched cards, 1959.</figcaption>
            </figure>
          </div>
        </section>

        <LessonRail />

        {/* About: words light up as you scroll. */}
        <section id="about" className="relative scroll-mt-24 py-[clamp(120px,18vh,220px)]" aria-labelledby="about-h" data-cube="0.68,0,0.6" data-cube-m="0.6,-0.85,0">
          <div className="wrap mx-auto max-w-7xl">
            <SplitText id="about-h" text="Made by a student" className="display metal text-head" />
            <WordFill className="mt-12 max-w-[30ch] text-[clamp(26px,3.2vw,48px)] leading-[1.18] font-medium tracking-[-0.03em] md:max-w-[26ch]">
              <p>
                Mark Dennis Concha built the first .Js in <mark className="hl bg-accent">2023</mark> as a BSCS student. It was
                Mark’s first website. This is the rebuild: all <mark className="hl bg-accent">{lessons.length} lessons</mark>,
                every example editable, <mark className="hl bg-accent">nothing to install</mark> and no account. Still a solo
                project, so feedback is welcome.
              </p>
            </WordFill>
            <a data-reveal href="mailto:markdennisconcha14@gmail.com?subject=.Js%20feedback" className="btn btn-ghost mt-12 min-h-14 px-7">
              Write to Mark
            </a>
          </div>
        </section>

        <section className="pb-[clamp(120px,18vh,220px)]" aria-labelledby="faq" data-cube="-0.62,0.55,0.38" data-cube-m="0.6,0.85,0">
          <div className="wrap mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
            <SplitText id="faq" text="Questions before you start" className="display metal text-[clamp(36px,4vw,64px)] md:col-span-4" />
            <div className="space-y-3 md:col-span-7 md:col-start-6">
              {faq.map(([q, a], i) => (
                <details key={q} data-reveal style={d(i)} className="glass group px-5 py-2 open:bg-glass-strong">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 text-lead font-medium">
                    {q}
                    <span className="chev grid size-8 shrink-0 place-items-center rounded-full bg-glass-strong transition-transform duration-300">
                      <svg aria-hidden width="14" height="9" viewBox="0 0 16 10">
                        <path d="M1 1l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-[56ch] pt-1 pb-4 text-muted">
                    {a || (
                      <>
                        Arrays and objects, then the DOM: making a page react to clicks and typing.{" "}
                        <a className="link text-ink" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                          MDN Web Docs
                        </a>{" "}
                        is the best free reference for all of it.
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Close: the cube returns beside the last call. */}
        <section className="relative overflow-hidden py-[clamp(140px,22vh,260px)]" aria-labelledby="cta" data-cube="0.55,0,0.95" data-cube-m="0.1,-0.5,0.7">
          <div className="glow top-1/2 left-1/4 size-[760px] -translate-y-1/2 opacity-70" />
          <div className="wrap relative mx-auto max-w-7xl pt-[30svh] md:pt-0">
            <SplitText id="cta" text="Say it|yourself." lineBreak="|" className="display text-[clamp(64px,10vw,160px)]" partClass="gold" />
            <p data-reveal className="mt-8 max-w-[34ch] text-lead text-muted">
              Lesson 1 takes six minutes. You will print Hello World! before it ends.
            </p>
            <div data-reveal style={d(1)} className="mt-10">
              <ContinueButton className="btn btn-primary min-h-14 px-8 text-lead" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
