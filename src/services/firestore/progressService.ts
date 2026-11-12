import {
  Timestamp,
  collection,
  deleteField,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '@/services/firebase/config';
import type { LessonProgressRecord } from '@/types/progress';

const progressRef = (uid: string, lessonId: string) => doc(db, 'users', uid, 'progress', lessonId);
const newHistoryRef = (uid: string) => doc(collection(db, 'users', uid, 'history'));

export function subscribeToProgress(
  uid: string,
  onChange: (records: LessonProgressRecord[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'users', uid, 'progress'),
    (snapshot) => {
      const records: LessonProgressRecord[] = [];
      snapshot.forEach((item) => {
        const data = item.data({ serverTimestamps: 'estimate' });
        const status = data.status;
        if ((status !== 'in_progress' && status !== 'completed') || typeof data.phaseId !== 'string') {
          return;
        }
        records.push({
          lessonId: item.id,
          phaseId: data.phaseId,
          status,
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : null,
        });
      });
      onChange(records);
    },
    onError,
  );
}

/**
 * Dipanggil saat sebuah materi dibuka.
 * Materi baru dicatat sebagai "sedang dipelajari" beserta riwayatnya;
 * materi yang sudah ada hanya memperbarui penunjuk "terakhir dibuka".
 */
export async function touchLesson(
  uid: string,
  lessonId: string,
  phaseId: string,
  exists: boolean,
): Promise<void> {
  if (exists) {
    await updateDoc(progressRef(uid, lessonId), { updatedAt: serverTimestamp() });
    return;
  }

  const batch = writeBatch(db);
  batch.set(progressRef(uid, lessonId), {
    lessonId,
    phaseId,
    status: 'in_progress',
    startedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.set(newHistoryRef(uid), {
    type: 'lesson_started',
    lessonId,
    phaseId,
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export async function markLessonCompleted(
  uid: string,
  lessonId: string,
  phaseId: string,
  exists: boolean,
): Promise<void> {
  const base = {
    lessonId,
    phaseId,
    status: 'completed',
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const batch = writeBatch(db);
  batch.set(
    progressRef(uid, lessonId),
    exists ? base : { ...base, startedAt: serverTimestamp() },
    { merge: true },
  );
  batch.set(newHistoryRef(uid), {
    type: 'lesson_completed',
    lessonId,
    phaseId,
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export async function markLessonIncomplete(uid: string, lessonId: string): Promise<void> {
  await updateDoc(progressRef(uid, lessonId), {
    status: 'in_progress',
    completedAt: deleteField(),
    updatedAt: serverTimestamp(),
  });
}