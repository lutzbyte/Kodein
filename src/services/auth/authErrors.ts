import { statusCodes } from '@react-native-google-signin/google-signin';

export type AuthErrorCode =
  | 'cancelled'
  | 'in-progress'
  | 'play-services'
  | 'no-id-token'
  | 'network'
  | 'developer-error'
  | 'profile-setup-failed'
  | 'sign-out-failed'
  | 'unknown';

export class AuthError extends Error {
  readonly code: AuthErrorCode;

  constructor(code: AuthErrorCode, message: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

function extractCode(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    return String((error as { code: unknown }).code);
  }
  return '';
}

function extractMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return '';
}

export function toAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) return error;

  const code = extractCode(error);
  const message = extractMessage(error);

  if (code === statusCodes.SIGN_IN_CANCELLED) {
    return new AuthError('cancelled', 'Login dibatalkan.');
  }
  if (code === statusCodes.IN_PROGRESS) {
    return new AuthError('in-progress', 'Proses login sedang berjalan.');
  }
  if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return new AuthError(
      'play-services',
      'Google Play Services tidak tersedia atau perlu diperbarui di perangkat ini.',
    );
  }
  if (code === '10' || message.includes('DEVELOPER_ERROR')) {
    return new AuthError(
      'developer-error',
      'Konfigurasi Google Sign-In belum cocok. Periksa Web Client ID dan SHA-1 di Firebase Console.',
    );
  }
  if (code === 'auth/network-request-failed' || code === 'unavailable') {
    return new AuthError('network', 'Tidak ada koneksi internet. Periksa jaringan lalu coba lagi.');
  }

  return new AuthError('unknown', 'Terjadi kesalahan saat masuk. Silakan coba lagi.');
}