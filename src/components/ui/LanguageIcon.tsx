import {
  Braces,
  Code,
  Coffee,
  Cog,
  Cpu,
  Database,
  FileCode,
  FileJson,
  Hash,
  Sigma,
  Terminal,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';
import { Image, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';
import { LANGUAGE_IMAGES } from '@/constants/languageAssets';
import { toLanguageKey, type LanguageKey } from '@/utils/language';

const GLYPHS: Record<LanguageKey, LucideIcon> = {
  c: Code,
  cpp: FileCode,
  python: Braces,
  java: Coffee,
  assembly: Cpu,
  shell: Terminal,
  go: Zap,
  rust: Cog,
  javascript: FileJson,
  typescript: FileJson,
  csharp: Hash,
  sql: Database,
  r: Sigma,
  other: Code,
};

interface LanguageIconProps {
  language: string;
  size?: number;
  tone?: 'light' | 'dark';
}

export function LanguageIcon({ language, size = 32, tone = 'light' }: LanguageIconProps) {
  const key = toLanguageKey(language);
  const image = LANGUAGE_IMAGES[key];

  const background = tone === 'dark' ? 'rgba(139, 123, 255, 0.18)' : colors.primarySoft;
  const foreground = tone === 'dark' ? colors.primaryLight : colors.primary;
  const dimension = { width: size, height: size, borderRadius: size * 0.28 };

  if (image) {
    return (
      <View style={[styles.base, dimension, { backgroundColor: background }]}>
        <Image
          source={image}
          resizeMode="contain"
          accessibilityLabel={`Ikon ${language}`}
          style={{ width: size * 0.64, height: size * 0.64 }}
        />
      </View>
    );
  }

  const Glyph = GLYPHS[key];

  return (
    <View
      accessible
      accessibilityLabel={`Bahasa ${language}`}
      style={[styles.base, dimension, { backgroundColor: background }]}
    >
      <Glyph color={foreground} size={size * 0.56} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});