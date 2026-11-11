import { StyleSheet, View } from 'react-native';

import { KodeinLogo } from '@/components/illustrations/KodeinLogo';
import { AppText } from '@/components/ui/AppText';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from '@/constants/app';
import { colors, radius, spacing } from '@/constants/theme';
import { getAppVersion } from '@/utils/appInfo';

interface AboutSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function AboutSheet({ visible, onClose }: AboutSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.body}>
        <View style={styles.logoTile}>
          <KodeinLogo width={64} />
        </View>
        <View style={styles.titles}>
          <AppText variant="title">{APP_NAME}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            Versi {getAppVersion()}
          </AppText>
        </View>
        <AppText variant="bodyStrong" align="center">
          {APP_TAGLINE}
        </AppText>
        <AppText variant="body" color={colors.textSecondary} align="center">
          {APP_DESCRIPTION}
        </AppText>
        <Button title="Tutup" variant="outline" onPress={onClose} style={styles.close} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    gap: spacing.md,
  },
  logoTile: {
    width: 96,
    height: 96,
    borderRadius: radius.xl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    alignItems: 'center',
    gap: 2,
  },
  close: {
    alignSelf: 'stretch',
    marginTop: spacing.md,
  },
});