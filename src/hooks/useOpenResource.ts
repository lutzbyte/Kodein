import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';

import type { Resource } from '@/types/content';

export function useOpenResource() {
  return useCallback(async (resource: Resource) => {
    try {
      await Linking.openURL(resource.url);
    } catch {
      Alert.alert('Tidak dapat membuka tautan', 'Periksa koneksi internet lalu coba lagi.');
    }
  }, []);
}