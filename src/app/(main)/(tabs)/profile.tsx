import { useRouter } from 'expo-router';
import { Bookmark, History, Info, Settings, Star, Wrench } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MenuRow } from '@/components/cards/MenuRow';
import { WaveBackdrop } from '@/components/illustrations/WaveBackdrop';
import { AboutSheet } from '@/components/sheets/AboutSheet';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { projects } from '@/data/projects';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import { useExerciseResults } from '@/hooks/useExerciseResults';
import { useProgress } from '@/hooks/useProgress';
import { useProjectProgress } from '@/hooks/useProjectProgress';
import { toAuthError } from '@/services/auth/authErrors';
import { getAndroidPackage } from '@/utils/appInfo';
import { getLearnerLevel } from '@/utils/level';
import { getOverallProgress } from '@/utils/progress';
import { isProjectDone } from '@/utils/projects';

const ICON_COLOR = colors.textPrimary;

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="title" color={colors.primary}>
        {value}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary} align="center">
        {label}
      </AppText>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const dialog = useDialog();
  const { user, signOut } = useAuth();
  const progress = useProgress();
  const { results } = useExerciseResults();
  const { records } = useProjectProgress();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  const overall = useMemo(() => getOverallProgress(phases, progress), [progress]);
  const level = getLearnerLevel(overall);

  const solvedExercises = useMemo(
    () => Array.from(results.values()).filter((result) => result.solved).length,
    [results],
  );
  const doneProjects = useMemo(
    () =>
      projects.filter((project) => isProjectDone(records.get(project.id), project.checklist.length))
        .length,
    [records],
  );

  const confirmSignOut = useCallback(async () => {
    const confirmed = await dialog.confirm({
      title: 'Keluar dari akun?',
      message: 'Progress belajarmu tetap tersimpan dan tersedia saat kamu masuk kembali.',
      confirmLabel: 'Keluar',
      cancelLabel: 'Batal',
      tone: 'danger',
    });
    if (!confirmed) return;

    setIsSigningOut(true);
    try {
      // Setelah berhasil, guard di _layout.tsx otomatis memindahkan ke Onboarding.
      await signOut();
    } catch (error) {
      setIsSigningOut(false);
      await dialog.alert({
        title: 'Gagal keluar',
        message: toAuthError(error).message,
        tone: 'danger',
      });
    }
  }, [dialog, signOut]);

  const rateApp = useCallback(async () => {
    const packageName = getAndroidPackage();
    try {
      await Linking.openURL(`market://details?id=${packageName}`);
    } catch {
      try {
        await Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}`);
      } catch {
        await dialog.alert({
          title: 'Tidak dapat membuka Play Store',
          message: 'Coba lagi nanti.',
        });
      }
    }
  }, [dialog]);

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

        <View style={styles.stats}>
          <Stat value={progress.completedLessonIds.size} label="Materi selesai" />
          <Stat value={solvedExercises} label="Latihan selesai" />
          <Stat value={doneProjects} label="Proyek selesai" />
        </View>

        <View>
          <MenuRow
            icon={<History color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Riwayat Belajar"
            onPress={() => router.push('/history')}
          />
          <MenuRow
            icon={<Wrench color={ICON_COLOR} size={22} strokeWidth={2} />}
            label="Proyek"
            onPress={() => router.push('/project')}
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
            onPress={() => setAboutVisible(true)}
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

      <AboutSheet visible={aboutVisible} onClose={() => setAboutVisible(false)} />
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
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    gap: 2,
  },
});