# TypeMaster

A typing test and typing tutor built with Next.js 14 (App Router) + TypeScript + Tailwind CSS.
No backend or database — everything runs client-side, with test history saved in `localStorage`.
The storage layer (`src/lib/storage.ts`) is isolated on purpose so it can be swapped for a real
API/database later without touching the pages that call it.

## Features

- **Landing page** — live interactive typing demo in the hero, feature overview, learning path.
- **Typing test** (`/test`) — Monkeytype-style test with **Time** (15/30/60/120s), **Words**
  (10/25/50/100), **Quote**, and **Custom text** modes. Live WPM/accuracy, per-character
  correctness highlighting, raw WPM, net WPM, accuracy and consistency on the results screen.
- **Learn to type** (`/learn`) — a full beginner → advanced curriculum: home row, top row,
  bottom row, numbers, capitalization, punctuation, symbols, bigrams, and full paragraph /
  exam-endurance drills. Each lesson page shows an on-screen keyboard highlighting the next
  key to press, and lessons unlock in sequence with progress saved locally.
- **Government exam mode** (`/exam`) — practice passages under real-world Indian government
  typing-test benchmarks (SSC CHSL, RRB NTPC, SSC Stenographer, Delhi Police, court typist),
  with pass/fail feedback against each exam's minimum WPM and accuracy requirement.
- **Progress** (`/progress`) — local history table + simple bar chart of recent WPM, pulled
  from `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Adding a real backend later

Everything that currently touches `localStorage` lives in `src/lib/storage.ts`
(`saveResult`, `getHistory`, `clearHistory`, `markLessonComplete`, `getCompletedLessons`).
To move to a real backend/DB:

1. Swap the bodies of those functions for API calls (e.g. `fetch("/api/results")`).
2. Add authentication if you want per-user history instead of per-browser history.
3. Everything else (engine, UI, pages) stays the same since they only call this module.

## Project structure

```
src/
  app/            Next.js App Router pages (landing, test, learn, exam, progress)
  components/     Reusable UI (TypingArea, StatsBar, ResultsPanel, Keyboard, Header...)
  hooks/          useTypingEngine — the core typing/timing/scoring engine
  lib/            Word lists, quotes, lessons, exam data, stats math, storage helpers
  types.ts        Shared TypeScript types
```
