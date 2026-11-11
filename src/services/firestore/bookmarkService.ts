import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';

import { db } from '@/services/firebase/config';

const bookmarkDocId = (resourceId: string) => `resource_${resourceId}`;

export function subscribeToResourceBookmarks(
  uid: string,
  onChange: (resourceIds: string[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, 'users', uid, 'bookmarks'),
    (snapshot) => {
      const ids: string[] = [];
      snapshot.forEach((item) => {
        const data = item.data();
        if (data.kind === 'resource' && typeof data.targetId === 'string') {
          ids.push(data.targetId);
        }
      });
      onChange(ids);
    },
    onError,
  );
}

export async function addResourceBookmark(uid: string, resourceId: string): Promise<void> {
  await setDoc(doc(db, 'users', uid, 'bookmarks', bookmarkDocId(resourceId)), {
    kind: 'resource',
    targetId: resourceId,
    createdAt: serverTimestamp(),
  });
}

export async function removeResourceBookmark(uid: string, resourceId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', bookmarkDocId(resourceId)));
}