import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/constants/theme';

interface KodeinLogoProps {
  width?: number;
}

export function KodeinLogo({ width = 120 }: KodeinLogoProps) {
  const height = (width * 80) / 120;

  return (
    <Svg width={width} height={height} viewBox="0 0 120 80" accessibilityLabel="Logo Kodein">
      <Defs>
        <LinearGradient
          id="kodeinLogoGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="120"
          y2="80"
        >
          <Stop offset="0" stopColor={colors.primaryLight} />
          <Stop offset="1" stopColor={colors.primary} />
        </LinearGradient>
      </Defs>
      <Path
        d="M34 16 L8 40 L34 64"
        stroke="url(#kodeinLogoGradient)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M86 16 L112 40 L86 64"
        stroke="url(#kodeinLogoGradient)"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M68 8 L52 72"
        stroke="url(#kodeinLogoGradient)"
        strokeWidth={10}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}