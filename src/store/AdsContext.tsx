import { usePathname } from 'expo-router';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import mobileAds, {
  AdEventType,
  AdsConsent,
  AppOpenAd,
  InterstitialAd,
  MaxAdContentRating,
} from 'react-native-google-mobile-ads';

import { AD_RULES, AD_TEST_DEVICE_IDS, getAdUnitId, hasAnyAdUnit } from '@/constants/ads';

export interface AdsContextValue {
  /** True jika persetujuan sudah ada dan SDK iklan siap dipakai. */
  ready: boolean;
}

export const AdsContext = createContext<AdsContextValue>({ ready: false });

export function AdsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  const sessionStart = useRef(Date.now());
  const fullscreenOpen = useRef(false);
  const lastFullscreenClosedAt = useRef(0);

  const interstitialRef = useRef<InterstitialAd | null>(null);
  const interstitialLoaded = useRef(false);
  const breakCount = useRef(0);
  const lastInterstitialAt = useRef(0);

  const appOpenRef = useRef<AppOpenAd | null>(null);
  const appOpenLoadedAt = useRef<number | null>(null);
  const lastAppOpenShownAt = useRef(0);

  // 1) Persetujuan pengguna, lalu inisialisasi SDK.
  useEffect(() => {
    if (!hasAnyAdUnit()) return;

    let cancelled = false;

    async function start() {
      try {
        await AdsConsent.gatherConsent();
        const info = await AdsConsent.getConsentInfo();
        if (cancelled || !info.canRequestAds) return;

        await mobileAds().setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          testDeviceIdentifiers: AD_TEST_DEVICE_IDS,
        });
        await mobileAds().initialize();
        if (!cancelled) setReady(true);
      } catch {
        // Tanpa persetujuan atau SDK gagal: aplikasi berjalan tanpa iklan.
      }
    }

    start();
    return () => {
      cancelled = true;
    };
  }, []);

  const markFullscreenClosed = useCallback(() => {
    fullscreenOpen.current = false;
    lastFullscreenClosedAt.current = Date.now();
  }, []);

  // 2) Interstitial.
  const ensureInterstitial = useCallback(() => {
    const unitId = getAdUnitId('interstitial');
    if (!unitId || interstitialRef.current) return;

    const ad = InterstitialAd.createForAdRequest(unitId);
    interstitialRef.current = ad;
    interstitialLoaded.current = false;

    const cleanups: Array<() => void> = [];
    const release = () => {
      cleanups.forEach((cleanup) => cleanup());
      interstitialRef.current = null;
      interstitialLoaded.current = false;
    };

    cleanups.push(
      ad.addAdEventListener(AdEventType.LOADED, () => {
        interstitialLoaded.current = true;
      }),
      ad.addAdEventListener(AdEventType.OPENED, () => {
        fullscreenOpen.current = true;
      }),
      ad.addAdEventListener(AdEventType.CLOSED, () => {
        markFullscreenClosed();
        release();
        ensureInterstitial();
      }),
      ad.addAdEventListener(AdEventType.ERROR, () => {
        // Dicoba lagi pada jeda berikutnya, bukan langsung berulang.
        release();
      }),
    );

    ad.load();
  }, [markFullscreenClosed]);

  const registerBreak = useCallback(() => {
    breakCount.current += 1;
    if (breakCount.current < AD_RULES.INTERSTITIAL_BREAKS) {
      if (breakCount.current === AD_RULES.INTERSTITIAL_BREAKS - 1) ensureInterstitial();
      return;
    }

    const now = Date.now();
    if (
      now - sessionStart.current < AD_RULES.INTERSTITIAL_MIN_SESSION_MS ||
      now - lastInterstitialAt.current < AD_RULES.INTERSTITIAL_MIN_INTERVAL_MS ||
      fullscreenOpen.current
    ) {
      return;
    }

    const ad = interstitialRef.current;
    if (!ad || !interstitialLoaded.current) {
      ensureInterstitial();
      return;
    }

    breakCount.current = 0;
    lastInterstitialAt.current = now;
    setTimeout(() => {
      ad.show().catch(() => undefined);
    }, 500);
  }, [ensureInterstitial]);

  // Jeda alami: pengguna meninggalkan halaman materi atau latihan.
  const previousPath = useRef(pathname);
  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    if (previous === pathname || !ready) return;

    if (previous.startsWith('/lesson/') || previous.startsWith('/exercise/')) {
      registerBreak();
    }
  }, [pathname, ready, registerBreak]);

  // 3) App Open.
  const ensureAppOpen = useCallback(() => {
    const unitId = getAdUnitId('appOpen');
    if (!unitId || appOpenRef.current) return;

    const ad = AppOpenAd.createForAdRequest(unitId);
    appOpenRef.current = ad;
    appOpenLoadedAt.current = null;

    const cleanups: Array<() => void> = [];
    const release = () => {
      cleanups.forEach((cleanup) => cleanup());
      appOpenRef.current = null;
      appOpenLoadedAt.current = null;
    };

    cleanups.push(
      ad.addAdEventListener(AdEventType.LOADED, () => {
        appOpenLoadedAt.current = Date.now();
      }),
      ad.addAdEventListener(AdEventType.OPENED, () => {
        fullscreenOpen.current = true;
      }),
      ad.addAdEventListener(AdEventType.CLOSED, () => {
        markFullscreenClosed();
        release();
        ensureAppOpen();
      }),
      ad.addAdEventListener(AdEventType.ERROR, () => {
        release();
      }),
    );

    ad.load();
  }, [markFullscreenClosed]);

  const tryShowAppOpen = useCallback(
    (awayMs: number) => {
      const now = Date.now();
      if (awayMs < AD_RULES.APP_OPEN_MIN_BACKGROUND_MS) return;
      if (fullscreenOpen.current) return;
      if (now - lastFullscreenClosedAt.current < AD_RULES.POST_FULLSCREEN_GUARD_MS) return;
      if (now - lastAppOpenShownAt.current < AD_RULES.APP_OPEN_MIN_INTERVAL_MS) return;

      const ad = appOpenRef.current;
      const loadedAt = appOpenLoadedAt.current;
      if (!ad || loadedAt === null) {
        ensureAppOpen();
        return;
      }
      if (now - loadedAt > AD_RULES.APP_OPEN_MAX_AGE_MS) {
        // Iklan kedaluwarsa: buang dan muat ulang untuk kesempatan berikutnya.
        appOpenRef.current = null;
        appOpenLoadedAt.current = null;
        ensureAppOpen();
        return;
      }

      lastAppOpenShownAt.current = now;
      ad.show().catch(() => undefined);
    },
    [ensureAppOpen],
  );

  useEffect(() => {
    if (!ready) return;

    ensureAppOpen();
    ensureInterstitial();

    let backgroundedAt: number | null = null;
    const subscription = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (next === 'background') {
        backgroundedAt = Date.now();
        return;
      }
      if (next !== 'active' || backgroundedAt === null) return;

      const away = Date.now() - backgroundedAt;
      backgroundedAt = null;
      tryShowAppOpen(away);
    });

    return () => subscription.remove();
  }, [ready, ensureAppOpen, ensureInterstitial, tryShowAppOpen]);

  const value = useMemo<AdsContextValue>(() => ({ ready }), [ready]);

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
}