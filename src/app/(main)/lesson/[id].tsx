import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { BookOpen, Bookmark, Search, Target } from 'lucide-react-native';

import { ResourceCard } from '@/components/cards/ResourceCard';
import { AppText } from '@/components/ui/AppText';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useLearningActions } from '@/hooks/useLearningActions';
import { useOpenResource } from '@/hooks/useOpenResource';
import { useProgress } from '@/hooks/useProgress';
import { findLesson, getLessonContent, getResourcesByLesson } from '@/utils/content';

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bullets}>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <AppText variant="body" style={styles.bulletText}>
            {item}
          </AppText>
        </View>
      ))}
    </View>
  );
}

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const openResource = useOpenResource();
  const progress = useProgress();
  const { startLesson, completeLesson, reopenLesson, isPending } = useLearningActions();
  const { isLessonBookmarked, isLessonPending, toggleLesson } = useBookmarks();

  const found = findLesson(id);
  const lessonId = found?.lesson.id;
  const phaseId = found?.phase.id;

  // Membuka materi = mulai dipelajari. Menunggu data progress siap agar status
  // materi yang sudah selesai tidak tertimpa.
  useEffect(() => {
    if (progress.isLoading || !lessonId || !phaseId) return;
    startLesson(lessonId, phaseId);
  }, [progress.isLoading, lessonId, phaseId, startLesson]);

  if (!found) {
    return (
      <Screen>
        <ScreenHeader />
        <EmptyState
          icon={<Search color={colors.primary} size={30} strokeWidth={2} />}
          title="Materi tidak ditemukan"
          description="Materi yang kamu cari tidak tersedia. Kembali dan pilih materi lain."
        />
      </Screen>
    );
  }

  const { lesson, phase, index } = found;
  const content = getLessonContent(lesson.id);
  const relatedResources = getResourcesByLesson(lesson.id);
  const previous = index > 0 ? phase.lessons[index - 1] : undefined;
  const next = index < phase.lessons.length - 1 ? phase.lessons[index + 1] : undefined;

  const completed = progress.completedLessonIds.has(lesson.id);
  const saving = isPending(lesson.id);
  const bookmarked = isLessonBookmarked(lesson.id);
  const bookmarkPending = isLessonPending(lesson.id);

  const bookmarkButton = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={bookmarked ? 'Hapus bookmark materi' : 'Simpan materi ke bookmark'}
      hitSlop={12}
      disabled={bookmarkPending}
      onPress={() => toggleLesson(lesson.id)}
      style={styles.bookmark}
    >
      {bookmarkPending ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <Bookmark
          color={bookmarked ? colors.primary : colors.textPrimary}
          fill={bookmarked ? colors.primary : 'transparent'}
          size={24}
          strokeWidth={2.2}
        />
      )}
    </Pressable>
  );

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader right={bookmarkButton} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.titleBlock}>
          <AppText variant="caption" color={colors.textSecondary}>
            Materi • Fase {phase.order}
          </AppText>
          <AppText variant="title">{lesson.title}</AppText>
        </View>

        {content ? (
          <>
            <AppText variant="body">{content.description}</AppText>

            <Card>
              <View style={styles.cardTitle}>
                <Target color={colors.primary} size={20} strokeWidth={2.2} />
                <AppText variant="heading">Tujuan Pembelajaran</AppText>
              </View>
              <BulletList items={content.objectives} />
            </Card>

            <View style={styles.block}>
              <AppText variant="heading">Penjelasan</AppText>
              {content.explanation.map((paragraph, paragraphIndex) => (
                <AppText key={paragraphIndex} variant="body" color={colors.textPrimary}>
                  {paragraph}
                </AppText>
              ))}
            </View>

            {content.codeExample ? (
              <View style={styles.block}>
                <CodeBlock
                  title="Contoh Kode:"
                  language={content.codeExample.language}
                  code={content.codeExample.code}
                />
                <AppText variant="heading">Penjelasan Kode</AppText>
                <BulletList items={content.codeExample.explanation} />

                {content.codeExample.output ? (
                  <View style={styles.block}>
                    <AppText variant="heading">Output</AppText>
                    <CodeBlock code={content.codeExample.output} />
                  </View>
                ) : null}
              </View>
            ) : null}

            {content.sections && content.sections.length > 0 ? (
              <View style={styles.block}>
                <AppText variant="heading">{content.sectionsTitle ?? 'Pembahasan'}</AppText>
                <Card padded={false}>
                  {content.sections.map((section, sectionIndex) => (
                    <AccordionItem
                      key={section.title}
                      title={section.title}
                      body={section.body}
                      isLast={sectionIndex === content.sections!.length - 1}
                    />
                  ))}
                </Card>
              </View>
            ) : null}

            <View style={styles.noteCard}>
              <AppText variant="heading">Catatan Penting</AppText>
              <BulletList items={content.notes} />
            </View>
          </>
        ) : (
          <EmptyState
            icon={<BookOpen color={colors.primary} size={30} strokeWidth={2} />}
            title="Materi sedang disusun"
            description="Penjelasan lengkap untuk materi ini belum tersedia."
          />
        )}

        {relatedResources.length > 0 ? (
          <View style={styles.block}>
            <AppText variant="heading">Resource Terkait</AppText>
            {relatedResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onPress={() => openResource(resource)}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {completed ? (
          <Button
            title="Tandai Belum Selesai"
            variant="outline"
            loading={saving}
            onPress={() => reopenLesson(lesson.id)}
          />
        ) : (
          <Button
            title="Tandai Selesai"
            loading={saving}
            disabled={progress.isLoading}
            onPress={() => completeLesson(lesson.id, phase.id)}
          />
        )}

        <View style={styles.footerRow}>
          <Button
            title="Sebelumnya"
            variant="outline"
            disabled={!previous}
            style={styles.footerButton}
            onPress={() => previous && router.replace(`/lesson/${previous.id}`)}
          />
          <Button
            title={next ? 'Selanjutnya' : 'Kembali ke Fase'}
            variant="outline"
            style={styles.footerButton}
            onPress={() =>
              next ? router.replace(`/lesson/${next.id}`) : router.replace(`/phase/${phase.id}`)
            }
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  titleBlock: {
    gap: 4,
  },
  block: {
    gap: spacing.md,
  },
  bookmark: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  bullets: {
    gap: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
  },
  noteCard: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  footer: {
    gap: spacing.md,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  footerRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});