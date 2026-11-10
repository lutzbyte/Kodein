import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { KodeinLogo } from '@/components/illustrations/KodeinLogo';
import { StarField } from '@/components/illustrations/StarField';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { colors } from '@/constants/theme';

/**
 * Splash Screen: hanya branding dan indikator loading.
 * Perpindahan ke Onboarding/Beranda ditangani oleh guard di _layout.tsx.
 */
export default function SplashRoute() {
  return (
    <Screen dark>
      <StarField />
      <View style={styles.center}>
        <KodeinLogo width={132} />
        <AppText variant="display" color={colors.dark.text} style={styles.name}>
          {APP_NAME}
        </AppText>
        <AppText variant="body" color={colors.dark.textMuted}>
          {APP_TAGLINE}
        </AppText>
      </View>
      <View style={styles.footer}>
        <ActivityIndicator color={colors.primaryLight} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 20,
    marginBottom: 6,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 48,
  },
});