import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout } from '@/constants/theme';

interface ScreenHeaderProps {
  right?: ReactNode;
  dark?: boolean;
  padded?: boolean;
}

export function ScreenHeader({ right, dark = false, padded = true }: ScreenHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  return (
    <View style={[styles.row, padded && styles.padded]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Kembali"
        hitSlop={12}
        onPress={handleBack}
        style={styles.back}
      >
        <ArrowLeft color={dark ? colors.dark.text : colors.textPrimary} size={24} strokeWidth={2.2} />
      </Pressable>
      {right ?? null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  padded: {
    paddingHorizontal: layout.screenPadding,
  },
  back: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});