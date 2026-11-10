import { ChevronRight, Circle, CircleCheck, CirclePlay } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, spacing } from '@/constants/theme';
import type { LessonStatus } from '@/types/content';

interface LessonRowProps {
  title: string;
  status: LessonStatus;
  isLast?: boolean;
  onPress: () => void;
}

function StatusIcon({ status }: { status: LessonStatus }) {
  switch (status) {
    case 'completed':
      return <CircleCheck color={colors.success} size={22} strokeWidth={2.2} />;
    case 'in_progress':
      return <CirclePlay color={colors.primary} size={22} strokeWidth={2.2} />;
    case 'not_started':
      return <Circle color={colors.disabled} size={22} strokeWidth={2} />;
  }
}

export function LessonRow({ title, status, isLast = false, onPress }: LessonRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, !isLast && styles.divider, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <StatusIcon status={status} />
      </View>
      <AppText
        variant="body"
        color={status === 'not_started' ? colors.textPrimary : colors.textPrimary}
        style={styles.title}
      >
        {title}
      </AppText>
      <ChevronRight color={colors.textMuted} size={18} strokeWidth={2.2} />
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
    width: 24,
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
});