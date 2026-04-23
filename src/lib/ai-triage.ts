import { NeuralNetwork } from './neural-network';
import { ALL_QUESTIONS, computeTriage, type Triage } from './triage';

export const QUESTION_KEYS = Object.keys(ALL_QUESTIONS);
export const NUM_INPUTS = QUESTION_KEYS.length;

export const DISEASES = [
  "Malaria",
  "Dengue",
  "Typhoid",
  "Gastroenteritis / Cholera",
  "Respiratory Infection (Flu/COVID)",
  "Pregnancy Complications",
  "Trauma / Injury",
  "Minor Illness / Healthy"
];
export const NUM_OUTPUTS = DISEASES.length;

export function answersToInputs(answers: Record<string, string>): number[] {
  return QUESTION_KEYS.map(key => {
    const val = answers[key];
    if (!val) return 0;
    const q = ALL_QUESTIONS[key];
    const opt = q?.options.find(o => o.value === val);
    return opt ? opt.severity : 0;
  });
}

export function outputsToDisease(outputs: number[]): { prediction: string, confidence: number } {
  let maxIdx = 0;
  let maxVal = outputs[0];
  for (let i = 1; i < outputs.length; i++) {
    if (outputs[i] > maxVal) {
      maxVal = outputs[i];
      maxIdx = i;
    }
  }
  return { prediction: DISEASES[maxIdx], confidence: maxVal };
}

export function determineDiseaseTarget(inputs: number[]): number[] {
  // Input indices:
  // 0: fever_duration, 1: chills, 2: vomiting, 3: diarrhea_freq, 4: dehydration, 
  // 5: cough_type, 6: breathing_diff, 7: bleeding, 8: seizures, 9: headache, 10: rash
  const target = new Array(NUM_OUTPUTS).fill(0);
  
  const [fever, chills, vomiting, diarrhea, dehydration, cough, breathing, bleeding, seizures, headache, rash] = inputs;

  if (bleeding > 0.5 || (breathing > 0.5 && bleeding > 0)) {
    target[6] = 1; // Trauma
  } else if (seizures > 0.5 || (vomiting > 0.5 && bleeding > 0)) {
    target[5] = 1; // Pregnancy Complications
  } else if (cough > 0 || breathing > 0) {
    target[4] = 1; // Respiratory
  } else if (diarrhea > 0 || (vomiting > 0.5 && dehydration > 0)) {
    target[3] = 1; // Gastroenteritis
  } else if (fever > 0.5 && diarrhea > 0) {
    target[2] = 1; // Typhoid
  } else if (fever > 0 && rash > 0) {
    target[1] = 1; // Dengue
  } else if (fever > 0 && (chills > 0 || headache > 0)) {
    target[0] = 1; // Malaria
  } else if (inputs.some(v => v > 0)) {
    target[7] = 1; // Minor
  } else {
    target[7] = 1; // Healthy
  }
  
  return target;
}

export function generateTrainingData(): { input: number[], output: number[] }[] {
  const data: { input: number[], output: number[] }[] = [];
  const numSamples = 2000;
  const optionsPerQ = QUESTION_KEYS.map(key => ALL_QUESTIONS[key].options.map(o => o.severity));
  
  for (let i = 0; i < numSamples; i++) {
    const input: number[] = [];
    for (let j = 0; j < NUM_INPUTS; j++) {
      const opts = optionsPerQ[j];
      const randomSev = opts[Math.floor(Math.random() * opts.length)];
      input.push(randomSev);
    }
    data.push({ input, output: determineDiseaseTarget(input) });
  }
  
  return data;
}

export const aiModel = new NeuralNetwork(NUM_INPUTS, 8, NUM_OUTPUTS, 0.1);

export async function trainModel(onProgress?: (epoch: number, loss: number) => void) {
  const data = generateTrainingData();
  const epochs = 200;
  
  for (let i = 0; i < epochs; i++) {
    let totalLoss = 0;
    for (const item of data) {
      aiModel.train(item.input, item.output);
      if (i === epochs - 1) {
        const pred = aiModel.predict(item.input);
        const loss = item.output.reduce((acc, val, idx) => acc + Math.pow(val - pred[idx], 2), 0);
        totalLoss += loss;
      }
    }
    if (onProgress && (i % 20 === 0 || i === epochs - 1)) {
      onProgress(i, totalLoss / data.length);
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}
