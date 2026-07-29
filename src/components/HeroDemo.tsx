"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TypingArea from "./TypingArea";
import { useTypingEngine, EngineResult } from "@/hooks/useTypingEngine";

const DEMO_TEXT = "the quick brown fox jumps over the lazy dog while typing at a steady pace";

export default function HeroDemo() {
  const [resetKey, setResetKey] = useState(0);
  const [result, setResult] = useState<EngineResult | null>(null);

  const engine = useTypingEngine(DEMO_TEXT, {
    resetKey,
    onFinish: (r) => setResult(r),
  });

  const tryAgain = () => {
    setResult(null);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="w-full rounded-2xl border border-ink-line bg-ink-surface/80 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
      <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-widest text-paper-faint">
        <span>Live demo — type this line</span>
        <span className="font-mono text-ribbon">{Math.round(engine.liveWpm)} wpm</span>
      </div>

      {!result ? (
        <>
          <TypingArea
            text={DEMO_TEXT}
            typed={engine.typed}
            charStatuses={engine.charStatuses}
            onChange={engine.handleChange}
            height={110}
            fontSizeClass="text-xl md:text-2xl"
          />
        </>
      ) : (
        <div className="animate-rise flex flex-col gap-4 py-2">
          <div className="flex gap-8">
            <div>
              <div className="font-mono text-3xl font-semibold text-ribbon">{result.wpm}</div>
              <div className="text-xs uppercase tracking-widest text-paper-faint">wpm</div>
            </div>
            <div>
              <div className="font-mono text-3xl font-semibold text-ribbon">{result.accuracy}%</div>
              <div className="text-xs uppercase tracking-widest text-paper-faint">accuracy</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={tryAgain}
              className="rounded-lg border border-ink-line px-4 py-2 text-sm text-paper-dim transition hover:border-ribbon hover:text-paper"
            >
              Type it again
            </button>
            <Link
              href="/test"
              className="flex items-center gap-1.5 rounded-lg bg-ribbon px-4 py-2 text-sm font-medium text-ink transition hover:bg-ribbon-bright"
            >
              Take the full test <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
