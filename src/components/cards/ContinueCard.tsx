import { Code, Play } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { colors, radius, spacing } from '@/constants/theme';

interface ContinueCardProps {
  phaseLabel: string;
  title: string;
  subtitle: string;
  percent: number;
  onPress: () => void;
}

export function ContinueCard({ phaseLabel, title, subtitle, percent, onPress }: ContinueCardProps) {
  return (
    <Card onPress={onPress} accessibilityLabel={`Lanjut belajar: ${title}`}>
      <View style={styles.row}>
        <View style={styles.tile}>
          <Code color={colors.primary} size={26} strokeWidth={2.2} />
        </View>
        <View style={styles.texts}>
          <AppText variant="label" color={colors.primary}>
            {phaseLabel}
          </AppText>
          <AppText variant="bodyStrong" numberOfLines={2}>
            {title}
          </AppText>
          <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
            {subtitle}
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mulai materi"
          onPress={onPress}
          style={styles.play}
        >
          <Play color={colors.surface} size={18} strokeWidth={2.4} fill={colors.surface} />
        </Pressable>
      </View>
      <View style={styles.progress}>
        <ProgressBar value={percent} />
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
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  play: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    marginTop: spacing.md,
  },
});