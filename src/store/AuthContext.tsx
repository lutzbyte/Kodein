import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { AuthError, toAuthError } from '@/services/auth/authErrors';
import { configureGoogleSignIn, signInWithGoogle, signOutUser } from '@/services/auth/googleAuth';
import { auth } from '@/services/firebase/config';
import { ensureUserProfile } from '@/services/firestore/userService';
import type { AuthStatus, AuthUser } from '@/types/auth';

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Selama proses sign-in, perubahan dari listener diabaikan agar pengguna
  // tidak masuk ke Beranda sebelum dokumen Firestore siap.
  const signingInRef = useRef(false);

  useEffect(() => {
    configureGoogleSignIn();

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (signingInRef.current) return;

        if (firebaseUser) {
          setUser(toAuthUser(firebaseUser));
          setStatus('authenticated');
        } else {
          setUser(null);
          setStatus((previous) => (previous === 'error' ? previous : 'unauthenticated'));
        }
      },
      (listenerError) => {
        setUser(null);
        setError(toAuthError(listenerError).message);
        setStatus('error');
      },
    );

    return unsubscribe;
  }, []);

  const signIn = useCallback(async () => {
    if (signingInRef.current) return;

    signingInRef.current = true;
    setIsSigningIn(true);
    setError(null);
    setStatus((previous) => (previous === 'error' ? 'unauthenticated' : previous));

    try {
      const firebaseUser = await signInWithGoogle();
      if (!firebaseUser) return; // dibatalkan pengguna

      const authUser = toAuthUser(firebaseUser);

      try {
        await ensureUserProfile(authUser);
      } catch {
        await signOutUser().catch(() => undefined);
        throw new AuthError(
          'profile-setup-failed',
          'Gagal menyiapkan data akun. Periksa koneksi internet dan Firestore Security Rules.',
        );
      }

      setUser(authUser);
      setStatus('authenticated');
    } catch (caught) {
      const authError = toAuthError(caught);
      if (authError.code === 'in-progress') return;

      setUser(null);
      setError(authError.message);
      setStatus('error');
    } finally {
      signingInRef.current = false;
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await signOutUser();
    setUser(null);
    setError(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, error, isSigningIn, signIn, signOut }),
    [status, user, error, isSigningIn, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}