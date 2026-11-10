import { useLocalSearchParams, useRouter } from 'expo-router';
import { Clock, Search } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LessonRow } from '@/components/cards/LessonRow';
import { ProjectRow } from '@/components/cards/ProjectRow';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { LaptopIllustration } from '@/components/illustrations/LaptopIllustration';
import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TabSwitcher } from '@/components/ui/TabSwitcher';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { useOpenResource } from '@/hooks/useOpenResource';
import { useProgress } from '@/hooks/useProgress';
import type { Difficulty } from '@/types/content';
import {
  getExercises,
  getPhaseById,
  getProjectsByPhase,
  getResourcesByPhase,
} from '@/utils/content';
import { getLessonStatus, getNextLesson, getPhaseProgress } from '@/utils/progress';

type PhaseTab = 'materi' | 'latihan' | 'proyek';

const TABS: { key: PhaseTab; label: string }[] = [
  { key: 'materi', label: 'Materi' },
  { key: 'latihan', label: 'Latihan' },
  { key: 'proyek', label: 'Proyek' },
];

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

export default function PhaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const progress = useProgress();
  const openResource = useOpenResource();
  const [tab, setTab] = useState<PhaseTab>('materi');

  const phase = getPhaseById(id);

  if (!phase) {
    return (
      <Screen>
        <ScreenHeader />
        <EmptyState
          icon={<Search color={colors.primary} size={30} strokeWidth={2} />}
          title="Fase tidak ditemukan"
          description="Fase yang kamu cari tidak tersedia. Kembali ke roadmap dan pilih fase lain."
        />
      </Screen>
    );
  }

  const summary = getPhaseProgress(phase, progress);
  const nextLesson = getNextLesson(phase, progress);
  const phaseExercises = getExercises(phase.id);
  const phaseProjects = getProjectsByPhase(phase.id);
  const relatedResources = getResourcesByPhase(phase.id).slice(0, 3);

  const ctaLabel =
    summary.completed === 0
      ? 'Mulai Belajar'
      : summary.completed === summary.total
        ? 'Tinjau Materi'
        : 'Lanjut Belajar';

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <ScreenHeader dark padded={false} />

          <View style={styles.headerBody}>
            <View style={styles.headerText}>
              <NumberBadge value={phase.order} size={40} />
              <AppText variant="caption" color={colors.dark.textMuted}>
                Fase {phase.order}
              </AppText>
              <AppText variant="title" color={colors.dark.text}>
                {phase.title}
              </AppText>
            </View>
            <LaptopIllustration width={120} />
          </View>

          <AppText variant="body" color={colors.dark.textMuted}>
            {phase.description}
          </AppText>

          <View style={styles.meta}>
            <Badge label={phase.level} tone="success" />
            <View style={styles.time}>
              <Clock color={colors.dark.textMuted} size={14} strokeWidth={2.2} />
              <AppText variant="caption" color={colors.dark.textMuted}>
                {phase.estimatedTime}
              </AppText>
            </View>
          </View>
          <AppText variant="caption" color={colors.dark.textMuted}>
            Bahasa: {phase.languages.join(' / ')}
          </AppText>
        </View>

        <View style={styles.body}>
          <View style={styles.progress}>
            <View style={styles.progressRow}>
              <AppText variant="bodyStrong">Progress Kamu</AppText>
              <AppText variant="bodyStrong">{summary.percent}%</AppText>
            </View>
            <ProgressBar value={summary.percent} height={8} />
          </View>

          <TabSwitcher tabs={TABS} active={tab} onChange={setTab} />

          {tab === 'materi' ? (
            <View style={styles.section}>
              <AppText variant="heading">Materi Pembelajaran</AppText>
              <Card padded={false}>
                {phase.lessons.map((lesson, index) => (
                  <LessonRow
                    key={lesson.id}
                    title={lesson.title}
                    status={getLessonStatus(progress, lesson.id)}
                    isLast={index === phase.lessons.length - 1}
                    onPress={() => router.push(`/lesson/${lesson.id}`)}
                  />
                ))}
              </Card>

              {relatedResources.length > 0 ? (
                <View style={styles.section}>
                  <SectionHeader title="Resource Terkait" />
                  {relatedResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onPress={() => openResource(resource)}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          ) : null}

          {tab === 'latihan' ? (
            <View style={styles.section}>
              <AppText variant="heading">Latihan</AppText>
              {phaseExercises.length > 0 ? (
                <Card>
                  <View style={styles.exerciseSummary}>
                    <AppText variant="bodyStrong">{phaseExercises.length} latihan tersedia</AppText>
                    <View style={styles.badgesRow}>
                      {DIFFICULTIES.map((difficulty) => {
                        const count = phaseExercises.filter(
                          (exercise) => exercise.difficulty === difficulty,
                        ).length;
                        return count > 0 ? (
                          <Badge
                            key={difficulty}
                            label={`${difficulty} • ${count}`}
                            tone={getDifficultyTone(difficulty)}
                          />
                        ) : null;
                      })}
                    </View>
                    <Button
                      title="Buka Latihan"
                      onPress={() =>
                        router.push({ pathname: '/exercise', params: { phaseId: phase.id } })
                      }
                    />
                  </View>
                </Card>
              ) : (
                <Card>
                  <AppText variant="body" color={colors.textSecondary}>
                    Latihan untuk fase ini ditambahkan pada Fase 6.
                  </AppText>
                </Card>
              )}
            </View>
          ) : null}

          {tab === 'proyek' ? (
            <View style={styles.section}>
              <AppText variant="heading">Mini Proyek</AppText>
              {phaseProjects.length > 0 ? (
                phaseProjects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    onPress={() => router.push(`/project/${project.id}`)}
                  />
                ))
              ) : (
                <Card>
                  <AppText variant="body" color={colors.textSecondary}>
                    Proyek untuk fase ini ditambahkan pada Fase 7.
                  </AppText>
                </Card>
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>

      {tab === 'materi' ? (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <Button title={ctaLabel} onPress={() => router.push(`/lesson/${nextLesson.id}`)} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    backgroundColor: colors.dark.background,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xl + 8,
    borderBottomRightRadius: radius.xl + 8,
    gap: spacing.md,
  },
  headerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  body: {
    padding: layout.screenPadding,
    gap: spacing.xl,
  },
  progress: {
    gap: spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    gap: spacing.md,
  },
  exerciseSummary: {
    gap: spacing.md,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});