import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Speed Test — Time, Words, Quote & Custom Modes",
  description:
    "Take a free typing speed test right now. Choose Time (15/30/60/120s), Words, Quote, or paste your own custom text. Live WPM, accuracy, raw WPM and consistency — no sign-up required.",
  alternates: { canonical: "/test" },
  openGraph: {
    title: "Typing Speed Test — TypeMaster",
    description:
      "Free Monkeytype-style typing test: Time, Words, Quote and Custom modes with live WPM and accuracy tracking.",
    url: "/test",
  },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return children;
}