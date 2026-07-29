export interface Quote {
  id: string;
  text: string;
  source: string;
}

export const QUOTES: Quote[] = [
  {
    id: "q1",
    text: "Discipline is choosing between what you want now and what you want most, one keystroke at a time.",
    source: "TypeMaster",
  },
  {
    id: "q2",
    text: "A steady pair of hands on the keyboard is worth more than a burst of speed followed by a wall of mistakes.",
    source: "TypeMaster",
  },
  {
    id: "q3",
    text: "Every expert typist was once a beginner who refused to look away from the screen and down at the keys.",
    source: "TypeMaster",
  },
  {
    id: "q4",
    text: "Practice does not make perfect, only correct and repeated practice carves the habit into your fingers.",
    source: "TypeMaster",
  },
  {
    id: "q5",
    text: "The fastest route to accuracy is slowing down just enough to stop guessing where the next letter lives.",
    source: "TypeMaster",
  },
  {
    id: "q6",
    text: "Government exams reward calm hands, clean sentences, and a mind that has already rehearsed this exact pressure.",
    source: "TypeMaster",
  },
  {
    id: "q7",
    text: "Speed without accuracy is just fast nonsense, and accuracy without speed rarely clears a real exam cutoff.",
    source: "TypeMaster",
  },
  {
    id: "q8",
    text: "Good typing looks boring from the outside, quiet keys, steady rhythm, no wasted motion, no wasted seconds.",
    source: "TypeMaster",
  },
];

export function randomQuote(): Quote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
