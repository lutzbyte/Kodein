import { BookOpen, CircleCheck, CircleX } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, spacing } from '@/constants/theme';
import type { HistoryEntry } from '@/types/progress';
import { findLesson, getExerciseById, getPhaseById } from '@/utils/content';
import { formatRelativeTime } from '@/utils/time';

interface HistoryRowProps {
  entry: HistoryEntry;
  isLast?: boolean;
  onPress: () => void;
}

function describe(entry: HistoryEntry): { title: string; subtitle: string; tone: 'done' | 'start' | 'wrong' } {
  if (entry.type === 'exercise_submitted') {
    const exercise = getExerciseById(entry.exerciseId);
    return {
      title: exercise?.title ?? 'Latihan tidak tersedia',
      subtitle: `Latihan • ${entry.correct ? 'Jawaban benar' : 'Jawaban belum tepat'}`,
      tone: entry.correct ? 'done' : 'wrong',
    };
  }

  const found = findLesson(entry.lessonId);
  const phase = found?.phase ?? getPhaseById(entry.phaseId);
  const action = entry.type === 'lesson_completed' ? 'Materi selesai' : 'Mulai belajar';
  return {
    title: found?.lesson.title ?? 'Materi tidak tersedia',
    subtitle: phase ? `${action} • ${phase.title}` : action,
    tone: entry.type === 'lesson_completed' ? 'done' : 'start',
  };
}

export function HistoryRow({ entry, isLast = false, onPress }: HistoryRowProps) {
  const { title, subtitle, tone } = describe(entry);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, !isLast && styles.divider, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.icon,
          tone === 'done' && styles.iconDone,
          tone === 'start' && styles.iconStart,
          tone === 'wrong' && styles.iconWrong,
        ]}
      >
        {tone === 'done' ? (
          <CircleCheck color={colors.success} size={20} strokeWidth={2.2} />
        ) : tone === 'wrong' ? (
          <CircleX color={colors.danger} size={20} strokeWidth={2.2} />
        ) : (
          <BookOpen color={colors.primary} size={20} strokeWidth={2.2} />
        )}
      </View>
      <View style={styles.texts}>
        <AppText variant="bodyStrong" numberOfLines={2}>
          {title}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
          {subtitle} • {formatRelativeTime(entry.createdAt)}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.primarySoft,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDone: {
    backgroundColor: colors.successSoft,
  },
  iconStart: {
    backgroundColor: colors.primarySoft,
  },
  iconWrong: {
    backgroundColor: colors.dangerSoft,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
});