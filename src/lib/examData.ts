import { ExamBenchmark, ExamPassage } from "@/types";


export const EXAM_BENCHMARKS: ExamBenchmark[] = [
  {
    id: "ssc-chsl-eng",
    exam: "SSC CHSL (LDC/JSA)",
    language: "English",
    minWpm: 35,
    durationMinutes: 10,
    errorTolerancePct: 5,
    note: "35 wpm in English, 10-minute typing test on computer.",
  },
  {
    id: "ssc-chsl-hin",
    exam: "SSC CHSL (LDC/JSA)",
    language: "Hindi",
    minWpm: 30,
    durationMinutes: 10,
    errorTolerancePct: 5,
    note: "30 wpm in Hindi, 10-minute typing test on computer.",
  },
  {
    id: "ssc-steno-c",
    exam: "SSC Stenographer (Grade C)",
    language: "English",
    minWpm: 40,
    durationMinutes: 10,
    errorTolerancePct: 5,
    note: "Dictation transcribed at approx. 40 wpm equivalent.",
  },
  {
    id: "rrb-ntpc",
    exam: "RRB NTPC (Typing Skill Test)",
    language: "English",
    minWpm: 30,
    durationMinutes: 10,
    errorTolerancePct: 5,
    note: "30 wpm English or 25 wpm Hindi, computer-based test.",
  },
  {
    id: "delhi-police",
    exam: "Delhi Police (MTS/Constable clerical)",
    language: "English",
    minWpm: 35,
    durationMinutes: 10,
    errorTolerancePct: 5,
    note: "35 wpm English / 30 wpm Hindi typical requirement.",
  },
  {
    id: "court-typist",
    exam: "District Court Typist / Copyist",
    language: "English",
    minWpm: 40,
    durationMinutes: 10,
    errorTolerancePct: 5,
    note: "State-specific; many courts ask for 40+ wpm on computer.",
  },
];

export const EXAM_PASSAGES: ExamPassage[] = [
  {
    id: "p1",
    title: "Recruitment notice",
    text: "The Staff Selection Commission has announced a fresh recruitment drive for various clerical and data entry posts across central government departments. Interested candidates who meet the eligibility criteria are advised to apply online before the last date mentioned in the official notification. The selection process will include a written examination followed by a skill test in typing, and only those who qualify both stages will be called for document verification. Candidates are strongly encouraged to read the detailed advertisement carefully before submitting their application form, since incomplete or incorrect applications are liable to be rejected without any further notice or correspondence from the commission.",
  },
  {
    id: "p2",
    title: "Office memorandum",
    text: "This is to inform all concerned staff members that the office will remain closed on account of a public holiday declared by the state government. All pending files and applications must be submitted through the online portal before the closing hour on the previous working day. Employees handling public grievances are requested to update their status reports and ensure that no application remains unattended for more than seven working days. Any deviation from this instruction will be viewed seriously and may attract disciplinary action as per the conduct rules applicable to government servants.",
  },
  {
    id: "p3",
    title: "Examination guidelines",
    text: "Candidates appearing for the computer based examination must reach the venue at least ninety minutes before the reporting time mentioned on the admit card. Entry will not be permitted after the gate closing time under any circumstances, regardless of the reason for delay. Every candidate is required to carry a printed admit card along with one original photo identity proof such as an Aadhaar card, voter identity card, driving license, or passport. Electronic devices including mobile phones, smart watches, and calculators are strictly prohibited inside the examination hall and must be deposited at the designated counter.",
  },
  {
    id: "p4",
    title: "Public awareness circular",
    text: "Citizens are hereby informed that the last date for linking their identity documents with the welfare scheme database has been extended by thirty days due to overwhelming demand at service centres nationwide. Applicants who have already submitted their forms need not apply again, and their status can be checked online using the reference number provided at the time of submission. Those facing technical difficulties may visit the nearest common service centre or contact the toll free helpline number available on the department website between nine in the morning and six in the evening on all working days.",
  },
  {
    id: "p5",
    title: "Annual report excerpt",
    text: "During the financial year under review, the department processed a significantly higher number of applications compared to the previous year, reflecting growing public awareness of the scheme and improved outreach efforts undertaken by field officers. Digital infrastructure upgrades at regional offices reduced average processing time by nearly forty percent, while grievance redressal turnaround improved from twenty one days to twelve days on average. The department remains committed to further simplifying procedures and expanding digital access points in rural and semi urban areas over the coming year.",
  },
];

export function randomPassage(): ExamPassage {
  return EXAM_PASSAGES[Math.floor(Math.random() * EXAM_PASSAGES.length)];
}
