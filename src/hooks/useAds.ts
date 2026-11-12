import { useContext } from 'react';

import { AdsContext, type AdsContextValue } from '@/store/AdsContext';

export function useAds(): AdsContextValue {
  return useContext(AdsContext);
}