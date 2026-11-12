import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { ContinueCard } from '@/components/cards/ContinueCard';
import { HistoryRow } from '@/components/cards/HistoryRow';
import { PhaseTimelineItem } from '@/components/cards/PhaseTimelineItem';
import { ProgressSummaryCard } from '@/components/cards/ProgressSummaryCard';
import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { useAuth } from '@/hooks/useAuth';
import { useHistory } from '@/hooks/useHistory';
import { useProgress } from '@/hooks/useProgress';
import { findLesson } from '@/utils/content';
import { getHistoryHref } from '@/utils/history';
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
  const history = useHistory(3);

  const firstName = user?.displayName?.trim().split(' ')[0] ?? 'Developer';
  const overall = useMemo(() => getOverallProgress(phases, progress), [progress]);

  const continueTarget = useMemo(() => {
    const last = findLesson(progress.lastLessonId);
    if (last) {
      const lastDone = progress.completedLessonIds.has(last.lesson.id);
      const phaseDone = getPhaseProgress(last.phase, progress).percent === 100;
      return {
        phase: last.phase,
        lesson: lastDone ? getNextLesson(last.phase, progress) : last.lesson,
        subtitle: phaseDone
          ? 'Fase ini selesai, tinjau kembali materinya'
          : lastDone
            ? 'Lanjut ke materi berikutnya'
            : 'Lanjutkan dari materi terakhirmu',
      };
    }
    const firstPhase = phases[0];
    return {
      phase: firstPhase,
      lesson: getNextLesson(firstPhase, progress),
      subtitle: 'Mulai dari materi pertama',
    };
  }, [progress]);

  const continuePhaseProgress = getPhaseProgress(continueTarget.phase, progress);
  const previewPhases = phases.slice(0, 4);

  return (
    <Screen edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <AppText variant="title">Halo, {firstName}!</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              Terus belajar, raih tujuanmu.
            </AppText>
          </View>
          <Avatar uri={user?.photoURL} name={user?.displayName} size={44} />
        </View>

        {progress.error ? <ErrorBanner message={progress.error} /> : null}

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
            language={continueTarget.phase.languages[0]}
            phaseLabel={`Fase ${continueTarget.phase.order} • ${continueTarget.phase.level}`}
            title={continueTarget.lesson.title}
            subtitle={continueTarget.subtitle}
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
          <SectionHeader
            title="Aktivitas Terbaru"
            actionLabel={history.entries.length > 0 ? 'Lihat semua' : undefined}
            onActionPress={() => router.push('/history')}
          />
          {history.isLoading ? (
            <Card>
              <ActivityIndicator color={colors.primary} />
            </Card>
          ) : history.error ? (
            <ErrorBanner message={history.error} />
          ) : history.entries.length === 0 ? (
            <Card>
              <AppText variant="body" color={colors.textSecondary}>
                Belum ada aktivitas belajar. Mulai materi pertamamu untuk melihat riwayat di sini.
              </AppText>
            </Card>
          ) : (
            <Card padded={false}>
              {history.entries.map((entry, index) => (
                <HistoryRow
                  key={entry.id}
                  entry={entry}
                  isLast={index === history.entries.length - 1}
                  onPress={() => router.push(getHistoryHref(entry))}
                />
              ))}
            </Card>
          )}
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