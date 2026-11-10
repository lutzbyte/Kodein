import { useRouter } from 'expo-router';
import { Bookmark, History, Info, Settings, Star } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MenuRow } from '@/components/cards/MenuRow';
import { WaveBackdrop } from '@/components/illustrations/WaveBackdrop';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { APP_DESCRIPTION, APP_NAME } from '@/constants/app';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { toAuthError } from '@/services/auth/authErrors';
import { getAndroidPackage, getAppVersion } from '@/utils/appInfo';
import { getLearnerLevel } from '@/utils/level';
import { getOverallProgress } from '@/utils/progress';

const ICON_COLOR = colors.textPrimary;

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const progress = useProgress();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const overall = useMemo(() => getOverallProgress(phases, progress), [progress]);
  const level = getLearnerLevel(overall);

  const performSignOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      // Setelah berhasil, guard di _layout.tsx otomatis memindahkan ke Onboarding.
      await signOut();
    } catch (error) {
      setIsSigningOut(false);
      Alert.alert('Gagal keluar', toAuthError(error).message);
    }
  }, [signOut]);

  const confirmSignOut = useCallback(() => {
    Alert.alert('Keluar dari akun?', 'Progress belajarmu tetap tersimpan dan tersedia saat kamu masuk kembali.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: performSignOut },
    ]);
  }, [performSignOut]);

  const showAbout = useCallback(() => {
    Alert.alert(`Tentang ${APP_NAME}`, `Versi ${getAppVersion()}\n\n${APP_DESCRIPTION}`);
  }, []);

  const rateApp = useCallback(async () => {
    const packageName = getAndroidPackage();
    try {
      await Linking.openURL(`market://details?id=${packageName}`);
    } catch {
      try {
        await Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}`);
      } catch {
        Alert.alert('Tidak dapat membuka Play Store', 'Coba lagi nanti.');
      }
    }
  }, []);

  return (
    <Screen edges={['top']}>
      <WaveBackdrop />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pengaturan"
            hitSlop={12}
            onPress={() => router.push('/settings')}
          >
            <Settings color={ICON_COLOR} size={24} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={styles.identity}>
          <Avatar uri={user?.photoURL} name={user?.displayName} size={96} />
          <AppText variant="title" align="center" style={styles.name}>
            {user?.displayName ?? 'Pengguna Kodein'}
          </AppText>
          <AppText variant="caption" color={colors.primary} align="center">
            Learner • Level {level}
          </AppText>
          <AppText variant="caption" color={colors.textSecondary} align="center">
            {user?.email ?? '-'}
          </AppText>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <AppText variant="bodyStrong">Total Progress</AppText>
            <AppText variant="bodyStrong">{overall.percent}%</AppText>
          </View>
          <ProgressBar value={overall.percent} color={colors.primary} trackColor={colors.surface} height={8} />
        </View>

        <View>
          <MenuRow
            icon={<History color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Riwayat Belajar"
            onPress={() => router.push('/history')}
          />
          <MenuRow
            icon={<Bookmark color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Bookmark"
            onPress={() => router.push('/bookmarks')}
          />
          <MenuRow
            icon={<Settings color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Pengaturan"
            onPress={() => router.push('/settings')}
          />
          <MenuRow
            icon={<Info color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Tentang Aplikasi"
            onPress={showAbout}
          />
          <MenuRow
            icon={<Star color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Beri Rating"
            isLast
            onPress={rateApp}
          />
        </View>

        <Button title="Keluar" variant="outline" loading={isSigningOut} onPress={confirmSignOut} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
    gap: spacing.xxl,
  },
  topBar: {
    alignItems: 'flex-end',
  },
  identity: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  name: {
    marginTop: spacing.sm,
  },
  progressCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});