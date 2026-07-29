"use client";

import { formatTime } from "@/lib/stats";

interface StatsBarProps {
  timeDisplay: string; // e.g. "0:45" elapsed or remaining
  wpm: number;
  accuracy: number;
  label?: string;
}

export default function StatsBar({ timeDisplay, wpm, accuracy, label }: StatsBarProps) {
  return (
    <div className="flex items-center gap-6 font-mono text-ribbon">
      <div className="flex flex-col items-start">
        <span className="text-3xl font-semibold tabular-nums">{timeDisplay}</span>
        <span className="text-xs uppercase tracking-widest text-paper-faint">{label ?? "time"}</span>
      </div>
      <div className="h-8 w-px bg-ink-line" />
      <div className="flex flex-col items-start">
        <span className="text-3xl font-semibold tabular-nums">{wpm}</span>
        <span className="text-xs uppercase tracking-widest text-paper-faint">wpm</span>
      </div>
      <div className="h-8 w-px bg-ink-line" />
      <div className="flex flex-col items-start">
        <span className="text-3xl font-semibold tabular-nums">{accuracy}%</span>
        <span className="text-xs uppercase tracking-widest text-paper-faint">acc</span>
      </div>
    </div>
  );
}

export { formatTime };
