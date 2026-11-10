import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius } from '@/constants/theme';
import type { Difficulty } from '@/types/content';

export type BadgeTone = 'success' | 'primary' | 'warning' | 'danger' | 'neutral';

const TONES: Record<BadgeTone, { background: string; foreground: string }> = {
  success: { background: colors.successSoft, foreground: '#15803D' },
  primary: { background: colors.primarySoft, foreground: colors.primary },
  warning: { background: colors.warningSoft, foreground: colors.warning },
  danger: { background: colors.dangerSoft, foreground: colors.danger },
  neutral: { background: colors.surfaceMuted, foreground: colors.textSecondary },
};

export function getDifficultyTone(difficulty: Difficulty): BadgeTone {
  switch (difficulty) {
    case 'Easy':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'Hard':
      return 'danger';
  }
}

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const palette = TONES[tone];

  return (
    <View style={[styles.base, { backgroundColor: palette.background }]}>
      <AppText variant="label" color={palette.foreground}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
});