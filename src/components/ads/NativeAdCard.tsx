import { Image, StyleSheet, Text, View } from 'react-native';
import {
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
  useNativeAd,
} from 'react-native-google-mobile-ads';

import { Badge } from '@/components/ui/Badge';
import { colors, fontFamily, radius, shadows, spacing } from '@/constants/theme';
import { getAdUnitId } from '@/constants/ads';
import { useAds } from '@/hooks/useAds';

/** Kartu iklan native dengan tata letak sendiri dan label "Iklan" yang jelas. */
export function NativeAdCard() {
  const { ready } = useAds();
  const unitId = getAdUnitId('native');
  const { nativeAd } = useNativeAd({ adUnitId: unitId ?? '', autoLoad: ready && unitId !== null });

  if (!ready || !unitId || !nativeAd) return null;

  return (
    <NativeAdView nativeAd={nativeAd} style={styles.card}>
      <View style={styles.header}>
        {nativeAd.icon ? (
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image source={{ uri: nativeAd.icon.url }} style={styles.icon} />
          </NativeAsset>
        ) : null}
        <View style={styles.texts}>
          <Badge label="Iklan" tone="neutral" />
          <NativeAsset assetType={NativeAssetType.HEADLINE}>
            <Text style={styles.headline} numberOfLines={2}>
              {nativeAd.headline}
            </Text>
          </NativeAsset>
        </View>
      </View>

      <NativeMediaView resizeMode="cover" style={styles.media} />

      {nativeAd.body ? (
        <NativeAsset assetType={NativeAssetType.BODY}>
          <Text style={styles.body} numberOfLines={3}>
            {nativeAd.body}
          </Text>
        </NativeAsset>
      ) : null}

      {nativeAd.callToAction ? (
        <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{nativeAd.callToAction}</Text>
          </View>
        </NativeAsset>
      ) : null}
    </NativeAdView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  texts: {
    flex: 1,
    gap: 4,
  },
  headline: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  media: {
    height: 160,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  cta: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  ctaText: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    color: colors.surface,
  },
});