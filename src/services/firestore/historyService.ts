import {
  Timestamp,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '@/services/firebase/config';
import type { HistoryEntry } from '@/types/progress';

export function subscribeToHistory(
  uid: string,
  limitCount: number,
  onChange: (entries: HistoryEntry[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const recent = query(
    collection(db, 'users', uid, 'history'),
    orderBy('createdAt', 'desc'),
    limit(limitCount),
  );

  return onSnapshot(
    recent,
    (snapshot) => {
      const entries: HistoryEntry[] = [];
      snapshot.forEach((item) => {
        const data = item.data({ serverTimestamps: 'estimate' });
        if (typeof data.phaseId !== 'string' || !(data.createdAt instanceof Timestamp)) return;
        const createdAt = data.createdAt.toDate();

        if (
          (data.type === 'lesson_started' || data.type === 'lesson_completed') &&
          typeof data.lessonId === 'string'
        ) {
          entries.push({
            id: item.id,
            type: data.type,
            lessonId: data.lessonId,
            phaseId: data.phaseId,
            createdAt,
          });
        } else if (
          data.type === 'exercise_submitted' &&
          typeof data.exerciseId === 'string' &&
          typeof data.correct === 'boolean'
        ) {
          entries.push({
            id: item.id,
            type: 'exercise_submitted',
            exerciseId: data.exerciseId,
            phaseId: data.phaseId,
            correct: data.correct,
            createdAt,
          });
        }
      });
      onChange(entries);
    },
    onError,
  );
}