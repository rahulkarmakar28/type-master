import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Timer, Landmark, LineChart, Keyboard } from "lucide-react";
import Header from "@/components/Header";
import HeroDemo from "@/components/HeroDemo";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Free Typing Test, Typing Tutor & Government Exam Practice`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Typing speed test (time, words, quote, custom text)",
    "Beginner to advanced typing lessons",
    "Government exam typing test practice (SSC CHSL, RRB NTPC and more)",
    "Local, offline progress tracking",
  ],
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-10 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="mb-4 inline-block rounded-full border border-ink-line px-3 py-1 text-xs uppercase tracking-widest text-ribbon">
            Free · No sign-up · Works offline
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-paper md:text-6xl">
            Type faster.
            <br />
            Type <span className="text-ribbon">correctly.</span>
            <br />
            Clear the exam.
          </h1>
          <p className="mt-6 max-w-md text-lg text-paper-dim">
            Learn to type from your first home-row keystroke to advanced paragraph
            speed, and rehearse the exact typing test used in SSC CHSL, RRB NTPC and
            other government recruitment exams.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/test"
              className="flex items-center gap-2 rounded-lg bg-ribbon px-6 py-3 font-medium text-ink transition hover:bg-ribbon-bright"
            >
              Start a typing test <ArrowRight size={18} />
            </Link>
            <Link
              href="/learn"
              className="flex items-center gap-2 rounded-lg border border-ink-line px-6 py-3 font-medium text-paper transition hover:border-ribbon"
            >
              Learn to type from scratch
            </Link>
          </div>
        </div>
        <HeroDemo />
      </section>

      {/* Feature grid */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          Everything you need, in one place
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<GraduationCap size={22} />}
            title="Learn to type"
            body="A guided curriculum from home-row basics to advanced paragraphs, with an on-screen keyboard that shows the next key."
            href="/learn"
          />
          <FeatureCard
            icon={<Timer size={22} />}
            title="Typing test"
            body="Time, words, quote or your own custom text — monkeytype-style live WPM, accuracy and consistency tracking."
            href="/test"
          />
          <FeatureCard
            icon={<Landmark size={22} />}
            title="Government exam mode"
            body="Practice on realistic office passages under the exact time limits and speed benchmarks used by SSC, RRB and more."
            href="/exam"
          />
          <FeatureCard
            icon={<LineChart size={22} />}
            title="Track your progress"
            body="Every test is saved locally on your device, so you can watch your WPM and accuracy improve over time."
            href="/progress"
          />
        </div>
      </section>

      {/* Learning path */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">
          One path, beginner to advanced
        </h2>
        <p className="mt-2 max-w-2xl text-paper-dim">
          Each stage unlocks the next. The order matters — it mirrors how your
          fingers actually build muscle memory.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          <PathStep
            n="01"
            title="Beginner"
            body="Home row, top row and bottom row — every letter key, taught finger by finger."
          />
          <PathStep
            n="02"
            title="Intermediate"
            body="Numbers, capitalization, and the punctuation and symbols real documents use."
          />
          <PathStep
            n="03"
            title="Advanced"
            body="Common letter patterns, full paragraphs, and exam-length endurance drills."
          />
        </ol>
        <Link
          href="/learn"
          className="mt-8 inline-flex items-center gap-2 font-medium text-ribbon hover:underline"
        >
          View the full curriculum <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-paper-faint">
        <div className="flex items-center gap-2">
          <Keyboard size={16} />
          <span>typemaster — practice typing, no account required.</span>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-ink-line bg-ink-surface p-5 transition hover:border-ribbon/60"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ribbon/15 text-ribbon">
        {icon}
      </span>
      <h3 className="font-display font-semibold text-paper">{title}</h3>
      <p className="text-sm text-paper-dim">{body}</p>
      <span className="mt-auto flex items-center gap-1 text-sm text-ribbon opacity-0 transition group-hover:opacity-100">
        Explore <ArrowRight size={14} />
      </span>
    </Link>
  );
}

function PathStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="rounded-xl border border-ink-line bg-ink-surface p-5">
      <span className="font-mono text-sm text-ribbon">{n}</span>
      <h3 className="mt-2 font-display font-semibold text-paper">{title}</h3>
      <p className="mt-2 text-sm text-paper-dim">{body}</p>
    </li>
  );
}