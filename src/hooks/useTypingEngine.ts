"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CharStatus, EngineStatus, WpmSample } from "@/types";
import { calcAccuracy, calcConsistency, calcGrossWpm, calcNetWpm } from "@/lib/stats";

export interface EngineResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  durationSeconds: number;
  /** Count of mistakes per expected character, e.g. { a: 3, e: 1 } — used to surface "problem keys". */
  charErrors: Record<string, number>;
}

interface UseTypingEngineOptions {
  timeLimitSeconds?: number; // if set, test ends automatically at this time
  resetKey?: string | number; // change this to force a full reset (new test)
  onFinish?: (result: EngineResult) => void;
  onNeedMoreText?: () => void; // called when typist is nearing end of current text (time mode)
}

export function useTypingEngine(text: string, options: UseTypingEngineOptions = {}) {
  const { timeLimitSeconds, resetKey, onFinish, onNeedMoreText } = options;

  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<EngineStatus>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [samples, setSamples] = useState<WpmSample[]>([]);

  const startTimeRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const lastSampleSecondRef = useRef(0);
  const textRef = useRef(text);
  textRef.current = text;
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;
  const onNeedMoreRef = useRef(onNeedMoreText);
  onNeedMoreRef.current = onNeedMoreText;

  // Full reset whenever resetKey changes (new test requested)
  useEffect(() => {
    setTyped("");
    setStatus("idle");
    setElapsed(0);
    setSamples([]);
    startTimeRef.current = null;
    finishedRef.current = false;
    lastSampleSecondRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const computeCounts = useCallback((typedValue: string, target: string) => {
    let correct = 0;
    let incorrect = 0;
    const errors: Record<string, number> = {};
    for (let i = 0; i < typedValue.length; i++) {
      if (typedValue[i] === target[i]) {
        correct++;
      } else {
        incorrect++;
        const expected = target[i] ?? "";
        if (expected && expected !== " ") {
          errors[expected] = (errors[expected] ?? 0) + 1;
        }
      }
    }
    return { correct, incorrect, errors };
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setStatus("finished");
    const target = textRef.current;
    const finalElapsed =
      startTimeRef.current != null ? (Date.now() - startTimeRef.current) / 1000 : 0;
    setTyped((currentTyped) => {
      const { correct, incorrect, errors } = computeCounts(currentTyped, target);
      const total = currentTyped.length;
      const durationSeconds = Math.max(finalElapsed, 0.5);
      const result: EngineResult = {
        wpm: calcNetWpm(correct, incorrect, durationSeconds),
        rawWpm: calcGrossWpm(total, durationSeconds),
        accuracy: calcAccuracy(correct, total),
        consistency: calcConsistency(samples),
        correctChars: correct,
        incorrectChars: incorrect,
        totalChars: total,
        durationSeconds,
        charErrors: errors,
      };
      onFinishRef.current?.(result);
      return currentTyped;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computeCounts, samples]);

  // Timer tick while running
  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(() => {
      if (startTimeRef.current == null) return;
      const secs = (Date.now() - startTimeRef.current) / 1000;
      setElapsed(secs);

      if (Math.floor(secs) > lastSampleSecondRef.current) {
        lastSampleSecondRef.current = Math.floor(secs);
        setTyped((currentTyped) => {
          const { correct, incorrect } = computeCounts(currentTyped, textRef.current);
          const sampleWpm = calcNetWpm(correct, incorrect, secs);
          setSamples((prev) => [...prev, { t: Math.floor(secs), wpm: sampleWpm }]);
          return currentTyped;
        });
      }

      if (timeLimitSeconds != null && secs >= timeLimitSeconds) {
        finish();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [status, timeLimitSeconds, finish, computeCounts]);

  const handleChange = useCallback(
    (value: string) => {
      if (status === "finished") return;
      const target = textRef.current;

      if (status === "idle" && value.length > 0) {
        startTimeRef.current = Date.now();
        setStatus("running");
      }

      const clamped = timeLimitSeconds != null ? value : value.slice(0, target.length);
      setTyped(clamped);

      // Ask parent for more words before the typist runs off the end (time mode)
      if (timeLimitSeconds != null && target.length - clamped.length < 40) {
        onNeedMoreRef.current?.();
      }

      if (timeLimitSeconds == null && clamped.length >= target.length && target.length > 0) {
        finish();
      }
    },
    [status, timeLimitSeconds, finish]
  );

  const reset = useCallback(() => {
    setTyped("");
    setStatus("idle");
    setElapsed(0);
    setSamples([]);
    startTimeRef.current = null;
    finishedRef.current = false;
    lastSampleSecondRef.current = 0;
  }, []);

  const forceFinish = useCallback(() => {
    if (status === "idle") return;
    finish();
  }, [status, finish]);

  const charStatuses: CharStatus[] = [];
  for (let i = 0; i < text.length; i++) {
    if (i < typed.length) {
      charStatuses.push(typed[i] === text[i] ? "correct" : "incorrect");
    } else if (i === typed.length) {
      charStatuses.push("current");
    } else {
      charStatuses.push("pending");
    }
  }

  const liveCounts = computeCounts(typed, text);
  const liveWpm = calcNetWpm(liveCounts.correct, liveCounts.incorrect, Math.max(elapsed, 0.01));
  const liveAccuracy = calcAccuracy(liveCounts.correct, typed.length);

  return {
    typed,
    status,
    elapsed,
    charStatuses,
    handleChange,
    reset,
    forceFinish,
    liveWpm,
    liveAccuracy,
    correctChars: liveCounts.correct,
    incorrectChars: liveCounts.incorrect,
  };
}
