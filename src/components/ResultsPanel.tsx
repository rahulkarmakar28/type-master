"use client";

import { RotateCcw } from "lucide-react";

interface ResultsPanelProps {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  correctChars: number;
  incorrectChars: number;
  durationSeconds: number;
  onRestart: () => void;
  benchmark?: { minWpm: number; passed: boolean; note: string } | null;
  extra?: React.ReactNode;
}

export default function ResultsPanel({
  wpm,
  rawWpm,
  accuracy,
  consistency,
  correctChars,
  incorrectChars,
  durationSeconds,
  onRestart,
  benchmark,
  extra,
}: ResultsPanelProps) {
  return (
    <div className="animate-rise rounded-xl border border-ink-line bg-ink-surface p-6 md:p-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <Stat label="wpm" value={wpm} big />
        <Stat label="raw wpm" value={rawWpm} big />
        <Stat label="accuracy" value={`${accuracy}%`} big />
        <Stat label="consistency" value={`${consistency}%`} big />
        <Stat label="correct chars" value={correctChars} />
        <Stat label="errors" value={incorrectChars} />
        <Stat label="duration" value={`${durationSeconds.toFixed(1)}s`} />
        {benchmark && (
          <Stat
            label={`min ${benchmark.minWpm} wpm`}
            value={benchmark.passed ? "PASS" : "RETRY"}
            valueClass={benchmark.passed ? "text-sage" : "text-brick"}
          />
        )}
      </div>

      {benchmark && (
        <p className="mt-4 text-sm text-paper-faint">{benchmark.note}</p>
      )}

      {extra}

      <button
        onClick={onRestart}
        className="mt-8 flex items-center gap-2 rounded-lg bg-ribbon px-5 py-2.5 font-medium text-ink transition hover:bg-ribbon-bright"
      >
        <RotateCcw size={18} />
        Try again
      </button>
    </div>
  );
}

function Stat({
  label,
  value,
  big,
  valueClass,
}: {
  label: string;
  value: string | number;
  big?: boolean;
  valueClass?: string;
}) {
  return (
    <div>
      <div
        className={`font-mono font-semibold tabular-nums ${valueClass ?? "text-ribbon"} ${
          big ? "text-4xl" : "text-2xl"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-paper-faint">{label}</div>
    </div>
  );
}
