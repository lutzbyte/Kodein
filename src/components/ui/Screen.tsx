import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme';

interface ScreenProps {
  children: ReactNode;
  dark?: boolean;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  dark = false,
  edges = ['top', 'bottom', 'left', 'right'],
  style,
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.base,
        { backgroundColor: dark ? colors.dark.background : colors.background },
        style,
      ]}
    >
      <StatusBar style={dark ? 'light' : 'dark'} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});