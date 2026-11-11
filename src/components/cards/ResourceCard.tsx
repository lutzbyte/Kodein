import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  BookOpen,
  Bookmark,
  CirclePlay,
  ExternalLink,
  FileText,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge, getDifficultyTone } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { colors, radius, spacing } from '@/constants/theme';
import { useBookmarks } from '@/hooks/useBookmarks';
import type { Resource, ResourceType } from '@/types/content';

const TYPE_ICONS: Record<ResourceType, LucideIcon> = {
  YouTube: CirclePlay,
  Artikel: FileText,
  Dokumentasi: BookOpen,
  Buku: BookOpen,
  Kursus: GraduationCap,
};

interface ResourceCardProps {
  resource: Resource;
  onPress: () => void;
}

export function ResourceCard({ resource, onPress }: ResourceCardProps) {
  const Icon = TYPE_ICONS[resource.type];
  const { isBookmarked, isPending, toggleResource } = useBookmarks();
  const bookmarked = isBookmarked(resource.id);
  const pending = isPending(resource.id);

  return (
    <Card onPress={onPress} accessibilityLabel={`Buka ${resource.title}`}>
      <View style={styles.row}>
        <View style={styles.tile}>
          <Icon color={colors.primary} size={26} strokeWidth={2} />
        </View>
        <View style={styles.texts}>
          <AppText variant="bodyStrong" numberOfLines={2}>
            {resource.title}
          </AppText>
          <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
            {resource.publisher} • {resource.language}
          </AppText>
          <View style={styles.badges}>
            <Badge label={resource.type} tone="primary" />
            <Badge label={resource.difficulty} tone={getDifficultyTone(resource.difficulty)} />
          </View>
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={bookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
            hitSlop={10}
            disabled={pending}
            onPress={() => toggleResource(resource.id)}
            style={styles.bookmark}
          >
            {pending ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Bookmark
                color={bookmarked ? colors.primary : colors.textMuted}
                fill={bookmarked ? colors.primary : 'transparent'}
                size={20}
                strokeWidth={2.2}
              />
            )}
          </Pressable>
          <ExternalLink color={colors.textMuted} size={16} strokeWidth={2.2} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tile: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 6,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 2,
  },
  bookmark: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});