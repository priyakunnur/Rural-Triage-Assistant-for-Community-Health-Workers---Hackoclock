export type Triage = "home" | "clinic" | "emergency";

export interface Option {
  value: string;
  label: { en: string; kn: string };
  severity: number;
  keywords: string[];
  redFlag?: boolean;
}

export interface Question {
  id: string;
  text: { en: string; kn: string };
  options: Option[];
}

export interface DiseaseCategory {
  id: string;
  name: { en: string; kn: string };
  questions: string[];
}

export const ALL_QUESTIONS: Record<string, Question> = {
  fever_duration: {
    id: "fever_duration",
    text: { en: "Does the patient have a fever?", kn: "ರೋಗಿಗೆ ಜ್ವರ ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  chills: {
    id: "chills",
    text: { en: "Does the patient have chills or shivering?", kn: "ರೋಗಿಗೆ ಚಳಿ ಅಥವಾ ನಡುಕ ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  vomiting: {
    id: "vomiting",
    text: { en: "Is the patient vomiting?", kn: "ರೋಗಿಗೆ ವಾಂತಿ ಆಗುತ್ತಿದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  diarrhea_freq: {
    id: "diarrhea_freq",
    text: { en: "Does the patient have diarrhea?", kn: "ರೋಗಿಗೆ ಅತಿಸಾರ ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  dehydration: {
    id: "dehydration",
    text: { en: "Are there signs of dehydration?", kn: "ನಿರ್ಜಲೀಕರಣದ ಲಕ್ಷಣಗಳಿವೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  cough_type: {
    id: "cough_type",
    text: { en: "Does the patient have a cough?", kn: "ರೋಗಿಗೆ ಕೆಮ್ಮು ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  breathing_diff: {
    id: "breathing_diff",
    text: { en: "Is there difficulty in breathing?", kn: "ಉಸಿರಾಟದ ತೊಂದರೆ ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, redFlag: true, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  bleeding: {
    id: "bleeding",
    text: { en: "Is there any bleeding?", kn: "ರಕ್ತಸ್ರಾವ ಆಗುತ್ತಿದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, redFlag: true, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  seizures: {
    id: "seizures",
    text: { en: "Has the patient experienced seizures/fits?", kn: "ರೋಗಿಗೆ ಫಿಟ್ಸ್ ಅಥವಾ ಸೆಳೆತ ಬಂದಿದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, redFlag: true, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  headache: {
    id: "headache",
    text: { en: "Does the patient have a headache or body ache?", kn: "ತಲೆನೋವು ಅಥವಾ ಮೈಕೈ ನೋವು ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  },
  rash: {
    id: "rash",
    text: { en: "Are there red spots or skin rashes?", kn: "ಚರ್ಮದ ಮೇಲೆ ಕೆಂಪು ಕಲೆಗಳು ಅಥವಾ ರಾಶ್ ಇದೆಯೇ?" },
    options: [
      { value: "no", label: { en: "No", kn: "ಇಲ್ಲ" }, severity: 0, keywords: ["no", "none", "ಇಲ್ಲ"] },
      { value: "yes", label: { en: "Yes", kn: "ಹೌದು" }, severity: 1.0, keywords: ["yes", "ಹೌದು"] }
    ]
  }
};

export const QUESTION_LIST = Object.values(ALL_QUESTIONS);
export const START_ID = QUESTION_LIST[0].id;

export function nextQuestion(currentId: string): string | null {
  const index = QUESTION_LIST.findIndex(q => q.id === currentId);
  if (index >= 0 && index < QUESTION_LIST.length - 1) {
    return QUESTION_LIST[index + 1].id;
  }
  return null;
}

export function computeTriage(answers: Record<string, string>): Triage {
  let score = 0;
  for (const [id, value] of Object.entries(answers)) {
    const q = ALL_QUESTIONS[id];
    if (!q) continue;
    const opt = q.options.find(o => o.value === value);
    if (!opt) continue;
    
    if (opt.redFlag) return "emergency";
    score += opt.severity;
  }
  if (score >= 1.0) return "clinic";
  return "home";
}