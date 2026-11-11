import { useContext } from 'react';

import { DialogContext, type DialogApi } from '@/store/DialogContext';

export function useDialog(): DialogApi {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog harus dipakai di dalam DialogProvider.');
  }
  return context;
}