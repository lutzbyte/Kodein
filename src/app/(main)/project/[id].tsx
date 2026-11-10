import { useLocalSearchParams } from 'expo-router';
import { Circle, CircleCheck, Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, layout, spacing } from '@/constants/theme';
import { getProjectById } from '@/utils/content';

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
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

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

  const percent = Math.round((checkedItems.length / project.checklist.length) * 100);

  const toggle = (index: number) => {
    setCheckedItems((previous) =>
      previous.includes(index) ? previous.filter((item) => item !== index) : [...previous, index],
    );
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.titleBlock}>
          <Badge label={project.difficulty} tone={getDifficultyTone(project.difficulty)} />
          <AppText variant="title">{project.title}</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            {project.description}
          </AppText>
        </View>

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
            <AppText variant="bodyStrong" color={colors.primary}>
              {percent}%
            </AppText>
          </View>
          <ProgressBar value={percent} height={8} />
          <Card padded={false}>
            {project.checklist.map((item, index) => {
              const done = checkedItems.includes(index);
              return (
                <Pressable
                  key={index}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: done }}
                  onPress={() => toggle(index)}
                  style={[styles.checkRow, index < project.checklist.length - 1 && styles.checkDivider]}
                >
                  {done ? (
                    <CircleCheck color={colors.success} size={22} strokeWidth={2.2} />
                  ) : (
                    <Circle color={colors.disabled} size={22} strokeWidth={2} />
                  )}
                  <AppText
                    variant="body"
                    color={done ? colors.textSecondary : colors.textPrimary}
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
  checkLabel: {
    flex: 1,
  },
});