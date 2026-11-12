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
  markLessonCompleted,
  markLessonIncomplete,
  subscribeToProgress,
  touchLesson,
} from '@/services/firestore/progressService';
import type { LearningProgress, LessonProgressRecord } from '@/types/progress';

export interface LearningActions {
  startLesson: (lessonId: string, phaseId: string) => Promise<void>;
  completeLesson: (lessonId: string, phaseId: string) => Promise<void>;
  reopenLesson: (lessonId: string) => Promise<void>;
  isPending: (lessonId: string) => boolean;
}

interface ProgressContextValue {
  progress: LearningProgress;
  actions: LearningActions;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);

const SAVE_ERROR = 'Progress belajar belum tersimpan. Periksa koneksi internet.';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const dialog = useDialog();
  const uid = user?.uid ?? null;

  const [records, setRecords] = useState<LessonProgressRecord[]>([]);
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recordsRef = useRef(records);
  recordsRef.current = records;
  const startingRef = useRef(new Set<string>());

  useEffect(() => {
    if (!uid) {
      setRecords([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToProgress(
      uid,
      (next) => {
        setRecords(next);
        setIsLoading(false);
      },
      () => {
        setError('Gagal memuat progress belajar. Periksa koneksi internet.');
        setIsLoading(false);
      },
    );
  }, [uid]);

  const progress = useMemo<LearningProgress>(() => {
    const completed = new Set<string>();
    const started = new Set<string>();
    let lastLessonId: string | null = null;
    let lastTime = -Infinity;

    for (const record of records) {
      if (record.status === 'completed') completed.add(record.lessonId);
      else started.add(record.lessonId);

      const time = record.updatedAt?.getTime() ?? Date.now();
      if (time > lastTime) {
        lastTime = time;
        lastLessonId = record.lessonId;
      }
    }

    return {
      completedLessonIds: completed,
      startedLessonIds: started,
      lastLessonId,
      isLoading,
      error,
    };
  }, [records, isLoading, error]);

  const progressRef = useRef(progress);
  progressRef.current = progress;

  const startLesson = useCallback(
    async (lessonId: string, phaseId: string) => {
      if (!uid || startingRef.current.has(lessonId)) return;

      const exists = recordsRef.current.some((record) => record.lessonId === lessonId);
      if (exists && progressRef.current.lastLessonId === lessonId) return;

      startingRef.current.add(lessonId);
      try {
        await touchLesson(uid, lessonId, phaseId, exists);
        setError(null);
      } catch {
        setError(SAVE_ERROR);
      } finally {
        startingRef.current.delete(lessonId);
      }
    },
    [uid],
  );

  const withPending = useCallback(
    async (lessonId: string, task: () => Promise<void>) => {
      setPendingIds((previous) => new Set(previous).add(lessonId));
      try {
        // Selesai hanya setelah Firestore mengonfirmasi penulisan.
        await task();
        setError(null);
      } catch {
        await dialog.alert({
          title: 'Progress gagal disimpan',
          message: 'Perubahan belum tersimpan. Periksa koneksi internet lalu coba lagi.',
          tone: 'danger',
        });
      } finally {
        setPendingIds((previous) => {
          const next = new Set(previous);
          next.delete(lessonId);
          return next;
        });
      }
    },
    [dialog],
  );

  const completeLesson = useCallback(
    async (lessonId: string, phaseId: string) => {
      if (!uid) return;
      const exists = recordsRef.current.some((record) => record.lessonId === lessonId);
      await withPending(lessonId, () => markLessonCompleted(uid, lessonId, phaseId, exists));
    },
    [uid, withPending],
  );

  const reopenLesson = useCallback(
    async (lessonId: string) => {
      if (!uid) return;
      await withPending(lessonId, () => markLessonIncomplete(uid, lessonId));
    },
    [uid, withPending],
  );

  const actions = useMemo<LearningActions>(
    () => ({
      startLesson,
      completeLesson,
      reopenLesson,
      isPending: (lessonId) => pendingIds.has(lessonId),
    }),
    [startLesson, completeLesson, reopenLesson, pendingIds],
  );

  const value = useMemo<ProgressContextValue>(() => ({ progress, actions }), [progress, actions]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}