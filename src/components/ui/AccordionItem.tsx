import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, spacing } from '@/constants/theme';

interface AccordionItemProps {
  title: string;
  body: string;
  isLast?: boolean;
}

export function AccordionItem({ title, body, isLast = false }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  const Icon = open ? ChevronUp : ChevronDown;

  return (
    <View style={[styles.container, !isLast && styles.divider]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((previous) => !previous)}
        style={styles.row}
      >
        <AppText variant="bodyStrong" style={styles.title}>
          {title}
        </AppText>
        <Icon color={colors.textSecondary} size={20} strokeWidth={2.2} />
      </Pressable>
      {open ? (
        <AppText variant="body" color={colors.textSecondary} style={styles.body}>
          {body}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    gap: spacing.md,
  },
  title: {
    flex: 1,
  },
  body: {
    paddingBottom: 14,
  },
});