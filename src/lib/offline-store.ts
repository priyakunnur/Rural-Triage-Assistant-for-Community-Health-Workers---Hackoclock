import { get, set } from 'idb-keyval';

const PENDING_KEY = 'triage_pending_sync';
const HISTORY_KEY = 'triage_history';

export interface PendingAssessment {
  id: string; // unique local ID
  timestamp: number;
  name: string;
  age: string;
  gender: string;
  place: string;
  language: string;
  triage: string;
  answers: Record<string, string>;
}

export async function saveAssessmentLocally(assessmentData: Omit<PendingAssessment, 'id' | 'timestamp'>): Promise<string> {
  const pending = await getPendingAssessments();
  const id = crypto.randomUUID();
  
  const newAssessment: PendingAssessment = {
    ...assessmentData,
    id,
    timestamp: Date.now(),
  };
  
  pending.push(newAssessment);
  await set(PENDING_KEY, pending);
  
  // Also save permanently to local history
  await addToHistory(newAssessment);
  
  return id;
}

export async function addToHistory(assessment: PendingAssessment): Promise<void> {
  const history = await getHistory();
  // Add to beginning of the array so newest is first
  history.unshift(assessment);
  await set(HISTORY_KEY, history);
}

export async function getHistory(): Promise<PendingAssessment[]> {
  const history = await get<PendingAssessment[]>(HISTORY_KEY);
  return history || [];
}

export async function getPendingAssessments(): Promise<PendingAssessment[]> {
  const pending = await get<PendingAssessment[]>(PENDING_KEY);
  return pending || [];
}

export async function removeSyncedAssessments(idsToRemove: string[]): Promise<void> {
  let pending = await getPendingAssessments();
  pending = pending.filter(p => !idsToRemove.includes(p.id));
  await set(PENDING_KEY, pending);
}
