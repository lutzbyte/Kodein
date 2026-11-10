import { ArrowRight } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { KodeinLogo } from '@/components/illustrations/KodeinLogo';
import { LaptopIllustration } from '@/components/illustrations/LaptopIllustration';
import { StarField } from '@/components/illustrations/StarField';
import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Screen } from '@/components/ui/Screen';
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from '@/constants/app';
import { colors, spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

type ButtonSource = 'start' | 'login';

export default function OnboardingScreen() {
  const { signIn, isSigningIn, error } = useAuth();
  const { width } = useWindowDimensions();
  const [source, setSource] = useState<ButtonSource | null>(null);

  const illustrationWidth = Math.min(width - 64, 320);

  // "Mulai Sekarang" dan "Masuk" sama-sama menjalankan Google Sign-In.
  const handleSignIn = useCallback(
    async (from: ButtonSource) => {
      setSource(from);
      await signIn();
      setSource(null);
    },
    [signIn],
  );

  return (
    <Screen dark>
      <StarField />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <LaptopIllustration width={illustrationWidth} />
        </View>

        <View style={styles.texts}>
          <View style={styles.brandRow}>
            <KodeinLogo width={36} />
            <AppText variant="heading" color={colors.dark.text}>
              {APP_NAME}
            </AppText>
          </View>
          <AppText variant="title" color={colors.dark.text} align="center">
            {APP_TAGLINE}
          </AppText>
          <AppText variant="body" color={colors.dark.textMuted} align="center" style={styles.description}>
            {APP_DESCRIPTION}
          </AppText>
        </View>

        <View style={styles.actions}>
          {error ? <ErrorBanner message={error} onDark /> : null}

          <Button
            title="Mulai Sekarang"
            icon={<ArrowRight color={colors.surface} size={18} strokeWidth={2.4} />}
            loading={isSigningIn && source === 'start'}
            disabled={isSigningIn}
            onPress={() => handleSignIn('start')}
          />
          <Button
            title="Masuk"
            variant="ghost"
            onDark
            loading={isSigningIn && source === 'login'}
            disabled={isSigningIn}
            onPress={() => handleSignIn('login')}
          />
          <AppText variant="caption" color={colors.dark.textMuted} align="center">
            Masuk menggunakan akun Google. Akun baru dibuat otomatis.
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxl,
    gap: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.lg,
  },
  texts: {
    alignItems: 'center',
    gap: spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  description: {
    maxWidth: 340,
  },
  actions: {
    gap: spacing.md,
  },
});