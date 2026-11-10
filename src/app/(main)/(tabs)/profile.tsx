import { useRouter } from 'expo-router';
import { Bookmark, History, Info, Settings } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MenuRow } from '@/components/cards/MenuRow';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { APP_DESCRIPTION, APP_NAME } from '@/constants/app';
import { colors, layout, radius, shadows, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { toAuthError } from '@/services/auth/authErrors';
import { getAppVersion } from '@/utils/appInfo';
import { getOverallProgress } from '@/utils/progress';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const progress = useProgress();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const overall = useMemo(() => getOverallProgress(phases, progress), [progress]);

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

  return (
    <Screen edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pengaturan"
            hitSlop={12}
            onPress={() => router.push('/settings')}
          >
            <Settings color={colors.textPrimary} size={24} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={styles.identity}>
          <Avatar uri={user?.photoURL} name={user?.displayName} size={96} />
          <AppText variant="title" align="center">
            {user?.displayName ?? 'Pengguna Kodein'}
          </AppText>
          <AppText variant="body" color={colors.textSecondary} align="center">
            {user?.email ?? '-'}
          </AppText>
          <View style={styles.levelPill}>
            <AppText variant="label" color={colors.primary}>
              Learner
            </AppText>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <AppText variant="bodyStrong">Total Progress</AppText>
            <AppText variant="bodyStrong">{overall.percent}%</AppText>
          </View>
          <ProgressBar value={overall.percent} color={colors.primary} height={8} />
          <AppText variant="caption" color={colors.textSecondary}>
            {overall.completed} dari {overall.total} materi selesai
          </AppText>
        </View>

        <Card padded={false}>
          <MenuRow
            icon={<History color={colors.primary} size={22} strokeWidth={2} />}
            label="Riwayat Belajar"
            onPress={() => router.push('/history')}
          />
          <MenuRow
            icon={<Bookmark color={colors.primary} size={22} strokeWidth={2} />}
            label="Bookmark"
            onPress={() => router.push('/bookmarks')}
          />
          <MenuRow
            icon={<Settings color={colors.primary} size={22} strokeWidth={2} />}
            label="Pengaturan"
            onPress={() => router.push('/settings')}
          />
          <MenuRow
            icon={<Info color={colors.primary} size={22} strokeWidth={2} />}
            label="Tentang Aplikasi"
            isLast
            onPress={showAbout}
          />
        </Card>

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
    gap: spacing.sm,
  },
  levelPill: {
    marginTop: spacing.xs,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});