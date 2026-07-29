"use client";

import { useEffect, useRef } from "react";
import { CharStatus } from "@/types";

interface TypingAreaProps {
  text: string;
  typed: string;
  charStatuses: CharStatus[];
  onChange: (value: string) => void;
  disabled?: boolean;
  height?: number;
  fontSizeClass?: string;
  /**
   * When true, the whole text is shown with no fixed height / scrolling —
   * use this for finite texts (words, quote, custom, lesson drills, exam
   * passages) so the full paragraph is always visible.
   * When false, a fixed-height scrolling window is used instead — use this
   * only for the infinite "time" mode word stream, which can't be shown
   * in full because it keeps growing.
   */
  fullText?: boolean;
  /** Called when the user presses Tab, so pages can wire up a quick "restart" shortcut. */
  onRestartShortcut?: () => void;
  /** Called on every new character typed (not on backspace), with whether it matched. Used for sound feedback. */
  onKeystroke?: (correct: boolean) => void;
}

export default function TypingArea({
  text,
  typed,
  charStatuses,
  onChange,
  disabled,
  height = 168,
  fontSizeClass = "text-2xl md:text-3xl",
  fullText = false,
  onRestartShortcut,
  onKeystroke,
}: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  useEffect(() => {
    if (fullText) return; // no scrolling window to manage when the full text is shown
    currentCharRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [typed.length, fullText]);

  const focusInput = () => inputRef.current?.focus();

  const colorFor = (status: CharStatus) => {
    switch (status) {
      case "correct":
        return "text-paper";
      case "incorrect":
        return "text-brick bg-brick/10 rounded-[2px]";
      case "current":
        return "text-ink bg-ribbon rounded-[2px]";
      default:
        return "text-paper-faint";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && onRestartShortcut) {
      e.preventDefault();
      onRestartShortcut();
    }
  };

  return (
    <div
      onClick={focusInput}
      className="relative w-full cursor-text select-none"
      role="textbox"
      aria-label="Typing area"
    >
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => {
          const value = e.target.value;
          if (onKeystroke && value.length > typed.length) {
            const newChar = value[value.length - 1];
            onKeystroke(newChar === text[value.length - 1]);
          }
          onChange(value);
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="absolute h-0 w-0 opacity-0"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-hidden
      />
      <div
        style={fullText ? undefined : { height, overflow: "hidden" }}
        className={`whitespace-pre-wrap break-words leading-[1.9] tracking-wide font-mono ${fontSizeClass} px-1`}
      >
        {text.split("").map((ch, i) => {
          const isCurrent = charStatuses[i] === "current";
          return (
            <span
              key={i}
              ref={isCurrent ? currentCharRef : undefined}
              className={colorFor(charStatuses[i])}
            >
              {ch === " " && charStatuses[i] === "incorrect" ? "\u00B7" : ch}
            </span>
          );
        })}
      </div>
      {!disabled && typed.length === 0 && (
        <div className="mt-3 text-center text-sm text-paper-faint">
          Click here and start typing to begin{onRestartShortcut ? " · Tab to restart" : ""}
        </div>
      )}
    </div>
  );
}
