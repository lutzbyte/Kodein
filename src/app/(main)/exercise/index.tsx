import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { ExerciseRow } from '@/components/cards/ExerciseRow';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import type { Difficulty } from '@/types/content';
import { getExercises, getPhaseById } from '@/utils/content';

type DifficultyFilter = 'Semua' | Difficulty;

const FILTERS: DifficultyFilter[] = ['Semua', 'Easy', 'Medium', 'Hard'];

export default function ExerciseListScreen() {
  const { phaseId } = useLocalSearchParams<{ phaseId?: string }>();
  const router = useRouter();
  const [filter, setFilter] = useState<DifficultyFilter>('Semua');

  const phase = getPhaseById(phaseId);

  const items = useMemo(() => {
    const all = getExercises(phase?.id);
    return filter === 'Semua' ? all : all.filter((exercise) => exercise.difficulty === filter);
  }, [phase?.id, filter]);

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