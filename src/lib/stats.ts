import { WpmSample } from "@/types";

const CHARS_PER_WORD = 5;

export function calcGrossWpm(totalTypedChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  return Math.max(0, Math.round(totalTypedChars / CHARS_PER_WORD / minutes));
}

export function calcNetWpm(correctChars: number, incorrectChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const netWords = correctChars / CHARS_PER_WORD - incorrectChars;
  return Math.max(0, Math.round(netWords / minutes));
}

export function calcAccuracy(correctChars: number, totalTypedChars: number): number {
  if (totalTypedChars <= 0) return 100;
  return Math.max(0, Math.round((correctChars / totalTypedChars) * 100));
}

export function calcConsistency(samples: WpmSample[]): number {
  if (samples.length < 2) return 100;
  const values = samples.map((s) => s.wpm);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 100;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  const stddev = Math.sqrt(variance);
  const consistency = 100 - (stddev / mean) * 100;
  return Math.max(0, Math.min(100, Math.round(consistency)));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
