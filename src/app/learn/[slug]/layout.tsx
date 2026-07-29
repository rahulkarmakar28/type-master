import type { Metadata } from "next";
import { LESSONS, getLesson } from "@/lib/lessons";
import { SITE_NAME } from "@/lib/seo";


export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const lesson = getLesson(params.slug);
  if (!lesson) {
    return { title: "Lesson not found" };
  }
  const levelLabel = lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1);
  const title = `${lesson.title} — ${levelLabel} Typing Lesson`;

  return {
    title,
    description: lesson.description,
    alternates: { canonical: `/learn/${lesson.slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: lesson.description,
      url: `/learn/${lesson.slug}`,
    },
  };
}

export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const lesson = getLesson(params.slug);
  if (!lesson) return children;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: lesson.description,
    educationalLevel: lesson.level,
    learningResourceType: "Typing lesson",
    isPartOf: {
      "@type": "Course",
      name: `${SITE_NAME} — Learn to Type`,
      description: "A free, guided typing course from beginner to advanced.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}