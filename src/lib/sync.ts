import { getPendingAssessments, removeSyncedAssessments } from './offline-store';
import { supabase } from '@/integrations/supabase/client';

export async function syncPendingAssessments(): Promise<{ synced: number, failed: number }> {
  // Only attempt sync if browser reports it is online
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { synced: 0, failed: 0 };
  }

  const pending = await getPendingAssessments();
  if (pending.length === 0) {
    return { synced: 0, failed: 0 };
  }

  const syncedIds: string[] = [];
  let failed = 0;

  for (const assessment of pending) {
    try {
      // Omit local-only metadata when syncing to cloud
      const { id, timestamp, ...cloudData } = assessment;

      const { error } = await supabase
        .from('patient_assessments')
        .insert(cloudData);

      if (error) {
        console.error("Failed to sync assessment", assessment.id, error);
        failed++;
      } else {
        syncedIds.push(assessment.id);
      }
    } catch (err) {
      console.error("Sync exception for", assessment.id, err);
      failed++;
    }
  }

  // Remove the successfully synced items from local DB
  if (syncedIds.length > 0) {
    await removeSyncedAssessments(syncedIds);
  }

  return { synced: syncedIds.length, failed };
}
