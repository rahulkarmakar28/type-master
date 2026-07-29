"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Keyboard, Volume2, VolumeX } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const NAV = [
  { href: "/test", label: "Test" },
  { href: "/learn", label: "Learn" },
  { href: "/exam", label: "Govt Exam" },
  { href: "/progress", label: "Progress" },
];

export default function Header() {
  const pathname = usePathname();
  const { settings, update } = useSettings();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-2 text-paper">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ribbon text-ink">
          <Keyboard size={18} strokeWidth={2.5} />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">
          type<span className="text-ribbon">master</span>
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-1 rounded-full border border-ink-line bg-ink-surface/60 p-1 text-sm">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 transition ${
                  active ? "bg-ribbon text-ink font-medium" : "text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => update({ soundEnabled: !settings.soundEnabled })}
          title={settings.soundEnabled ? "Turn keystroke sound off" : "Turn keystroke sound on"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-line bg-ink-surface/60 text-paper-dim transition hover:text-paper"
        >
          {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </header>
  );
}
