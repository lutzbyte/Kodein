import { useLocalSearchParams } from 'expo-router';
import { Circle, CircleCheck, PartyPopper, Search } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, radius, spacing } from '@/constants/theme';
import { useProjectProgress } from '@/hooks/useProjectProgress';
import { getProjectById } from '@/utils/content';
import { getProjectPercent, isProjectDone } from '@/utils/projects';

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

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { records, error, isLoading, isPending, toggleItem } = useProjectProgress();

  const project = getProjectById(id);

  if (!project) {
    return (
      <Screen>
        <ScreenHeader />
        <EmptyState
          icon={<Search color={colors.primary} size={30} strokeWidth={2} />}
          title="Proyek tidak ditemukan"
          description="Proyek yang kamu cari tidak tersedia. Kembali dan pilih proyek lain."
        />
      </Screen>
    );
  }

  const record = records.get(project.id);
  const total = project.checklist.length;
  const percent = getProjectPercent(record, total);
  const done = isProjectDone(record, total);
  const saving = isPending(project.id);
  const checked = new Set(record?.completedItems ?? []);

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.titleBlock}>
          <View style={styles.badges}>
            <Badge label={project.difficulty} tone={getDifficultyTone(project.difficulty)} />
            {done ? <Badge label="Selesai" tone="success" /> : null}
          </View>
          <AppText variant="title">{project.title}</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            {project.description}
          </AppText>
        </View>

        {error ? <ErrorBanner message={error} /> : null}

        <View style={styles.block}>
          <AppText variant="heading">Tujuan</AppText>
          <BulletList items={project.goals} />
        </View>

        <View style={styles.block}>
          <AppText variant="heading">Teknologi</AppText>
          <View style={styles.tech}>
            {project.technologies.map((technology) => (
              <Badge key={technology} label={technology} tone="primary" />
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <AppText variant="heading">Persyaratan</AppText>
          <BulletList items={project.requirements} />
        </View>

        <View style={styles.block}>
          <View style={styles.checklistHeader}>
            <AppText variant="heading">Checklist</AppText>
            <AppText variant="bodyStrong" color={done ? colors.success : colors.primary}>
              {percent}%
            </AppText>
          </View>
          <ProgressBar value={percent} color={done ? colors.success : colors.primary} height={8} />

          {done ? (
            <View style={styles.doneCard}>
              <PartyPopper color={colors.success} size={22} strokeWidth={2.2} />
              <AppText variant="bodyStrong" color="#15803D" style={styles.doneText}>
                Proyek selesai! Semua langkah sudah kamu kerjakan.
              </AppText>
            </View>
          ) : null}

          <Card padded={false}>
            {project.checklist.map((item, index) => {
              const itemDone = checked.has(index);
              return (
                <Pressable
                  key={index}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: itemDone, disabled: saving || isLoading }}
                  disabled={saving || isLoading}
                  onPress={() => toggleItem(project, index)}
                  style={[
                    styles.checkRow,
                    index < total - 1 && styles.checkDivider,
                    (saving || isLoading) && styles.checkDisabled,
                  ]}
                >
                  {itemDone ? (
                    <CircleCheck color={colors.success} size={22} strokeWidth={2.2} />
                  ) : (
                    <Circle color={colors.disabled} size={22} strokeWidth={2} />
                  )}
                  <AppText
                    variant="body"
                    color={itemDone ? colors.textSecondary : colors.textPrimary}
                    style={styles.checkLabel}
                  >
                    {item}
                  </AppText>
                </Pressable>
              );
            })}
          </Card>
        </View>
      </ScrollView>
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
    gap: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  block: {
    gap: spacing.md,
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
  tech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.successSoft,
  },
  doneText: {
    flex: 1,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  checkDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkDisabled: {
    opacity: 0.6,
  },
  checkLabel: {
    flex: 1,
  },
});