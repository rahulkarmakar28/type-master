import { Lesson } from "@/types";

export const LESSONS: Lesson[] = [
  // ---------- BEGINNER: home row ----------
  {
    slug: "home-row-fj",
    level: "beginner",
    order: 1,
    title: "Home row anchors: F and J",
    description: "Find the bumps on F and J with your index fingers. Every other key is reached from here.",
    newKeys: ["f", "j"],
    drills: ["fff jjj fff jjj", "fj fj fj fj fj", "jf jf jf jf jf", "fjf jfj fjf jfj", "fff jjj fjf jfj fff"],
  },
  {
    slug: "home-row-du-k",
    level: "beginner",
    order: 2,
    title: "Home row: D, K",
    description: "Add the middle fingers. Keep F and J anchored while reaching one key over.",
    newKeys: ["d", "k"],
    drills: ["ddd kkk ddd kkk", "dk dk dk dk", "dkd kdk dkd kdk", "fdk jkd fdk jkd", "dad fad jak dad"],
  },
  {
    slug: "home-row-s-l",
    level: "beginner",
    order: 3,
    title: "Home row: S, L",
    description: "Ring fingers reach S and L. Try to keep unused fingers resting lightly on the home row.",
    newKeys: ["s", "l"],
    drills: ["sss lll sss lll", "sl sl sl sl", "sls lsl sls lsl", "salad flask salsa", "lads fads dads"],
  },
  {
    slug: "home-row-a-semicolon",
    level: "beginner",
    order: 4,
    title: "Home row: A, ;",
    description: "Pinky fingers cover A and the semicolon. The full home row is now unlocked.",
    newKeys: ["a", ";"],
    drills: ["aaa ;;; aaa ;;;", "a; a; a; a;", "all ask sad lad", "flask salad glass", "a sad lad falls"],
  },
  {
    slug: "home-row-review",
    level: "beginner",
    order: 5,
    title: "Home row review",
    description: "Combine every home row key into flowing words before moving up to new rows.",
    newKeys: [],
    drills: [
      "a lad had a flask",
      "all salads fall; ask a lass",
      "dads and lads add glass flasks",
      "a jak salad; a sad lass falls",
      "flask salad glass a lad falls dad asks",
    ],
  },

  // ---------- BEGINNER: top row ----------
  {
    slug: "top-row-ru-i",
    level: "beginner",
    order: 6,
    title: "Top row: R, U, I",
    description: "Reach up from the home row without looking down. R and U share the index fingers.",
    newKeys: ["r", "u", "i"],
    drills: ["rrr uuu iii", "rui rui rui", "sir fir stir", "rid quit ruin", "a rid sir quits"],
  },
  {
    slug: "top-row-et-o",
    level: "beginner",
    order: 7,
    title: "Top row: E, T, O",
    description: "Three of the most common English letters live here. Expect real words very soon.",
    newKeys: ["e", "t", "o"],
    drills: ["eee ttt ooo", "toe tie rot", "tote store trot", "site foot rote", "totes are sort of tired"],
  },
  {
    slug: "top-row-wq-yp",
    level: "beginner",
    order: 8,
    title: "Top row: W, Q, Y, P",
    description: "Finish the top row. Pinkies stretch a little further for Q and P.",
    newKeys: ["w", "q", "y", "p"],
    drills: ["www qqq yyy ppp", "quiet worry type", "pretty quiet story", "your quiet type wrote poetry", "wet putty tore quietly"],
  },

  // ---------- BEGINNER: bottom row ----------
  {
    slug: "bottom-row-vm-n",
    level: "beginner",
    order: 9,
    title: "Bottom row: V, M, N",
    description: "Drop down from the home row. Keep the motion short and controlled.",
    newKeys: ["v", "m", "n"],
    drills: ["vvv mmm nnn", "van men run", "mine oven norm", "vine moon renown", "seven women mind their vans"],
  },
  {
    slug: "bottom-row-cx-b",
    level: "beginner",
    order: 10,
    title: "Bottom row: C, X, B",
    description: "Add C, X and B. The full bottom row is nearly complete.",
    newKeys: ["c", "x", "b"],
    drills: ["ccc xxx bbb", "cab box fix", "black excel bench", "exact cab club", "black boxes excel by exact numbers"],
  },
  {
    slug: "bottom-row-zg-h",
    level: "beginner",
    order: 11,
    title: "Bottom row: Z, G, H",
    description: "Finish every letter key. From here on, every English word is reachable.",
    newKeys: ["z", "g", "h"],
    drills: ["zzz ggg hhh", "high gaze hush", "gather hazy zeal", "eighth gazing hazard", "he gazes at eight hazy hills"],
  },

  // ---------- INTERMEDIATE: numbers, capitals, punctuation ----------
  {
    slug: "numbers-row",
    level: "intermediate",
    order: 12,
    title: "Number row basics",
    description: "Reach up two rows for digits. Government exam passages often include dates and figures.",
    newKeys: ["1", "2", "3", "4", "5"],
    drills: ["123 234 345 451", "in 2024 we had 15 forms", "section 3 has 45 questions", "page 12 of 34, item 5", "125 candidates scored 340 marks"],
  },
  {
    slug: "numbers-row-2",
    level: "intermediate",
    order: 13,
    title: "Number row: 6-0",
    description: "Complete the digit row. Practice mixed multi-digit figures at speed.",
    newKeys: ["6", "7", "8", "9", "0"],
    drills: ["678 890 067 789", "the exam is on 07/08/2026", "2026 candidates, 690 seats", "score: 78, rank: 906", "9080 forms were submitted in 2026"],
  },
  {
    slug: "capitalization",
    level: "intermediate",
    order: 14,
    title: "Capital letters & Shift",
    description: "Use the opposite-hand Shift key so your typing rhythm never breaks.",
    newKeys: ["Shift"],
    drills: [
      "The Quick Brown Fox Jumps",
      "New Delhi is the Capital of India",
      "Please Submit the Application Before Friday",
      "The Staff Selection Commission Released the Notice",
      "Every Candidate Must Carry a Valid Photo ID",
    ],
  },
  {
    slug: "punctuation-basic",
    level: "intermediate",
    order: 15,
    title: "Common punctuation",
    description: "Commas, periods and apostrophes appear in almost every real sentence.",
    newKeys: [",", ".", "'"],
    drills: [
      "First, read the instructions. Then, begin.",
      "It's important to check your work, isn't it?",
      "The form has three parts: name, address, and date.",
      "Don't rush; accuracy matters more than speed.",
      "Section A, B, and C are compulsory. Section D is optional.",
    ],
  },
  {
    slug: "punctuation-advanced",
    level: "intermediate",
    order: 16,
    title: "Punctuation: quotes, colons, parentheses",
    description: "Government forms and formal writing lean heavily on these marks.",
    newKeys: ["\"", ":", "(", ")"],
    drills: [
      'The notice said: "Report by 9:00 AM sharp."',
      "Bring the following documents: ID, admit card, and photos.",
      "The result (declared on 12 July) surprised many candidates.",
      'She asked, "Is the exam postponed?"',
      "Read the notification (available online) before applying.",
    ],
  },
  {
    slug: "symbols-common",
    level: "intermediate",
    order: 17,
    title: "Symbols: @ # % & /",
    description: "Emails, percentages and dates use these often-avoided keys.",
    newKeys: ["@", "#", "%", "&", "/"],
    drills: [
      "Email your query to help@examboard.gov",
      "Cutoff is 65% for General and 55% for OBC & SC/ST",
      "Reference #4521 was updated on 12/07/2026",
      "Fees & charges apply after the last date",
      "Check the FAQ page (#12) for exam/admit-card queries",
    ],
  },

  // ---------- ADVANCED: speed, paragraphs, exam style ----------
  {
    slug: "advanced-common-bigrams",
    level: "advanced",
    order: 18,
    title: "Fast bigrams & common patterns",
    description: "Train the letter pairs that appear constantly in English so your fingers stop hesitating.",
    newKeys: [],
    drills: [
      "the that this then there their those thought",
      "and hand land sand band grand stand brand",
      "ing being doing going running typing writing",
      "tion action nation station motion mention",
      "er other under water letter matter better",
    ],
  },
  {
    slug: "advanced-paragraph-1",
    level: "advanced",
    order: 19,
    title: "Paragraph fluency I",
    description: "Type full sentences without pausing between words. Focus on rhythm, not raw speed.",
    newKeys: [],
    drills: [
      "The recruitment notice was published on the official website last week, and thousands of candidates have already registered for the upcoming examination.",
      "Applicants are advised to keep a printed copy of their admit card along with a valid government-issued photo identity proof on the day of the test.",
      "Typing speed is evaluated over a fixed duration, and both accuracy and consistency play an important role in the final qualifying score.",
    ],
  },
  {
    slug: "advanced-paragraph-2",
    level: "advanced",
    order: 20,
    title: "Paragraph fluency II",
    description: "Longer passages with mixed punctuation, numbers, and capitals, closer to real exam text.",
    newKeys: [],
    drills: [
      "According to the revised schedule released on 15 July 2026, the written examination will be conducted in two shifts: 10:00 AM to 12:00 PM and 2:00 PM to 4:00 PM.",
      "Candidates belonging to the reserved category must upload their certificates (caste, income, and disability, if applicable) before the portal closes on the last date.",
      "The commission clarified that there will be no negative marking in the typing test, but a minimum accuracy of 95% is required to qualify for the next stage.",
    ],
  },
  {
    slug: "advanced-exam-simulation",
    level: "advanced",
    order: 21,
    title: "Exam-style endurance drill",
    description: "A dense, five-minute-style passage to build the stamina real government typing tests demand.",
    newKeys: [],
    drills: [
      "Government typing examinations, such as those conducted for data entry operators, junior assistants, and stenographers, require candidates to reproduce a given passage within a strict time limit while maintaining a high level of accuracy. Unlike casual typing practice, these tests simulate real office conditions where a single missed comma or misspelled word can affect the final score. Candidates are therefore encouraged to practice regularly on passages that mix formal vocabulary, numerals, dates, and punctuation, since these elements appear consistently across most recruitment examinations conducted at the state and central level.",
    ],
  },
];

export function lessonsByLevel() {
  const beginner = LESSONS.filter((l) => l.level === "beginner").sort((a, b) => a.order - b.order);
  const intermediate = LESSONS.filter((l) => l.level === "intermediate").sort((a, b) => a.order - b.order);
  const advanced = LESSONS.filter((l) => l.level === "advanced").sort((a, b) => a.order - b.order);
  return { beginner, intermediate, advanced };
}

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function nextLesson(slug: string): Lesson | undefined {
  const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((l) => l.slug === slug);
  if (idx === -1 || idx === sorted.length - 1) return undefined;
  return sorted[idx + 1];
}
