"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import Header from "@/components/Header";
import { lessonsByLevel } from "@/lib/lessons";
import { getCompletedLessons } from "@/lib/storage";
import { Lesson } from "@/types";

export default function LearnPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const { beginner, intermediate, advanced } = lessonsByLevel();
  const all = [...beginner, ...intermediate, ...advanced];

  useEffect(() => {
    getCompletedLessons().then(setCompleted);
  }, []);

  const isUnlocked = (lesson: Lesson) => {
    const idx = all.findIndex((l) => l.slug === lesson.slug);
    if (idx <= 0) return true;
    return completed.includes(all[idx - 1].slug) || completed.includes(lesson.slug);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-paper">Learn to type</h1>
        <p className="mt-2 max-w-2xl text-paper-dim">
          A guided path from your very first keystroke to advanced, exam-ready paragraphs.
          Complete a lesson to unlock the next one.
        </p>

        <LevelBlock title="Beginner" subtitle="Home row, top row, bottom row" lessons={beginner} completed={completed} isUnlocked={isUnlocked} />
        <LevelBlock title="Intermediate" subtitle="Numbers, capitals, punctuation & symbols" lessons={intermediate} completed={completed} isUnlocked={isUnlocked} />
        <LevelBlock title="Advanced" subtitle="Common patterns, paragraphs, exam endurance" lessons={advanced} completed={completed} isUnlocked={isUnlocked} />
      </section>
    </main>
  );
}

function LevelBlock({
  title,
  subtitle,
  lessons,
  completed,
  isUnlocked,
}: {
  title: string;
  subtitle: string;
  lessons: Lesson[];
  completed: string[];
  isUnlocked: (l: Lesson) => boolean;
}) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-xl font-semibold text-paper">{title}</h2>
      <p className="text-sm text-paper-faint">{subtitle}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {lessons.map((lesson) => {
          const done = completed.includes(lesson.slug);
          const unlocked = isUnlocked(lesson);
          const content = (
            <div
              className={`flex items-start gap-3 rounded-xl border p-4 transition ${
                unlocked
                  ? "border-ink-line bg-ink-surface hover:border-ribbon/60"
                  : "border-ink-line/50 bg-ink-surface/40 opacity-60"
              }`}
            >
              <span className="mt-0.5 shrink-0 text-ribbon">
                {done ? <CheckCircle2 size={20} /> : unlocked ? <Circle size={20} /> : <Lock size={18} />}
              </span>
              <div>
                <h3 className="font-medium text-paper">{lesson.title}</h3>
                <p className="mt-1 text-sm text-paper-dim">{lesson.description}</p>
              </div>
            </div>
          );
          return unlocked ? (
            <Link key={lesson.slug} href={`/learn/${lesson.slug}`}>
              {content}
            </Link>
          ) : (
            <div key={lesson.slug}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
