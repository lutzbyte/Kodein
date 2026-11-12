import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '@/services/firebase/config';
import type { Project } from '@/types/content';
import type { ProjectProgressRecord } from '@/types/project';

export function subscribeToProjectProgress(
  uid: string,
  onChange: (records: ProjectProgressRecord[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'users', uid, 'projectProgress'),
    (snapshot) => {
      const records: ProjectProgressRecord[] = [];
      snapshot.forEach((item) => {
        const data = item.data({ serverTimestamps: 'estimate' });
        if (
          typeof data.phaseId !== 'string' ||
          typeof data.total !== 'number' ||
          !Array.isArray(data.completedItems)
        ) {
          return;
        }
        records.push({
          projectId: item.id,
          phaseId: data.phaseId,
          completedItems: data.completedItems.filter(
            (value): value is number => typeof value === 'number',
          ),
          total: data.total,
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : null,
        });
      });
      onChange(records);
    },
    onError,
  );
}

export async function saveProjectChecklist(
  uid: string,
  project: Project,
  completedItems: number[],
): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'projectProgress', project.id), {
    projectId: project.id,
    phaseId: project.phaseId,
    completedItems,
    total: project.checklist.length,
    updatedAt: serverTimestamp(),
  });
}