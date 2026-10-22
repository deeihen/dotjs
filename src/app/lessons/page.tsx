import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LessonList from "@/components/LessonList";
import ProgressSummary from "@/components/ProgressSummary";
import { lessons } from "@/lib/lessons";

export const metadata: Metadata = { title: "All lessons" };

export default function LessonsPage() {
  return (
    <>
      <Header />
      <main className="wrap mx-auto grid max-w-7xl gap-12 pt-36 pb-[clamp(96px,14vh,200px)] md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h1 data-reveal className="display metal text-head">
            All {lessons.length} lessons
          </h1>
          <p data-reveal style={{ "--d": 1 } as React.CSSProperties} className="mt-6 max-w-[40ch]">
            Take them in order: each one builds on the last. A yellow dot means you passed its quiz or marked it done.
          </p>
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="mt-10">
            <ProgressSummary />
          </div>
        </div>
        <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="md:col-span-6 md:col-start-7">
          <LessonList />
        </div>
      </main>
      <Footer />
    </>
  );
}
