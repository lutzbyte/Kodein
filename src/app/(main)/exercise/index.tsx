import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { ExerciseRow } from '@/components/cards/ExerciseRow';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { useExerciseResults } from '@/hooks/useExerciseResults';
import type { Difficulty } from '@/types/content';
import { getExercises, getPhaseById } from '@/utils/content';
import { getExerciseStatus, summarizeExercises } from '@/utils/exercises';

type DifficultyFilter = 'Semua' | Difficulty;

const FILTERS: DifficultyFilter[] = ['Semua', 'Easy', 'Medium', 'Hard'];

export default function ExerciseListScreen() {
  const { phaseId } = useLocalSearchParams<{ phaseId?: string }>();
  const router = useRouter();
  const { results, isLoading, error } = useExerciseResults();
  const [filter, setFilter] = useState<DifficultyFilter>('Semua');

  const phase = getPhaseById(phaseId);
  const scope = useMemo(() => getExercises(phase?.id), [phase?.id]);
  const summary = useMemo(() => summarizeExercises(scope, results), [scope, results]);

  const items = useMemo(
    () => (filter === 'Semua' ? scope : scope.filter((exercise) => exercise.difficulty === filter)),
    [scope, filter],
  );

  const scorePercent = summary.maxScore > 0 ? (summary.score / summary.maxScore) * 100 : 0;

  const header = (
    <View style={styles.header}>
      <View style={styles.titles}>
        <AppText variant="title">Latihan</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          {phase
            ? `Fase ${phase.order} — ${phase.title}`
            : 'Uji pemahamanmu dengan latihan soal dan tantangan seru.'}
        </AppText>
      </View>

      {error ? <ErrorBanner message={error} /> : null}

      <Card>
        <View style={styles.summaryRow}>
          <View>
            <AppText variant="caption" color={colors.textSecondary}>
              Terselesaikan
            </AppText>
            <AppText variant="title">
              {isLoading ? '-' : summary.solved} / {summary.total}
            </AppText>
          </View>
          <View style={styles.scoreBlock}>
            <AppText variant="caption" color={colors.textSecondary}>
              Skor
            </AppText>
            <AppText variant="title" color={colors.primary}>
              {isLoading ? '-' : summary.score} / {summary.maxScore}
            </AppText>
          </View>
        </View>
        <View style={styles.bar}>
          <ProgressBar value={scorePercent} color={colors.primary} height={8} />
        </View>
      </Card>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {FILTERS.map((level) => (
          <Chip key={level} label={level} selected={filter === level} onPress={() => setFilter(level)} />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <Screen edges={['top']}>
      <ScreenHeader />
      <FlatList
        data={items}
        keyExtractor={(exercise) => exercise.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <AppText variant="body" color={colors.textSecondary} align="center" style={styles.empty}>
            {filter === 'Semua'
              ? 'Belum ada latihan untuk fase ini.'
              : `Belum ada latihan dengan tingkat ${filter}.`}
          </AppText>
        }
        renderItem={({ item, index }) => (
          <ExerciseRow
            number={index + 1}
            exercise={item}
            status={getExerciseStatus(results, item.id)}
            onPress={() => router.push(`/exercise/${item.id}`)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  titles: {
    gap: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreBlock: {
    alignItems: 'flex-end',
  },
  bar: {
    marginTop: spacing.md,
  },
  chips: {
    gap: spacing.sm,
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    paddingTop: spacing.xxl,
  },
});