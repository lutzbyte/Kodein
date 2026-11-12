import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '@/services/firebase/config';
import type { Difficulty } from '@/types/content';
import type { ExerciseResultRecord } from '@/types/progress';
import { DIFFICULTY_POINTS } from '@/utils/exercises';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export function subscribeToExerciseResults(
  uid: string,
  onChange: (records: ExerciseResultRecord[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'users', uid, 'exerciseResults'),
    (snapshot) => {
      const records: ExerciseResultRecord[] = [];
      snapshot.forEach((item) => {
        const data = item.data({ serverTimestamps: 'estimate' });
        const difficulty = data.difficulty as Difficulty;
        if (
          !DIFFICULTIES.includes(difficulty) ||
          typeof data.phaseId !== 'string' ||
          typeof data.attempts !== 'number' ||
          typeof data.solved !== 'boolean' ||
          typeof data.points !== 'number' ||
          typeof data.lastAnswer !== 'string' ||
          typeof data.lastCorrect !== 'boolean'
        ) {
          return;
        }
        records.push({
          exerciseId: item.id,
          phaseId: data.phaseId,
          difficulty,
          attempts: data.attempts,
          solved: data.solved,
          points: data.points,
          lastAnswer: data.lastAnswer,
          lastCorrect: data.lastCorrect,
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : null,
        });
      });
      onChange(records);
    },
    onError,
  );
}

export interface ExerciseAttemptInput {
  exerciseId: string;
  phaseId: string;
  difficulty: Difficulty;
  answerLabel: string;
  correct: boolean;
  previousAttempts: number;
  previouslySolved: boolean;
}

/** Menyimpan ringkasan soal dan satu entri riwayat dalam satu batch. */
export async function saveExerciseAttempt(uid: string, input: ExerciseAttemptInput): Promise<void> {
  const solved = input.previouslySolved || input.correct;
  const batch = writeBatch(db);

  batch.set(doc(db, 'users', uid, 'exerciseResults', input.exerciseId), {
    exerciseId: input.exerciseId,
    phaseId: input.phaseId,
    difficulty: input.difficulty,
    attempts: input.previousAttempts + 1,
    solved,
    points: solved ? DIFFICULTY_POINTS[input.difficulty] : 0,
    lastAnswer: input.answerLabel,
    lastCorrect: input.correct,
    updatedAt: serverTimestamp(),
  });

  batch.set(doc(collection(db, 'users', uid, 'history')), {
    type: 'exercise_submitted',
    exerciseId: input.exerciseId,
    phaseId: input.phaseId,
    correct: input.correct,
    createdAt: serverTimestamp(),
  });

  await batch.commit();
}