import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from 'firebase/auth';
import { getFirestore, initializeFirestore, type Firestore } from 'firebase/firestore';

function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.startsWith('ISI_')) {
    throw new Error(`Konfigurasi ${name} belum diisi. Periksa file .env lalu restart Metro dengan: bunx expo start --dev-client -c`);
  }
  return value;
}

// Setiap variabel harus diakses secara literal agar di-inline oleh Expo.
const firebaseConfig = {
  apiKey: requireEnv('EXPO_PUBLIC_FIREBASE_API_KEY', process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
  authDomain: requireEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN', process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: requireEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID', process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID),
  appId: requireEnv('EXPO_PUBLIC_FIREBASE_APP_ID', process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
};

export const GOOGLE_WEB_CLIENT_ID = requireEnv(
  'EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID',
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
);

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

function createAuth(): Auth {
  try {
    // AsyncStorage dipakai HANYA oleh Firebase Auth untuk menyimpan token sesi login.
    // Data aplikasi (progress, bookmark, dst.) tetap disimpan di Firestore.
    return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    // Sudah terinisialisasi (mis. saat fast refresh).
    return getAuth(app);
  }
}

function createFirestore(): Firestore {
  try {
    return initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  } catch {
    return getFirestore(app);
  }
}

export const auth: Auth = createAuth();
export const db: Firestore = createFirestore();