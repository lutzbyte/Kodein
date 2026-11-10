import type { Timestamp } from 'firebase/firestore';

export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'error';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface UserProfileDocument {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  level: number;
  createdAt: Timestamp | null;
}