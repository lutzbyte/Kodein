import { useRouter } from 'expo-router';
import { History } from 'lucide-react-native';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { HistoryRow } from '@/components/cards/HistoryRow';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { useHistory } from '@/hooks/useHistory';
import { getHistoryHref } from '@/utils/history';

export default function HistoryScreen() {
  const router = useRouter();
  const { entries, isLoading, error } = useHistory(50);

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(entry) => entry.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <AppText variant="title">Riwayat Belajar</AppText>
              <AppText variant="body" color={colors.textSecondary}>
                Materi dan latihan yang kamu kerjakan, dari yang terbaru.
              </AppText>
              {error ? <ErrorBanner message={error} /> : null}
            </View>
          }
          ListEmptyComponent={
            error ? undefined : (
              <EmptyState
                icon={<History color={colors.primary} size={30} strokeWidth={2} />}
                title="Belum ada riwayat"
                description="Materi dan latihan yang kamu kerjakan akan tercatat di sini."
              />
            )
          }
          renderItem={({ item }) => (
            <Card padded={false} style={styles.item}>
              <HistoryRow entry={item} isLast onPress={() => router.push(getHistoryHref(item))} />
            </Card>
          )}
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
  item: {
    marginBottom: spacing.md,
  },
});
