"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import TypingArea from "@/components/TypingArea";
import StatsBar from "@/components/StatsBar";
import ResultsPanel from "@/components/ResultsPanel";
import { PillGroup } from "@/components/ModeSelector";
import { useTypingEngine, EngineResult } from "@/hooks/useTypingEngine";
import { useSettings } from "@/hooks/useSettings";
import { useKeySound } from "@/hooks/useKeySound";
import { EXAM_BENCHMARKS, EXAM_PASSAGES } from "@/lib/examData";
import { formatTime } from "@/lib/stats";
import { saveResult, recordCharMistakes } from "@/lib/storage";
import { TestResult } from "@/types";

const DURATION_OPTIONS = [2, 5, 10] as const;

export default function ExamPage() {
  const [benchmarkId, setBenchmarkId] = useState(EXAM_BENCHMARKS[0].id);
  const [passageId, setPassageId] = useState(EXAM_PASSAGES[0].id);
  const [durationMin, setDurationMin] = useState<(typeof DURATION_OPTIONS)[number]>(2);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [result, setResult] = useState<EngineResult | null>(null);
  const savedRef = useRef(false);

  const benchmark = EXAM_BENCHMARKS.find((b) => b.id === benchmarkId)!;
  const passage = EXAM_PASSAGES.find((p) => p.id === passageId)!;

  const { settings } = useSettings();
  const playClick = useKeySound(settings.soundEnabled);

  const timeLimitSeconds = durationMin * 60;

  const beginExam = () => {
    setResult(null);
    savedRef.current = false;
    setText(passage.text);
    setResetKey((k) => k + 1);
    setStarted(true);
  };

  const engine = useTypingEngine(text, {
    timeLimitSeconds,
    resetKey,
    onFinish: (r) => {
      if (savedRef.current) return;
      savedRef.current = true;
      setResult(r);
      recordCharMistakes(r.charErrors);
      const passed = r.wpm >= benchmark.minWpm && r.accuracy >= 100 - benchmark.errorTolerancePct;
      const testResult: TestResult = {
        id: `${Date.now()}`,
        date: Date.now(),
        mode: "exam",
        label: benchmark.exam,
        wpm: r.wpm,
        rawWpm: r.rawWpm,
        accuracy: r.accuracy,
        consistency: r.consistency,
        correctChars: r.correctChars,
        incorrectChars: r.incorrectChars,
        totalChars: r.totalChars,
        durationSeconds: r.durationSeconds,
        passed,
      };
      saveResult(testResult);
    },
    onNeedMoreText: () => {
      setText((prev) => prev + " " + passage.text);
    },
  });

  const timeDisplay = formatTime(Math.max(timeLimitSeconds - engine.elapsed, 0));

  useEffect(() => {
    setStarted(false);
  }, [benchmarkId, passageId, durationMin]);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-10">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-paper">Government exam typing test</h1>
          <p className="mt-2 max-w-xl text-paper-dim">
            Practice under the same speed and accuracy benchmarks used in common
            government recruitment typing tests.
          </p>
        </div>

        {!started ? (
          <div className="w-full max-w-2xl space-y-6 rounded-xl border border-ink-line bg-ink-surface p-6">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-paper-faint">Exam benchmark</label>
              <select
                value={benchmarkId}
                onChange={(e) => setBenchmarkId(e.target.value)}
                className="w-full rounded-lg border border-ink-line bg-ink-raised p-3 text-paper outline-none focus:border-ribbon"
              >
                {EXAM_BENCHMARKS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.exam} — {b.language} ({b.minWpm} wpm)
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-paper-faint">{benchmark.note}</p>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-paper-faint">Passage</label>
              <select
                value={passageId}
                onChange={(e) => setPassageId(e.target.value)}
                className="w-full rounded-lg border border-ink-line bg-ink-raised p-3 text-paper outline-none focus:border-ribbon"
              >
                {EXAM_PASSAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-paper-faint">
                Practice duration (official test is {benchmark.durationMinutes} min)
              </label>
              <PillGroup
                value={durationMin}
                onChange={setDurationMin}
                options={DURATION_OPTIONS.map((d) => ({ value: d, label: `${d} min` }))}
              />
            </div>

            <button
              onClick={beginExam}
              className="w-full rounded-lg bg-ribbon py-3 font-medium text-ink transition hover:bg-ribbon-bright"
            >
              Begin exam simulation
            </button>
          </div>
        ) : (
          <>
            {!result && (
              <div className="w-full">
                <div className="mb-6 flex justify-center">
                  <StatsBar
                    timeDisplay={timeDisplay}
                    wpm={Math.round(engine.liveWpm)}
                    accuracy={engine.liveAccuracy}
                    label="remaining"
                  />
                </div>
                <TypingArea
                  text={text}
                  typed={engine.typed}
                  charStatuses={engine.charStatuses}
                  onChange={engine.handleChange}
                  fullText={false}
                  height={220}
                  onKeystroke={(correct) => playClick(correct ? "correct" : "incorrect")}
                  onRestartShortcut={beginExam}
                />
              </div>
            )}

            {result && (
              <ResultsPanel
                wpm={result.wpm}
                rawWpm={result.rawWpm}
                accuracy={result.accuracy}
                consistency={result.consistency}
                correctChars={result.correctChars}
                incorrectChars={result.incorrectChars}
                durationSeconds={result.durationSeconds}
                onRestart={() => setStarted(false)}
                benchmark={{
                  minWpm: benchmark.minWpm,
                  passed: result.wpm >= benchmark.minWpm && result.accuracy >= 100 - benchmark.errorTolerancePct,
                  note: `${benchmark.exam} requires at least ${benchmark.minWpm} wpm with ${100 - benchmark.errorTolerancePct}%+ accuracy.`,
                }}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}
