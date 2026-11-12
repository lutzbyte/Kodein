import { useRouter } from 'expo-router';
import { Bookmark } from 'lucide-react-native';
import { useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { LessonRow } from '@/components/cards/LessonRow';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { resources } from '@/data/resources';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useOpenResource } from '@/hooks/useOpenResource';
import { useProgress } from '@/hooks/useProgress';
import { findLesson } from '@/utils/content';
import { getLessonStatus } from '@/utils/progress';

export default function BookmarksScreen() {
  const router = useRouter();
  const openResource = useOpenResource();
  const progress = useProgress();
  const { resourceIds, lessonIds, isLoading, error } = useBookmarks();

  const savedResources = useMemo(
    () => resources.filter((resource) => resourceIds.has(resource.id)),
    [resourceIds],
  );

  const savedLessons = useMemo(
    () =>
      Array.from(lessonIds)
        .map((lessonId) => findLesson(lessonId))
        .filter((found): found is NonNullable<ReturnType<typeof findLesson>> => found !== undefined),
    [lessonIds],
  );

  const isEmpty = savedLessons.length === 0 && savedResources.length === 0;

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <AppText variant="title">Bookmark</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              Materi dan resource yang kamu simpan untuk nanti.
            </AppText>
            {error ? <ErrorBanner message={error} /> : null}
          </View>

          {isEmpty && !error ? (
            <EmptyState
              icon={<Bookmark color={colors.primary} size={30} strokeWidth={2} />}
              title="Belum ada bookmark"
              description="Ketuk ikon bookmark pada sebuah materi atau resource untuk menyimpannya di sini."
            />
          ) : null}

          {savedLessons.length > 0 ? (
            <View style={styles.section}>
              <AppText variant="heading">Materi</AppText>
              <Card padded={false}>
                {savedLessons.map(({ lesson }, index) => (
                  <LessonRow
                    key={lesson.id}
                    title={lesson.title}
                    status={getLessonStatus(progress, lesson.id)}
                    isLast={index === savedLessons.length - 1}
                    onPress={() => router.push(`/lesson/${lesson.id}`)}
                  />
                ))}
              </Card>
            </View>
          ) : null}

          {savedResources.length > 0 ? (
            <View style={styles.section}>
              <AppText variant="heading">Resource</AppText>
              {savedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onPress={() => openResource(resource)}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>
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
  content: {
    flexGrow: 1,
    padding: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
  },
  section: {
    gap: spacing.md,
  },
});