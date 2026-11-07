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
import { generateWordText } from "@/lib/words";
import { randomQuote } from "@/lib/quotes";
import { formatTime } from "@/lib/stats";
import { saveResult, recordCharMistakes } from "@/lib/storage";
import { TestMode, TestResult } from "@/types";

const TIME_OPTIONS = [15, 30, 60, 120] as const;
const WORD_OPTIONS = [10, 25, 50, 100] as const;

export default function TestPage() {
  const [mode, setMode] = useState<TestMode>("time");
  const [timeOption, setTimeOption] = useState<(typeof TIME_OPTIONS)[number]>(30);
  const [wordOption, setWordOption] = useState<(typeof WORD_OPTIONS)[number]>(25);
  const [customText, setCustomText] = useState("");
  const [customDraft, setCustomDraft] = useState("");
  const [customEditing, setCustomEditing] = useState(true);

  const [text, setText] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [result, setResult] = useState<EngineResult | null>(null);
  const savedRef = useRef(false);

  const { settings } = useSettings();
  const playClick = useKeySound(settings.soundEnabled);

  const buildText = () => {
    if (mode === "time") return generateWordText(60);
    if (mode === "words") return generateWordText(wordOption);
    if (mode === "quote") return generateWordText(30);
    return customText;
  };

  const regenerate = () => {
    setResult(null);
    savedRef.current = false;
    setText(buildText());
    setResetKey((k) => k + 1);
  };

  // Regenerate text whenever mode/options change (not for custom, which needs explicit start)
  useEffect(() => {
    if (mode === "custom") {
      setCustomEditing(true);
      return;
    }
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, timeOption, wordOption]);

  const timeLimit = mode === "time" ? timeOption : undefined;
  // "time" mode is an endless growing stream, so it uses the scrolling window;
  // every other mode is a finite, fixed text, so the whole paragraph is shown.
  const fullText = mode !== "time";

  const engine = useTypingEngine(text, {
    timeLimitSeconds: timeLimit,
    resetKey,
    onFinish: (r) => {
      if (savedRef.current) return;
      savedRef.current = true;
      setResult(r);
      recordCharMistakes(r.charErrors);
      const label =
        mode === "time"
          ? `${timeOption}s`
          : mode === "words"
          ? `${wordOption} words`
          : mode === "quote"
          ? "quote"
          : "custom text";
      const testResult: TestResult = {
        id: `${Date.now()}`,
        date: Date.now(),
        mode,
        label,
        wpm: r.wpm,
        rawWpm: r.rawWpm,
        accuracy: r.accuracy,
        consistency: r.consistency,
        correctChars: r.correctChars,
        incorrectChars: r.incorrectChars,
        totalChars: r.totalChars,
        durationSeconds: r.durationSeconds,
      };
      saveResult(testResult);
    },
    onNeedMoreText: () => {
      if (mode === "time") setText((prev) => prev + " " + generateWordText(20));
    },
  });

  const timeDisplay =
    mode === "time"
      ? formatTime(Math.max(timeOption - engine.elapsed, 0))
      : formatTime(engine.elapsed);

  const startCustom = () => {
    if (!customDraft.trim()) return;
    setCustomText(customDraft.trim());
    setCustomEditing(false);
  };

  useEffect(() => {
    if (mode === "custom" && !customEditing) {
      regenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customEditing]);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PillGroup
            value={mode}
            onChange={(v) => setMode(v)}
            options={[
              { value: "time", label: "Time" },
              { value: "words", label: "Words" },
              { value: "quote", label: "Quote" },
              { value: "custom", label: "Custom" },
            ]}
          />
          {mode === "time" && (
            <PillGroup
              value={timeOption}
              onChange={setTimeOption}
              options={TIME_OPTIONS.map((t) => ({ value: t, label: `${t}s` }))}
            />
          )}
          {mode === "words" && (
            <PillGroup
              value={wordOption}
              onChange={setWordOption}
              options={WORD_OPTIONS.map((w) => ({ value: w, label: `${w}` }))}
            />
          )}
        </div>

        {mode === "custom" && customEditing ? (
          <div className="w-full">
            <textarea
              value={customDraft}
              onChange={(e) => setCustomDraft(e.target.value)}
              placeholder="Paste or write the text you want to practice with..."
              className="h-40 w-full rounded-xl border border-ink-line bg-ink-surface p-4 font-mono text-paper outline-none focus:border-ribbon"
            />
            <button
              onClick={startCustom}
              className="mt-4 rounded-lg bg-ribbon px-6 py-2.5 font-medium text-ink transition hover:bg-ribbon-bright"
            >
              Start test
            </button>
          </div>
        ) : (
          <>
            {!result && (
              <div className="w-full">
                <div className="mb-6 flex justify-center">
                  <StatsBar timeDisplay={timeDisplay} wpm={Math.round(engine.liveWpm)} accuracy={engine.liveAccuracy} />
                </div>
                <TypingArea
                  text={text}
                  typed={engine.typed}
                  charStatuses={engine.charStatuses}
                  onChange={engine.handleChange}
                  fullText={fullText}
                  onKeystroke={(correct) => playClick(correct ? "correct" : "incorrect")}
                  onRestartShortcut={regenerate}
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
                onRestart={() => {
                  if (mode === "custom") {
                    setCustomEditing(true);
                  } else {
                    regenerate();
                  }
                }}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}
