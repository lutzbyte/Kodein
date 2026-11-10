import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ContinueCard } from '@/components/cards/ContinueCard';
import { PhaseTimelineItem } from '@/components/cards/PhaseTimelineItem';
import { ProgressSummaryCard } from '@/components/cards/ProgressSummaryCard';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { findLesson } from '@/utils/content';
import {
  getNextLesson,
  getOverallProgress,
  getPhaseProgress,
  getPhaseStatusLabel,
} from '@/utils/progress';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const progress = useProgress();

  const firstName = user?.displayName?.trim().split(' ')[0] ?? 'Developer';
  const overall = useMemo(() => getOverallProgress(phases, progress), [progress]);

  const continueTarget = useMemo(() => {
    const last = progress.lastLessonId ? findLesson(progress.lastLessonId) : undefined;
    if (last) {
      return { phase: last.phase, lesson: last.lesson, resuming: true };
    }
    const firstPhase = phases[0];
    return { phase: firstPhase, lesson: getNextLesson(firstPhase, progress), resuming: false };
  }, [progress]);

  const continuePhaseProgress = getPhaseProgress(continueTarget.phase, progress);
  const previewPhases = phases.slice(0, 4);

  return (
    <Screen edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="title">Halo, {firstName}!</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              Terus belajar, raih tujuanmu.
            </AppText>
          </View>
          <Avatar uri={user?.photoURL} name={user?.displayName} size={44} />
        </View>

        <ProgressSummaryCard
          completedPhases={overall.completedPhases}
          totalPhases={overall.totalPhases}
          percent={overall.percent}
        />

        <View style={styles.section}>
          <SectionHeader
            title="Lanjut Belajar"
            actionLabel="Lihat semua"
            onActionPress={() => router.push('/roadmap')}
          />
          <ContinueCard
            phaseLabel={`Fase ${continueTarget.phase.order} • ${continueTarget.phase.level}`}
            title={continueTarget.lesson.title}
            subtitle={
              continueTarget.resuming ? 'Lanjutkan dari materi terakhirmu' : 'Mulai dari materi pertama'
            }
            percent={continuePhaseProgress.percent}
            onPress={() => router.push(`/lesson/${continueTarget.lesson.id}`)}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Roadmap Pembelajaran"
            actionLabel="Lihat semua"
            onActionPress={() => router.push('/roadmap')}
          />
          <Card>
            {previewPhases.map((phase, index) => (
              <PhaseTimelineItem
                key={phase.id}
                phase={phase}
                completed={getPhaseStatusLabel(phase, progress) === 'Selesai'}
                isLast={index === previewPhases.length - 1}
                onPress={() => router.push(`/phase/${phase.id}`)}
              />
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Aktivitas Terbaru" />
          <Card>
            <AppText variant="body" color={colors.textSecondary}>
              Belum ada aktivitas belajar. Mulai materi pertamamu untuk melihat riwayat di sini.
            </AppText>
          </Card>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  section: {
    gap: spacing.md,
  },
});