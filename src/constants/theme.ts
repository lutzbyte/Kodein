import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  primary: '#5B4FE5',
  primaryDark: '#4338CA',
  primaryLight: '#8B7BFF',
  primarySoft: '#EEEBFF',
  secondary: '#8B5CF6',

  background: '#F7F6FF',
  surface: '#FFFFFF',
  surfaceMuted: '#EFEEFA',

  textPrimary: '#0F1535',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',

  border: '#E6E4F5',
  success: '#22C55E',
  successSoft: '#DCFCE7',
  warning: '#D97706',
  warningSoft: '#FEF3C7',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  disabled: '#D1D5DB',

  code: {
    background: '#12122F',
    text: '#E5E7FF',
    keyword: '#C4B5FD',
    string: '#86EFAC',
    number: '#FCD34D',
    comment: '#7C86B2',
    directive: '#F9A8D4',
    function: '#93C5FD',
    gutter: '#5B5F8F',
  },

  dark: {
    background: '#0B0B24',
    surface: '#15153B',
    text: '#FFFFFF',
    textMuted: '#B8BAD6',
    border: '#2A2A5C',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const layout = {
  screenPadding: 20,
} as const;

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const fontMono: string = Platform.select({ ios: 'Menlo', default: 'monospace' });

export const typography = {
  display: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 40 },
  title: { fontFamily: fontFamily.bold, fontSize: 24, lineHeight: 32 },
  heading: { fontFamily: fontFamily.semibold, fontSize: 18, lineHeight: 26 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: fontFamily.semibold, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fontFamily.semibold, fontSize: 12, lineHeight: 16 },
} satisfies Record<string, TextStyle>;

export const shadows = {
  card: {
    shadowColor: '#1E1B4B',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
} satisfies Record<string, ViewStyle>;