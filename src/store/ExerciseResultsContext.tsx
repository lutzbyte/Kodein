import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import {
  saveExerciseAttempt,
  subscribeToExerciseResults,
} from '@/services/firestore/exerciseService';
import type { Exercise } from '@/types/content';
import type { ExerciseResultRecord } from '@/types/progress';
import {
  DIFFICULTY_POINTS,
  describeAnswer,
  isAnswerCorrect,
  type ExerciseAnswer,
} from '@/utils/exercises';

export interface SubmitOutcome {
  correct: boolean;
  attempts: number;
  pointsAwarded: number;
}

export interface ExerciseResultsValue {
  results: ReadonlyMap<string, ExerciseResultRecord>;
  isLoading: boolean;
  error: string | null;
  /** Mengevaluasi jawaban lalu menyimpannya. Mengembalikan null jika penyimpanan gagal. */
  submit: (exercise: Exercise, answer: ExerciseAnswer) => Promise<SubmitOutcome | null>;
}

export const ExerciseResultsContext = createContext<ExerciseResultsValue | null>(null);

export function ExerciseResultsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const dialog = useDialog();
  const uid = user?.uid ?? null;

  const [results, setResults] = useState<ReadonlyMap<string, ExerciseResultRecord>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latest = useRef(results);
  latest.current = results;

  useEffect(() => {
    if (!uid) {
      setResults(new Map());
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToExerciseResults(
      uid,
      (records) => {
        setResults(new Map(records.map((record) => [record.exerciseId, record])));
        setIsLoading(false);
      },
      () => {
        setError('Gagal memuat hasil latihan. Periksa koneksi internet.');
        setIsLoading(false);
      },
    );
  }, [uid]);

  const submit = useCallback(
    async (exercise: Exercise, answer: ExerciseAnswer): Promise<SubmitOutcome | null> => {
      if (!uid) return null;

      const correct = isAnswerCorrect(exercise, answer);
      const previous = latest.current.get(exercise.id);
      const previousAttempts = previous?.attempts ?? 0;
      const previouslySolved = previous?.solved ?? false;

      try {
        // Selesai hanya setelah Firestore mengonfirmasi penulisan.
        await saveExerciseAttempt(uid, {
          exerciseId: exercise.id,
          phaseId: exercise.phaseId,
          difficulty: exercise.difficulty,
          answerLabel: describeAnswer(exercise, answer),
          correct,
          previousAttempts,
          previouslySolved,
        });
      } catch {
        await dialog.alert({
          title: 'Jawaban gagal disimpan',
          message: 'Hasil latihan belum tersimpan. Periksa koneksi internet lalu coba lagi.',
          tone: 'danger',
        });
        return null;
      }

      return {
        correct,
        attempts: previousAttempts + 1,
        pointsAwarded: correct && !previouslySolved ? DIFFICULTY_POINTS[exercise.difficulty] : 0,
      };
    },
    [uid, dialog],
  );

  const value = useMemo<ExerciseResultsValue>(
    () => ({ results, isLoading, error, submit }),
    [results, isLoading, error, submit],
  );

  return <ExerciseResultsContext.Provider value={value}>{children}</ExerciseResultsContext.Provider>;
}