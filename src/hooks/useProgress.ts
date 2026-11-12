import { useContext } from 'react';

import { ProgressContext } from '@/store/ProgressContext';
import type { LearningProgress } from '@/types/progress';

/**
 * Satu-satunya sumber data progress untuk seluruh tampilan (data dari Firestore).
 */
export function useProgress(): LearningProgress {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress harus dipakai di dalam ProgressProvider.');
  }
  return context.progress;
}