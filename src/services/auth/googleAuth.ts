import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';

import { auth, GOOGLE_WEB_CLIENT_ID } from '@/services/firebase/config';
import { AuthError, toAuthError } from '@/services/auth/authErrors';

let configured = false;

export function configureGoogleSignIn(): void {
  if (configured) return;
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
  });
  configured = true;
}

/**
 * Menjalankan Google Sign-In lalu menukar kredensialnya ke Firebase Auth.
 * Mengembalikan null jika pengguna membatalkan.
 */
export async function signInWithGoogle(): Promise<User | null> {
  try {
    configureGoogleSignIn();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response)) {
      return null;
    }

    const idToken = response.data.idToken;
    if (!idToken) {
      throw new AuthError('no-id-token', 'Google tidak mengembalikan token. Silakan coba lagi.');
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (error) {
    const authError = toAuthError(error);
    if (authError.code === 'cancelled') return null;
    throw authError;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch {
    throw new AuthError('sign-out-failed', 'Gagal keluar dari akun. Periksa koneksi lalu coba lagi.');
  }

  try {
    // Agar pemilih akun Google tampil lagi pada login berikutnya.
    await GoogleSignin.signOut();
  } catch {
    // Tidak memengaruhi status Firebase yang sudah keluar.
  }
}