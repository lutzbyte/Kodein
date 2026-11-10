import { Sparkles } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { colors, spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();
  const firstName = user?.displayName?.trim().split(' ')[0] ?? 'Developer';

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="title">Halo, {firstName}!</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            Terus belajar, raih tujuanmu.
          </AppText>
        </View>
        <Avatar uri={user?.photoURL} name={user?.displayName} size={44} />
      </View>

      <EmptyState
        icon={<Sparkles color={colors.primary} size={30} strokeWidth={2} />}
        title="Beranda sedang disiapkan"
        description="Progress belajar, Lanjut Belajar, dan roadmap akan tampil di sini setelah Fase 2 dan Fase 5 selesai."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
});