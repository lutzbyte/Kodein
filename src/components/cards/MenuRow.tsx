import { ChevronRight } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, spacing } from '@/constants/theme';

interface MenuRowProps {
  icon: ReactNode;
  label: string;
  value?: string;
  isLast?: boolean;
  onPress?: () => void;
}

export function MenuRow({ icon, label, value, isLast = false, onPress }: MenuRowProps) {
  const content = (
    <>
      <View style={styles.icon}>{icon}</View>
      <AppText variant="body" style={styles.label}>
        {label}
      </AppText>
      {value ? (
        <AppText variant="caption" color={colors.textSecondary}>
          {value}
        </AppText>
      ) : null}
      {onPress ? <ChevronRight color={colors.textMuted} size={18} strokeWidth={2.2} /> : null}
    </>
  );

  if (!onPress) {
    return <View style={[styles.row, !isLast && styles.divider]}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, !isLast && styles.divider, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 16,
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
  label: {
    flex: 1,
  },
});