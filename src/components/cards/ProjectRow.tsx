import { ChevronRight, Wrench } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { colors, radius, spacing } from '@/constants/theme';
import type { Project } from '@/types/content';

interface ProjectRowProps {
  project: Project;
  onPress: () => void;
}

export function ProjectRow({ project, onPress }: ProjectRowProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={`Proyek: ${project.title}`}>
      <View style={styles.row}>
        <View style={styles.tile}>
          <Wrench color={colors.primary} size={22} strokeWidth={2} />
        </View>
        <View style={styles.texts}>
          <AppText variant="bodyStrong">{project.title}</AppText>
          <AppText variant="caption" color={colors.textSecondary} numberOfLines={2}>
            {project.description}
          </AppText>
          <View style={styles.meta}>
            <Badge label={project.difficulty} tone={getDifficultyTone(project.difficulty)} />
          </View>
        </View>
        <ChevronRight color={colors.textMuted} size={20} strokeWidth={2.2} />
      </View>
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
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  meta: {
    flexDirection: 'row',
    marginTop: 4,
  },
});