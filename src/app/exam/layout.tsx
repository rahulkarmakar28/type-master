import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Exam Typing Test — SSC CHSL, RRB NTPC & More",
  description:
    "Practice the exact typing speed benchmarks used in Indian government recruitment exams: SSC CHSL, SSC Stenographer, RRB NTPC, Delhi Police and court typist tests. Free timed passages with pass/fail scoring.",
  alternates: { canonical: "/exam" },
  openGraph: {
    title: "Government Exam Typing Test — TypeMaster",
    description:
      "Free practice for SSC CHSL, RRB NTPC and other government typing tests, with real speed and accuracy benchmarks.",
    url: "/exam",
  },
};

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return children;
}