import { useCallback } from 'react';
import { Linking } from 'react-native';

import { useDialog } from '@/hooks/useDialog';
import type { Resource } from '@/types/content';

export function useOpenResource() {
  const dialog = useDialog();

  return useCallback(
    async (resource: Resource) => {
      try {
        await Linking.openURL(resource.url);
      } catch {
        await dialog.alert({
          title: 'Tautan tidak dapat dibuka',
          message: 'Periksa koneksi internet lalu coba lagi.',
        });
      }
    },
    [dialog],
  );
}