import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/constants/theme';

interface WaveBackdropProps {
  height?: number;
}

export function WaveBackdrop({ height = 240 }: WaveBackdropProps) {
  return (
    <View pointerEvents="none" style={styles.container}>
      <Svg width="100%" height={height} viewBox="0 0 360 240" preserveAspectRatio="xMidYMin slice">
        <Defs>
          <LinearGradient id="waveBackdropFill" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.primarySoft} stopOpacity="1" />
            <Stop offset="1" stopColor={colors.primaryLight} stopOpacity="0.18" />
          </LinearGradient>
        </Defs>
        <Path
          d="M0 0 H360 V110 C310 160 250 80 180 118 C110 156 60 196 0 140 Z"
          fill="url(#waveBackdropFill)"
        />
        <Circle cx="300" cy="150" r="2" fill={colors.primaryLight} opacity="0.6" />
        <Circle cx="318" cy="170" r="1.4" fill={colors.primaryLight} opacity="0.5" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});