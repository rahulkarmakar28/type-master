"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, Download, Upload, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import {
  clearHistory,
  getHistory,
  topProblemKeys,
  clearCharMistakes,
  downloadBackup,
  importBackup,
  BackupPayload,
} from "@/lib/storage";
import { TestResult } from "@/types";

export default function ProgressPage() {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [problemKeys, setProblemKeys] = useState<{ char: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const [h, keys] = await Promise.all([getHistory(), topProblemKeys(10)]);
    setHistory(h);
    setProblemKeys(keys);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleClear = async () => {
    await clearHistory();
    setHistory([]);
  };

  const handleClearKeys = async () => {
    await clearCharMistakes();
    setProblemKeys([]);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const payload = JSON.parse(reader.result as string) as BackupPayload;
        await importBackup(payload);
        await load();
      } catch {
        setImportError("That file doesn't look like a valid TypeMaster backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const best = history.reduce((max, r) => Math.max(max, r.wpm), 0);
  const avgWpm = history.length
    ? Math.round(history.reduce((sum, r) => sum + r.wpm, 0) / history.length)
    : 0;
  const avgAcc = history.length
    ? Math.round(history.reduce((sum, r) => sum + r.accuracy, 0) / history.length)
    : 0;

  const recent = history.slice(0, 20);
  const maxChartWpm = Math.max(...recent.map((r) => r.wpm), 20);
  const maxMistakeCount = Math.max(...problemKeys.map((k) => k.count), 1);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-paper">Your progress</h1>
            <p className="mt-2 text-paper-dim">
              Saved locally in this browser (IndexedDB) — no account needed. Back up or
              restore it as a file any time.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => downloadBackup()}
              className="flex items-center gap-2 rounded-lg border border-ink-line px-4 py-2 text-sm text-paper-dim transition hover:border-ribbon hover:text-paper"
            >
              <Download size={16} /> Export backup
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg border border-ink-line px-4 py-2 text-sm text-paper-dim transition hover:border-ribbon hover:text-paper"
            >
              <Upload size={16} /> Import backup
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              className="hidden"
            />
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 rounded-lg border border-ink-line px-4 py-2 text-sm text-paper-dim transition hover:border-brick hover:text-brick"
              >
                <Trash2 size={16} /> Clear history
              </button>
            )}
          </div>
        </div>

        {importError && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-brick/40 bg-brick/10 px-4 py-3 text-sm text-brick">
            <AlertCircle size={16} /> {importError}
          </div>
        )}

        {loading ? (
          <div className="mt-10 text-paper-dim">Loading your local history…</div>
        ) : history.length === 0 ? (
          <div className="mt-10 rounded-xl border border-ink-line bg-ink-surface p-10 text-center text-paper-dim">
            No tests yet. <a href="/test" className="text-ribbon hover:underline">Take your first test</a> to start tracking progress.
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <SummaryCard label="best wpm" value={best} />
              <SummaryCard label="average wpm" value={avgWpm} />
              <SummaryCard label="average accuracy" value={`${avgAcc}%`} />
            </div>

            <div className="mt-10 rounded-xl border border-ink-line bg-ink-surface p-6">
              <h2 className="mb-6 font-display font-semibold text-paper">Recent WPM (most recent first)</h2>
              <div className="flex h-40 items-end gap-2">
                {[...recent].reverse().map((r) => (
                  <div key={r.id} className="group relative flex-1">
                    <div
                      className="rounded-t-sm bg-ribbon/70 transition group-hover:bg-ribbon"
                      style={{ height: `${Math.max((r.wpm / maxChartWpm) * 100, 4)}%` }}
                    />
                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-paper opacity-0 transition group-hover:opacity-100">
                      {r.wpm} wpm
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {problemKeys.length > 0 && (
              <div className="mt-10 rounded-xl border border-ink-line bg-ink-surface p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-semibold text-paper">Problem keys</h2>
                    <p className="mt-1 text-sm text-paper-dim">
                      Characters you mistype most often, across every test, lesson and exam attempt.
                    </p>
                  </div>
                  <button
                    onClick={handleClearKeys}
                    className="text-sm text-paper-faint transition hover:text-brick"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {problemKeys.map((k) => (
                    <div
                      key={k.char}
                      className="flex flex-col items-center gap-1 rounded-lg border border-ink-line bg-ink-raised px-4 py-3"
                    >
                      <span className="font-mono text-xl text-ribbon">
                        {k.char === " " ? "␣" : k.char}
                      </span>
                      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-ink-line">
                        <div
                          className="h-full bg-brick"
                          style={{ width: `${(k.count / maxMistakeCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-paper-faint">{k.count}×</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 overflow-x-auto rounded-xl border border-ink-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-surface text-paper-faint">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Mode</th>
                    <th className="px-4 py-3 font-medium">WPM</th>
                    <th className="px-4 py-3 font-medium">Accuracy</th>
                    <th className="px-4 py-3 font-medium">Consistency</th>
                    <th className="px-4 py-3 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((r) => (
                    <tr key={r.id} className="border-t border-ink-line">
                      <td className="px-4 py-3 text-paper-dim">{new Date(r.date).toLocaleString()}</td>
                      <td className="px-4 py-3 text-paper">{r.mode} · {r.label}</td>
                      <td className="px-4 py-3 font-mono text-ribbon">{r.wpm}</td>
                      <td className="px-4 py-3 font-mono text-paper">{r.accuracy}%</td>
                      <td className="px-4 py-3 font-mono text-paper">{r.consistency}%</td>
                      <td className="px-4 py-3">
                        {r.passed === undefined ? (
                          <span className="text-paper-faint">—</span>
                        ) : r.passed ? (
                          <span className="text-sage">Pass</span>
                        ) : (
                          <span className="text-brick">Retry</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-ink-line bg-ink-surface p-5 text-center">
      <div className="font-mono text-3xl font-semibold text-ribbon">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-paper-faint">{label}</div>
    </div>
  );
}
