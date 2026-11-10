import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors } from '@/constants/theme';

interface MountainIllustrationProps {
  height?: number;
}

export function MountainIllustration({ height = 110 }: MountainIllustrationProps) {
  return (
    <Svg
      width="100%"
      height={height}
      viewBox="0 0 360 120"
      preserveAspectRatio="xMidYMax slice"
      accessibilityLabel="Ilustrasi gunung roadmap"
    >
      <Defs>
        <LinearGradient id="mountainFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.primaryLight} stopOpacity="0.55" />
          <Stop offset="1" stopColor={colors.primary} stopOpacity="0.05" />
        </LinearGradient>
      </Defs>

      <Path
        d="M0 120 L0 92 L60 70 L110 84 L180 30 L240 78 L290 58 L360 96 L360 120 Z"
        fill="url(#mountainFill)"
      />
      <Path
        d="M0 92 L60 70 L110 84 L180 30 L240 78 L290 58 L360 96"
        fill="none"
        stroke={colors.primaryLight}
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path d="M180 30 L180 8" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
      <Path d="M180 8 L198 14 L180 20 Z" fill={colors.primaryLight} />
    </Svg>
  );
}