import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, fontMono, radius } from '@/constants/theme';

type TokenKind = 'plain' | 'keyword' | 'string' | 'number' | 'comment' | 'directive' | 'function';

interface Token {
  text: string;
  kind: TokenKind;
}

const KEYWORDS = new Set([
  'int', 'char', 'float', 'double', 'void', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'continue', 'struct', 'enum', 'typedef', 'const', 'unsigned',
  'long', 'short', 'static', 'sizeof', 'class', 'public', 'private', 'new', 'delete',
]);

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
const TOKEN_PATTERN =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(#\s*\w+)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*(?=\s*\())|(\b[A-Za-z_]\w*\b)|(\s+)|([\s\S])/g;

function tokenizeLine(line: string): Token[] {
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

  const tokens: Token[] = [];
  for (const match of line.matchAll(TOKEN_PATTERN)) {
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
    else if (callName) kind = KEYWORDS.has(callName) ? 'keyword' : 'function';
    else if (identifier) kind = KEYWORDS.has(identifier) ? 'keyword' : 'plain';

    tokens.push({ text, kind });
  }
  return tokens;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const lines = code.replace(/\n$/, '').split('\n');

  return (
    <View style={styles.container}>
      {title || language ? (
        <View style={styles.header}>
          <AppText variant="label" color={colors.code.text}>
            {title ?? ''}
          </AppText>
          {language ? (
            <View style={styles.languageBadge}>
              <AppText variant="label" color={colors.surface}>
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
                  : tokenizeLine(line).map((token, tokenIndex) => (
                      <Text key={tokenIndex} style={{ color: TOKEN_COLORS[token.kind] }}>
                        {token.text}
                      </Text>
                    ))}
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
  languageBadge: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
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