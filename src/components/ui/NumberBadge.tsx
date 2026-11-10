import { Check } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/theme';

interface NumberBadgeProps {
  value: number;
  size?: number;
  completed?: boolean;
}

export function NumberBadge({ value, size = 32, completed = false }: NumberBadgeProps) {
  const dimension = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View
      style={[
        styles.base,
        dimension,
        { backgroundColor: completed ? colors.success : colors.primary },
      ]}
    >
      {completed ? (
        <Check color={colors.surface} size={size * 0.55} strokeWidth={3} />
      ) : (
        <AppText
          variant="bodyStrong"
          color={colors.surface}
          style={{ fontSize: size * 0.45, lineHeight: size * 0.6 }}
        >
          {value}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});