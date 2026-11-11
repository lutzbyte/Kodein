import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { LanguageIcon } from '@/components/ui/LanguageIcon';
import { colors, fontMono, radius } from '@/constants/theme';

type TokenKind = 'plain' | 'keyword' | 'string' | 'number' | 'comment' | 'directive' | 'function';

interface Token {
  text: string;
  kind: TokenKind;
}

interface LanguageConfig {
  keywords: ReadonlySet<string>;
  lineComment: '//' | '#';
  directives: boolean;
}

const C_KEYWORDS = new Set([
  'int', 'char', 'float', 'double', 'void', 'long', 'short', 'unsigned', 'signed', 'bool',
  'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
  'continue', 'struct', 'enum', 'typedef', 'const', 'static', 'sizeof', 'volatile',
  'class', 'public', 'private', 'protected', 'new', 'delete', 'namespace', 'using',
  'template', 'typename', 'virtual', 'override', 'nullptr', 'true', 'false', 'auto',
  'explicit', 'this', 'try', 'catch', 'throw',
]);

const JAVA_KEYWORDS = new Set([
  'public', 'private', 'protected', 'class', 'static', 'final', 'void', 'int', 'long',
  'double', 'boolean', 'char', 'new', 'return', 'if', 'else', 'for', 'while', 'extends',
  'implements', 'interface', 'abstract', 'throw', 'throws', 'try', 'catch', 'import',
  'package', 'this', 'super', 'true', 'false', 'null', 'instanceof',
]);

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
  'is', 'import', 'from', 'as', 'with', 'try', 'except', 'raise', 'lambda', 'None', 'True',
  'False', 'pass', 'break', 'continue', 'yield', 'global', 'finally',
]);

const SHELL_KEYWORDS = new Set([
  'if', 'then', 'else', 'fi', 'for', 'do', 'done', 'while', 'case', 'esac', 'in',
  'echo', 'cd', 'git', 'mkdir', 'rm',
]);

const C_LIKE: LanguageConfig = { keywords: C_KEYWORDS, lineComment: '//', directives: true };
const JAVA: LanguageConfig = { keywords: JAVA_KEYWORDS, lineComment: '//', directives: false };
const PYTHON: LanguageConfig = { keywords: PYTHON_KEYWORDS, lineComment: '#', directives: false };
const SHELL: LanguageConfig = { keywords: SHELL_KEYWORDS, lineComment: '#', directives: false };
const GENERIC: LanguageConfig = { keywords: C_KEYWORDS, lineComment: '//', directives: false };

function getLanguageConfig(language: string): LanguageConfig {
  switch (language.toLowerCase()) {
    case 'c':
    case 'c++':
    case 'cpp':
      return C_LIKE;
    case 'java':
      return JAVA;
    case 'python':
      return PYTHON;
    case 'shell':
    case 'bash':
      return SHELL;
    default:
      return GENERIC;
  }
}

const TOKEN_COLORS: Record<TokenKind, string> = {
  plain: colors.code.text,
  keyword: colors.code.keyword,
  string: colors.code.string,
  number: colors.code.number,
  comment: colors.code.comment,
  directive: colors.code.directive,
  function: colors.code.function,
};

const INCLUDE_PATTERN = /^(\s*#\s*include)(\s*)(<[^>]*>|"[^"]*")(.*)$/;
const STRING_PART = String.raw`("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`;

const patternCache = new Map<string, RegExp>();

function getPattern(config: LanguageConfig): RegExp {
  const key = `${config.lineComment}-${config.directives}`;
  const cached = patternCache.get(key);
  if (cached) return cached;

  const comment = config.lineComment === '#' ? String.raw`(#.*$)` : String.raw`(\/\/.*$)`;
  const directive = config.directives ? String.raw`(#\s*\w+)` : '((?!))';
  const pattern = new RegExp(
    [
      comment,
      STRING_PART,
      directive,
      String.raw`(\b\d+(?:\.\d+)?\b)`,
      String.raw`(\b[A-Za-z_]\w*(?=\s*\())`,
      String.raw`(\b[A-Za-z_]\w*\b)`,
      String.raw`(\s+)`,
      String.raw`([\s\S])`,
    ].join('|'),
    'g',
  );
  patternCache.set(key, pattern);
  return pattern;
}

function tokenizeLine(line: string, config: LanguageConfig): Token[] {
  if (config.directives) {
    const include = INCLUDE_PATTERN.exec(line);
    if (include) {
      const tokens: Token[] = [
        { text: include[1], kind: 'directive' },
        { text: include[2], kind: 'plain' },
        { text: include[3], kind: 'string' },
      ];
      if (include[4]) tokens.push({ text: include[4], kind: 'plain' });
      return tokens;
    }
  }

  const tokens: Token[] = [];
  for (const match of line.matchAll(getPattern(config))) {
    const text = match[0];
    const comment = match[1];
    const stringLiteral = match[2];
    const directive = match[3];
    const numberLiteral = match[4];
    const callName = match[5];
    const identifier = match[6];

    let kind: TokenKind = 'plain';
    if (comment) kind = 'comment';
    else if (stringLiteral) kind = 'string';
    else if (directive) kind = 'directive';
    else if (numberLiteral) kind = 'number';
    else if (callName) kind = config.keywords.has(callName) ? 'keyword' : 'function';
    else if (identifier) kind = config.keywords.has(identifier) ? 'keyword' : 'plain';

    tokens.push({ text, kind });
  }
  return tokens;
}

interface CodeBlockProps {
  code: string;
  /** Tanpa language, teks ditampilkan polos (cocok untuk output program). */
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const lines = code.replace(/\n$/, '').split('\n');
  const config = language ? getLanguageConfig(language) : null;

  return (
    <View style={styles.container}>
      {title || language ? (
        <View style={styles.header}>
          <AppText variant="label" color={colors.code.text}>
            {title ?? ''}
          </AppText>
          {language ? (
            <View style={styles.languageRow}>
              <LanguageIcon language={language} size={24} tone="dark" />
              <AppText variant="label" color={colors.code.text}>
                {language}
              </AppText>
            </View>
          ) : null}
        </View>
      ) : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {lines.map((line, index) => (
            <View key={index} style={styles.line}>
              <Text style={styles.lineNumber}>{index + 1}</Text>
              <Text style={styles.code}>
                {line.length === 0
                  ? ' '
                  : config
                    ? tokenizeLine(line, config).map((token, tokenIndex) => (
                        <Text key={tokenIndex} style={{ color: TOKEN_COLORS[token.kind] }}>
                          {token.text}
                        </Text>
                      ))
                    : line}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.code.background,
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  line: {
    flexDirection: 'row',
    gap: 14,
  },
  lineNumber: {
    width: 20,
    textAlign: 'right',
    fontFamily: fontMono,
    fontSize: 12,
    lineHeight: 20,
    color: colors.code.gutter,
  },
  code: {
    fontFamily: fontMono,
    fontSize: 13,
    lineHeight: 20,
    color: colors.code.text,
  },
});