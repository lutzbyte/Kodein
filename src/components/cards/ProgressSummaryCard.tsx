import { StyleSheet, View } from 'react-native';

import { ProgressBarsIllustration } from '@/components/illustrations/ProgressBarsIllustration';
import { AppText } from '@/components/ui/AppText';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radius, shadows, spacing } from '@/constants/theme';

interface ProgressSummaryCardProps {
  completedPhases: number;
  totalPhases: number;
  percent: number;
}

export function ProgressSummaryCard({
  completedPhases,
  totalPhases,
  percent,
}: ProgressSummaryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.texts}>
          <AppText variant="bodyStrong" color="rgba(255,255,255,0.85)">
            Progress Belajar
          </AppText>
          <AppText variant="title" color={colors.surface}>
            {completedPhases} / {totalPhases} Fase
          </AppText>
        </View>
        <ProgressBarsIllustration size={64} />
      </View>

      <View style={styles.bottom}>
        <View style={styles.bar}>
          <ProgressBar value={percent} color={colors.surface} trackColor="rgba(255,255,255,0.3)" />
        </View>
        <AppText variant="bodyStrong" color={colors.surface}>
          {percent}%
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.card,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  texts: {
    gap: 4,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bar: {
    flex: 1,
  },
});