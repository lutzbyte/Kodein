import { CircleAlert } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius } from '@/constants/theme';

interface ErrorBannerProps {
  message: string;
  onDark?: boolean;
}

export function ErrorBanner({ message, onDark = false }: ErrorBannerProps) {
  const textColor = onDark ? '#FECACA' : colors.danger;

  return (
    <View
      accessibilityRole="alert"
      style={[styles.container, onDark ? styles.onDark : styles.onLight]}
    >
      <CircleAlert color={textColor} size={18} strokeWidth={2.2} />
      <AppText variant="caption" color={textColor} style={styles.text}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  onDark: {
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    borderColor: 'rgba(248, 113, 113, 0.4)',
  },
  onLight: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  text: {
    flex: 1,
  },
});