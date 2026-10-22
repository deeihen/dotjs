import Link from "next/link";

const reach = [
  ["Email", "mailto:markdennisconcha14@gmail.com"],
  ["GitHub", "https://github.com/Denffsdevsweng"],
  ["Facebook", "https://facebook.com/Deeihen"],
  ["Instagram", "https://instagram.com/deeihen"],
];

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden px-3 pb-3 sm:px-4" data-cube="0.55,-0.4,0">
      <div className="glass mx-auto max-w-7xl overflow-hidden">
        <div className="grid gap-12 p-8 md:grid-cols-12 md:p-12">
          <ul className="space-y-1 md:col-span-5">
            {reach.map(([name, href]) => (
              <li key={name}>
                <a href={href} className="group inline-flex items-center gap-3 text-[clamp(26px,2.4vw,36px)] font-medium tracking-tight">
                  {name}
                  <span className="text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-8 text-small md:col-span-6 md:col-start-7">
            <div className="space-y-2">
              <p className="text-muted">Course</p>
              <Link href="/lessons" className="link block">All lessons</Link>
              <Link href="/lessons/welcome" className="link block">Lesson 1</Link>
              <Link href="/#about" className="link block">About</Link>
            </div>
            <div className="space-y-2">
              <p className="text-muted">Keep learning</p>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" className="link block">MDN JavaScript</a>
              <a href="https://javascript.info" className="link block">javascript.info</a>
            </div>
          </div>
          <p className="max-w-[90ch] text-small text-muted md:col-span-12">
            Pictures: <a className="link" href="https://commons.wikimedia.org/wiki/File:Two_women_operating_ENIAC_(full_resolution).jpg">“Two women operating ENIAC”</a> and{" "}
            <a className="link" href="https://commons.wikimedia.org/wiki/File:Betty_Jennings_(Mrs._Bartik).jpg">“Betty Jennings (Mrs. Bartik)”</a>, U.S. Army, public domain;{" "}
            <a className="link" href="https://commons.wikimedia.org/wiki/File:IBM_card_storage.NARA.jpg">“IBM card storage”</a>, NARA, public domain. All via Wikimedia Commons.
          </p>
          <div className="flex justify-between gap-6 text-small text-muted md:col-span-12">
            <p>© 2023–2026 Mark Dennis Concha · BSCS A2023</p>
            <a href="#" className="link">Back to top</a>
          </div>
        </div>
        <p aria-hidden className="display gold -mb-[0.22em] px-6 text-[clamp(120px,30vw,480px)] leading-[0.8] md:px-10">
          .Js
        </p>
      </div>
    </footer>
  );
}
