export type TestMode = "time" | "words" | "quote" | "custom" | "lesson" | "exam";

export type CharStatus = "pending" | "correct" | "incorrect" | "current";

export type EngineStatus = "idle" | "running" | "finished";

export interface WpmSample {
  t: number; // seconds elapsed
  wpm: number;
}

export interface TestResult {
  id: string;
  date: number;
  mode: TestMode;
  label: string; // e.g. "60s", "50 words", exam name
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  durationSeconds: number;
  passed?: boolean; // for exam mode against a benchmark
}

export interface Lesson {
  slug: string;
  level: "beginner" | "intermediate" | "advanced";
  order: number;
  title: string;
  description: string;
  newKeys: string[];
  drills: string[]; // sequence of practice strings for this lesson
}

export interface ExamBenchmark {
  id: string;
  exam: string;
  language: "English" | "Hindi";
  minWpm: number;
  durationMinutes: number;
  errorTolerancePct: number;
  note: string;
}

export interface ExamPassage {
  id: string;
  title: string;
  text: string;
}
