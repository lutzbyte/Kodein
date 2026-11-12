import { ChevronRight, CircleCheck, Wrench } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radius, spacing } from '@/constants/theme';
import { useProjectProgress } from '@/hooks/useProjectProgress';
import type { Project } from '@/types/content';
import { getProjectPercent, isProjectDone } from '@/utils/projects';

interface ProjectRowProps {
  project: Project;
  onPress: () => void;
}

export function ProjectRow({ project, onPress }: ProjectRowProps) {
  const { records } = useProjectProgress();
  const record = records.get(project.id);
  const total = project.checklist.length;
  const percent = getProjectPercent(record, total);
  const done = isProjectDone(record, total);

  return (
    <Card onPress={onPress} accessibilityLabel={`Proyek: ${project.title}`}>
      <View style={styles.row}>
        <View style={[styles.tile, done ? styles.tileDone : styles.tileIdle]}>
          {done ? (
            <CircleCheck color={colors.success} size={22} strokeWidth={2.2} />
          ) : (
            <Wrench color={colors.primary} size={22} strokeWidth={2} />
          )}
        </View>
        <View style={styles.texts}>
          <AppText variant="bodyStrong">{project.title}</AppText>
          <AppText variant="caption" color={colors.textSecondary} numberOfLines={2}>
            {project.description}
          </AppText>
          <View style={styles.meta}>
            <Badge label={project.difficulty} tone={getDifficultyTone(project.difficulty)} />
            {done ? <Badge label="Selesai" tone="success" /> : null}
          </View>
        </View>
        <ChevronRight color={colors.textMuted} size={20} strokeWidth={2.2} />
      </View>

      {percent > 0 ? (
        <View style={styles.progress}>
          <ProgressBar value={percent} color={done ? colors.success : colors.primary} />
          <AppText variant="label" color={colors.textSecondary}>
            {record?.completedItems.length ?? 0}/{total} langkah • {percent}%
          </AppText>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileIdle: {
    backgroundColor: colors.primarySoft,
  },
  tileDone: {
    backgroundColor: colors.successSoft,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  meta: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 4,
  },
  progress: {
    marginTop: spacing.md,
    gap: 6,
  },
});