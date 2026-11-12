import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { spacing } from '@/constants/theme';
import { getAdUnitId } from '@/constants/ads';
import { useAds } from '@/hooks/useAds';

/**
 * Banner adaptif di dalam konten (bukan menempel di dekat tombol aksi).
 * Tidak memakai ruang sama sekali sampai iklan berhasil dimuat.
 */
export function AdBanner() {
  const { ready } = useAds();
  const unitId = getAdUnitId('banner');
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!ready || !unitId || failed) return null;

  return (
    <View style={[styles.wrap, loaded ? styles.visible : styles.hidden]}>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setLoaded(true)}
        onAdFailedToLoad={() => setFailed(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  visible: {
    marginTop: spacing.xl,
  },
  hidden: {
    height: 0,
  },
});