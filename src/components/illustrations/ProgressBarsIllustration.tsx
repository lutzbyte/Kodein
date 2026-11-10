import Svg, { Path, Rect } from 'react-native-svg';

interface ProgressBarsIllustrationProps {
  size?: number;
}

export function ProgressBarsIllustration({ size = 64 }: ProgressBarsIllustrationProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" accessibilityLabel="Ilustrasi progress belajar">
      <Rect x="8" y="40" width="12" height="16" rx="3" fill="#FFFFFF" opacity="0.35" />
      <Rect x="26" y="30" width="12" height="26" rx="3" fill="#FFFFFF" opacity="0.5" />
      <Rect x="44" y="18" width="12" height="38" rx="3" fill="#FFFFFF" opacity="0.7" />
      <Path
        d="M10 30 L28 16 L38 22 L56 6"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M48 6 L56 6 L56 14" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}