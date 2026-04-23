export type Triage = "home" | "clinic" | "emergency";

export type Question = {
  id: string;
  text: { en: string; kn: string };
  // voice keywords (lowercased) that indicate "yes"
  yesKeywords: string[];
  // if answered yes -> immediate emergency
  redFlag?: boolean;
  // next question id based on answer (if omitted, go to next in order)
  nextIfYes?: string | null;
  nextIfNo?: string | null;
  // contributes to clinic-level severity if yes
  clinicScore?: number;
};

export const QUESTIONS: Record<string, Question> = {
  // Order: normal/mild → moderate → critical (red flags)
  rash: {
    id: "rash",
    text: { en: "Skin rash, swelling, or mild wound?", kn: "ಚರ್ಮದ ರಾಶ್, ಊತ ಅಥವಾ ಸಣ್ಣ ಗಾಯ?" },
    yesKeywords: ["yes", "ಹೌದು", "haudu"],
    clinicScore: 1,
    nextIfYes: "diarrhea",
    nextIfNo: "diarrhea",
  },
  diarrhea: {
    id: "diarrhea",
    text: { en: "Diarrhea or stomach pain?", kn: "ಅತಿಸಾರ ಅಥವಾ ಹೊಟ್ಟೆ ನೋವು?" },
    yesKeywords: ["yes", "ಹೌದು"],
    clinicScore: 1,
    nextIfYes: "fever",
    nextIfNo: "fever",
  },
  fever: {
    id: "fever",
    text: { en: "Does the patient have fever?", kn: "ಜ್ವರ ಇದೆಯೇ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    nextIfYes: "fever_days",
    nextIfNo: "vomiting",
  },
  fever_days: {
    id: "fever_days",
    text: { en: "Has the fever lasted more than 3 days?", kn: "ಜ್ವರ 3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚಾಗಿದೆಯೇ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "vomiting",
  },
  vomiting: {
    id: "vomiting",
    text: { en: "Persistent vomiting or severe dehydration?", kn: "ನಿರಂತರ ವಾಂತಿ ಅಥವಾ ತೀವ್ರ ನಿರ್ಜಲೀಕರಣ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "jaundice",
  },
  jaundice: {
    id: "jaundice",
    text: { en: "Yellow eyes or skin (jaundice)?", kn: "ಕಣ್ಣು ಅಥವಾ ಚರ್ಮ ಹಳದಿಯಾಗಿದೆಯೇ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "pregnancy",
  },
  pregnancy: {
    id: "pregnancy",
    text: { en: "Pregnant with bleeding or severe pain?", kn: "ಗರ್ಭಿಣಿಯಲ್ಲಿ ರಕ್ತಸ್ರಾವ ಅಥವಾ ತೀವ್ರ ನೋವು?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "bleeding",
  },
  bleeding: {
    id: "bleeding",
    text: { en: "Severe bleeding or major injury?", kn: "ತೀವ್ರ ರಕ್ತಸ್ರಾವ ಅಥವಾ ಗಂಭೀರ ಗಾಯ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "seizure",
  },
  seizure: {
    id: "seizure",
    text: { en: "Seizures or convulsions?", kn: "ಫಿಟ್ಸ್ ಅಥವಾ ಸೆಳೆತ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "unconscious",
  },
  unconscious: {
    id: "unconscious",
    text: { en: "Is the patient unconscious or very drowsy?", kn: "ರೋಗಿ ಪ್ರಜ್ಞಾಹೀನರೇ ಅಥವಾ ತುಂಬಾ ಜಡವಾಗಿದ್ದಾರೆಯೇ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "breathing",
  },
  breathing: {
    id: "breathing",
    text: { en: "Difficulty breathing?", kn: "ಉಸಿರಾಟದ ತೊಂದರೆ ಇದೆಯೇ?" },
    yesKeywords: ["yes", "ಹೌದು"],
    redFlag: true,
    nextIfNo: "chest_pain",
  },
  chest_pain: {
    id: "chest_pain",
    text: { en: "Does the patient have chest pain?", kn: "ರೋಗಿಗೆ ಎದೆ ನೋವು ಇದೆಯೇ?" },
    yesKeywords: ["yes", "ಹೌದು", "ಹೌದ್", "haudu"],
    redFlag: true,
    nextIfNo: null,
    nextIfYes: null,
  },
};

export const START_ID = "rash";

export type Answer = "yes" | "no";

export function nextQuestion(currentId: string, answer: Answer): string | null {
  const q = QUESTIONS[currentId];
  if (!q) return null;
  if (answer === "yes") {
    if (q.nextIfYes !== undefined) return q.nextIfYes;
  } else {
    if (q.nextIfNo !== undefined) return q.nextIfNo;
  }
  return null;
}

export function computeTriage(answers: Record<string, Answer>): Triage {
  let score = 0;
  for (const [id, ans] of Object.entries(answers)) {
    if (ans !== "yes") continue;
    const q = QUESTIONS[id];
    if (!q) continue;
    if (q.redFlag) return "emergency";
    if (q.clinicScore) score += q.clinicScore;
  }
  if (score >= 1) return "clinic";
  return "home";
}