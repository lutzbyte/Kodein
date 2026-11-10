import { ChevronRight } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { NumberBadge } from '@/components/ui/NumberBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, spacing } from '@/constants/theme';
import type { Phase } from '@/types/content';
import type { PhaseStatusLabel, ProgressSummary } from '@/types/progress';

interface PhaseCardProps {
  phase: Phase;
  summary: ProgressSummary;
  statusLabel: PhaseStatusLabel;
  onPress: () => void;
}

export function PhaseCard({ phase, summary, statusLabel, onPress }: PhaseCardProps) {
  const completed = statusLabel === 'Selesai';

  return (
    <Card onPress={onPress} accessibilityLabel={`Fase ${phase.order}: ${phase.title}`}>
      <View style={styles.row}>
        <NumberBadge value={phase.order} completed={completed} size={36} />
        <View style={styles.texts}>
          <AppText variant="bodyStrong">{phase.title}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            Bahasa: {phase.languages.join(' / ')}
          </AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            {phase.estimatedTime}
          </AppText>
        </View>
        <ChevronRight color={colors.textMuted} size={20} strokeWidth={2.2} />
      </View>

      <View style={styles.progress}>
        <ProgressBar value={summary.percent} />
        <View style={styles.progressLabels}>
          <AppText variant="label" color={colors.textSecondary}>
            {statusLabel}
          </AppText>
          <AppText variant="label" color={colors.textSecondary}>
            {summary.completed}/{summary.total} materi • {summary.percent}%
          </AppText>
        </View>
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
  texts: {
    flex: 1,
    gap: 2,
  },
  progress: {
    marginTop: spacing.md,
    gap: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});