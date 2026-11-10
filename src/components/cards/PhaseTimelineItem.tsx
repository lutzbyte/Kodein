import { Check } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/theme';
import type { Phase } from '@/types/content';

interface PhaseTimelineItemProps {
  phase: Phase;
  completed: boolean;
  isLast: boolean;
  onPress: () => void;
}

export function PhaseTimelineItem({ phase, completed, isLast, onPress }: PhaseTimelineItemProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <View style={styles.rail}>
        <View style={[styles.node, completed ? styles.nodeDone : styles.nodeIdle]}>
          {completed ? <Check color={colors.surface} size={14} strokeWidth={3} /> : null}
        </View>
        {!isLast ? <View style={styles.line} /> : null}
      </View>
      <View style={[styles.texts, !isLast && styles.textsSpaced]}>
        <AppText variant="bodyStrong">
          Fase {phase.order} — {phase.title}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Bahasa: {phase.languages.join(' / ')}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  rail: {
    alignItems: 'center',
    width: 24,
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeDone: {
    backgroundColor: colors.success,
  },
  nodeIdle: {
    borderWidth: 2,
    borderColor: colors.disabled,
    backgroundColor: colors.surface,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 2,
  },
  texts: {
    flex: 1,
    gap: 2,
    paddingTop: 2,
  },
  textsSpaced: {
    paddingBottom: 18,
  },
});