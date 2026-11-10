import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, RadialGradient, Rect, Stop } from 'react-native-svg';

import { colors } from '@/constants/theme';

const STARS = [
  { x: 42, y: 96, r: 1.6, o: 0.9 },
  { x: 288, y: 150, r: 1.2, o: 0.6 },
  { x: 318, y: 262, r: 1.8, o: 0.8 },
  { x: 24, y: 330, r: 1.2, o: 0.5 },
  { x: 150, y: 58, r: 1.0, o: 0.6 },
  { x: 232, y: 40, r: 1.4, o: 0.7 },
  { x: 72, y: 214, r: 1.0, o: 0.5 },
  { x: 336, y: 430, r: 1.2, o: 0.5 },
  { x: 250, y: 560, r: 1.6, o: 0.8 },
  { x: 36, y: 520, r: 1.0, o: 0.4 },
];

export function StarField() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 360 780" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <RadialGradient id="starfieldGlow" cx="50%" cy="100%" r="65%">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.35" />
            <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Rect x="0" y="0" width="360" height="780" fill="url(#starfieldGlow)" />

        <Ellipse
          cx="180"
          cy="860"
          rx="300"
          ry="200"
          fill="none"
          stroke={colors.primaryLight}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <Ellipse
          cx="180"
          cy="880"
          rx="360"
          ry="230"
          fill="none"
          stroke={colors.primaryLight}
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {STARS.map((star) => (
          <Circle
            key={`${star.x}-${star.y}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#FFFFFF"
            opacity={star.o}
          />
        ))}
      </Svg>
    </View>
  );
}