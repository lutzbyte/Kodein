import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/theme';

interface AvatarProps {
  uri?: string | null;
  name?: string | null;
  size?: number;
}

export function Avatar({ uri, name, size = 48 }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [uri]);

  const dimension = { width: size, height: size, borderRadius: size / 2 };
  const initial = (name?.trim().charAt(0) || 'K').toUpperCase();

  if (uri && !failed) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, dimension]}
        onError={() => setFailed(true)}
        accessibilityLabel="Foto profil"
      />
    );
  }

  return (
    <View style={[styles.fallback, dimension]} accessibilityLabel="Avatar pengguna">
      <AppText
        variant="heading"
        color={colors.primary}
        style={{ fontSize: size * 0.4, lineHeight: size * 0.5 }}
      >
        {initial}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.primarySoft,
  },
  fallback: {
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});