import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export type AdKind = 'banner' | 'native' | 'interstitial' | 'appOpen';

// Setiap variabel harus diakses secara literal agar di-inline oleh Expo.
const CONFIGURED: Record<AdKind, string | undefined> = {
  banner: process.env.EXPO_PUBLIC_ADMOB_BANNER_ID,
  native: process.env.EXPO_PUBLIC_ADMOB_NATIVE_ID,
  interstitial: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID,
  appOpen: process.env.EXPO_PUBLIC_ADMOB_APP_OPEN_ID,
};

const TEST: Record<AdKind, string> = {
  banner: TestIds.BANNER,
  native: TestIds.NATIVE,
  interstitial: TestIds.INTERSTITIAL,
  appOpen: TestIds.APP_OPEN,
};

const ALL_KINDS: AdKind[] = ['banner', 'native', 'interstitial', 'appOpen'];

/**
 * Mode debug memakai ID iklan uji milik Google. Mode rilis hanya memakai ID
 * dari .env; jika kosong, format iklan tersebut dimatikan.
 */
export function getAdUnitId(kind: AdKind): string | null {
  if (Platform.OS !== 'android') return null;
  if (__DEV__) return TEST[kind];

  const id = CONFIGURED[kind]?.trim();
  if (!id || id.startsWith('ISI_')) return null;
  return id;
}

export function hasAnyAdUnit(): boolean {
  return ALL_KINDS.some((kind) => getAdUnitId(kind) !== null);
}

export const AD_TEST_DEVICE_IDS: string[] = (
  process.env.EXPO_PUBLIC_ADMOB_TEST_DEVICE_IDS ?? ''
)
  .split(',')
  .map((value: string) => value.trim())
  .filter((value: string) => value.length > 0);

export const AD_RULES = {
  /** Interstitial: tampil setelah sekian kali pengguna meninggalkan materi atau latihan. */
  INTERSTITIAL_BREAKS: 4,
  INTERSTITIAL_MIN_INTERVAL_MS: 4 * 60 * 1000,
  INTERSTITIAL_MIN_SESSION_MS: 2 * 60 * 1000,
  /** App Open: hanya saat kembali dari latar belakang. */
  APP_OPEN_MIN_BACKGROUND_MS: 30 * 1000,
  APP_OPEN_MIN_INTERVAL_MS: 5 * 60 * 1000,
  APP_OPEN_MAX_AGE_MS: 3 * 60 * 60 * 1000,
  /** Jeda aman setelah iklan layar penuh ditutup. */
  POST_FULLSCREEN_GUARD_MS: 5000,
};