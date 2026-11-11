import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import {
  addResourceBookmark,
  removeResourceBookmark,
  subscribeToResourceBookmarks,
} from '@/services/firestore/bookmarkService';

export interface BookmarksContextValue {
  resourceIds: ReadonlySet<string>;
  isLoading: boolean;
  error: string | null;
  isBookmarked: (resourceId: string) => boolean;
  isPending: (resourceId: string) => boolean;
  toggleResource: (resourceId: string) => Promise<void>;
}

export const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const dialog = useDialog();
  const uid = user?.uid ?? null;

  const [resourceIds, setResourceIds] = useState<ReadonlySet<string>>(new Set());
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latestIds = useRef(resourceIds);
  latestIds.current = resourceIds;

  useEffect(() => {
    if (!uid) {
      setResourceIds(new Set());
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToResourceBookmarks(
      uid,
      (ids) => {
        setResourceIds(new Set(ids));
        setIsLoading(false);
      },
      () => {
        setError('Gagal memuat bookmark. Periksa koneksi internet.');
        setIsLoading(false);
      },
    );
  }, [uid]);

  const toggleResource = useCallback(
    async (resourceId: string) => {
      if (!uid) return;

      setPendingIds((previous) => new Set(previous).add(resourceId));
      try {
        // Selesai hanya setelah Firestore mengonfirmasi penulisan.
        if (latestIds.current.has(resourceId)) {
          await removeResourceBookmark(uid, resourceId);
        } else {
          await addResourceBookmark(uid, resourceId);
        }
      } catch {
        await dialog.alert({
          title: 'Bookmark gagal disimpan',
          message: 'Perubahan belum tersimpan. Periksa koneksi internet lalu coba lagi.',
          tone: 'danger',
        });
      } finally {
        setPendingIds((previous) => {
          const next = new Set(previous);
          next.delete(resourceId);
          return next;
        });
      }
    },
    [uid, dialog],
  );

  const value = useMemo<BookmarksContextValue>(
    () => ({
      resourceIds,
      isLoading,
      error,
      isBookmarked: (resourceId) => resourceIds.has(resourceId),
      isPending: (resourceId) => pendingIds.has(resourceId),
      toggleResource,
    }),
    [resourceIds, pendingIds, isLoading, error, toggleResource],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}