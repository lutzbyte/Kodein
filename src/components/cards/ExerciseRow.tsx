import { ChevronRight, ClipboardList } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { colors, radius, spacing } from '@/constants/theme';
import type { Exercise } from '@/types/content';

interface ExerciseRowProps {
  number: number;
  exercise: Exercise;
  onPress: () => void;
}

export function ExerciseRow({ number, exercise, onPress }: ExerciseRowProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={`Latihan ${number}: ${exercise.title}`}>
      <View style={styles.row}>
        <View style={styles.tile}>
          <ClipboardList color={colors.primary} size={22} strokeWidth={2} />
        </View>
        <View style={styles.texts}>
          <AppText variant="caption" color={colors.textMuted}>
            Latihan {number}
          </AppText>
          <AppText variant="bodyStrong">{exercise.title}</AppText>
          <View style={styles.meta}>
            <Badge label={exercise.difficulty} tone={getDifficultyTone(exercise.difficulty)} />
            <AppText variant="caption" color={colors.textSecondary}>
              {exercise.durationMinutes} menit
            </AppText>
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
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
});