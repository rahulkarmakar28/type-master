import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn to Type — Beginner to Advanced Typing Lessons",
  description:
    "A free, guided typing course: home row, top row and bottom row keys, numbers, capitalization, punctuation, symbols, and advanced exam-ready paragraphs. Learn touch typing from scratch.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn to Type — TypeMaster",
    description:
      "Free step-by-step typing lessons from your first home-row keystroke to advanced, exam-ready paragraphs.",
    url: "/learn",
  },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}