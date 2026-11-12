import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { AdBanner } from '@/components/ads/AdBanner';
import { ProjectRow } from '@/components/cards/ProjectRow';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { projects } from '@/data/projects';
import { useProjectProgress } from '@/hooks/useProjectProgress';
import type { Difficulty } from '@/types/content';
import { isProjectDone } from '@/utils/projects';

type DifficultyFilter = 'Semua' | Difficulty;

const FILTERS: DifficultyFilter[] = ['Semua', 'Easy', 'Medium', 'Hard'];

export default function ProjectListScreen() {
  const router = useRouter();
  const { records, isLoading, error } = useProjectProgress();
  const [filter, setFilter] = useState<DifficultyFilter>('Semua');

  const doneCount = useMemo(
    () => projects.filter((project) => isProjectDone(records.get(project.id), project.checklist.length)).length,
    [records],
  );

  const items = useMemo(
    () => (filter === 'Semua' ? projects : projects.filter((project) => project.difficulty === filter)),
    [filter],
  );

  const header = (
    <View style={styles.header}>
      <View style={styles.titles}>
        <AppText variant="title">Proyek</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Terapkan ilmumu lewat mini proyek di setiap fase.
        </AppText>
      </View>

      {error ? <ErrorBanner message={error} /> : null}

      <Card>
        <View style={styles.summaryRow}>
          <AppText variant="bodyStrong">Proyek selesai</AppText>
          <AppText variant="bodyStrong" color={colors.primary}>
            {isLoading ? '-' : doneCount} / {projects.length}
          </AppText>
        </View>
        <View style={styles.bar}>
          <ProgressBar
            value={projects.length > 0 ? (doneCount / projects.length) * 100 : 0}
            color={colors.primary}
            height={8}
          />
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
        keyExtractor={(project) => project.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={header}
        ListFooterComponent={<AdBanner />}
        ListEmptyComponent={
          <AppText variant="body" color={colors.textSecondary} align="center" style={styles.empty}>
            Belum ada proyek dengan tingkat {filter}.
          </AppText>
        }
        renderItem={({ item }) => (
          <ProjectRow project={item} onPress={() => router.push(`/project/${item.id}`)} />
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