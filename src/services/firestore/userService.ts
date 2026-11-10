import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '@/services/firebase/config';
import type { AuthUser } from '@/types/auth';

/**
 * Memastikan dokumen users/{uid} ada.
 * Fungsi selesai hanya setelah Firestore mengonfirmasi (read/write berhasil).
 */
export async function ensureUserProfile(user: AuthUser): Promise<'created' | 'existing'> {
  const ref = doc(db, 'users', user.uid);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return 'existing';
  }

  await setDoc(ref, {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    level: 1,
    createdAt: serverTimestamp(),
  });

  return 'created';
}