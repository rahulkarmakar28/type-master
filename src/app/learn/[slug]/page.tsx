"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import TypingArea from "@/components/TypingArea";
import KeyboardView from "@/components/Keyboard";
import { getLesson, nextLesson } from "@/lib/lessons";
import { markLessonComplete, recordCharMistakes } from "@/lib/storage";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { useSettings } from "@/hooks/useSettings";
import { useKeySound } from "@/hooks/useKeySound";

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug);
  const [drillIndex, setDrillIndex] = useState(0);
  const [lessonDone, setLessonDone] = useState(false);

  const { settings } = useSettings();
  const playClick = useKeySound(settings.soundEnabled);

  const drillText = lesson?.drills[drillIndex] ?? "";

  const engine = useTypingEngine(drillText, {
    resetKey: `${params.slug}-${drillIndex}`,
    onFinish: (r) => {
      recordCharMistakes(r.charErrors);
      if (!lesson) return;
      if (drillIndex < lesson.drills.length - 1) {
        setTimeout(() => setDrillIndex((i) => i + 1), 500);
      } else {
        markLessonComplete(lesson.slug);
        setTimeout(() => setLessonDone(true), 500);
      }
    },
  });

  if (!lesson) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-16 text-center text-paper-dim">
          Lesson not found. <Link href="/learn" className="text-ribbon">Back to lessons</Link>
        </div>
      </main>
    );
  }

  const upcoming = nextLesson(lesson.slug);
  const nextChar = drillText[engine.typed.length];

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-10">
        <div className="w-full">
          <Link href="/learn" className="flex items-center gap-1 text-sm text-paper-dim hover:text-paper">
            <ArrowLeft size={16} /> All lessons
          </Link>
          <h1 className="mt-3 font-display text-2xl font-semibold text-paper">{lesson.title}</h1>
          <p className="mt-1 text-paper-dim">{lesson.description}</p>
          {lesson.newKeys.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {lesson.newKeys.map((k) => (
                <span key={k} className="rounded-md border border-ribbon/40 bg-ribbon/10 px-2 py-0.5 font-mono text-sm text-ribbon">
                  {k === " " ? "space" : k}
                </span>
              ))}
            </div>
          )}
        </div>

        {!lessonDone ? (
          <>
            <div className="text-sm text-paper-faint">
              Drill {drillIndex + 1} of {lesson.drills.length}
            </div>
            <TypingArea
              text={drillText}
              typed={engine.typed}
              charStatuses={engine.charStatuses}
              onChange={engine.handleChange}
              height={110}
              fontSizeClass="text-xl md:text-2xl"
              fullText
              onKeystroke={(correct) => playClick(correct ? "correct" : "incorrect")}
            />
            <KeyboardView nextChar={nextChar} />
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-ink-line bg-ink-surface p-10 text-center">
            <CheckCircle2 size={40} className="text-sage" />
            <h2 className="font-display text-xl font-semibold text-paper">Lesson complete</h2>
            <p className="max-w-sm text-paper-dim">
              Nice work. Muscle memory builds with repetition — feel free to redo this
              lesson any time from the lessons page.
            </p>
            <div className="mt-2 flex gap-3">
              <Link href="/learn" className="rounded-lg border border-ink-line px-5 py-2.5 text-paper transition hover:border-ribbon">
                Back to lessons
              </Link>
              {upcoming && (
                <Link
                  href={`/learn/${upcoming.slug}`}
                  className="flex items-center gap-1.5 rounded-lg bg-ribbon px-5 py-2.5 font-medium text-ink transition hover:bg-ribbon-bright"
                >
                  Next lesson <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
