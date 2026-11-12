import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '@/services/firebase/config';

export type BookmarkKind = 'resource' | 'lesson';

export interface BookmarkSnapshot {
  resourceIds: string[];
  lessonIds: string[];
}

export interface BookmarkEntry {
  kind: BookmarkKind;
  targetId: string;
}

const bookmarkDocId = (kind: BookmarkKind, targetId: string) => `${kind}_${targetId}`;

export function subscribeToBookmarks(
  uid: string,
  onChange: (bookmarks: BookmarkSnapshot) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'users', uid, 'bookmarks'),
    (snapshot) => {
      const result: BookmarkSnapshot = { resourceIds: [], lessonIds: [] };
      snapshot.forEach((item) => {
        const data = item.data();
        if (typeof data.targetId !== 'string') return;
        if (data.kind === 'resource') result.resourceIds.push(data.targetId);
        if (data.kind === 'lesson') result.lessonIds.push(data.targetId);
      });
      onChange(result);
    },
    onError,
  );
}

export async function addBookmark(uid: string, kind: BookmarkKind, targetId: string): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'bookmarks', bookmarkDocId(kind, targetId)), {
    kind,
    targetId,
    createdAt: serverTimestamp(),
  });
}

export async function removeBookmark(
  uid: string,
  kind: BookmarkKind,
  targetId: string,
): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', bookmarkDocId(kind, targetId)));
}

export async function removeAllBookmarks(uid: string, entries: BookmarkEntry[]): Promise<void> {
  for (let start = 0; start < entries.length; start += 400) {
    const batch = writeBatch(db);
    for (const entry of entries.slice(start, start + 400)) {
      batch.delete(doc(db, 'users', uid, 'bookmarks', bookmarkDocId(entry.kind, entry.targetId)));
    }
    await batch.commit();
  }
}