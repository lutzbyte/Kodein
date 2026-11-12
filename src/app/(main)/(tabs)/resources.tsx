import { SlidersHorizontal } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { NativeAdCard } from '@/components/ads/NativeAdCard';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { ResourceFilterSheet } from '@/components/sheets/ResourceFilterSheet';
import { AppText } from '@/components/ui/AppText';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { SearchInput } from '@/components/ui/SearchInput';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { phases } from '@/data/phases';
import { resources } from '@/data/resources';
import { useAds } from '@/hooks/useAds';
import { useOpenResource } from '@/hooks/useOpenResource';
import { useProgress } from '@/hooks/useProgress';
import type { Resource } from '@/types/content';
import { findLesson } from '@/utils/content';
import {
  DEFAULT_RESOURCE_FILTERS,
  countAdvancedFilters,
  filterResources,
  getRecommendedResources,
  hasActiveFilters,
  type ResourceFilters,
  type TypeFilter,
} from '@/utils/resources';

const TYPE_FILTERS: TypeFilter[] = ['Semua', 'YouTube', 'Artikel', 'Dokumentasi', 'Buku', 'Kursus'];

/** Satu iklan native disisipkan setiap sekian resource. */
const AD_EVERY = 5;

type ListItem =
  | { kind: 'resource'; key: string; resource: Resource }
  | { kind: 'ad'; key: string };

export default function ResourcesScreen() {
  const openResource = useOpenResource();
  const progress = useProgress();
  const { ready: adsReady } = useAds();
  const [filters, setFilters] = useState<ResourceFilters>(DEFAULT_RESOURCE_FILTERS);
  const [filterVisible, setFilterVisible] = useState(false);

  const filtered = useMemo(() => filterResources(resources, filters), [filters]);
  const advancedCount = countAdvancedFilters(filters);

  const recommendedPhase = useMemo(() => {
    const last = findLesson(progress.lastLessonId);
    return last?.phase ?? phases[0];
  }, [progress.lastLessonId]);

  const recommended = useMemo(
    () => getRecommendedResources(resources, recommendedPhase.id),
    [recommendedPhase.id],
  );

  const showRecommendations = !hasActiveFilters(filters) && recommended.length > 0;

  const items = useMemo<ListItem[]>(() => {
    const list: ListItem[] = [];
    filtered.forEach((resource, index) => {
      list.push({ kind: 'resource', key: resource.id, resource });
      if (adsReady && (index + 1) % AD_EVERY === 0 && index + 1 < filtered.length) {
        list.push({ kind: 'ad', key: `ad-${index}` });
      }
    });
    return list;
  }, [filtered, adsReady]);

  const header = (
    <View style={styles.header}>
      <View style={styles.titles}>
        <AppText variant="title">Resource</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Kumpulan sumber belajar terbaik untuk mendukung belajarmu.
        </AppText>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <SearchInput
            value={filters.query}
            onChangeText={(query) => setFilters((previous) => ({ ...previous, query }))}
            placeholder="Cari resource..."
          />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filter resource"
          onPress={() => setFilterVisible(true)}
          style={[styles.filterButton, advancedCount > 0 && styles.filterButtonActive]}
        >
          <SlidersHorizontal
            color={advancedCount > 0 ? colors.surface : colors.textPrimary}
            size={20}
            strokeWidth={2.2}
          />
          {advancedCount > 0 ? (
            <View style={styles.filterBadge}>
              <AppText variant="label" color={colors.primary} style={styles.filterBadgeText}>
                {advancedCount}
              </AppText>
            </View>
          ) : null}
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {TYPE_FILTERS.map((type) => (
          <Chip
            key={type}
            label={type}
            selected={filters.type === type}
            onPress={() => setFilters((previous) => ({ ...previous, type }))}
          />
        ))}
      </ScrollView>

      {showRecommendations ? (
        <View style={styles.recommendations}>
          <View>
            <AppText variant="heading">Rekomendasi</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Untuk {recommendedPhase.title}
            </AppText>
          </View>
          {recommended.map((resource) => (
            <ResourceCard
              key={`rec-${resource.id}`}
              resource={resource}
              onPress={() => openResource(resource)}
            />
          ))}
        </View>
      ) : null}

      <AppText variant="heading">Semua Sumber ({filtered.length})</AppText>
    </View>
  );

  return (
    <Screen edges={['top']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <AppText variant="body" color={colors.textSecondary} align="center" style={styles.empty}>
            {filters.type === 'YouTube'
              ? 'Tidak ada resource YouTube yang cocok dengan filter ini.'
              : 'Tidak ada resource yang cocok dengan pencarian atau filter ini.'}
          </AppText>
        }
        renderItem={({ item }) =>
          item.kind === 'ad' ? (
            <NativeAdCard />
          ) : (
            <ResourceCard resource={item.resource} onPress={() => openResource(item.resource)} />
          )
        }
      />

      <ResourceFilterSheet
        visible={filterVisible}
        value={filters}
        onClose={() => setFilterVisible(false)}
        onApply={setFilters}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  titles: {
    gap: 4,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    lineHeight: 12,
  },
  chips: {
    gap: spacing.sm,
  },
  recommendations: {
    gap: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
  empty: {
    paddingTop: spacing.xxl,
  },
});