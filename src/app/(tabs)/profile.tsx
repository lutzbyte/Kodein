import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Screen } from '@/components/ui/Screen';
import { colors, radius, shadows, spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import { toAuthError } from '@/services/auth/authErrors';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const performSignOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      // Setelah berhasil, guard di _layout.tsx otomatis memindahkan ke Onboarding
      // dan menghapus riwayat halaman terproteksi.
      await signOut();
    } catch (error) {
      setIsSigningOut(false);
      Alert.alert('Gagal keluar', toAuthError(error).message);
    }
  }, [signOut]);

  const confirmSignOut = useCallback(() => {
    Alert.alert('Keluar dari akun?', 'Progress belajarmu tetap tersimpan dan tersedia saat kamu masuk kembali.', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: performSignOut },
    ]);
  }, [performSignOut]);

  return (
    <Screen edges={['top']}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Avatar uri={user?.photoURL} name={user?.displayName} size={88} />
          <View style={styles.identity}>
            <AppText variant="title" align="center">
              {user?.displayName ?? 'Pengguna Kodein'}
            </AppText>
            <AppText variant="body" color={colors.textSecondary} align="center">
              {user?.email ?? '-'}
            </AppText>
          </View>
        </View>

        <Button
          title="Keluar"
          variant="outline"
          loading={isSigningOut}
          onPress={confirmSignOut}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.xxl,
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    ...shadows.card,
  },
  identity: {
    alignItems: 'center',
    gap: spacing.xs,
  },
});