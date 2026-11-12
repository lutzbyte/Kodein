import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { subscribeToHistory } from '@/services/firestore/historyService';
import type { HistoryEntry } from '@/types/progress';

interface HistoryState {
  entries: HistoryEntry[];
  isLoading: boolean;
  error: string | null;
}

export function useHistory(limitCount: number): HistoryState {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const [state, setState] = useState<HistoryState>({ entries: [], isLoading: true, error: null });

  useEffect(() => {
    if (!uid) {
      setState({ entries: [], isLoading: false, error: null });
      return;
    }

    setState((previous) => ({ ...previous, isLoading: true, error: null }));

    return subscribeToHistory(
      uid,
      limitCount,
      (entries) => setState({ entries, isLoading: false, error: null }),
      () =>
        setState({
          entries: [],
          isLoading: false,
          error: 'Gagal memuat riwayat belajar. Periksa koneksi internet.',
        }),
    );
  }, [uid, limitCount]);

  return state;
}