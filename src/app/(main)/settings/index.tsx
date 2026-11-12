import { Info, Mail, Megaphone, User } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { MenuRow } from '@/components/cards/MenuRow';
import { AppText } from '@/components/ui/AppText';
import { Card } from '@/components/ui/Card';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from '@/constants/app';
import { colors, layout, spacing } from '@/constants/theme';
import { useAds } from '@/hooks/useAds';
import { useAuth } from '@/hooks/useAuth';
import { getAppVersion } from '@/utils/appInfo';

export default function SettingsScreen() {
  const { user } = useAuth();
  const { ready } = useAds();

  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <AppText variant="title">Pengaturan</AppText>

        <View style={styles.section}>
          <AppText variant="label" color={colors.textSecondary}>
            AKUN
          </AppText>
          <Card padded={false}>
            <MenuRow
              icon={<User color={colors.primary} size={22} strokeWidth={2} />}
              label="Nama"
              value={user?.displayName ?? '-'}
            />
            <MenuRow
              icon={<Mail color={colors.primary} size={22} strokeWidth={2} />}
              label="Email"
              value={user?.email ?? '-'}
              isLast
            />
          </Card>
          <AppText variant="caption" color={colors.textSecondary}>
            Data akun diambil dari akun Google yang kamu gunakan untuk masuk.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="label" color={colors.textSecondary}>
            IKLAN
          </AppText>
          <Card padded={false}>
            <MenuRow
              icon={<Megaphone color={colors.primary} size={22} strokeWidth={2} />}
              label="Iklan Google AdMob"
              value={ready ? 'Aktif' : 'Nonaktif'}
              isLast
            />
          </Card>
          <AppText variant="caption" color={colors.textSecondary}>
            Kodein menampilkan iklan agar aplikasi tetap gratis. Iklan hanya muncul di jeda alami
            dan tidak pernah saat kamu menjawab latihan. Iklan memerlukan persetujuan privasi yang
            diminta saat aplikasi pertama kali digunakan.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="label" color={colors.textSecondary}>
            TENTANG APLIKASI
          </AppText>
          <Card padded={false}>
            <MenuRow
              icon={<Info color={colors.primary} size={22} strokeWidth={2} />}
              label={APP_NAME}
              value={`Versi ${getAppVersion()}`}
              isLast
            />
          </Card>
          <AppText variant="bodyStrong">{APP_TAGLINE}</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            {APP_DESCRIPTION}
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
    gap: spacing.xxl,
  },
  section: {
    gap: spacing.md,
  },
});