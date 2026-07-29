"use client";

interface Option<T extends string | number> {
  value: T;
  label: string;
}

interface PillGroupProps<T extends string | number> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function PillGroup<T extends string | number>({ options, value, onChange }: PillGroupProps<T>) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-ink-line bg-ink-surface p-1 text-sm">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3.5 py-1.5 transition ${
            value === opt.value
              ? "bg-ribbon text-ink font-medium"
              : "text-paper-dim hover:text-paper"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
