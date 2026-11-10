import type { LearningProgress } from '@/types/progress';

const EMPTY_PROGRESS: LearningProgress = {
  completedLessonIds: new Set<string>(),
  startedLessonIds: new Set<string>(),
  lastLessonId: null,
  isLoading: false,
};

/**
 * Satu-satunya sumber data progress untuk seluruh tampilan.
 * Saat ini belum ada progress tersimpan, sehingga hasilnya kosong.
 * Fase 5 mengganti isi hook ini dengan data dari Firestore.
 */
export function useProgress(): LearningProgress {
  return EMPTY_PROGRESS;
}