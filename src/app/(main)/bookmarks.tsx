import { Bookmark } from 'lucide-react-native';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { ResourceCard } from '@/components/cards/ResourceCard';
import { AppText } from '@/components/ui/AppText';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { resources } from '@/data/resources';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useOpenResource } from '@/hooks/useOpenResource';

export default function BookmarksScreen() {
  const openResource = useOpenResource();
  const { resourceIds, isLoading, error } = useBookmarks();

  const saved = useMemo(
    () => resources.filter((resource) => resourceIds.has(resource.id)),
    [resourceIds],
  );

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(resource) => resource.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <View style={styles.header}>
              <AppText variant="title">Bookmark</AppText>
              <AppText variant="body" color={colors.textSecondary}>
                Resource yang kamu simpan untuk dibaca nanti.
              </AppText>
              {error ? <ErrorBanner message={error} /> : null}
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              icon={<Bookmark color={colors.primary} size={30} strokeWidth={2} />}
              title="Belum ada bookmark"
              description="Ketuk ikon bookmark pada sebuah resource untuk menyimpannya di sini."
            />
          }
          renderItem={({ item }) => <ResourceCard resource={item} onPress={() => openResource(item)} />}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexGrow: 1,
    padding: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
});