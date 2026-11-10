import Svg, {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { colors } from '@/constants/theme';

interface LaptopIllustrationProps {
  width?: number;
}

export function LaptopIllustration({ width = 280 }: LaptopIllustrationProps) {
  const height = (width * 200) / 280;

  return (
    <Svg width={width} height={height} viewBox="0 0 280 200" accessibilityLabel="Ilustrasi laptop programming">
      <Defs>
        <LinearGradient id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#2A2470" />
          <Stop offset="1" stopColor="#14123F" />
        </LinearGradient>
        <LinearGradient id="laptopGlyph" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.primaryLight} />
          <Stop offset="1" stopColor={colors.primary} />
        </LinearGradient>
        <RadialGradient id="laptopGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.primary} stopOpacity="0.45" />
          <Stop offset="1" stopColor={colors.primary} stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Ellipse cx="140" cy="176" rx="120" ry="16" fill="url(#laptopGlow)" />

      <Rect x="50" y="18" width="180" height="120" rx="12" fill="#1B1950" stroke={colors.primary} strokeWidth="2" />
      <Rect x="60" y="28" width="160" height="100" rx="6" fill="url(#laptopScreen)" />

      <Rect x="70" y="38" width="28" height="4" rx="2" fill={colors.primaryLight} opacity="0.55" />
      <Rect x="104" y="38" width="44" height="4" rx="2" fill="#FFFFFF" opacity="0.18" />
      <Rect x="70" y="48" width="18" height="4" rx="2" fill="#FFFFFF" opacity="0.18" />
      <Rect x="92" y="48" width="34" height="4" rx="2" fill={colors.primaryLight} opacity="0.4" />
      <Rect x="70" y="112" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.14" />
      <Rect x="116" y="112" width="24" height="4" rx="2" fill={colors.primaryLight} opacity="0.4" />

      <G transform="translate(110 59) scale(0.5)">
        <Path
          d="M34 16 L8 40 L34 64"
          stroke="url(#laptopGlyph)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M86 16 L112 40 L86 64"
          stroke="url(#laptopGlyph)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M68 8 L52 72"
          stroke="url(#laptopGlyph)"
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />
      </G>

      <Path d="M28 142 H252 L240 160 Q238 164 232 164 H48 Q42 164 40 160 Z" fill="#2B2872" />
      <Rect x="114" y="142" width="52" height="6" rx="3" fill="#1B1950" />
    </Svg>
  );
}