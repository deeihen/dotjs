import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-4 bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] py-2 pr-2 pl-5 text-small">
        <Link href="/" className="press text-lead font-semibold tracking-tight" aria-label=".Js home">
          <span className="gold">.</span>Js
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/lessons" className="text-muted transition-colors hover:text-ink">
            Lessons
          </Link>
          <Link href="/#about" className="hidden text-muted transition-colors hover:text-ink sm:inline">
            About
          </Link>
          <ThemeToggle />
          <Link href="/lessons/welcome" className="btn btn-primary hidden min-h-10 text-small sm:inline-flex">
            Start learning
          </Link>
        </nav>
      </div>
    </header>
  );
}
