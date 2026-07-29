import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Typing Progress",
  description: "Your local typing test history, saved on this device.",
  robots: { index: false, follow: true },
};

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}