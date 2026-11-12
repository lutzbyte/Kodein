import type { HistoryEntry } from '@/types/progress';

export function getHistoryHref(entry: HistoryEntry): string {
  return entry.type === 'exercise_submitted'
    ? `/exercise/${entry.exerciseId}`
    : `/lesson/${entry.lessonId}`;
}