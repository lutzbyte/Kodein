import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { AdBanner } from '@/components/ads/AdBanner';
import { PhaseCard } from '@/components/cards/PhaseCard';
import { MountainIllustration } from '@/components/illustrations/MountainIllustration';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { useProgress } from '@/hooks/useProgress';
import type { LevelFilter } from '@/types/content';
import { matchesLevel } from '@/utils/content';
import { getPhaseProgress, getPhaseStatusLabel } from '@/utils/progress';

const LEVEL_FILTERS: LevelFilter[] = ['Semua', 'Beginner', 'Intermediate', 'Advanced'];

export default function RoadmapScreen() {
  const router = useRouter();
  const progress = useProgress();
  const [filter, setFilter] = useState<LevelFilter>('Semua');

  const visiblePhases = useMemo(
    () => phases.filter((phase) => matchesLevel(phase.level, filter)),
    [filter],
  );

  return (
    <Screen dark edges={['top']}>
      <View style={styles.header}>
        <View style={styles.art}>
          <MountainIllustration height={110} />
        </View>
        <View style={styles.headerText}>
          <AppText variant="display" color={colors.dark.text}>
            Roadmap Belajar
          </AppText>
          <AppText variant="body" color={colors.dark.textMuted}>
            {phases.length} Fase menuju Programmer Expert
          </AppText>
        </View>
      </View>

      <View style={styles.sheet}>
        <FlatList
          data={visiblePhases}
          keyExtractor={(phase) => phase.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              style={styles.filtersWrapper}
            >
              {LEVEL_FILTERS.map((level) => (
                <Chip
                  key={level}
                  label={level}
                  selected={filter === level}
                  onPress={() => setFilter(level)}
                />
              ))}
            </ScrollView>
          }
          ListFooterComponent={<AdBanner />}
          ListEmptyComponent={
            <AppText variant="body" color={colors.textSecondary} align="center">
              Belum ada fase untuk level ini.
            </AppText>
          }
          renderItem={({ item }) => (
            <PhaseCard
              phase={item}
              summary={getPhaseProgress(item, progress)}
              statusLabel={getPhaseStatusLabel(item, progress)}
              onPress={() => router.push(`/phase/${item.id}`)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    justifyContent: 'flex-end',
  },
  art: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-start',
  },
  headerText: {
    marginTop: 84,
    gap: 2,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    overflow: 'hidden',
  },
  list: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  filtersWrapper: {
    marginBottom: spacing.lg,
  },
  filters: {
    gap: spacing.sm,
  },
  separator: {
    height: spacing.md,
  },
});