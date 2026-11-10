import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { KodeinLogo } from '@/components/illustrations/KodeinLogo';
import { StarField } from '@/components/illustrations/StarField';
import { AppText } from '@/components/ui/AppText';
import { Screen } from '@/components/ui/Screen';
import { APP_NAME, APP_TAGLINE, SPLASH_MIN_DURATION_MS } from '@/constants/app';
import { colors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

// Durasi minimum splash hanya berlaku sekali per sesi aplikasi.
let splashShownOnce = false;

/**
 * Splash Screen: branding + pemeriksaan auth state, lalu mengarahkan pengguna.
 * Pengguna belum login -> Onboarding. Pengguna sudah login -> Beranda.
 */
export default function SplashRoute() {
  const { status } = useAuth();
  const [minElapsed, setMinElapsed] = useState(splashShownOnce);

  useEffect(() => {
    if (splashShownOnce) return;

    const timer = setTimeout(() => {
      splashShownOnce = true;
      setMinElapsed(true);
    }, SPLASH_MIN_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  if (minElapsed && status !== 'loading') {
    return <Redirect href={status === 'authenticated' ? '/home' : '/onboarding'} />;
  }

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