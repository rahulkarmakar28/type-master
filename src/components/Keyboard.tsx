"use client";

const ROWS: string[][] = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "'"],
];

const HOME_KEYS = new Set(["f", "j"]);

export default function KeyboardView({ nextChar }: { nextChar?: string }) {
  const target = nextChar?.toLowerCase();
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-1.5 opacity-90">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5" style={{ marginLeft: ri * 10 }}>
          {row.map((key) => {
            const isTarget = target === key;
            const isHome = HOME_KEYS.has(key);
            return (
              <div
                key={key}
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-mono transition-all ${
                  isTarget
                    ? "border-ribbon bg-ribbon text-ink scale-110 shadow-[0_0_12px_rgba(242,166,90,0.5)]"
                    : isHome
                    ? "border-ink-line bg-ink-raised text-paper-dim after:content-[''] after:absolute after:mt-3 after:h-0.5 after:w-3 after:bg-paper-faint/40 relative"
                    : "border-ink-line bg-ink-raised text-paper-faint"
                }`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
      <div
        className={`mt-1 h-8 w-64 rounded-md border text-xs font-mono flex items-center justify-center transition-all ${
          target === " "
            ? "border-ribbon bg-ribbon text-ink scale-105 shadow-[0_0_12px_rgba(242,166,90,0.5)]"
            : "border-ink-line bg-ink-raised text-paper-faint"
        }`}
      >
        space
      </div>
    </div>
  );
}
